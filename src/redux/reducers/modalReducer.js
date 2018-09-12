const initialState = false

export default function modalReducer(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_MODAL':
      return !state
    default:
      return state
  }
}
