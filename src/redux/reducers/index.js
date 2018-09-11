import {combineReducers} from 'redux'
import interfaceChangeReducer from './interfaceChangeReducer'
import audioSettingsReducer from './audioSettingsReducer'
import keyDownsReducer from './keyDownsReducer'

export default combineReducers({
  interfaceMode: interfaceChangeReducer,
  audioSettings: audioSettingsReducer,
  keyDowns: keyDownsReducer,
})
