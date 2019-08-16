import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_USER
} from '../actions'

const initialState = {
  isAuthenticated: false,
  payload: {},
  errors: {}
}

export default function auth(state = initialState, action) {
  switch(action.type){
    case LOGIN_FAILURE:
      // make AJAX request
      return {...state, isAuthenticated: false, payload: {}, errors: action.errors }
    case LOGIN_SUCCESS:
      // make AJAX request
      // save token in localStorage
      return {...state, isAuthenticated: true, payload: action.payload, errors: {} }
    case LOGOUT_USER:
      // delete token
      return {}
    default:
      return state
  }
}
