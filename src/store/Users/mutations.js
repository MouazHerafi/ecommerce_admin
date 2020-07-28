export const userMutations = {
  all_Users(state) {
    state.showLoader = true;
    // this[]
  },
  all_Users_Success(state, payload) {
    state.showLoader = false;
    state.users = payload;
  },
  user_By_Id(state) {
    state.showLoader = true;
  },
  user_By_Id_Success(state, payload) {
    state.showLoader = false;
    state.user = payload;
  },
  add_User(state) {
    state.showLoader = true;
  },
  add_User_Success(state) {
    state.showLoader = false;
  },
  edit_User(state) {
    state.showLoader = true;
  },
  edit_User_Success(state) {
    state.showLoader = false;
  },
  delete_User(state){
    state.showLoader = true;
  },
  delete_User_Success(state) {
    state.showLoader = false;
  }
};
