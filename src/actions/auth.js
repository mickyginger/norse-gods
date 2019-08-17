import axios from 'axios'
import Auth from '../lib/Auth'
import history from '../history'
import { toast } from 'react-toastify'

export const AUTH_FAILURE = 'AUTH_FAILURE'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const LOGOUT_USER = 'LOGOUT_USER'
export const UPDATE_FORM_DATA = 'UPDATE_FORM_DATA'

export function authSuccess(token) {
  Auth.setToken(token)
  return {
    type: AUTH_SUCCESS,
    payload: Auth.getPayload()
  }
}

function authFailure(errors) {
  Auth.removeToken()
  return {
    type: AUTH_FAILURE,
    errors
  }
}

export function loginUser(credentials) {
  return function(dispatch) {

    return axios.post('/api/login', credentials)
      .then(res => {
        history.push('/')
        toast.success(res.data.message)
        dispatch(authSuccess(res.data.token))
      })
      .catch(() => {
        const errors = {
          email: 'Invalid credentials',
          password: 'Invalid credentials'
        }
        dispatch(authFailure(errors))
      })
  }
}

export function registerUser(credentials) {
  return function(dispatch) {

    return axios.post('/api/register', credentials)
      .then(res => {
        toast.success(res.data.message)
        history.push('/login')
      })
      .catch(err => dispatch(authFailure(err.response.data.errors)))
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
