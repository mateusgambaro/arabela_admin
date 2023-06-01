export interface RootState {
  login: {
    isFetching: boolean
    isAuthenticated: boolean
    // Include other properties in your state as needed
    // user: User;
    // errorMessage: string;
  }
  // Include other slices of your state as needed
  // e.g. users: UsersState;
  // e.g. posts: PostsState;
}
