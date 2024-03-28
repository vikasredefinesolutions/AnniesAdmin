const initialState = {
    toLoad: false,
    howMany: 0
};

const CompanyConfigurationReducers = (state = initialState, action) => {
    const payload = action.payload;

    switch (action.type) {
        case "addLoading": {
            return { ...state, toLoad: payload, howMany: (payload ? (state.howMany + 1) : state.howMany ? (state.howMany - 1) : 0) };
        }
        case "setAddLoadingHowMany": {
            return { ...state, howMany: payload };
        }
        default:
            return state;
    }
};
export default CompanyConfigurationReducers;
