export const orderMutations = {
    all_Orders(state) {
        state.showLoader = true
        // this[]
    },
    all_Orders_Success(state, payload) {
        state.showLoader = false
        state.orders = payload
    }
}