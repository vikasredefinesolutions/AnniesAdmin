// done

import { combineReducers } from "redux";
import auth from "./auth/AuthReducer";
import alertMessage from "./alertMessage/AlertMessageReducers";
import user from "./user/UserReducers";
import location from "./location/LocationReducers";
import CompanyConfiguration from "./CompanyConfiguration/CompanyConfigurationReducers";
import permission from "./permission/PermissionReducers";
import MenuListByUserRoleReducers from "./GetMenuListByUserRole/MenuListByUserRoleReducers";
import SearchQueryReducers from "./searchQueryForMGS/SearchQueryReducers";
import GlobalLoaderReducer from "./globalLoader/GlobalLoaderReducer";
import AdminAppConfigReducers from "./adminAppConfig/AdminAppConfigReducer";
import ThemeConfiguration from "./themeConfiguration/themeConfigurationReducer";
import TempDataReducer from "./tempData/tempDataReducer";
import storeUrl from "./storeUrl/storeUrlReducers";

export default combineReducers({
  auth,
  alertMessage,
  user,
  storeUrl,
  location,
  CompanyConfiguration,
  permission,
  MenuListByUserRoleReducers,
  SearchQueryReducers,
  GlobalLoaderReducer,
  AdminAppConfigReducers,
  ThemeConfiguration,
  TempDataReducer,
});
