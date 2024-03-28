/*Component Name: StepTwo
Component Functional Details:  StepTwo .
Created By: PK Kher
Created Date: 7-19-2022
Modified By: Happy Patel
Modified Date: 11-23-2022 */

import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Formik, Form as FormikForm } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import { ValidationMsgs } from "global/ValidationMessages";

import ImportExportService from "services/admin/master/master/products/ImportExportService";
import { importValidation, serverError } from "services/common/helper/Helper";
import ImageUpload from "services/common/imageUpload/ImageUpload";

import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";

import FormErrorMessage from "components/common/alerts/FormErrorMessage";
import Error from "./Error";

const StepTwo = ({ currentStep, stepLength, index, goToStep, type, exportId, dropDownValue }) => {
    const dispatch = useDispatch();

    const location = useSelector((store) => store?.location);

    const file = useRef();
    const fileImage = useRef();
    const [importError, setImportError] = useState({})
    const [checkZipCsv, setCheckZipCsv] = useState(true);
    const company = useSelector(store => store?.CompanyConfiguration);
    const { storeId } = useParams();
    const validationSchema = Yup.object({
        // file: Yup.string().trim().required(ValidationMsgs.common.importFileRequired),
    });
    const onSubmit = (fields, { resetForm }) => {
        if (!fields?.file && !fields?.fileImage) {
            dispatch(setAlertMessage({
                type: "danger",
                message: 'Please Select File to upload.'
            }))
            return;
        }
        dispatch(setAddLoading(true));
        if (fields?.file) {
            const formData = new FormData();
            formData.append("file", fields.file);
            // formData.append("other.ExportType", exportId);
            // formData.append("other.Browser", location.browser);
            // formData.append("other.Location", location.location);
            // formData.append("other.IPAddress", location.ipAddress);
            // formData.append("other.MACAddress", location.macAddress);
            ImportExportService.importData(formData, `other.ExportType=${exportId}&other.Browser=${location.browser}&other.Location=${location.location}&other.IPAddress=${location.ipAddress}&other.MACAddress=${location.macAddress}&other.StoreId=${storeId ? storeId : 0}`)
                .then((response) => {
                    if (response?.data?.success) {
                        if (response?.data?.data?.data) {
                            dispatch(
                                setAlertMessage({
                                    type: "success",
                                    message: response?.data?.data?.data,
                                    // message: ValidationMsgs?.product?.export?.importSuccess,
                                })
                            );
                            setCheckZipCsv(true)
                            file.current.value = null;
                            resetForm({})
                        }
                        if (response?.data?.data?.fieldValidation && response?.data?.data?.fieldValidation?.length > 0) {
                            setImportError({
                                type: "danger",
                                message: importValidation(response?.data?.data?.fieldValidation)
                            });
                        }
                    } else {
                        dispatch(
                            setAlertMessage({
                                type: "danger",
                                message: serverError(response),
                            })
                        );
                    }
                    dispatch(setAddLoading(false))
                })
                .catch(() => {
                    dispatch(
                        setAlertMessage({
                            type: "danger",
                            message: ValidationMsgs.product.export.importFailed,
                        })
                    );
                    dispatch(setAddLoading(false))
                });
        }
        if (fields?.fileImage) {
            imageUpload(fields, resetForm);
        }
    };

    const imageUpload = (fields, resetForm) => {
        dispatch(setAddLoading(true));
        const formData = new FormData();
        formData.append("file", fields.fileImage);
        ImageUpload.uploadZipFile(`${company.id}/${type === -2 || type === -1 ? "mastercatalog" : ""}/attributeimages`, `temp/${company.id}/import`, formData).then((response) => {
            if (response?.data?.success && response?.data?.data) {
                dispatch(
                    setAlertMessage({
                        type: "success",
                        message: ValidationMsgs.product.export.imageFileUpload,
                    })
                );
                setCheckZipCsv(true)
                fileImage.current.value = null;
                resetForm({})
                dispatch(setAddLoading(false))
            } else {
                dispatch(
                    setAlertMessage({
                        type: "danger",
                        message: serverError(response),
                    })
                );
            }
            dispatch(setAddLoading(false))
        })
            .catch(() => {
                dispatch(
                    setAlertMessage({
                        type: "danger",
                        message: ValidationMsgs.product.export.importFailed,
                    })
                );
                dispatch(setAddLoading(false))
            });;
    }

    const csvCheck = (event, setFieldValue, setFieldError, values) => {
        const file = event.target.files[0];

        if (file === undefined || file === "") {
            setFieldValue("file", "")
            setCheckZipCsv(true)
            if (values.fileImage.type === "application/x-zip-compressed" || values.fileImage.type === "application/zip") {
                setCheckZipCsv(false)
            } else {
                setCheckZipCsv(true)
            }
        } else if (file.type === "text/csv") {
            setFieldValue("file", event.currentTarget.files[0]);
            setCheckZipCsv(false)
        } else {
            setFieldError("file", ValidationMsgs.product.export.chooseOnlyCsv)
            setCheckZipCsv(true);
        }
    }

    const zipCheck = (event, setFieldValue, setFieldError, values) => {
        const file = event.target.files[0];

        if (file === undefined || file === "") {
            setFieldValue("fileImage", "")
            if (values.file.type === "text/csv") {
                setCheckZipCsv(false)
            } else {
                setCheckZipCsv(true)
            }
        } else if (file.type === "application/x-zip-compressed" || file.type === "application/zip") {
            setFieldValue("fileImage", event.currentTarget.files[0])
            setCheckZipCsv(false)
        } else {
            setFieldError("fileImage", ValidationMsgs.product.export.chooseOnlyZip)
            setCheckZipCsv(true);
        }
    }

    return (
        <>
            <Error showMessage={importError} setMessage={setImportError} />
            <Formik
                enableReinitialize={true}
                initialValues={{ file: "", fileImage: "" }}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({ setFieldValue, values, errors, setFieldError }) => {
                    return (
                        <FormikForm>
                            <div className={`import-step import-step-2 ${currentStep !== 2 ? "hidden" : "visible"}`}>
                                <div className="p-4 uppercase tracking-wide text-lg font-bold border-b-2 border-neutral-200">
                                    Import CSV document (Step {index + 1} of {stepLength - 1})
                                </div>

                                <div className="p-4">
                                    <div className="mb-6">
                                        <label htmlFor="" className="block uppercase tracking-wide text-xs font-bold mb-2"> File :</label>
                                        <input type="file" ref={file} accept=".csv" name="file" id={`file`}
                                            defaultValue={values.file} onChange={(event) => csvCheck(event, setFieldValue, setFieldError, values)}
                                            className="w-full px-2 py-1 text-sm leading-7 bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                                        />
                                        <FormErrorMessage >{errors?.file}</FormErrorMessage>
                                        <div className="text-xs mt-1">
                                            <div className="">Choose only CSV file</div>
                                            <div className="">The file must be under 20MBytes.</div>
                                            <div className="">
                                                You can import 25000 items at once.
                                            </div>
                                        </div>
                                    </div>
                                    {(dropDownValue === "Product" || dropDownValue === "AlterImage" || dropDownValue === "GrandMasterProduct") && (
                                        <div className="mb-6">
                                            <label
                                                htmlFor=""
                                                className="block uppercase tracking-wide text-xs font-bold mb-2"
                                            >
                                                Product Image :
                                            </label>
                                            <input type="file" accept=".zip" ref={fileImage} name="fileImage" id={`fileImage`} defaultValue={values.fileImage} onChange={(event) => zipCheck(event, setFieldValue, setFieldError, values)}
                                                className="w-full px-2 py-1 text-sm leading-7 bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                                            />
                                            <FormErrorMessage >{errors?.fileImage}</FormErrorMessage>
                                            <div className="text-xs mt-1">
                                                <div className="">Choose only ZIP file</div>
                                                <div className="">The file must be under 20MBytes.</div>
                                                <div className="">
                                                    You can import 25000 items at once.
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="p-4 flex items-center justify-end space-x-2 border-t-2 border-neutral-200">
                                    <span className="cursor-pointer btn bg-white border-neutral-200 text-gray-500 hover:text-gray-700" onClick={goToStep.bind(null, currentStep - 1)}>Previous Step</span>
                                    <button
                                        type="submit"
                                        className={`cursor-pointer btn px-6   ${checkZipCsv ? "bg-gray-300 cursor-not-allowed" : "hover:bg-indigo-600 bg-indigo-500"} text-white`} disabled={checkZipCsv}
                                    >
                                        Import
                                    </button>
                                </div>
                            </div>
                        </FormikForm>
                    );
                }}
            </Formik>
        </>
    );
};

export default StepTwo;
