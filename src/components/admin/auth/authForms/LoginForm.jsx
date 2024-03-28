/*Component Name: LoginForm
Component Functional Details: User can create or update LoginForm master details from here.
Created By: Happy
Created Date: 06/17/2022
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import React, { useState, useRef } from "react";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import * as Yup from "yup";

import { ValidationMsgs } from "global/ValidationMessages";

import { serverError } from "services/common/helper/Helper";
import AuthService from "services/admin/auth/AuthService";

import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { setUser } from "redux/user/UserActions";
import { login } from "redux/auth/AuthAction";

import FormErrorMessage from "components/common/alerts/FormErrorMessage";
import Messages from "components/common/alerts/messages/Index";
import { anniesAnnualData } from "global/Enum";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const routeLocation = useLocation();
  const from = routeLocation.state?.from.pathname || "/admin/dashboard";
  const dispatch = useDispatch();
  const location = useSelector((store) => store?.location);
  const companyInfo = useSelector(store => store?.CompanyConfiguration);
  const [userId, setUserId] = useState('');
  const emailRef = useRef(null)

  const handleLogin = (values) => {
    setLoading(true);
    AuthService.login({
      email: values.email,
      password: values.password,
      ...location,
    })
      .then((res) => {
        localStorage.setItem('rememberMe', values.rememberMe);

        if (res?.data?.data?.isauthorized && res?.data?.data?.data) {
          dispatch(login({ token: res?.data.data.data, isauthorized: res?.data?.data.isauthorized }));
          return navigate(from, { replace: true });
        }

        else if (res?.data?.data.userid !== "" && res.data?.data.userid && res.data?.data.isauthorized === false) {
          dispatch(setUser({ id: res?.data?.data.userid }));
          AuthService.getOtpTimeout(res?.data?.data.userid).then((response) => {
            if (response.data.data.result) {
              localStorage.setItem('pto_xe', response.data.data.otpExpirySeconds);
              return navigate(`/two-factor/authentication/${res?.data?.data.userid}`);
            } else {
              dispatch(setAlertMessage({ type: 'danger', message: ValidationMsgs.common.otpNotSend }));
            }
            setLoading(false);
          }).catch(() => {
            dispatch(setAlertMessage({ type: 'danger', message: ValidationMsgs.common.otpNotSend }));
          })
        } else if (res.data?.data.ispasswordexpired && res.data?.data.userid) {
          setUserId(res.data?.data.userid)
          setLoading(false);
        } else if (res?.data?.data !== "" && res.data?.data && res.data?.data?.isauthorized) {
          dispatch(login({ token: res?.data.data, isAuthorized: res.data?.data.isauthorized }));
          return navigate(from, { replace: true });
        }
        else if (res?.data?.errors && Object.keys(res.data?.errors).length > 0) {
          dispatch(setAlertMessage({ type: 'danger', message: serverError(res) }));
          setLoading(false);
        } else {
          setLoading(false);
          dispatch(setAlertMessage({ type: 'danger', message: ValidationMsgs.common.EmailPasswordRequired }));
        }
      })
      .catch((error) => {
        setLoading(false);
        dispatch(setAlertMessage({ type: 'danger', message: ValidationMsgs.common.serverError }));
      });
  };

  const validationSchema = Yup.object({
    email: Yup.string().trim()
      .required("Email is required.")
      .email("Please enter a valid email address."),
    password: Yup.string().trim().required("Password is required."),
    captcha: Yup.string().trim().required("Captcha is required."),
  });

  const focusEmail = () => {
    document.getElementById('email').focus();
  }

  return (
    <>
      <div className="relative items-center ">
        <div className="items-center z-10">
          <div className="min-h-screen h-full flex justify-center items-center w-full">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <div className="sm:mx-auto sm:w-full sm:max-w-md -6 text-center justify-center mb-10">
                  <h1 className="text-3xl text-gray-800 font-bold mb-6 items-center text-center flex justify-center">
                    <img src={companyInfo?.headerLogo} alt={anniesAnnualData.project} className="w-60 items-center mx-auto" onLoad={focusEmail} onError={focusEmail} />
                  </h1>
                </div>

                {/* <!-- Form --> */}
                <Formik
                  enableReinitialize={true}
                  initialValues={{ email: "", password: "", captcha: process.env.REACT_APP_ENV === "dev" ? true : "", rememberMe: false }}
                  onSubmit={handleLogin}
                  validationSchema={validationSchema}
                  validateOnBlur={false}
                >
                  {({ errors, setFieldValue, values }) => {
                    return (
                      <FormikForm>
                        <div className="space-y-6">
                          {
                            userId &&
                            <div className="px-4 py-2 rounded text-sm bg-rose-100 border border-rose-200 text-rose-600">
                              <span>
                                Your password is expire. <NavLink to={`/reset-password/${userId}`} className="font-medium text-indigo-600 hover:text-indigo-500">click</NavLink> here to reset your password.
                              </span>
                            </div>
                          }
                          <Messages />
                          <div>
                            <label
                              className="block text-sm font-medium text-gray-700"
                              htmlFor="email"
                            >
                              Email Address
                            </label>
                            <Field
                              innerRef={emailRef}
                              type="text"
                              name="email"
                              id="email"
                              className={
                                "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              }
                            />
                            <ErrorMessage
                              name={"email"}
                              component={FormErrorMessage}
                            />
                          </div>
                          <div>
                            <label
                              className="block text-sm font-medium text-gray-700"
                              htmlFor="password"
                            >
                              Password
                            </label>
                            <Field
                              type="password"
                              name="password"
                              id="password"
                              className={
                                "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              }
                            />
                            <ErrorMessage
                              name={"password"}
                              component={FormErrorMessage}
                            />
                          </div>
                        </div>

                        {
                          (process.env.REACT_APP_ENV !== "dev") ? <div className={`mx-auto mt-6 min-h-[80px] flex justify-center items-center`}>
                            <ReCAPTCHA
                              style={{ cursor: "pointer" }}
                              sitekey={process.env.REACT_APP_ReCAPTCHA_sitekey || "6LesILIgAAAAAD6ss4sol_J3qA7N2tBYPtJXA1oa"}
                              onChange={(value) => value ? setFieldValue('captcha', value) : ""}
                            />
                          </div> : <></>
                        }

                        <div className="flex items-center justify-between mt-6">
                          <div className="flex items-center justify-between align-middle">
                            <input
                              id="remember-me"
                              name="remember-me"
                              type="checkbox"
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded !mt-0"
                              onChange={(e) => { setFieldValue("rememberMe", e.target.checked) }}
                              checked={values.rememberMe}
                            />
                            <label
                              htmlFor="remember-me"
                              className="ml-2 block text-sm text-gray-900 mb-0"
                            >
                              Remember me
                            </label>
                          </div>
                          <div className="text-sm">
                            <Link
                              to={"/forgot-password"}
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Forgot your password?
                            </Link>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-6">
                          <button
                            className={`w-full flex justify-center align-middle py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${(loading || values.captcha === '')
                              ? "bg-indigo-200 hover:bg-indigo-200"
                              : "cursor-pointer"
                              }`}
                            disabled={loading || values.captcha === ''}
                          >
                            {loading && (
                              <span className="spinner-border spinner-border-sm mr-2"></span>
                            )}
                            Sign In
                          </button>
                        </div>
                      </FormikForm>
                    );
                  }}

                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
