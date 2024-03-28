import React, { useState, useEffect, useRef, useCallback } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Input from "components/common/formComponent/Input";
import Transition from "utils/Transition";
import { ValidationMsgs } from "global/ValidationMessages";
import { paginationDetails, blobFolder } from "global/Enum";
import { useDispatch, useSelector } from "react-redux";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import MailServices from "services/admin/mail/MailServices";
import CKEditor from "components/common/formComponent/CKEditor";
import { useParams } from "react-router-dom";
import FileComponent from "components/common/formComponent/File";
import { serverError } from "services/common/helper/Helper";
import CustomreportServices from "services/admin/reports/customReports/CustomReports";

const CustomerReplyEmailModel = ({
  SetShowReplyEmailModel,
  ShowReplyEmailModel,
  EmailDataId,
  setEmailAPI,
  storeId,
}) => {
  const { id } = useParams();
  const CompanyId = useSelector((store) => store?.CompanyConfiguration.id);
  const FolderPath = `/${blobFolder.temp}/${CompanyId}/${blobFolder.resendEmailAttachments
    }${!id ? "/0" : `/${id}`}/resendEmailAttachments`;
  const permission = useSelector(store => store.permission);

  const [showEmailDetail, setShowEmailDetail] = useState(true);
  const dispatch = useDispatch();
  const [Data, setData] = useState([]);
  const AdminAppConfigReducers = useSelector((store) => store?.AdminAppConfigReducers);
  const location = useSelector((store) => store?.location);
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
  });

  const schema = Yup.object().shape({
    from: Yup.string().trim()
      .email(ValidationMsgs.user.Email)
      .required(ValidationMsgs.user.emailRequired),
    toEmail: Yup.string().trim()
      .email(ValidationMsgs.user.Email)
      .required(ValidationMsgs.user.emailRequired),
    subject: Yup.string().trim().required(ValidationMsgs.customer.subjectRequired),
    body: Yup.string().trim().required(ValidationMsgs.customer.emailBodyRequired),
  });

  const InquiriesGetById = useCallback(() => {
    dispatch(setAddLoading(true));

    CustomreportServices.InquiriesListGetById(EmailDataId?.id)
      .then((response) => {
        setData(response?.data?.data);
        dispatch(setAddLoading(false));
      })
      .catch(() => {
        dispatch(setAddLoading(false));
      });
  }, [EmailDataId]);
  const ResendEmailHandler = (values, { resetForm }) => {
    dispatch(setAddLoading(true));
    CustomreportServices.InquiriesResendMail({
      inquiriesresendmailmodel: {
        toEmail: values.toEmail,
        subject: values.subject,
        body: values.body,
        attachmentsFilePath: values.attachmentsFilePath,
        storeId: storeId,
        ipAddress: location.ipAddress,
        name: Data?.name,
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
          dispatch(setAddLoading(false));
        } else {
          dispatch(
            setAlertMessage({
              message: serverError(response),
              type: "danger",
            })
          );
          dispatch(setAddLoading(false));
        }
      })
      .catch((errors) => {
        dispatch(
          setAlertMessage({
            message: ValidationMsgs.profile.myAccount.emailNotSend,
            type: "danger",
          })
        );
        dispatch(setAddLoading(false));
      });
    resetForm({});
    SetShowReplyEmailModel(false);
  };

  useEffect(() => {
    if (EmailDataId?.id) {
      InquiriesGetById();
    }
  }, [EmailDataId?.id]);

  return (
    <>
      <Transition
        className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"
        show={ShowReplyEmailModel}
        tag="div"
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        onClick={() => SetShowReplyEmailModel(false)}
      />
      <Transition
        className="fixed inset-0 z-50 overflow-hidden flex items-center my-4 justify-center transform px-4 sm:px-6"
        show={ShowReplyEmailModel}
        tag="div"
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div className="bg-white rounded shadow-lg overflow-auto max-w-[560px] w-full max-h-full">
          <div className="px-5 py-3 border-b border-neutral-200">
            <div className="flex justify-between items-center">
              <div className="font-semibold text-gray-800">Reply Email</div>
              <button
                className="text-gray-400 hover:text-gray-500"
                onClick={() => SetShowReplyEmailModel(false)}
              >
                <div className="sr-only">Close</div>
                <svg className="w-4 h-4 fill-current">
                  <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z">
                    {" "}
                  </path>
                </svg>
              </button>
            </div>
          </div>
          <Formik
            enableReinitialize={true}
            initialValues={{
              // id: customerInfo.id,
              from: Data?.email || "",
              toEmail: Data?.email || "",
              subject: Data?.subject || "",
              body: Data?.comment || "",
              attachmentsFilePath: "",
            }}
            onSubmit={ResendEmailHandler}
            validationSchema={schema}
            validateOnMount={true}
          >
            {({
              errors,
              touched,
              setFieldValue,
              values,
              handleSubmit,
              resetForm,
            }) => {
              let catalogFileUrl = values.attachmentsFilePath.split("/");
              return (
                <>
                  <Form>
                    <div className="px-5">
                      <div className="text-sm flex flex-wrap justify-start text-left -mx-4">
                        <div className="w-full p-4">
                          <div className="col-span-12 md:col-span-6">
                            <label
                              className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                              htmlFor="grid-first-name"
                            >
                              From
                              <span className="text-rose-500 text-2xl leading-none">
                                *
                              </span>
                            </label>
                            <Input
                              id="from"
                              disabled={showEmailDetail}
                              name="from"
                              className="form-input w-full bg-slate-200"
                              placeholder="abc@gmail.com"
                              value={values.from}
                            />
                          </div>
                          <div className="col-span-12 md:col-span-6">
                            <label
                              className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                              htmlFor="grid-first-name"
                            >
                              Reply To
                              <span className="text-rose-500 text-2xl leading-none">
                                *
                              </span>
                            </label>
                            <Input
                              id="toEmail"
                              disabled={!showEmailDetail}
                              name="toEmail"
                              className="form-input w-full"
                              placeholder="Test@gmail.com"
                              value={values.toEmail}
                            />
                          </div>
                          <div className="col-span-12 md:col-span-6 mt-2">
                            <label
                              className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                              htmlFor="grid-first-name"
                            >
                              Subject
                              <span className="text-rose-500 text-2xl leading-none">
                                *
                              </span>
                            </label>
                            <Input
                              id="subject"
                              disabled={!showEmailDetail}
                              name="subject"
                              className="form-input w-full"
                              placeholder="subject"
                              defaultValue={values.subject}
                            />
                          </div>
                          <div className="col-span-12 md:col-span-6 mt-2">
                            <label
                              className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                              htmlFor="grid-first-name"
                            >
                              Body
                              <span className="text-rose-500 text-2xl leading-none">
                                *
                              </span>
                            </label>
                            {/* <Textarea name={'Body'} defaultValue={values?.Body} id="Body" cols="30" rows="3" /> */}
                            <CKEditor
                              type="simple"
                              name={"body"}
                              id="body"
                              maxLength={350}
                              defaultValue={values.comment}
                              loading={Data?.comment}
                            />
                          </div>
                          <div className="col-span-12 md:col-span-6 mt-2">
                            <label
                              className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                              htmlFor="grid-first-name"
                            >
                              Attachments
                            </label>
                            <FileComponent
                              type="file"
                              className="w-full px-2 py-1 text-sm leading-7 bg-slate-100 border border-neutral-200 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md"
                              folderpath={`${FolderPath}`}
                              name="attachmentsFilePath"
                              // filePath={'files'}
                              // isChangeDefaultName={true}
                              value={
                                catalogFileUrl
                                  ? catalogFileUrl[catalogFileUrl.length - 1]
                                  : ""
                              }
                              onChange={(imgUrl) => {
                                setFieldValue(
                                  "attachmentsFilePath",
                                  imgUrl.replace(`/${AdminAppConfigReducers["cdn:RootDirectory"]}/`, "")
                                );
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-5 py-4">
                      <div className="flex flex-wrap justify-end space-x-2">
                        {(permission?.isEdit || permission?.isDelete) &&
                          <button
                            className={`flex justify-center btn px-6 bg-indigo-500 hover:bg-indigo-600 text-white`}
                          >
                            <div
                              className={`w-full flex justify-center align-middle `}
                            >
                              Send
                            </div>
                          </button>
                        }
                        <button
                          type="button"
                          className="btn bg-white border-neutral-200 text-gray-500 hover:text-gray-700"
                          onClick={() => {
                            SetShowReplyEmailModel(false);
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </Form>
                </>
              );
            }}
          </Formik>
        </div>
      </Transition>
    </>
  );
};

export default CustomerReplyEmailModel;
