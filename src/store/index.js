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
import {branchesState} from "./Branches/state";
import {branchGetters} from "./Branches/getters";
import {branchMutations} from "./Branches/mutations";
import {branchActions} from "./Branches/actions";
import {attributesState} from "./ManageAttributes/state";
import {attributeGetters} from "./ManageAttributes/getters";
import {attributeMutations} from "./ManageAttributes/mutations";
import {attributeActions} from "./ManageAttributes/actions";
import {categoriesState} from "./Categories/state";
import {categoryGetters} from "./Categories/getters";
import {categoryMutations} from "./Categories/mutations";
import {categoryActions} from "./Categories/actions";
import {couponsState} from "./Coupons/state";
import {couponGetters} from "./Coupons/getters";
import {couponMutations} from "./Coupons/mutations";
import {couponActions} from "./Coupons/actions";
import {ordersState} from "./Orders/state";
import {orderGetters} from "./Orders/getters";
import {orderMutations} from "./Orders/mutations";
import {orderActions} from "./Orders/actions";

Vue.use(Vuex);

export default new Vuex.Store({
  state: Object.assign({}, usersState, companiesState , branchesState , attributesState , categoriesState , couponsState , ordersState),
  // GETTERS
  getters: Object.assign({}, userGetters, companyGetters , branchGetters , attributeGetters , categoryGetters , couponGetters , orderGetters),
  mutations: Object.assign({}, userMutations, companyMutations , branchMutations , attributeMutations , categoryMutations , couponMutations , orderMutations),
  actions: Object.assign({}, userActions, companyActions , branchActions , attributeActions , categoryActions , couponActions , orderActions),
  modules: {}
});
