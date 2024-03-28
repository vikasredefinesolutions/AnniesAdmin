const initialState = {
    order: {
        storeIdFromDropDown: [],
        storeId: 0
    },
    storeBuilderCategoryData: {},
    currentPageIndexData: { pageNo: 0, url: "" },
    currentStoreData: null
};

const TempDataReducers = (state = initialState, action) => {
    const payload = action.payload;

    switch (action.type) {
        case "storeIdFromDropDown": {
            return { ...state, order: { ...state.order, storeIdFromDropDown: payload } };
        }
        case "storeId": {
            return { ...state, order: { ...state.order, storeId: payload } };
        }
        case "storeBuilderCategoryData": {
            return { ...state, storeBuilderCategoryData: payload };
        }
        case "setCurrentPageIndexData": {
            return { ...state, currentPageIndexData: payload };
        }
        case "setCurrentStoreData": {
            return { ...state, currentStoreData: payload };
        }
        default:
            return state;
    }
};
export default TempDataReducers;
