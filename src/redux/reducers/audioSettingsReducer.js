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
    volume: -12
  },

  reverb: {
    roomSize: 0.2,
    dampening: 5000,
    wet: 0.25
  },
  delay: {
    delayTime: 0.25,
    feedback: 0.5,
    wet: 0.25
  },
  filter: {
    type: 'lowpass',
    frequency: 20000,
    Q: 1
  },
  vibrato: {
    maxDelay: 0.005,
    frequency: 5,
    depth: 0.1,
    type: 'sine',
    wet: 1
  },
  tremolo: {
    frequency: 8,
    type: 'sine',
    depth: 0,
    spread: 0,
    wet: 1
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
    default:
      return state
  }
}
