import React, { useState, useCallback, useEffect } from "react";
import NestedSettingAttributes from "./NestedSettingAttributes";
import { Formik, Form as FormikForm } from "formik";
import CMSConfiguration from "services/admin/cmsConfiguration/CMSConfiguration";
import { useDispatch, useSelector } from "react-redux";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { useParams } from "react-router-dom";

import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import CategoryServiceCls from "services/admin/category/CategoryService";
import TopicsDetailsServicesCls from "services/admin/topics/TopicsDetailsServices";
import StoreService from "services/admin/store/StoreService";

import { UpdateMessage, anniesAnnualData, mediaQueryVariableForFontSize, mediaQueryVariableForLineHeight } from "global/Enum"
import { UpdateJsonDetails, updateStoreDetails } from "services/common/helper/Helper";

const Settings = ({ onThemeSubmitHandler, AttributeData, onNestedAttributeClickHandler, setUpdate, storeData }) => {
  const permission = useSelector(store => store.permission);
  const [initialValues, setInitialValues] = useState({});
  const GlobalLoading = useSelector((store) => store?.GlobalLoaderReducer?.toLoad);
  const CompanyId = useSelector((store) => store?.CompanyConfiguration.id);
  const { storeid } = useParams();
  const dispatch = useDispatch();
  const [id, setId] = useState(0);



  const getMainThemeConfigData = useCallback(() => {
    CMSConfiguration.getConfiguration(storeid, "main_theme_config")
      .then((res) => {
        setInitialValues(JSON.parse(res.data.data.config_value));

        setId(res.data.data.id);
      })
      .catch((error) => { });
  }, []);

  const updateMainThemeConfigData = useCallback((data) => {

    CMSConfiguration.getConfiguration(storeid, "main_theme_config")
      .then(async (res) => {
        console.log("edbyj", res, storeData?.url);
        if (res && storeData?.url) {
          await updateStoreDetails(storeData?.url);
        }
        setId(res.data.data ? res.data.data.id : 0);

        const ourObjKeys = Object.keys(data)

        const all_text_font_size = ourObjKeys.filter((ourKey) => ourKey.endsWith("-text-font-size"))
        const all_text_line_height = ourObjKeys.filter((ourKey) => ourKey.endsWith("-text-line-height"))


        all_text_font_size.map((ourOldCssVarible) => {

          data[`${ourOldCssVarible}-tablet`] = mediaQueryVariableForFontSize[data[ourOldCssVarible]]?.tablet || 0;
          data[`${ourOldCssVarible}-mobile`] = mediaQueryVariableForFontSize[data[ourOldCssVarible]]?.mobile || 0;
        })

        all_text_line_height.map((ourOldCssVarible) => {

          data[`${ourOldCssVarible}-tablet`] = mediaQueryVariableForLineHeight[data[ourOldCssVarible]]?.tablet || 0;
          data[`${ourOldCssVarible}-mobile`] = mediaQueryVariableForLineHeight[data[ourOldCssVarible]]?.mobile || 0;
        })

        var jsonData = JSON.stringify(data);
        let headerConfigObj = {
          id: id,
          store_id: storeid,
          config_name: "main_theme_config",
          config_value: jsonData,
          status: "Y",
        };
        CMSConfiguration.updateConfiguration(headerConfigObj)
          .then((res) => { })
          .catch(() => {
            dispatch(
              setAlertMessage({
                type: "success",
                message: "Theme Not updated.",
              })
            );
          });
      })
      .catch((error) => { });



  }, [id, storeid]);

  const updateThemeVariableFile = useCallback(
    (data) => {
      const filePath = `${CompanyId}/store/${storeid}/css/${storeid}.css`;
      // const filePath = `${CompanyId}/store/22/css/22.css`;
      // const filePath = `${CompanyId}/store/4/css/4.css`;
      // const filePath = `${CompanyId}/store/5/css/5.css`;
      // const filePath = `${CompanyId}/store/23/css/23.css`;
      dispatch(setAddLoading(true))

      CMSConfiguration.setThemeConfigVariableFile({
        storeId: storeid.toString(),
        filename: filePath,
        content: data,
      })
        .then((res) => {
          dispatch(setAddLoading(false))
          setUpdate(prev => !prev)
        })
        .catch((error) => {
          dispatch(
            setAlertMessage({ type: "danger", message: "Something went wrong" })
          );
          dispatch(setAddLoading(false))

        });
    },
    [CompanyId]
  );

  const handleAttribute = (fields, resetForm) => {
    let FinalOutput = ":root{";
    Object.keys(fields).map((key) => {
      FinalOutput += key + ":" + fields[key] + ";";
    });
    FinalOutput += "}";
    updateMainThemeConfigData(fields);
    updateThemeVariableFile(FinalOutput);
  };

  useEffect(() => {
    getMainThemeConfigData();
  }, []);

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={handleAttribute}
      >
        {({ setFieldValue, errors, values, isSubmitting, touched }) => {
          return (
            <FormikForm>
              <div className="min-h-[65vh] max-h-[65vh] relative scrollbar-hide scrollbar-thin">

                <div className="min-h-[65vh] max-h-[65vh] overflow-y-scroll scrollbar-hide scrollbar-thin">
                  <NestedSettingAttributes
                    AttributeData={AttributeData}
                    onNestedAttributeClickHandler={onNestedAttributeClickHandler}
                    setFieldValue={setFieldValue}
                  />
                </div>
                <div className="p-3 sticky bottom-0  bg-white">
                  {(permission?.isEdit || permission?.isDelete) &&
                    <button
                      className={`btn border-indigo-300 hover:border-indigo-400 text-indigo-500 w-full ${GlobalLoading
                        ? "bg-indigo-200 hover:bg-indigo-200"
                        : "cursor-pointer"
                        }`}
                      type="submit"
                      disabled={Object.keys(values).length <= 0}
                    >
                      {GlobalLoading && (
                        <span className="spinner-border spinner-border-sm mr-2"></span>
                      )}
                      Apply Theme
                    </button>
                  }
                </div>
              </div>

            </FormikForm>
          );
        }}
      </Formik>
    </>
  );
};

export default Settings;
