import React, { Component } from 'react';

import Audio from '../audio/Audio'

import InterfaceContainer from './InterfaceContainer'

export default class AudioController extends Component {

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
    this.audio = Audio()
  }

  mouseControlProps = () => {
    // TODO: notes should fade in in ascending order. May need to work out the exact dimensions of the chromatic input field and all the related math before it makes sense to figure this out
    const changeXValue = (value) => {
      this.audio.thirdVolume.volume.value = value
      this.audio.fifthVolume.volume.value = value
      this.audio.seventhVolume.volume.value = value
      console.log('X', value)
    }
    const changeYValue = (value) => {
      console.log('Y', value)
      this.audio.bassNote.frequency.value = value / 2
      this.audio.rootNote.frequency.value = value
      this.audio.minorThird.frequency.value = value * 1.20
      this.audio.majorThird.frequency.value = value * 1.25
      this.audio.diminishedFifth.frequency.value = value * 1.4
      this.audio.perfectFifth.frequency.value = value * 1.5
      this.audio.augmentedFifth.frequency.value = value * 1.6
      this.audio.minorSeventh.frequency.value = value * 1.78
      this.audio.majorSeventh.frequency.value = value * 1.9
    }
    const toneStart = () => {
      this.audio.mouseOn = true
      // this.audio.rootNote.triggerAttack(this.audio.rootNote.frequency.value)
      // TODO: use activeChords instead here
      for (let key in this.state){
        if (this.state[key]){
          this.audio.chordMap[key].forEach(note => note.triggerAttack(note.frequency.value))
        }
      }
    }
    const toneStop = () => {
      this.audio.mouseOn = false
      // this.audio.rootNote.triggerRelease()
      // TODO: use activeChords instead here. this might solve the mouse-off holdover problem, inshallah
      for (let key in this.audio.chordMap){
        this.audio.chordMap[key].forEach(note => note.triggerRelease())
      }
    }

    return {
      changeXValue,
      changeYValue,
      toneStart,
      toneStop
    }
  }

  keyDown = (key) => {
    console.log(key, 'down');
    this.toggleKeydown(key)

    this.audio.activeChords.push(this.audio.chordMap[key])
    console.log(this.audio.activeChords);
    this.audio.chordMap[key].forEach(note => {
      // NOTE: if activeNotes does NOT contain note, push it
      if (!this.audio.activeNotes.some(activeNote => activeNote === note)){
        this.audio.activeNotes.push(note)
      }
    })

    if (this.audio.mouseOn){
      this.audio.activeNotes.forEach(note => note.triggerAttack(note.frequency.value))
    }
  }
  keyUp = (key) => {
    console.log(key, 'up');
    this.toggleKeydown(key)

    this.audio.activeChords = this.audio.activeChords.filter(chord => chord !== this.audio.chordMap[key])
    console.log(this.audio.activeChords);

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
        mouseControlProps={this.mouseControlProps()}
        keyDowns={this.state}
      />
    )
  }

  componentDidMount(){

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
