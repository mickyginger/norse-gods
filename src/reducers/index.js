import { combineReducers } from 'redux'
import auth from './auth'
import figures from './figures'

export default combineReducers({
  auth,
  figures
})
