/*Component Name: Create
Component Functional Details: User can create or update customer master details from here.
Created By: Happy
Created Date: 08/08/2022
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import React, { useState } from "react";
import { FieldArray, Form as FormikForm, Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import Input from "components/common/formComponent/Input";
import Checkbox from "components/common/formComponent/Checkbox";
import { RecStatusValuebyName, anniesAnnualData } from "global/Enum";
import Messages from "components/common/alerts/messages/Index";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { ValidationMsgs } from "global/ValidationMessages";
import { useDispatch, useSelector } from "react-redux";
import { serverError, TitleNameHelper } from "services/common/helper/Helper";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import CommonFields from "./CommonFields";
import CustomerService from "services/admin/customer/CustomerService";

const Create = () => {
    const permission = useSelector(store => store.permission);
    
    const GlobalLoading = useSelector((store) => store?.GlobalLoaderReducer?.toLoad);
    const [shippingSameBilling, setShippingSameBilling] = useState(false);
    const dispatch = useDispatch();
    const location = useSelector((store) => store?.location);

    const validationSchema = Yup.object({
        firstname: Yup.string().trim().required(ValidationMsgs.common.firstNameRequired),
        lastName: Yup.string().trim().required(ValidationMsgs.common.lastNameRequired),
        email: Yup.string().trim().email(ValidationMsgs.common.Email).required(ValidationMsgs.common.emailRequired),
        recStatus: Yup.string().trim().required(ValidationMsgs.common.recStatusRequired),
        password: Yup.string().trim().required(ValidationMsgs.customer.password).min(8, ValidationMsgs.profile.myAccount.newPasswordMin),
        confirm_password: Yup.string().trim().required(ValidationMsgs.customer.confirm_password).when("password", {
            is: (val) => (val && val.length > 0 ? true : false),
            then: Yup.string().trim().oneOf(
                [Yup.ref("password")],
                ValidationMsgs.customer.confirm_passwordMatches
            ),
        }),
        customerAddress: Yup.array().of(
            Yup.object().shape({
                address1: Yup.string().trim().when('addressType', (addressType, schema) => (addressType !== 'S' || !shippingSameBilling) ? Yup.string().trim().required(ValidationMsgs.common.addressRequired) : Yup.string().trim()),
                firstname: Yup.string().trim().when('addressType', (addressType, schema) => (addressType !== 'S' || !shippingSameBilling) ? Yup.string().trim().required(ValidationMsgs.common.firstNameRequired) : Yup.string().trim()),
                lastName: Yup.string().trim().when('addressType', (addressType, schema) => (addressType !== 'S' || !shippingSameBilling) ? Yup.string().trim().required(ValidationMsgs.common.lastNameRequired) : Yup.string().trim()),
                email: Yup.string().trim().when('addressType', (addressType, schema) => (addressType !== 'S' || !shippingSameBilling) ? Yup.string().trim().email(ValidationMsgs.common.Email).required(ValidationMsgs.user.emailRequired) : Yup.string().trim()),
                phone: Yup.string().trim().when('addressType', (addressType, schema) => (addressType !== 'S' || !shippingSameBilling) ? Yup.string().trim().required(ValidationMsgs.common.phoneRequired).test(
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
                ) : Yup.string().trim()),
                city: Yup.string().trim().when('addressType', (addressType, schema) => (addressType !== 'S' || !shippingSameBilling) ? Yup.string().trim().required(ValidationMsgs.common.cityRequired) : Yup.string().trim()),
                state: Yup.string().trim().when('addressType', (addressType, schema) => (addressType !== 'S' || !shippingSameBilling) ? Yup.string().trim().required(ValidationMsgs.common.stateRequired) : Yup.string().trim()),
                OtherState: Yup.string().trim().when('addressType', (addressType, schema) => (addressType !== 'S' || !shippingSameBilling) ? Yup.string().when("state", {
                    is: (val) => val === "Other" ? true : false,
                    then: Yup.string().trim().required(ValidationMsgs.common.stateRequired)
                }) : Yup.string().trim()),
                countryName: Yup.string().trim().when('addressType', (addressType, schema) => (addressType !== 'S' || !shippingSameBilling) ? Yup.string().trim().required(ValidationMsgs.common.countryRequired) : Yup.string().trim()),
                postalCode: Yup.string().trim().when('addressType', (addressType, schema) => (addressType !== 'S' || !shippingSameBilling) ? Yup.string().trim().required(ValidationMsgs.common.postalCodeRequired) : Yup.string().trim()),
                fax: Yup.string().trim().when('addressType', (addressType, schema) => (addressType !== 'S' || !shippingSameBilling) ? Yup.string().trim().nullable().max(15, ValidationMsgs.common.faxLength) : Yup.string().trim()),
                countryCode: Yup.string().trim().when('addressType', (addressType, schema) => (addressType !== 'S' || !shippingSameBilling) ? Yup.string().trim().nullable().max(3, ValidationMsgs.common.countryCodeLength) : Yup.string().trim())
            })
        )
    });

    const onSubmit = (fields, { resetForm }) => {
        dispatch(setAddLoading(true))

        CustomerService.createCustomer({
            customerModel: {
                ...fields,
                customerAddress: (shippingSameBilling ? [
                    { ...fields.customerAddress[0], state: fields?.customerAddress[0]?.OtherState ? fields?.customerAddress[0]?.OtherState : fields?.customerAddress[0]?.state },
                    { ...fields.customerAddress[0], state: fields?.customerAddress[0]?.OtherState ? fields?.customerAddress[0]?.OtherState : fields?.customerAddress[0]?.state, addressType: "S", }] :
                    [{ ...fields.customerAddress[0], state: fields?.customerAddress[0]?.OtherState ? fields?.customerAddress[0]?.OtherState : fields?.customerAddress[0]?.state },
                    { ...fields.customerAddress[1], state: fields?.customerAddress[1]?.OtherState ? fields?.customerAddress[1]?.OtherState : fields?.customerAddress[1]?.state }]),
                ...location
            }
        }).then((response) => {
            if (response.data.success && response.data.data) {
                dispatch(
                    setAlertMessage({
                        type: "success",
                        message: ValidationMsgs.customer.created,
                    })
                );
                resetForm({})
            } else {
                dispatch(
                    setAlertMessage({ type: "danger", message: serverError(response) })
                );
            }
            dispatch(setAddLoading(false))
        }).catch((errors) => {
            dispatch(
                setAlertMessage({ type: "danger", message: ValidationMsgs.customer.notCreated })
            );
            dispatch(setAddLoading(false))
        })
    }

    return (
        <>
            <title>{TitleNameHelper({ defaultTitleName: "Create Customer" })}</title>
            <Formik
                initialValues={{
                    id: 0,
                    storeId: anniesAnnualData.storeId,
                    firstname: "",
                    lastName: "",
                    email: "",
                    companyName: anniesAnnualData.storeName,
                    tierId: 0,
                    isRegistered: true,
                    sharedCustomerId: 0,
                    isLocked: false,
                    navCustomerId: "",
                    customerType: "credit",
                    isTaxableuser: false,
                    recStatus: RecStatusValuebyName.Active,
                    rowVersion: "",
                    password: '',
                    confirm_password: '',
                    // shippingSameBilling:  false,
                    customerAddress: [{
                        id: 0,
                        firstname: "",
                        lastName: "",
                        email: "",
                        address1: "",
                        address2: "",
                        suite: "",
                        city: "",
                        state: "",
                        postalCode: "",
                        fax: "",
                        phone: "",
                        countryName: "",
                        countryCode: "",
                        addressType: "B",
                        isDefault: true,
                        recStatus: RecStatusValuebyName.Active,
                        rowVersion: "",
                        OtherState: "",
                        ...location
                    },
                    {
                        id: 0,
                        firstname: "",
                        lastName: "",
                        email: "",
                        address1: "",
                        address2: "",
                        suite: "",
                        city: "",
                        state: "",
                        postalCode: "",
                        fax: "",
                        phone: "",
                        countryName: "",
                        countryCode: "",
                        addressType: "S",
                        isDefault: true,
                        recStatus: RecStatusValuebyName.Active,
                        rowVersion: "",
                        OtherState: "",
                        ...location

                    }]
                }}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
                validateOnMount={true}
            >
                {({ setFieldValue, errors, values, setValues }) => {
                    return (
                        <FormikForm>
                            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full">
                                <div className="flex mb-8 justify-between">
                                    <div className="flex items-center">
                                        <Link
                                            to={"/admin/Customer/customer"}
                                            className="btn border-neutral-200 hover:border-neutral-400 text-gray-500 hover:text-gray-700 flex items-center mr-2"
                                        >
                                            <span className="material-icons-outlined">west</span>
                                        </Link>
                                        <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
                                            {TitleNameHelper({ defaultTitleName: "Create Customer" })}
                                        </h1 >
                                    </div >
                                    {(permission?.isEdit || permission?.isDelete) && <div className="flex flex-wrap space-x-2">
                                        <Link
                                            className="btn bg-white border-neutral-200 text-gray-500 hover:text-gray-700"
                                            to={"/admin/Customer/customer"}
                                        >
                                            Cancel
                                        </Link>
                                        <button
                                            disabled={GlobalLoading}
                                            type="submit"
                                            className={`flex justify-center btn px-6 bg-indigo-500 hover:bg-indigo-600 text-white ${(GlobalLoading) ? "bg-indigo-200 hover:bg-indigo-200" : "cursor-pointer"}`}
                                        >
                                            <div className={`w-full flex justify-center align-middle `}>
                                                {GlobalLoading && (
                                                    <span className="spinner-border spinner-border-sm mr-2"></span>
                                                )}
                                                Save
                                            </div>
                                        </button>
                                    </div>}
                                </div >
                                <Messages />
                                <div className="w-full bg-white shadow-lg rounded-md border border-neutral-200 p-6 mb-6">
                                    <div className="block uppercase tracking-wide text-gray-500 text-lg font-bold mb-4"> {TitleNameHelper({ defaultTitleName: `Customer` })} Information </div>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div>
                                            {"First Name"}
                                            <span className="text-rose-500 text-2xl leading-none">*</span>
                                            <Input type="text" name="firstname" />
                                        </div>
                                        <div>
                                            {"Last Name"}
                                            <span className="text-rose-500 text-2xl leading-none">*</span>
                                            <Input type="text" name="lastName" />
                                        </div>
                                        <div>
                                            {"Email"}
                                            <span className="text-rose-500 text-2xl leading-none">*</span>
                                            <Input type="text" name="email" />
                                        </div>
                                        <div>
                                            {"Password"}
                                            <span className="text-rose-500 text-2xl leading-none">*</span>
                                            <Input type="password" name="password" />
                                        </div>
                                        <div>
                                            {"Re-enter Password"}
                                            <span className="text-rose-500 text-2xl leading-none">*</span>
                                            <Input type="password" name="confirm_password" />
                                        </div>
                                    </div>
                                </div>
                                <FieldArray
                                    name="customerAddress"
                                    render={(fieldArrayProps) => {
                                        const { form } = fieldArrayProps;
                                        return (
                                            <>
                                                {form.values.customerAddress.map((value, i) => {
                                                    return (
                                                        <div className="w-full bg-white shadow-lg rounded-md border border-neutral-200 p-6 mb-6" key={i}>
                                                            <div className="block uppercase tracking-wide text-gray-500 text-lg font-bold mb-4">{value.addressType === 'B' ? ' Billing Information' : 'Shipping Address'}  </div>
                                                            {value.addressType === 'S' && <div className="mb-4 flex items-center">
                                                                <label className={"flex items-center"}>
                                                                    <Checkbox
                                                                        name={"same_ship"}
                                                                        onChange={(e) => {
                                                                            setShippingSameBilling(e.target.checked);
                                                                        }}
                                                                        checked={shippingSameBilling}
                                                                        className={"form-checkbox ml-2"}
                                                                    />
                                                                    <span className={"text-sm font-medium"}>{"Shipping address same as Billing address"}</span>
                                                                </label>
                                                            </div>}
                                                            {(value.addressType !== 'S' || !shippingSameBilling) && <CommonFields
                                                                fieldArrayProps={fieldArrayProps}
                                                                key={i}
                                                                index={i}
                                                            />}
                                                        </div>
                                                    );
                                                })}
                                            </>
                                        )
                                    }}
                                />
                            </div >

                        </FormikForm >
                    );
                }}
            </Formik >
        </>
    );
};

export default Create;
