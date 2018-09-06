const initialState = {
  synths: {
    oscillator: {
      type: 'sawtooth4',
    },
    envelope: {
      attack: 0.01,
      decay: 0.1,
      sustain: 0.9,
      release: 1
    },
  },

  master: {
    volume: -6
  },

  reverb: {
    roomSize: 0.1,
    dampening: 20000,
    wet: 0.12
  },
  delay: {
    delayTime: 0.25,
    feedback: 0.5,
    wet: 0.12
  },
  filter: {
    type: 'lowpass',
    frequency: 20000,
    Q: 1,
  },
  vibrato: {
    maxDelay: 0.005,
    frequency: 5,
    depth: 0.05,
    type: 'sine',
    wet: 0
  },
  tremolo: {
    frequency: 8,
    type: 'sine',
    depth: 0,
    spread: 0,
    wet: 0
  },
}

export default function audioSettingsReducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_MASTER_VOLUME':
      return {
        ...state,
        master: {
          volume: action.value
        }
      }
    case 'CHANGE_EFFECT_VALUE':
      return {
        ...state,
        [action.effect]: {
          ...state[action.effect],
          [action.setting]: action.value
        }
      }
    case 'CHANGE_WAVEFORM':
      return {
        ...state,
        synths: {
          ...state.synths,
          oscillator: {
            type: action.waveform
          }
        }
      }
    default:
      return state
  }
}
