import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOG_OUT
} from '../../actions/login'

const initialState = {
  isAuthenticated: false,
  isFetching: false,
  user: {},
  errorMessage: ''
}

export default function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        user: action.payload
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        user: action.payload
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.error
      }
    case LOG_OUT:
      return {
        isFetching: false,
        isAuthenticated: false,
        user: {}
      }
    default:
      return state
  }
}
