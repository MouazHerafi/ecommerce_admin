import {HTTP} from "../../http-common";
import {ORDERS_API} from "../../LocalVar";
let url = "";
export const orderActions = {
    allOrders({commit}, payload) {
        commit('all_Orders')
        if(payload.date===null){
             url = ORDERS_API+`?page=${payload.page}`;
        }else {
             url = ORDERS_API+`?page=${payload.page}&date=${payload.date}`;
        }
        HTTP.get(url).then(response => {
            console.log(response.data);
            commit('all_Orders_Success', response.data)
        })
    }
}