import {
  GET_FIGURES_SUCCESS
} from '../actions/figures'

const initialState = {
  data: {},
  lastRequest: 0
}

export default function figures(state = initialState, action) {
  switch(action.type) {
    case GET_FIGURES_SUCCESS:
      return { data: action.data, lastRequest: Date.now() }
    default:
      return state
  }
}
