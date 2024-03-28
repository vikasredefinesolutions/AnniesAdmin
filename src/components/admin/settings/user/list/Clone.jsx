import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form as FormikForm } from "formik";
import Transition from "utils/Transition";
import * as Yup from "yup";

import Messages from "components/common/alerts/messages/Index";
import { ValidationMsgs } from "global/ValidationMessages";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";

import { serverError } from "services/common/helper/Helper";
import Input from "components/common/formComponent/Input";
import UserService from "services/admin/user/UserService";

const Clone = ({ getUserData, openCloneModal, setOpenCloneModal, data }) => {

  const dispatch = useDispatch();
  const location = useSelector((store) => store?.location);
  const GlobalLoading = useSelector((store) => store?.GlobalLoaderReducer?.toLoad);

  const validationSchema = Yup.object({
    firstname: Yup.string().trim().required(ValidationMsgs.user.firstNameRequired),
    lastname: Yup.string().trim().required(ValidationMsgs.user.lastNameRequired),
    email: Yup.string().trim().email(ValidationMsgs.user.Email).required(ValidationMsgs.user.emailRequired),
    phone: Yup.string().trim().required(ValidationMsgs.common.phoneRequired).test(
        'phone',
        ValidationMsgs.common.phoneMatches,
        (value, context) => {
          if (/^(\+\d{1,3}[- ]?)?\d{10}$/.test(value)) {
            return true;
          } else if (/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value)) {
            return true;
          }
          return false;
        },
      )
      /* .matches(
        /^(\+\d{1,3}[- ]?)?\d{10}$/,
        ValidationMsgs.common.phoneMatches
      ) */,
  });
  const handleClone = (fields, { resetForm }) => {
    dispatch(setAddLoading(true))
    UserService.cloneUser({ args: { ...fields, ...location } })
      .then((response) => {
        if (response.data.data) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.user.userCloned,
            })
          );
          setOpenCloneModal(false);
          resetForm()
          getUserData();
        } else {
          dispatch(
            setAlertMessage({
              type: "danger",
              message: serverError(response),
            })
          );
          resetForm()
        }
        dispatch(setAddLoading(false))
      }).catch((errors) => {
        if (errors.response.data.Errors.Error) {
          dispatch(
            setAlertMessage({
              message: errors.response.data.Errors.Error,
              type: "danger",
            })
          );
        } else {
          dispatch(
            setAlertMessage({ message: ValidationMsgs.user.userNotCloned, type: "danger" })
          );
        }
        dispatch(setAddLoading(false))
      })
  };
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          id: data?.id || 0,
          firstname: data?.firstname || "",
          lastname: `${data?.lastname}(clone)` || "",
          email: "",
          phone: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleClone}
      >
        {({ resetForm }) => {
          return (
            <FormikForm>
              <Transition
                className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"
                show={openCloneModal}
                tag="div"
                enter="transition ease-out duration-200 transform"
                enterStart="opacity-0 -translate-y-2"
                enterEnd="opacity-100 translate-y-0"
                leave="transition ease-out duration-200"
                leaveStart="opacity-100"
                leaveEnd="opacity-0"
              ></Transition>
              <Transition
                className="fixed inset-0 z-50 overflow-hidden flex items-center my-4 justify-center transform px-4 sm:px-6"
                show={openCloneModal}
                tag="div"
                id="clone-modal"
                enter="transition ease-out duration-200 transform"
                enterStart="opacity-0 -translate-y-2"
                enterEnd="opacity-100 translate-y-0"
                leave="transition ease-out duration-200"
                leaveStart="opacity-100"
                leaveEnd="opacity-0"
              >
                <div className="relative px-4 w-full max-w-2xl h-screen md:h-auto">
                  <div className="relative bg-white rounded-lg shadow max-h-screen overflow-auto">
                    <div className="flex justify-between items-start p-5 rounded-t border-b">
                      <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl">
                        User Clone
                      </h3>

                      <button
                        className="text-gray-400 hover:text-gray-500"
                        type="button"
                        onClick={() => {
                          setOpenCloneModal(false);
                          resetForm();
                        }}
                      >
                        <div className="sr-only">Close</div>
                        <svg className="w-4 h-4 fill-current">
                          <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z"></path>
                        </svg>
                      </button>
                    </div>
                    {openCloneModal && <Messages />}
                    <div className="p-6 text-sm">
                      <div >
                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                          First Name{" "}
                          <span className="text-rose-500 text-2xl leading-none">
                            *
                          </span>
                        </label>
                        <Input type="text" name="firstname" />
                      </div>
                      <div >
                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                          Last Name{" "}
                          <span className="text-rose-500 text-2xl leading-none">
                            *
                          </span>
                        </label>
                        <Input type="text" name="lastname" />
                      </div>
                      <div >
                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                          Email{" "}
                          <span className="text-rose-500 text-2xl leading-none">
                            *
                          </span>
                        </label>
                        <Input type="text" name="email" />
                      </div>
                      <div >
                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                          Phone Number{" "}
                          <span className="text-rose-500 text-2xl leading-none">
                            *
                          </span>
                        </label>
                        <Input type="text" name="phone" maxLength="17" />
                      </div>
                    </div>
                    <div className="flex items-center justify-end p-6 space-x-2 rounded-b border-t border-gray-200">
                      <button
                        data-modal-toggle="cloneitems"
                        type="button"
                        onClick={() => {
                          setOpenCloneModal(false);
                          resetForm();
                        }}
                        className="btn bg-white border-neutral-200 text-gray-500 hover:text-gray-700"
                      >
                        Cancel
                      </button>
                      <button
                        data-modal-toggle="cloneitems"
                        type="submit"
                        className={`btn bg-indigo-500 hover:bg-indigo-600 text-white ${GlobalLoading
                                            ? "bg-indigo-200 hover:bg-indigo-200"
                                            : "cursor-pointer"
                                            }`}
                      >
                        {GlobalLoading && (
                          <span className="spinner-border spinner-border-sm mr-2"></span>
                        )}
                        Clone
                      </button>
                    </div>
                  </div>
                </div>
              </Transition>
            </FormikForm>
          );
        }}
      </Formik>
    </>
  );
};

export default Clone;
