import React, { useState, useEffect, useCallback } from "react";
import { Formik, Form as FormikForm } from "formik";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";

import { ValidationMsgs } from "global/ValidationMessages";
import { RecStatusValuebyName } from "global/Enum";

import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { hideAlertMessage } from "redux/alertMessage/AlertMessageActions";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";

import StoriesCategory from "services/admin/storiesCategory/StoriesCategoryServices";
import { serverError, TitleNameHelper } from "services/common/helper/Helper";

import Dropdown from "components/common/formComponent/Dropdown";
import Messages from "components/common/alerts/messages/Index";
import Input from "components/common/formComponent/Input";

const AddStoriesCategoryModal = ({
  handleShowModal,
  getStoriesCategory,
  idson,
}) => {
  const permission = useSelector(store => store.permission);
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const location = useSelector((store) => store?.location);
  const isAddMode = idson ? false : true;
  const dispatch = useDispatch();

  const GlobalLoading = useSelector(
    (store) => store?.GlobalLoaderReducer?.toLoad
  );

  const initialValues = {
    id: data?.id || 0,
    name: data?.name || "",
    slug: data?.slug || "",
    parentId: data?.parentId || 0,
    rowVersion: data?.rowVersion || "",
    location: data?.location || "",
    ipAddress: location?.ipAddress || "",
    macAddress: location?.macAddress || "",
    recStatus: data?.recStatus || RecStatusValuebyName.Active,
  };

  const validationSchema = Yup.object({
    name: Yup.string().trim().required(
      ValidationMsgs.storiesCategory.categoryRequired
    ),
  });

  const getStoriesCategoryDropdown = useCallback(() => {
    StoriesCategory.getStoriesCategoryDropdown().then((res) => {
      if (res?.data?.success && res?.data?.data) {
        setCategory(() => {
          return res.data.data;
        });
      }
    });
  }, []);

  useEffect(() => {
    getStoriesCategoryDropdown();
  }, [getStoriesCategoryDropdown]);

  function createStoriesCategory(fields, resetForm) {
    dispatch(setAddLoading(true));
    StoriesCategory.createStoriesCategory({
      storiesCategoryModel: {
        name: fields.name,
        slug: fields.slug,
        parentId: fields.parentId,
        rowVersion: fields.rowVersion,
        recStatus: fields.recStatus,
        ...location,
      },
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.storiesCategory.storiesCategoryCreated,
            })
          );
          resetForm({});
          handleShowModal((prev) => !prev);
          getStoriesCategory();
        } else {
          dispatch(
            setAlertMessage({
              type: "danger",
              message: serverError(response),
            })
          );
        }
        dispatch(setAddLoading(false));
      })
      .catch((errors) => {
        dispatch(
          setAlertMessage({
            type: "danger",
            message: ValidationMsgs.storiesCategory.storiesCategoryNotCreated,
          })
        );
        dispatch(setAddLoading(false));
      });
  }

  function updateStoriesCategory(fields, resetForm) {
    dispatch(setAddLoading(true));
    StoriesCategory.updateStoriesCategory({
      storiesCategoryModel: { ...fields, ...location },
    })
      .then((response) => {
        if (response?.data?.success) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.storiesCategory.storiesCategoryUpdated,
            })
          );
          handleShowModal((prev) => !prev);
          resetForm({});
          getStoriesCategory();
        } else {
          dispatch(
            setAlertMessage({ type: "danger", message: serverError(response) })
          );
        }
        dispatch(setAddLoading(false));
      })
      .catch((errors) => {
        dispatch(
          setAlertMessage({
            type: "danger",
            message: ValidationMsgs.storiesCategory.storiesCategoryNotUpdated,
          })
        );
        dispatch(setAddLoading(false));
      });
  }

  useEffect(() => {
    if (idson) {
      dispatch(setAddLoading(true));
      StoriesCategory.getStoriesCategoryById(idson)
        .then((res) => {
          var response = res.data;
          if (response.success) {
            setData({ ...response.data });
          }
          dispatch(setAddLoading(false));
        })
        .catch((err) => {
          dispatch(setAddLoading(false));
        });
    }
  }, [idson]);

  const onSubmit = (fields, { resetForm }) => {
    if (idson) {
      updateStoriesCategory(fields, resetForm);
    } else {
      createStoriesCategory(fields, resetForm);
    }
  };

  const replaceSpecialCharaters = (e, setFieldValue) => {
    let newValue;
    if (e.target.value) {
      newValue = e.target.value.replace(/[^a-zA-Z0-9 ]/g, "-");
      setFieldValue("slug", newValue.replace(" ", "-").toLowerCase());
    }
  };

  useEffect(() => {
    dispatch(hideAlertMessage());
  }, []);


  return (
    <>
      <title>{isAddMode ? "Add " : "Edit "}{TitleNameHelper({ defaultTitleName: "Stories Category" })}</title>
      <div
        id="storiesCategoryModal"
        className="overflow-y-auto overflow-x-hidden z-30 fixed right-0 left-0 top-4 justify-center items-center h-modal md:h-full md:inset-0"
      >
        <div className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="relative px-4 w-full max-w-2xl h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow max-h-screen overflow-y-auto">
              <div className="flex justify-between items-start p-5 rounded-t border-b sticky top-0 left-0 bg-white">
                <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl">
                  {isAddMode ? "Add " : "Edit "} {TitleNameHelper({ defaultTitleName: "Stories Category" })}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                  data-modal-toggle="actionModal"
                  onClick={handleShowModal}
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
              <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
              >
                {({ setFieldValue, errors, values }) => {
                  return (
                    <FormikForm>
                      <Messages />
                      <div className="p-6">
                        <div className="w-full mb-4 last:mb-0">
                          <label
                            className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                            htmlFor="grid-first-name"
                          >
                            {"Category"}

                            <span className="text-rose-500 text-2xl leading-none">
                              *
                            </span>
                          </label>
                          <Input
                            type={""}
                            name="name"
                            maxLength={500}
                            onBlur={(e) => {
                              replaceSpecialCharaters(e, setFieldValue);
                            }}
                          />
                        </div>
                        <div className="w-full mb-4 last:mb-0">
                          <label
                            className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                            htmlFor="grid-first-name"
                          >
                            {"Category Slug"}
                          </label>
                          <Input type={""} name="slug" maxLength={500} />
                        </div>
                        <div>
                          <label
                            className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                            htmlFor="grid-first-name"
                          >
                            {"parent"}
                          </label>
                          <Dropdown
                            label="Parent"
                            name={"parentId"}
                            options={category.filter(
                              (Obj) => !Obj.value.includes(values.id)
                            )}
                            isMulti={false}
                            defaultValue={values.parentId}
                            placeholder="Select Category"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-end p-6 space-x-2 rounded-b border-t border-gray-200">
                        <button
                          // data-modal-toggle="actionModal"
                          type="button"
                          className="btn bg-white border-neutral-200 text-gray-500 hover:text-gray-700"
                          onClick={handleShowModal}
                        >
                          Cancel
                        </button>
                        {(permission.isEdit || permission.isDelete) &&
                          <button
                            disabled={GlobalLoading}
                            type="Submit"
                            className={`flex justify-center btn px-6 bg-indigo-500 hover:bg-indigo-600 text-white`}
                          >
                            <div
                              className={`w-full flex justify-center align-middle `}
                            >
                              {GlobalLoading && (
                                <span className="spinner-border spinner-border-sm mr-2"></span>
                              )}
                              Save
                            </div>
                          </button>
                        }
                      </div>
                    </FormikForm>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddStoriesCategoryModal;
