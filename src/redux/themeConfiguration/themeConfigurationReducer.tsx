const initialState = {};

const ThemeConfigurationReducers = (state = initialState, action) => {
    const payload = action.payload;

    switch (action.type) {
        case "setData": {
            return { ...state, ...payload };
        }
        default:
            return state;
    }
};
export default ThemeConfigurationReducers;
