import {
  TOGGLE_NAVBAR,
  CLOSE_NAVBAR
} from '../actions/navbar'

export default function navbarIsOpen(state = false, action) {
  switch(action.type) {
    case TOGGLE_NAVBAR:
      return !state
    case CLOSE_NAVBAR:
      return false
    default:
      return state
  }
}
