/*Component Name: PersonalInformation
Component Functional Details: User can create or update PersonalInformation master details from here.
Created By: Happy
Created Date: 11/10/22
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import React, { useState, useEffect, useCallback } from "react";
import { Form as FormikForm, Formik } from "formik";
import * as Yup from "yup";
import Input from "components/common/formComponent/Input";
import Checkbox from "components/common/formComponent/Checkbox";
import { RecStatusValuebyName, anniesAnnualData } from "global/Enum";
import CommonFields from "./CommonFields";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { ValidationMsgs } from "global/ValidationMessages";
import { useDispatch, useSelector } from "react-redux";
import CustomerService from "services/admin/customer/CustomerService";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import OrderService from "services/admin/order/OrderService";
import { serverError } from "services/common/helper/Helper";
import SaveButton from "components/common/formComponent/SaveButton";

const PersonalInformation = ({ orderDetails, setCustomerOrderModal, CustomerOrderModal, customerData, setOpenBasicModal, handleUserInfoFromNav }) => {
    const dispatch = useDispatch();

    const permission = useSelector(store => store?.permission);
    const location = useSelector((store) => store?.location);

    const [data, setData] = useState(customerData);
    const [shippingSameBilling, setShippingSameBilling] = useState(false);
    const [address, setAddress] = useState({ billing: {}, shipping: {} });


    const getAddress = useCallback((addressType) => {
        OrderService.getOrderAddress({
            orderId: orderDetails.orderNumber,
            addressType: addressType
        }).then((response) => {
            if (response?.data?.success && response?.data?.data) {
                setAddress((prev) => ({ ...prev, [(addressType === 'S' ? 'shipping' : 'billing')]: (response?.data?.data || {}) }));
            } else {
                dispatch(setAlertMessage({ message: ValidationMsgs.customer.addressNotFound, type: 'danger' }));
            }
        }).catch((error) => {
            dispatch(setAlertMessage({ message: ValidationMsgs.customer.addressNotFound, type: 'danger' }));
        });;
    }, [orderDetails]);


    const validationSchema = Yup.object({
        firstname: Yup.string().trim().required(ValidationMsgs.common.firstNameRequired),
        lastName: Yup.string().trim().required(ValidationMsgs.common.lastNameRequired),
        email: Yup.string().trim().email(ValidationMsgs.common.Email).required(ValidationMsgs.user.emailRequired),
        // storeId: Yup.string().trim().required(ValidationMsgs.common.storeIdRequired),
        billing: Yup.object({
            firstName: Yup.string().trim().required(ValidationMsgs.common.firstNameRequired),
            lastName: Yup.string().trim().required(ValidationMsgs.common.lastNameRequired),
            // company: Yup.string().trim().required(ValidationMsgs.customer.companyNameRequired),
            address1: Yup.string().trim().required(ValidationMsgs.common.addressRequired),
            email: Yup.string().trim().email(ValidationMsgs.common.Email).required(ValidationMsgs.user.emailRequired),
            phone: Yup.string().trim().required(ValidationMsgs.common.phoneRequired).test(
                'phone',
                ValidationMsgs.common.phoneMatches,
                (value, context) => {
                    if (/^(\+\d{1,3}[- ]?)?\d{10}$/.test(value)) {
                        return true;
                    } else if (/^\(?([0-9ujh]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value)) {
                        return true;
                    }
                    return false;
                },
            )/* .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, ValidationMsgs.common.phoneMatches) */,
            city: Yup.string().trim().required(ValidationMsgs.common.cityRequired),
            state: Yup.string().trim().required(ValidationMsgs.common.stateRequired),
            OtherState: Yup.string().when("state", {
                is: (val) => val === "Other" ? true : false,
                then: Yup.string().trim().required(ValidationMsgs.common.stateRequired)
            }),
            country: Yup.string().trim().required(ValidationMsgs.common.countryRequired),
            zipCode: Yup.string().trim().required(ValidationMsgs.common.postalCodeRequired),
            fax: Yup.string().trim().nullable().max(255, ValidationMsgs.common.faxLength),
            countryCode: Yup.string().trim().nullable().max(3, ValidationMsgs.common.countryCodeLength)
        }),
        shipping: Yup.object({
            firstName: Yup.string().trim().when('addressType', (addressType, schema) => (!shippingSameBilling) ? Yup.string().trim().required(ValidationMsgs.common.firstNameRequired) : Yup.string().trim()),
            lastName: Yup.string().trim().when('addressType', (addressType, schema) => (!shippingSameBilling) ? Yup.string().trim().required(ValidationMsgs.common.lastNameRequired) : Yup.string().trim()),
            email: Yup.string().trim().when('addressType', (addressType, schema) => (!shippingSameBilling) ? Yup.string().trim().email(ValidationMsgs.common.Email).required(ValidationMsgs.user.emailRequired) : Yup.string().trim()),
            // company: Yup.string().trim().required(ValidationMsgs.customer.companyNameRequired),
            // company: Yup.string().trim().when('addressType', (addressType, schema) => (!shippingSameBilling) ? Yup.string().trim().required(ValidationMsgs.customer.companyNameRequired) : Yup.string().trim()),
            address1: Yup.string().trim().when('addressType', (addressType, schema) => (!shippingSameBilling) ? Yup.string().trim().required(ValidationMsgs.common.addressRequired) : Yup.string().trim()),
            phone: Yup.string().trim().when('addressType', (addressType, schema) => (!shippingSameBilling) ? Yup.string().trim().required(ValidationMsgs.common.phoneRequired)/* .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, ValidationMsgs.common.phoneMatches) */ : Yup.string().trim()),
            city: Yup.string().trim().when('addressType', (addressType, schema) => (!shippingSameBilling) ? Yup.string().trim().required(ValidationMsgs.common.cityRequired) : Yup.string().trim()),
            OtherState: Yup.string().trim().when('addressType', (addressType, schema) => (!shippingSameBilling) ? Yup.string().when("state", {
                is: (val) => val === "Other" ? true : false,
                then: Yup.string().trim().required(ValidationMsgs.common.stateRequired)
            }) : Yup.string().trim()),
            state: Yup.string().trim().when('addressType', (addressType, schema) => (!shippingSameBilling) ? Yup.string().trim().required(ValidationMsgs.common.stateRequired) : Yup.string().trim()),
            country: Yup.string().trim().when('addressType', (addressType, schema) => (!shippingSameBilling) ? Yup.string().trim().required(ValidationMsgs.common.countryRequired) : Yup.string().trim()),
            zipCode: Yup.string().trim().when('addressType', (addressType, schema) => (!shippingSameBilling) ? Yup.string().trim().required(ValidationMsgs.common.postalCodeRequired) : Yup.string().trim()),
            fax: Yup.string().trim().when('addressType', (addressType, schema) => (!shippingSameBilling) ? Yup.string().trim().nullable().max(15, ValidationMsgs.common.faxLength) : Yup.string().trim()),
            countryCode: Yup.string().trim().when('addressType', (addressType, schema) => (!shippingSameBilling) ? Yup.string().trim().nullable().max(3, ValidationMsgs.common.countryCodeLength) : Yup.string().trim())
        })
    });

    const onSubmit = async (values, { resetForm }) => {
        updateCustomerInfo({ ...values, customerAddress: undefined });
    }

    const updateCustomerInfo = (values) => {
        dispatch(setAddLoading(true));


        if (shippingSameBilling) {
            values.shipping = { ...values.billing }
        }

        CustomerService.updateCustomer({
            customerModel: { ...values, ...location }
        }).then((response) => {
            if (response.data.success) {
                dispatch(
                    setAlertMessage({
                        type: "success",
                        message: ValidationMsgs.customer.updated,
                    })
                );
                updateBillingAddress(values);
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
                    message: ValidationMsgs.customer.notUpdated,
                })
            );
            dispatch(setAddLoading(false));
        });
    }

    const updateBillingAddress = (values) => {
        let StateValue = values?.billing?.state !== "Other" ? values?.billing?.state : values?.billing?.OtherState
        dispatch(setAddLoading(true));
        OrderService.updateAddress({ ...values.billing, state: StateValue, ...location }).then((response) => {
            if (response.data.success && response.data.data) {
                getAddress('B');
                updateShippingAddress((shippingSameBilling ? { ...values.billing, addressType: 'S' } : values.shipping))
            } else {
                dispatch(setAlertMessage({
                    type: "danger",
                    message: serverError(response)
                }));
            }
            dispatch(setAddLoading(false));
        }).catch((error) => {
            dispatch(setAddLoading(false));
        })
    }

    const updateShippingAddress = (values) => {
        let StateValue = values?.state !== "Other" ? values?.state : values?.OtherState
        dispatch(setAddLoading(true));
        OrderService.updateAddress({ ...values, state: StateValue, ...location }).then((response) => {
            if (response.data.success && response.data.data) {
                getAddress('S');
            } else {
                dispatch(setAlertMessage({
                    type: "danger",
                    message: serverError(response)
                }));
            }
            dispatch(setAddLoading(false));
        }).catch((error) => {
            dispatch(setAddLoading(false));
        })
    }

    const resetPassword = () => {

        // setCustomerOrderModal({
        //     state: false,
        //     fromWhereItIsClicked: "",
        //     currenttab: 0
        // });

        setOpenBasicModal(true)

    }

    // const handleUserInfoFromNav = (email) => {
    //     if (email) {
    //         dispatch(setAddLoading(true));
    //         StoreCustomerService.getCustomerNavDataFromNav(email).then((response) => {
    //             if (response.data.data) {
    //                 const { navCustomerId, navFirstname, navLastname, navAddress1, navAddress_2, navCity, navContact, navPostCode, navCountryRegionCode, navShiptoCode, navLocationCode, navCurrencyCode, navSalespersonCode, navLastModifiedDateTime, navShippingAgentCode, navEmail, navModificationDate } = response.data.data

    //                 setData((prevData) => ({
    //                     ...prevData,
    //                     firstname: navFirstname,
    //                     lastName: navLastname,
    //                     navCustomerId: navCustomerId
    //                 }))
    //                 setAddress((prevData) => ({
    //                     ...prevData,
    //                     billing: {
    //                         // ...prevData.billing,
    //                         firstName: navFirstname,
    //                         lastName: navLastname,
    //                         name: `${navFirstname} ${navLastname}`,
    //                         email: navEmail,
    //                         address1: navAddress1,
    //                         address2: navAddress_2,
    //                         city: navCity,
    //                         zipCode: navPostCode,
    //                         phone: navContact,
    //                         countryCode: navCountryRegionCode,
    //                         stateCode: navShiptoCode,
    //                     }
    //                 }))
    //             }
    //             dispatch(setAddLoading(false));
    //         }).catch(() => {
    //             dispatch(setAddLoading(false));
    //         })
    //     }

    // }

    useEffect(() => {
        setData(customerData);
    }, [customerData]);

    useEffect(() => {
        if (orderDetails?.customerId) {
            getAddress('S');
            getAddress('B');
        }
    }, [orderDetails]);

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    id: data?.id || 0,
                    storeId: data?.storeId || anniesAnnualData.storeId,
                    firstname: data?.firstname || "",
                    lastName: data?.lastName || "",
                    email: data?.email || "",
                    companyName: data?.companyName || "",
                    tierId: data?.tierId || 0,
                    isRegistered: true,
                    sharedCustomerId: 0,
                    isLocked: false,
                    navCustomerId: "",
                    customerType: "credit",
                    isTaxableuser: false,
                    recStatus: RecStatusValuebyName.Active,
                    rowVersion: data?.rowVersion || "",
                    billing: {
                        // ...address.billing,
                        firstName: address?.billing?.firstName || "",
                        lastName: address?.billing?.lastName || "",
                        name: address?.billing?.name || "",
                        email: address?.billing?.email || "",
                        address1: address?.billing?.address1 || "",
                        address2: address?.billing?.address2 || "",
                        city: address?.billing?.city || "",
                        state: address?.billing?.state || "Alabama",
                        country: address?.billing?.country || "United States",
                        zipCode: address?.billing?.zipCode || "",
                        company: anniesAnnualData.storeName,
                        suite: address?.billing?.suite || "",
                        phone: address?.billing?.phone || "",
                        fax: address?.billing?.fax || "",
                        countryCode: address?.billing?.countryCode || "",
                        stateCode: address?.billing?.stateCode || "",
                        addressType: address?.billing?.addressType || "B",
                        ...location,
                        orderId: orderDetails?.orderNumber,
                        OtherState: address?.billing?.state || "",
                    },
                    shipping: {
                        firstName: address?.shipping?.firstName || "",
                        lastName: address?.shipping?.lastName || "",
                        name: address?.shipping?.name || "",
                        email: address?.shipping?.email || "",
                        address1: address?.shipping?.address1 || "",
                        address2: address?.shipping?.address2 || "",
                        city: address?.shipping?.city || "",
                        state: address?.shipping?.state || "Alabama",
                        country: address?.shipping?.country || "United States",
                        zipCode: address?.shipping?.zipCode || "",
                        company: anniesAnnualData.storeName,
                        suite: address?.shipping?.suite || "",
                        phone: address?.shipping?.phone || "",
                        fax: address?.shipping?.fax || "",
                        countryCode: address?.shipping?.countryCode || "",
                        stateCode: address?.shipping?.stateCode || "",
                        addressType: address?.shipping?.addressType || "S",
                        ...location,
                        orderId: orderDetails?.orderNumber,
                        OtherState: address?.shipping?.state || "",
                    },
                }}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
                validateOnMount={true}
            >
                {({ setFieldValue, errors, values, setValues, resetForm }) => {
                    return (
                        <FormikForm>
                            <div className="w-full">
                                <div className="p-6 border-b-2 border-slate-200 last:border-b-0">
                                    <div className="block uppercase tracking-wide text-gray-500 text-base font-bold mb-2">Security Info</div>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div className="block uppercase tracking-wide text-gray-500 text-xs  mb-2">
                                            <div className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                                                {"Email"}
                                                <span className="text-rose-500 text-lg leading-none">*</span>
                                            </div>
                                            <Input type="text" name="email" />
                                        </div>
                                        <div className="block uppercase tracking-wide text-gray-500 text-xs  mb-2">
                                            <div className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                                                {"First Name"}
                                                <span className="text-rose-500 text-lg leading-none">
                                                    *
                                                </span>
                                            </div>
                                            <Input type="text" name="firstname" />
                                        </div>
                                        <div className="block uppercase tracking-wide text-gray-500 text-xs  mb-2">
                                            <div className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                                                {"Last Name"}
                                                <span className="text-rose-500 text-lg leading-none">
                                                    *
                                                </span>
                                            </div>

                                            <Input type="text" name="lastName" />
                                        </div>
                                        {/* <div className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                                            {"Password"}
                                            <span className="text-rose-500 text-lg leading-none">
                                                *
                                            </span>
                                            <Input type="password" name="password" />
                                        </div> */}
                                    </div>
                                    {(permission?.isEdit || permission?.isDelete) && <div className=""><span className="text-sm text-indigo-500 cursor-pointer" onClick={resetPassword}>Reset password</span></div>}
                                </div>
                                {/* //billing */}
                                <div className="p-6 border-b-2 border-slate-200 last:border-b-0" >
                                    <div className="flex items-center justify-between gap-2 mb-2">
                                        <div className="block uppercase tracking-wide text-gray-500 text-base font-bold">Billing Info</div>

                                    </div>
                                    <CommonFields
                                        addressType={'billing'}
                                        values={values.billing}
                                    />
                                </div>
                                {/* shipping */}
                                <div className="p-6 border-b-2 border-slate-200 last:border-b-0" >
                                    <div className="flex items-center justify-between gap-2 mb-2">
                                        <div className="block uppercase tracking-wide text-gray-500 text-base font-bold">{'Shipping Info'} </div>
                                        <div className="flex items-center gap-1">
                                            <label className={"flex items-center"}>
                                                <Checkbox
                                                    name={"same_ship"}
                                                    onChange={(e) => {
                                                        setShippingSameBilling(e.target.checked);
                                                    }}
                                                    checked={shippingSameBilling}
                                                    className={"form-checkbox ml-2"}
                                                />
                                                <span className={"text-sm font-medium"}>{"Same as billing address"}</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className={shippingSameBilling ? 'hidden' : ''}>
                                        <CommonFields
                                            addressType={'shipping'}
                                            values={values.shipping}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-end pt-2 pb-5 pr-3 space-x-2 border-t border-gray-200 sticky bottom-0 bg-white">
                                <button data-modal-toggle="customerModal" type="button" className="btn bg-white border-neutral-200 text-gray-500 hover:text-gray-700" onClick={() => {
                                    resetForm();
                                    setCustomerOrderModal({
                                        state: false,
                                        fromWhereItIsClicked: "",
                                        currenttab: 0
                                    });
                                }}>Cancel</button>
                                {(permission?.isEdit || permission?.isDelete) && <>
                                    <SaveButton errors={errors} >Save</SaveButton>
                                    {/* <button type="button" className="btn bg-indigo-600 text-white" onClick={() => handleUserInfoFromNav(values.email, setData, setAddress)}>Search From NAV</button> */}
                                    {/* <button type="button" disabled={true} className="btn bg-indigo-600 text-white disabled:bg-indigo-200">Create in NAV</button> */}
                                </>}
                            </div>
                        </FormikForm>
                    );
                }}
            </Formik>
        </>
    );
};

export default PersonalInformation;
