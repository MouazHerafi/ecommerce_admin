import { HTTP } from "../../http-common";
import { USERS_API } from "../../LocalVar";
export const userActions = {
  allEmployees({ commit }, payload) {
    commit("all_Users");
    HTTP.get(USERS_API + `?type=employee&page=${payload}`).then(response => {
      commit("all_Users_Success", response.data);
    });
  },
  allCustomers({ commit }, payload) {
    commit("all_Users");
    HTTP.get(USERS_API + `?type=customer&page=${payload}`).then(response => {
      commit("all_Users_Success", response.data);
    });
  },
  userById({ commit }, payload) {
    commit("user_By_Id");
    HTTP.get(USERS_API + `/${payload}`).then(response => {
      console.log(response);
      commit("user_By_Id_Success", response.data.data);
    });
  },
  addNewEmployee({ commit }, payload) {
    commit("add_User")
      .post(USERS_API, payload)
      .then(response => {
        console.log(response);
        commit("add_User_Success");
      });
  },
    editEmployee({ commit }, payload){
        commit("edit_User")
            .put(USERS_API, payload)
            .then(response => {
                console.log(response);
                commit("edit_User_Success");
            });
    },
    deleteEmployee({ commit }, payload){
        commit("delete_User")
            .delete(USERS_API, payload)
            .then(response => {
                console.log(response);
                commit("delete_User_Success");
            });
    }
};
