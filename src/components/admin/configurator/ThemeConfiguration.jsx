import React, { useState, useEffect } from "react";
import { Formik, Form as FormikForm } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import LoginScreen from "assets/images/loginscreen.png";

import { ValidationMsgs } from "global/ValidationMessages";
import { loginPageStyle } from "dummy/Dummy";
import { blobFolder } from "global/Enum";

import ThemeConfigurationService from "services/admin/themeConfiguration/ThemeConfigurationService";
import DropdownService from "services/common/dropdown/DropdownService";
import { NumericList } from "services/common/helper/Helper";

import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";

import Dropdown from "components/common/formComponent/Dropdown";
import ColorPicker from "components/common/formComponent/ColorPicker";
import Messages from "components/common/alerts/messages/Index";
import ImageFile from "components/common/formComponent/ImageFile";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { TitleNameHelper } from "services/common/helper/Helper";
import { getThemeConfiguration } from "redux/themeConfiguration/themeConfigurationAction";

const ThemeConfiguration = () => {
  const data = useSelector((store) => store?.ThemeConfiguration);
  const isAddMode = Object.keys(data).length === 0;
  const dispatch = useDispatch();
  const location = useSelector((store) => store?.location)
  const CompanyId = useSelector((store) => store?.CompanyConfiguration.id);
  const [fontFamilies, setFontFamilies] = useState([]);
  const FolderPath = `/${blobFolder.temp}/${CompanyId}/${blobFolder.themeConfiguration}/${Math.random(5)}`
  const GlobalLoading = useSelector((store) => store?.GlobalLoaderReducer?.toLoad);
  const permission = useSelector(store => store.permission);

  const initialValues = {
    id: data?.id || 0,
    storeLogoUrl: data?.storeLogoUrl || "",
    headerLogoUrl: data?.headerLogoUrl || "",
    faviconUrl: data?.faviconUrl || "",
    emailLogoUrl: data?.emailLogoUrl || "",
    bFontFamily: data?.bFontFamily || "lato",
    bFontSize: data?.bFontSize || "",
    bFontWeight: data?.bFontWeight || "",
    bLineHeight: data?.bLineHeight || "",
    bLetterSpacing: data?.bLetterSpacing || "",
    sBgcolor: data?.sBgcolor || "#2d8bf1",
    sbgActivecolor: data?.sbgActivecolor || "#2d8bf1",
    sbGhovercolor: data?.sbGhovercolor || "#2d8bf1",
    sFontcolor: data?.sFontcolor || "#2d8bf1",
    sActiveColor: data?.sActiveColor || "#2d8bf1",
    sHoverColor: data?.sHoverColor || "#2d8bf1",
    pFontFamily: data?.pFontFamily || "lato",
    pFontSize: data?.pFontSize || "",
    pFontWeight: data?.pFontWeight || "",
    pLineHeight: data?.pLineHeight || "",
    pLetterSpacing: data?.pLetterSpacing || "",
    cBgcolor: data?.cBgcolor || "#2d8bf1",
    cbgActivecolor: data?.cbgActivecolor || "#2d8bf1",
    cbGhovercolor: data?.cbGhovercolor || "#2d8bf1",
    cFontcolor: data?.cFontcolor || "#2d8bf1",
    cActiveColor: data?.cActiveColor || "#2d8bf1",
    cHoverColor: data?.cHoverColor || "#2d8bf1",
    primary: data?.primary || "#2d8bf1",
    secondary: data?.secondary || "#2d8bf1",
    red: data?.red || "#2d8bf1",
    green: data?.green || "#2d8bf1",
    yellow: data?.yellow || "#2d8bf1",
    loginPageStyle: data?.loginPageStyle || "",
    loginBackgroundUrl: data?.loginBackgroundUrl || "",
    rowVersion: data?.rowVersion || null,
    recStatus: "A",
  };

  const validationSchema = Yup.object({
    storeLogoUrl: Yup.string().trim().required(ValidationMsgs.themeConfiguration.storeLogoUrlRequired),
    headerLogoUrl: Yup.string().trim().required(ValidationMsgs.themeConfiguration.headerLogoUrlRequired),
    faviconUrl: Yup.string().trim().required(ValidationMsgs.themeConfiguration.faviconUrlRequired),
    emailLogoUrl: Yup.string().trim().required(ValidationMsgs.themeConfiguration.emailLogoUrlRequired),
    bFontFamily: Yup.string().trim().required(ValidationMsgs.themeConfiguration.bFontFamilyRequired),
    bFontSize: Yup.string().trim().required(ValidationMsgs.themeConfiguration.bFontSizeRequired),
    bFontWeight: Yup.string().trim().required(ValidationMsgs.themeConfiguration.bFontWeightRequired),
    bLineHeight: Yup.string().trim().required(ValidationMsgs.themeConfiguration.bLineHeightRequired),
    bLetterSpacing: Yup.string().trim().required(ValidationMsgs.themeConfiguration.bLetterSpacingRequired),
    sBgcolor: Yup.string().trim().required(ValidationMsgs.themeConfiguration.sBgcolorRequired),
    sbgActivecolor: Yup.string().trim().required(ValidationMsgs.themeConfiguration.sbgActivecolorRequired),
    sbGhovercolor: Yup.string().trim().required(ValidationMsgs.themeConfiguration.sbGhovercolorRequired),
    sFontcolor: Yup.string().trim().required(ValidationMsgs.themeConfiguration.sFontcolorRequired),
    sActiveColor: Yup.string().trim().required(ValidationMsgs.themeConfiguration.sActiveColorRequired),
    sHoverColor: Yup.string().trim().required(ValidationMsgs.themeConfiguration.sHoverColorRequired),
    pFontFamily: Yup.string().trim().required(ValidationMsgs.themeConfiguration.pFontFamilyRequired),
    pFontSize: Yup.string().trim().required(ValidationMsgs.themeConfiguration.pFontSizeRequired),
    pFontWeight: Yup.string().trim().required(ValidationMsgs.themeConfiguration.pFontWeightRequired),
    pLineHeight: Yup.string().trim().required(ValidationMsgs.themeConfiguration.pLineHeightRequired),
    pLetterSpacing: Yup.string().trim().required(ValidationMsgs.themeConfiguration.pLetterSpacingRequired),
    cBgcolor: Yup.string().trim().required(ValidationMsgs.themeConfiguration.cBgcolorRequired),
    cbgActivecolor: Yup.string().trim().required(ValidationMsgs.themeConfiguration.cbgActivecolorRequired),
    cbGhovercolor: Yup.string().trim().required(ValidationMsgs.themeConfiguration.cbGhovercolorRequired),
    cFontcolor: Yup.string().trim().required(ValidationMsgs.themeConfiguration.cFontcolorRequired),
    cActiveColor: Yup.string().trim().required(ValidationMsgs.themeConfiguration.cActiveColorRequired),
    cHoverColor: Yup.string().trim().required(ValidationMsgs.themeConfiguration.cHoverColorRequired),
    primary: Yup.string().trim().required(ValidationMsgs.themeConfiguration.primaryRequired),
    secondary: Yup.string().trim().required(ValidationMsgs.themeConfiguration.secondaryRequired),
    red: Yup.string().trim().required(ValidationMsgs.themeConfiguration.redRequired),
    green: Yup.string().trim().required(ValidationMsgs.themeConfiguration.greenRequired),
    yellow: Yup.string().trim().required(ValidationMsgs.themeConfiguration.yellowRequired),
    loginPageStyle: Yup.string().trim().required(ValidationMsgs.themeConfiguration.loginPageStyleRequired),
    loginBackgroundUrl: Yup.string().trim().required(ValidationMsgs.themeConfiguration.loginBackgroundUrlRequired),
  });

  useEffect(() => {
    DropdownService.getDropdownValues("font").then((res) => {
      if (res.data.success) {
        setFontFamilies(() => {
          return [...res.data.data.map((value) => {
            return { ...value, value: value.label, style: { fontFamily: value.label } }
          })];
        });
      }
    });
  }, []);

  function createThemeConfiguration(fields, resetForm) {
    dispatch(setAddLoading(true))

    ThemeConfigurationService.createThemeConfiguration({
      themeConfigurationModel: { ...fields, ...location },
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(
            setAlertMessage({
              view: true,
              type: "success",
              message: ValidationMsgs.themeConfiguration.created,
            })
          );
          resetForm({});
          dispatch(getThemeConfiguration());

        } else {
          dispatch(
            setAlertMessage({
              view: true,
              type: "danger",
              message: response.Errors.Error,
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
            message: errors.response.data.Errors.Error,
          })
        );
        dispatch(setAddLoading(false))
      });
  }

  function updateThemeConfiguration(fields, resetForm) {
    dispatch(setAddLoading(true))
    ThemeConfigurationService.updateThemeConfiguration({
      themeConfigurationModel: { ...fields, ...location },
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(
            setAlertMessage({
              view: true,
              type: "success",
              message: ValidationMsgs.themeConfiguration.updated,
            })
          );
          dispatch(getThemeConfiguration());

        } else {
          dispatch(
            setAlertMessage({
              view: true,
              type: "danger",
              message: response.Errors.Error,
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
            message: errors.response.data.Errors.Error,
          })
        );
        dispatch(setAddLoading(false))
      });
  }

  function submitHandler(fields, { resetForm }) {
    if (isAddMode) {
      createThemeConfiguration(fields, resetForm);
    } else {
      updateThemeConfiguration(fields, resetForm);
    }
  }
  const ColumnPerRow = "3";
  return (
    <>
      <title>{isAddMode ? 'Create ' : 'Edit '} {TitleNameHelper({ defaultTitleName: "Theme Configuration" })}</title>

      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {({ errors, setFieldValue, values, validateForm }) => {

          return (
            <FormikForm>
              <div className="py-4">
                <div className="px-4 sm:px-6 lg:px-8 w-full items-center flex justify-between sticky top-0 z-20 py-2 bg-slate-100 mb-6">
                  <div className="flex items-center">
                    <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
                      {isAddMode ? 'Create ' : 'Edit '} {TitleNameHelper({ defaultTitleName: `Theme Configuration` })}
                    </h1>
                  </div>
                  <div className="flex justify-between">
                    {(permission?.isEdit || permission?.isDelete) && <div className="flex flex-wrap space-x-2">
                      <button className="btn bg-white border-neutral-200 text-gray-500 hover:text-gray-700"
                        onClick={() => window.location.reload(true)}
                      >
                        Refresh
                      </button>

                      <button
                        disabled={GlobalLoading}
                        className={`flex justify-center btn px-6 bg-indigo-500 hover:bg-indigo-600 text-white ${(GlobalLoading) ? "bg-indigo-200 hover:bg-indigo-200" : "cursor-pointer"}`}
                      >
                        {GlobalLoading &&
                          <span className="spinner-border spinner-border-sm mr-2"></span>
                        }
                        {"Save"}
                      </button>
                    </div>}
                  </div>
                </div>
                <div className="px-4 sm:px-6 lg:px-8 w-full">
                  {/* <CreateFileHeader module={`${isAddMode ? 'Create' : 'Edit'} Theme Configuration`} errors={errors} validateForm={validateForm} /> */}
                  <Messages />
                  <div className="bg-white shadow-lg rounded-md mb-8">
                    <section className={`p-6 space-y-6`}>
                      <div className={`sm:flex sm:items-center`}>
                        <div className={`sm:w-1/3`}>
                          <h3
                            className={
                              "text-xl leading-snug text-gray-800 font-bold mb-1"
                            }
                          >
                            {`Configure`}
                            <span className="text-rose-500 text-2xl leading-none">
                              {"*"}
                            </span>
                          </h3>
                        </div>
                        <div className={`sm:w-2/3`}>
                          <div
                            className={`sm:flex flex-wrap sm:items-center -mx-2`}
                          >
                            <div className={`sm:w-1/2 px-2 mb-4`}>
                              <label
                                className={`block text-sm font-medium mb-1`}
                                htmlFor={`business-id`}
                              >
                                {`Logo`}
                              </label>

                              <ImageFile
                                id="storeLogoUrl"
                                type={`file`}
                                folderpath={`${FolderPath}`}
                                className="sr-only"
                                buttonName="Add"
                                name={`storeLogoUrl`}
                                onChange={(value) =>
                                  setFieldValue("storeLogoUrl", value)
                                }
                                url={values.storeLogoUrl}
                              />
                            </div>
                            <div className={`sm:w-1/2 px-2 mb-4`}>
                              <label className={`block text-sm font-medium mb-1`}>
                                {`Header Logo`}
                              </label>

                              <ImageFile
                                id="headerLogoUrl"
                                type={`file`}
                                folderpath={`${FolderPath}`}
                                className="sr-only"
                                buttonName="Add"
                                name={`headerLogoUrl`}
                                onChange={(value) =>
                                  setFieldValue("headerLogoUrl", value)

                                }
                                url={values.headerLogoUrl}
                              />
                            </div>
                            <div className={`sm:w-1/2 px-2 mb-4`}>
                              <label className={`block text-sm font-medium mb-1`}>
                                {`Favicon`}
                              </label>
                              <ImageFile
                                id="faviconUrl"
                                type={`file`}
                                folderpath={`${FolderPath}`}
                                className="sr-only"
                                buttonName="Add"
                                name={`faviconUrl`}
                                onChange={(value) =>
                                  setFieldValue("faviconUrl", value)
                                }
                                url={values.faviconUrl}
                              />
                            </div>
                            <div className={`sm:w-1/2 px-2 mb-4`}>
                              <label className={`block text-sm font-medium mb-1`}>
                                {`Email Logo`}
                              </label>

                              <ImageFile
                                id="emailLogoUrl"
                                type={`file`}
                                folderpath={`${FolderPath}`}
                                className="sr-only"
                                buttonName="Add"
                                name={`emailLogoUrl`}
                                onChange={(value) =>
                                  setFieldValue("emailLogoUrl", value)
                                }
                                url={values.emailLogoUrl}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    <hr className={"hr"} />
                    <section className={`p-6 space-y-6`}>
                      <div className={`sm:flex sm:items-center`}>
                        <div className={`sm:w-1/3`}>
                          <h3
                            className={
                              "text-xl leading-snug text-gray-800 font-bold mb-1"
                            }
                          >
                            {`Body Font`}
                            <span className="text-rose-500 text-2xl leading-none">
                              {"*"}
                            </span>
                          </h3>
                        </div>
                        <div className={`sm:w-2/3`}>
                          <div
                            className={`sm:flex flex-wrap sm:items-center -mx-2`}
                          >
                            <div className={`sm:w-1/2 px-2 mb-4`}>
                              <label className={`block text-sm font-medium mb-1`}>
                                {`Font Family`}
                              </label>
                              <Dropdown
                                isMulti={false}
                                defaultValue={values.bFontFamily}
                                name={`bFontFamily`}
                                options={fontFamilies}
                              />
                            </div>
                            <div className={`sm:w-1/2 px-2 mb-4`}>
                              <label className={`block text-sm font-medium mb-1`}>
                                Font Size
                              </label>

                              <Dropdown
                                defaultValue={values.bFontSize}
                                name={`bFontSize`}
                                options={NumericList(12, 50, 1)}
                              />
                            </div>
                            <div className={`sm:w-1/2 px-2 mb-4`}>
                              <label className={`block text-sm font-medium mb-1`}>
                                {`Font Weight`}
                              </label>
                              <Dropdown
                                isMulti={false}
                                defaultValue={values.bFontWeight}
                                name={`bFontWeight`}
                                options={NumericList(100, 900, 100)}
                              />
                            </div>
                            <div className={`sm:w-1/2 px-2 mb-4`}>
                              <label className={`block text-sm font-medium mb-1`}>
                                {`Line Height`}
                              </label>
                              <Dropdown
                                isMulti={false}
                                defaultValue={values.bLineHeight}
                                name={`bLineHeight`}
                                options={NumericList(1, 3, 1)}
                              />
                            </div>
                            <div className={`sm:w-1/2 px-2 mb-4`}>
                              <label className={`block text-sm font-medium mb-1`}>
                                {`Letter Spacing`}
                              </label>
                              <Dropdown
                                isMulti={false}
                                defaultValue={values.bLetterSpacing}
                                name={`bLetterSpacing`}
                                options={NumericList(0, 10, 1)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    <hr className={"hr"} />
                    <section className={`p-6 space-y-6`}>
                      <div className={`sm:flex sm:items-center`}>
                        <div className={`sm:w-1/3`}>
                          <h3
                            className={
                              "text-xl leading-snug text-gray-800 font-bold mb-1"
                            }
                          >
                            {`Sidebar`}
                            <span className="text-rose-500 text-2xl leading-none">
                              {"*"}
                            </span>
                          </h3>
                        </div>
                        <div className={`sm:w-2/3`}>
                          <div
                            className={`sm:flex flex-wrap sm:items-center -mx-2`}
                          >
                            <div className={`sm:w-full px-2 mb-4`}>
                              <div
                                className={
                                  "sm:flex flex-wrap sm:items-center -mx-2"
                                }
                              >
                                <div className={`sm:w-3/3 px-2 mb-4`}>
                                  <div
                                    className={
                                      "text-lg leading-snug text-gray-800 font-bold mb-1"
                                    }
                                  >
                                    {`Background`}
                                  </div>
                                </div>
                              </div>
                              <div
                                className={
                                  "sm:flex flex-wrap sm:items-center -mx-2"
                                }
                              >
                                <div
                                  className={`sm:w-1/${ColumnPerRow} px-2 mb-4`}
                                >
                                  <label
                                    className={`block text-sm font-medium mb-1`}
                                    htmlFor={`business-id`}
                                  >
                                    {`Bg color`}
                                  </label>
                                  <div className={`flex flex-wrap`}>
                                    <div>
                                      <div className={`max-w-sm mx-auto`}>
                                        <div className={`mb-5`}>
                                          <ColorPicker
                                            name={`sBgcolor`}
                                            defaultValue={values.sBgcolor}
                                            value={values.sBgcolor}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className={`sm:w-1/${ColumnPerRow} px-2 mb-4`}
                                >
                                  <label
                                    className={`block text-sm font-medium mb-1`}
                                    htmlFor={`business-id`}
                                  >
                                    BG Active color
                                  </label>
                                  <div className={`flex flex-wrap`}>
                                    <div>
                                      <div className={`max-w-sm mx-auto`}>
                                        <div className={`mb-5`}>
                                          <ColorPicker
                                            name={`sbgActivecolor`}
                                            defaultValue={values.sbgActivecolor}
                                            value={values.sbgActivecolor}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* <div
                                className={`sm:w-1/${ColumnPerRow} px-2 mb-4`}
                              >
                                <label
                                  className={`block text-sm font-medium mb-1`}
                                  htmlFor={`business-id`}
                                >
                                  {`BG hover color`}
                                </label>
                                <div className={`flex flex-wrap`}>
                                  <div>
                                    <div className={`max-w-sm mx-auto`}>
                                      <div className={`mb-5`}>
                                        <ColorPicker
                                          name={`sbGhovercolor`}
                                          defaultValue={values.sbGhovercolor}
                                          value={values.sbGhovercolor}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div> */}
                              </div>
                            </div>
                            <hr className={`hr`} />
                            <div className={`sm:w-full px-2 mb-4`}>
                              <div
                                className={
                                  "sm:flex flex-wrap sm:items-center -mx-2"
                                }
                              >
                                <div className={`sm:w-3/3 px-2 mb-4`}>
                                  <div
                                    className={
                                      "text-lg leading-snug text-gray-800 font-bold mb-1"
                                    }
                                  >
                                    {`Font`}
                                  </div>
                                </div>
                              </div>
                              <div
                                className={
                                  "sm:flex flex-wrap sm:items-center -mx-2"
                                }
                              >
                                <div
                                  className={`sm:w-1/${ColumnPerRow} px-2 mb-4`}
                                >
                                  <label
                                    className={`block text-sm font-medium mb-1`}
                                    htmlFor={`business-id`}
                                  >
                                    {`Font color`}
                                  </label>
                                  <div className={`flex flex-wrap`}>
                                    <div>
                                      <div className={`max-w-sm mx-auto`}>
                                        <div className={`mb-5`}>
                                          <ColorPicker
                                            name={`sFontcolor`}
                                            defaultValue={values.sFontcolor}
                                            value={values.sFontcolor}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className={`sm:w-1/${ColumnPerRow} px-2 mb-4`}
                                >
                                  <label
                                    className={`block text-sm font-medium mb-1`}
                                    htmlFor={`business-id`}
                                  >
                                    {`Font Active color`}
                                  </label>
                                  <div className={`flex flex-wrap`}>
                                    <div>
                                      <div className={`max-w-sm mx-auto`}>
                                        <div className={`mb-5`}>
                                          <ColorPicker
                                            name={`sActiveColor`}
                                            defaultValue={values.sActiveColor}
                                            value={values.sActiveColor}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* <div
                                className={`sm:w-1/${ColumnPerRow} px-2 mb-4`}
                              >
                                <label
                                  className={`block text-sm font-medium mb-1`}
                                  htmlFor={`business-id`}
                                >
                                  {`Font hover color`}
                                </label>
                                <div className={`flex flex-wrap`}>
                                  <div>
                                    <div className={`max-w-sm mx-auto`}>
                                      <div className={`mb-5`}>
                                        <ColorPicker
                                          name={`sHoverColor`}
                                          defaultValue={values.sHoverColor}
                                          value={values.sHoverColor}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    <hr className={"hr"} />
                    <section className={`p-6 space-y-6`}>
                      <div className={`sm:flex sm:items-center`}>
                        <div className={`sm:w-1/3`}>
                          <h3
                            className={
                              "text-xl leading-snug text-gray-800 font-bold mb-1"
                            }
                          >
                            {`Page Heading Font`}
                            <span className="text-rose-500 text-2xl leading-none">
                              {"*"}
                            </span>
                          </h3>
                        </div>
                        <div className={`sm:w-2/3`}>
                          <div
                            className={`sm:flex flex-wrap sm:items-center -mx-2`}
                          >
                            <div className={`sm:w-1/2 px-2 mb-4`}>
                              <label
                                className={`block text-sm font-medium mb-1`}
                                htmlFor={`business-id`}
                              >
                                {`Font Family`}
                              </label>
                              <Dropdown
                                isMulti={false}
                                defaultValue={values.pFontFamily}
                                name={`pFontFamily`}
                                options={fontFamilies}
                              />
                            </div>
                            <div className={`sm:w-1/2 px-2 mb-4`}>
                              <label className={`block text-sm font-medium mb-1`}>
                                {`Font Size`}
                              </label>

                              <Dropdown
                                label={`Font Size`}
                                name={`pFontSize`}
                                options={NumericList(12, 50, 1)}
                                defaultValue={values.pFontSize}
                              />
                            </div>
                            <div className={`sm:w-1/2 px-2 mb-4`}>
                              <label className={`block text-sm font-medium mb-1`}>
                                {`Font Weight`}
                              </label>
                              <Dropdown
                                label={`Font Weight`}
                                name={`pFontWeight`}
                                options={NumericList(100, 900, 100)}
                                defaultValue={values.pFontWeight}
                              />
                            </div>
                            <div className={`sm:w-1/2 px-2 mb-4`}>
                              <label className={`block text-sm font-medium mb-1`}>
                                {`Line Height`}
                              </label>
                              <Dropdown
                                label={`Line Height`}
                                name={`pLineHeight`}
                                options={NumericList(1, 3, 1)}
                                defaultValue={values.pLineHeight}
                              />
                            </div>
                            <div className={`sm:w-1/2 px-2 mb-4`}>
                              <label className={`block text-sm font-medium mb-1`}>
                                {`Letter Spacing`}
                              </label>
                              <Dropdown
                                label={`Letter Spacing`}
                                name={`pLetterSpacing`}
                                options={NumericList(0, 10, 1)}
                                defaultValue={values.pLetterSpacing}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    <hr className={`hr`} />
                    <section className={`p-6 space-y-6`}>
                      <div className={`sm:flex sm:items-center`}>
                        <div className={`sm:w-1/3`}>
                          <h3
                            className={
                              "text-xl leading-snug text-gray-800 font-bold mb-1"
                            }
                          >
                            Button
                            <span className="text-rose-500 text-2xl leading-none">
                              {"*"}
                            </span>
                          </h3>
                        </div>
                        <div className={`sm:w-2/3`}>
                          <div
                            className={`sm:flex flex-wrap sm:items-center -mx-2`}
                          >
                            <div className={`sm:w-full px-2 mb-4`}>
                              <div
                                className={
                                  "sm:flex flex-wrap sm:items-center -mx-2"
                                }
                              >
                                <div className={`sm:w-3/3 px-2 mb-4`}>
                                  <div
                                    className={
                                      "text-lg leading-snug text-gray-800 font-bold mb-1"
                                    }
                                  >
                                    Background
                                  </div>
                                </div>
                              </div>
                              <div
                                className={
                                  "sm:flex flex-wrap sm:items-center -mx-2"
                                }
                              >
                                <div
                                  className={`sm:w-1/${ColumnPerRow} px-2 mb-4`}
                                >
                                  <label
                                    className={`block text-sm font-medium mb-1`}
                                    htmlFor={`business-id`}
                                  >
                                    {`Bg color`}
                                  </label>
                                  <div className={`flex flex-wrap`}>
                                    <div>
                                      <div className={`max-w-sm mx-auto`}>
                                        <div className={`mb-5`}>
                                          <ColorPicker
                                            name={`cBgcolor`}
                                            defaultValue={values.cBgcolor}
                                            value={values.cBgcolor}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/*   <div
                                className={`sm:w-1/${ColumnPerRow} px-2 mb-4`}
                              >
                                <label
                                  className={`block text-sm font-medium mb-1`}
                                  htmlFor={`business-id`}
                                >
                                  {`Bg Active color`}
                                </label>
                                <div className={`flex flex-wrap`}>
                                  <div>
                                    <div className={`max-w-sm mx-auto`}>
                                      <div className={`mb-5`}>
                                        <ColorPicker
                                          name={`cbgActivecolor`}
                                          defaultValue={values.cbgActivecolor}
                                          value={values.cbgActivecolor}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div> */}
                                {/* <div
                                className={`sm:w-1/${ColumnPerRow} px-2 mb-4`}
                              >
                                <label
                                  className={`block text-sm font-medium mb-1`}
                                  htmlFor={`business-id`}
                                >
                                  {`Bg hover color`}
                                </label>
                                <div className={`flex flex-wrap`}>
                                  <div>
                                    <div className={`max-w-sm mx-auto`}>
                                      <div className={`mb-5`}>
                                        <ColorPicker
                                          name={`cbGhovercolor`}
                                          defaultValue={values.cbGhovercolor}
                                          value={values.cbGhovercolor}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div> */}
                              </div>
                            </div>
                            <hr className={`hr`} />
                            <div className={`sm:w-full px-2 mb-4`}>
                              <div
                                className={
                                  "sm:flex flex-wrap sm:items-center -mx-2"
                                }
                              >
                                <div className={`sm:w-3/3 px-2 mb-4`}>
                                  <div
                                    className={
                                      "text-lg leading-snug text-gray-800 font-bold mb-1"
                                    }
                                  >
                                    Font
                                  </div>
                                </div>
                              </div>
                              <div
                                className={
                                  "sm:flex flex-wrap sm:items-center -mx-2"
                                }
                              >
                                <div
                                  className={`sm:w-1/${ColumnPerRow} px-2 mb-4`}
                                >
                                  <label
                                    className={`block text-sm font-medium mb-1`}
                                    htmlFor={`business-id`}
                                  >
                                    {`Font color`}
                                  </label>
                                  <div className={`flex flex-wrap`}>
                                    <div>
                                      <div className={`max-w-sm mx-auto`}>
                                        <div className={`mb-5`}>
                                          <ColorPicker
                                            name={`cFontcolor`}
                                            defaultValue={values.cFontcolor}
                                            value={values.cFontcolor}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/*  <div
                                className={`sm:w-1/${ColumnPerRow} px-2 mb-4`}
                              >
                                <label
                                  className={`block text-sm font-medium mb-1`}
                                  htmlFor={`business-id`}
                                >
                                  {`Font Active color`}
                                </label>
                                <div className={`flex flex-wrap`}>
                                  <div>
                                    <div className={`max-w-sm mx-auto`}>
                                      <div className={`mb-5`}>
                                        <ColorPicker
                                          name={`cActiveColor`}
                                          defaultValue={values.cActiveColor}
                                          value={values.cActiveColor}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div> */}

                                {/* <div
                                className={`sm:w-1/${ColumnPerRow} px-2 mb-4`}
                              >
                                <label
                                  className={`block text-sm font-medium mb-1`}
                                  htmlFor={`business-id`}
                                >
                                  {`Font hover color`}
                                </label>
                                <div className={`flex flex-wrap`}>
                                  <div>
                                    <div className={`max-w-sm mx-auto`}>
                                      <div className={`mb-5`}>
                                        <ColorPicker
                                          name={`cHoverColor`}
                                          defaultValue={values.cHoverColor}
                                          value={values.cHoverColor}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    <hr className={"hr"} />
                    <section className={`p-6 space-y-6`}>
                      <div className={`sm:flex sm:items-center`}>
                        <div className={`sm:w-1/3`}>
                          <h3
                            className={
                              "text-xl leading-snug text-gray-800 font-bold mb-1"
                            }
                          >
                            {`Color`}
                            <span className="text-rose-500 text-2xl leading-none">
                              {"*"}
                            </span>
                          </h3>
                        </div>
                        <div className={`sm:w-2/3`}>
                          <div
                            className={`sm:flex flex-wrap sm:items-center -mx-2`}
                          >
                            <div className={`sm:w-1/${ColumnPerRow} px-2 mb-4`}>
                              <label
                                className={`block text-sm font-medium mb-1`}
                                htmlFor={`business-id`}
                              >
                                {`Primary`}
                              </label>
                              <div className={`flex flex-wrap`}>
                                <div>
                                  <div className={`max-w-sm mx-auto`}>
                                    <div className={`mb-5`}>
                                      <ColorPicker
                                        ColumnPerRow={2}
                                        name={`primary`}
                                        defaultValue={values.primary}
                                        value={values.primary}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* <div className={`sm:w-1/${ColumnPerRow} px-2 mb-4`}>
                            <label
                              className={`block text-sm font-medium mb-1`}
                              htmlFor={`business-id`}
                            >
                              {`Secondary`}
                            </label>
                            <div className={`flex flex-wrap`}>
                              <div>
                                <div className={`max-w-sm mx-auto`}>
                                  <div className={`mb-5`}>
                                    <ColorPicker
                                      ColumnPerRow={2}
                                      name={`secondary`}
                                      defaultValue={values.secondary}
                                      value={values.secondary}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className={`sm:w-1/${ColumnPerRow} px-2 mb-4`}>
                            <label
                              className={`block text-sm font-medium mb-1`}
                              htmlFor={`business-id`}
                            >
                              {`Red`}
                            </label>
                            <div className={`flex flex-wrap`}>
                              <div>
                                <div className={`max-w-sm mx-auto`}>
                                  <div className={`mb-5`}>
                                    <ColorPicker
                                      ColumnPerRow={2}
                                      name={`red`}
                                      defaultValue={values.red}
                                      value={values.red}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className={`sm:w-1/${ColumnPerRow} px-2 mb-4`}>
                            <label
                              className={`block text-sm font-medium mb-1`}
                              htmlFor={`business-id`}
                            >
                              {` Green`}
                            </label>
                            <div className={`flex flex-wrap`}>
                              <div>
                                <div className={`max-w-sm mx-auto`}>
                                  <div className={`mb-5`}>
                                    <ColorPicker
                                      ColumnPerRow={2}
                                      name="green"
                                      defaultValue={values.green}
                                      value={values.green}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className={`sm:w-1/${ColumnPerRow} px-2 mb-4`}>
                            <label
                              className={`block text-sm font-medium mb-1`}
                              htmlFor={`business-id`}
                            >
                              {`Yellow`}
                            </label>
                            <div className={`flex flex-wrap`}>
                              <div>
                                <div className={`max-w-sm mx-auto`}>
                                  <div className={`mb-5`}>
                                    <ColorPicker
                                      name={`yellow`}
                                      ColumnPerRow={2}
                                      defaultValue={values.yellow}
                                      value={values.yellow}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div> */}
                          </div>
                        </div>
                      </div>
                    </section>
                    <hr className={`hr`} />
                    <section className={`p-6 space-y-6`}>
                      <div className={`sm:flex sm:items-center`}>
                        <div className={`sm:w-1/3`}>
                          <h3
                            className={
                              "text-xl leading-snug text-gray-800 font-bold mb-1"
                            }
                          >
                            {`Login Page`}
                            <span className="text-rose-500 text-2xl leading-none">
                              {"*"}
                            </span>
                          </h3>
                        </div>
                        <div className={`sm:w-2/3`}>
                          <div className="sm:flex flex-wrap sm:items-start -mx-2">
                            <div className={`sm:w-1/2 px-2 mb-4`}>
                              <label
                                className={`block text-sm font-medium mb-1`}
                                htmlFor={`business-id`}
                              >
                                {`Login Page Style`}
                              </label>
                              <Dropdown
                                isMulti={false}
                                defaultValue={values.loginPageStyle}
                                name={`loginPageStyle`}
                                options={loginPageStyle}
                              />
                              <div className={`mt-2 max-h-72 h-60`}>
                                <LoginStyleImage
                                  authimage={values.loginBackgroundUrl}
                                  loginPageStyle={values.loginPageStyle}
                                />
                              </div>
                            </div>
                            <div className={`sm:w-1/2 px-2 mb-4`}>
                              <label
                                className={`block text-sm font-medium mb-1`}
                                htmlFor={`business-id`}
                              >
                                {`Login Background`}
                              </label>
                              <ImageFile
                                id="loginBackgroundUrl"
                                type={`file`}
                                folderpath={`${FolderPath}`}
                                className="sr-only"
                                buttonName="Add"
                                name={`loginBackgroundUrl`}
                                onChange={(value) =>
                                  setFieldValue("loginBackgroundUrl", value)
                                }
                                url={values.loginBackgroundUrl}
                              />
                              <label className="text-sm mt-2">{values.loginPageStyle === "Center Align" ? "Recommended size for login background is 1920 x 780 pixel"
                                : "Recommended size for login background is 960 x 780 pixel"}</label>
                              {/* <div className={`mt-2 max-h-48`}>
                              <img
                                src={values.loginBackgroundUrl}
                                className={`w-auto max-h-40 h-[90px]`}
                                alt={`loginBackgroundUrl`}
                              />
                            </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
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

const LoginStyleImage = ({ authimage, loginPageStyle }) => {

  const AdminAppConfigReducers = useSelector((store) => store?.AdminAppConfigReducers);


  if (loginPageStyle === "Left Align")
    return (
      <div
        className={`select_login relative grid-cols-2 grid`}
        id={`loginopt01`}
      >
        <div className={`col-span-1`}>
          <img
            src={LoginScreen}
            title={`loginScreen`}
            alt={`loginScreen`}
            className={`w-auto max-h-60 ml-auto`}
          />
        </div>
        <div className={`col-span-1 flex flex-wrapper items-center`}>
          <img
            src={`${AdminAppConfigReducers["azure:BlobUrl"]}${authimage}`}
            title={`authimage`}
            alt={`authimage`}
            className={`w-auto max-h-60 mr-auto`}
          />
        </div>
      </div>
    );
  else if (loginPageStyle === "Right Align") {
    return (
      <div
        className={`select_login relative grid-cols-2 grid`}
        id={`loginopt03`}
      >
        <div className={`col-span-1 flex flex-wrapper items-center`}>
          <img
            src={`${AdminAppConfigReducers["azure:BlobUrl"]}${authimage}`}
            title={`authimage`}
            alt={`authimage`}
            className={`w-auto max-h-60 ml-auto`}
          />
        </div>
        <div className={`col-span-1 `}>
          <img
            src={LoginScreen}
            title={`loginScreen`}
            alt={`loginScreen`}
            className={`w-auto max-h-60 mr-auto`}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className={`select_login relative grid h-full`} id={`loginopt02`}>
        <div className={`col-span-1 flex flex-wrapper items-center`}>
          <img
            src={`${AdminAppConfigReducers["azure:BlobUrl"]}${authimage}`}
            title={`authimage`}
            alt={`authimage`}
            className={`w-auto max-h-60 mx-auto`}
          />
        </div>
        <div className={`max-h-60 absolute top-0 left-1/2 -translate-x-1/2`}>
          <img src={LoginScreen} alt={`loginScreen`} className={`max-h-60`} />
        </div>
      </div>
    );
  }
};

export default ThemeConfiguration;
