const initialState = null;

const storeUrlReducers = (state = initialState, action) => {
  if (action.payload) {
    const data = action.payload;
    switch (action.type) {
      case "storeURL": {
        return { state, data };
      }
      default:
        return state;
    }
  }
  return state;
};
export default storeUrlReducers;
