import Vue from "vue";
import Vuex from "vuex";
import { usersState } from "./Users/state";
import { userGetters } from "./Users/getters";
import { userMutations } from "./Users/mutations";
import { userActions } from "./Users/actions";
import { companiesState } from "./Companies/state";
import { companyGetters } from "./Companies/getters";
import { companyMutations } from "./Companies/mutations";
import { companyActions } from "./Companies/actions";

Vue.use(Vuex);

export default new Vuex.Store({
  state: Object.assign({}, usersState, companiesState),
  // GETTERS
  getters: Object.assign({}, userGetters, companyGetters),
  mutations: Object.assign({}, userMutations, companyMutations),
  actions: Object.assign({}, userActions, companyActions),
  modules: {}
});
