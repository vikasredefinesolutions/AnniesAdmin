
/*Component Name: company configuration create
Component Functional Details: Here we are creating company configuration data .
Created By: Chandan 
Created Date: 06/09/2022 
Modified By: Chandan
Modified Date: 06/09/2022 */

import React, { useEffect, useState, Fragment, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form as FormikForm, Formik } from "formik";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

import { RecStatusValuebyName, blobFolder } from "global/Enum";
import { logoutTime } from "dummy/Dummy";
import { ValidationMsgs } from "global/ValidationMessages";

import { getMenuListForSideBar } from "redux/GetMenuListByUserRole/MenuListByUserRoleActions";

import CompanyConfigurationService from "services/admin/companyConfiguration/CompanyConfigurationService";
import { serverError, TitleNameHelper } from "services/common/helper/Helper";
import ModuleService from "services/admin/module/ModuleService";

import { storeCompanyConfigurationData } from "redux/CompanyConfiguration/CompanyConfigurationActions";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";

import ImageFile from "components/common/formComponent/ImageFile";
import CreateFileHeader from "components/common/CreateFileHeader";
import RadioButton from "components/common/formComponent/RadioButton";
import Dropdown from "components/common/formComponent/Dropdown";
import Messages from "components/common/alerts/messages/Index";
import Input from "components/common/formComponent/Input";

