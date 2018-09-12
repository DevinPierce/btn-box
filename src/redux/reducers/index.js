import {combineReducers} from 'redux'
import interfaceChangeReducer from './interfaceChangeReducer'
import audioSettingsReducer from './audioSettingsReducer'
import keyDownsReducer from './keyDownsReducer'
import saveLoadDeleteSettingsReducer from './saveLoadDeleteSettingsReducer'
import textInputFocusReducer from './textInputFocusReducer'
import modalReducer from './modalReducer'

export default combineReducers({
  interfaceMode: interfaceChangeReducer,
  audioSettings: audioSettingsReducer,
  keyDowns: keyDownsReducer,
  savedSettings: saveLoadDeleteSettingsReducer,
  textInputFocus: textInputFocusReducer,
  modalOpen: modalReducer,
})
