export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOG_OUT = 'LOG_OUT'


export const loginRequest = (payload: {
  username: string
  password: string
}) => ({
  type: LOGIN_REQUEST,
  payload
})

export const loginSuccess = (payload: {
  username: string
  idToken: string
  accessToken: string
  refreshToken: string
}) => ({
  type: LOGIN_SUCCESS,
  payload
})

export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  error
})

export const logOut = () => ({
  type: LOG_OUT,
})