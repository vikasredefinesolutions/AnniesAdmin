import { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";

import { DateTimeFormat, serverError } from "services/common/helper/Helper";
import CustomerCreditServiceCls from "services/admin/customerCreadit/CustomerCreditService";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { CurrencySymbolByCode } from "global/Enum";
import InputNumber from "components/common/formComponent/InputNumber";
import Input from "components/common/formComponent/Input";
import { ValidationMsgs } from "global/ValidationMessages";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
const CustomerInfo = ({ orderDetail, blockOrderIP, setCustomerOrderModal }) => {
  const permission = useSelector((store) => store.permission);
  const location = useSelector((store) => store.location);

  const [storeCreditModal, setStoreCreditModal] = useState(false);

  return (
    <>
      <div className="w-full justify-between bg-white rounded-md shadow-lg">
        <div className="w-full flex mb-4 last:mb-0 border-b border-neatural-200">
          <div className="w-full leading-10 p-3">
            <div className="flex w-full text-left px-2">
              <div className="w-1/2 text-lg font-bold text-gray-500 text-left mt-2">
                Customer Info
              </div>

              <div className="w-1/2 text-lg font-bold text-gray-500 text-right leading-10">
                <button
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                  onClick={() => setStoreCreditModal((prev) => !prev)}
                >
                  Store Credit
                </button>
              </div>

              {/* {(permission?.isEdit || permission?.isDelete) &&
                <div className="w-1/2 text-lg font-bold text-gray-500 text-right leading-10">
                  <button
                    className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                    onClick={() => blockOrderIP()}
                  >
                    {orderDetail?.isBlockIpAddress === true ? "Unblock" : "Block"} this IP
                  </button>
                </div>
              } */}
            </div>
          </div>
        </div>
        <div className="w-full mb-2 last:mb-0">
          <div className="w-full leading-6">
            <div className="text-left px-3 font-semibold">
              Name :
              <span
                className="text-indigo-500 cursor-pointer"
                onClick={() =>
                  setCustomerOrderModal({
                    state: true,
                    fromWhereItIsClicked: "userName",
                    currenttab: 0,
                  })
                }
              >
                {orderDetail?.billingAddress?.name}
              </span>
              <NavLink to={"/admin/Customer/customer/edit/"}></NavLink>
            </div>

            <div className="text-left text-gray-500 px-3 font-semibold">
              Email :
              <span className="text-gray-500">
                {orderDetail?.billingAddress?.email}
              </span>
            </div>
            {orderDetail &&
            orderDetail?.endUserName !== "" &&
            orderDetail?.endUserName !== null ? (
              <>
                <div className="text-left text-gray-500 px-3 font-semibold">
                  End User Name :
                  <span className="text-gray-500">
                    {orderDetail && orderDetail?.endUserName}
                  </span>
                </div>
                <div className="text-left text-gray-500 px-3 font-semibold">
                  Checked Date :
                  <span className="text-gray-500">
                    {orderDetail && orderDetail?.decorationDate && (
                      <>
                        <span className="pr-1">
                          {DateTimeFormat(orderDetail?.decorationDate).date}
                        </span>
                        <span>
                          {DateTimeFormat(orderDetail?.decorationDate).time}
                        </span>
                      </>
                    )}
                  </span>
                </div>
              </>
            ) : (
              ""
            )}

            {/* <div className="text-left text-gray-500 px-3 font-semibold">
              <span className="text-gray-500">
                This order was placed via ONLINE via IP Address 172.71.166.238
                <a
                  target="_blank"
                  href={"https://whatismyipaddress.com/ip/172.71.166.238"}
                  className={"text-indigo-500 pl-4 "}
                  rel={"noreferrer"}
                >
                  What is my IP?
                </a>
              </span>
            </div> */}
          </div>
        </div>
      </div>

      {storeCreditModal && (
        <StoreCreditModal
          orderDetail={orderDetail}
          setStoreCreditModal={setStoreCreditModal}
          permission={permission}
          location={location}
        />
      )}
    </>
  );
};

export default CustomerInfo;

const StoreCreditModal = ({
  orderDetail,
  setStoreCreditModal,
  permission,
  location,
}) => {
  const dispatch = useDispatch();
  const [availableCredit, setAvailableCredit] = useState(0);

  const validationSchema = Yup.object({
    reason: Yup.string()
      .trim()
      .required(ValidationMsgs.customer.reasonRequired),
  });

  const getAvailableBalance = () => {
    dispatch(setAddLoading(true));
    CustomerCreditServiceCls.getCustomerCreditById(orderDetail?.customerId)
      .then((response) => {
        if (response.data.data) {
          setAvailableCredit(response.data.data);
        }
        dispatch(setAddLoading(false));
      })
      .catch(() => {
        dispatch(setAddLoading(false));
      });
  };

  const onSubmit = (values, { resetForm }) => {
    dispatch(setAddLoading(true));

    CustomerCreditServiceCls.createCustomerCredit({
      customerCreditModel: {
        ...values,
        ...location,
      },
    })
      .then((response) => {
        if (response.data.success && response.data.data) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.customer.creditAmountAdded,
            })
          );
          resetForm({});
        } else {
          dispatch(
            setAlertMessage({ type: "danger", message: serverError(response) })
          );
        }
        setStoreCreditModal((prev) => !prev);
        dispatch(setAddLoading(false));
      })
      .catch((errors) => {
        dispatch(
          setAlertMessage({
            type: "danger",
            message: ValidationMsgs.customer.creditAmountNotAdded,
          })
        );
        dispatch(setAddLoading(false));
      });
  };

  useEffect(() => {
    getAvailableBalance();
  }, [orderDetail?.customerId]);

  return (
    <>
      <div className="overflow-y-auto overflow-x-hidden fixed z-30 right-0 left-0 top-4 justify-center items-center h-modal md:h-full md:inset-0">
        <div className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="relative px-4 w-full max-w-2xl h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow max-h-screen overflow-y-auto">
              <div className="flex justify-between items-start p-5 rounded-t border-b sticky top-0 left-0 bg-white">
                <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl">
                  Store Credit Details
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                  data-modal-toggle="actionModal"
                  onClick={() => setStoreCreditModal((prev) => !prev)}
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
                initialValues={{
                  id: 0,
                  customerId: orderDetail?.customerId,
                  creditAmount: "",
                  reason: "",
                  recStatus: "A",
                  rowVersion: "",
                  isCredit: "C",
                }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({ values, setFieldValue }) => {
                  return (
                    <FormikForm>
                      <div className="p-6">
                        <div className="w-full mb-4 last:mb-0">
                          <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                            {"Amount :"}
                          </label>
                          <div className="block bg-white px-2 py-2 rounded-md  w-96">
                            {`${CurrencySymbolByCode.USD} ${availableCredit}`}
                          </div>
                        </div>

                        <div className="w-full mb-4 last:mb-0">
                          <label
                            className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                            htmlFor="grid-first-name"
                          >
                            {"Credit Amount :"}
                          </label>
                          <InputNumber
                            name={"creditAmount"}
                            allowNegative={true}
                            placeholder="0.00"
                            value={values.creditAmount}
                            displayError={true}
                            onChange={(e) => {
                              setFieldValue("creditAmount", e.target.value);
                            }}
                          />
                        </div>

                        <div className="w-full mb-4 last:mb-0">
                          <label
                            className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                            htmlFor="grid-first-name"
                          >
                            {"Reason :"}

                            <span className="text-rose-500 text-2xl leading-none">
                              *
                            </span>
                          </label>
                          <Input
                            name={"reason"}
                            value={values.reason}
                            onChange={(e) => {
                              setFieldValue("reason", e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-center p-6 space-x-2 rounded-b border-t border-gray-200">
                        <button
                          type="button"
                          className="btn bg-white border-neutral-200 text-gray-500 hover:text-gray-700"
                          onClick={() => setStoreCreditModal((prev) => !prev)}
                        >
                          Cancel
                        </button>

                        {(permission?.isEdit || permission?.isDelete) && (
                          <button
                            type="Submit"
                            className={`flex justify-center btn px-6 bg-indigo-500 hover:bg-indigo-600 text-white`}
                          >
                            <div
                              className={`w-full flex justify-center align-middle `}
                            >
                              Submit
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
