import React, { Component } from 'react';

import { connect } from 'react-redux';

import Audio from '../audio/Audio'

import InterfaceContainer from './InterfaceContainer'

class AudioController extends Component {

  constructor(){
    super()
    this.state = {
      KeyQ: false,
      KeyA: false,
      KeyW: false,
      KeyS: false,
      KeyD: false,
      KeyF: false,

      Space: false
    }
  }

  circleControlProps = () => {
    const setNotes = (rootNote) => {
      const intervals = this.audio.harmonize(rootNote, [-12, 3, 4, 6, 7, 8, 10, 11])
      console.log(rootNote, intervals);
      this.audio.bassNote.frequency.value = intervals[0]
      this.audio.rootNote.frequency.value = rootNote
      this.audio.minorThird.frequency.value = intervals[1]
      this.audio.majorThird.frequency.value = intervals[2]
      this.audio.diminishedFifth.frequency.value = intervals[3]
      this.audio.perfectFifth.frequency.value = intervals[4]
      this.audio.augmentedFifth.frequency.value = intervals[5]
      this.audio.minorSeventh.frequency.value = intervals[6]
      this.audio.majorSeventh.frequency.value = intervals[7]
    }

    const toneStart = () => {
      // BUG: sounds like I'm still getting double attack sometimes? Seems to happen when moving to new note slice before previous release has ended. It might also just be the popping/clipping issues, I'm not sure
      // NOTE: seems like the tail of the previous un-released note is changing pitch first, before the new attack triggers, causing the double attack effect
      this.audio.mouseOn = true

      this.audio.activeNotes.forEach(note => note.triggerAttack(note.frequency.value))
    }

    const toneStop = () => {
      this.audio.mouseOn = false

      this.audio.activeNotes.forEach(note => note.triggerRelease())
    }

    return {
      setNotes,
      toneStart,
      toneStop,
    }
  }

  chromaticControlProps = () => {
    // TODO: notes should fade in in ascending order. May need to work out the exact dimensions of the chromatic input field and all the related math before it makes sense to figure this out. also, make sure volume settings are normalized when switching to circle mode
    const changeXValue = (value) => {
      this.audio.thirdVolume.volume.value = value
      this.audio.fifthVolume.volume.value = value
      this.audio.seventhVolume.volume.value = value
      console.log('X', value)
    }
    const changeYValue = (value) => {
      console.log('Y', value)
      const intervals = this.audio.harmonize(value, [-12, 3, 4, 6, 7, 8, 10, 11])
      this.audio.bassNote.frequency.value = intervals[0]
      this.audio.rootNote.frequency.value = value
      this.audio.minorThird.frequency.value = intervals[1]
      this.audio.majorThird.frequency.value = intervals[2]
      this.audio.diminishedFifth.frequency.value = intervals[3]
      this.audio.perfectFifth.frequency.value = intervals[4]
      this.audio.augmentedFifth.frequency.value = intervals[5]
      this.audio.minorSeventh.frequency.value = intervals[6]
      this.audio.majorSeventh.frequency.value = intervals[7]
    }
    const toneStart = () => {
      this.audio.mouseOn = true
      // this.audio.rootNote.triggerAttack(this.audio.rootNote.frequency.value)

      this.audio.activeNotes.forEach(note => note.triggerAttack(note.frequency.value))

      // for (let key in this.state){
      //   if (this.state[key]){
      //     this.audio.chordMap[key].forEach(note => note.triggerAttack(note.frequency.value))
      //   }
      // }
    }
    const toneStop = () => {
      this.audio.mouseOn = false
      // this.audio.rootNote.triggerRelease()

      this.audio.activeNotes.forEach(note => note.triggerRelease())

      // for (let key in this.audio.chordMap){
      //   this.audio.chordMap[key].forEach(note => note.triggerRelease())
      // }
    }

    return {
      changeXValue,
      changeYValue,
      toneStart,
      toneStop,
    }
  }

  keyDown = (key) => {
    console.log(key, 'down');
    this.toggleKeydown(key)

    this.audio.activeChords.push(this.audio.chordMap[key])
    this.audio.chordMap[key].forEach(note => {
      // NOTE: if activeNotes does NOT contain note, push it
      if (!this.audio.activeNotes.some(activeNote => activeNote === note)){
        this.audio.activeNotes.push(note)
      }
    })
    console.log(this.audio.activeChords, this.audio.activeNotes);

    if (this.audio.mouseOn){
      this.audio.activeNotes.forEach(note => note.triggerAttack(note.frequency.value))
    }
  }
  keyUp = (key) => {
    console.log(key, 'up');
    this.toggleKeydown(key)

    this.audio.activeChords = this.audio.activeChords.filter(chord => chord !== this.audio.chordMap[key])

    this.audio.activeNotes.forEach(note => {
      // NOTE: if note is NOT contained in activeChords, triggerRelease, and remove from activeNotes
      if (!this.audio.activeChords.some(activeChord => activeChord.some(chordNote => chordNote === note))){
        note.triggerRelease()
      }
    })
    const updatedActiveNotes = []
    this.audio.activeChords.forEach(chord => {
      chord.forEach(note => {
        if (!updatedActiveNotes.some(activeNote => activeNote === note)){
          updatedActiveNotes.push(note)
        }
      })
    })
    this.audio.activeNotes = updatedActiveNotes

    console.log(this.audio.activeChords, this.audio.activeNotes);
    // this.audio.chordMap[key].forEach(note => note.triggerRelease())
  }

  toggleKeydown = (key) => {
    this.audio.keyDowns[key] = !this.audio.keyDowns[key]
    this.setState({
      [key]: !this.state[key]
    })
  }

  render(){
    return (
      <InterfaceContainer
        circleControlProps={this.circleControlProps()}
        chromaticControlProps={this.chromaticControlProps()}
        keyDowns={this.state}
      />
    )
  }

  componentDidMount(){
    // console.log(this.props);
    // TODO: audio needs to instantiate with mouse control mode. Need another AudioController method to re-initialize Audio when mouse control mode changes
    // NOTE: or maybe not? I don't think Audio module actually changes how it functions, only the signals that it recieves from the controls change
    this.audio = Audio()

    const checkIfControlKey = (key) => {
      return (key === 'KeyQ' ||
        key === 'KeyA' ||
        key === 'KeyW' ||
        key === 'KeyS' ||
        key === 'KeyD' ||
        key === 'KeyF' ||
        key === 'Space')
    }

    document.body.addEventListener('keydown', event=>{
      const key = event.code
      if (checkIfControlKey(key)){
        event.preventDefault()
        if (this.audio.keyDowns[key] === false){
          this.keyDown(key)
        }
      }
    })

    document.body.addEventListener('keyup', event=>{
      const key = event.code
      if (checkIfControlKey(key)){
        event.preventDefault()
        if (this.audio.keyDowns[key] === true){
          this.keyUp(key)
        }
      }
    })

  }

}

function mapStateToProps(state) {
  return {
    interfaceMode: state.interfaceMode
  }
}

export default connect(mapStateToProps)(AudioController)
