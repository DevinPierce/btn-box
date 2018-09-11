const initialState = false

export default function textInputFocusReducer(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_TEXT_INPUT_FOCUS':
      return !state
    default:
      return state
  }
}
