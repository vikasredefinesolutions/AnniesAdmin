import React, { useState, useEffect, useCallback } from "react";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import ToggleButton from "components/common/formComponent/ToggleButton";
import Input from "components/common/formComponent/Input";
import productConfigDetailServices from "services/admin/productConfigDetail/ProductConfigDetailsService";
import { useDispatch, useSelector } from "react-redux";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { RecStatusValuebyName, blobFolder, anniesAnnualData } from "global/Enum";
import { ValidationMsgs } from "global/ValidationMessages";
import { serverError } from "services/common/helper/Helper";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import Messages from "components/common/alerts/messages/Index";
import ImageFile from "components/common/formComponent/ImageFile";
import CKEditor from "components/common/formComponent/CKEditor";

const AddSubCategoryModel = ({
    handleShowModel,
    sizeMasterID,
    sizeId,
    setCategoryConfingDetailListDataBYId,
}) => {
    const dispatch = useDispatch();
    const [data, setData] = useState(null);
    const CompanyId = useSelector((store) => store?.CompanyConfiguration.id)
    const location = useSelector((store) => store?.location)
    const GlobalLoading = useSelector((store) => store?.GlobalLoaderReducer?.toLoad);
    const FolderPath = `/${blobFolder.temp}/${CompanyId}/${blobFolder.prodConfigFields}`

    const isAddMode = !sizeId;
    const setProdConfigDetailsByID = useCallback(() => {
        if (sizeId) {
            dispatch(setAddLoading(true))
            productConfigDetailServices.getConfigDetailsByID(sizeId)
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
    }, [sizeId]);

    useEffect(() => {
        setProdConfigDetailsByID();
    }, [setProdConfigDetailsByID]);

    const initialValues = {
        id: sizeId || 0,
        fieldValue: data?.fieldValue || "",
        filterFacetFieldId: sizeMasterID || 0,
        iconCode: data?.iconCode || "",
        displayOrderFieldValue: data?.displayOrderFieldValue || "",
        storeId: anniesAnnualData.storeId,
        isDefault: data?.isDefault || false,
        imagePath: data?.imagePath || "",
        recStatus: data?.recStatus || RecStatusValuebyName.Active,
        rowVersion: data?.rowVersion || null,
        sename: data?.sename || "",
    };

    const validationSchema = Yup.object({
        fieldValue: Yup.string().trim().required(ValidationMsgs.ProductConfig.ProductConfigNameRequired),
        displayOrderFieldValue: Yup.number()
            .typeError(ValidationMsgs.ProductConfig.displayOrderTypeError)
            .required(ValidationMsgs.ProductConfig.displayOrderRequired),
    });

    const createSizeDetails = (fields, resetForm) => {
        dispatch(setAddLoading(true))
        productConfigDetailServices.createCategoryConfigDetails({ ...fields, ...location })
            .then((response) => {
                if (response.data.success) {
                    dispatch(
                        setAlertMessage({
                            type: "success",
                            message: ValidationMsgs.ProductConfig.ProductConfigDetailsCreated,
                        })
                    );
                    resetForm();
                    handleShowModel();
                    setCategoryConfingDetailListDataBYId();
                } else {
                    dispatch(setAlertMessage({ type: "danger", message: serverError(response) }));
                }
                dispatch(setAddLoading(false))
            }).catch((errors) => {
                dispatch(
                    setAlertMessage({
                        type: "danger",
                        message: ValidationMsgs.ProductConfig.ProductConfigDetailsNotCreated,
                    })
                );
                dispatch(setAddLoading(false))
            });
    };

    const updateSizeDetails = (fields, { resetForm }) => {
        dispatch(setAddLoading(true))

        productConfigDetailServices.updateCategoryConfigDetails({ ...fields, ...location })
            .then((response) => {
                if (response.data.success) {
                    dispatch(
                        setAlertMessage({
                            type: "success",
                            message: ValidationMsgs.ProductConfig.ProductConfigDetailsUpdated,
                        })
                    );
                    handleShowModel();
                    setCategoryConfingDetailListDataBYId();
                } else {
                    dispatch(setAlertMessage({ type: "danger", message: serverError(response) }));
                }
                dispatch(setAddLoading(false))
            }).catch((errors) => {
                dispatch(
                    setAlertMessage({
                        type: "danger",
                        message: ValidationMsgs.ProductConfig.ProductConfigDetailsNotUpdated,
                    })
                );
                dispatch(setAddLoading(false))
            });
    };

    const [toggler, setToggler] = useState({
        inventoryAvailable: false,
    });

    const onSubmit = (fields, { resetForm }) => {
        if (sizeId) {
            updateSizeDetails(fields, resetForm);
        } else {
            createSizeDetails(fields, resetForm);
        }
    };

    const handleToggle = (field) => {
        setToggler((prevData) => ({
            ...prevData,
            [field]: !toggler[field],
        }));
    };

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
                            <div
                                id="ManageLocationModal"
                                className="overflow-y-auto overflow-x-hidden fixed z-30 right-0 left-0 top-4 justify-center items-center h-modal md:h-full md:inset-0"
                            >
                                <div className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                                    <div className="relative px-4 w-full max-w-3xl h-full md:h-auto">
                                        <div className="relative bg-white rounded-lg shadow max-h-screen overflow-y-auto">
                                            <div className="flex justify-between items-start p-5 rounded-t border-b sticky top-0 left-0 bg-white">
                                                <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl ">
                                                    {isAddMode ? "Add Sub Product Field" : "Edit Sub Product Field"}
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
                                                    <label
                                                        className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                                                        htmlFor=""
                                                    >
                                                        Field Name :
                                                        <span className="text-rose-500 text-lg leading-none">*</span>
                                                    </label>
                                                    <Input name="fieldValue" />
                                                </div>

                                                <div className="mb-3">
                                                    <label
                                                        className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                                                        htmlFor=""
                                                    >
                                                        sename :
                                                        <span className="text-rose-500 text-lg leading-none"></span>
                                                    </label>
                                                    <Input name="sename" disabled={true} />
                                                </div>

                                                <div className="mb-3">
                                                    <label
                                                        className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                                                        htmlFor=""
                                                    >
                                                        Display Order :
                                                        <span className="text-rose-500 text-lg leading-none">*</span>
                                                    </label>
                                                    <Input
                                                        name="displayOrderFieldValue"
                                                        maxLength={4}
                                                        onKeyPress={(event) => {
                                                            if (!/^\d*$/.test(event.key)) {
                                                                event.preventDefault();
                                                            }
                                                        }}
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                                                        Icon Code :
                                                    </label>
                                                    <CKEditor
                                                        type="simple"
                                                        name={"iconCode"}
                                                        defaultValue={values.iconCode}
                                                        onChange={(value) => {
                                                            setFieldValue("iconCode", value);
                                                        }}
                                                        loading={data?.iconCode}
                                                    />
                                                </div>

                                                <div className="mb-4">
                                                    <label
                                                        className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                                                        htmlFor=""
                                                    >
                                                        Icon Image :
                                                    </label>
                                                    <div>
                                                        <ImageFile
                                                            type="file"
                                                            className="sr-only"
                                                            name="imagePath"
                                                            id="imagePath"
                                                            buttonName="Add"
                                                            folderpath={`${FolderPath}`}
                                                            onChange={(value) => {
                                                                setFieldValue("imagePath", value);
                                                            }}
                                                            url={values.imagePath}
                                                        />
                                                    </div>
                                                    <div className="text-sm mt-2">
                                                        Recommended size for icon logo is 1920 x 600 pixel and it's mandatory for
                                                        user to compress logo via &nbsp;
                                                        <a
                                                            href="https://tinypng.com/"
                                                            title="www.tinypng.com"
                                                            className="text-indigo-500"
                                                            target="_blank"
                                                        >
                                                            www.tinypng.com &nbsp;
                                                        </a>
                                                        and then upload.
                                                    </div>
                                                </div>
                                            
                                            <div className="flex gap-8">
                                                <div className="mb-2">
                                                    <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                                                        Default :
                                                    </label>
                                                    <div className="col-span-full w-full sm:col-span-6 xl:col-span-8">
                                                        <div >
                                                            <ToggleButton
                                                                name="isDefault"
                                                                id="isDefault"
                                                                onChange={(e) => {
                                                                    handleToggle();
                                                                    setFieldValue("isDefault", e.target.checked)
                                                                }}
                                                                on="Yes"
                                                                off="No"
                                                                defaultValue={values.isDefault}
                                                                setFieldValue={setFieldValue}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mb-2">
                                                    <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                                                        Status :
                                                    </label>
                                                    <div className="col-span-full w-full sm:col-span-6 xl:col-span-8">
                                                        <div >
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

export default AddSubCategoryModel;
