import {
  GET_FIGURES_SUCCESS,
  GET_FIGURE_SUCCESS,
  POST_FIGURE_SUCCESS,
  POST_FIGURE_FAILURE,
  UPDATE_FORM_DATA,
  DELETE_FIGURE_SUCCESS
} from '../actions/figures'

const initialState = {
  data: {},
  lastRequest: 0,
  formData: {},
  errors: {}
}

export default function figures(state = initialState, action) {
  switch(action.type) {
    case UPDATE_FORM_DATA:
      return {
        ...state,
        formData: action.formData,
        errors: action.errors
      }
    case GET_FIGURES_SUCCESS:
      return {
        data: action.data,
        lastRequest: Date.now()
      }
    case GET_FIGURE_SUCCESS:
      return {
        ...state,
        data: { ...state.data, [action.data._id]: action.data }
      }
    case POST_FIGURE_SUCCESS:
      return {
        ...state,
        data: { ...state.data, [action.data._id]: action.data },
        formData: {},
        errors: {}
      }
    case POST_FIGURE_FAILURE:
      return {
        ...state,
        errors: action.errors
      }
    case DELETE_FIGURE_SUCCESS:
      return {
        ...state
      }
    default:
      return state
  }
}
