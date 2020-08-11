import {HTTP} from "../../http-common";
import {BRANCHES_API, COMPANIES_API} from "../../LocalVar";
export const branchActions = {
    allBranches({commit}, obj) {
        commit('all_Branches')
        HTTP.get(COMPANIES_API + `/${obj.companyID}/` + BRANCHES_API +`?page=${obj.currentPage}`).then(response => {
            console.log(response)
            commit('all_Branches_Success', response.data)
        })
    }
}