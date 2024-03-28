/*Component Name: PaymentInformaton
Component Functional Details: User can create or update PaymentInformaton master details from here.
Created By: Shrey Patel
Created Date: Currunt Date
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import { React } from 'react';
import OrderService from 'services/admin/order/OrderService';
import { useDispatch, useSelector } from 'react-redux';
import { setAlertMessage } from 'redux/alertMessage/AlertMessageReducers';
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { ValidationMsgs } from "global/ValidationMessages";

const PaymentInformaton = ({ orderDetail }) => {
    const dispatch = useDispatch();
    const permission = useSelector(store => store.permission);

    const resendPaymentMail = () => {
        if (orderDetail?.orderNumber) {
            dispatch(setAddLoading(true))
            OrderService.sendMailPaymentPendingInvoice({ orderId: orderDetail?.orderNumber }).then((response) => {
                if (response?.data?.data) {
                    dispatch(setAlertMessage({
                        message: ValidationMsgs.orderPaymentPendingEmail.ResetPasswordSuccess,
                        type: 'success'
                    }));
                } else {
                    dispatch(setAlertMessage({
                        message: ValidationMsgs.orderPaymentPendingEmail.ResetPasswordNotSuccess,
                        type: 'danger'
                    }));
                }
                dispatch(setAddLoading(false));
            }).catch(() => {
                dispatch(setAddLoading(false));

            })
        }
    }

    return (
        <>
            <div className="w-full justify-between bg-white py-2 rounded-md shadow-lg">
                <div className="w-full flex mb-4 last:mb-0 border-b border-neatural-200">
                    <div className="w-1/2 text-left px-3"><div className="text-lg font-bold text-gray-500 text-left px-2 leading-10">Payment Information</div></div>
                    {/* <div className="w-1/2 text-left px-3">
                        <div className="text-lg font-bold text-gray-500 text-right px-2 leading-10"><Link to={"#"} className="text-indigo-500">View Details</Link></div>
                    </div> */}
                </div>
                <div className="w-full flex mb-2 px-3 last:mb-0">
                    <div className="w-1/2 text-left"><div className="text-md font-medium text-gray-500 text-left px-2 py-1">Payment Method :</div></div>
                    <div className="w-1/2 text-right"><div className="text-md font-medium text-gray-500 text-right px-2 py-1">{orderDetail?.paymentMethod}</div></div>
                </div>
                {orderDetail?.paymentMethod && orderDetail?.paymentMethod.toLowerCase() === "paymentpending" ?
                    <div className="w-full flex mb-2 px-3 last:mb-0">
                        {(permission?.isEdit || permission?.isDelete) &&
                            <div className="w-1/2 text-left">
                                <button onClick={() => resendPaymentMail()} className="text-md font-medium text-indigo-500 text-left px-2 py-1 cursor-pointer">Resend Mail</button>
                            </div>
                        }
                    </div> : ""}

                {/* orderDetail?.paymentMethod.toLowerCase() === "paymentpending" */ false ?
                    <>
                        <div className="w-full flex mb-2 px-3 last:mb-0">
                            <div className="w-1/2 text-left"><div className="text-md font-medium text-gray-500 text-left px-2 py-1">Transaction ID :</div></div>
                            <div className="w-1/2 text-right"><div className="text-md font-medium text-gray-500 text-right px-2 py-1">{""}</div></div>
                        </div>
                        <div className="w-full flex mb-2 px-3 last:mb-0">
                            <div className="w-1/2 text-left"><div className="text-md font-medium text-gray-500 text-left px-2 py-1">Transaction Type :</div></div>
                            <div className="w-1/2 text-right"><div className="text-md font-medium text-gray-500 text-right px-2 py-1">{""}</div></div>
                        </div>
                        <div className="w-full flex mb-2 px-3 last:mb-0">
                            <div className="w-1/2 text-left"><div className="text-md font-medium text-gray-500 text-left px-2 py-1">Authorized On :</div></div>
                            {/* <div className="w-1/2 text-right"><div className="text-md font-medium text-gray-500 text-right px-2 py-1">{orderDetail?.orderDate && DateTimeFormat(orderDetail?.orderDate).date + " " + DateTimeFormat(orderDetail?.orderDate).time}</div></div> */}
                        </div>
                    </>
                    :
                    <div className="w-full flex mb-2 px-3 last:mb-0">
                        {/* <div className="w-1/2 text-left"><div className="text-md font-medium text-indigo-500 text-left px-2 py-1 cursor-pointer">Resend email</div></div> */}
                    </div>
                }
            </div>
        </>
    );
};

export default PaymentInformaton;