const CompanyConfiguration = () => {
  const { id } = useParams();
  const isAddMode = !id;
  const [modules, setModules] = useState([]);
  const [MWithSSubModule, setMWithSSubModule] = useState([]);
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const location = useSelector((store) => store?.location);
  const user = useSelector((store) => store?.user);
  const Company = useSelector((store) => store?.CompanyConfiguration)
  const FolderPath = `/${blobFolder.temp}/${Company?.id}/${blobFolder.companyConfiguration}`

  const getCompanyConfigurationData = useCallback(() => {
    if (!isAddMode) {
      dispatch(setAddLoading(true))

      CompanyConfigurationService.getCompanyConfigurationById(id)
        .then((res) => {
          var response = res.data;
          if (response.success) {
            setData({
              id: response.data.id,
              fullName: response.data.fullName,
              shortName: response.data.shortName,
              companyLogoURL: response.data.companyLogoURL,
              email: response.data.email,
              phone: response.data.phone,
              logoutTime: response.data.logoutTime,
              twoFactorEnabled: response.data.twoFactorEnabled,
              mS365Enabled: response.data.mS365Enabled,
              moduleId: response.data.moduleId,
              rowVersion: response.data.rowVersion,
              moduleData: response.data.moduleId
            });

            dispatch(setAddLoading(false))

          }
        })
        .catch((err) => { });
    }
  }, []);

  useEffect(() => {
    getCompanyConfigurationData();
  }, [getCompanyConfigurationData]);

  const getSidebarMenuList = useCallback(() => {
    if (user?.id && Company?.id) {
      dispatch(getMenuListForSideBar({ userId: user.id, isSuperUser: user.isSuperUser, CompanyId: Company?.id }))
    }
  }, [user, Company?.id]);

  const initialValues = {
    companyConfigurationData: {
      id: data?.id || 0,
      fullName: data?.fullName || "",
      shortName: data?.shortName || "",
      email: data?.email || "",
      phone: data?.phone || "",
      logoutTime: data?.logoutTime || "",
      companyLogoURL: data?.companyLogoURL || "",
      twoFactorEnabled: data?.twoFactorEnabled || true,
      mS365Enabled: data?.mS365Enabled || false,
      moduleId: data?.moduleId || [],
      recStatus: data?.recStatus || RecStatusValuebyName.Active,
      rowVersion: data?.rowVersion || null,
    },
    moduleData: data.moduleData || []
  };

  useEffect(() => {
    ModuleService.getNestedModules().then((module) => {
      setModules(module.data.data);

      let tempArr = []
      module.data.data.map((moData) => {
        if (moData?.subRows && moData.subRows.length > 0) {
          moData.subRows.map((subRows) => {
            tempArr.push(subRows)
          })
        }
        tempArr.push(moData)
      })

      setMWithSSubModule(tempArr);
    });
  }, []);

  function createCompanyConfiguration(fields, resetForm) {
    dispatch(setAddLoading(true))

    let companyModuleAccess = []

    fields.moduleData.map((moduleIdsData) => {
      const oldModuleDataFromBackend = MWithSSubModule.filter(mD => (mD.id === moduleIdsData));
      companyModuleAccess.push({
        "moduleId": moduleIdsData,
        "recStatus": "A",
        ...oldModuleDataFromBackend[0]
      })
    })

    fields.companyConfigurationData["companyModuleAccess"] = companyModuleAccess

    CompanyConfigurationService.createCompanyConfiguration({
      companyConfigurationModel: { ...fields.companyConfigurationData, ...location },
    }).then((response) => {
      if (response.data.success) {
        dispatch(
          setAlertMessage({
            view: true,
            message: ValidationMsgs.companyConfiguration.created,
            type: "success",
          })
        );
        resetForm({});
        dispatch(setAddLoading(false))
        getSidebarMenuList();
      } else {
        dispatch(
          setAlertMessage({
            view: true,
            message: serverError(response),
            type: "danger",
          })
        );
      }
      dispatch(setAddLoading(false))
    }).catch((errors) => {
      dispatch(
        setAlertMessage({
          view: true,
          message: errors.response.data.Errors.Error,
          type: "danger",
        })
      );
      dispatch(setAddLoading(false))
    });
  }

  function updateCompanyConfiguration(fields, resetForm) {
    dispatch(setAddLoading(true))
    let companyModuleAccess = []

    fields.moduleData.map((moduleIdsData) => {
      const oldModuleDataFromBackend = MWithSSubModule.filter(mD => mD.id === moduleIdsData);

      companyModuleAccess.push({
        "moduleId": moduleIdsData,
        "recStatus": "A",
        ...oldModuleDataFromBackend[0]
      })
    })

    fields.companyConfigurationData["companyModuleAccess"] = companyModuleAccess

    CompanyConfigurationService.updateCompanyConfiguration({
      companyConfigurationModel: {
        ...fields.companyConfigurationData
        , ...location
      },
    }).then((response) => {
      if (response.data.success && response.data.data) {
        dispatch(
          setAlertMessage({
            view: true,
            message: ValidationMsgs.companyConfiguration.updated,
            type: "success",
          })
        );
        if (response?.data?.data?.id === Company?.id) {
          dispatch(storeCompanyConfigurationData({ ...Company, ...response.data.data }));
        }
        getCompanyConfigurationData();
        getSidebarMenuList();
      } else {
        dispatch(
          setAlertMessage({
            view: true,
            type: "danger",
            message: ValidationMsgs.companyConfiguration.notUpdated,
          })
        );
      }
      dispatch(setAddLoading(false))
    }).catch((errors) => {
      dispatch(
        setAlertMessage({
          view: true,
          type: "danger",
          message: ValidationMsgs.companyConfiguration.notUpdated,
        })
      );
      dispatch(setAddLoading(false))

    });
  }

  const submitHandler = (fields, { resetForm }) => {
    if (isAddMode) {
      createCompanyConfiguration(fields, resetForm);
    } else {
      updateCompanyConfiguration(fields, resetForm);
    }
  };

  const schema = Yup.object().shape({
    companyConfigurationData: Yup.object()
      .shape({
        fullName: Yup.string().trim().required(
          ValidationMsgs.companyConfiguration.fullNameRequired
        ),
        shortName: Yup.string().trim().required(
          ValidationMsgs.companyConfiguration.shortNameRequired
        ),
        companyLogoURL: Yup.string().trim().required(
          ValidationMsgs.companyConfiguration.logoRequired
        ),
        email: Yup.string().trim()
          .email(ValidationMsgs.companyConfiguration.email)
          .required(ValidationMsgs.companyConfiguration.emailRequired),
        phone: Yup.string().trim()
          .required(ValidationMsgs.common.phoneRequired).test(
            'phone',
            ValidationMsgs.common.phoneMatches,
            (value, context) => {
              if (/^(\+\d{1,3}[- ]?)?\d{10}$/.test(value)) {
                return true;
              } else if (/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value)) {
                return true;
              }
              return false;
            },
          )
            /* .matches(
              /^(\+\d{1,3}[- ]?)?\d{10}$/,
              ValidationMsgs.common.phoneMatches
            ) */,
        logoutTime: Yup.string().trim().required(
          ValidationMsgs.companyConfiguration.logoutTimeRequired
        ),
        twoFactorEnabled: Yup.boolean(),
        mS365Enabled: Yup.boolean(),
      })
  }).test("myCustomTest", null, (obj) => {
    if (obj.companyConfigurationData.twoFactorEnabled || obj.companyConfigurationData.mS365Enabled) {
      return true; // everything is fine
    }

    return new Yup.ValidationError(
      ValidationMsgs.companyConfiguration.loginType,
      null,
      "myCustomFieldName"
    );
  });

  return (
    <>
      <title>{isAddMode ? "Add " : "Edit "} {TitleNameHelper({ defaultTitleName: "Company Configuration" })} </title>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={submitHandler}
        validationSchema={schema}
        validateOnMount={true}
      >
        {({ errors, touched, setFieldValue, values, validateForm }) => {
          return (
            <FormikForm>
              <div className="px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto">
                <CreateFileHeader url="/admin/configurator/companyConfiguration"

                  module={`${isAddMode ? "Add " : "Edit "} ${TitleNameHelper({ defaultTitleName: "Company Configuration" })}`}
                  validateForm={validateForm}
                />
                <Messages />
                <div className="bg-white shadow-lg rounded-md mb-8">
                  <section className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="w-full mb-6 last:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                          htmlFor="full_name"
                        >
                          {"Full Name"}
                          <span className="text-rose-500 text-2xl leading-none">
                            {"*"}
                          </span>
                        </label>
                        <div>
                          <Input type={"text"} name="companyConfigurationData.fullName" id="full_name" />
                        </div>
                      </div>
                      <div className="w-full mb-6 last:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                          htmlFor=""
                        >
                          {"Short Name"}
                          <span className="text-rose-500 text-2xl leading-none">
                            {"*"}
                          </span>
                        </label>
                        <div>
                          <Input
                            type={"text"}
                            name={"companyConfigurationData.shortName"}
                            id={"short_name"}
                          />
                        </div>
                      </div>
                      <div className="w-full mb-6 last:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                          htmlFor=""
                        >
                          {"Email"}
                          <span className="text-rose-500 text-2xl leading-none">
                            {"*"}
                          </span>
                        </label>
                        <div>
                          <Input type={"email"} name={"companyConfigurationData.email"} id={"email"} />
                        </div>
                      </div>
                      <div className="w-full mb-6 last:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                          htmlFor=""
                        >
                          {"Phone"}
                          <span className="text-rose-500 text-2xl leading-none">
                            {"*"}
                          </span>
                        </label>
                        <div>
                          <Input type={"text"} name={"companyConfigurationData.phone"} id={"phone"} />
                        </div>
                      </div>
                      <div className="w-full">
                        <label
                          className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                          htmlFor="business-id"
                        >
                          {"Company Logo"}
                          <span className="text-rose-500 text-2xl leading-none">
                            {"*"}
                          </span>
                        </label>
                        <div className="flex flex-wrap gap-6">
                          <div className="grow">
                            <ImageFile
                              id="companyConfigurationData.companyLogoURL"
                              type={`file`}
                              folderpath={`${FolderPath}`}
                              className="sr-only"
                              buttonName="Add"
                              name={`companyConfigurationData.companyLogoURL`}
                              onChange={(value) =>
                                setFieldValue("companyConfigurationData.companyLogoURL", value)
                              }
                              url={values.companyConfigurationData.companyLogoURL}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="w-full mb-6 last:mb-0">
                        <label
                          className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                          htmlFor=""
                        >
                          Logout Time
                          <span className="text-rose-500 text-2xl leading-none">
                            *
                          </span>
                        </label>
                        <div>
                          <Dropdown
                            label={`Logout Time`}
                            name={`companyConfigurationData.logoutTime`}
                            options={logoutTime}
                            defaultValue={values.companyConfigurationData.logoutTime}
                          />
                        </div>
                      </div>
                      <div className={"w-full mb-6 last:mb-0"}>
                        <label
                          className={
                            "block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                          }
                          htmlFor=""
                        >
                          Login Type
                          <span
                            className={"text-rose-500 text-2xl leading-none"}
                          >
                            *
                          </span>
                        </label>
                        <div className={"flex flex-wrap gap-4"}>
                          <label className={"flex items-center"}>
                            <RadioButton
                              type="radio"
                              name="companyConfigurationData"
                              id={"companyConfigurationData.twoFactorEnabled"}
                              onClick={(e) => {
                                setFieldValue(`companyConfigurationData.twoFactorEnabled`, e.target.checked);
                                setFieldValue(`companyConfigurationData.mS365Enabled`, false)
                              }}
                              checked={values.companyConfigurationData.twoFactorEnabled}
                              label={"Default"}
                            />
                          </label>

                          <label className={"flex items-center"}>
                            <RadioButton
                              type="radio"
                              name="companyConfigurationData"
                              id={"companyConfigurationData.mS365Enabled"}
                              onClick={(e) => {
                                setFieldValue(`companyConfigurationData.mS365Enabled`, e.target.checked);
                                setFieldValue('companyConfigurationData.twoFactorEnabled', false)
                              }}
                              checked={values.companyConfigurationData.mS365Enabled}
                              label={"SSO"}
                            />
                          </label>
                        </div>
                        {!values.companyConfigurationData?.mS365Enabled &&
                          !values.companyConfigurationData?.twoFactorEnabled &&
                          touched?.companyConfigurationData?.mS365Enabled &&
                          touched?.companyConfigurationData?.twoFactorEnabled && (
                            <span className={"text-red-500"}>
                              {ValidationMsgs.companyConfiguration.loginType}
                            </span>
                          )}
                      </div>
                    </div >
                  </section >
                </div >
                <div className={"bg-white shadow-lg rounded-md mb-8"}>
                  <section className={"p-6 space-y-6"}>
                    <div>
                      <div className={"mb-6 last:mb-0"}>
                        <div
                          className={
                            "block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                          }
                        >
                          {" Module Rights"}
                        </div>
                        <div className={"bg-white"}>
                          <div>
                            <table
                              className={
                                "table-auto w-full text-sm text-[#191919] font-semibold"
                              }
                            >
                              <tbody className={"text-sm divide-y divide-neutral-200"}>
                                {modules.map((data, index) => {
                                  return (
                                    <Fragment key={index}>
                                      <StoreList
                                        key={index}
                                        index={index}
                                        data={data}
                                        values={values}
                                        setFieldValue={setFieldValue}
                                      />
                                      {(data.subRows && Array.isArray(data.subRows) && data.subRows.length > 0) && data.subRows.map((subRows, index) =>
                                        <StoreList
                                          key={index}
                                          index={index}
                                          data={subRows}
                                          values={values}
                                          setFieldValue={setFieldValue}
                                          className={"ml-10"}
                                        />
                                      )
                                      }
                                    </Fragment>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div >
            </FormikForm >
          );
        }}
      </Formik >
    </>
  );
};

export default CompanyConfiguration;

const StoreList = ({ index, data, values, setFieldValue, className }) => {

  return (
    <Fragment key={index}>
      <tr className={`bg-slate-50 main-parent `}>
        <td className={`px-2 first:pl-5 py-3 relative text-left`}>
          <span className={`${className ? className : ""}`}>{data.name}</span>
        </td>

        <td className={"px-2 first:pl-5 py-3 text-right relative"}>
          <div
            className={
              "transition-all variant-arrow variant-arrow"
            }
          >
            <span className={` flex align-right justify-end pr-3`}>
              <label className={"w-4 inline-flex"}>
                <Input
                  type="checkbox"
                  className={`form-checkbox block table-item ${!false ? "cursor-pointer" : ""} `}
                  name={`moduleData.${data.name}`}
                  id={`${data.id}`}
                  checked={values.moduleData.includes(data.id)}
                  disabled={false}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFieldValue("moduleData", [...values.moduleData, Number(e.target.id)])
                    } else {
                      const restModuleId = values.moduleData
                      const index = restModuleId.indexOf(Number(e.target.id));
                      restModuleId.splice(index, 1);
                      setFieldValue("moduleData", [...restModuleId])
                    }
                  }}
                />
              </label>
            </span>
          </div>
        </td>
      </tr>
    </Fragment>
  );
};

