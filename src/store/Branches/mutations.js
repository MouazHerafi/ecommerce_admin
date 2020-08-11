export const branchMutations = {
    all_Branches(state) {
        state.showLoader = true
        // this[]
    },
    all_Branches_Success(state, payload) {
        state.showLoader = false
        state.branches = payload
    }
}