import { combineReducers } from 'redux'
import auth from './auth'
import navbarIsOpen from './navbar'

export default combineReducers({
  auth,
  navbarIsOpen
})
