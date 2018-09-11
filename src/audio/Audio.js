import Tone from 'tone'

function Audio (settings) {

  const limiter = new Tone.Limiter({threshold: -12}).toMaster()

  const waveAnalyser = new Tone.Analyser({size: 256, type: 'waveform'})
  // const fftAnalyser = new Tone.Analyser({size: 256, type: 'fft'})

  const master = new Tone.Volume(settings.master).connect(limiter)
  master.connect(waveAnalyser)
  // master.connect(fftAnalyser)

  const reverb = new Tone.Freeverb(settings.reverb).connect(master)
  const delay = new Tone.FeedbackDelay(settings.delay).connect(reverb)
  // const filter = new Tone.Filter(settings.filter).connect(delay)
  const vibrato = new Tone.Vibrato(settings.vibrato).connect(delay)
  const tremolo = new Tone.Tremolo(settings.tremolo).connect(vibrato).start()

  const mixer = new Tone.Volume({volume: 0}).connect(tremolo)

  const mouseOn = false

  const bassNote = new Tone.Synth(settings.synths).connect(mixer)

  const rootNote = new Tone.Synth(settings.synths).connect(mixer)

  const thirdVolume = new Tone.Volume().connect(mixer)
  const fifthVolume = new Tone.Volume().connect(mixer)
  const seventhVolume = new Tone.Volume().connect(mixer)

  const majorSecond = new Tone.Synth(settings.synths).connect(thirdVolume)
  const minorThird = new Tone.Synth(settings.synths).connect(thirdVolume)
  const majorThird = new Tone.Synth(settings.synths).connect(thirdVolume)
  const perfectFourth = new Tone.Synth(settings.synths).connect(thirdVolume)
  const diminishedFifth = new Tone.Synth(settings.synths).connect(fifthVolume)
  const perfectFifth = new Tone.Synth(settings.synths).connect(fifthVolume)
  const augmentedFifth = new Tone.Synth(settings.synths).connect(fifthVolume)
  const minorSeventh = new Tone.Synth(settings.synths).connect(seventhVolume)
  const majorSeventh = new Tone.Synth(settings.synths).connect(seventhVolume)
  const sixthDiminishedSeventh = new Tone.Synth(settings.synths).connect(seventhVolume)

  const keyDowns = {
    KeyQ: false,
    KeyA: false,
    KeyW: false,
    KeyS: false,
    KeyD: false,
    KeyE: false,
    KeyF: false,
    KeyR: false,
    KeyG: false,
    KeyT: false,
    KeyZ: false,
    KeyX: false,
    KeyC: false,
    KeyV: false,

    Space: false
  }

  // const transpose = (frequency, interval) => {
  //   return Tone.Frequency(frequency).transpose(interval)
  // }

  const convertFrequencyToNote = (frequency) => {
    return Tone.Frequency(frequency).toNote()
  }

  const harmonize = (frequency, intervals) => {
    return Tone.Frequency(frequency).harmonize(intervals)
  }

  // function updateSettings (audioSettings) {
  //
  //   // IDEA: this shit sucks, maybe give up on using redux to update settings, just use passed control functions, set Audio values in AudioController, and then update Redux for controlled inputs
  // }

  return {
    waveAnalyser,
    // fftAnalyser,

    master,

    reverb,
    delay,
    // filter,
    vibrato,
    tremolo,

    mouseOn,

    bassNote,

    rootNote,

    thirdVolume,
    fifthVolume,
    seventhVolume,

    majorSecond,
    minorThird,
    majorThird,
    perfectFourth,
    diminishedFifth,
    perfectFifth,
    augmentedFifth,
    minorSeventh,
    majorSeventh,
    sixthDiminishedSeventh,

    keyDowns,

    chordMap: {
      KeyQ: [rootNote, majorThird, augmentedFifth],
      KeyA: [rootNote, majorThird, perfectFifth],
      KeyW: [rootNote, minorThird, diminishedFifth],
      KeyS: [rootNote, minorThird, perfectFifth],
      KeyD: [rootNote, majorThird, perfectFifth, minorSeventh],
      KeyE: [rootNote, majorThird, perfectFifth, majorSeventh],
      KeyF: [rootNote, minorThird, perfectFifth, minorSeventh],
      KeyR: [rootNote, minorThird, perfectFifth, majorSeventh],
      KeyG: [rootNote, minorThird, diminishedFifth, sixthDiminishedSeventh],
      KeyT: [rootNote, minorThird, diminishedFifth, minorSeventh],
      KeyZ: [rootNote, majorThird, perfectFifth, sixthDiminishedSeventh],
      KeyX: [rootNote, minorThird, perfectFifth, sixthDiminishedSeventh],
      KeyC: [rootNote, majorSecond, perfectFifth],
      KeyV: [rootNote, perfectFourth, perfectFifth],

      Space: [bassNote]
    },

    activeChords: [],
    activeNotes: [],

    // transpose,
    convertFrequencyToNote,
    harmonize,
    // updateSettings,
  }

}

export default Audio;
