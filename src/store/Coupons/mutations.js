export const couponMutations = {
    all_Coupons(state) {
        state.showLoader = true
    },
    all_Coupons_Success(state, payload) {
        state.showLoader = false
        state.coupons = payload
    }
}