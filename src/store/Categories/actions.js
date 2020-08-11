import {HTTP} from "../../http-common";
import {CATEGORIES_API} from "../../LocalVar";
export const categoryActions = {
    allCategories({commit}, payload) {
        commit('all_Categories')
        HTTP.get(CATEGORIES_API+`?page=${payload}`).then(response => {
            commit('all_Categories_Success', response.data)
        })
    }
}