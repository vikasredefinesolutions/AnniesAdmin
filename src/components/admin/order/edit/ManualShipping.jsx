/*Component Name: ManualShipping
Component Functional Details: User can create or update ManualShipping master details from here.
Created By: chandan
Created Date: <Creation Date>
Modified By: chandan
Modified Date: <Modified Date> */

import React, { useEffect, useCallback, useState, Fragment } from "react";
import { Form as FormikForm, Formik, FieldArray } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { CurrencySymbolByCode } from "global/Enum";

import { ValidationMsgs } from 'global/ValidationMessages';
import { setAddLoading } from 'redux/globalLoader/GlobalLoaderAction';
import { setAlertMessage } from 'redux/alertMessage/AlertMessageReducers';
import { serverError, DateTimeFormat } from 'services/common/helper/Helper';

import Image from "components/common/formComponent/Image";
import Input from 'components/common/formComponent/Input';
import Dropdown from 'components/common/formComponent/Dropdown';
import DatePicker from 'components/common/formComponent/DatePicker';
import Textarea from 'components/common/formComponent/Textarea';

import OrderServices from "services/admin/order/OrderService"

const ManualShipping = ({ ManualShipping, setManualShipping, handleConfirmation, data, title, shippingOptions, orderDetail, ProductData, id }) => {
    const permission = useSelector(store => store.permission);
    const dispatch = useDispatch();
    const location = useSelector((store) => store?.location);
    const [oldManualOrderShippingData, setoldManualOrderShippingData] = useState(ProductData)
    // const [ManualOrderShippingData, setManualOrderShippingData] = useState([])
    const [EditManualShipping, setEditManualShipping] = useState(-1)

    const onSubmit = (values, { resetForm, setFieldValue }) => {
        // console.log("values, setFieldValue, { resetForm } ", values, setFieldValue, resetForm);
        CreateManualShippingForItems(values, resetForm, setFieldValue)
    }

    useEffect(() => {
        setoldManualOrderShippingData([...ProductData])
    }, [ProductData]);

    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!ManualShipping || keyCode !== 27) return;
            setManualShipping(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });

    // const confirmation = () => {
    //     if (handleConfirmation instanceof Function) {
    //         handleConfirmation(data);
    //     } else {
    //         setManualShipping(false);
    //     }
    // };


    const GetOrderedItems = useCallback(() => {
        dispatch(setAddLoading(true));
        OrderServices.GetOrderedShoppingCartItems(id).then((response) => {
            if (response?.data?.success && response?.data?.data) {
                // setManualOrderShippingData(response.data.data)
                const myNewData = response?.data?.data

                const findMyObj = (id) => {
                    return myNewData.find((myObj) => myObj.orderShoppingCartItemsId === id)
                }

                const someArray = []

                setoldManualOrderShippingData((prevData) => {
                    prevData.map((data) => {
                        data["manualShip"] = findMyObj(data.orderShoppingCartItemsId) || {}
                        someArray.push(data)
                    })

                    return someArray
                })

                // dispatch(setAlertMessage({
                //     message: ValidationMsgs.order.navSync,
                //     type: 'danger'
                // }));
            } else {
                // dispatch(setAlertMessage({
                //     message: serverError(response),
                //     type: 'danger'
                // }))
            }
            dispatch(setAddLoading(false));
        }).catch(() => {
            // dispatch(setAlertMessage({
            //     message: ValidationMsgs.order.navNotSync,
            //     type: 'danger'
            // }));
            dispatch(setAddLoading(false));
        })
    }, []);

    const CreateManualShippingForItems = useCallback((values, resetForm, setFieldValue) => {
        const params = []

        values.Products.map((allData) => {
            const manualShipData = allData?.manualShip

            // console.log("allData ", allData);

            if (manualShipData) {
                params.push({
                    "id": manualShipData.id ? manualShipData.id : 0,
                    ...location,
                    "rowVersion": allData.rowVersion,
                    "orderShoppingCartItemsId": allData.orderShoppingCartItemsId,
                    "orderId": id,
                    "productId": allData.productId,
                    "trackingNumber": manualShipData.trackingNumber || "###########",
                    "shippedVia": manualShipData.shippedVia || 0,
                    "shippedOn": manualShipData.shippedOn || new Date(),
                    "shippedQty": manualShipData.shippedQty || 0,
                    "shippedNote": manualShipData.shippedNote || "",
                    "shipped": true,
                })
            }
        })

        // console.log("paramsparams params", params, oldManualOrderShippingData, ProductData);


        if (params.length > 0) {

            dispatch(setAddLoading(true));
            OrderServices.CreateManualShippingForItems({
                "orderedShippedItemsModel": [...params],
                "isEmailSend": values.isEmailSend
            }).then((response) => {
                if (response?.data?.success) {
                    dispatch(setAlertMessage({
                        message: ValidationMsgs.order.shippingDetailsSaved,
                        type: 'success'
                    }));
                } else {
                    if (response?.data?.errors) {
                        dispatch(setAlertMessage({
                            message: serverError(response),
                            type: 'danger'
                        }))
                    } else {
                        dispatch(setAlertMessage({
                            message: ValidationMsgs.order.shippingDetailsNotSaved,
                            type: 'danger'
                        }));
                    }
                }
                dispatch(setAddLoading(false));
                setManualShipping(false);
                resetForm({})
                handleCancel(setFieldValue)
            }).catch(() => {
                dispatch(setAlertMessage({
                    message: ValidationMsgs.order.shippingDetailsNotSaved,
                    type: 'danger'
                }));
                dispatch(setAddLoading(false));
                setManualShipping(false);
                resetForm({})
                handleCancel(setFieldValue)
            })
        } else {
            dispatch(setAlertMessage({
                message: ValidationMsgs.order.FillSomeMoreFields,
                type: 'danger'
            }));
        }
    }, []);


    const handleCancel = (setFieldValue, index) => {
        setFieldValue(`trackingNumber_parent`, "")
        setFieldValue(`shippingDate_parent`, "")
        setFieldValue(`notes_parent`, "")
        setFieldValue(`shippedVia_parent`, "")

        if (index) {
            setFieldValue(`Products[${index}].manualShip.shippedQty`, "")
            setFieldValue(`Products[${index}].manualShip.trackingNumber`, "")
            setFieldValue(`Products[${index}].manualShip.shippedOn`, "")
            setFieldValue(`Products[${index}].manualShip.shippedNote`, "")
            setFieldValue(`Products[${index}].manualShip.shippedVia`, "")
        }
    }

    const handleEdit = (id) => {
        setEditManualShipping(id)
    }

    const handleFillValueInAllFields = (setFieldValue, values) => {
        if (values && values.Products && values.Products.length) {
            values.Products.map((shippingTrackingObj, index) => {
                if (values?.shippedVia_parent) {
                    setFieldValue(`Products[${index}].manualShip.shippedVia`, values?.shippedVia_parent)
                }
                if (values?.notes_parent) {
                    setFieldValue(`Products[${index}].manualShip.shippedNote`, values?.notes_parent)
                }
                if (values?.shippingDate_parent) {
                    setFieldValue(`Products[${index}].manualShip.shippedOn`, values?.shippingDate_parent)
                }
                if (values?.trackingNumber_parent) {
                    setFieldValue(`Products[${index}].manualShip.trackingNumber`, values?.trackingNumber_parent)
                }
            })
        }
    }

    useEffect(() => {
        if (ManualShipping) {
            GetOrderedItems()
        }

        if (!ManualShipping) {
            setEditManualShipping("")
        }
    }, [ManualShipping]);

    const initialData = {
        Products: [...oldManualOrderShippingData] || [],
        isEmailSend: false
    }

    const validationSchema = Yup.object().shape({
        Products: Yup.array()
            .of(
                Yup.object().shape({
                    manualShip: Yup.object().shape({
                        shippedQty: Yup.number()
                            .required("Shipped quantity must be greater than 0")
                            .min(1, "Shipped quantity must be greater than 0"),
                        trackingNumber: Yup.string().trim()
                            .required("Tracking id is required"),
                        shippedOn: Yup.string().trim()
                            .required("Shipping date is required"),
                        shippedVia: Yup.number()
                            .required("Shipping via is required"),
                        shippedVia: Yup.number()
                            .required("Shipped Via is required"),
                    })
                })
            )
    })

    // var alreadySet = false

    // const showQuantityError = (setFieldError, name, value, error, oldValue, index) => {

    //     console.log("i am getting called ", name, value, error, oldValue);

    //     if (error && !Object.keys(error).length) {
    //         setFieldError(name, "shipped item should not be greater than Quantity")

    //         // alreadySet = true
    //     }

    //     if (error && Object.keys(error).length) {
    //         if (error?.Products && error?.Products?.length >= index) {
    //             if (error?.Products[index]) {
    //                 if (error?.Products[index]["manualShip"]) {
    //                     if (error?.Products[index]?.manualShip?.shippedQty) {
    //                         setFieldError(name, "shipped item should not be greater than Quantity")
    //                     }
    //                 }
    //             }

    //         }
    //     }

    //     return ""
    // }

    const HandleShipVia = (shipViaOption = [], value) => {
        if (shipViaOption && value) {
            return shipViaOption.filter((obj) => obj?.value === value)[0]?.label
        } else {
            return 0
        }
    }

    return (
        <>
            <div className={`fixed z-60 inset-0 overflow-hidden flex items-center my-4 justify-center transform px-4 sm:px-6 ${!ManualShipping && 'hidden'}`}>
                <div className="relative bg-white rounded shadow-lg overflow-auto max-w-4xl w-full max-h-full z-60">
                    {/* {
                        console.log("oldManualOrderShippingData ", oldManualOrderShippingData)
                    } */}
                    <Formik
                        enableReinitialize={true}
                        initialValues={initialData}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                    >
                        {({ setFieldValue, errors, values, resetForm, dirty, handleSubmit, setFieldError, ...rest }) => {
                            // console.log("values rest", values, errors, rest);
                            if (rest.isSubmitting && errors?.Products && errors?.Products.length && errors?.Products[0]?.manualShip) {
                                // alreadySet = false
                                dispatch(setAlertMessage({
                                    message: serverError({
                                        data: {
                                            errors: errors?.Products[0]?.manualShip
                                        }
                                    }),
                                    type: 'danger'
                                }))
                            }
                            return (
                                <FormikForm>
                                    <div id="manualshippingModal" className="fixed inset-0 z-50 justify-center items-center h-modal overflow-y-scroll scrollbar-thin">
                                        <div className=" bg-black bg-opacity-50 flex items-center min-h-screen justify-center p-10">
                                            <div className="relative bg-white rounded-lg shadow mt-[6vh]">
                                                <div className="px-5 py-3 border-b border-neutral-200 ">
                                                    <div className="flex justify-between items-center">
                                                        <div className="font-bold text-black">
                                                            {title ? title : "Manual Shipping"}
                                                        </div>
                                                        <button type="button"
                                                            className="text-black hover:text-gray-400"
                                                            onClick={() => setManualShipping((prevData) => !prevData)}
                                                        >
                                                            <div className="sr-only">Close</div>
                                                            <svg className="w-4 h-4 fill-current">
                                                                <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z"></path>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="p-6">
                                                    <div>
                                                        {(permission?.isEdit || permission?.isDelete) &&
                                                            <div>
                                                                <div className="w-full bg-white px-6 py-6 flex flex-wrap gap-6 items-center">
                                                                    <div className="flex flex-wrap items-center gap-2">
                                                                        <div className="text-md font-medium text-gray-500 text-left">Tracking #</div>
                                                                        <div className="text-md font-medium text-gray-500 text-left">
                                                                            <Input name={'trackingNumber_parent'} type="text" placeholder={"Enter Tracking No."} className={`block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md`} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex flex-wrap items-center gap-2">
                                                                        <div className="text-md font-medium text-gray-500 text-left">Shipped Via</div>
                                                                        <div className="text-md font-medium text-gray-500 text-left">
                                                                            <Dropdown name={'shippedVia_parent'} options={shippingOptions} defaultValue={values.shippedVia_parent} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex flex-wrap items-center gap-2">
                                                                        <div className="text-md font-medium text-gray-500 text-left">Shipped On</div>
                                                                        <div className="text-md font-medium text-gray-500 text-left">
                                                                            <div className="container">
                                                                                <div className={`relative w-full`}>
                                                                                    <DatePicker name="shippingDate_parent" defaultValue={values["shippingDate_parent"]} minDate={new Date()} className={`min-w-[200px]`} />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex flex-wrap items-center gap-2">
                                                                        <div className="text-md font-medium text-gray-500 text-left">Shipped Note</div>
                                                                        <div className="text-md font-medium text-gray-500 text-left">
                                                                            <Textarea id="notes" name="notes_parent" rows="1" className="shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md" />
                                                                        </div>
                                                                    </div>

                                                                    <div className="flex flex-wrap items-center gap-2">
                                                                        <button type="button" className="btn bg-indigo-500 hover:bg-indigo-600 text-white" onClick={() => handleFillValueInAllFields(setFieldValue, values)} > Add For All </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                        <div className="w-full bg-white shadow-lg rounded-md px-2 py-2 mb-6">
                                                            <div className="w-full justify-between px-2 mb-8">
                                                                <div className="flex justify-between flex-wrap items-center px-2 border-b border-neutral-200">
                                                                    <div className="flex text-left items-center">
                                                                        <span className="text-lg font-bold text-gray-500 text-left leading-10 pb-2">Ordered Items</span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex z-60">
                                                                    <table className="table-auto w-full text-sm text-[#191919] font-semibold">
                                                                        <thead className="text-sm font-bold uppercase text-[#b3b3b3] border-b border-neutral-200">
                                                                            <tr>
                                                                                <th className="px-2 py-2" colSpan={2}>
                                                                                    <div className="font-semibold text-left flex items-center">
                                                                                        <span>Line Items</span>
                                                                                    </div>
                                                                                </th>
                                                                                <th className="px-2 py-2 w-20 ">
                                                                                    <div className="font-semibold text-right flex items-center">
                                                                                        <span>Quantity</span>
                                                                                        {/* <div className="flex flex-col pl-2">
                                                                                            <span className="material-icons-outlined text-sm h-2 leading-[10px] cursor-pointer">keyboard_arrow_up</span>
                                                                                            <span className="material-icons-outlined text-sm h-2 leading-[10px] cursor-pointer">keyboard_arrow_down</span>
                                                                                        </div> */}
                                                                                    </div>
                                                                                </th>
                                                                                <th className="px-2 py-2 w-40">
                                                                                    <div className="font-semibold text-right flex items-center">
                                                                                        <span>Shipped Items</span>
                                                                                        {/* <div className="flex flex-col pl-2">
                                                                                            <span className="material-icons-outlined text-sm h-2 leading-[10px] cursor-pointer">keyboard_arrow_up</span>
                                                                                            <span className="material-icons-outlined text-sm h-2 leading-[10px] cursor-pointer">keyboard_arrow_down</span>
                                                                                        </div> */}
                                                                                    </div>
                                                                                </th>
                                                                                <th className="px-2 py-2 w-40">
                                                                                    <div className="font-semibold text-right flex items-center">
                                                                                        <span>Tracking #</span>
                                                                                        {/* <div className="flex flex-col pl-2">
                                                                                            <span className="material-icons-outlined text-sm h-2 leading-[10px] cursor-pointer">keyboard_arrow_up</span>
                                                                                            <span className="material-icons-outlined text-sm h-2 leading-[10px] cursor-pointer">keyboard_arrow_down</span>
                                                                                        </div> */}
                                                                                    </div>
                                                                                </th>
                                                                                <th className="px-2 py-2 w-40">
                                                                                    <div className="font-semibold text-right flex items-center">
                                                                                        <span>Shipped On</span>
                                                                                        {/* <div className="flex flex-col pl-2">
                                                                                            <span className="material-icons-outlined text-sm h-2 leading-[10px] cursor-pointer">keyboard_arrow_up</span>
                                                                                            <span className="material-icons-outlined text-sm h-2 leading-[10px] cursor-pointer">keyboard_arrow_down</span>
                                                                                        </div> */}
                                                                                    </div>
                                                                                </th>
                                                                                <th className="px-2 py-2 w-40">
                                                                                    <div className="font-semibold text-right flex items-center">
                                                                                        <span>Shipped Note</span>
                                                                                        {/* <div className="flex flex-col pl-2">
                                                                                            <span className="material-icons-outlined text-sm h-2 leading-[10px] cursor-pointer">keyboard_arrow_up</span>
                                                                                            <span className="material-icons-outlined text-sm h-2 leading-[10px] cursor-pointer">keyboard_arrow_down</span>
                                                                                        </div> */}
                                                                                    </div>
                                                                                </th>
                                                                                <th className="px-2 py-2 w-40">
                                                                                    <div className="font-semibold text-right flex items-center">
                                                                                        <span>Shipped Via</span>
                                                                                        {/* <div className="flex flex-col pl-2">
                                                                                            <span className="material-icons-outlined text-sm h-2 leading-[10px] cursor-pointer">keyboard_arrow_up</span>
                                                                                            <span className="material-icons-outlined text-sm h-2 leading-[10px] cursor-pointer">keyboard_arrow_down</span>
                                                                                        </div> */}
                                                                                    </div>
                                                                                </th>
                                                                                <th className="px-2 py-2 w-10">
                                                                                    <div className="font-semibold text-right flex items-center">
                                                                                        <span>Shipped</span>
                                                                                        {/* <div className="flex flex-col pl-2">
                                                                                            <span className="material-icons-outlined text-sm h-2 leading-[10px] cursor-pointer">keyboard_arrow_up</span>
                                                                                            <span className="material-icons-outlined text-sm h-2 leading-[10px] cursor-pointer">keyboard_arrow_down</span>
                                                                                        </div> */}
                                                                                    </div>
                                                                                </th>
                                                                                {(permission?.isEdit || permission?.isDelete) &&
                                                                                    <th className="px-2 py-2 w-10">
                                                                                        <div className="font-semibold text-right flex items-center">
                                                                                            <span>Action</span>
                                                                                            {/* <div className="flex flex-col pl-2">
                                                                                            <span className="material-icons-outlined text-sm h-2 leading-[10px] cursor-pointer">keyboard_arrow_up</span>
                                                                                            <span className="material-icons-outlined text-sm h-2 leading-[10px] cursor-pointer">keyboard_arrow_down</span>
                                                                                        </div> */}
                                                                                        </div>
                                                                                    </th>
                                                                                }
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody className="text-sm divide-y divide-slate-200 border-b border-neutral-200">
                                                                            <FieldArray
                                                                                name="Products"
                                                                                render={(fieldArrayProps) => {
                                                                                    const { form } = fieldArrayProps;
                                                                                    return (
                                                                                        <>
                                                                                            {Object.keys(form.values.Products) &&
                                                                                                form.values.Products.length > 0 ? (
                                                                                                form.values.Products.map((value, index) => {
                                                                                                    return (
                                                                                                        <Fragment key={index}>
                                                                                                            <tr>
                                                                                                                <td className="whitespace-nowrap p-4">
                                                                                                                    <div className="h-20">
                                                                                                                        <Image
                                                                                                                            src={value.colorImage}
                                                                                                                            containerHeight={"h-22"}
                                                                                                                            className="max-h-22"
                                                                                                                            imageContainerBorderCls={`w-24`}
                                                                                                                        />
                                                                                                                    </div>
                                                                                                                </td>

                                                                                                                <td className="px-2 py-3">
                                                                                                                    <div>{value.productName}</div>
                                                                                                                    {/* {
                                                                                                                        value.shoppingCartLineSizeListViewModel.map(
                                                                                                                            (attValue, index) => {
                                                                                                                                return (
                                                                                                                                    <div
                                                                                                                                        className="flex flex-wrap gap-4 justify-between py-1"
                                                                                                                                        key={index}
                                                                                                                                    >
                                                                                                                                        <div className="">Size: {attValue?.sizeName || "-"}</div>
                                                                                                                                        <div className="">Qty: {attValue?.qty || 0}</div>
                                                                                                                                        <div className="">
                                                                                                                                            {CurrencySymbolByCode.USD}
                                                                                                                                            {attValue?.price / attValue?.qty > 0
                                                                                                                                                ? (attValue?.price / attValue?.qty).toFixed(2)
                                                                                                                                                : "0.00"
                                                                                                                                            }
                                                                                                                                            /Qty
                                                                                                                                        </div>
                                                                                                                                    </div>
                                                                                                                                );
                                                                                                                            }
                                                                                                                        )} */}
                                                                                                                </td>

                                                                                                                <td className="px-2 py-3 text-center">
                                                                                                                    <div>{value.qty}</div>
                                                                                                                </td>
                                                                                                                <td className="px-2 py-3 text-center">
                                                                                                                    {
                                                                                                                        EditManualShipping === index ? <Input name={`Products[${index}].manualShip.shippedQty`} maxlength={value.qty} type="number" placeholder={"Enter Shipped Item."} className={`block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md`} /> : <div>{value?.manualShip?.shippedQty || "Not Added"}</div>
                                                                                                                    }
                                                                                                                    {/* {
                                                                                                                        (value.qty < value?.manualShip?.shippedQty) && showQuantityError(setFieldError, `Products[${index}].manualShip.shippedQty`, value?.manualShip?.shippedQty, errors, value.qty, index)
                                                                                                                    }
                                                                                                                    {
                                                                                                                        (errors &&
                                                                                                                            Object.keys(errors).length &&
                                                                                                                            errors['Products'] &&
                                                                                                                            errors['Products'].length >= index &&
                                                                                                                            errors['Products'][index] &&
                                                                                                                            errors['Products'][index]["manualShip"] &&
                                                                                                                            errors['Products'][index]["manualShip"]["shippedQty"]) ? <span>{errors['Products'][index]["manualShip"]["shippedQty"]}</span> : ""
                                                                                                                    } */}
                                                                                                                </td>
                                                                                                                <td className="px-2 py-3 text-center">
                                                                                                                    {
                                                                                                                        EditManualShipping === index ? <Input name={`Products[${index}].manualShip.trackingNumber`} type="text" placeholder={"Enter Tracking No."} className={`block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md`} /> : <div>{value?.manualShip?.trackingNumber || "Not Added"}</div>
                                                                                                                    }
                                                                                                                </td>
                                                                                                                <td className="px-2 py-3 text-center">
                                                                                                                    <div className="container">
                                                                                                                        <div className={`relative w-full`}>
                                                                                                                            {
                                                                                                                                EditManualShipping === index ? <DatePicker name={`Products[${index}].manualShip.shippedOn`} defaultValue={values?.Products[index]?.manualShip?.shippedOn} minDate={new Date()} className={`min-w-[200px]`} popperPlacement={(index === form.values.Products.length - 1) ? "top-start" : "bottom-start"} /> : <div>
                                                                                                                                    {
                                                                                                                                        value?.manualShip?.shippedOn ? <>
                                                                                                                                            <p>{DateTimeFormat(value?.manualShip?.shippedOn).date}</p>
                                                                                                                                            <p>{DateTimeFormat(value?.manualShip?.shippedOn).time}</p>
                                                                                                                                        </> : "Not Added"
                                                                                                                                    }
                                                                                                                                </div>
                                                                                                                            }
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </td>
                                                                                                                <td className="px-2 py-3 text-center">
                                                                                                                    {
                                                                                                                        EditManualShipping === index ? <Textarea id="notes" name={`Products[${index}].manualShip.shippedNote`} rows="1" className="shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md" /> : <div>{value?.manualShip?.shippedNote || "Not Added"}</div>
                                                                                                                    }
                                                                                                                </td>

                                                                                                                <td className="px-2 py-3 text-center">

                                                                                                                    {
                                                                                                                        EditManualShipping === index ? <Dropdown name={`Products[${index}].manualShip.shippedVia`} options={shippingOptions} defaultValue={values?.Products[index]?.manualShip?.shippedVia} menuPlacement={(index === form.values.Products.length - 1) ? "top" : "auto"} /> : <div>{HandleShipVia(shippingOptions, value?.manualShip?.shippedVia) || "Not Added"}</div>
                                                                                                                    }
                                                                                                                </td>
                                                                                                                <td className="px-2 py-3 text-center">
                                                                                                                    {
                                                                                                                        EditManualShipping === index ? "No" : <div>{`${value?.manualShip?.shipped ? "Yes" : "No"}`}</div>
                                                                                                                    }
                                                                                                                </td>
                                                                                                                {(permission?.isEdit || permission?.isDelete) &&
                                                                                                                    <td className="px-2 py-3 text-center">
                                                                                                                        {
                                                                                                                            EditManualShipping === index ? <>
                                                                                                                                <button type="button" className="text-green-500"><span className="material-icons-outlined" onClick={() => {
                                                                                                                                    handleSubmit()
                                                                                                                                    setFieldValue("isEmailSend", false)
                                                                                                                                }} >save</span></button>
                                                                                                                                <button type="button" className="text-rose-500"><span className="material-icons-outlined" onClick={() => handleCancel(setFieldValue, index)}>cancel</span></button>
                                                                                                                            </> : <button type="button" className="text-green-500"><span className="material-icons-outlined" onClick={() => handleEdit(index)}>edit</span></button>
                                                                                                                        }
                                                                                                                    </td>
                                                                                                                }
                                                                                                            </tr>
                                                                                                        </Fragment>
                                                                                                    )
                                                                                                })
                                                                                            ) : (
                                                                                                <></>
                                                                                            )}
                                                                                        </>
                                                                                    )
                                                                                }}
                                                                            />
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {(permission?.isEdit || permission?.isDelete) &&
                                                    <div className="flex items-center justify-end p-6 space-x-2 rounded-b border-t border-gray-200">
                                                        <button data-modal-toggle="manualshippingModal" type="submit" className={`btn hover:bg-indigo-600 text-white ${!dirty ? "bg-indigo-100" : "bg-indigo-500"}`} onClick={() => setFieldValue("isEmailSend", true)} disabled={!dirty} >Update and Send Mail</button>
                                                        <button data-modal-toggle="manualshippingModal" type="submit" className={`btn hover:bg-indigo-600 text-white ${!dirty ? "bg-indigo-100" : "bg-indigo-500"}`} onClick={() => setFieldValue("isEmailSend", false)} disabled={!dirty}>Update</button>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>

                                </FormikForm>
                            )
                        }}
                    </Formik>
                </div>
            </div >
        </>
    );
};

export default ManualShipping;
