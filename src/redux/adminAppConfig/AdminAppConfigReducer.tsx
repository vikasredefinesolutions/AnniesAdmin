const initialState = {};
  
  const AdminAppConfigReducers = (state = initialState, action) => {
    if (action.payload) {
      const data = action.payload;
      switch (action.type) {
        case "storeAdminAppConfigData": {
          return { ...state, ...data };
        }
        default:
          return state;
      }
    }
    return state;
  };
  export default AdminAppConfigReducers;
  