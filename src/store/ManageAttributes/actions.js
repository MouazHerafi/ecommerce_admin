import {HTTP} from "../../http-common";
import {ATTRIBUTESBRANCH_API} from "../../LocalVar";
export const attributeActions = {
    allAttributes({commit}, branchID) {
        commit('all_Attributes')
        HTTP.get(ATTRIBUTESBRANCH_API+`/${branchID}`).then(response => {
            commit('all_Attributes_Success', response.data)
        })
    }
}