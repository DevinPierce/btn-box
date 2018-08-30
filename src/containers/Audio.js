import React, { Component } from 'react';

import Tone from 'tone'

import InterfaceContainer from './InterfaceContainer'

const monoSynthDefaults = {
  frequency: 'C4',
  detune: 0,
  oscillator: {
    type: 'triangle'
  },
  filter: {
    Q: 1,
    type: 'lowpass',
    rolloff: -24
  },
  envelope: {
    attack: 0.005,
    decay: 0.1,
    sustain: 0.9,
    release: 1
  },
  filterEnvelope: {
    attack: 0.06,
    decay: 0.2,
    sustain: 0.5,
    release: 2,
    baseFrequency: 200,
    octaves: 7,
    exponent: 2
  }
}

const reverb = new Tone.JCReverb({roomSize: 0.7})
reverb.toMaster()

const mixer = new Tone.Gain()
mixer.connect(reverb)

const rootNote = new Tone.MonoSynth(monoSynthDefaults)
rootNote.connect(mixer)

let rootOn = false

const thirdVolume = new Tone.Volume()
thirdVolume.connect(mixer)
const fifthVolume = new Tone.Volume()
fifthVolume.connect(mixer)
const seventhVolume = new Tone.Volume()
seventhVolume.connect(mixer)

const majorChordThird = new Tone.MonoSynth(monoSynthDefaults)
majorChordThird.connect(thirdVolume)
const majorChordFifth = new Tone.MonoSynth(monoSynthDefaults)
majorChordFifth.connect(fifthVolume)

const minorChordThird = new Tone.MonoSynth(monoSynthDefaults)
minorChordThird.connect(thirdVolume)
const minorChordFifth = new Tone.MonoSynth(monoSynthDefaults)
minorChordFifth.connect(fifthVolume)

const dominantChordThird = new Tone.MonoSynth(monoSynthDefaults)
dominantChordThird.connect(thirdVolume)
const dominantChordFifth = new Tone.MonoSynth(monoSynthDefaults)
dominantChordFifth.connect(fifthVolume)
const dominantChordSeventh = new Tone.MonoSynth(monoSynthDefaults)
dominantChordSeventh.connect(seventhVolume)

const chordMap = {
  a: [majorChordThird, majorChordFifth],
  s: [minorChordThird, minorChordFifth],
  d: [dominantChordThird, dominantChordFifth, dominantChordSeventh],
}



export default class Audio extends Component {

  state = {
    aDown: false,
    sDown: false,
    dDown: false,
  }

  checkKeyDown = (key) => {
    return this.state[key + 'Down']
  }

  mouseControlProps = () => {
    // TODO: notes should fade in in ascending order. May need to work out the exact dimensions of the chromatic input field and all the related math before it makes sense to figure this out
    const changeXValue = (value) => {
      thirdVolume.volume.value = value
      fifthVolume.volume.value = value
      seventhVolume.volume.value = value
      console.log('X', value)
    }
    const changeYValue = (value) => {
      console.log('Y', value)
      rootNote.frequency.value = value
      majorChordThird.frequency.value = value * 1.25
      majorChordFifth.frequency.value = value * 1.5
      minorChordThird.frequency.value = value * 1.20
      minorChordFifth.frequency.value = value * 1.5
      dominantChordThird.frequency.value = value * 1.25
      dominantChordFifth.frequency.value = value * 1.5
      dominantChordSeventh.frequency.value = value * 1.78
    }
    const toneStart = (pitch) => {
      rootOn = true
      rootNote.triggerAttack(pitch)
      for (let key in this.state){
        if (this.state[key]){
          chordMap[key[0]].forEach(tone => tone.triggerAttack(tone.frequency.value))
        }
      }
    }
    const toneStop = () => {
      rootOn = false
      rootNote.triggerRelease()
      for (let key in chordMap){
        chordMap[key].forEach(tone => tone.triggerRelease())
      }
    }

    return {
      changeXValue,
      changeYValue,
      toneStart,
      toneStop
    }
  }

  // keyControlProps = () => {
  //   const keyDown = (key) => {
  //     console.log(key, 'down');
  //     if (rootOn){
  //       chordMap[key].forEach(tone => tone.triggerAttack(tone.frequency.value))
  //     }
  //   }
  //   const keyUp = (key) => {
  //     console.log(key, 'up');
  //     chordMap[key].forEach(tone => tone.triggerRelease())
  //   }
  //
  //   return {
  //     keyDown,
  //     keyUp
  //   }
  // }
  keyDown = (key) => {
    console.log(key, 'down');
    if (rootOn){
      chordMap[key].forEach(tone => tone.triggerAttack(tone.frequency.value))
    }
  }
  keyUp = (key) => {
    console.log(key, 'up');
    chordMap[key].forEach(tone => tone.triggerRelease())
  }

  render(){
    return (
      <InterfaceContainer
        mouseControlProps={this.mouseControlProps()}
        // keyControlProps={this.keyControlProps()}
        keyDowns={this.state}
        // checkKeyDown={this.checkKeyDown}
      />
    )
  }

  componentDidMount(){

    document.body.addEventListener('keydown', event=>{
      if (this.checkKeyDown(event.key) === false){
        this.keyDown(event.key)
        this.setState({
          [event.key + 'Down']: true
        })
      }
    })

    document.body.addEventListener('keyup', event=>{
      if (this.checkKeyDown(event.key) === true){
        this.keyUp(event.key)
        this.setState({
          [event.key + 'Down']: false
        })
      }
    })

  }

}
