import { showAlertMessage, hideAlertMessage } from "redux/alertMessage/AlertMessageActions";
const initialState = { view: false, message: "", type: "" };

const alertMessageReducers = (state = initialState, action: any) => {
  if (action.payload) {
    const { type, message } = action.payload;
    switch (action.type) {
      case "show": {
        return {
          ...state,
          message: message,
          type: type,
        };
      }
      case "hide":
        return { message: null, type: "" };
      default:
        return state;
    }
  }
  return state;
};
export default alertMessageReducers;

export const setAlertMessage = (props) => {
  return async (dispatch) => {

    if (props.type === "success") {
      setTimeout(() => {
        dispatch(hideAlertMessage());
      }, 10000);
    }

    if (props.type === "error") {
      setTimeout(() => {
        dispatch(hideAlertMessage());
      }, 240000);
    }

    dispatch(showAlertMessage({ ...props }));
  };
};
