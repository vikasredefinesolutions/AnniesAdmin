import React, { useCallback, useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";

import { __AllStoresObj } from "typeDefination/app.type";
import { API } from "helpers/API";

import RoleServices from "services/admin/role/RoleServices";
import authHeader from "services/admin/auth/AuthHeader";

import { setPermission as setReduxPermission } from "redux/permission/PermissionActions";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { logout } from "redux/auth/AuthAction";

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, auth, CompanyConfiguration } = useSelector(
    (store: __AllStoresObj) => store,
  );

  const permission = useRef(null);

  // determine if authorized, from context or however you're doing it
  // we need a api here to check if logged in user is correct or not {we need a end point as verify user which can verify our user }
  // return genuineUser =  verifyUser(auth)
  const logoutHandler = useCallback(() => {
    dispatch(logout());
    return navigate("/login", { replace: true });
  }, [dispatch, navigate]);

  useEffect(() => {
    try {
      if (auth?.token && auth?.isAuthorized) {
        const jwtToken: any = jwtDecode(String(auth?.token));
        if (Date.now() >= jwtToken?.exp * 1000 || !jwtToken?.UserId) {
          return logoutHandler();
        }
      } else {
        return logoutHandler();
      }
    } catch (e) {
      return logoutHandler();
    }
  }, [auth?.isAuthorized, auth?.token, logoutHandler]);

  useEffect(() => {
    if (
      user?.id &&
      CompanyConfiguration?.id &&
      user?.isSuperUser !== undefined
    ) {
      // dispatch(setAddLoadingHowMany(0))
      dispatch(setAddLoading(true));

      RoleServices.getUserPermission({
        userId: user.id,
        companyConfigurationId: CompanyConfiguration?.id,
        isSuperUser: user?.isSuperUser || false,
      })
        .then((response) => {
          if (response?.data?.data) {
            permission.current = response.data.data;

            if (permission && permission.current) {
              var redirectUrl =
                permission.current?.length > 0 ? null : "unauthorized";
              var UserPermission = null;
              let allPermission = {};
              for (var value of permission.current) {
                // allPermission = { ...allPermission, [value.navigationUrl]: value }
                if (
                  location.pathname
                    .toLocaleLowerCase()
                    .includes(value.navigationUrl.toLocaleLowerCase())
                ) {
                  if (
                    ((location.pathname.includes("create") ||
                      location.pathname.includes("edit")) &&
                      value.isEdit) ||
                    (!location.pathname.includes("create") &&
                      (value.isView || value.isEdit)) ||
                    value.isDelete
                  ) {
                    UserPermission = value;
                  } else {
                    redirectUrl = "unauthorized";
                  }
                  break;
                } else {
                  redirectUrl = "404";
                }
              }
              permission.current.map((value, index) => {
                allPermission = {
                  ...allPermission,
                  [value.navigationUrl.toLowerCase()]: value,
                };
                return allPermission;
              });
              if (!UserPermission) {
                navigate(redirectUrl, { replace: true });
              } else {
                dispatch(
                  setReduxPermission({
                    ...UserPermission,
                    allPermission: allPermission,
                  }),
                );
              }
            }
          }
          dispatch(setAddLoading(false));
        })
        .catch(() => {
          dispatch(setAddLoading(false));
        });
    }
  }, [
    user?.id,
    user?.isSuperUser,
    CompanyConfiguration?.id,
    location?.pathname,
    dispatch,
    navigate,
  ]);

  useEffect(() => {
    try {
      API.interceptors.response.use(
        function (response) {
          // dispatch(setAddLoading(false));
          return response;
        },
        function (error) {
          if (error?.response?.status === 401) {
            logoutHandler();
          } else if (error?.response?.status === 404) {
            // navigate('/404');
          } else if (error?.Error) {
            dispatch(setAlertMessage({ type: "danger", message: error.Error }));
            dispatch(setAddLoading(false));
          } else {
            dispatch(setAddLoading(false));
          }
          return Promise.reject(error);
        },
      );
      API.interceptors.request.use(function (config: any) {
        // dispatch(setAddLoading(true));
        config.headers = { ...authHeader() };
        return config;
      });
    } catch (e) {
      logoutHandler();
    }
  }, [logoutHandler, dispatch]);

  return permission.current ? <Outlet /> : <></>;
};

export default PrivateRoute;
