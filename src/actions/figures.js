import axios from 'axios'
import Auth from '../lib/Auth'
import { arrayToObject } from '../lib/helpers'

export const GET_FIGURES_SUCCESS = 'GET_FIGURES_SUCCESS'
export const POST_FIGURE_SUCCESS = 'POST_FIGURE_SUCCESS'

export function getFiguresSuccess(data) {
  return {
    type: GET_FIGURES_SUCCESS,
    data
  }
}

export function getFigures() {
  return function(dispatch, getState) {
    const { figures } = getState()
    if(figures.lastRequest > Date.now() - 1000 * 60) return false // no need to make another request

    axios.get('/api/figures')
      .then(res => {
        const data = arrayToObject(res.data)
        dispatch(getFiguresSuccess(data))
      })
  }
}

export function postFiguresSuccess(data) {
  return {
    type: POST_FIGURE_SUCCESS,
    data
  }
}

export function postFigure(formData) {
  return function(dispatch) {
    axios.post('/api/figures', formData, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => dispatch(postFiguresSuccess(res.data)))
  }
}
