import React, { useState, useEffect, useCallback } from "react";
import { Formik, Form as FormikForm } from "formik";
import { useSelector, useDispatch } from "react-redux";
import Input from "components/common/formComponent/Input";
import {
  CurrencySymbolByCode,
  RecStatusValuebyName,
  decimalNumberCheck,
} from "global/Enum";
import ToggleButton from "components/common/formComponent/ToggleButton";
import * as Yup from "yup";

import { ValidationMsgs } from "global/ValidationMessages";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import ShippingMethod from "services/admin/shippingMethod/shippingMethod";
import DropdownService from "services/common/dropdown/DropdownService";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { serverError } from "services/common/helper/Helper";
import Messages from "components/common/alerts/messages/Index";
import Dropdown from "components/common/formComponent/Dropdown";

const AddShippingMethodModal = ({
  handleShowModal,
  getShippingMethod,
  idson,
}) => {
  const permission = useSelector((store) => store.permission);
  const [data, setData] = useState([]);
  const [shippingServiceDropDownData, setShippingServiceDropDownData] =
    useState([]);
  const location = useSelector((store) => store?.location);
  const isAddMode = idson ? false : true;
  const dispatch = useDispatch();

  const GlobalLoading = useSelector(
    (store) => store?.GlobalLoaderReducer?.toLoad
  );
  const initialValues = {
    id: data?.id || 0,
    name: data?.name || "",
    shippingVia: data?.shippingVia || "",
    charges: data?.charges || "",
    rowVersion: data?.rowVersion || "",
    location: data?.location || "",
    ipAddress: location?.ipAddress || "",
    macAddress: location?.macAddress || "",
    recStatus: data?.recStatus || RecStatusValuebyName.Active,
    shippingServicesId: data?.shippingServicesId || "",
  };

  const getShippingServiceDropDownData = useCallback(() => {
    DropdownService.getDropdownValues("shippingservices").then((res) => {
      if (res.data.success) {
        setShippingServiceDropDownData(() => {
          return res.data.data;
        });
      }
    });
  }, []);

  useEffect(() => {
    getShippingServiceDropDownData();
  }, [getShippingServiceDropDownData]);

  const createShippingMethods = (fields, resetForm) => {
    dispatch(setAddLoading(true));
    ShippingMethod.createShippingMethod({
      createShippingMethodRequest: {
        name: fields.name,
        shippingVia: fields.shippingVia,
        charges: fields.charges,
        rowVersion: fields.rowVersion,
        recStatus: fields.recStatus,
        shippingServicesId: fields.shippingServicesId,
        ...location,
      },
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.shippingMethod.shippingMethodCreated,
            })
          );
          resetForm({});
          handleShowModal((prev) => !prev);
          getShippingMethod();
        } else {
          dispatch(
            setAlertMessage({ type: "danger", message: serverError(response) })
          );
        }
        dispatch(setAddLoading(false));
      })
      .catch((errors) => {
        dispatch(
          setAlertMessage({
            type: "danger",
            message: ValidationMsgs.shippingMethod.shippingMethodNotCreated,
          })
        );
        dispatch(setAddLoading(false));
      });
  };

  const updateShippingMethod = (fields, resetForm) => {
    dispatch(setAddLoading(true));

    ShippingMethod.updateShippingMethod({
      updateShippingMethodRequest: { ...fields, ...location },
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.shippingMethod.shippingMethodUpdated,
            })
          );
          handleShowModal((prev) => !prev);
          resetForm({});
          getShippingMethod();
        } else {
          dispatch(
            setAlertMessage({ type: "danger", message: serverError(response) })
          );
        }
        dispatch(setAddLoading(false));
      })
      .catch((errors) => {
        dispatch(
          setAlertMessage({
            type: "danger",
            message: ValidationMsgs.shippingMethod.shippingMethodNotUpdated,
          })
        );
        dispatch(setAddLoading(false));
      });
  };

  useEffect(() => {
    if (idson) {
      dispatch(setAddLoading(true));
      ShippingMethod.getShippingMethodsById(idson)
        .then((res) => {
          var response = res.data;
          if (response.success) {
            setData({ ...response.data });
          }
          dispatch(setAddLoading(false));
        })
        .catch((err) => {
          dispatch(setAddLoading(false));
        });
    }
  }, [idson]);

  const onsubmit = (fields, { resetForm }) => {
    if (idson) {
      updateShippingMethod(fields, resetForm);
    } else {
      createShippingMethods(fields, resetForm);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required(ValidationMsgs.shippingMethod.nameRequired),
    shippingVia: Yup.string()
      .trim()
      .required(ValidationMsgs.shippingMethod.shippingVia),
    charges: Yup.number()
      .required(ValidationMsgs.shippingMethod.charges)
      .test("charges", ValidationMsgs.decimalNumber.decimalNumber, (number) =>
        decimalNumberCheck.test(number)
      ),
    shippingServicesId: Yup.string()
      .trim()
      .required(ValidationMsgs.shippingMethod.shippingServicesIdRequired),
  });

  return (
    <>
      <title> Add Shipping Method</title>
      <div
        id="paymentModal"
        className="overflow-y-auto overflow-x-hidden fixed z-30 right-0 left-0 top-4 justify-center items-center h-modal md:h-full md:inset-0"
      >
        <div className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="relative px-4 w-full max-w-2xl h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow  max-h-screen overflow-y-auto">
              <div className="flex justify-between items-start p-5 rounded-t border-b  sticky top-0 left-0 bg-white">
                <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl">
                  {isAddMode === true
                    ? "Add Shipping Method"
                    : "Edit Shipping Method"}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                  data-modal-toggle="actionModal"
                  onClick={handleShowModal}
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
              <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={onsubmit}
                validationSchema={validationSchema}
              >
                {({ setFieldValue, errors, values }) => {
                  return (
                    <FormikForm>
                      <Messages />
                      <div className="p-6">
                        <div className="w-full mb-4 last:mb-0">
                          <label
                            className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                            htmlFor="grid-first-name"
                          >
                            {"Name"}

                            <span className="text-rose-500 text-2xl leading-none">
                              *
                            </span>
                          </label>
                          <Input type={""} name="name" maxLength={500} />
                        </div>
                        <div className="w-full mb-4 last:mb-0">
                          <label
                            className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                            htmlFor="grid-first-name"
                          >
                            {"Shipping Via"}

                            <span className="text-rose-500 text-2xl leading-none">
                              *
                            </span>
                          </label>
                          <Input type={""} name="shippingVia" maxLength={500} />
                        </div>
                        <div className="w-full mb-4 last:mb-0">
                          <label
                            className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                            htmlFor="grid-first-name"
                          >
                            {`Charges (${CurrencySymbolByCode.USD})`}

                            <span className="text-rose-500 text-2xl leading-none">
                              *
                            </span>
                          </label>
                          <Input
                            type={"number"}
                            name="charges"
                            maxLength={20}
                            placeholder={"0.00"}
                            allowNegative={false}
                          />
                        </div>
                        <div>
                          <label
                            className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                            htmlFor="grid-first-name"
                          >
                            {"Shipping Services"}

                            <span className="text-rose-500 text-2xl leading-none">
                              *
                            </span>
                          </label>
                          <Dropdown
                            label="Shipping Services"
                            name={"shippingServicesId"}
                            options={shippingServiceDropDownData}
                            isMulti={false}
                            defaultValue={values.shippingServicesId}
                            placeholder="Select Shipping Services"
                          />
                        </div>
                        <div className="w-full flex mb-4">
                          <div className="w-full">
                            <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                              Status
                              <span className="text-rose-500 text-2xl leading-none">
                                *
                              </span>
                            </label>
                            <div className="col-span-full w-full sm:col-span-6 xl:col-span-8">
                              <div>
                                <ToggleButton
                                  name="recStatus"
                                  id="recStatus"
                                  size="m"
                                  on="Active"
                                  off="Inactive"
                                  onChange={(e) =>
                                    setFieldValue(
                                      "recStatus",
                                      e.target.checked
                                        ? RecStatusValuebyName.Active
                                        : RecStatusValuebyName.Inactive
                                    )
                                  }
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
                          type="button"
                          className="btn bg-white border-neutral-200 text-gray-500 hover:text-gray-700"
                          onClick={handleShowModal}
                        >
                          Cancel
                        </button>
                        {(permission?.isEdit || permission?.isDelete) && (
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
                        )}
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
export default AddShippingMethodModal;
