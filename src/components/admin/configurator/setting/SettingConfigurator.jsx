import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import UserSecurityService from "services/admin/security/UserSecurityService";

import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";

import Index from "components/common/alerts/messages/Index";

import PasswordPolicySection from "./sections/PasswordPolicySection";
import ApprovedDomainSection from "./sections/ApprovedDomainSection";
import HeaderSection from "./sections/HeaderSection";
import OtpSection from "./sections/OtpSection";
import IPSection from "./sections/IPSection";

const SettingConfigurator = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.CompanyConfiguration);
  const { message } = useSelector((state) => state.alertMessage);
  const { location, ipAddress, macAddress } = useSelector(
    (store) => store.location
  );
  const [userSettingsData, setUserSettingsData] = useState({});

  const fetchSettings = async () => {
    dispatch(setAddLoading(true));
    const res = await UserSecurityService.getSecurityByCompanyId({
      companyConfigurationId: id,
    });
    dispatch(setAddLoading(false));
    if (res.data.data) {
      formik.setValues(res.data.data);
      setUserSettingsData(res.data.data);
    }
  };

  const updateSettings = async (values) => {
    try {
      dispatch(setAddLoading(true));
      const payload = {
        ...values,
        resetPasswordDays: values.resetPasswordDays || 0,
        restrictUsedPasswordCount: values.restrictUsedPasswordCount || 0,
        rowVersion: userSettingsData?.rowVersion || "",
        twoStepVerificationType: userSettingsData?.twoStepVerificationType || 1,
        location,
        ipAddress,
        macAddress,
      };

      delete payload.domain;

      const res = await UserSecurityService.updateSecurityConfiguration({
        userSecuritySettingModel: payload,
      });
      dispatch(setAddLoading(false));

      if (res.data.success) {
        dispatch(
          setAlertMessage({
            type: "success",
            view: true,
            message: "Settings updated successfully",
          })
        );
      } else {
        dispatch(
          setAlertMessage({
            type: "danger",
            view: true,
            message: Object.values(res.data.errors)[0],
          })
        );
      }
    } catch (err) {
      console.log("exception", err);
    }
  };

  const settingValidationSchema = Yup.object().shape({
    passwordStrengthType: Yup.number(),
    resetPasswordType: Yup.number(),
    resetPasswordDays: Yup.number().when("resetPasswordType", {
      is: 2,
      then: Yup.number()
        .min(1, "Minimum 1 is required")
        .required("Please enter a value"),
    }),
    restrictUsedPasswordType: Yup.number(),
    restrictUsedPasswordCount: Yup.number().when("restrictUsedPasswordType", {
      is: 2,
      then: Yup.number()
        .min(1, "Minimum 1 is required")
        .required("Please enter a value"),
    }),
    isOneTimePasswordEnabled: Yup.boolean(),
    twoStepVerificationType: Yup.number(),
    domain: Yup.string().trim().matches(
      /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/,
      "Please enter a valid domain"
    ),
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const formik = useFormik({
    initialValues: userSettingsData,
    validationSchema: settingValidationSchema,
    onSubmit: (val) => updateSettings(val),
  });

  const { handleSubmit } = formik;

  return (
    <>
      {message && <Index />}
      {Object.keys(formik.values).length !== 0 && (
        <form
          onSubmit={handleSubmit}
          id="contentbody"
          className="relative w-full flex flex-col flex-1 overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-300 language-html top-4 min-h-[90vh]"
        >
          <div className="px-4 sm:px-6 lg:px-8 w-full">
            <HeaderSection />
            <div className="bg-white shadow-xxl rounded-md mb-4">
              <PasswordPolicySection formik={formik} />
              <IPSection />
              <OtpSection formik={formik} />
              <ApprovedDomainSection formik={formik} />
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default SettingConfigurator;
