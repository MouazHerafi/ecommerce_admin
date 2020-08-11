export const attributeMutations = {
    all_Attributes(state) {
        state.showLoader = true
    },
    all_Attributes_Success(state, payload) {
        state.showLoader = false
        state.attributes = payload
    }
}