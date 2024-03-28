import React from "react";
import { Formik, Form as FormikForm } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { ValidationMsgs } from "global/ValidationMessages";
import Dropdown from "components/common/formComponent/Dropdown";
import CustomerCreditService from "services/admin/customerCreadit/CustomerCreditService";

const CustomerExportCredit = ({ handleShowModal, storeBudgetOptions }) => {
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    storeId: Yup.number().required(ValidationMsgs.common.storeIdRequired),
  });

  const submitHandler = (fields) => {
    dispatch(setAddLoading(true));
    CustomerCreditService.exportCustomerCredit(fields.storeId)
      .then((response) => {
        if (response.data.success && response.data.data) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.product.export.exportSuccess,
            })
          );
          window.location.href = response.data.data;
        } else {
          dispatch(
            setAlertMessage({
              type: "danger",
              message: ValidationMsgs.product.export.exportFailed,
            })
          );
        }
        handleShowModal();
        dispatch(setAddLoading(false));
      })
      .catch((errors) => {
        dispatch(setAddLoading(false));
        handleShowModal();
      });
  };

  return (
    <>
      <div className="overflow-y-auto overflow-x-hidden z-30 fixed right-0 left-0 top-4 justify-center items-center h-modal md:h-full md:inset-0">
        <div className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="relative px-4 w-full max-w-2xl h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow">
              <div className="justify-between items-start rounded border-b sticky top-0 left-0 bg-white">
                <div className="px-5 py-3 border-b border-neutral-300">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800">
                      {"Export Credit"}
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
                </div>
                <Formik
                  enableReinitialize={true}
                  initialValues={{ storeId: "" }}
                  onSubmit={submitHandler}
                  validationSchema={validationSchema}
                >
                  {({ values }) => {
                    return (
                      <FormikForm>
                        <div className="p-4">
                          <div className="mb-6">
                            <label
                              htmlFor=""
                              className="block uppercase tracking-wide text-xs font-bold mb-2"
                            >
                              Store :
                              <span className="text-rose-500 text-2xl leading-none">
                                *
                              </span>
                            </label>
                            <Dropdown
                              options={storeBudgetOptions}
                              name={"storeId"}
                              defaultValue={values.storeId}
                              classNames={"w-[250px]"}
                            />
                          </div>
                        </div>
                        <div className="p-4 flex items-center justify-end space-x-2 border-t-2 border-neutral-200">
                          <button
                            className="btn bg-white border-neutral-200 text-gray-500 hover:text-gray-700"
                            type="button"
                            onClick={() => {
                              handleShowModal();
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                          >
                            Download Customer Credit
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

export default CustomerExportCredit;
