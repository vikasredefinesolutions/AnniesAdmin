import React from "react";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import Input from "components/common/formComponent/Input";
import PageRedirect from "services/admin/pageRedirect/PageRedirect";
import { ValidationMsgs } from "global/ValidationMessages";
import { serverError } from "services/common/helper/Helper";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { TitleNameHelper } from "services/common/helper/Helper";
import Messages from "components/common/alerts/messages/Index";
import { RecStatusValuebyName, anniesAnnualData } from "global/Enum";

const Create = () => {
  const permission = useSelector((store) => store.permission);
  const dispatch = useDispatch();
  const location = useSelector((store) => store?.location);
  const GlobalLoading = useSelector(
    (store) => store?.GlobalLoaderReducer?.toLoad
  );

  const createPageRedirect = (fields, resetForm, setFieldValue) => {
    dispatch(setAddLoading(true));
    PageRedirect.createPageRedirect({
      pageredirectmodel: {
        id: 0,
        oldUrl: fields.oldUrl,
        newUrl: fields.newUrl,
        recStatus: fields.recStatus,
        storeId: fields.storeId,
        ...location,
      },
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.pageRedirect.pageRedirectCreated,
            })
          );
          setFieldValue("oldUrl", "");
          setFieldValue("newUrl", "");
        } else {
          dispatch(
            setAlertMessage({
              type: "danger",
              message: serverError(response),
            })
          );
        }
        dispatch(setAddLoading(false));
      })
      .catch((error) => {
        dispatch(
          setAlertMessage({
            type: "danger",
            message: ValidationMsgs.pageRedirect.pageRedirectNotCreated,
          })
        );
        dispatch(setAddLoading(false));
      });
  };

  const validationSchema = Yup.object({
    oldUrl: Yup.string().trim().required(ValidationMsgs.pageRedirect.oldUrl),
    newUrl: Yup.string().trim().required(ValidationMsgs.pageRedirect.newUrl),
  });

  const onSubmit = (fields, { resetForm, setFieldValue }) => {
    createPageRedirect(fields, resetForm, setFieldValue);
  };

  return (
    <>
      <title>
        {"Add "} {TitleNameHelper({ defaultTitleName: "Page Redirect" })}
      </title>
      <Formik
        enableReinitialize={true}
        initialValues={{
          id: 0,
          rowVersion: "",
          oldUrl: "",
          newUrl: "",
          storeId: anniesAnnualData.storeId,
          recStatus: RecStatusValuebyName.Active,
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({}) => {
          return (
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full">
              <FormikForm>
                <div className="flex mb-8 justify-between">
                  <div className="flex items-center">
                    <Link
                      to="/admin/Master/Configuration/pageRedirect"
                      className="btn border-neutral-200 hover:border-neutral-400 text-gray-500 hover:text-gray-700 flex items-center mr-2"
                    >
                      <span className="material-icons-outlined">west</span>
                    </Link>

                    <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
                      {"Add "}
                      {TitleNameHelper({ defaultTitleName: "Page Redirect" })}
                    </h1>
                  </div>
                  <div className="flex flex-wrap space-x-2">
                    {(permission?.isEdit || permission?.isDelete) && (
                      <>
                        <NavLink
                          to={"/admin/Master/Configuration/pageRedirect"}
                          className="btn bg-white border-neutral-200 text-gray-500 hover:text-gray-700"
                        >
                          Cancel
                        </NavLink>
                        <button
                          disabled={GlobalLoading}
                          className={`flex justify-center btn px-6 bg-indigo-500 hover:bg-indigo-600 text-white ${
                            GlobalLoading
                              ? "bg-indigo-200 hover:bg-indigo-200"
                              : "cursor-pointer"
                          }`}
                          type="submit"
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
                      </>
                    )}
                  </div>
                </div>
                <Messages />
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-full">
                    <div className="w-full gap-6 bg-white shadow-lg rounded-md border border-neutral-200 p-6 mb-6">
                      <div className="flex gap-6">
                        <div className="w-full last:mb-0">
                          <div className="flex items-center">
                            <label className="uppercase tracking-wide text-gray-500 text-xs font-bold mb-2 flex flex-wrap">
                              <span>
                                Old URL
                                <span className="text-rose-500 text-2xl leading-none">
                                  *
                                </span>
                              </span>
                            </label>
                          </div>
                          <Input name="oldUrl" />
                          <span>{"eg.  /xyz.html"}</span>
                        </div>
                        <div className="w-full last:mb-0">
                          <div className="flex items-center">
                            <label className="uppercase tracking-wide text-gray-500 text-xs font-bold mb-2 flex flex-wrap">
                              <span>
                                New URL
                                <span className="text-rose-500 text-2xl leading-none">
                                  *
                                </span>
                              </span>
                            </label>
                          </div>
                          <Input name="newUrl" />
                          <span>{"eg.  xyz.html"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FormikForm>
            </div>
          );
        }}
      </Formik>
    </>
  );
};

export default Create;
