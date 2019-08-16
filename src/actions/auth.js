import axios from 'axios'
import Auth from '../lib/Auth'
import history from '../history'
import { toast } from 'react-toastify'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT_USER = 'LOGOUT_USER'
export const UPDATE_FORM_DATA = 'UPDATE_FORM_DATA'

function loginSuccess(token, message) {
  Auth.setToken(token)
  history.push('/')
  toast.success(message)
  return {
    type: LOGIN_SUCCESS,
    payload: Auth.getPayload()
  }
}

function loginFailure() {
  Auth.removeToken()
  const errors = {
    email: 'Invalid credentials',
    password: 'Invalid credentials'
  }
  return {
    type: LOGIN_FAILURE,
    errors
  }
}

export function loginUser(credentials) {
  return function(dispatch) {

    return axios.post('/api/login', credentials)
      .then(res => dispatch(loginSuccess(res.data.token, res.data.message)))
      .catch(() => dispatch(loginFailure()))
  }
}

export function updateFormData(formData, errors) {
  return { type: UPDATE_FORM_DATA, formData, errors }
}

export function logoutUser() {
  Auth.removeToken()
  history.push('/')
  return { type: LOGOUT_USER }
}
