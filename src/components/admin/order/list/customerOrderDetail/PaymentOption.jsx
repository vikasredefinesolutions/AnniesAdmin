import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form as FormikForm, Formik } from "formik";
import * as Yup from "yup";

import { ValidationMsgs } from 'global/ValidationMessages';
import { CurrencySymbolByCode, decimalNumberCheck } from 'global/Enum';

import OrderService from 'services/admin/order/OrderService';
import CustomerService from 'services/admin/customer/CustomerService';
import { serverError } from 'services/common/helper/Helper';

import { setAlertMessage } from 'redux/alertMessage/AlertMessageReducers';
import { setAddLoading } from 'redux/globalLoader/GlobalLoaderAction';
import CustomerCreditService from 'services/admin/customerCreadit/CustomerCreditService';

// import ToggleButton from 'components/common/formComponent/ToggleButton';
// import SaveButton from 'components/common/formComponent/SaveButton';
// import Input from 'components/common/formComponent/Input';

const PaymentOption = ({ orderDetails, setCustomerOrderModal }) => {
    const dispatch = useDispatch();
    const location = useSelector((store) => store?.location);

    const [paymentInfo, setPaymentInfo] = useState({});
    const [poInformation, setPoInformation] = useState({});
    const [availableCredit, setAvailableCredit] = useState(0);
    const [Data, setData] = useState({});

    const onSubmit = (values) => {
        dispatch(setAddLoading(true));
        CustomerService.createPO({
            customerPONumberModel: {
                ...values,
                ...location
            }
        }).then((response) => {
            if (response.data.success) {
                dispatch(
                    setAlertMessage({
                        type: "success",
                        message: ValidationMsgs.customer.poCreated,
                    })
                );
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
                        message: ValidationMsgs.customer.poNotCreated,
                    })
                );
                dispatch(setAddLoading(false));
            });
    }
    const validationSchema = Yup.object({
        poNumber: Yup.string().trim().when("isGeneralPo", {
            is: false,
            then: Yup.string().trim().required(ValidationMsgs.customer.poNumberRequired)
        }),
        amount: Yup.number(ValidationMsgs.customer.notValidAmount).when("isGeneralPo", {
            is: false,
            then: Yup.number(ValidationMsgs.customer.notValidAmount).required(ValidationMsgs.customer.amount)
                .test("amount", ValidationMsgs.decimalNumber.decimalNumber, (number) => decimalNumberCheck.test(number))
        }),
    });
    
    const getPaymentInfo = () => {
        OrderService.getOrderPaymentInfo(orderDetails?.orderNumber).then((response) => {
            if (response?.data?.success && response?.data?.data) {
                setData(response?.data?.data)
            }
        }).catch(() => { });
        CustomerCreditService.getCustomerCreditById(orderDetails?.customerId).then((response) => {
            if (response.data.success && response.data.data) {
                setAvailableCredit(response.data.data);
            }
            dispatch(setAddLoading(false))
        }).catch(() => {
            dispatch(setAddLoading(false))
        })
        CustomerService.getCustomerCreditCardsById(orderDetails?.customerId, orderDetails?.orderNumber).then((response) => {
            if (response?.data?.success && response?.data?.data) {
                setPaymentInfo(response?.data?.data?.creditCards[0]);
                setPoInformation(response?.data?.data?.poDetail);
            }
        }).catch(() => { });
    }

      useEffect(() => {
        if (orderDetails?.orderNumber) {
            getPaymentInfo();
        }
    }, [orderDetails]);

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    id: 0,
                    customerId: poInformation?.customerId || orderDetails?.customerId,
                    isGeneralPo: poInformation ? poInformation?.isGeneralPo : false,
                    poNumber: poInformation?.poNumber || "",
                    amount: poInformation?.amount || 0,
                    recStatus: poInformation?.recStatus || "A",
                    rowVersion: poInformation?.rowVersion || "",
                }}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({ setFieldValue, errors, values }) => {
                    return (
                        <FormikForm>
                            <div className="p-6 border-b-2 border-slate-200 last:border-b-0 pt-6">
                                <div className="block uppercase tracking-wide text-gray-500 text-base font-bold">Credit card information</div>
                                <div className="grid grid-cols-12 gap-4 p-6 pt-4">
                                    <div className="col-span-12 md:col-span-6">
                                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="">Name on card <span className="text-rose-500 text-lg leading-none">*</span></label>
                                        <div className="">{paymentInfo?.name || 'xxxx xxxx'}</div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="">Card number <span className="text-rose-500 text-lg leading-none">*</span></label>
                                        {/* <div className="">xxxx xxxx xxxx {paymentInfo?.last4 || 'xxxx'}</div> */}
                                        <div className="">xxxx xxxx xxxx {Data?.cardNumber?.substr(-4) || 'xxxx'}</div>
                                    </div>
                                </div>
                            </div>
                            {Data?.giftCertificateDiscountAmount > 0 &&
                                <div className="p-6 border-b-2 border-slate-200 last:border-b-0 pt-6">
                                    <div className="block uppercase tracking-wide text-gray-500 text-base font-bold">Gift card information</div>
                                    <div className="grid grid-cols-12 gap-4 p-6 pt-4">
                                        <div className="col-span-12 md:col-span-6">
                                            <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="">Gift Card Number.</label>
                                            <div className="">{Data?.giftCertiSerialNumber}</div>
                                        </div>
                                        <div className="col-span-12 md:col-span-6">
                                            <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="">Available Balance</label>
                                            <div className="">{CurrencySymbolByCode.USD} {Data?.CurrentGiftCardBalance || '0.00'}</div>
                                        </div>
                                        <div className="col-span-12 md:col-span-6">
                                            <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="">Gift Card Discount Amount</label>
                                        <div className="">{CurrencySymbolByCode.USD} {Data?.giftCertificateDiscountAmount || '0.00'}</div>
                                        </div>
                                    </div>
                                </div>
                            }
                            {Data?.walletAmountUsed > 0 &&
                                <div className="p-6 border-b-2 border-slate-200 last:border-b-0 pt-6">
                                    <div className="block uppercase tracking-wide text-gray-500 text-base font-bold">Gift card Wallet</div>
                                    <div className="grid grid-cols-12 gap-4 p-6 pt-4">
                                       <div className="col-span-12 md:col-span-6">
                                            <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="">Available Wallet Balance</label>
                                        <div className="">{CurrencySymbolByCode.USD} {Data?.currentWalletBalance || '0.00'}</div>
                                        </div>
                                        <div className="col-span-12 md:col-span-6">
                                            <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="">Gift Card Wallet Amount Used</label>
                                        <div className="">{CurrencySymbolByCode.USD} {Data?.walletAmountUsed || '0.00'}</div>
                                        </div>
                                    </div>
                                </div>
                            }
                            {Data?.storeCredit > 0 &&
                                <div className="p-6 border-b-2 border-slate-200 last:border-b-0 pt-6">
                                    <div className="block uppercase tracking-wide text-gray-500 text-base font-bold">Store Credit information</div>
                                    <div className="grid grid-cols-12 gap-4 p-6 pt-4">
                                        <div className="col-span-12 md:col-span-6">
                                            <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="">Available Credit </label>
                                        <div className="">{CurrencySymbolByCode.USD} {availableCredit || "0.00"}</div>
                                        </div>
                                        <div className="col-span-12 md:col-span-6">
                                            <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="">Used Store Credit </label>
                                        <div className="">{CurrencySymbolByCode.USD} {Data?.storeCredit || "0.00"}</div>
                                        </div>
                                    </div>
                                </div>
                            }
                            {/* <div className="p-6 border-b-2 border-slate-200 last:border-b-0 pt-6">
                                <div className="w-full text-base font-bold mb-4">PO Information</div>
                                <div className="grid grid-cols-12 gap-4 p-6 pt-4" >
                                    <div className="col-span-12">
                                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">General PO <span className="text-rose-500 text-lg leading-none"></span></label>
                                        <div className="flex items-center">
                                            <div className="w-16 relative">
                                                <input type="checkbox" id="default-bill-1" className="sr-only" />
                                                <ToggleButton
                                                    id={"isGeneralPo"}
                                                    name={"isGeneralPo"}
                                                    defaultValue={values.isGeneralPo}
                                                    onChange={(e) => {
                                                        setFieldValue('isGeneralPo', e.target.checked);
                                                        if (e.target.checked === true) {
                                                            setFieldValue("amount", 0);
                                                            setFieldValue("poNumber", "");
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {!values.isGeneralPo && <>
                                        <div className="col-span-12 md:col-span-6" >
                                            <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">PO Number <span className="text-rose-500 text-lg leading-none">*</span></label>
                                            <Input name={'poNumber'} type="text" />
                                        </div>
                                        <div className="col-span-12 md:col-span-6" >
                                            <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">Amount <span className="text-rose-500 text-lg leading-none">*</span></label>
                                            <span className="material-icons-outlined text-gray-500 text-xl absolute ml-3 pt-1">$</span>
                                            <Input type={"number"} name={'amount'} className={"pl-8"} displayError={true} />
                                        </div>

                                    </>}
                                </div>
                                <div className="flex items-center justify-end p-6 space-x-2 border-t border-gray-200">
                                    <button type="button" onClick={() => setCustomerOrderModal({
                                        state: false,
                                        fromWhereItIsClicked: ""
                                    })} className="btn bg-white border-neutral-200 text-gray-500 hover:text-gray-700">Cancel</button>
                                    {(permission?.isEdit || permission?.isDelete) && <SaveButton errors={errors} >Save</SaveButton>}
                                </div>
                            </div> */}

                        </FormikForm>
                    )
                }}
            </Formik>
        </>
    );
};

export default PaymentOption;
