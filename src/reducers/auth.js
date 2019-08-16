import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_USER,
  UPDATE_FORM_DATA
} from '../actions/auth'

const initialState = {
  isAuthenticated: false,
  payload: {},
  errors: {},
  formData: {}
}

export default function auth(state = initialState, action) {
  switch(action.type){
    case UPDATE_FORM_DATA:
      return {
        ...state,
        formData: action.formData,
        errors: action.errors
      }
    case LOGIN_FAILURE:
      // make AJAX request
      return {
        ...state,
        isAuthenticated: false,
        payload: {},
        errors: action.errors
      }
    case LOGIN_SUCCESS:
      // make AJAX request
      // save token in localStorage
      return {
        ...state,
        isAuthenticated: true,
        payload: action.payload,
        errors: {},
        formData: {}
      }
    case LOGOUT_USER:
      // delete token
      return {
        ...state,
        isAuthenticated: false,
        payload: {}
      }
    default:
      return state
  }
}
