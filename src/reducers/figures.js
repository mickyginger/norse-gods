import {
  GET_FIGURES_SUCCESS,
  POST_FIGURE_SUCCESS,
  POST_FIGURE_FAILURE,
  UPDATE_FORM_DATA
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
        ...state,
        data: action.data,
        lastRequest: Date.now()
      }
    case POST_FIGURE_SUCCESS:
      return {
        ...state,
        data: { ...state.data, [action.data._id]: action.data },
        errors: {}
      }
    case POST_FIGURE_FAILURE:
      return {
        ...state,
        errors: action.errors
      }
    default:
      return state
  }
}
