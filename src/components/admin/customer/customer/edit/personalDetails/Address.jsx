/*Component Name: Address
Component Functional Details:  Address .
Created By: PK Kher
Created Date: <Creation Date>
Modified By: Shrey Patel
Modified Date: 10/05/2023 */

import AddressTile from "components/admin/customer/customer/edit/personalDetails/AddressTile";
import ConfirmDelete from "components/common/modals/ConfirmDelete";
import { ValidationMsgs } from "global/ValidationMessages";
import React, { useState } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import CustomerService from "services/admin/customer/CustomerService";
import { serverError } from "services/common/helper/Helper";

const Address = ({
    customerInfo,
    setShippingAddressModal,
    setBillingAddressModal,
    getCustomerData,
    setEditAddressModalData,
}) => {
    const dispatch = useDispatch();
    const permission = useSelector((store) => store?.permission);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [DelAddressInfo, setDelAddressInfo] = useState({});

    const HandelAddressDel = (customerAddress) => {
        dispatch(setAddLoading(true));
        CustomerService.delCustomerBillingAndShippingAddress({
            addressId: [customerAddress.id],
            recStatus: customerAddress.recStatus,
        })
            .then((response) => {
                if (response.data.success) {
                    dispatch(
                        setAlertMessage({
                            type: "success",
                            message: ValidationMsgs.customer.customerAddressDeleted,
                        })
                    );
                    getCustomerData();
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
                        message: ValidationMsgs.customer.customerAddressNotDeleted,
                    })
                );
                dispatch(setAddLoading(false));
            });
        setOpenDeleteModal(false);
    };

    return (
        <>
            <div className="py-6">
                <div className="flex items-center justify-between mb-4 gap-2">
                    <div className="text-base font-bold">Shipping Address</div>
                    {(permission?.isEdit || permission?.isDelete) && (
                        <div className="relative">
                            <button
                                type="button"
                                title=""
                                className="inline-block text-indigo-500 text-sm cursor-pointer"
                                aria-controls="basic-modal14"
                                onClick={() => setShippingAddressModal((prev) => !prev)}
                            >
                                Add Shipping Address
                            </button>
                        </div>
                    )}
                </div>
                <div className="grid grid-cols-12 gap-6 mb-6">
                    {customerInfo?.customerAddress &&
                        customerInfo.customerAddress.map((address, index) => {
                            if (address.addressType === "S") {
                                return (
                                    <Fragment key={index}>
                                        <AddressTile
                                            details={address}
                                            key={index}
                                            customerId={customerInfo.id}
                                            getCustomerData={getCustomerData}
                                            setOpenDeleteModal={setOpenDeleteModal}
                                            setDelAddressInfo={setDelAddressInfo}
                                            setShippingAddressModal={setShippingAddressModal}
                                            setEditAddressModalData={setEditAddressModalData}
                                            customerInfo={customerInfo}
                                        />
                                    </Fragment>
                                );
                            } else {
                                return <Fragment key={index}></Fragment>
                            }
                        })}
                </div>
            </div>
            <div className="py-6">
                <div className="flex items-center justify-between mb-4 gap-2">
                    <div className="text-base font-bold">Billing Address</div>
                    {(permission?.isEdit || permission?.isDelete) && (
                        <div className="relative">
                            <button
                                type="button"
                                title=""
                                className="inline-block text-indigo-500 text-sm cursor-pointer"
                                aria-controls="basic-modal14"
                                onClick={() => setBillingAddressModal((prev) => !prev)}
                            >
                                Add Billing Address
                            </button>
                        </div>
                    )}
                </div>
                <div className="grid grid-cols-12 gap-6 mb-6">
                    {customerInfo?.customerAddress &&
                        customerInfo.customerAddress.map((address, index) => {
                            if (address.addressType === "B") {
                                return (
                                    <Fragment key={index}>
                                        <AddressTile
                                            details={address}
                                            key={index}
                                            customerId={customerInfo.id}
                                            getCustomerData={getCustomerData}
                                            setOpenDeleteModal={setOpenDeleteModal}
                                            setDelAddressInfo={setDelAddressInfo}
                                            setBillingAddressModal={setBillingAddressModal}
                                            setEditAddressModalData={setEditAddressModalData}
                                            customerInfo={customerInfo}
                                        />
                                    </Fragment>
                                );
                            } else {
                                return <Fragment key={index}></Fragment>
                            }
                        })}
                </div>
            </div>

            <ConfirmDelete
                handleDelete={HandelAddressDel}
                data={DelAddressInfo}
                message="Deleting this Address will permanently remove this record from your account. This can't be undone"
                openDeleteModal={openDeleteModal}
                setOpenDeleteModal={setOpenDeleteModal}
                title={"Delete"}
            />
        </>
    );
};

export default Address;
