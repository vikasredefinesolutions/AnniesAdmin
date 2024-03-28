/*Component Name: CompanyInfo
Component Functional Details: User can create or update CompanyInfo master details from here.
Created By: Happy
Created Date: 11/10/22
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import React, { useState, useEffect } from "react";
import { Formik, Form as FormikForm } from "formik";
import { RecStatusValuebyName } from "global/Enum";
import Input from "components/common/formComponent/Input";
import * as Yup from "yup"
import { ValidationMsgs } from "global/ValidationMessages";
import { useCallback } from "react";
import CompanyInformationServices from "services/admin/companyInformation/CompanyInformationServices";
import { useDispatch } from "react-redux";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { useSelector } from "react-redux";
import { serverError } from "services/common/helper/Helper";
import InputNumber from "components/common/formComponent/InputNumber";
import CountryService from "services/admin/country/CountryService";
import StateService from "services/admin/state/StateService";
import Dropdown from "components/common/formComponent/Dropdown";
import SaveButton from "components/common/formComponent/SaveButton";

const CompanyInfo = ({ orderDetails, setCustomerOrderModal, handleUserInfoFromNav }) => {
    const permission = useSelector(store => store?.permission);
    const dispatch = useDispatch();
    const location = useSelector(store => store.location);
    const [data, setData] = useState({});
    const [country, setCountry] = useState([]);
    const [state, setState] = useState([]);
    const [ShowOtherState, setShowOtherState] = useState(false);

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
    }, [])

    const getCompanyInformation = useCallback(() => {
        dispatch(setAddLoading(true));
        CompanyInformationServices.getCompanyById(orderDetails.companyId).then((response) => {
            if (response?.data?.success && response?.data?.data) {
                setData(response.data.data);
                if (response?.data?.data?.countryName) {
                    getState(response?.data?.data?.countryName);
                }
            }
            dispatch(setAddLoading(false));
        }).catch(() => {
            dispatch(setAddLoading(false));
        })
    }, [orderDetails]);
    useEffect(() => {
        if (orderDetails?.companyId) {
            getCompanyInformation();
        }
    }, [orderDetails]);

    const schema = Yup.object().shape({
        corporateName: Yup.string().trim().required(ValidationMsgs.common.corporateName),
        address1: Yup.string().trim().required(ValidationMsgs.company.address1),
        state: Yup.string().trim().required(ValidationMsgs.company.state),
        OtherState: Yup.string().when("state", {
            is: (val) => val === "Other" ? true : false,
            then: Yup.string().trim().required(ValidationMsgs.common.stateRequired)
        }),
        city: Yup.string().trim().required(ValidationMsgs.company.city),
        zipCode: Yup.string().trim().required(ValidationMsgs.company.postal_code),
        countryName: Yup.string().trim().required(ValidationMsgs.common.countryRequired),
        email: Yup.string().trim().email(ValidationMsgs.common.Email).required(ValidationMsgs.company.email),
        recStatus: Yup.string().trim().required(ValidationMsgs.common.recStatusRequired),
        phone: Yup.string().trim().required(ValidationMsgs.common.phoneRequired).test(
            'phone',
            ValidationMsgs.common.phoneMatches,
            (value, context) => {
                if (/^(\+\d{1,3}[- ]?)?\d{10}$/.test(value)) {
                    return true;
                } else if (/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value)) {
                    return true;
                }
                return false;
            },
        )/* .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, ValidationMsgs.common.phoneMatches) */,
    });
    const submitHandler = (values, { resetForm }) => {
        let StateValue = values.state !== "Other" ? values.state : values.OtherState

        dispatch(setAddLoading(true))
        CompanyInformationServices.updateCompanyInformation({
            companyInformationModel: { ...values, state: StateValue, ...location }
        })
            .then((response) => {
                if (response.data.success) {
                    dispatch(
                        setAlertMessage({
                            type: "success",
                            message: ValidationMsgs.company.updated,
                        })
                    );
                    getCompanyInformation();
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
                        message: ValidationMsgs.company.notUpdated,
                    })
                );
                dispatch(setAddLoading(false))
            });
    }

    return (
        <>
            <title>Company Information</title>

            <Formik
                enableReinitialize={true}
                initialValues={{
                    id: data?.id || 0,
                    companyId: data?.companyId || 0,
                    corporateName: data?.corporateName || "",
                    departmentName: data?.departmentName || "",
                    address1: data?.address1 || "",
                    address2: data?.address2 || "",
                    suite: data?.suite || '',
                    city: data?.city || '',
                    state: data?.state || 'Alabama',
                    zipCode: data?.zipCode || '',
                    countryName: data?.countryName || 'United States',
                    countryCode: data?.countryCode || '',
                    webSite: data?.webSite || '',
                    email: data?.email || '',
                    phone: data?.phone || '',
                    fax: data?.fax || '',
                    // tierId: data?.tierId || "",
                    recStatus: data?.recStatus || RecStatusValuebyName.Active,
                    rowVersion: data?.rowVersion || '',
                    isTaxEnable: data?.isTaxEnable || false,
                    OtherState: data?.state || "",
                }}
                onSubmit={submitHandler}
                validationSchema={schema}
                validateOnMount={true}
            >
                {({ errors, setFieldValue, values, resetForm }) => {
                    let StateOther = state.filter((item) => {
                        return item.value === values?.state
                    }).length <= 0

                    setShowOtherState(StateOther);
                    return (
                        <FormikForm>
                            <div className="p-6">
                                <div className="block uppercase tracking-wide text-gray-500 text-base font-bold mb-2">Company Info</div>

                                <div className="grid grid-cols-12 gap-6">
                                    <div className="col-span-12 md:col-span-6">
                                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name"> Name <span className="text-rose-500 text-2xl leading-none">*</span></label>
                                        <Input name={'corporateName'} className="block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md" type="text" placeholder="Name" maxLength='255' />
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">Department Name <span className="text-rose-500 text-2xl leading-none"></span></label>
                                        <Input name={'departmentName'} className="block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md" type="text" placeholder="Department Name" maxLength='255' />
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">Address 1 <span className="text-rose-500 text-2xl leading-none">*</span></label>
                                        <Input name={'address1'} className="block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md" type="text" placeholder="Address 01" maxLength='255' />
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">Address 2 <span className="text-rose-500 text-2xl leading-none"></span></label>
                                        <Input name={'address2'} className="block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md" type="text" placeholder="Address 02" maxLength='255' />
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">Apt/ Suite# <span className="text-rose-500 text-2xl leading-none"></span></label>
                                        <Input name={'suite'} className="block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md" type="text" placeholder="Apt/ Suite#" maxLength='255' />
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">City <span className="text-rose-500 text-2xl leading-none">*</span></label>
                                        <Input name={'city'} className="block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md" type="text" placeholder="City" maxLength='255' />
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">Country <span className="text-rose-500 text-2xl leading-none">*</span></label>
                                        {/* <Input name={'countryName'} className="block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md" type="text" placeholder="Country" maxLength='255' /> */}
                                        <Dropdown
                                            options={country}
                                            defaultValue={values.countryName}
                                            name={"countryName"}
                                            isClearable={false}
                                            onChange={(e) => {
                                                setFieldValue('countryName', (e ? e.value : ''));
                                                getState(e?.value);
                                                setFieldValue(`countryCode`, e ? e?.countryCode : '');
                                                setFieldValue(`state`, '');
                                            }}
                                        />
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">Country Code <span className="text-rose-500 text-2xl leading-none"></span></label>
                                        <Input name={'countryCode'}/*  disabled={true} */ className="block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md" type="text" placeholder="Country Code" maxLength='255' />
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">State <span className="text-rose-500 text-2xl leading-none">*</span></label>
                                        {/* <Input name={'state'} className="block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md" type="text" placeholder="State" maxLength='255' /> */}
                                        <Dropdown
                                            options={state}
                                            defaultValue={values.state}
                                            isClearable={false}
                                            name={"state"}
                                            onChange={(e) => {
                                                setFieldValue('state', (e ? e.value : ''));
                                            }}
                                        />
                                    </div>
                                    {(ShowOtherState /* && state.filter((item) => {
                                        console.log("abcd", item.value, data?.state, item.value === data?.state)
                                        return item.value === data?.state
                                    }).length <= 0 */) ?
                                        <>
                                            <div className="col-span-12 md:col-span-6">
                                                <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">Other State <span className="text-rose-500 text-2xl leading-none">*</span></label>
                                                <Input type="text" name={'OtherState'} maxLength={200}
                                                    defaultValue={values?.OtherState}
                                                    displayError={true}
                                                    // value={data?.state}
                                                    onChange={(e) => {
                                                        setFieldValue(`OtherState`, (e ? e.target.value : ""))
                                                    }} />
                                            </div>
                                        </> :
                                        values.state === "Other" ?
                                            <>
                                                <div className="col-span-12 md:col-span-6">
                                                    <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">Other State <span className="text-rose-500 text-2xl leading-none">*</span></label>
                                                    <Input type="text" name={'OtherState'} maxLength={200}
                                                        defaultValue={data?.state}
                                                        displayError={true}
                                                        onChange={(e) => {
                                                            setFieldValue(`OtherState`, (e ? e.target.value : ""))
                                                        }} />
                                                </div>
                                            </>
                                            : ""
                                    }
                                    <div className="col-span-12 md:col-span-6">
                                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">Postal Code <span className="text-rose-500 text-2xl leading-none">*</span></label>
                                        <InputNumber
                                            id="zipCode"
                                            value={values?.zipCode || ''}
                                            onChange={(e) => {
                                                setFieldValue('zipCode', e.target.value);
                                            }}
                                            displayError={true}
                                            name={'zipCode'} className="block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md" type="text" placeholder="Postal Code" maxLength='6' />
                                    </div>



                                    <div className="col-span-12 md:col-span-6">
                                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">Email <span className="text-rose-500 text-2xl leading-none">*</span></label>
                                        <Input name={'email'} className="block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md" type="email" placeholder="Email" maxLength='255' />
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">Phone<span className="text-rose-500 text-2xl leading-none">*</span></label>
                                        <InputNumber
                                            name={'phone'} className="block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md" type="text" placeholder="000-000-0000"
                                            maxLength={17}
                                            id="phone"
                                            value={values?.phone || ''}
                                            onChange={(e) => {
                                                setFieldValue('phone', e.target.value);
                                            }}
                                            displayError={true}
                                        />

                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">Fax</label>
                                        <Input name={'fax'} className="block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md" type="text" placeholder="000-000-0000" maxLength='255' />
                                    </div>
                                    {/* <div className="col-span-12 md:col-span-6">
                                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">Customer Tier </label>
                                        <Dropdown
                                            defaultValue={values.tierId}
                                            name={"tierId"}
                                            options={tier}
                                            onChange={(data) => {
                                                setFieldValue("tierId", data.value);
                                            }}
                                        />
                                    </div> */}
                                </div>

                            </div>
                            <div className="flex items-center justify-end p-6 space-x-2 border-t border-gray-200">
                                <button type="button" className="btn bg-white border-neutral-200 text-gray-500 hover:text-gray-700 cursor-pointer" onClick={() => {
                                    resetForm({}); setCustomerOrderModal({
                                        state: false,
                                        fromWhereItIsClicked: ""
                                    })
                                }}>Cancel</button>
                                {(permission?.isEdit || permission?.isDelete) &&
                                    <>
                                        {/* <button type="submit" className="btn bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer">Save</button> */}
                                        <SaveButton errors={errors} >Save</SaveButton>
                                        {/* <button type="button" className="btn bg-indigo-600 text-white" onClick={() => handleUserInfoFromNav(values.email, null, setState)}>Search From NAV</button> */}
                                        {/* <button type="button" disabled={true} className="btn bg-indigo-600 text-white disabled:bg-indigo-200">Create in NAV</button> */}
                                    </>
                                }
                            </div>
                        </FormikForm>
                    )
                }}
            </Formik>
        </>
    );
};

export default CompanyInfo;
