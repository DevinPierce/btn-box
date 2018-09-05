import {combineReducers} from 'redux'
import interfaceChangeReducer from './interfaceChangeReducer'
import audioSettingsReducer from './audioSettingsReducer'

export default combineReducers({
  interfaceMode: interfaceChangeReducer,
  audioSettings: audioSettingsReducer,
})
