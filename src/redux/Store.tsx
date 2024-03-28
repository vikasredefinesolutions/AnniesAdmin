import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import rootReducer from "./RootReducers";

const initialState = {};
const middleware = [thunk];

const middlewareEnhancer = (process.env.REACT_APP_ENV === "dev" ? composeWithDevTools(applyMiddleware(...middleware)) : applyMiddleware(...middleware))

const Store = createStore(
    rootReducer,
    initialState,
    middlewareEnhancer
);

export default Store;
