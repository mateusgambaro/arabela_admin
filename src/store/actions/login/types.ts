export interface RootState {
  login: {
    isFetching: boolean
    isAuthenticated: boolean
    user: {
      username: string
      password: string
      idToken: string
      accessToken: string
      refreshToken: string
    };
    // errorMessage: string;
  }
}
