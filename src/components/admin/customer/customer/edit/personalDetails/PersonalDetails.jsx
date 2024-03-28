/*Component Name: PersonalDetails
Component Functional Details:  PersonalDetails .
Created By: PK Kher
Created Date: <Creation Date>
Modified By: chandan
Modified Date: <Modified Date> */

import React, { useState, useEffect, useCallback } from "react";
import AddressModal from "./AddressModal";
import Address from "./Address";
import ResetPasswordModal from "./ResetPasswordModal";
import { useSelector, useDispatch } from "react-redux";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { CurrencySymbolByCode, RecStatusValuebyName } from "global/Enum";
import { ValidationMsgs } from "global/ValidationMessages";
import CustomerService from "services/admin/customer/CustomerService";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { serverError } from "services/common/helper/Helper";
import CustomerCreditServiceCls from "services/admin/customerCreadit/CustomerCreditService";
import ToggleButton from "components/common/formComponent/ToggleButton";

const PersonalDetails = ({
    customerInfo,
    getCustomerData,
    setShowEdit,
    onSubmit,
}) => {
    const dispatch = useDispatch();
    const permission = useSelector((store) => store?.permission);
    const [showShippingAddressModal, setShippingAddressModal] = useState(false);
    const [showBillingAddressModal, setBillingAddressModal] = useState(false);
    const [ShowResetPassword, SetShowResetPassword] = useState(false);
    const [editAddressModalData, setEditAddressModalData] = useState({});
    const [NavCustomerId, setNavCustomerId] = useState("");
    const [availableCredit, setAvailableCredit] = useState(0);

    const handleNavCustomerId = (value) => {
        setNavCustomerId(value);
    };

    const RefreshFromNav = (customerInfo) => {
        dispatch(setAddLoading(true));
        CustomerService.getCustomerNavIdByMail(customerInfo?.email)
            .then((response) => {
                if (response.data.success && response?.data?.data) {
                    setNavCustomerId(response?.data?.data);
                    dispatch(
                        setAlertMessage({
                            type: "success",
                            message: "Nav id refreshed successfully",
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
            .catch((errors) => {
                dispatch(
                    setAlertMessage({
                        type: "danger",
                        message: "Nav id is not refreshed, Please try after sometime",
                    })
                );
                dispatch(setAddLoading(false));
            });
    };

    const handleOnSubmit = (navCustomerId, customerInfo) => {
        customerInfo.navCustomerId = navCustomerId;
        if (navCustomerId) {
            const payload = {
                id: customerInfo.id || 0,
                storeId: customerInfo.storeId || "",
                firstname: customerInfo.firstname || "",
                lastName: customerInfo.lastName || "",
                email: customerInfo.email || "",
                companyName: customerInfo.companyName || "",
                isRegistered: customerInfo.isRegistered || true,
                sharedCustomerId: customerInfo.sharedCustomerId || 0,
                isLocked: customerInfo.isLocked || false,
                navCustomerId: customerInfo.navCustomerId || "",
                customerType: customerInfo.customerType || "credit",
                isTaxableuser: customerInfo.isTaxableuser || false,
                recStatus: customerInfo.recStatus || RecStatusValuebyName.Active,
                rowVersion: customerInfo.rowVersion || "",
                isSuperuser: customerInfo.isSuperuser || false,
            };

            onSubmit(payload);
        } else {
            dispatch(
                setAlertMessage({
                    type: "danger",
                    message: ValidationMsgs.customer.alphanumericOneToThirty,
                })
            );
        }
    };

    const PasswordReset = (storeId, Email) => {
        dispatch(setAddLoading(true))
        CustomerService.sendResetPasswordLink(storeId, Email).then((response) => {
            if (response?.data?.data?.issend) {
                dispatch(setAlertMessage({
                    type: 'success',
                    message: ValidationMsgs.CompanyResetPassword.ResetPasswordSuccess,
                }));
            } else {
                dispatch(setAlertMessage({
                    type: 'danger',
                    message: ValidationMsgs.CompanyResetPassword.ResetPasswordNotSuccess,
                }));
            }
            dispatch(setAddLoading(false));
        }).catch(() => {
            dispatch(setAddLoading(false));
        })
    }

    const getAvailableBalance = useCallback(() => {
        dispatch(setAddLoading(true))
        CustomerCreditServiceCls.getCustomerCreditById(customerInfo.id).then(response => {
            if (response.data.data) {
                setAvailableCredit(response.data.data);
            }
            dispatch(setAddLoading(false))
        }).catch(() => {
            dispatch(setAddLoading(false))
        })
    }, [customerInfo]);

    useEffect(() => {
        getAvailableBalance();
        if (customerInfo.navCustomerId) {
            setNavCustomerId(customerInfo.navCustomerId);
        }
    }, [customerInfo]);
    
    return (
        <>
            <div className="grow">
                <div className="pt-6">
                    <div className="flex items-center justify-between gap-2">
                        <h2 className="text-2xl text-gray-800 font-bold mb-5">
                            Customer Details
                        </h2>
                        {(permission?.isEdit || permission?.isDelete) && (
                            <div>
                                <button
                                    type="button"
                                    className="text-indigo-500 text-sm"
                                    onClick={() => {
                                        setShowEdit((prev) => !prev);
                                    }}
                                >
                                    Edit
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="py-5">
                        <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
                            {/* <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500">
                                    Store Name
                                </dt>
                                <dd className="mt-1 text-sm font-bold text-gray-900">
                                    {customerInfo.storeName}
                                </dd>
                            </div> */}
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500">
                                    First Name
                                </dt>
                                <dd className="mt-1 text-sm font-bold text-gray-900">
                                    {customerInfo.firstname}
                                </dd>
                            </div>
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500">Last Name</dt>
                                <dd className="mt-1 text-sm font-bold text-gray-900">
                                    {customerInfo.lastName}
                                </dd>
                            </div>
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500">Email</dt>
                                <dd className="mt-1 text-sm font-bold text-gray-900">
                                    {customerInfo.email}
                                </dd>
                            </div>
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500">Store Credit</dt>
                                <dd className="mt-1 text-sm font-bold text-gray-900">
                                    {CurrencySymbolByCode.USD} {availableCredit}
                                </dd>
                            </div>
                            {/* <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500">
                                    Company Name
                                </dt>
                                <dd className="mt-1 text-sm font-bold text-gray-900">
                                    {customerInfo.companyName}
                                </dd>
                            </div> */}
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500">Password</dt>
                                <div className="flex gap-2 justify-between">
                                    <dd className="mt-1 text-sm font-bold text-gray-900">
                                        ***********
                                    </dd>
                                    {/* {(permission?.isEdit || permission?.isDelete) && (
                                        <div>
                                            <button
                                                type="button"
                                                title=""
                                                className="inline-block text-indigo-500 text-sm cursor-pointer"
                                                aria-controls="basic-modal14"
                                                // onClick={() => SetShowResetPassword((prev) => !prev)}
                                                onClick={() => PasswordReset(customerInfo?.storeId, customerInfo?.email)}
                                            >
                                                Reset password
                                            </button>
                                        </div>
                                    )} */}
                                </div>
                            </div>

                            {/* <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500">
                                    Customer NAV ID
                                </dt>
                                <dd className="mt-1 text-sm font-bold text-gray-900">
                                    <input
                                        name={"navCustomerId"}
                                        type="text"
                                        min={0}
                                        max={30}
                                        value={NavCustomerId}
                                        className="shadow-md rounded-lg w-1/2 bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none mr-2"
                                        onChange={(e) => handleNavCustomerId(e.target.value)}
                                        step="1"
                                    />
                                    {(permission?.isEdit || permission?.isDelete) &&
                                        <button
                                            type="button"
                                            className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                                            onClick={() => handleOnSubmit(NavCustomerId, customerInfo)}
                                        >
                                            Save
                                        </button>
                                    }
                                    <button
                                        type="button"
                                        className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-2"
                                        onClick={() => RefreshFromNav(customerInfo)}
                                    >
                                        Refresh From Nav
                                    </button>
                                </dd>
                            </div> */}
                            <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500">Status</dt>
                                <dd className="mt-1 text-sm font-bold text-gray-900">
                                    {customerInfo.recStatus === "A" ? "Active" : "Inactive"}
                                </dd>
                            </div>
                            {/* <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500">
                                    Is Super User
                                </dt>
                                <dd className="mt-1 text-sm font-bold text-gray-900">
                                    <div className="flex items-center">
                                        <div className="w-16 relative">
                                            {customerInfo.isSuperuser === true ? "Yes" : "No"}
                                            <Toggle
                                                name="isSuperuser1"
                                                defaultValue={
                                                    customerInfo.isSuperuser
                                                        ? customerInfo.isSuperuser
                                                        : ""
                                                }
                                                id={"disable_isSuperAdmin"}
                                                disabled={true}
                                            />
                                        </div>
                                    </div>
                                </dd>
                            </div> */}
                            {/* <div className="sm:col-span-1">
                                <dt className="text-sm font-medium text-gray-500">
                                    {"Use Net (Only for DI store)"}
                                </dt>
                                <dd className="mt-1 text-sm font-bold text-gray-900">
                                    <div className="flex items-center">
                                        <div className="w-16 relative">
                                            {customerInfo.isUseNet === true ? "Yes" : "No"}
                                            <Toggle
                                                name="isUseNet"
                                                defaultValue={
                                                    customerInfo.isUseNet
                                                        ? customerInfo.isUseNet
                                                        : ""
                                                }
                                                id={"disable_isUseNet"}
                                                disabled={true}
                                            />
                                        </div>
                                    </div>
                                </dd>
                            </div> */}
                        </div>
                    </div>
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-4 mt-4 items-start">
                        <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-x-20 gap-y-4 col">
                            {/* Landing Page */}
                            <div className="flex items-center">
                                <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold w-3/5"> UnSubscribe From All Marketing Emails</label>
                                <div className="flex items-center">
                                    <div className="relative">
                                        <ToggleButton name="isUnSubscribeMarketingEmail" id="isUnSubscribeMarketingEmail" on="Yes" off="No" disabled={true} defaultValue={customerInfo?.isUnSubscribeMarketingEmail} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold w-3/5"> UnSubscribe From All SMS</label>
                                <div className="flex items-center">
                                    <div className="relative">
                                        <ToggleButton name="isUnSubscribeAllSms" id="isUnSubscribeAllSms" on="Yes" off="No" disabled={true} defaultValue={customerInfo?.isUnSubscribeAllSms} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold w-3/5"> Do Not share My Details any One</label>
                                <div className="flex items-center">
                                    <div className="relative">
                                        <ToggleButton name="isDoNotShareMyDetailsAnyOne" id="isDoNotShareMyDetailsAnyOne" on="Yes" off="No" disabled={true} defaultValue={customerInfo?.isDoNotShareMyDetailsAnyOne} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold w-3/5"> Emails about local events happening in our Nursery</label>
                                <div className="flex items-center">
                                    <div className="relative">
                                        <ToggleButton name="isEmailLocalEventsHappeningInNursey" id="isEmailLocalEventsHappeningInNursey" on="Yes" off="No" disabled={true} defaultValue={customerInfo?.isEmailLocalEventsHappeningInNursey} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Address
                    customerInfo={customerInfo}
                    setShippingAddressModal={setShippingAddressModal}
                    setBillingAddressModal={setBillingAddressModal}
                    getCustomerData={getCustomerData}
                    setEditAddressModalData={setEditAddressModalData}
                />
            </div>
            <AddressModal
                showAddressModal={showShippingAddressModal}
                setAddressModal={setShippingAddressModal}
                addressType={"S"}
                customerInfo={customerInfo}
                getCustomerData={getCustomerData}
                editAddressModalData={editAddressModalData}
                setEditAddressModalData={setEditAddressModalData}
            />
            <AddressModal
                showAddressModal={showBillingAddressModal}
                setAddressModal={setBillingAddressModal}
                addressType={"B"}
                customerInfo={customerInfo}
                getCustomerData={getCustomerData}
                editAddressModalData={editAddressModalData}
                setEditAddressModalData={setEditAddressModalData}
            />

            <ResetPasswordModal
                SetShowResetPassword={SetShowResetPassword}
                ShowResetPassword={ShowResetPassword}
                customerInfo={customerInfo}
            />
        </>
    );
};

export default PersonalDetails;
