import {HTTP} from "../../http-common";
import {COMPANIES_API} from "../../LocalVar";
export const companyActions = {
    allCompanies({commit}, payload) {
        commit('all_Companies')
        HTTP.get(COMPANIES_API+`?page=${payload}`).then(response => {
            commit('all_Companies_Success', response.data)
        })
    },
    companyById ({commit}, payload) {
        commit('company_By_Id')
        HTTP.get(COMPANIES_API+`/${payload}`).then(response => {
            console.log(response);
            commit('company_By_Id_Success', response.data.data)
        })
    }
}