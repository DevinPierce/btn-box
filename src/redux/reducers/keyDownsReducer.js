const initialState = {
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

export default function interfaceChangeReducer(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_KEYDOWN':
      return {
        ...state,
        [action.key]: !state[action.key]
      }
    default:
      return state
  }
}
