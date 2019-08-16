import axios from 'axios'
import Auth from '../lib/Auth'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT_USER = 'LOGOUT_USER'

function loginSuccess(token) {
  Auth.setToken(token)
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
      .then(res => dispatch(loginSuccess(res.data.token)))
      .catch(() => dispatch(loginFailure()))
  }
}

export function logoutUser() {
  return { type: LOGOUT_USER }
}
