/*Component Name: Address
Component Functional Details:  Address .
Created By: PK Kher
Created Date: <Creation Date>
Modified By: PK Kher
Modified Date: <Modified Date> */

import React, { useEffect, useState } from 'react';
import Transition from 'utils/Transition';
import { Form as FormikForm, Formik } from "formik";
import { IndiaAndUSAMobileFormat, RecStatusValuebyName } from 'global/Enum';
import Input from 'components/common/formComponent/Input';
import { ValidationMsgs } from 'global/ValidationMessages';
import * as Yup from "yup";
import CustomerService from 'services/admin/customer/CustomerService';
import { useDispatch, useSelector } from 'react-redux';
import { setAlertMessage } from 'redux/alertMessage/AlertMessageReducers';
import { serverError } from 'services/common/helper/Helper';
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import StateService from 'services/admin/state/StateService';
import CountryService from 'services/admin/country/CountryService';
import Dropdown from 'components/common/formComponent/Dropdown';
import Messages from "components/common/alerts/messages/Index";

const AddressModal = ({ showAddressModal, setAddressModal, addressType, customerInfo, getCustomerData, editAddressModalData, setEditAddressModalData }) => {
    const dispatch = useDispatch();
    const location = useSelector(store => store.location);
    const GlobalLoading = useSelector((store) => store?.GlobalLoaderReducer?.toLoad);

    const onSubmit = (values, { resetForm }) => {
        let StateValue = values.state !== "Other" ? values.state : values.OtherState

        if (values.id !== 0) {
            dispatch(setAddLoading(true))
            CustomerService.updateAddress({
                customerAddressModel: { ...values, state: StateValue, ...location }
            }).then((response) => {
                if (response.data.success && response.data.data) {
                    dispatch(
                        setAlertMessage({
                            type: "success",
                            message: ValidationMsgs.customer.updateAddress,
                        })
                    );
                    setEditAddressModalData({});
                    getCustomerData();
                    setAddressModal(false);
                } else {
                    dispatch(
                        setAlertMessage({ type: "danger", message: serverError(response) })
                    );
                }
                resetForm({});
                dispatch(setAddLoading(false));
            }).catch((errors) => {
                dispatch(
                    setAlertMessage({ type: "danger", message: ValidationMsgs.customer.failToUpdateAddress })
                );
                dispatch(setAddLoading(false));
            })
        } else {
            dispatch(setAddLoading(true))
            CustomerService.createAddress({
                customerAddressModel: { ...values, state: StateValue, ...location }
            }).then((response) => {
                if (response.data.success && response.data.data) {
                    dispatch(
                        setAlertMessage({
                            type: "success",
                            message: ValidationMsgs.customer.addAddress,
                        })
                    );
                    getCustomerData();
                    setAddressModal(false);
                } else {
                    dispatch(
                        setAlertMessage({ type: "danger", message: serverError(response) })
                    );
                }
                resetForm({});
                dispatch(setAddLoading(false));
            }).catch((errors) => {
                dispatch(
                    setAlertMessage({ type: "danger", message: ValidationMsgs.customer.failToAddAddress })
                );
                dispatch(setAddLoading(false));
            })
        }
    }

    const [country, setCountry] = useState([]);
    const [state, setState] = useState([]);
    const getCountry = () => {
        CountryService.getCountryWithCode().then((response) => {
            if (response?.data?.success && response?.data?.data) {
                setCountry(() => {
                    return response?.data?.data?.map(value => {
                        return {
                            ...value,
                            label: value.name,
                            value: value.name,
                            countryCode: value.countryCode,
                        }
                    })
                });
            }
        }).catch(() => { });
    }

    const getState = (countryName) => {
        if (countryName) {
            StateService.getStateByCountryName(countryName).then((response) => {
                if (response?.data?.success && response?.data?.data) {
                    let StateData = response?.data?.data?.map(value => {
                        return {
                            label: value.label,
                            value: value.label,
                        }
                    })
                    setState([{
                        label: "Other",
                        value: "Other",
                    }, ...StateData]);
                }
            }).catch(() => { });
        } else {
            setState([]);
        }
    }
    useEffect(() => {
        getCountry();
    }, []);

    useEffect(() => {
        getState("United States");
    }, []);

    const getZipCodeCountryStateCity = (postalCode, setFieldValue) => {
        if (postalCode) {
            StateService.getLocationDataBasedOnZipCode(postalCode)
                .then((response) => {
                    if (response?.data?.success && response?.data?.data) {
                        const { cityName, countryId, countryName, stateName } = response?.data?.data;
                        getState(countryName);
                        if (cityName) {
                            setFieldValue(`city`, cityName)
                        }
                        if (countryName) {
                            setFieldValue(`countryName`, countryName)
                        }
                        if (countryName) {
                            setFieldValue(`state`, stateName)
                        }
                    }
                })
                .catch(() => { });
        }
    }

    const validationSchema = Yup.object({
        address1: Yup.string().trim().required(ValidationMsgs.common.addressRequired),
        firstname: Yup.string().trim().required(ValidationMsgs.common.firstNameRequired),
        lastName: Yup.string().trim().required(ValidationMsgs.common.lastNameRequired),
        email: Yup.string().trim().email(ValidationMsgs.common.Email).required(ValidationMsgs.user.emailRequired),
        phone: Yup.string().trim().required(ValidationMsgs.common.phoneRequired).test(
            'phone',
            ValidationMsgs.common.phoneMatches,
            (value, context) => {
                if (IndiaAndUSAMobileFormat.test(value)) {
                    return true;
                }
                return false;
            },
        )/* .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, ValidationMsgs.common.phoneMatches) */,
        city: Yup.string().trim().required(ValidationMsgs.common.cityRequired),
        state: Yup.string().trim().required(ValidationMsgs.common.stateRequired),
        OtherState: Yup.string().trim().when("state", {
            is: (val) => val === "Other" ? true : false,
            then: Yup.string().trim().required(ValidationMsgs.common.stateRequired)
        }),
        countryName: Yup.string().trim().required(ValidationMsgs.common.countryRequired),
        postalCode: Yup.string().trim().required(ValidationMsgs.common.postalCodeRequired).max(6, ValidationMsgs.common.postalCodeLength),
        fax: Yup.string().trim().nullable().max(15, ValidationMsgs.common.faxLength),
        countryCode: Yup.string().trim().nullable().max(3, ValidationMsgs.common.countryCodeLength)
    });
    return (
        <>
            <Transition
                className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"
                show={showAddressModal}
                tag="div"
                enter="transition ease-out duration-200 transform"
                enterStart="opacity-0 -translate-y-2"
                enterEnd="opacity-100 translate-y-0"
                leave="transition ease-out duration-200"
                leaveStart="opacity-100"
                leaveEnd="opacity-0"
                onClick={() => setAddressModal(false)}
            />
            <Transition
                className="fixed inset-0 z-50 overflow-hidden flex items-center my-4 justify-center transform px-4 sm:px-6"
                show={showAddressModal}
                tag="div"
                enter="transition ease-out duration-200 transform"
                enterStart="opacity-0 -translate-y-2"
                enterEnd="opacity-100 translate-y-0"
                leave="transition ease-out duration-200"
                leaveStart="opacity-100"
                leaveEnd="opacity-0"
            >
                <div className="bg-white rounded shadow-lg overflow-auto max-w-[560px] w-full max-h-full" >
                    <div className="px-5 py-3 border-b border-neutral-200">
                        <div className="flex justify-between items-center">
                            <div className="font-semibold text-gray-800">{addressType === 'S' ? 'Shipping Address' : 'Billing Address'}</div>
                            <button className="text-gray-400 hover:text-gray-500" onClick={() => { setAddressModal(prev => !prev); setEditAddressModalData({}) }}>
                                <div className="sr-only">Close</div>
                                <svg className="w-4 h-4 fill-current">
                                    <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z"> </path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            id: editAddressModalData?.id || 0,
                            customerId: customerInfo?.id || 0,
                            firstname: editAddressModalData?.firstname || "",
                            lastName: editAddressModalData?.lastName || "",
                            email: editAddressModalData?.email || "",
                            address1: editAddressModalData?.address1 || "",
                            address2: editAddressModalData?.address2 || "",
                            suite: editAddressModalData?.suite || "",
                            city: editAddressModalData?.city || "",
                            state: editAddressModalData?.state || "Alabama",
                            postalCode: editAddressModalData?.postalCode || "",
                            fax: editAddressModalData?.fax || "",
                            phone: editAddressModalData?.phone || "",
                            countryName: editAddressModalData?.countryName || "United States",
                            countryCode: editAddressModalData?.countryCode || "",
                            addressType: addressType,
                            isDefault: false,
                            recStatus: RecStatusValuebyName.Active,
                            rowVersion: editAddressModalData?.rowVersion || "",
                        }}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                    >
                        {({ setFieldValue, errors, values, resetForm }) => {
                            return (
                                <FormikForm>
                                    <Messages />
                                    <div className="px-5 pt-4 pb-1">
                                        <div className="text-sm flex flex-wrap justify-start text-left -mx-4">
                                            <div className="w-full p-4">
                                                <div className="grid grid-cols-12 gap-6">
                                                    <div className="col-span-12 md:col-span-6">
                                                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">First Name<span className="text-rose-500 text-2xl leading-none">*</span></label>
                                                        <Input type="text" name={'firstname'} placeholder="First Name" />
                                                    </div>
                                                    <div className="col-span-12 md:col-span-6">
                                                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">Last Name<span className="text-rose-500 text-2xl leading-none">*</span></label>
                                                        <Input type="text" name={'lastName'} placeholder="Last Name" />
                                                    </div>
                                                    <div className="col-span-12 md:col-span-6">
                                                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">Email<span className="text-rose-500 text-2xl leading-none">*</span></label>
                                                        <Input type="email" name={'email'} placeholder="Email" />
                                                    </div>
                                                    <div className="col-span-12 md:col-span-6">
                                                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">Phone<span className="text-rose-500 text-2xl leading-none">*</span></label>
                                                        <Input type="text" name={'phone'} placeholder="000-000-0000" maxLength={17} />
                                                    </div>
                                                    <div className="col-span-12 md:col-span-6">
                                                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">Address 1 <span className="text-rose-500 text-2xl leading-none">*</span></label>
                                                        <Input name={'address1'} type="text" placeholder="Address 01" />
                                                    </div>
                                                    <div className="col-span-12 md:col-span-6">
                                                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">Address 2</label>
                                                        <Input type="text" name={'address2'} placeholder="Address 02" />
                                                    </div>
                                                    <div className="col-span-12 md:col-span-6">
                                                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">City <span className="text-rose-500 text-2xl leading-none">*</span></label>
                                                        <Input type="text" name={'city'} placeholder="City" />
                                                    </div>
                                                    <div className="col-span-12 md:col-span-6">
                                                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">Country <span className="text-rose-500 text-2xl leading-none">*</span></label>
                                                        <Dropdown
                                                            options={country}
                                                            defaultValue={values?.countryName || ''}
                                                            name={`countryName`}
                                                            isClearable={false}
                                                            onChange={(e) => {
                                                                setFieldValue(`countryName`, (e ? e.value : ''));
                                                                setFieldValue(`countryCode`, e ? e?.countryCode : '');
                                                                getState(e?.value);
                                                                setFieldValue(`state`, '');
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="col-span-12 md:col-span-6">
                                                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">Postal Code <span className="text-rose-500 text-2xl leading-none">*</span></label>
                                                        <Input type="text" name={'postalCode'} placeholder="Postal Code" maxLength={6}
                                                            onChange={(e) => {
                                                                setFieldValue(`postalCode`, (e ? e.target.value : ''));
                                                                getZipCodeCountryStateCity(e.target.value, setFieldValue);
                                                            }} />
                                                    </div>
                                                    <div className="col-span-12 md:col-span-6">
                                                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">State <span className="text-rose-500 text-2xl leading-none">*</span></label>
                                                        <Dropdown
                                                            options={state}
                                                            defaultValue={values?.state || ''}
                                                            name={`state`}
                                                            isClearable={false}
                                                            onChange={(e) => {
                                                                setFieldValue(`state`, (e ? e.value : ''))
                                                            }}
                                                        />
                                                    </div>
                                                    {(values.state === "Other" || editAddressModalData?.isOtherState === true) &&
                                                        <>
                                                            <div className="col-span-12 md:col-span-6"></div>
                                                            <div className="col-span-12 md:col-span-6">
                                                                <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">Other State <span className="text-rose-500 text-2xl leading-none">*</span></label>
                                                                <Input type="text" name={'OtherState'} maxLength={200}
                                                                    defaultValue={editAddressModalData?.state}
                                                                    onChange={(e) => {
                                                                        setFieldValue(`OtherState`, (e ? e.target.value : ''))
                                                                    }} />
                                                            </div>
                                                        </>
                                                    }
                                                    <div className="col-span-12 md:col-span-6">
                                                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name" >Country Code</label>
                                                        <Input type="text" name={'countryCode'} placeholder="Country Code" maxLength={3} />
                                                    </div>
                                                    <div className="col-span-12 md:col-span-6">
                                                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">Apt/ Suite#</label>
                                                        <Input name={'suite'} type="text" placeholder="Apt/ Suite#" />
                                                    </div>
                                                    <div className="col-span-12 md:col-span-6">
                                                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">Fax</label>
                                                        <Input type="text" name={'fax'} placeholder="000-000-0000" maxLength={15} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-5 py-4">
                                        <div className="flex flex-wrap justify-end space-x-2">
                                            <button
                                                disabled={GlobalLoading}
                                                className={`flex justify-center btn px-6 bg-indigo-500 hover:bg-indigo-600 text-white ${(GlobalLoading) ? "bg-indigo-200 hover:bg-indigo-200" : "cursor-pointer"}`}                                            >
                                                <div className={`w-full flex justify-center align-middle `}>
                                                    {GlobalLoading && (
                                                        <span className="spinner-border spinner-border-sm mr-2"></span>
                                                    )}
                                                    Save
                                                </div>
                                            </button>
                                            <button type='button' className="btn bg-white border-neutral-200 text-gray-500 hover:text-gray-700" onClick={() => { setAddressModal(prev => !prev); resetForm(); setEditAddressModalData({}); }}>Cancel</button>
                                        </div>
                                    </div >
                                </FormikForm>
                            )
                        }}
                    </Formik>
                </div >
            </Transition >
        </>
    );
};

export default AddressModal;
