export const companyMutations = {
    all_Companies(state) {
        state.showLoader = true
        // this[]
    },
    all_Companies_Success(state, payload) {
        state.showLoader = false
        state.companies = payload
    },
    company_By_Id(state){
        state.showLoader = true
    },
    company_By_Id_Success(state, payload){
        state.showLoader = false
        state.company = payload
    }
}