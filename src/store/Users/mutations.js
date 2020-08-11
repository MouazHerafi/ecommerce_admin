export const userMutations = {
  all_Users(state) {
    state.showLoader = true;
  },
  all_Users_Success(state, payload) {
    state.showLoader = false;
    state.users = payload;
  }
  };
