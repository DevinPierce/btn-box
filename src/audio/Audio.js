import Tone from 'tone'

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
    attack: 0.00,
    decay: 0.0,
    sustain: 0.9,
    release: 0.5
  },
  filterEnvelope: {
    attack: 0.0,
    decay: 0.0,
    sustain: 0.5,
    release: 2,
    baseFrequency: 200,
    octaves: 7,
    exponent: 2
  }
}

function Audio (settings = monoSynthDefaults) {

  const limiter = new Tone.Limiter().toMaster()

  const reverb = new Tone.JCReverb({roomSize: 0.1}).connect(limiter)

  const mixer = new Tone.Volume({volume: -6}).connect(reverb)

  const mouseOn = false

  const bassNote = new Tone.MonoSynth(settings).connect(mixer)

  const rootNote = new Tone.MonoSynth(settings).connect(mixer)

  const thirdVolume = new Tone.Volume().connect(mixer)
  const fifthVolume = new Tone.Volume().connect(mixer)
  const seventhVolume = new Tone.Volume().connect(mixer)

  const minorThird = new Tone.MonoSynth(settings).connect(thirdVolume)
  const majorThird = new Tone.MonoSynth(settings).connect(thirdVolume)
  const diminishedFifth = new Tone.MonoSynth(settings).connect(fifthVolume)
  const perfectFifth = new Tone.MonoSynth(settings).connect(fifthVolume)
  const augmentedFifth = new Tone.MonoSynth(settings).connect(fifthVolume)
  const minorSeventh = new Tone.MonoSynth(settings).connect(seventhVolume)
  const majorSeventh = new Tone.MonoSynth(settings).connect(seventhVolume)

  const keyDowns = {
    KeyQ: false,
    KeyA: false,
    KeyW: false,
    KeyS: false,
    KeyD: false,
    KeyF: false,

    Space: false
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
    activeNotes: []
  }

}

export default Audio;
