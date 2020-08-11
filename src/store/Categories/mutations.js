export const categoryMutations = {
    all_Categories(state) {
        state.showLoader = true
        // this[]
    },
    all_Categories_Success(state, payload) {
        state.showLoader = false
        state.categories = payload
    }
}