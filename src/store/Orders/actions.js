import {HTTP} from "../../http-common";
import {ORDERS_API} from "../../LocalVar";
export const orderActions = {
    allOrders({commit}, payload) {
        commit('all_Orders')
        HTTP.get(ORDERS_API+`?page=${payload.page}&date=${payload.date}`).then(response => {
            commit('all_Orders_Success', response.data)
        })
    }
}