import React, { useCallback, useEffect, useState } from 'react';
import { Formik, Form as FormikForm, FieldArray } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from "yup";

import ProductShipDateRangeServices from "services/admin/ProductShipDateRangeMaster/ProductShipDateRangeMaster"
import { DateTimeFormat, TitleNameHelper } from 'services/common/helper/Helper';
import { serverError } from "services/common/helper/Helper";

import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";

import InputNumber from 'components/common/formComponent/InputNumber';
import DatePicker from "components/common/formComponent/DatePicker";
import Messages from "components/common/alerts/messages/Index";
import { RecStatusValuebyName, anniesAnnualData } from 'global/Enum';
import { setAddLoading } from 'redux/globalLoader/GlobalLoaderAction';
import { ValidationMsgs } from 'global/ValidationMessages';

const List = () => {
    const dispatch = useDispatch();
    const location = useSelector((store) => store?.location);

    // const today = new Date()
    // const addWeekLater = new Date();
    // const toAdd = addWeekLater.getDate() + 7

    const [ShipDataRange, setShipDataRange] = useState({
        "id": 0,
        // "startDate": today,
        // "endDate": addWeekLater.setDate(toAdd),
        "startDate": "",
        "endDate": "",
        "globalInventoryCount": 0,
        "storeId": 0,
        "recStatus": "A",
        "createdDate": "",
        "createdBy": 0,
        "modifiedDate": "",
        "modifiedBy": "",
        "rowVersion": "",
        "location": "",
        "ipAddress": "",
        "macAddress": ""
    })

    const [ShipDataRangeDetail, setShipDataRangeDetail] = useState([])

    const initialValues = {
        maxItemCountArr: ShipDataRangeDetail,
        create: {
            startDate: ShipDataRange.startDate,
            endDate: ShipDataRange.endDate,
            // startDate: "",
            // endDate: "",
            creditAmount: 0
        }
    };

    const onSubmit = (fields, { resetForm }) => {
        const payload = fields.maxItemCountArr.length > 0 && fields.maxItemCountArr.map((obj) => ({
            id: obj?.id,
            rowVersion: obj?.rowVersion,
            productShipDateRangeMasterId: obj?.productShipDateRangeMasterId,
            shipDate: obj?.shipDate,
            phoneInventoryCount: obj?.phoneInventoryCount,
            maximumInventoryCount: obj?.maximumInventoryCount,
            recStatus: RecStatusValuebyName.Active,
            ...location,
        }))
        if (payload && payload.length > 0) {
            dispatch(setAddLoading(true));
            ProductShipDateRangeServices.updateProductShipDateRangeDetails({
                productShipDateRangeDetailsModel: payload
            }).then((response) => {
                if (response.data.success && response.data.data) {
                    dispatch(setAlertMessage({ type: "success", message: ValidationMsgs.itemCountMaxinum.updateItemCount }))
                } else {
                    dispatch(setAlertMessage({ type: "danger", message: serverError(response) }))
                }
                dispatch(setAddLoading(false))
            }).catch((error) => {
                dispatch(setAddLoading(false))
                dispatch(setAlertMessage({ type: "danger", message: ValidationMsgs.itemCountMaxinum.notUpdateItemCount }))
            })
        }
    }

    const validationSchema = Yup.object().shape({

    });

    const shapeProductShipDateRange = (values, toDo) => {
        const payload = {
            "id": toDo === "create" ? 0 : ShipDataRange.id,
            "rowVersion": toDo === "create" ? "" : ShipDataRange.rowVersion,
            ...location,
            "startDate": values.create.startDate,
            "endDate": values.create.endDate,
            "globalInventoryCount": toDo === "create" ? 0 : values.create.creditAmount,
            "recStatus": "A",
            "storeId": anniesAnnualData.storeId
        }

        dispatch(setAddLoading(true));
        ProductShipDateRangeServices[toDo === "create" ? "createProductShipDateRangeMaster" : "updateProductShipDateRangeMaster"](payload).then((res) => {
            if (res.data.success && res.data.data) {
                // setShipDataRange(res.data.data)
                // filterMaxItemCount(res.data.data.id, "")
                getShipDateRangeMaster();
                dispatch(setAlertMessage({ type: 'success', message: toDo === "create" ? ValidationMsgs.itemCountMaxinum.updateRange : ValidationMsgs.itemCountMaxinum.updateItemCount }));
            } else {
                dispatch(setAlertMessage({ type: 'danger', message: serverError(res) }));
            }
            dispatch(setAddLoading(false));
        }).catch((err) => {
            dispatch(setAddLoading(false));
            dispatch(setAlertMessage({ type: 'danger', message: toDo === "create" ? ValidationMsgs.itemCountMaxinum.notUpdateRange : ValidationMsgs.itemCountMaxinum.notUpdateItemCount }));
        })
    }

    const filterMaxItemCount = useCallback((productShipDateRangeMasterId, search) => {
        dispatch(setAddLoading(true));
        ProductShipDateRangeServices.getProductShipDateRangeDetails({ productShipDateRangeMasterId, search }).then((res) => {
            if (res.data.success && res.data.data) {
                setShipDataRangeDetail(res.data.data)
            }
            dispatch(setAddLoading(false));
        }).catch((err) => {
            dispatch(setAddLoading(false));
        })
    }, [])

    const getShipDateRangeMaster = () => {
        ProductShipDateRangeServices.getProductShipDateRangeMaster().then((res) => {

            if (res.data.success && res.data.data) {
                setShipDataRange(res.data.data)
                filterMaxItemCount(res.data.data.id, "")
            }
        }).catch((err) => {
            // console.log("err", err);
        })
    }

    const exportItemCountMaxinumData = () => {
        if (ShipDataRange?.id) {
            dispatch(setAddLoading(true));
            ProductShipDateRangeServices.exportItemCountMaximum({
                productShipDateRangeDetailsModel: {
                    productShipDateRangeMasterId: ShipDataRange?.id,
                    search: ""
                }
            }).then((response) => {
                if (response.data.success && response.data.data) {
                    window.location.href = response.data.data
                    dispatch(setAlertMessage({ type: "success", message: ValidationMsgs.commonExport.success }))
                } else {
                    dispatch(setAlertMessage({ type: "danger", message: serverError(response) }))
                }
                dispatch(setAddLoading(false));
            }).catch((error) => {
                dispatch(setAddLoading(false));
                dispatch(setAlertMessage({ type: "danger", message: ValidationMsgs.commonExport.failed }))
            })
        }
    }

    useEffect(() => {
        getShipDateRangeMaster();
    }, [])

    return (
        <>
            <title>{TitleNameHelper({ defaultTitleName: "Item Count Maximum" })} </title>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            // validateOnChange={true}
            // validateOnBlur={false}
            // validateOnMount={true}
            >
                {({ errors, setFieldValue, values }) => {
                    return (
                        <FormikForm>
                            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full">
                                <div className="sm:flex sm:justify-between sm:items-center mb-8">
                                    <div className="col-span-full w-full flex justify-between items-center">
                                        <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">{TitleNameHelper({ defaultTitleName: "Item Count Maximum" })}</h1>
                                    </div>
                                </div>
                                <Messages />
                                <div className="grid grid-cols-12 gap-6">
                                    <div className="col-span-full xl:col-span-6 bg-white shadow rounded-md mb-8">
                                        {(values.maxItemCountArr !== undefined && values.maxItemCountArr.length) ? (
                                            <div className="bg-white rounded-md p-6">
                                                <div className="overflow-x-auto max-h-screen w-full my-6">
                                                    <table className="table-auto w-full text-sm text-[#191919] ">
                                                        <thead className="text-sm font-bold uppercase text-[#b3b3b3] border-b border-t border-neutral-200">
                                                            <tr>
                                                                <th className="px-2 first:pl-5 py-4">
                                                                    <div className="font-semibold text-left w-full max-w-sm flex items-center">
                                                                        <span>Ship Date</span>
                                                                    </div>
                                                                </th>
                                                                <th className="px-2 first:pl-5 py-4">
                                                                    <div className="font-semibold text-left w-full max-w-sm flex items-center">
                                                                        <span>Pre-Order</span>
                                                                    </div>
                                                                </th>
                                                                <th className="px-2 first:pl-5 py-4">
                                                                    <div className="font-semibold text-left w-full max-w-sm flex items-center justify-center">
                                                                        <span>Web Count</span>
                                                                    </div>
                                                                </th>
                                                                <th className="px-2 first:pl-5 py-4">
                                                                    <div className="font-semibold text-left w-full max-w-sm flex items-center">
                                                                        <span>Phone Count</span>
                                                                    </div>
                                                                </th>
                                                                <th className="px-2 first:pl-5 py-4">
                                                                    <div className="font-semibold text-left w-full max-w-sm flex items-center justify-center">
                                                                        <span>Total Count</span>
                                                                    </div>
                                                                </th>
                                                                <th className="px-2 first:pl-5 py-4">
                                                                    <div className="font-semibold text-left w-full max-w-sm flex items-center">
                                                                        <span>Maximum Count</span>
                                                                    </div>
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-slate-200 border-b border-neutral-200">

                                                            <FieldArray
                                                                name="maxItemCountArr"
                                                                render={(fieldArrayProps) => {
                                                                    const { form } = fieldArrayProps;
                                                                    return (
                                                                        <>
                                                                            {
                                                                                form.values.maxItemCountArr.map(
                                                                                    (value, i) => {
                                                                                        return (

                                                                                            <tr className="bg-white hover:bg-gray-100" key={i}>
                                                                                                <td className="px-2 first:pl-5 py-3">
                                                                                                    <div>{DateTimeFormat(value.shipDate).date}</div>
                                                                                                </td>
                                                                                                <td className="px-2 first:pl-5 py-3 text-center">
                                                                                                    <div>{value.preOrderCount}</div>
                                                                                                </td>
                                                                                                <td className="px-2 first:pl-5 py-3 text-center">
                                                                                                    <div>{value.webInventoryCount}</div>
                                                                                                </td>
                                                                                                <td className="px-2 first:pl-5 py-3">
                                                                                                    <div>
                                                                                                        <InputNumber name={`maxItemCountArr[${i}].phoneInventoryCount`} allowNegative={true} placeholder="0.00" value={value.phoneInventoryCount > 0 ? value.phoneInventoryCount : ""} displayError={true} onChange={(e) => {
                                                                                                            setFieldValue(`maxItemCountArr[${i}].phoneInventoryCount`, e.target.value);
                                                                                                        }} className={""} disabled={false} />
                                                                                                    </div>
                                                                                                </td>
                                                                                                <td className="px-2 first:pl-5 py-3 text-center">
                                                                                                    <div>{value.totalWebPhoneInventoryCount}</div>
                                                                                                </td>
                                                                                                <td className="px-2 first:pl-5 py-3">
                                                                                                    <div>
                                                                                                        <InputNumber name={`maxItemCountArr[${i}].maximumInventoryCount`} allowNegative={true} placeholder="0.00" value={value.maximumInventoryCount > 0 ? value.maximumInventoryCount : ""} displayError={true} onChange={(e) => { setFieldValue(`maxItemCountArr[${i}].maximumInventoryCount`, e.target.value); }} className={""} disabled={false} />
                                                                                                    </div>
                                                                                                </td>
                                                                                            </tr>
                                                                                        )
                                                                                    }
                                                                                )
                                                                            }
                                                                        </>
                                                                    )
                                                                }}
                                                            />
                                                        </tbody >
                                                    </table>

                                                </div>
                                                <div className="w-full mt-6">
                                                    <div className="flex justify-end gap-4">
                                                        <div><button type={"button"}
                                                            className="btn bg-white rounded-md border-neutral-200 text-gray-500 hover:text-gray-700"
                                                            onClick={() => exportItemCountMaxinumData()}
                                                        ><span>Export</span></button>
                                                        </div>
                                                        <div><button type={"submit"} className="btn bg-indigo-500 hover:bg-indigo-600 text-white"><span>Update</span></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="w-full h-full flex flex-col justify-center gap-5 items-center p-5 mt-6 rounded-t text-red-600 bg-white">
                                                <h1 className='text-black '>Added Range will be shown here</h1>
                                                No range added yet!
                                            </div>
                                        )}
                                    </div>


                                    <div className="col-span-full xl:col-span-6 bg-white shadow rounded-md mb-8">
                                        <div className="bg-white rounded-md p-6">
                                            <div className="w-full">
                                                <div className="p-3 bg-gray-100 font-semibold text-base border-b-2 border-neutral-200 mb-6">Ship Date Range
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
                                                    <DatePicker
                                                        className={"mr-2"}
                                                        placeholder="Select Date"
                                                        defaultValue={values.create.startDate} name={"create.startDate"} dateFormat={"MM-dd-yyyy"} disabledLogo={false} />
                                                    <DatePicker
                                                        className={"mr-2"}
                                                        placeholder="Select Date"
                                                        defaultValue={values.create.endDate} name={"create.endDate"} dateFormat={"MM-dd-yyyy"} disabledLogo={false} />
                                                    <div className="relative w-full">
                                                        <button type={"button"} className="btn px-6 bg-indigo-500 hover:bg-indigo-600 text-white" onClick={() => shapeProductShipDateRange(values, "create")}>Create</button>
                                                    </div>

                                                </div>
                                                <div className="p-3 bg-gray-100 font-semibold text-base border-b-2 border-neutral-200 mb-6">
                                                    Maximum Item Count Auto Fill
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
                                                    <DatePicker
                                                        className={"mr-2"}
                                                        placeholder="Select Date"
                                                        defaultValue={values.create.startDate} name={"create.startDate"} dateFormat={"MM-dd-yyyy"} disabledLogo={false} />
                                                    <DatePicker
                                                        className={"mr-2"}
                                                        placeholder="Select Date"
                                                        defaultValue={values.create.endDate} name={"create.endDate"} dateFormat={"MM-dd-yyyy"} disabledLogo={false} />
                                                    <div>
                                                        <InputNumber name={'create.creditAmount'} allowNegative={true} placeholder="0.00" value={values?.create?.creditAmount ? values.create.creditAmount : ""} displayError={true} onChange={(e) => { setFieldValue('create.creditAmount', e.target.value); }} className={""} disabled={false} />
                                                    </div>
                                                    <div className="relative w-full"><button type={"button"} className="btn px-6 bg-indigo-500 hover:bg-indigo-600 text-white" onClick={() => shapeProductShipDateRange(values, "update")}>Populate</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FormikForm>
                    );
                }}
            </Formik >
        </>
    );
};

export default List;
