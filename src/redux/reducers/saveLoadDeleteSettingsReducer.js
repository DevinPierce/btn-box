const uuidv1 = require('uuid/v1');

const initialState = []

export default function saveLoadDeleteSettingsReducer(state = initialState, action) {
  switch (action.type) {
    case 'SAVE_SETTINGS':
      return [
        ...state,
        {
          name: action.payload.name,
          id: uuidv1(),
          settings: action.payload.settings
        }
      ]
    case 'DELETE_SETTINGS':
      return [
        ...state.filter(setting => setting.id !== action.payload.id)
      ]
    default:
      return state
  }
}
