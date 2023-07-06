export interface RootState {
  login: {
    isFetching: boolean
    isAuthenticated: boolean
    user: {
      username: string
      password: string
    };
    // errorMessage: string;
  }
}
