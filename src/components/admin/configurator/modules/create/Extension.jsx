import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form as FormikForm, Formik } from "formik";
import * as Yup from "yup";

import { ValidationMsgs } from "global/ValidationMessages";
import { RecStatusValuebyName } from "global/Enum";

import { serverError, TitleNameHelper } from "services/common/helper/Helper";
import NavigationService from "services/admin/module/NavigationService";
import ExtensionService from "services/admin/module/ExtensionService";

import { getMenuListForSideBar } from "redux/GetMenuListByUserRole/MenuListByUserRoleActions";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";

import CreateFileHeader from "components/common/CreateFileHeader";
import Dropdown from "components/common/formComponent/Dropdown";
import Messages from "components/common/alerts/messages/Index";
import Input from "components/common/formComponent/Input";

const AddExtenstion = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const location = useSelector((store) => store?.location);
  const CurrentUserObject = useSelector((store) => store?.user);
  const CompanyId = useSelector((store) => store?.CompanyConfiguration?.id)

  const [data, setData] = useState({});
  const [parentOptions, setParentOptions] = useState([]);

  const isAddMode = !id;

  const validationSchema = Yup.object({
    name: Yup.string().trim().required(ValidationMsgs.extension.nameRequired),
    accessRightModuleId: Yup.number(
      ValidationMsgs.extension.parnetIdTypeError
    ),
    navigationurl: Yup.string().trim().required(
      ValidationMsgs.extension.navigationUrlRequired
    ),
  });

  const getExtensionDetails = useCallback(() => {
    dispatch(setAddLoading(true))

    ExtensionService.getExtensionById(id)
      .then((res) => {
        var response = res.data;
        if (response.success) {
          setData({
            id: response.data.id,
            name: response.data.name,
            accessRightModuleId: response.data.accessRightModuleId,
            accesscode: response.data.accesscode,
            navigationurl: response.data.navigationurl,
            menuicon: response.data.menuicon,
            recStatus: response.data.recStatus,
            rowVersion: response.data.rowVersion,
          });
        }
        dispatch(setAddLoading(false))
      })
      .catch((err) => {
        dispatch(setAddLoading(false))

      });
  }, [id])

  function createExtension(fields, resetForm) {
    dispatch(setAddLoading(true))
    ExtensionService.createExtension({

      accessRightModel: {
        ...fields,
        navigationurl: '/' + fields.navigationurl.replace(/^\/+|\/+$/g, ''),
        accessRightModuleId: (fields.accessRightModuleId && fields.accessRightModuleId !== "" ? fields.accessRightModuleId : 0),
        ...location
      },
    }).then((response) => {
      if (response.data.success) {
        if (CurrentUserObject?.id && CompanyId) {
          dispatch(getMenuListForSideBar({ userId: CurrentUserObject.id, isSuperUser: CurrentUserObject.isSuperUser, CompanyId: CompanyId }))
        }
        dispatch(
          setAlertMessage({
            view: true,
            type: "success",
            message: ValidationMsgs.extension.created,
          })
        );

        resetForm({});
        navigate(
          `/admin/configurator/Modules/Extension/edit/${response.data.data.id}`
        );
      } else {
        dispatch(
          setAlertMessage({ type: "danger", message: serverError(response) })
        );
      }
      dispatch(setAddLoading(false))

    }).catch((errors) => {
      dispatch(
        setAlertMessage({
          view: true,
          type: "danger",
          message: ValidationMsgs.extension.notCreated,
        })
      );
      dispatch(setAddLoading(false))

    });
  }

  function updateExtension(fields, resetForm) {
    dispatch(setAddLoading(true))

    ExtensionService.updateExtension({
      accessRightModel: {
        ...fields,
        navigationurl: '/' + fields.navigationurl.replace(/^\/+|\/+$/g, ''),
        accessRightModuleId: (fields.accessRightModuleId && fields.accessRightModuleId !== "" ? fields.accessRightModuleId : 0),
        ...location
      },
    }).then((response) => {
      if (response.data.success) {
        dispatch(
          setAlertMessage({
            view: true,
            type: "success",
            message: ValidationMsgs.extension.updated,
          })
        );
        getExtensionDetails();
        if (CurrentUserObject?.id && CompanyId) {
          dispatch(getMenuListForSideBar({ userId: CurrentUserObject.id, isSuperUser: CurrentUserObject.isSuperUser, CompanyId: CompanyId }))
        }
      } else {
        dispatch(
          setAlertMessage({ type: "danger", message: serverError(response) })
        );
      }
      dispatch(setAddLoading(false))

    }).catch((errors) => {
      dispatch(
        setAlertMessage({
          view: true,
          type: "danger",
          message: ValidationMsgs.extension.notUpdated,
        })
      );
      dispatch(setAddLoading(false))

    });
  }

  function onSubmit(fields, { resetForm }) {
    if (isAddMode) {
      createExtension(fields, resetForm);
    } else {
      updateExtension(fields, resetForm);
    }
  }

  useEffect(() => {
    NavigationService.getDropdownValues(id ? id : -1).then((res) => {
      if (res.data.success) {
        setParentOptions(() => {
          return res.data.data;
        });
      }
    });
  }, []);

  useEffect(() => {
    if (!isAddMode) {
      getExtensionDetails();
    }
  }, [id]);

  return (
    <>
      <title>{isAddMode ? "Add " : "Edit "} {TitleNameHelper({ defaultTitleName: "Extension" })} </title>
      <Formik
        enableReinitialize={true}
        initialValues={{
          id: data?.id || 0,
          name: data?.name || "",
          accessRightModuleId: data?.accessRightModuleId || "",
          accesscode: data?.accesscode || "",
          navigationurl: data?.navigationurl || "",
          menuicon: data?.menuicon || "",
          recStatus: data?.recStatus || RecStatusValuebyName.Active,
          rowVersion: data?.rowVersion || null,
        }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnMount={true}
      >
        {({ errors, touched, setFieldValue, values, validateForm }) => {
          return (
            <FormikForm>
              <div className="px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto">

                <CreateFileHeader url="/admin/configurator/Modules" module={`${isAddMode ? "Add " : "Edit "} ${TitleNameHelper({ defaultTitleName: "Extension" })} `} errors={errors} validateForm={validateForm} />
                <Messages />
                <div className="bg-white shadow-lg rounded-md mb-8">
                  <section className="space-y-6">
                    <div className="grid grid-cols-3 gap-6 p-6">
                      <div className="w-full">
                        <label
                          className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                          htmlFor=""
                        >
                          Name
                          <span className="text-rose-500 text-2xl leading-none">
                            *
                          </span>
                        </label>
                        <div>
                          <Input type={"text"} name="name" />
                        </div>
                      </div>
                      <div className="w-full" id="page_option1">
                        <label
                          className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                          htmlFor=""
                        >
                          Select Parent
                          <span className="text-rose-500 text-2xl leading-none"></span>
                        </label>
                        <Dropdown
                          isMulti={false}
                          defaultValue={values.accessRightModuleId}
                          name={"accessRightModuleId"}
                          options={parentOptions}
                        />
                      </div>

                      <div className="w-full">
                        <label
                          className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                          htmlFor=""
                        >
                          Access Code
                          <span className="text-rose-500 text-2xl leading-none"></span>
                        </label>
                        <div>
                          <Input type="text" name="accesscode" />
                        </div>
                      </div>
                      <div className="w-full">
                        <label
                          className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                          htmlFor=""
                        >
                          Navigation URL
                          <span className="text-rose-500 text-2xl leading-none">
                            *
                          </span>
                        </label>
                        <div>
                          <Input type="text" name="navigationurl" />
                        </div>
                      </div>
                      <div className="w-full">
                        <label
                          className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                          htmlFor=""
                        >
                          Menu Icon
                          <span className="text-rose-500 text-2xl leading-none"></span>
                        </label>
                        <div>
                          <Input type="text" name="menuicon" />
                        </div>
                      </div>
                    </div>
                    {/* <div className="w-full" id="page_options">
                      <div className="flex items-center justify-between p-6">
                        <div>
                          {isAddMode === false && (
                            <>
                              {accessRightData.length !== 0 &&
                                <label
                                  className="flex flex-wrap uppercase tracking-wide text-gray-500 text-xs font-bold"
                                  htmlFor=""
                                >
                                  Add Action
                                  <span className="text-rose-500 text-2xl leading-none"></span>
                                </label>
                              }
                            </>
                          )}
                          {isAddMode === true ? (
                            <div>
                              <span className=" flex uppercase tracking-wide text-gray-500 text-sm font-bold mb-2 text-rose-500">
                                <span className="text-rose-500 text-2xl leading-none">
                                  *
                                </span>
                                Add extension is required for adding actions.
                              </span>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        {(permission?.isEdit || permission?.isDelete) && <div>
                          <button
                            type="button"
                            className={`btn bg-indigo-500 hover:bg-indigo-600 text-white disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-gray-500
                            ${accessRightId ? "cursor-pointer" : ""}`}
                            onClick={handleShowModal}
                            disabled={!accessRightId}
                          >
                            <span className="material-icons-outlined text-white ">
                              add_circle_outline
                            </span>
                            <span className="ml-1">Add Action</span>
                          </button>
                        </div>}
                      </div>

                      {accessRightData.length !== 0 && (
                        <div className="overflow-auto max-h-screen border-t border-neutral-200">
                          <table className="table-auto w-full text-sm text-[#191919] font-semibold">
                            <thead className="text-sm font-bold uppercase text-[#b3b3b3] border-b border-neutral-200">
                              <tr>
                                <th className="px-2 first:pl-5 py-4">
                                  <div className="font-semibold text-left w-28 max-w-sm flex items-center">
                                    <span>Action</span>
                                  </div>
                                </th>
                                <th className="px-2 first:pl-5 py-4">
                                  <div className="font-semibold text-left w-28 max-w-sm flex items-center">
                                    <span>Http Method</span>
                                  </div>
                                </th>
                                <th className="px-2 first:pl-5 py-4">
                                  <div className="font-semibold text-left w-28 max-w-sm flex items-center">
                                    <span>Url Pattern</span>
                                  </div>
                                </th>
                                <th className="px-2 first:pl-5 py-4">
                                  <div className="font-semibold text-left w-28 max-w-sm flex items-center">
                                    <div className="flex items-center"></div>
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-slate-200 border-b border-neutral-200">
                              {accessRightData.map((right, index) => {
                                return (
                                  <tr key={index}>
                                    <td className="px-2 first:pl-5 py-3">
                                      <div>{right.action}</div>
                                    </td>
                                    <td className="px-2 first:pl-5 py-3">
                                      <div className="w-full">
                                        {right.httpmethod}
                                      </div>
                                    </td>
                                    <td className="px-2 first:pl-5 py-3">
                                      <div>{right.urlpattern}</div>
                                    </td>
                                    <td className="px-2 first:pl-5 py-3">
                                      <div className="flex items-center">
                                        {right.recStatus !==
                                          RecStatusValuebyName.Archived && (
                                            <button
                                              type="button"
                                              className="text-rose-500 text-2xl font-semibold w-6 h-6"
                                              onClick={() => {
                                                setActionData(right);
                                                setOpenDeleteModal(true);
                                              }}
                                            >
                                              <span className="material-icons-outlined">
                                                close
                                              </span>
                                            </button>
                                          )}
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div> */}
                  </section>
                </div>
              </div>
            </FormikForm>
          );
        }}
      </Formik>
    </>
  );
};

export default AddExtenstion;
