import Tone from 'tone'

function Audio (settings) {

  const limiter = new Tone.Limiter().toMaster()

  const master = new Tone.Volume(settings.master).connect(limiter)

  const reverb = new Tone.Freeverb(settings.reverb).connect(master)
  const delay = new Tone.FeedbackDelay(settings.delay).connect(reverb)
  const filter = new Tone.Filter(settings.filter).connect(delay)
  const vibrato = new Tone.Vibrato(settings.vibrato).connect(filter)
  const tremolo = new Tone.Tremolo(settings.tremolo).connect(vibrato).start()

  const mixer = new Tone.Volume({volume: -6}).connect(tremolo)

  const mouseOn = false

  const bassNote = new Tone.Synth(settings.synths).connect(mixer)

  const rootNote = new Tone.Synth(settings.synths).connect(mixer)

  const thirdVolume = new Tone.Volume().connect(mixer)
  const fifthVolume = new Tone.Volume().connect(mixer)
  const seventhVolume = new Tone.Volume().connect(mixer)

  const minorThird = new Tone.Synth(settings.synths).connect(thirdVolume)
  const majorThird = new Tone.Synth(settings.synths).connect(thirdVolume)
  const diminishedFifth = new Tone.Synth(settings.synths).connect(fifthVolume)
  const perfectFifth = new Tone.Synth(settings.synths).connect(fifthVolume)
  const augmentedFifth = new Tone.Synth(settings.synths).connect(fifthVolume)
  const minorSeventh = new Tone.Synth(settings.synths).connect(seventhVolume)
  const majorSeventh = new Tone.Synth(settings.synths).connect(seventhVolume)

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

  // function updateSettings (audioSettings) {
  //
  //   // IDEA: this shit sucks, maybe give up on using redux to update settings, just use passed control functions, set Audio values in AudioController, and then update Redux for controlled inputs
  // }

  return {
    master,

    reverb,
    delay,
    filter,
    vibrato,
    tremolo,

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
    activeNotes: [],

    // transpose,
    harmonize,
    // updateSettings,
  }

}

export default Audio;
