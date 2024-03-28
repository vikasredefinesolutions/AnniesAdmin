import React, { useState, useEffect, useCallback } from "react";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import ToggleButton from "components/common/formComponent/ToggleButton";
import Input from "components/common/formComponent/Input";
import ShippingWeightAndUnitsDetailService from "services/admin/shippingWeightAndUnits/shippingWeightAndUnitsDetailService";
import { useDispatch, useSelector } from "react-redux";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { RecStatusValuebyName, decimalNumberCheck } from "global/Enum";
import { ValidationMsgs } from "global/ValidationMessages";
import { serverError } from "services/common/helper/Helper";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import Messages from "components/common/alerts/messages/Index";
import Dropdown from "components/common/formComponent/Dropdown";
import InputNumber from "components/common/formComponent/InputNumber";
import StateServiceCls from "services/admin/state/StateService";

const AddRangePriceModel = ({
    title,
    handleShowModel,
    RangeDetailMasterId,
    RangeDetailId,
    getShippingAndUnitsDetailData,
}) => {
    const dispatch = useDispatch();
    const isAddMode = !RangeDetailId;
    const [data, setData] = useState(null);
    const [StateList, setStateList] = useState([]);
    const location = useSelector((store) => store?.location)
    const GlobalLoading = useSelector((store) => store?.GlobalLoaderReducer?.toLoad);

    const setRangeDetailDetailsByID = useCallback(() => {
        if (RangeDetailId) {
            dispatch(setAddLoading(true))
            ShippingWeightAndUnitsDetailService.getShippingWeightAndUnitsDetailsById(RangeDetailId)
                .then((res) => {
                    var response = res.data;
                    if (response.success) {
                        setData({ ...response.data });
                    }
                    dispatch(setAddLoading(false))

                }).catch((err) => {
                    dispatch(setAddLoading(false))
                });
        }
    }, [RangeDetailId]);

    const initialValues = {
        id: RangeDetailId || 0,
        shippingRatesPlantsWeightMasterId: RangeDetailMasterId,
        stateCode: data?.stateCode || "",
        stateName: data?.stateName || "",
        price: data?.price || "",
        recStatus: data?.recStatus || RecStatusValuebyName.Active,
        rowVersion: data?.rowVersion || null,
    };

    const validationSchema = Yup.object({
        price: Yup.number().required("Price is Required")
            .test("charges", ValidationMsgs.decimalNumber.decimalNumber,
                (number) =>
                decimalNumberCheck.test(number)
            ),
        stateName: Yup.string().trim().required(ValidationMsgs.common.stateRequired),
    });

    const createRangePriceDetails = (fields, resetForm) => {
        dispatch(setAddLoading(true))
        ShippingWeightAndUnitsDetailService.createShippingWeightAndUnitsDetails({
            shippingRatesPlantsWeightDetailsModel: { ...fields, ...location }
        }).then((response) => {
            if (response.data.success) {
                    dispatch(
                        setAlertMessage({
                            type: "success",
                            message: `${title} detail is created successfully`,
                        })
                    );
                    resetForm({});
                    handleShowModel();
                    getShippingAndUnitsDetailData();
                } else {
                    dispatch(setAlertMessage({ type: "danger", message: serverError(response) }));
                }
                dispatch(setAddLoading(false))
        }).catch((errors) => {
                console.log("sdfysdvuysdbu", errors);
                dispatch(
                    setAlertMessage({
                        type: "danger",
                        message: `${title} detail is not created.`,
                    })
                );
                dispatch(setAddLoading(false))
            });
    };

    const updateRangePriceDetails = (fields) => {
        dispatch(setAddLoading(true))

        ShippingWeightAndUnitsDetailService.updateShippingWeightAndUnitsDetails({
            shippingRatesPlantsWeightDetailsModel: { ...fields, ...location }
        }).then((response) => {
                if (response.data.success) {
                    dispatch(
                        setAlertMessage({
                            type: "success",
                            message: `${title} detail updated successfully`,
                        })
                    );
                    handleShowModel();
                    getShippingAndUnitsDetailData();
                } else {
                    dispatch(setAlertMessage({ type: "danger", message: serverError(response) }));
                }
                dispatch(setAddLoading(false))
            }).catch((errors) => {
                dispatch(
                    setAlertMessage({
                        type: "danger",
                        message: `${title} detail not updated`,
                    })
                );
                dispatch(setAddLoading(false))
            });
    };

    const [toggler, setToggler] = useState({
        inventoryAvailable: false,
    });

    const onSubmit = (fields, { resetForm }) => {
        if (RangeDetailId) {
            updateRangePriceDetails(fields);
        } else {
            createRangePriceDetails(fields, resetForm);
        }
    };

    const handleToggle = (field) => {
        setToggler((prevData) => ({
            ...prevData,
            [field]: !toggler[field],
        }));
    };

    useEffect(() => {
        StateServiceCls.getStateWithStateCode().then((state) => {
            if (state?.data?.data && state?.data?.data?.length > 0) {
                setStateList(state?.data?.data)
            }
        }).catch((error) => { })
    }, [])
    
    useEffect(() => {
        setRangeDetailDetailsByID();
    }, [setRangeDetailDetailsByID]);

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ setFieldValue, errors, values }) => {
                    return (
                        <FormikForm>
                            <div id="ManageRangeDetailModal"
                                className="overflow-y-auto overflow-x-hidden fixed z-30 right-0 left-0 top-4 justify-center items-center h-modal md:h-full md:inset-0"
                            >
                                <div className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                                    <div className="relative px-4 w-full max-w-3xl h-full md:h-auto">
                                        <div className="relative bg-white rounded-lg shadow max-h-screen overflow-y-auto">
                                            <div className="flex justify-between items-start p-5 rounded-t border-b sticky top-0 left-0 bg-white z-30">
                                                <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl ">
                                                    {isAddMode ? "Add Range Price" : "Edit Range Price"}
                                                </h3>
                                                <button
                                                    type="button"
                                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                                                    data-modal-toggle="managestoreModal"
                                                    onClick={handleShowModel}
                                                >
                                                    <svg
                                                        className="w-5 h-5"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                            <Messages />
                                            <div className="p-6">
                                                <div className="mb-3">
                                                    <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                                                        State :
                                                        <span className="text-rose-500 text-lg leading-none">*</span>
                                                    </label>
                                                    <Dropdown
                                                        isMulti={false}
                                                        isClearable={false}
                                                        defaultValue={values?.stateCode}
                                                        name={"stateName"}
                                                        onChange={(e) => {
                                                            setFieldValue("stateName", e.label);
                                                            setFieldValue("stateCode", e.value);
                                                        }}
                                                        // optionStyle={{ padding: "1px" }}
                                                        options={StateList}
                                                    />
                                                </div>

                                                <div className="mb-3">
                                                    <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                                                        Price :
                                                        <span className="text-rose-500 text-lg leading-none">*</span>
                                                    </label>
                                                    <div className="relative grow">
                                                    <div className="absolute w-10 h-12 mt-0 left-0 top-0 flex items-center justify-center">
                                                        <span className="material-icons-outlined">
                                                            attach_money
                                                        </span>
                                                    </div>
                                                    <InputNumber
                                                        displayError={true}
                                                        type="text"
                                                        value={values?.price}
                                                        name="price"
                                                        placeholder="0.00"
                                                        className="appearance-none block w-full text-gray-700 border border-gray-200 rounded p-4 py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white pl-10"
                                                        onChange={(e) => {
                                                            setFieldValue(e.target.name, e.target.value);
                                                        }}
                                                        maxLength={10}
                                                        allowNegative={false}
                                                        />
                                                    </div>
                                                </div>
                                            
                                            <div className="flex gap-8">
                                               <div className="mb-2">
                                                    <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                                                        Status :
                                                    </label>
                                                    <div className="col-span-full w-full sm:col-span-6 xl:col-span-8">
                                                        <div>
                                                            <ToggleButton
                                                                name="recStatus"
                                                                id="recStatus"
                                                                onChange={(e) => {
                                                                    handleToggle(); setFieldValue(
                                                                        "recStatus",
                                                                        e.target.checked
                                                                            ? RecStatusValuebyName.Active
                                                                            : RecStatusValuebyName.Inactive
                                                                    )
                                                                }}
                                                                size="m"
                                                                on="Active"
                                                                off="Inactive"
                                                                defaultValue={values.recStatus === RecStatusValuebyName.Active
                                                                    ? true
                                                                    : false}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                            <div className="flex items-center justify-end p-6 space-x-2 rounded-b border-t border-gray-200 ">
                                                <button
                                                    data-modal-toggle="ManageLocationModal"
                                                    type="button"
                                                    className="btn bg-white border-neutral-200 text-gray-500 hover:text-gray-700"
                                                    onClick={handleShowModel}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    data-modal-toggle="ManageLocationModal"
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
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FormikForm>
                    );
                }}
            </Formik>
        </>
    );
};

export default AddRangePriceModel;
