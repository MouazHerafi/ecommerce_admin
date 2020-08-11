import {HTTP} from "../../http-common";
import {COUPON_API} from "../../LocalVar";
export const couponActions = {
    allCoupons({commit}, payload) {
        commit('all_Coupons')
        HTTP.get(COUPON_API+`?page=${payload}`).then(response => {
            console.log(response)
            commit('all_Coupons_Success', response.data)
        })
    }
}