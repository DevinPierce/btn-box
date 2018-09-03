const initialState = {
  chromaticControl: false,
  circleControl: true
}

export default function interfaceChangeReducer(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_MOUSE_CONTROL_VIEW':
      return {
        chromaticControl: !state.chromaticControl,
        circleControl: !state.circleControl
      }
    default:
      return state
  }
}
