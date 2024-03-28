import React, { useState, useCallback, useEffect } from "react";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import ToggleButton from "components/common/formComponent/ToggleButton";
import Input from "components/common/formComponent/Input";
import { useDispatch, useSelector } from "react-redux";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { RecStatusValuebyName, anniesAnnualData } from "global/Enum";
import { ValidationMsgs } from "global/ValidationMessages";
import { serverError } from "services/common/helper/Helper";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import Messages from "components/common/alerts/messages/Index";
import ProductCustomFieldsServices from "services/admin/productCustomFields/ProductCustomFieldsServices";

const AddProductCustomFieldModel = ({
  handleShowModel,
  MasterFilterCustomFieldsValue,
  editFieldsData,
  masterFilterCustomFieldsId,
}) => {
  const [data, setData] = useState({});
  const location = useSelector((store) => store?.location);
  const dispatch = useDispatch();
  const GlobalLoading = useSelector(
    (store) => store?.GlobalLoaderReducer?.toLoad
  );
  const isAddMode = !editFieldsData;
  const storeId = anniesAnnualData.storeId;
  const [toggler, setToggler] = useState({
    inventoryAvailable: false,
  });
  const handleToggle = (field) => {
    setToggler((prevData) => ({
      ...prevData,
      [field]: !toggler[field],
    }));
  };

  const initialValues = {
    id: data?.id || 0,
    customFieldsValue: data?.customFieldsValue || "",
    masterFilterCustomFieldsId: masterFilterCustomFieldsId && masterFilterCustomFieldsId,
    storeId: storeId,
    isDefault: data?.isDefault || false,
    displayOrderCustomFieldsValue: data?.displayOrderCustomFieldsValue || 0,
    rowVersion: data?.rowVersion || "",
    ...location,
    recStatus: data?.recStatus || RecStatusValuebyName.Active,
  };

  const validationSchema = Yup.object({
    customFieldsValue: Yup.string().required(
      ValidationMsgs.productCustomFields.productAvailabityName
    ),
    displayOrderCustomFieldsValue: Yup.number().required(
      ValidationMsgs.productCustomFields.displayOrderNumber
    ),
  });

  const getCustomFieldValue = useCallback(() => {
    dispatch(setAddLoading(true));
    ProductCustomFieldsServices.getCustomFieldValueById(editFieldsData)
      .then((response) => {
        if (response?.data?.success && response?.data?.data) {
          setData(response.data.data);
        }
        dispatch(setAddLoading(false));
      })
      .catch((error) => {
        dispatch(setAddLoading(false));
      });
  }, [editFieldsData]);

  useEffect(() => {
    if (editFieldsData) {
      getCustomFieldValue();
    }
  }, [editFieldsData]);

  const onSubmit = (fields) => {
    if (!editFieldsData) {
      createCustomFieldsValue(fields);
    } else {
      updateustomFieldsValue(fields);
    }
  };

  const createCustomFieldsValue = (fields) => {
    dispatch(setAddLoading(true));
    ProductCustomFieldsServices.createCustomFieldsValue({
      masterFilterCustomFieldsValueModel: fields,
    })
      .then((response) => {
        if (response?.data?.success && response?.data?.data) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.productCustomFields.created,
            })
          );
          handleShowModel();
          MasterFilterCustomFieldsValue();
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
            message: ValidationMsgs.productCustomFields.notCreated,
          })
        );
        dispatch(setAddLoading(false));
      });
  };

  const updateustomFieldsValue = (fields) => {
    dispatch(setAddLoading(true));
    ProductCustomFieldsServices.updateustomFieldsValue({
      masterFilterCustomFieldsValueModel: fields,
    })
      .then((response) => {
        if (response?.data?.success && response?.data?.data) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.productCustomFields.updated,
            })
          );
          MasterFilterCustomFieldsValue();
          handleShowModel();
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
            message: ValidationMsgs.productCustomFields.notUpdated,
          })
        );
        dispatch(setAddLoading(false));
      });
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ setFieldValue, values }) => {
        return (
          <FormikForm>
            <div
              id="FieldsValueModel"
              className=" overflow-y-auto overflow-x-hidden fixed inset-0 z-30 justify-center items-center h-modal max-h-screen"
            >
              <div className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                <div className="relative w-full max-w-2xl">
                  <div className="relative bg-white rounded-lg shadow">
                    <div className="flex justify-between items-start p-5 rounded-t border-b  sticky top-0 left-0 bg-white">
                      <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl ">
                        {isAddMode
                          ? "Add Product Availability"
                          : "Edit Product Availability"}
                      </h3>
                      <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                        data-modal-toggle="managestoreModal"
                        onClick={handleShowModel}
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
                    <Messages />

                    <div className="p-6">
                      <div className="mb-2">
                        <label
                          className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                          htmlFor=""
                        >
                          PRODUCT AVAILABILITY NAME :
                          <span className="text-rose-500 text-2xl leading-none">
                            *
                          </span>
                        </label>
                        <Input name="customFieldsValue" />
                      </div>

                      <div className="mb-2">
                        <label
                          className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                          htmlFor=""
                        >
                          DISPLAY ORDER :
                          <span className="text-rose-500 text-2xl leading-none">
                            *
                          </span>
                        </label>
                        <Input
                          name="displayOrderCustomFieldsValue"
                          onKeyPress={(event) => {
                            if (!/^\d*$/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                        />
                      </div>
                      <div className="flex">
                        <div className="mb-2">
                          <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                            Default :
                          </label>
                          <div className="col-span-full w-full sm:col-span-6 xl:col-span-8">
                            <div>
                              <ToggleButton
                                name="isDefault"
                                id="isDefault"
                                onChange={(e) => {
                                  setFieldValue("isDefault", e.target.checked);
                                }}
                                on="Yes"
                                off="No"
                                defaultValue={values.isDefault}
                                setFieldValue={setFieldValue}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="mb-2 px-4">
                          <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                            Status :
                          </label>
                          <div className="col-span-full w-full sm:col-span-6 xl:col-span-8">
                            <div>
                              <ToggleButton
                                name="recStatus"
                                id="recStatus"
                                onChange={(e) => {
                                  handleToggle();
                                  setFieldValue(
                                    "recStatus",
                                    e.target.checked
                                      ? RecStatusValuebyName.Active
                                      : RecStatusValuebyName.Inactive
                                  );
                                }}
                                size="m"
                                on="Active"
                                off="Inactive"
                                defaultValue={
                                  values.recStatus ===
                                    RecStatusValuebyName.Active
                                    ? true
                                    : false
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end p-6 space-x-2 rounded-b border-t border-gray-200 ">
                      <button
                        data-modal-toggle="ManageLocationModal"
                        type="button"
                        className="btn bg-white border-neutral-200 text-gray-500 hover:text-gray-700"
                        onClick={handleShowModel}
                      >
                        Cancel
                      </button>
                      <button
                        data-modal-toggle="ManageLocationModal"
                        disabled={GlobalLoading}
                        type="submit"
                        className={`flex justify-center btn px-6 bg-indigo-500 hover:bg-indigo-600 text-white ${GlobalLoading
                          ? "bg-indigo-200 hover:bg-indigo-200"
                          : "cursor-pointer"
                          }`}
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
                </div>
              </div>
            </div>
          </FormikForm>
        );
      }}
    </Formik>
  );
};

export default AddProductCustomFieldModel;
