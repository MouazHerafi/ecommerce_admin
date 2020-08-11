import {HTTP} from "../../http-common";
import {COMPANIES_API} from "../../LocalVar";
export const companyActions = {
    allCompanies({commit}, payload) {
        commit('all_Companies')
        HTTP.get(COMPANIES_API+`?page=${payload}`).then(response => {
            commit('all_Companies_Success', response.data)
        })
    }
}