import { useRouter } from 'next/router'
import {
  loginRequest,
  loginSuccess,
  loginFailure
} from '../store/actions/login'
import { signIn, signOut } from './loginsCognito'


export function loginUser(username: string, password: string) {
  return async dispatch => {
    dispatch(loginRequest({ username, password }))

    try {
      const tokens = await signIn(username, password)
      dispatch(loginSuccess({ ...tokens, username }))
    } catch (error) {
      dispatch(loginFailure(error))
    }
  }
}

export async function logoutUser() {
  try {
    await signOut()
  } catch (error) {
    console.log(error)
  }
}
