import {HTTP} from "../../http-common";
import { USERS_API } from "../../LocalVar";
export const userActions = {
  allEmployees({ commit }, payload) {
    commit("all_Users");
    HTTP.get(USERS_API + `?type=employee&page=${payload}`).then(response => {
        console.log(response)
      commit("all_Users_Success", response.data);
    });
  },
  allCustomers({ commit }, payload) {
    commit("all_Users");
    HTTP.get(USERS_API + `?type=customer&page=${payload}`).then(response => {
      console.log(response)
      commit("all_Users_Success", response.data);
    });
  }
};
