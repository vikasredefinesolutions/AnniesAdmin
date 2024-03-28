import { CurrencySymbolByCode } from "global/Enum";
import React, { useState } from "react";
import { DateTimeFormat, serverError } from "services/common/helper/Helper";
import OrderService from "services/admin/order/OrderService";
import { useDispatch, useSelector } from "react-redux";
import { ValidationMsgs } from "global/ValidationMessages";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import CancelOrder from "../edit/CancelOrder";

const ShippingAddress = ({ orderDetail, getOrderDetails, getData }) => {
  const dispatch = useDispatch();
  const permission = useSelector((store) => store.permission);

  const [cancelOrderModal, setCancelOrderModal] = useState(false);

  const ResendOrderDetails = () => {
    if (orderDetail?.orderNumber) {
      dispatch(setAddLoading(true));
      OrderService.sendOrderMailInvoice({ orderId: orderDetail?.orderNumber })
        .then((response) => {
          if (response?.data?.success && response?.data?.data) {
            dispatch(
              setAlertMessage({
                type: "success",
                message: response?.data?.data,
              })
            );
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
        .catch(() => {
          dispatch(
            setAlertMessage({
              type: "danger",
              message:
                ValidationMsgs.orderPaymentPendingEmail.ResetPasswordNotSuccess,
            })
          );
          dispatch(setAddLoading(false));
        });
    }
  };

  const orderTransctionCapture = () => {
    if (orderDetail?.orderNumber) {
      dispatch(setAddLoading(true));
      OrderService.orderTransctionCapture(orderDetail?.orderNumber)
        .then((response) => {
          if (response?.data?.success && response?.data?.data) {
            dispatch(
              setAlertMessage({
                type: "success",
                message: "Payment Transaction status captured",
              })
            );
          }
          getOrderDetails();
          dispatch(setAddLoading(false));
        })
        .catch((error) => {
          dispatch(
            setAlertMessage({ type: "danger", message: serverError(error) })
          );
          dispatch(setAddLoading(false));
        });
    }
  };

  const orderTransctionDelete = () => {
    if (orderDetail?.orderNumber) {
      dispatch(setAddLoading(true));
      OrderService.orderTransctionDelete(orderDetail?.orderNumber)
        .then((response) => {
          if (response?.data?.success && response?.data?.data) {
            dispatch(
              setAlertMessage({
                type: "success",
                message: "Payment Transaction status voided",
              })
            );
          }
          getOrderDetails();
          dispatch(setAddLoading(false));
        })
        .catch((error) => {
          dispatch(setAddLoading(false));
        });
    }
  };

  return (
    <>
      <div className="w-full justify-between bg-white rounded-md shadow-lg">
        <div className="w-full flex mb-4 last:mb-0 border-b border-neatural-200">
          <div className="w-full leading-10 p-3">
            <div className="flex w-full text-left px-2">
              <div className="w-1/2 text-lg font-bold text-gray-500 text-left mt-2">
                Order Details
              </div>
              {(permission?.isEdit || permission?.isDelete) && (
                <div className="w-1/2 text-lg font-bold text-gray-500 text-right leading-10">
                  <button
                    className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                    onClick={() => ResendOrderDetails()}
                  >
                    Resend Order Details
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full flex mb-2 px-3 last:mb-0">
          <div className="w-1/2 text-left">
            <div className="text-md font-medium text-gray-500 text-left px-2 py-1">
              Total
            </div>
          </div>
          <div className="w-1/2 text-right">
            <div className="text-2xl text-green-600 font-bold text-gray-500 text-right px-2 py-1">
              {CurrencySymbolByCode.USD}
              {orderDetail?.total
                ? Number(orderDetail?.total).toFixed(2)
                : "0.00"}
            </div>
          </div>
        </div>
        <div className="w-full flex mb-2 px-3 last:mb-0">
          <div className="w-1/2 text-left">
            <div className="text-md font-medium text-gray-500 text-left px-2 py-1">
              Payment Status
            </div>
          </div>
          {orderDetail?.paymentStatus && (
            <div className="w-1/2 text-right">
              <div className="border uppercase text-xs inline-block font-medium rounded-md text-center px-2.5 py-1 break-words w-32  border-sky-300 bg-sky-100 text-sky-600 mr-1">
                {orderDetail?.paymentStatus}
              </div>

              {orderDetail?.paymentStatus.toLowerCase() === "authorize" && (
                <button
                  className="text-xs uppercase inline-block font-medium border border-green-300 bg-green-100 text-green-600 rounded-md text-center px-2.5 py-1 w-24 mr-1"
                  onClick={orderTransctionCapture}
                >
                  Capture
                </button>
              )}

              {(orderDetail?.paymentStatus.toLowerCase() === "authorize" ||
                orderDetail?.paymentStatus.toLowerCase() === "captured") && (
                <button
                  className="text-xs uppercase inline-block font-medium border border-yellow-300 bg-yellow-100 text-yellow-600 rounded-md text-center px-2.5 py-1 w-20 mr-1"
                  onClick={orderTransctionDelete}
                >
                  Void
                </button>
              )}

              {orderDetail?.paymentStatus.toLowerCase() === "captured" && (
                <button
                  className="text-xs uppercase inline-block font-medium border text-rose-600 border-rose-300 bg-rose-100 rounded-md text-center px-2.5 py-1 w-20"
                  onClick={() => setCancelOrderModal((prev) => !prev)}
                >
                  Refund
                </button>
              )}
            </div>
          )}
        </div>
        {orderDetail?.refenceOrderID !== "" && (
          <div className="w-full flex mb-2 px-3 last:mb-0">
            <div className="w-1/2 text-left">
              <div className="text-md font-medium text-gray-500 text-left px-2 py-1">
                Reference #
              </div>
            </div>
            <div className="w-1/2 text-right">
              <div className="text-md font-medium text-gray-500 text-right px-2 py-1">
                {orderDetail?.refenceOrderID}
              </div>
            </div>
          </div>
        )}
        <div className="w-full flex mb-2 px-3 last:mb-0">
          <div className="w-1/2 text-left">
            <div className="text-md font-medium text-gray-500 text-left px-2 py-1">
              Imported On
            </div>
          </div>
          <div className="w-1/2 text-right">
            <div className="text-md font-medium text-gray-500 text-right px-2 py-1">
              {orderDetail?.orderDate &&
                DateTimeFormat(orderDetail?.orderDate).date +
                  " " +
                  DateTimeFormat(orderDetail?.orderDate).time}
            </div>
          </div>
        </div>
        <div className="w-full flex mb-2 px-3 last:mb-0">
          <div className="w-1/2 text-left">
            <div className="text-md font-medium text-gray-500 text-left px-2 py-1">
              Ordered On
            </div>
          </div>
          <div className="w-1/2 text-right">
            <div className="text-md font-medium text-gray-500 text-right px-2 py-1">
              {orderDetail?.orderDate &&
                DateTimeFormat(orderDetail?.orderDate).date +
                  " " +
                  DateTimeFormat(orderDetail?.orderDate).time}
            </div>
          </div>
        </div>
        <div className="w-full flex mb-2 px-3 last:mb-0">
          <div className="w-1/2 text-left">
            <div className="text-md font-medium text-gray-500 text-left px-2 py-1">
              Channel
            </div>
          </div>
          <div className="w-1/2 text-right">
            <div className="text-md font-medium text-gray-500 text-right px-2 py-1">
              {orderDetail?.employeeId === 0 ? "Web Order" : "Employee Order"}
            </div>
          </div>
        </div>
        <div className="w-full flex mb-2 px-3 last:mb-0">
          <div className="w-1/2 text-left">
            <div className="text-md font-medium text-gray-500 text-left px-2 py-1">
              {orderDetail?.employeeId !== 0 &&
                "Employee Name :" + orderDetail?.employeeName}
            </div>
          </div>
          <div className="w-1/2 text-right">
            <div className="text-md font-medium text-gray-500 text-right px-2 py-1">
              {orderDetail?.employeeId === 0 ? "" : orderDetail?.employeeEmail}
            </div>
          </div>
        </div>
      </div>

      {cancelOrderModal && (
        <CancelOrder
          setCancelOrderModal={setCancelOrderModal}
          orderId={orderDetail?.orderNumber}
          fullOrder={true}
          getOrderDetails={getOrderDetails}
          getData={getData}
        />
      )}
    </>
  );
};

export default ShippingAddress;
