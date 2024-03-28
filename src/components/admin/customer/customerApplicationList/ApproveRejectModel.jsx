/*Component Name: Customer Application List
Component Functional Details: User can only view, approve, reject, asi distributor from here.
Created By: Shrey Patel
Created Date: 02/28/2023
Modified By: Bhargav Yadav
Modified Date: 09/19/2023 */

import React, { useState, useEffect } from "react";
import { Formik, Form as FormikForm } from "formik";
// import * as Yup from "yup";
import Input from "components/common/formComponent/Input";
import { useDispatch, useSelector } from "react-redux";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import Messages from "components/common/alerts/messages/Index";
import {
  DateTimeFormat,
  serverError,
  TitleNameHelper,
} from "services/common/helper/Helper";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import CustomerAccountCreationApprovalService from "services/admin/customer/CustomerAccountCreationApprovalService";
import { ValidationMsgs } from "global/ValidationMessages";

const ApproveRejectModel = ({
  setOpenBasicModal,
  getCustomerApproveList,
  basicModalInfo,
  modalStatus,
  setModalStatus,
}) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const location = useSelector((store) => store?.location);
  const permission = useSelector((store) => store.permission);
  const GlobalLoading = useSelector((store) => store?.GlobalLoaderReducer?.toLoad);

  const initialValues = {
    id: data.id,
    rowVersion: data?.rowVersion || "",
    reason: data?.note || "",
    effectedDate: "",
    customerNumber: data?.customerNumber || "",
    recStatus: basicModalInfo?.data?.changeStatus,
    isUseNet: false,
    tierId: 0,
    IsCustomerPersonalization: false,
    isPeterMillarReferralAccount: false,
  };

  // const validationSchema = Yup.object({
  //   // reason: Yup.string().trim().required("Reason is Required"),
  //   customerNumber: Yup.string().trim().required("Customer Number is Required"),
  // });

  const updateCustomerApplication = (fields, resetForm) => {
    dispatch(setAddLoading(true));
    CustomerAccountCreationApprovalService.UpdateCustomerApproval({ customerapprovemodel: { ...fields, ...location } })
      .then((response) => {
        if (response.data.success) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.customerApproveRejectModel.CustomerApproveSuccess,
            })
          );
          setOpenBasicModal(false);
          resetForm({});
          getCustomerApproveList();
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
            message:
              ValidationMsgs.customerApproveRejectModel.CustomerNotApprove,
          })
        );
        dispatch(setAddLoading(false));
      });
  };

  useEffect(() => {
    if (basicModalInfo.data.id) {
      dispatch(setAddLoading(true));
      CustomerAccountCreationApprovalService.getCustomerApprovalById(basicModalInfo.data.id)
        .then((res) => {
          var response = res.data;
          if (response.success) {
            setData(response.data);
          }
          dispatch(setAddLoading(false));
        }).catch((err) => {
          dispatch(setAddLoading(false));
        });
    }
  }, [basicModalInfo.data.id]);

  const onSubmit = (fields, { resetForm }) => {
    updateCustomerApplication(fields, resetForm);
  };

  return (
    <>
      <title>
        {TitleNameHelper({ defaultTitleName: "Customer Details" })}
      </title>
      <div
        id="CustomerApplicationModal"
        className="overflow-y-auto overflow-x-hidden fixed z-30 right-0 left-0 top-4 justify-center items-center h-modal md:h-full md:inset-0"
      >
        <div className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="relative px-4 w-full max-w-4xl h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow max-h-screen overflow-y-auto">
              <div className="flex justify-between items-start p-5 rounded-t border-b sticky top-0 left-0 bg-white">
                <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl">
                  {TitleNameHelper({ defaultTitleName: "Customer Details" })}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                  data-modal-toggle="actionModal"
                  onClick={() => {
                    setOpenBasicModal(false);
                    setModalStatus("");
                  }}
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
                // validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({ setFieldValue, errors, values }) => {
                  return (
                    <FormikForm>
                      <Messages />
                      <div className="p-6">
                        {data?.name && (
                          <div className="flex flex-wrap gap-1 mb-4 items-center">
                            <label className="w-1/4">Name :</label>
                            <div className="pl-5 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[1px] pb-1px] grow">
                              {data?.name}
                            </div>
                          </div>
                        )}
                        {data?.email && (
                          <div className="flex flex-wrap gap-1 mb-4 items-center">
                            <label className="w-1/4">Email :</label>
                            <div className="pl-5 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[1px] pb-1px] grow">
                              {data?.email}
                            </div>
                          </div>
                        )}
                        {data?.customerPhoneNumber && (
                          <div className="flex flex-wrap gap-1 mb-4 items-center">
                            <label className="w-1/4">Phone Number :</label>
                            <div className="pl-5 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[1px] pb-1px] grow">
                              {data?.customerPhoneNumber}
                            </div>
                          </div>
                        )}
                        {data?.jobtitle && (
                          <div className="flex flex-wrap gap-1 mb-4 items-center">
                            <label className="w-1/4">Job Title :</label>
                            <div className="pl-5 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[1px] pb-1px] grow">
                              {data?.jobtitle}
                            </div>
                          </div>
                        )}
                        {data?.address1 && (
                          <div className="flex flex-wrap gap-1 mb-4 items-center">
                            <label className="w-1/4">Address 1 :</label>
                            <div className="pl-5 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[1px] pb-1px] grow">
                              {data?.address1}
                            </div>
                          </div>
                        )}
                        {data?.address2 && (
                          <div className="flex flex-wrap gap-1 mb-4 items-center">
                            <label className="w-1/4">Address 2 :</label>
                            <div className="pl-5 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[1px] pb-1px] grow">
                              {data?.address2}
                            </div>
                          </div>
                        )}
                        {data?.zipCode && (
                          <div className="flex flex-wrap gap-1 mb-4 items-center">
                            <label className="w-1/4">ZipCode :</label>
                            <div className="pl-5 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[1px] pb-1px] grow">
                              {data?.zipCode}
                            </div>
                          </div>
                        )}
                        {data?.city && (
                          <div className="flex flex-wrap gap-1 mb-4 items-center">
                            <label className="w-1/4">City :</label>
                            <div className="pl-5 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[1px] pb-1px] grow">
                              {data?.city}
                            </div>
                          </div>
                        )}
                        {data?.state && (
                          <div className="flex flex-wrap gap-1 mb-4 items-center">
                            <label className="w-1/4">State :</label>
                            <div className="pl-5 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[1px] pb-1px] grow">
                              {data?.state}
                            </div>
                          </div>
                        )}
                        {data?.country && (
                          <div className="flex flex-wrap gap-1 mb-4 items-center">
                            <label className="w-1/4">Country :</label>
                            <div className="pl-5 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[1px] pb-1px] grow">
                              {data?.country}
                            </div>
                          </div>
                        )}
                        {data?.industry && (
                          <div className="flex flex-wrap gap-1 mb-4 items-center">
                            <label className="w-1/4">Industry :</label>
                            <div className="pl-5 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[1px] pb-1px] grow">
                              {data?.industry}
                            </div>
                          </div>
                        )}
                        {data?.departmentName && (
                          <div className="flex flex-wrap gap-1 mb-4 items-center">
                            <label className="w-1/4">Department Name :</label>
                            <div className="pl-5 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[1px] pb-1px] grow">
                              {data?.departmentName}
                            </div>
                          </div>
                        )}
                        {data?.companyName && (
                          <div className="flex flex-wrap gap-1 mb-4 items-center">
                            <label className="w-1/4">Company Name :</label>
                            <div className="pl-5 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[1px] pb-1px] grow">
                              {data?.companyName}
                            </div>
                          </div>
                        )}
                        {data?.status && (
                          <div className="flex flex-wrap gap-1 mb-4 items-center">
                            <label className="w-1/4">Status :</label>
                            <div className="pl-5 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[1px] pb-1px] grow">
                              {data?.status}
                            </div>
                          </div>
                        )}
                        {data?.porposeOfOrder && (
                          <div className="flex flex-wrap gap-1 mb-4 items-center">
                            <label className="w-1/4">Purpose of Order :</label>
                            <div className="pl-5 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[1px] pb-1px] grow">
                              {data?.porposeOfOrder}
                            </div>
                          </div>
                        )}
                        {data?.stylesOfInterests && (
                          <div className="flex flex-wrap gap-1 mb-4 items-center">
                            <label className="w-1/4">
                              Styles of Interest :
                            </label>
                            <div className="pl-5 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[1px] pb-1px] grow">
                              {data?.stylesOfInterests}
                            </div>
                          </div>
                        )}
                        {data?.quantity && (
                          <div className="flex flex-wrap gap-1 mb-4 items-center">
                            <label className="w-1/4">Quantity : </label>
                            <div className="pl-5 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[1px] pb-1px] grow">
                              {data?.quantity}
                            </div>
                          </div>
                        )}
                        {data.inHandDate !== null &&
                          data.inHandDate !== "" &&
                          data.inHandDate !== undefined && (
                            <div className="flex flex-wrap gap-1 mb-4 items-center">
                              <label className="w-1/4">In-Hand Date :</label>
                              <div className="pl-5 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[1px] pb-1px] grow">
                                <span className="pr2">
                                  {DateTimeFormat(data?.inHandDate).date}
                                </span>
                                <span>
                                  {DateTimeFormat(data?.inHandDate).time}
                                </span>
                              </div>
                            </div>
                          )}
                        {data?.additionalComments && (
                          <div className="flex flex-wrap gap-1 mb-4 items-center">
                            <label className="w-1/4">
                              Additional Comments :
                            </label>
                            <div className="pl-5 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[1px] pb-1px] grow">
                              {data?.additionalComments}
                            </div>
                          </div>
                        )}

                        <div className="mb-4">
                          <label>Notes :</label>
                          <Input
                            disabled={modalStatus === "view" ? true : false}
                            type={""}
                            name="reason"
                            maxLength={600}
                          />
                        </div>

                        <div className="mb-4">
                          <label>Customer Number :</label>
                          <Input
                            type={""}
                            name="customerNumber"
                            maxLength={500}
                            disabled={modalStatus === "view" ? true : false}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-end p-3 space-x-2 rounded-b border-t border-gray-200">
                        <button
                          type="button"
                          className="btn bg-white border-neutral-200 text-gray-500 hover:text-gray-700"
                          onClick={() => {
                            setOpenBasicModal(false);
                            setModalStatus("");
                          }}
                        >
                          Cancel
                        </button>
                        {(permission?.isEdit || permission?.isDelete) &&
                          modalStatus !== "view" && (
                            <button
                              disabled={
                                GlobalLoading /* || values.customerNumber !== ""
                                ? false
                                : true */
                              }
                              type="Submit"
                              className={`flex justify-center btn px-6 bg-indigo-500 hover:bg-indigo-600 text-white ${GlobalLoading /* || values.customerNumber === "" */
                                ? "bg-gray-300 hover:bg-gray-200 cursor-not-allowed"
                                : "cursor-pointer"
                                }`}
                            >
                              <div
                                className={`w-full flex justify-center align-middle `}
                              >
                                {GlobalLoading && (
                                  <span className="spinner-border spinner-border-sm mr-2"></span>
                                )}
                                {basicModalInfo.ButtonName}
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

export default ApproveRejectModel;
