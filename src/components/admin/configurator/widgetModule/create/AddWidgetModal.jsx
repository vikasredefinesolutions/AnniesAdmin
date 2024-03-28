import React, { useState, useEffect, useCallback } from "react";
import { Formik, Form as FormikForm } from "formik";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";

import { ValidationMsgs } from "global/ValidationMessages";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import DropdownService from "services/common/dropdown/DropdownService";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { serverError, TitleNameHelper } from "services/common/helper/Helper";
import Messages from "components/common/alerts/messages/Index";
import Dropdown from "components/common/formComponent/Dropdown";
import widgetModuleService from "services/admin/widgetModule/widgetModuleService";

const AddWidgetModal = ({
  handleShowModal,
  getWidgetModuleList,
  idson,
  setEditId,
  openAddActionModal
}) => {
  const permission = useSelector(store => store.permission);
  const [data, setData] = useState({});
  const [ModuleData, setModuleData] = useState([]);
  const location = useSelector((store) => store?.location);
  const isAddMode = idson ? false : true;
  const dispatch = useDispatch();
  const [ModuleOptions, setModuleOptions] = useState([]);
  const [WidgetData, setWidgetData] = useState([]);

  const GlobalLoading = useSelector(
    (store) => store?.GlobalLoaderReducer?.toLoad
  );
  const initialValues = {
    widgetId: data?.id || "",
    moduleIdList: ModuleData.map((moduleId) => moduleId) || [],
  };

  const getModuleDropDownData = useCallback(() => {
    DropdownService.getDropdownValues("accessright").then((res) => {
      if (res.data.success) {
        setModuleOptions(() => {
          return res.data.data;
        });
      }
    });
  }, []);

  const getWidgetDropdownData = useCallback(() => {
    DropdownService.getDropdownValues(
      "widget").then((res) => {
        if (res.data.success) {
          setWidgetData(() => {
            return res.data.data;
          });
        }
      });
  }, []);

  useEffect(() => {
    getModuleDropDownData();
    getWidgetDropdownData();
  }, [getModuleDropDownData, getWidgetDropdownData]);

  function createShippingMethods(fields, resetForm) {
    dispatch(setAddLoading(true));
    widgetModuleService.createWidgetServices({
      widgetModel: {
        widgetId: fields.widgetId,
        moduleIdList: fields.moduleIdList,
        ...location,
      },
    }).then((response) => {
      if (response.data.success) {
        dispatch(
          setAlertMessage({
            type: "success",
            message: isAddMode ? ValidationMsgs.widgetModuleMapping.created : ValidationMsgs.widgetModuleMapping.updated,
          })
        );
        resetForm({});
        handleShowModal((prev) => !prev);
        getWidgetModuleList();
      } else {
        dispatch(
          setAlertMessage({ type: "danger", message: serverError(response) })
        );
      }
      dispatch(setAddLoading(false));
    }).catch((errors) => {
      dispatch(
        setAlertMessage({
          type: "danger",
          message: isAddMode ? ValidationMsgs.widgetModuleMapping.notCreated : ValidationMsgs.widgetModuleMapping.notUpdated,
        })
      );
      dispatch(setAddLoading(false));
    });
  }

  const getShippingMethod = () => {
    dispatch(setAddLoading(true));
    widgetModuleService.getWidgetById({ id: idson })
      .then((res) => {
        var response = res.data;
        if (response.success) {
          setData({ ...response.data });
          setModuleData(response.data.moduleList)
        }
        dispatch(setAddLoading(false));
      }).catch((err) => {
        dispatch(setAddLoading(false));
      });
  }

  useEffect(() => {
    if (idson > 0) {
      getShippingMethod()
    }
  }, [idson]);

  const onsubmit = (fields, { resetForm }) => {
    createShippingMethods(fields, resetForm);
  };

  const validationSchema = Yup.object({
    widgetId: Yup.string().trim().required(ValidationMsgs.widgetModuleMapping.widget),
    moduleIdList: Yup.array().min(1, ValidationMsgs.widgetModuleMapping.modules),
  });

  return (
    <>
      <title> {isAddMode ? "Add " : "Edit "} {TitleNameHelper({ defaultTitleName: "Widget Module" })} </title>
      <div
        id="widgetModal"
        className="overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 justify-center items-center h-modal md:h-full md:inset-0"
      >
        <div className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className=" px-4 w-full max-w-2xl h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow max-h-screen">
              <div className="flex justify-between items-start p-5 rounded-t border-b sticky top-0 left-0 bg-white">
                <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl">
                  {isAddMode ? "Add " : "Edit "} {TitleNameHelper({ defaultTitleName: "Widget Module" })}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                  data-modal-toggle="actionModal"
                  onClick={() => { handleShowModal((prev) => !prev); setEditId(0); }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              {openAddActionModal && <Messages />}
              <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={onsubmit}
                validationSchema={validationSchema}
              >
                {({ setFieldValue, errors, values }) => {
                  return (
                    <FormikForm>
                      <div className="p-6">
                        <div>
                          <label
                            className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                            htmlFor="grid-first-name"
                          >
                            {"Widget"}

                            <span className="text-rose-500 text-2xl leading-none">
                              *
                            </span>
                          </label>

                          <Dropdown
                            label="widgetId"
                            name={"widgetId"}
                            options={WidgetData}
                            isMulti={false}
                            defaultValue={values.widgetId}
                            placeholder="Select widget"
                          />
                        </div>
                        <div>
                          <label
                            className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2 mt-2"
                            htmlFor="grid-first-name"
                          >
                            {"Modules"}

                            <span className="text-rose-500 text-2xl leading-none">
                              *
                            </span>
                          </label>

                          <Dropdown
                            label="Modules"
                            name={"moduleIdList"}
                            options={ModuleOptions}
                            isMulti={true}
                            hidecheckbox={false}
                            defaultValue={values.moduleIdList}
                            placeholder="Select Module"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-end p-6 space-x-2 rounded-b border-t border-gray-200 ">
                        <button
                          type="button"
                          className="btn bg-white border-neutral-200 text-gray-500 hover:text-gray-700"
                          onClick={() => { handleShowModal((prev) => !prev); setEditId(0); }}
                        >
                          Cancel
                        </button>

                        {(permission?.isEdit || permission?.isDelete) &&
                          <button
                            disabled={GlobalLoading}
                            type="Submit"
                            className={`flex justify-center btn px-6 bg-indigo-500 hover:bg-indigo-600 text-white`}
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
                        }
                      </div>
                    </FormikForm>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddWidgetModal;
