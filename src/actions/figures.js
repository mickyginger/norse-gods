import axios from 'axios'
import Auth from '../lib/Auth'
import history from '../history'
import { arrayToObject } from '../lib/helpers'

export const GET_FIGURES_SUCCESS = 'GET_FIGURES_SUCCESS'
export const GET_FIGURE_SUCCESS = 'GET_FIGURE_SUCCESS'
export const POST_FIGURE_SUCCESS = 'POST_FIGURE_SUCCESS'
export const POST_FIGURE_FAILURE = 'POST_FIGURE_FAILURE'
export const UPDATE_FORM_DATA = 'UPDATE_FORM_DATA'
export const DELETE_FIGURE_SUCCESS = 'DELETE_FIGURE_SUCCESS'

export function getFiguresSuccess(data) {
  return {
    type: GET_FIGURES_SUCCESS,
    data
  }
}

export function getFigures() {
  return function(dispatch, getState) {
    const { figures } = getState()
    if(figures.lastRequest > Date.now() - 1000 * 60 * 10) return false // no need to make another request

    axios.get('/api/figures')
      .then(res => {
        const data = arrayToObject(res.data)
        dispatch(getFiguresSuccess(data))
      })
  }
}


export function getFigureSuccess(data){
  return {
    type: GET_FIGURE_SUCCESS,
    data
  }
}

export function postFigureSuccess(data) {
  return {
    type: POST_FIGURE_SUCCESS,
    data
  }
}

export function getFigure(id){
  return function(dispatch, getState){
    const { figures } = getState()
    if(figures.data[id]) return figures.data[id]

    axios.get(`/api/figures/${id}`)
      .then(res => dispatch(getFigureSuccess(res.data)))
  }
}

export function postFigureFailure(errors) {
  return {
    type: POST_FIGURE_FAILURE,
    errors
  }
}

export function postFigure(formData) {
  return function(dispatch) {
    axios.post('/api/figures', formData, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => {
        dispatch(postFigureSuccess(res.data))
        history.push('/figures')
      })
      .catch(err => dispatch(postFigureFailure(err.response.data.errors)))
  }
}

export function deleteFigureSuccess(data){
  return {
    type: DELETE_FIGURE_SUCCESS,
    data
  }
}

export function deleteFigure(id){
  return function(dispatch){
    axios.delete(`/api/figures/${id}`,{
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => {
        dispatch(deleteFigureSuccess(res.data))
          .then(axios.get('/api/figures')
            .then(res => {
              const data = arrayToObject(res.data)
              dispatch(getFiguresSuccess(data))
              history.push('/figures')
            }))

      })
  }
}

export function updateFormData(formData, errors) {
  return { type: UPDATE_FORM_DATA, formData, errors }
}
