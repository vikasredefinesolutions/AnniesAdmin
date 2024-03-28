/*Component Name: Create
Component Functional Details: User can create or update Create master details from here.
Created By: Shrey Patel
Created Date: 11/03/2023
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import { Formik, Form as FormikForm } from "formik";
import React, { useState, useEffect, useCallback } from "react";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import Input from "components/common/formComponent/Input";
import Dropdown from "components/common/formComponent/Dropdown";
import ImageFile from "components/common/formComponent/ImageFile";
import CKEditor from "components/common/formComponent/CKEditor";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import Messages from "components/common/alerts/messages/Index";
import { useNavigate } from "react-router-dom";
import { RecStatusValue, RecStatusValuebyName, StatusValue, blobFolder, anniesAnnualData } from "global/Enum";
import { useDispatch, useSelector } from "react-redux";
import { ValidationMsgs } from "global/ValidationMessages";
import { serverError, TitleNameHelper } from "services/common/helper/Helper";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import CreateFileHeader from "components/common/CreateFileHeader";
import DatePicker from "components/common/formComponent/DatePicker";
import TestimonialServicesCls from "services/admin/testimonial/TestimonialService";

const Create = () => {
    const { id } = useParams();
    const isAddMode = !id;
    const dispatch = useDispatch();
    const location = useSelector((store) => store?.location);
    const CompanyId = useSelector((store) => store?.CompanyConfiguration.id)
    const FolderPath = `/${blobFolder.temp}/${CompanyId}/${blobFolder.testimonial}`
    const [data, setData] = useState({});
    const navigate = useNavigate();

    const getTestimonialDataById = useCallback(() => {
        if (id) {
            dispatch(setAddLoading(true))

            TestimonialServicesCls.getTestimonialDetails(id)
                .then((res) => {
                    var response = res.data;
                    if (response.success) {
                        setData(response.data);
                    } else {
                        dispatch(setAlertMessage({
                            type: 'danger',
                            message: ValidationMsgs.brand.notFound
                        }));
                        navigate('/admin/Customer/testimonial');
                    }
                    dispatch(setAddLoading(false))
                })
                .catch((err) => {
                    dispatch(setAddLoading(false));
                });
        }
    }, [id]);

    const schema = Yup.object().shape({
        customerName: Yup.string().trim().required(ValidationMsgs.testimonial.nameRequired),
        customerEmail: Yup.string().trim().email().required(ValidationMsgs.testimonial.customerEmailRequired),
        recStatus: Yup.string().trim().required(ValidationMsgs.common.recStatusRequired),
        authorName: Yup.string().trim().required(ValidationMsgs.testimonial.authorRequired),
        comment: Yup.string().trim().required(ValidationMsgs.testimonial.commentRequired),
    });

    const createTestimonial = (values, resetForm) => {
        dispatch(setAddLoading(true))
        TestimonialServicesCls.createTestimonial({
            testimonialModel: {
                ...values,
                ...location,
            }
        }).then((response) => {
            dispatch(setAddLoading(false))

            if (response.data.success && response.data.data) {
                dispatch(
                    setAlertMessage({
                        type: "success",
                        message: ValidationMsgs.testimonial.created,
                    })
                );
                resetForm({});
                navigate(
                    "/admin/Customer/testimonial/edit/" +
                    response.data.data.id
                );
            } else {
                dispatch(
                    setAlertMessage({ type: "danger", message: serverError(response) })
                );
            }

        }).catch(err => {
            dispatch(setAddLoading(false))
            dispatch(setAlertMessage({ type: "danger", message: ValidationMsgs.testimonial.notCreated }));
        });
    }

    const updateTestimonial = (values) => {
        dispatch(setAddLoading(true));
        TestimonialServicesCls.updateTestimonial({
            testimonialModel: {
                ...values,
                ...location,
            }
        }).then((response) => {
            if (response.data.success) {
                dispatch(
                    setAlertMessage({
                        message: ValidationMsgs.testimonial.updated,
                        type: "success",
                    })
                );
                getTestimonialDataById();
            } else {
                dispatch(
                    setAlertMessage({ type: "danger", message: serverError(response) })
                );
            }
            dispatch(setAddLoading(false));
        }).catch((errors) => {
            if (errors?.response?.data?.Errors?.Error) {
                dispatch(
                    setAlertMessage({
                        message: errors.response.data.Errors.Error,
                        type: "danger",
                    })
                );
            } else {
                dispatch(
                    setAlertMessage({ message: ValidationMsgs.testimonial.notUpdated, type: "danger" })
                );
            }
            dispatch(setAddLoading(false));
        });
    }

    const submitHandler = (values, { resetForm }) => {
        if (isAddMode) {
            createTestimonial(values, resetForm);
        } else {
            updateTestimonial(values, resetForm);
        }
    }

    useEffect(() => {
        getTestimonialDataById();
    }, [id, getTestimonialDataById])

    return (
        <>
            <title>{isAddMode ? "Add " : "Edit "} {TitleNameHelper({ defaultTitleName: "Testimonial" })}</title>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    id: data?.id || 0,
                    storeId: anniesAnnualData.storeId,
                    customerName: data?.customerName || "",
                    customerEmail: data?.customerEmail || "",
                    imagePath: data?.imagePath || "",
                    comment: data?.comment || "",
                    authorName: data?.authorName || "",
                    testimonialDate: data?.testimonialDate || new Date(),
                    recStatus: data?.recStatus || RecStatusValuebyName.Active,
                    approveStatus: data?.approveStatus || RecStatusValuebyName.Pending,
                    rowVersion: data?.rowVersion || null,
                }}
                onSubmit={submitHandler}
                validationSchema={schema}
                validateOnMount={true}
            >
                {({ errors, setFieldValue, values }) => {
                    return (
                        <FormikForm>
                            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full">
                                {/* Page header */}
                                <CreateFileHeader url={`/admin/Customer/testimonial`} module={`${isAddMode ? 'Create' : 'Edit'} Testimonial`} errors={errors} />
                                <Messages />
                                <div className="grid grid-cols-12 gap-6">
                                    <div className="col-span-full xl:col-span-9">
                                        <div className="w-full bg-white shadow-lg rounded-md border border-neutral-200 p-6 mb-6">
                                            <div className="w-full mb-6 flex justify-between gap-2 items-center">
                                                <div className="w-full">
                                                    <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                                                        Customer Name
                                                        <span className="text-rose-500 text-lg leading-none">*</span>
                                                    </label>
                                                    <Input
                                                        type={"text"}
                                                        name={`customerName`}
                                                        id="customerName"
                                                        className={`block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md`}
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full">
                                                <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                                                    Comment
                                                    <span className="text-rose-500 text-lg leading-none">*</span>
                                                </label>
                                                <CKEditor
                                                    type="simple"
                                                    name={"comment"}
                                                    defaultValue={values.comment}
                                                    onChange={(value) => {
                                                        setFieldValue("comment", value);
                                                    }}
                                                    loading={data?.comment}
                                                />

                                            </div>
                                            <div className="w-full mb-6 flex justify-between gap-2 items-center">
                                                <div className="w-full">
                                                    <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                                                        Author
                                                        <span className="text-rose-500 text-lg leading-none">*</span>
                                                    </label>
                                                    <Input
                                                        type={"text"}
                                                        name={`authorName`}
                                                        id="authorName"
                                                        className={`block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md`}
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full mb-6 flex justify-between gap-2 items-center">
                                                <div className="w-full">
                                                    <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                                                        Customer Email
                                                        <span className="text-rose-500 text-lg leading-none">*</span>
                                                    </label>
                                                    <Input
                                                        type={"text"}
                                                        name={`customerEmail`}
                                                        id="customerEmail"
                                                        className={`block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md`}
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full mb-6 flex justify-between gap-2 items-center">
                                                <div className="w-full">
                                                    <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                                                        Testimonial Date
                                                    </label>
                                                    <DatePicker
                                                        name={"testimonialDate"}
                                                        defaultValue={values.testimonialDate}
                                                        onChange={(e) => { setFieldValue("testimonialDate", e) }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full mb-6 relative">
                                                <div className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                                                    Image
                                                </div>
                                                <div >
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
                                                    Recommended size for image is 1920 x 600 pixel and it's mandatory for
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
                                        </div>
                                    </div>
                                    <div className="flex flex-col col-span-full xl:col-span-3">
                                        <div className="w-full bg-white shadow-xxl rounded-md mb-6">
                                            <div className="border-b-2 border-neutral-200 p-6">
                                                <div className="block uppercase tracking-wide text-gray-500 text-base font-bold mb-2">
                                                    Status
                                                    <span className="text-rose-500 text-lg leading-none">*</span>
                                                </div>
                                                <Dropdown
                                                    className="block w-full bg-white focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md"
                                                    label="recStatus"
                                                    defaultValue={values.recStatus}
                                                    isMulti={false}
                                                    isClearable={false}
                                                    name="recStatus"
                                                    options={RecStatusValue}
                                                    isSearchable={false}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full bg-white shadow-xxl rounded-md mb-6">
                                            <div className="border-b-2 border-neutral-200 p-6">
                                                <div className="block uppercase tracking-wide text-gray-500 text-base font-bold mb-2">
                                                    Approval
                                                    <span className="text-rose-500 text-lg leading-none">*</span>
                                                </div>
                                                <Dropdown
                                                    className="block w-full bg-white focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md"
                                                    label="approveStatus"
                                                    defaultValue={values.approveStatus}
                                                    isMulti={false}
                                                    isClearable={false}
                                                    name="approveStatus"
                                                    options={StatusValue}
                                                    isSearchable={false}
                                                />
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

export default Create;
