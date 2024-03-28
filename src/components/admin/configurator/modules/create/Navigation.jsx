/*Component Name: Navigation
Component Functional Details: User can create or update Navigation master details from here.
Created By: Shrey Patel
Created Date: 16/05/2022
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { ValidationMsgs } from "global/ValidationMessages";
import { RecStatusValue } from "global/Enum";

import NavigationService from "services/admin/module/NavigationService";
import { serverError, TitleNameHelper } from "services/common/helper/Helper";

import { getMenuListForSideBar } from "redux/GetMenuListByUserRole/MenuListByUserRoleActions";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";

import CreateFileHeader from "components/common/CreateFileHeader";
import Dropdown from "components/common/formComponent/Dropdown";
import Messages from "components/common/alerts/messages/Index";
import Input from "components/common/formComponent/Input";

const AddNavigation = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useSelector((store) => store?.location);
  const CurrentUserObject = useSelector((store) => store?.user);
  const CompanyId = useSelector((store) => store?.CompanyConfiguration?.id)

  const [data, setData] = useState({});
  const [parentOptions, setParentOptions] = useState([]);

  const isAddMode = !id;

  const validationSchema = Yup.object({
    name: Yup.string().trim().required(ValidationMsgs.navigation.nameRequired),
    recStatus: Yup.string().trim().required(ValidationMsgs.navigation.statusRequired),
    parentModuleId: Yup.number().typeError(
      ValidationMsgs.navigation.parentModuleIdTypeError
    ),
  });

  const getNavigationDetails = useCallback(() => {
    NavigationService.getNavigationsById(id)
      .then((res) => {
        const response = res.data;
        if (response.success) {
          setData(response.data);
        }
      })
      .catch((err) => { });
  }, [id])

  const createNavigation = (values, resetForm) => {
    dispatch(setAddLoading(true))

    NavigationService.createNavigation({
      accessRightModuleModel: {
        ...values,
        parentModuleId: (values.parentModuleId && values.parentModuleId !== "" ? values.parentModuleId : 0),
        ...location,
      }
    }).then((response) => {
      if (response.data.success) {
        dispatch(
          setAlertMessage({
            type: "success",
            message: "Navigation create successfully",
          })
        );
        resetForm({});

        if (CurrentUserObject?.id && CompanyId) {
          dispatch(getMenuListForSideBar({ userId: CurrentUserObject.id, isSuperUser: CurrentUserObject.isSuperUser, CompanyId: CompanyId }))
        }

        navigate(
          `/admin/configurator/Modules/Navigation/edit/${response.data.data.id}`
        );
      } else {
        dispatch(
          setAlertMessage({
            type: "danger",
            message: serverError(response),
          })
        );
      }
      dispatch(setAddLoading(false))

    }).catch((errors) => {
      dispatch(
        setAlertMessage({
          type: "danger",
          message: "Navigation is not created",
        })
      );
      dispatch(setAddLoading(false))

    });
  };

  const updateNavigation = (values, resetForm) => {
    dispatch(setAddLoading(true))

    NavigationService.updateNavigation({
      accessRightModuleModel: {
        ...values,
        parentModuleId: (values.parentModuleId && values.parentModuleId !== "" ? values.parentModuleId : 0),
        ...location,
      },
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(
            setAlertMessage({
              view: true,
              type: "success",
              message: "Extension Updated successfully.",
            })
          );
          getNavigationDetails();
          if (CurrentUserObject?.id && CompanyId) {
            dispatch(getMenuListForSideBar({ userId: CurrentUserObject.id, isSuperUser: CurrentUserObject.isSuperUser, CompanyId: CompanyId }))
          }
        } else {
          dispatch(
            setAlertMessage({
              view: true,
              type: "danger",
              message: serverError(response),
            })
          );
        }
        dispatch(setAddLoading(false))

      })
      .catch((errors) => {
        dispatch(
          setAlertMessage({
            view: true,
            type: "danger",
            message: "Extension is not updated.",
          })
        );
        dispatch(setAddLoading(false))

      });
  }

  const submitHandler = (values, { resetForm }) => {
    if (isAddMode) {
      createNavigation(values, resetForm);
    } else {
      updateNavigation(values, resetForm);
    }
  };

  useEffect(() => {
    NavigationService.getDropdownValues(id).then(
      (response) => {
        setParentOptions(() => {
          return response.data.data;
        });
      }
    );
  }, []);

  useEffect(() => {
    if (id) {
      getNavigationDetails();
    }
  }, [id]);

  const toolTipMessage = useMemo(() => `You need to enable the Navigation from Company Configuration (/admin/configurator/companyConfiguration/edit/{ID}).
  It should have at least one child extention than only this Navigation will be visible.`, [])

  return (
    <>
      <title>{isAddMode ? "Add " : "Edit "} {TitleNameHelper({ defaultTitleName: "Navigation" })}</title>
      {/* Page header  */}

      <Formik
        enableReinitialize={true}
        onSubmit={submitHandler}
        initialValues={{
          id: data?.id || 0,
          name: data?.name || "",
          parentModuleId: data?.parentModuleId || 0,
          menuicon: data?.menuicon || "",
          recStatus: data?.recStatus || '',
          rowVersion: data?.rowVersion || ''
        }}
        validationSchema={validationSchema}
        validateOnMount={true}
      >
        {({ setFieldValue, values, errors, validateForm }) => {
          return (
            <Form>
              <div className="px-4 sm:px-6 lg:px-8 py-8 w-full">

                <CreateFileHeader url={'/admin/configurator/Modules'} module={`${isAddMode ? "Add " : "Edit "} ${TitleNameHelper({ defaultTitleName: "Navigation" })}`} errors={errors} validateForm={validateForm} toolTipMessage={toolTipMessage} />
                <Messages />

                <div className="grid grid-cols-12 gap-6 pt-5">
                  <div className="col-span-full xl:col-span-9 bg-white shadow-lg rounded-sm mb-8">
                    <div className="p-3 mb-4">
                      {/* Size Chart Template Name */}
                      <div className="w-full  mb-4">
                        <div className="w-full px-2 py-2">
                          <label className="text-gray-500 font-bold flex">
                            Name <span className="text-rose-500">*</span>
                          </label>
                        </div>
                        <div className="w-full px-2 py-2 pt-0">
                          <Input
                            className="block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md"
                            type="text"
                            name="name"
                            placeholder="Enter Name"
                          />
                        </div>
                      </div>
                      {/* Dropdown list */}
                      <div className="w-full px-2 py-2 pt-0">
                        <div className="text-gray-500 font-bold flex">
                          Select Parent
                        </div>
                        <div>
                          <Dropdown
                            label="Select Parent"
                            isMulti={false}
                            name="parentModuleId"
                            options={parentOptions}
                            defaultValue={values.parentModuleId}
                          />
                        </div>
                      </div>
                      <div className="w-full  mb-4">
                        <div className="w-full px-2 py-2">
                          <label className="text-gray-500 font-bold flex">
                            Menu Icon
                          </label>
                        </div>
                        <div className="w-full px-2 py-2 pt-0">
                          <Input
                            type="text"
                            name="menuicon"
                            placeholder="Ex- fa-cog"
                          />
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="flex flex-col col-span-full xl:col-span-3">
                    <div className="w-full bg-white shadow-xxl rounded-md p-6 mb-6">
                      <div >
                        <div className="block uppercase tracking-wide text-gray-500 text-base font-bold mb-2">

                          Navigation Status
                          <span className="text-rose-500 text-2xl leading-none">
                            *
                          </span>
                        </div>
                        <Dropdown
                          hidecheckbox={false}
                          isMulti={false}
                          defaultValue={values.recStatus}
                          name={"recStatus"}
                          optionStyle={{ padding: "1px" }}
                          options={RecStatusValue}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default AddNavigation;
