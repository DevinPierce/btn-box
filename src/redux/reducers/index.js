import {combineReducers} from 'redux'
import interfaceChangeReducer from './interfaceChangeReducer'
import audioSettingsReducer from './audioSettingsReducer'
import keyDownsReducer from './keyDownsReducer'
import saveLoadDeleteSettingsReducer from './saveLoadDeleteSettingsReducer'
import textInputFocusReducer from './textInputFocusReducer'

export default combineReducers({
  interfaceMode: interfaceChangeReducer,
  audioSettings: audioSettingsReducer,
  keyDowns: keyDownsReducer,
  savedSettings: saveLoadDeleteSettingsReducer,
  textInputFocus: textInputFocusReducer,
})
