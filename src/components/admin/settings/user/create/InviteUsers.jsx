import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserService from "services/admin/user/UserService";
import * as Yup from "yup";
import UserDetail from "./UserDetail";
import { Formik, Form as FormikForm, FieldArray } from "formik";
import DropdownService from "services/common/dropdown/DropdownService";
import Messages from "components/common/alerts/messages/Index";
import { RecStatusValuebyName } from "global/Enum";
import { ValidationMsgs } from "global/ValidationMessages";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { useDispatch, useSelector } from "react-redux";
import { TitleNameHelper, serverError } from "services/common/helper/Helper";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";

const InviteUsers = () => {
  const [status, setStatus] = useState("");
  const [roles, setRoles] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const dispatch = useDispatch();
  const location = useSelector((store) => store?.location);
  const GlobalLoading = useSelector((store) => store?.GlobalLoaderReducer?.toLoad);

  const submitHandler = (values, { resetForm }) => {
    const users = values.adminUserViewModel.map((data, index) => {
      return {
        ...data,
        recstatus: status,
        id: 0,
        password: "string",
        userPhoto: "string",
        isNewsSubscription: true,
        ...location
      };
    });

    if (status === RecStatusValuebyName.Draft) {
      dispatch(setAddLoading(true));
      if (users.length && !users[0].reportingTo) {
        users[0].reportingTo = 0;
      }

      UserService.createUsersWithDifferentRole({
        inviteUserModel: {
          adminUserViewModel: users,
        },
      }).then((response) => {
        if (response.data.success) {
          dispatch(
            setAlertMessage({
              view: true,
              type: "success",
              message: ValidationMsgs.user.created,
            })
          );
          resetForm({});
        } else {
          dispatch(
            setAlertMessage({
              view: true,
              type: "danger",
              message: serverError(response),
            })
          );
        }
        dispatch(setAddLoading(false));
      }).catch((errors) => {
        dispatch(
          setAlertMessage({
            view: true,
            type: "danger",
            message: ValidationMsgs.user.notCreated,
          })
        );
        dispatch(setAddLoading(false));
      });
    } else {
      dispatch(setAddLoading(true));

      UserService.inviteUsersWithDifferentRole({
        inviteUserModel: {
          adminUserViewModel: users,
        },
      })
        .then((response) => {
          if (response.data.success) {
            dispatch(
              setAlertMessage({
                view: true,
                type: "success",
                message: ValidationMsgs.user.created,
              })
            );
            resetForm({});
          } else {
            dispatch(
              setAlertMessage({
                view: true,
                type: "danger",
                message: serverError(response),
              })
            );
          }
          dispatch(setAddLoading(false));
        })
        .catch((errors) => {
          dispatch(
            setAlertMessage({
              view: true,
              type: "danger",
              message: ValidationMsgs.user.notCreated,
            })
          );
          dispatch(setAddLoading(false));
        });
    }
  };

  const schema = Yup.object().shape({
    adminUserViewModel: Yup.array().of(
      Yup.object().shape({
        firstname: Yup.string().trim().required(
          ValidationMsgs.user.firstNameRequired
        ),
        lastname: Yup.string().trim().required(ValidationMsgs.user.lastNameRequired),
        email: Yup.string().trim()
          .email(ValidationMsgs.user.Email)
          .required(ValidationMsgs.user.emailRequired),
        phone: Yup.string().trim()
          .required(ValidationMsgs.common.phoneRequired)
          .test(
            "phone",
            ValidationMsgs.common.phoneMatches,
            (value, context) => {
              if (/^(\+\d{1,3}[- ]?)?\d{10}$/.test(value)) {
                return true;
              } else if (
                /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(
                  value
                )
              ) {
                return true;
              }
              return false;
            }
          ),
        isSuperUser: Yup.boolean().default(false),
        roleId: Yup.number().when("isSuperUser", {
          is: (isSuperUser) => !isSuperUser,
          then: Yup.number()
            .min(1, ValidationMsgs.user.roleIdRequired)
            .required(ValidationMsgs.user.roleIdRequired)
            .typeError(ValidationMsgs.user.roleIdTypeError),
          otherwise: Yup.number().typeError(ValidationMsgs.user.roleIdTypeError),
        }),
      })
    ).required(ValidationMsgs.user.UserArray),

  });

  useEffect(() => {
    DropdownService.getDropdownValues("adminrole")
      .then((res) => {
        if (res.data.success) {
          setRoles(() => {
            return res.data.data;
            // return Object.keys(res.data.data).map((value, key) => {
            //   return { label: res.data.data[value], value: value };
            // });
          });
        }
      })
      .catch((err) => { });

    DropdownService.getDropdownValues("adminuser")
      .then((res) => {
        if (res?.data?.data) {
          setAllUsers(res.data.data);
        }
      })
      .catch((err) => { });
  }, []);
  return (
    <>
      {/* <title>Invite Users</title> */}
      <title>{TitleNameHelper({ defaultTitleName: "Invite Users" })}</title>
      <Formik
        initialValues={{
          adminUserViewModel: [
            {
              firstname: "",
              lastname: "",
              email: "",
              phone: "",
              reportingTo: 0,
              isSuperUser: false,
              recstatus: RecStatusValuebyName.Draft,
            },
          ]
        }}
        onSubmit={submitHandler}
        validationSchema={schema}
        validateOnMount={true}
      >
        {({ errors, touched, setFieldValue, values }) => {
          return (
            <FormikForm>
              <div className="px-4 sm:px-6 lg:px-8 py-8 w-full">
                {/*  Cards  */}
                <div className="sm:flex sm:justify-between sm:items-center mb-8">
                  {/*  Page Title  */}
                  <div className="flex flex-wrap items-center">
                    <NavLink
                      to="/admin/Settings/user"
                      className="btn border-neutral-200 hover:border-neutral-400 text-gray-500 hover:text-gray-700 flex items-center mr-2"
                    >
                      <span className="material-icons-outlined"> west </span>
                    </NavLink>
                    {/*  Title  */}
                    {/* <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
                      Invite User
                    </h1> */}
                    <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
                      {TitleNameHelper({ defaultTitleName: "Invite Users" })}
                    </h1>
                  </div>
                  <div className="flex flex-wrap space-x-2">
                    <NavLink
                      to="/admin/Settings/user"
                      className="btn bg-white border-neutral-200 text-gray-500 hover:text-gray-700"
                    >
                      Cancel
                    </NavLink>
                    <button
                      type="submit"
                      disabled={GlobalLoading}
                      onClick={() => {
                        setStatus(RecStatusValuebyName.Pending);
                        dispatch(
                          setAlertMessage({
                            type: "danger",
                            message: serverError({ data: { errors: errors } }),
                          })
                        );
                      }}
                      // className="btn px-6 bg-indigo-500 hover:bg-indigo-600 text-white"
                      className={`flex justify-center btn px-6 bg-indigo-500 hover:bg-indigo-600 text-white ${GlobalLoading
                        ? "bg-indigo-200 hover:bg-indigo-200"
                        : "cursor-pointer"
                        }`}
                      id={RecStatusValuebyName.Pending}
                    >
                      <div
                        className={`w-full flex justify-center align-middle `}
                      >
                        {GlobalLoading && (
                          <span className="spinner-border spinner-border-sm mr-2"></span>
                        )}
                        Invite
                      </div>
                    </button>
                    <button
                      disabled={GlobalLoading}
                      type="submit"
                      onClick={() => {
                        setStatus(RecStatusValuebyName.Draft);
                        dispatch(
                          setAlertMessage({
                            type: "danger",
                            message: serverError({ data: { errors: errors } }),
                          })
                        );
                      }}
                      className={`flex justify-center btn px-6 bg-indigo-500 hover:bg-indigo-600 text-white ${GlobalLoading
                        ? "bg-indigo-200 hover:bg-indigo-200"
                        : "cursor-pointer"
                        }`}
                      id={RecStatusValuebyName.Draft}
                    >
                      <div
                        className={`w-full flex justify-center align-middle `}
                      >
                        {GlobalLoading && (
                          <span className="spinner-border spinner-border-sm mr-2"></span>
                        )}
                        Save
                      </div>
                    </button>
                  </div>
                </div>

                <Messages />

                <div className="w-full bg-white shadow-lg rounded-md border border-neutral-200 p-6 mb-6">
                  <FieldArray
                    name="adminUserViewModel"
                    render={(fieldArrayProps) => {
                      const { form } = fieldArrayProps;
                      return (
                        <>
                          {form.values.adminUserViewModel.map((value, i) => {
                            return (
                              <UserDetail
                                fieldArrayProps={fieldArrayProps}
                                key={i}
                                index={i}
                                status={status}
                                allUsers={allUsers}
                                roles={roles}
                              />
                            );
                          })}
                          <div className="flex justify-end items-center w-full gap-y-6">
                            <div className="w-full md:w-1/3 text-right">
                              <label
                                className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-3"
                                htmlFor="grid-first-name"
                              ></label>
                              <span
                                onClick={() => {
                                  fieldArrayProps.push({
                                    firstname: "",
                                    lastname: "",
                                    email: "",
                                    phone: "",
                                    isSuperUser: false,
                                    reportingTo: 0,
                                    recstatus: RecStatusValuebyName.Draft,
                                  });
                                }}
                                className="text-indigo-500 hover:text-indigo-600 cursor-pointer"
                              >
                                + Add another team member
                              </span>
                            </div>
                          </div>
                        </>
                      );
                    }}
                  />

                  {/* <Store /> */}
                </div>
              </div>
            </FormikForm>
          );
        }}
      </Formik>
    </>
  );
};

export default InviteUsers;
