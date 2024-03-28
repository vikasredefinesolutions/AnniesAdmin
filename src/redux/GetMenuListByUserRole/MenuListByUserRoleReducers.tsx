const initialState = {
  data: [],
  selectedMenu: "",
};

const MenuListByUserRoleReducers = (state = initialState, action) => {
  if (action.payload) {
    const data = action.payload;
    switch (action.type) {
      case "storeMenuListByUserData": {
        return { ...state, data };
      }
      case "setSelectedMenu": {
        return { ...state, selectedMenu: action.payload };
      }
      default:
        return state;
    }
  }
  return state;
};
export default MenuListByUserRoleReducers;
