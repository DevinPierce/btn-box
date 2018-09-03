import Tone from 'tone'

const synthDefaults = {
  oscillator: {
    type: 'triangle',
  },
  envelope: {
    attack: 0.005,
    decay: 0.1,
    sustain: 0.3,
    release: 1
  },
}

function Audio (settings = synthDefaults) {

  const limiter = new Tone.Limiter().toMaster()

  const reverb = new Tone.JCReverb({roomSize: 0.1}).connect(limiter)
  const filter = new Tone.Filter({frequency: 20000}).connect(reverb)

  const mixer = new Tone.Volume({volume: -6}).connect(filter)

  const mouseOn = false

  const bassNote = new Tone.Synth(settings).connect(mixer)

  const rootNote = new Tone.Synth(settings).connect(mixer)

  const thirdVolume = new Tone.Volume().connect(mixer)
  const fifthVolume = new Tone.Volume().connect(mixer)
  const seventhVolume = new Tone.Volume().connect(mixer)

  const minorThird = new Tone.Synth(settings).connect(thirdVolume)
  const majorThird = new Tone.Synth(settings).connect(thirdVolume)
  const diminishedFifth = new Tone.Synth(settings).connect(fifthVolume)
  const perfectFifth = new Tone.Synth(settings).connect(fifthVolume)
  const augmentedFifth = new Tone.Synth(settings).connect(fifthVolume)
  const minorSeventh = new Tone.Synth(settings).connect(seventhVolume)
  const majorSeventh = new Tone.Synth(settings).connect(seventhVolume)

  const keyDowns = {
    KeyQ: false,
    KeyA: false,
    KeyW: false,
    KeyS: false,
    KeyD: false,
    KeyF: false,

    Space: false
  }

  // const transpose = (frequency, interval) => {
  //   return Tone.Frequency(frequency).transpose(interval)
  // }

  const harmonize = (frequency, intervals) => {
    return Tone.Frequency(frequency).harmonize(intervals)
  }

  return {
    reverb,

    mixer,

    mouseOn,

    bassNote,

    rootNote,

    thirdVolume,
    fifthVolume,
    seventhVolume,

    minorThird,
    majorThird,
    diminishedFifth,
    perfectFifth,
    augmentedFifth,
    minorSeventh,
    majorSeventh,

    keyDowns,

    chordDefinitions: {

    },

    chordMap: {
      KeyQ: [rootNote, majorThird, augmentedFifth],
      KeyA: [rootNote, majorThird, perfectFifth],
      KeyW: [rootNote, minorThird, diminishedFifth],
      KeyS: [rootNote, minorThird, perfectFifth],
      KeyD: [rootNote, majorThird, perfectFifth, minorSeventh],
      KeyF: [rootNote, majorThird, perfectFifth, majorSeventh],

      Space: [bassNote]
    },

    activeChords: [],
    activeNotes: [],

    // transpose,
    harmonize,
  }

}

export default Audio;
