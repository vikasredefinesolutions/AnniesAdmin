import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import jwtDecode from "jwt-decode";

import { __AllStoresObj } from "typeDefination/app.type"

import CompanyConfigurationService from "services/admin/companyConfiguration/CompanyConfigurationService";
import AdminAppConfigService from "services/admin/adminAppConfig/AdminAppConfigService";
import { sessionStorageCleanerHelper } from "services/common/helper/Helper"
import LocationServices from "services/common/location/LocationServices";
import UserService from "services/admin/user/UserService";

import { storeCompanyConfigurationData } from "redux/CompanyConfiguration/CompanyConfigurationActions"
import { setSelectedSidebarMenu } from "redux/GetMenuListByUserRole/MenuListByUserRoleActions";
import { getThemeConfiguration } from "redux/themeConfiguration/themeConfigurationAction";
import { storeAdminAppConfigData } from "redux/adminAppConfig/AdminAppConfigAction";
import { hideAlertMessage } from "redux/alertMessage/AlertMessageActions";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { storeUserLocation } from "redux/location/LocationActions"
import { setUser } from "redux/user/UserActions";

import ThemeVariables from "components/admin/configurator/ThemeVariables";
import GlobalLoader from "components/common/GlobalLoader";

// import ErrorBoundary from "error/ErrorBoundary";
import AppRoutes from "./routes/AppRoutes";

import "assets/css/tailwind/index.css";
import "./assets/css/theme.css"
import "assets/css/tab.css";
import "assets/css/app.css";

const App = () => {
  const dispatch = useDispatch();

  const isAuthorized = useSelector((store: __AllStoresObj) => store?.auth?.isAuthorized);
  const token = useSelector((store: __AllStoresObj) => store?.auth?.token);
  const selectedMenu = useSelector((store: __AllStoresObj) => store?.MenuListByUserRoleReducers?.selectedMenu);

  const location = useLocation();
  const didMount = useRef(false);

  const getLocationData = useCallback(() => {
    dispatch(setAddLoading(true));
    LocationServices.getLocationData().then((response) => {
      if (response.data) {
        dispatch(storeUserLocation({
          location: "RI",
          ipAddress: response?.data?.ip,
        }));
      } else {
        dispatch(storeUserLocation({
          location: "RI",
          ipAddress: "127.0.0.0",
        }));
      }
      dispatch(setAddLoading(false));
    }).catch((err) => {
      dispatch(storeUserLocation({
        location: "RI",
        ipAddress: "127.0.0.0",
      }));
      dispatch(setAddLoading(false));
    })
  }, [dispatch])

  const getCompanyConfiguration = useCallback(() => {
    CompanyConfigurationService.getCompanyConfiguration({ args: { pageIndex: 1, pageSize: 1, } }).then((res) => {
      var response = res.data;
      if (response.success && response?.data?.items[0]) {
        dispatch(storeCompanyConfigurationData(response.data.items[0]));
      }
    }).catch((err) => {
      if (err.message === "Network Error") {
        dispatch(setAlertMessage({ type: 'danger', message: "Network Error, We are fixing the site, Please try again later." }));
      }
    });
  }, [dispatch])

  const getAdminAppConfiguration = useCallback(() => {
    AdminAppConfigService.getAdminAppConfiguration().then((res) => {
      var response = res.data;
      if (response.success && response?.data) {
        dispatch(storeAdminAppConfigData(response.data));
      }
    }).catch((err) => { });
  }, [dispatch])

  const getThemeConfigurationFn = useCallback(() => {
    dispatch(getThemeConfiguration());
  }, [dispatch])

  const getUserById = useCallback(() => {
    try {
      if (token && isAuthorized) {
        dispatch(setAddLoading(true));
        const jwtToken: any = jwtDecode(String(token));
        UserService.getUserById(jwtToken?.UserId)
          .then((response) => {
            if (response.data.data) {
              dispatch(
                setUser({ ...response.data.data, role: jwtToken?.role })
              );
            } else {
              localStorage.clear();
            }
            dispatch(setAddLoading(false));
          })
          .catch((error) => {
            dispatch(setAddLoading(false));
          });
      }
    } catch (e) {
      localStorage.clear();
      dispatch(setAddLoading(false));
    }
  }, [token, isAuthorized, dispatch])

  useEffect(() => {
    getLocationData()
  }, [getLocationData]);

  useEffect(() => {
    getCompanyConfiguration();
  }, [getCompanyConfiguration]);

  useEffect(() => {
    getAdminAppConfiguration();
  }, [getAdminAppConfiguration]);

  useEffect(() => {
    getThemeConfigurationFn();
  }, [getThemeConfigurationFn]);

  useEffect(() => {
    getUserById()
  }, [getUserById]);

  useEffect(() => {
    sessionStorageCleanerHelper(location.pathname, "ActiveMenuName")
    dispatch(setSelectedSidebarMenu(""))
    let clearhideAlert: any = null

    if (didMount.current) {
      clearhideAlert = setTimeout(() => { dispatch(hideAlertMessage()) }, 10000);
    } else {
      didMount.current = true;
    }

    // this is only for zoom meeting (testing or creation fase)
    // if (!location.pathname.includes("Customer/meeting")) {
    //   const foundElem = document.getElementById("zmmtg-root")
    //   if (foundElem) {
    //     foundElem.remove();
    //   }
    // }
    // end of  zoom meeting (testing or creation fase)


    return () => {
      clearTimeout(clearhideAlert)
    }
  }, [location.pathname, selectedMenu]);

  return (
    <div className="font-inter antialiased bg-slate-100 text-gray-600">
      {/* <ErrorBoundary> */}
      <GlobalLoader className={""} />
      <AppRoutes />
      <ThemeVariables />
      {/* </ErrorBoundary> */}
    </div>
  );
};

export default App;
