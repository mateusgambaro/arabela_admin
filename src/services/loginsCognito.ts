import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool
} from 'amazon-cognito-identity-js'

interface LoginResponse {
  idToken: string
  accessToken: string
  refreshToken: string
}

const userPool = new CognitoUserPool({
  UserPoolId: 'us-east-1_aDOeo3Whb',
  ClientId: '20bjdse0e6lj29beb39gjfgoh6'
})

export async function signIn(
  username: string,
  password: string
): Promise<LoginResponse> {
  return await new Promise((resolve, reject) => {
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password
    })

    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: userPool
    })

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: result => {
        resolve({
          idToken: result.getIdToken().getJwtToken(),
          accessToken: result.getAccessToken().getJwtToken(),
          refreshToken: result.getRefreshToken().getToken()
        })
      },
      onFailure: err => {
        reject(err)
      },
      newPasswordRequired: () => {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('New password required')
      }
    })
  })
}

export async function signOut(): Promise<void> {
  const user = userPool.getCurrentUser()
  if (user) {
    user.signOut()
  }
}

export default {
  signIn,
  signOut
}
