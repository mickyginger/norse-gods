import axios from 'axios'
import { arrayToObject } from '../lib/helpers'

export const GET_FIGURES_SUCCESS = 'FIGURES_SUCCESS'

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
