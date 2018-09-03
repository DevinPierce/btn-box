import {combineReducers} from 'redux'
import interfaceChangeReducer from './interfaceChangeReducer'

export default combineReducers({
  interfaceMode: interfaceChangeReducer
})
