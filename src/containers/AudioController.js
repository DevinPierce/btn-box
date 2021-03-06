import React, { Component } from 'react';

import { connect } from 'react-redux';

import {loadSettingsAction,
  changeMasterVolumeAction,
  changeEffectValueAction,
  changeWaveformAction,
  // changeFilterTypeAction,
} from '../redux/actions/audioSettingsActions'
import {toggleKeyDownAction} from '../redux/actions/keyDownActions'

import Audio from '../audio/Audio'

import InterfaceContainer from './InterfaceContainer'

// const isEqual = require("react-fast-compare");

class AudioController extends Component {

  circleControlProps = () => {
    const setNotes = (rootNote) => {
      const intervals = this.audio.harmonize(rootNote, [-12, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
      console.log(rootNote, intervals);
      this.audio.bassNote.frequency.value = intervals[0]
      this.audio.rootNote.frequency.value = rootNote
      this.audio.majorSecond.frequency.value = intervals[1]
      this.audio.minorThird.frequency.value = intervals[2]
      this.audio.majorThird.frequency.value = intervals[3]
      this.audio.perfectFourth.frequency.value = intervals[4]
      this.audio.diminishedFifth.frequency.value = intervals[5]
      this.audio.perfectFifth.frequency.value = intervals[6]
      this.audio.augmentedFifth.frequency.value = intervals[7]
      this.audio.sixthDiminishedSeventh.frequency.value = intervals[8]
      this.audio.minorSeventh.frequency.value = intervals[9]
      this.audio.majorSeventh.frequency.value = intervals[10]
    }

    const toneStart = () => {
      // BUG: sounds like I'm still getting double attack sometimes? Seems to happen when moving to new note slice before previous release has ended. It might also just be the popping/clipping issues, I'm not sure
      // NOTE: seems like the tail of the previous un-released note is changing pitch first, before the new attack triggers, causing the double attack effect. Not sure how to fix this other than to just give all note slices their own set of synths
      // NOTE: This problem will kind of solve itself if I can figure out how to make the note slices border each other seamlessly, since there will be no mouse-offs when moving between slices, but there still will be when moving quicly through the middle of the circle
      // NOTE: also, getting rid of sharp attacks in the amplitude envelopes makes the problem practically non-existant, so maybe that's a last resort solution
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
    // const changeXValue = (value) => {
    //   if (this.audio.thirdVolume.volume.value > -0.9 || value > -0.9){
    //     this.audio.thirdVolume.volume.value = value * 15
    //   }
    //   if (this.audio.fifthVolume.volume.value > -0.6 || value > -0.6){
    //     this.audio.fifthVolume.volume.value = value * 30
    //   }
    //   if (this.audio.seventhVolume.volume.value > -0.3 || value > -0.3){
    //     this.audio.seventhVolume.volume.value = value * 60
    //   }
    //   console.log('X', value)
    // }
    const changeYValue = (value) => {
      console.log('Y', value)
      const intervals = this.audio.harmonize(value, [-12, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
      this.audio.bassNote.frequency.value = intervals[0]
      this.audio.rootNote.frequency.value = value
      this.audio.majorSecond.frequency.value = intervals[1]
      this.audio.minorThird.frequency.value = intervals[2]
      this.audio.majorThird.frequency.value = intervals[3]
      this.audio.perfectFourth.frequency.value = intervals[4]
      this.audio.diminishedFifth.frequency.value = intervals[5]
      this.audio.perfectFifth.frequency.value = intervals[6]
      this.audio.augmentedFifth.frequency.value = intervals[7]
      this.audio.sixthDiminishedSeventh.frequency.value = intervals[8]
      this.audio.minorSeventh.frequency.value = intervals[9]
      this.audio.majorSeventh.frequency.value = intervals[10]
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
      // changeXValue,
      changeYValue,
      toneStart,
      toneStop,
    }
  }

  toggleKeydown = (key) => {
    this.audio.keyDowns[key] = !this.audio.keyDowns[key]
    this.props.toggleKeyDownAction(key)
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

  toneEffectsProps = () => {

    const loadSettings = (settings) => {
      // NOTE: probably want to call ".dispose" on all the old Tone objects
      for (let key in this.audio){
        if (this.audio[key].dispose){
          this.audio[key].dispose()
        }
      }
      this.audio = Audio(settings)
      // NOTE: need to update store audioSettings, or all the controls won't update
      this.props.loadSettingsAction(settings)
    }

    const changeMasterVolume = (value) => {
      this.audio.master.volume.value = value
      this.props.changeMasterVolumeAction(value)
    }

    const toneControls = () => {
      return {
        changeWaveform:(waveform) => {
          const currentPartials = this.props.audioSettings.synths.oscillator.type.split('').filter(char => {
            return !isNaN(Number(char))
          }).join('')
          const setting = waveform + currentPartials
          this.audio.bassNote.oscillator.type = setting
          this.audio.rootNote.oscillator.type = setting
          this.audio.majorSecond.oscillator.type = setting
          this.audio.minorThird.oscillator.type = setting
          this.audio.majorThird.oscillator.type = setting
          this.audio.perfectFourth.oscillator.type = setting
          this.audio.diminishedFifth.oscillator.type = setting
          this.audio.perfectFifth.oscillator.type = setting
          this.audio.augmentedFifth.oscillator.type = setting
          this.audio.minorSeventh.oscillator.type = setting
          this.audio.majorSeventh.oscillator.type = setting
          this.audio.sixthDiminishedSeventh.oscillator.type = setting
          this.props.changeWaveformAction(setting)
        },
      //   filterType:(type) => {
      //     console.log('changing type');
      //     this.audio.filter.type = type
      //     this.props.changeFilterTypeAction(type)
      //     console.log(this.audio.filter.type)
      //   },
      //   filterFrequency:(value) => {
      //     console.log('changing frequency');
      //     this.audio.filter.frequency.value = value
      //     this.props.changeEffectValueAction('filter', 'frequency', value)
      //     console.log(this.audio.filter.frequency.value)
      //     console.log(this.audio.filter)
      //     console.log(this.props.audioSettings)
      //   },
      //   filterResonance:(value) => {
      //     console.log('changing resonance');
      //     this.audio.filter.Q.value = value
      //     this.props.changeEffectValueAction('filter', 'Q', value)
      //     console.log(this.audio.filter.Q.value)
      // }
      changePartials:(partials) => {
        const currentWaveform = this.props.audioSettings.synths.oscillator.type.split('').filter(char => {
          return isNaN(Number(char))
        }).join('')
        const setting = currentWaveform + partials
        this.audio.bassNote.oscillator.type = setting
        this.audio.rootNote.oscillator.type = setting
        this.audio.majorSecond.oscillator.type = setting
        this.audio.minorThird.oscillator.type = setting
        this.audio.majorThird.oscillator.type = setting
        this.audio.perfectFourth.oscillator.type = setting
        this.audio.diminishedFifth.oscillator.type = setting
        this.audio.perfectFifth.oscillator.type = setting
        this.audio.augmentedFifth.oscillator.type = setting
        this.audio.minorSeventh.oscillator.type = setting
        this.audio.majorSeventh.oscillator.type = setting
        this.audio.sixthDiminishedSeventh.oscillator.type = setting
        this.props.changeWaveformAction(setting)
      }
    }
  }

    const reverbControls = () => {
      return {
        roomSize:(value) => {
          console.log('changing roomsize');
          this.audio.reverb.roomSize.value = value
          this.props.changeEffectValueAction('reverb', 'roomSize', value)
          console.log(this.audio.reverb.roomSize.value)
        },
        wet:(value) => {
          console.log('changing wet');
          this.audio.reverb.wet.value = value
          this.props.changeEffectValueAction('reverb', 'wet', value)
          console.log(this.audio.reverb.wet.value);
        }
      }
    }

    const delayControls = () => {
      return {
        delayTime:(value) => {
          console.log('changing delaytime');
          this.audio.delay.delayTime.value = value
          this.props.changeEffectValueAction('delay', 'delayTime', value)
          console.log(this.audio.delay.delayTime.value);
        },
        feedback:(value) => {
          console.log('changing feedback');
          this.audio.delay.feedback.value = value
          this.props.changeEffectValueAction('delay', 'feedback', value)
          console.log(this.audio.delay.feedback.value);
        },
        wet:(value) => {
          console.log('changing wet');
          this.audio.delay.wet.value = value
          this.props.changeEffectValueAction('delay', 'wet', value)
          console.log(this.audio.delay.wet.value);
        },
      }
    }

    const vibratoControls = () => {
      return {
        frequency:(value) => {
          console.log('changing frequency');
          this.audio.vibrato.frequency.value = value
          this.props.changeEffectValueAction('vibrato', 'frequency', value)
          console.log(this.audio.vibrato.frequency.value);
        },
        depth:(value) => {
          console.log('changing depth');
          this.audio.vibrato.depth.value = value
          this.props.changeEffectValueAction('vibrato', 'depth', value)
          console.log(this.audio.vibrato.depth.value);
        },
      }
    }

    const tremoloControls = () => {
      return {
        frequency:(value) => {
          console.log('changing frequency');
          this.audio.tremolo.frequency.value = value
          this.props.changeEffectValueAction('tremolo', 'frequency', value)
          console.log(this.audio.tremolo.frequency.value);
        },
        depth:(value) => {
          console.log('changing depth');
          this.audio.tremolo.depth.value = value
          this.props.changeEffectValueAction('tremolo', 'depth', value)
          console.log(this.audio.tremolo.depth.value);
        },
        spread:(value) => {
          console.log('changing spread');
          console.log(this.audio.tremolo.spread);
          this.audio.tremolo.spread = value
          this.props.changeEffectValueAction('tremolo', 'spread', value)
          console.log(this.audio.tremolo.spread);
        },
        wet:(value) => {
          console.log('changing wet');
          this.audio.tremolo.wet.value = value
          this.props.changeEffectValueAction('tremolo', 'wet', value)
          console.log(this.audio.tremolo.wet.value);
        },
      }
    }

    return {
      loadSettings,
      changeMasterVolume,
      toneControls: toneControls(),
      reverbControls: reverbControls(),
      delayControls: delayControls(),
      vibratoControls: vibratoControls(),
      tremoloControls: tremoloControls(),
    }

  }

  frequencyNoteDataProps = () => {
    // const getAnalyserValues = () => {
    //   return this.audio.fftAnalyser.getValue()
    // }
    const getRootNote = () => {
      return this.audio.convertFrequencyToNote(this.audio.rootNote.frequency.value)
    }
    const getActiveNotes = () => {
      return this.audio.activeNotes.map(note => {
        return this.audio.convertFrequencyToNote(note.frequency.value)
      })
    }
    const getRootFrequency = () => {
      return this.audio.rootNote.frequency.value
    }
    return {
      // getAnalyserValues,
      getRootNote,
      getActiveNotes,
      getRootFrequency,
    }
  }

  visualizerProps = () => {
    const getAnalyserValues = () => {
      return this.audio.waveAnalyser.getValue()
    }
    return {
      getAnalyserValues
    }
  }

  render(){
    return (
      <InterfaceContainer
        toneEffectsProps={this.toneEffectsProps()}
        visualizerProps={this.visualizerProps()}
        circleControlProps={this.circleControlProps()}
        chromaticControlProps={this.chromaticControlProps()}
        frequencyNoteDataProps={this.frequencyNoteDataProps()}
        // keyDowns={this.state}
      />
    )
  }

  componentDidUpdate(){
    // NOTE: normalizes interval volume settings when switching back to circle mode
    // if (this.props.interfaceMode.circleControl === true){
    //   this.audio.thirdVolume.volume.value = 0
    //   this.audio.fifthVolume.volume.value = 0
    //   this.audio.seventhVolume.volume.value = 0
    // }
  }

  componentDidMount(){
    this.audio = Audio(this.props.audioSettings)
    // NOTE: Tone/effects settings should be saved in Redux store and passed in on mount, but since they do not effect rendering at this level, they will also have to manually modify the Audio module when being changed.
    // IDEA: Maybe a lifecycle method like componentDidUpdate or something would help? Something that will fire when the props change, which could then re-initialize the Audio module
    // NOTE: I don't need to re-initialize Audio on every change though, and it looks like Tone can change most settings (even oscillator types) without re-initializing, so maybe I should just make all changes through prop which also change Redux store (for saving later with Redux-Persist, or just protecting against weird re-render/re-initialize stuff that might come up)

    const checkIfControlKey = (key) => {
      return (key === 'KeyQ' ||
        key === 'KeyA' ||
        key === 'KeyW' ||
        key === 'KeyS' ||
        key === 'KeyD' ||
        key === 'KeyE' ||
        key === 'KeyF' ||
        key === 'KeyR' ||
        key === 'KeyG' ||
        key === 'KeyT' ||
        key === 'KeyZ' ||
        key === 'KeyX' ||
        key === 'KeyC' ||
        key === 'KeyV' ||
        key === 'Space')
    }

    document.body.addEventListener('keydown', event=>{
      if (!this.props.textInputFocus &&
          !event.ctrlKey &&
          !event.altKey &&
          !event.metaKey &&
          !event.shiftKey){
        const key = event.code
        if (checkIfControlKey(key)){
          event.preventDefault()
          if (this.audio.keyDowns[key] === false){
            this.keyDown(key)
          }
        }
      }
    })

    document.body.addEventListener('keyup', event=>{
      if (!this.props.textInputFocus){
        const key = event.code
        if (checkIfControlKey(key)){
          event.preventDefault()
          if (this.audio.keyDowns[key] === true){
            this.keyUp(key)
          }
        }
      }
    })

  }

}

function mapStateToProps(state) {
  return {
    interfaceMode: state.interfaceMode,
    audioSettings: state.audioSettings,
    keyDowns: state.keyDowns,
    textInputFocus: state.textInputFocus,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    changeMasterVolumeAction: (value) => dispatch(changeMasterVolumeAction(value)),
    changeEffectValueAction: (effect, setting, value) => dispatch(changeEffectValueAction(effect, setting, value)),
    changeWaveformAction: (waveform) => dispatch(changeWaveformAction(waveform)),
    // changeFilterTypeAction: (type) => dispatch(changeFilterTypeAction(type)),
    toggleKeyDownAction: (key) => dispatch(toggleKeyDownAction(key)),
    loadSettingsAction: (settings) => dispatch(loadSettingsAction(settings)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioController)
