const initialState = {
  searchQuery: "",
  toFill: false,
  currentTab: 0
};

const searchQueryReducers = (state = initialState, action) => {
  const searchQuery = action.payload;
  switch (action.type) {
    case "setSearchQuery": {
      return { ...state, searchQuery: searchQuery };
    }
    case "fillSerchQuery": {
      return { ...state, toFill: action.payload };
    }
    case "addActiveTab": {
      return { ...state, currentTab: action.payload };
    }
    default:
      return state;
  }
};
export default searchQueryReducers;
