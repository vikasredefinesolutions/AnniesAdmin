/*Component Name: MailLogSendAndResendEmailModel
Component Functional Details: User can create or update MailLogSendAndResendEmailModel master details from here.
Created By: Divyesh Shah
Created Date: 01/06/2023
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "components/common/formComponent/Input";
import Transition from "utils/Transition";
import { ValidationMsgs } from "global/ValidationMessages";
import { blobFolder } from 'global/Enum';
import { useDispatch, useSelector } from "react-redux";
import { setAddLoading } from 'redux/globalLoader/GlobalLoaderAction';
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import MailServices from 'services/admin/mail/MailServices';
import CKEditor from "components/common/formComponent/CKEditor";
import { useParams } from "react-router-dom";
import FileComponent from "components/common/formComponent/File";
import { serverError } from "services/common/helper/Helper";

const MailLogSendAndResendEmailModel = ({ SetShowResetEmailModel, ShowResetEmailModel, EmailDataId, storeId, getMailLog }) => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const CompanyId = useSelector((store) => store?.CompanyConfiguration.id)
    const location = useSelector((store) => store?.location);
    const AdminAppConfigReducers = useSelector((store) => store?.AdminAppConfigReducers);

    const FolderPath = `/${blobFolder.temp}/${CompanyId}/${blobFolder.resendEmailAttachments}${!id ? "/0" : `/${id}`}/resendEmailAttachments`

    const schema = Yup.object().shape({
        from: Yup.string().trim()
            .email(ValidationMsgs.user.Email)
            .required(ValidationMsgs.user.emailRequired),
        toEmail: Yup.string().trim()
            .email(ValidationMsgs.user.Email)
            .required(ValidationMsgs.user.emailRequired),
        subject: Yup.string().trim().required(ValidationMsgs.customer.subjectRequired),
        body: Yup.string().trim().required(ValidationMsgs.customer.emailBodyRequired),
    })

    const ResendEmailHandler = (values, { resetForm }) => {
        dispatch(setAddLoading(true))
        MailServices.reSendEmail({
            customerResendmail: {
                toEmail: values.toEmail,
                subject: values.subject,
                body: values.body,
                attachmentsFilePath: values.attachmentsFilePath,
                emailLogId: values.emailLogId,
                ipAddress: location.ipAddress,
                storeId: values.storeId,
            },
        })
            .then((response) => {
                if (response.data.data) {
                    dispatch(
                        setAlertMessage({
                            message: ValidationMsgs.profile.myAccount.emailSend,
                            type: "success",
                        })
                    );
                    getMailLog()
                    // getEmailListDataDetail();
                    dispatch(setAddLoading(false))
                } else {
                    dispatch(
                        setAlertMessage({
                            message: serverError(response),
                            type: "danger",
                        })
                    );
                    dispatch(setAddLoading(false))
                }
            })
            .catch((errors) => {
                dispatch(
                    setAlertMessage({
                        message: ValidationMsgs.profile.myAccount.emailNotSend,
                        type: "danger",
                    })
                );
                dispatch(setAddLoading(false))
            });
        SetShowResetEmailModel(false)
        resetForm({});
    };

    return (
        <>
            <Transition
                className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"
                show={ShowResetEmailModel}
                tag="div"
                enter="transition ease-out duration-200 transform"
                enterStart="opacity-0 -translate-y-2"
                enterEnd="opacity-100 translate-y-0"
                leave="transition ease-out duration-200"
                leaveStart="opacity-100"
                leaveEnd="opacity-0"
                onClick={() => SetShowResetEmailModel(false)}
            />
            <Transition
                className="fixed inset-0 z-50 overflow-hidden flex items-center my-4 justify-center transform px-4 sm:px-6"
                show={ShowResetEmailModel}
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
                            <div className="font-semibold text-gray-800">Resend Email</div>
                            <button className="text-gray-400 hover:text-gray-500" onClick={() => SetShowResetEmailModel(false)}>
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
                            // id: customerInfo.id,
                            emailLogId: EmailDataId?.original?.emailLogoId || 0,
                            from: EmailDataId?.original?.fromEmail || "",
                            toEmail: EmailDataId?.original?.toEmail || "",
                            subject: EmailDataId?.original?.subject || "",
                            body: EmailDataId?.original?.body || "",
                            attachmentsFilePath: "",
                            storeId: EmailDataId?.original?.storeId || 0
                        }}
                        onSubmit={ResendEmailHandler}
                        validationSchema={schema}
                        validateOnMount={true}
                    >
                        {({ errors, touched, setFieldValue, values, handleSubmit }) => {
                            let catalogFileUrl = values.attachmentsFilePath.split('/')
                            return (
                                <>
                                    <Form>
                                        <div className="px-5">
                                            <div className="text-sm flex flex-wrap justify-start text-left -mx-4">
                                                <div className="w-full p-4">
                                                    <div className="col-span-12 md:col-span-6">
                                                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">From<span className="text-rose-500 text-2xl leading-none">*</span></label>
                                                        <Input
                                                            id="from"
                                                            disabled={true}
                                                            name="from"
                                                            className="form-input w-full bg-slate-200"
                                                            placeholder="abc@gmail.com"
                                                            value={values.from}
                                                        />
                                                    </div>
                                                    <div className="col-span-12 md:col-span-6">
                                                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">To <span className="text-rose-500 text-2xl leading-none">*</span></label>
                                                        <Input
                                                            id="toEmail"
                                                            name="toEmail"
                                                            className="form-input w-full"
                                                            placeholder="Test@gmail.com"
                                                            value={values.toEmail}
                                                        />
                                                    </div>
                                                    <div className="col-span-12 md:col-span-6 mt-2">
                                                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">Subject<span className="text-rose-500 text-2xl leading-none">*</span></label>
                                                        <Input
                                                            id="subject"
                                                            name="subject"
                                                            className="form-input w-full"
                                                            placeholder="subject"
                                                            defaultValue={values.subject}
                                                        />
                                                    </div>
                                                    <div className="col-span-12 md:col-span-6 mt-2">
                                                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">Body<span className="text-rose-500 text-2xl leading-none">*</span></label>
                                                        <CKEditor
                                                            name={"body"}
                                                            id="body"
                                                            defaultValue={values.body}
                                                            loading={EmailDataId?.original?.body}
                                                            onChange={(value) => {
                                                                setFieldValue("body", value);
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="col-span-12 md:col-span-6 mt-2">
                                                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2" htmlFor="grid-first-name">Attachments</label>
                                                        <FileComponent
                                                            type="file"
                                                            className="w-full px-2 py-1 text-sm leading-7 bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                                                            folderpath={`${FolderPath}`}
                                                            name="attachmentsFilePath"
                                                            // filePath={'files'}
                                                            // isChangeDefaultName={true}
                                                            value={catalogFileUrl ? catalogFileUrl[catalogFileUrl.length - 1] : ""}
                                                            onChange={(imgUrl) => {
                                                                setFieldValue("attachmentsFilePath", imgUrl.replace(`/${AdminAppConfigReducers["cdn:RootDirectory"]}/`, ""));
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-5 py-4">
                                            <div className="flex flex-wrap justify-end space-x-2">
                                                <button
                                                    className={`flex justify-center btn px-6 bg-indigo-500 hover:bg-indigo-600 text-white`}                                            >
                                                    <div className={`w-full flex justify-center align-middle `}>
                                                        send
                                                    </div>
                                                </button>
                                                <button type='button' className="btn bg-white border-neutral-200 text-gray-500 hover:text-gray-700" onClick={() => SetShowResetEmailModel(false)}>Cancel</button>
                                            </div>
                                        </div >

                                    </Form>
                                </>
                            );
                        }}
                    </Formik>
                </div >
            </Transition >
        </>
    );
};

export default MailLogSendAndResendEmailModel;
