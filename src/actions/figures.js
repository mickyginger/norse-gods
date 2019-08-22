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

export const GET_FIGURE_SUCCESS = 'GET_FIGURE_SUCCESS'

export function getFigureSuccess(data){
  return {
    type: GET_FIGURE_SUCCESS,
    data
  }
}

export function getFigure(id){
  return function(dispatch, getState){
    const { figures } = getState()
    if(figures.length && figures.lastRequest > Date.now() - 1000 * 60){
      return
    } else {
      axios.get(`/api/figures/${id}`)
        .then(res => {
          dispatch(getFigureSuccess(res))
        })
    }
  }
}
