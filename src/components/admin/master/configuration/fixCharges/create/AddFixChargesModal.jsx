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
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { TitleNameHelper, serverError } from "services/common/helper/Helper";
import Messages from "components/common/alerts/messages/Index";
import Dropdown from "components/common/formComponent/Dropdown";
import fixChargesServices from "services/admin/fixCharges/fixChargesServices";
import Label from "components/common/formComponent/Label";
import StoreService from "services/admin/store/StoreService";

const AddFixChargesModal = ({ handleShowModal, getFixCharges, idson }) => {
  const permission = useSelector((store) => store.permission);
  const user = useSelector((store) => store?.user);
  const company = useSelector((store) => store?.CompanyConfiguration);
  const [data, setData] = useState([]);
  const [stores, setStores] = useState([]);
  const location = useSelector((store) => store?.location);
  const isAddMode = idson ? false : true;
  const dispatch = useDispatch();

  const GlobalLoading = useSelector(
    (store) => store?.GlobalLoaderReducer?.toLoad
  );

  const initialValues = {
    id: data?.id || 0,
    name: data?.name || "",
    storeId: data?.storeId || "",
    charges: data?.charges || "",
    rowVersion: data?.rowVersion || "",
    location: data?.location || "",
    ipAddress: location?.ipAddress || "",
    macAddress: location?.macAddress || "",
    recStatus: data?.recStatus || RecStatusValuebyName.Active,
  };

  const getStoreDropdownData = useCallback(() => {
    if (user?.id && company?.id) {
      StoreService.getStoreByUserId({
        userid: user?.id,
        companyConfigurationId: company?.id,
        isSuperUser: user?.isSuperUser,
      })
        .then((response) => {
          if (response?.data?.data) {
            setStores([
              // { label: "All Stores", value: "0" },
              ...response?.data?.data,
            ]);
          }
        })
        .catch((error) => {});
    }
  }, []);

  useEffect(() => {
    getStoreDropdownData();
  }, [getStoreDropdownData]);

  function createFixCharges(fields, resetForm) {
    dispatch(setAddLoading(true));
    fixChargesServices
      .createFixCharges({
        fixChargesModel: {
          name: fields.name,
          charges: fields.charges,
          storeId: fields.storeId,
          rowVersion: fields.rowVersion,
          recStatus: fields.recStatus,
          ...location,
        },
      })
      .then((response) => {
        if (response.data.success) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.fixCharges.fixChargesCreated,
            })
          );
          resetForm({});
          handleShowModal((prev) => !prev);
          getFixCharges();
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
            message: ValidationMsgs.fixCharges.fixChargesNotCreated,
          })
        );
        dispatch(setAddLoading(false));
      });
  }

  function updateFixCharges(fields, resetForm) {
    dispatch(setAddLoading(true));

    fixChargesServices
      .updateFixCharges({
        fixChargesModel: { ...fields, ...location },
      })
      .then((response) => {
        if (response.data.success) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.fixCharges.fixChargesUpdated,
            })
          );
          handleShowModal((prev) => !prev);
          resetForm({});
          getFixCharges();
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
            message: ValidationMsgs.fixCharges.fixChargesNotUpdated,
          })
        );
        dispatch(setAddLoading(false));
      });
  }

  useEffect(() => {
    if (idson) {
      dispatch(setAddLoading(true));
      fixChargesServices
        .getFixChargesById(idson)
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

  const onSubmit = (fields, { resetForm }) => {
    if (idson) {
      updateFixCharges(fields, resetForm);
    } else {
      createFixCharges(fields, resetForm);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().trim().required(ValidationMsgs.fixCharges.nameRequired),
    charges: Yup.number()
      .required(ValidationMsgs.fixCharges.charges)
      .test("charges", ValidationMsgs.decimalNumber.decimalNumber, (number) =>
        decimalNumberCheck.test(number)
      ),
    storeId: Yup.string()
      .trim()
      .required(ValidationMsgs.shippingService.storeIdRequired),
  });

  return (
    <>
      {/* <title>Add Fix Charges</title> */}
      <title>
        {isAddMode === true ? "Add " : "Edit "}
        {TitleNameHelper({ defaultTitleName: `Fix Charges` })}
      </title>
      <div
        id="paymentModal"
        className="overflow-y-auto overflow-x-hidden z-30 fixed right-0 left-0 top-4 justify-center items-center h-modal md:h-full md:inset-0"
      >
        <div className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="relative px-4 w-full max-w-2xl h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow max-h-screen overflow-y-auto">
              <div className="flex justify-between items-start p-5 rounded-t border-b sticky top-0 left-0 bg-white">
                {/* <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl">
                  {isAddMode === true ? "Add Fix Charges" : "Edit Fix Charges"}
                </h3> */}
                <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl">
                  {isAddMode === true ? "Add " : "Edit "}
                  {TitleNameHelper({ defaultTitleName: `Fix Charges` })}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
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
                onSubmit={onSubmit}
                validationSchema={validationSchema}
              >
                {({ setFieldValue, errors, values }) => {
                  return (
                    <FormikForm>
                      <Messages />
                      <div className="p-6">
                        <div className="w-full mb-4 last:mb-0">
                          {/* <label
                            className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                            htmlFor="grid-first-name"
                          >
                            {"Name"}

                            <span className="text-rose-500 text-2xl leading-none">
                              *
                            </span>
                          </label> */}
                          <Label labelValue={"Name"} Required={true} />
                          <Input type={""} name="name" maxLength={500} />
                        </div>
                        <div className="w-full mb-4 last:mb-0">
                          <label
                            className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                            htmlFor="grid-first-name"
                          >
                            {"Charges"} ({CurrencySymbolByCode.USD})
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
                        <div className="w-full mb-4 last:mb-0">
                          <label
                            className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                            htmlFor="grid-first-name"
                          >
                            {"Store Name"}

                            <span className="text-rose-500 text-2xl leading-none">
                              *
                            </span>
                          </label>
                          <Dropdown
                            label="Store"
                            name={"storeId"}
                            options={stores}
                            isMulti={false}
                            defaultValue={values.storeId}
                            placeholder="Select Store"
                          />
                        </div>
                        <div className="w-full mb-4 last:mb-0">
                          <label
                            className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                            htmlFor="grid-first-name"
                          >
                            Status
                            <span className="text-rose-500 text-2xl leading-none">
                              *
                            </span>
                          </label>
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
                                values.recStatus === RecStatusValuebyName.Active
                                  ? true
                                  : false
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-end p-6 space-x-2 rounded-b border-t border-gray-200">
                        <button
                          // data-modal-toggle="actionModal"
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

export default AddFixChargesModal;
