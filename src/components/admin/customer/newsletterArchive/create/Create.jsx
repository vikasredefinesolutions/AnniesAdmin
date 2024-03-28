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
import {
  RecStatusValue,
  RecStatusValuebyName,
  blobFolder,
  anniesAnnualData,
} from "global/Enum";
import { useDispatch, useSelector } from "react-redux";
import { ValidationMsgs } from "global/ValidationMessages";
import { serverError, TitleNameHelper } from "services/common/helper/Helper";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import CreateFileHeader from "components/common/CreateFileHeader";
import NewsLetterArchiveServices from "services/admin/newsletterArchive/NewsLetterArchiveServices";

const Create = () => {
  const { id } = useParams();
  const isAddMode = !id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useSelector((store) => store?.location);
  const CompanyId = useSelector((store) => store?.CompanyConfiguration.id);
  const FolderPath = `/${blobFolder.temp}/${CompanyId}/${blobFolder.newsLetterArchive}`;
  const [data, setData] = useState({});

  const getNewsLetterArchiveDetails = useCallback(() => {
    if (id) {
      dispatch(setAddLoading(true));
      NewsLetterArchiveServices.getNewsLetterArchiveDetails(id)
        .then((res) => {
          var response = res.data;
          if (response.success && response.data) {
            setData(response.data);
            dispatch(setAddLoading(false));
          } else {
            dispatch(
              setAlertMessage({
                type: "danger",
                message: ValidationMsgs.brand.notFound,
              })
            );
            navigate("/admin/Customer/newsLetterArchive");
          }
          dispatch(setAddLoading(false));
        })
        .catch((err) => {
          dispatch(setAddLoading(false));
        });
    }
  }, [id]);

  const schema = Yup.object().shape({
    title: Yup.string()
      .trim()
      .required(ValidationMsgs.newsLetterArchive.titleRequired),
    recStatus: Yup.string()
      .trim()
      .required(ValidationMsgs.common.recStatusRequired),
    author: Yup.string()
      .trim()
      .required(ValidationMsgs.newsLetterArchive.authorRequired),
    pageUrl: Yup.string()
      .trim()
      .required(ValidationMsgs.newsLetterArchive.pageUrl),
    description: Yup.string()
      .trim()
      .required(ValidationMsgs.newsLetterArchive.descriptionRequired),
    subDescription: Yup.string()
      .trim()
      .required(ValidationMsgs.newsLetterArchive.subDescriptionRequired),
  });

  const createNewsLetterArchive = (values, resetForm) => {
    dispatch(setAddLoading(true));
    NewsLetterArchiveServices.createNewsLetterArchive({
      newsLetterArchiveModel: { ...values, ...location },
    })
      .then((response) => {
        if (response.data.success && response.data.data) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.newsLetterArchive.created,
            })
          );
          getNewsLetterArchiveDetails();
          return navigate(
            "/admin/Customer/newsLetterArchive/edit/" + response.data.data.id
          );
        } else {
          dispatch(
            setAlertMessage({ type: "danger", message: serverError(response) })
          );
        }
        dispatch(setAddLoading(false));
      })
      .catch((err) => {
        dispatch(setAddLoading(false));
        dispatch(
          setAlertMessage({
            type: "danger",
            message: ValidationMsgs.newsLetterArchive.notCreated,
          })
        );
      });
  };

  const updateNewsLetterArchive = (values) => {
    dispatch(setAddLoading(true));
    NewsLetterArchiveServices.updateNewsLetterArchive({
      newsLetterArchiveModel: { ...values, ...location },
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(
            setAlertMessage({
              message: ValidationMsgs.newsLetterArchive.updated,
              type: "success",
            })
          );
          getNewsLetterArchiveDetails();
        } else {
          dispatch(
            setAlertMessage({ type: "danger", message: serverError(response) })
          );
        }
        dispatch(setAddLoading(false));
      })
      .catch((errors) => {
        if (errors?.response?.data?.Errors?.Error) {
          dispatch(
            setAlertMessage({
              message: errors.response.data.Errors.Error,
              type: "danger",
            })
          );
        } else {
          dispatch(
            setAlertMessage({
              message: ValidationMsgs.newsLetterArchive.notUpdated,
              type: "danger",
            })
          );
        }
        dispatch(setAddLoading(false));
      });
  };

  const submitHandler = (values, { resetForm }) => {
    if (isAddMode) {
      createNewsLetterArchive(values, resetForm);
    } else {
      updateNewsLetterArchive(values, resetForm);
    }
  };

  useEffect(() => {
    getNewsLetterArchiveDetails();
  }, [id, getNewsLetterArchiveDetails]);

  return (
    <>
      <title>
        {isAddMode ? "Add " : "Edit "}{" "}
        {TitleNameHelper({ defaultTitleName: "NewsLetter Archive" })}
      </title>
      <Formik
        enableReinitialize={true}
        initialValues={{
          id: data?.id || 0,
          storeId: anniesAnnualData.storeId,
          title: data?.title || "",
          subTitle: data?.subTitle || "",
          imagePath: data?.imagePath || "",
          description: data?.description || "",
          pageUrl:
            data?.pageUrl ||
            (data?.title &&
              data?.title.trim().replaceAll(" ", "-").toLowerCase()) ||
            "",
          subDescription: data?.subDescription || "",
          author: data?.author || "",
          recStatus: data?.recStatus || RecStatusValuebyName.Active,
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
                <CreateFileHeader
                  url={`/admin/Customer/newsLetterArchive`}
                  module={`${isAddMode ? "Create" : "Edit"} Newsletter Archive`}
                  errors={errors}
                />
                <Messages />
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-full xl:col-span-9">
                    <div className="w-full bg-white shadow-lg rounded-md border border-neutral-200 p-6 mb-6">
                      <div className="w-full mb-6 relative">
                        <div className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                          NewsLetter Archive Image
                        </div>
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
                          Recommended size for image is 1920 x 600 pixel and
                          it's mandatory for user to compress logo via &nbsp;
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
                      <div className="w-full mb-6 flex justify-between gap-2 items-center">
                        <div className="w-full">
                          <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                            Title
                            <span className="text-rose-500 text-lg leading-none">
                              *
                            </span>
                          </label>
                          <Input
                            type={"text"}
                            name={`title`}
                            id="title"
                            className={`block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md`}
                            onChange={(e) => {
                              if (e) {
                                setFieldValue("title", e.target.value);
                                setFieldValue(
                                  "pageUrl",
                                  e.target.value
                                    .trim()
                                    .replaceAll(" ", "-")
                                    .toLowerCase()
                                );
                              }
                            }}
                          />
                        </div>
                      </div>
                      <div className="w-full mb-6 flex justify-between gap-2 items-center">
                        <div className="w-full">
                          <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                            Sub Title
                            {/* <span className="text-rose-500 text-lg leading-none">*</span> */}
                          </label>
                          <Input
                            type={"text"}
                            name={`subTitle`}
                            id="subTitle"
                            className={`block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md`}
                          />
                        </div>
                      </div>
                      <div className="w-full mb-6 flex justify-between gap-2 items-center">
                        <div className="w-full">
                          <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                            SE Name
                            <span className="text-rose-500 text-lg leading-none">
                              *
                            </span>
                          </label>
                          <Input
                            disabled={true}
                            type={"text"}
                            name={`pageUrl`}
                            id="pageUrl"
                            className={`block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md`}
                          />
                        </div>
                      </div>
                      <div className="w-full">
                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                          Description
                          <span className="text-rose-500 text-lg leading-none">
                            *
                          </span>
                        </label>
                        <CKEditor
                          type="simple"
                          name={"description"}
                          defaultValue={values.description}
                          onChange={(value) => {
                            setFieldValue("description", value);
                          }}
                          loading={data?.description}
                        />
                      </div>
                      <div className="w-full">
                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                          Individual Description
                          <span className="text-rose-500 text-lg leading-none">
                            *
                          </span>
                        </label>
                        <CKEditor
                          type="simple"
                          name={"subDescription"}
                          defaultValue={values.subDescription}
                          onChange={(value) => {
                            setFieldValue("subDescription", value);
                          }}
                          loading={data?.subDescription}
                        />
                      </div>
                      <div className="w-full mb-6 flex justify-between gap-2 items-center">
                        <div className="w-full">
                          <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                            Author
                            <span className="text-rose-500 text-lg leading-none">
                              *
                            </span>
                          </label>
                          <Input
                            type={"text"}
                            name={`author`}
                            id="author"
                            className={`block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col col-span-full xl:col-span-3">
                    <div className="w-full bg-white shadow-xxl rounded-md mb-6">
                      <div className="border-b-2 border-neutral-200 p-6">
                        <div className="block uppercase tracking-wide text-gray-500 text-base font-bold mb-2">
                          Status
                          <span className="text-rose-500 text-lg leading-none">
                            *
                          </span>
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
