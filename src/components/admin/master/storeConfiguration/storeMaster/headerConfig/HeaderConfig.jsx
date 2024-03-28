/*Component Name: Template create
Component Functional Details: Here we are creating template with components.
Created By: Vikas Patel 
Created Date: - 06/30/2022
Modified By:
Modified Date:  */

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Formik, Form as FormikForm } from 'formik';

import TemplateHeader from "components/admin/content/template/create/TemplateHeader";
import TemplateFooter from "components/admin/content/template/create/TemplateFooter";
import CMSConfiguration from "services/admin/cmsConfiguration/CMSConfiguration";
import ElementHeaderSetup from "components/admin/content/template/create/elements/ElementHeaderSetup";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Messages from "components/common/alerts/messages/Index";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { UpdateJsonDetails, stringToJsonParser, updateStoreDetails } from "services/common/helper/Helper"
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { ValidationMsgs } from 'global/ValidationMessages';
import StoreEditHeader from "components/admin/content/page/edit/StoreEditHeader";
import CategoryServiceCls from "services/admin/category/CategoryService";
import TopicsDetailsServicesCls from "services/admin/topics/TopicsDetailsServices";
import { UpdateMessage, anniesAnnualData } from "global/Enum";
import StoreServiceCls from "services/admin/store/StoreService";

const HeaderConfig = () => {
  const CompanyName = useSelector((store) => store?.CompanyConfiguration.data);
  const navigate = useNavigate();
  const { id: storeId } = useParams();
  const submitBtnRef = useRef();
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(false)
  const [store, setStore] = useState({});

  const imagePath = `/${CompanyName}/store/${storeId}/images/`;
  const [headerProps, setHeaderProps] = useState({
    id: 0,
    template_Id: 1,
    header_bg_color: "#FFFFFF",
    header_text_color: "#000000",
    first_icon: false,
    second_icon: false,
    third_icon: false,
    forth_icon: false,
    fifth_icon: false,
    announcementRow: [{
      isVisible: false,
      leftsideText: "",
      rightSideText: "",
      textColor: "text-white",
      backgroundColor: "primary"

    },
    {
      isVisible: false,
      leftsideText: "",
      rightSideText: "",
      textColor: "text-white",
      backgroundColor: "bg-green-400"
    }
    ]
  });


  const getHeaderConfigData = useCallback(() => {
    dispatch(setAddLoading(true))

    CMSConfiguration.getConfiguration(storeId, "header_config").then((res) => {
      const headerConfigObj = stringToJsonParser(res.data.data.config_value).data

      if (Object.keys(headerConfigObj).length) {
        headerConfigObj["id"] = res?.data?.data?.id || 0

        // console.log("headerConfigObj ", headerConfigObj);
        // delete headerConfigObj.announcementRow

        setHeaderProps((prevData) => ({ ...prevData, ...headerConfigObj }));
      }
      dispatch(setAddLoading(false))
    }).catch((error) => {
      dispatch(setAddLoading(false))
    });
  }, [])

  const updateHeaderConfigData = (values) => {

    var jsonData = JSON.stringify(values);
    let headerConfigObj = {
      "store_id": storeId,
      "id": values.id,
      "config_name": "header_config",
      "config_value": jsonData,
      "status": "Y"
    }

    CMSConfiguration.updateConfiguration(headerConfigObj)
      .then(async (res) => {
        if (res.data.success) {
          // UpdateJsonDetails(dispatch,UpdateMessage.storeheaderConfiguration.message)
          if (store?.url) {
            await updateStoreDetails(store?.url);
          }
        } else {
          dispatch(setAlertMessage({
            type: 'danger',
            message: ValidationMsgs.cmsConfig.headerConfig.headerNotUpdated
          }));
        }
        setUpdate(prev => !prev)
      })
      .catch(() => {
        dispatch(setAlertMessage({
          type: 'danger',
          message: ValidationMsgs.cmsConfig.headerConfig.headerNotUpdated
        }));
      })
  }

  const onSubmit = (fields) => {
    updateHeaderConfigData(fields);

  }

  useEffect(() => {
    getHeaderConfigData();
  }, [update]);

  useEffect(() => {
    StoreServiceCls.getStoreById(storeId)
      .then((response) => {
        if (response?.data?.success && response?.data?.data) {
          let storeData = response?.data?.data;
          setStore(storeData);
        }
      })
      .catch((error) => { });
  }, [storeId]);

  const saveData = () => {
    submitBtnRef?.current?.click()
  };

  return (
    <>
      <title>Configure Header</title>

      <StoreEditHeader activeTab={4} />
      <div className="flex py-3 p-4 justify-between items-center bg-slate-800 sticky inset-0 bottom-auto z-60">
        <div className="flex items-center flex-wrap">
          <div className="relative inline-flex">
            <button
              type="button"
              onClick={() => navigate(-1)} className="flex flex-wrap btn-sm px-4 py-[5px] bg-white hover:bg-indigo-500 text-indigo-500 hover:text-white mr-2"
            >
              Exit
            </button>

            <a
              href={undefined}
              className="px-4 py-[5px] btn-sm bg-indigo-500 hover:bg-indigo-600 text-white mr-2"
              onClick={saveData}
            >
              Save
            </a>
          </div>
        </div>
      </div>

      <div className="flex justify-between border-solid border-b-gray-100 w-full">
        <div className="w-full">

          <Formik
            enableReinitialize={true}
            initialValues={headerProps}
            onSubmit={onSubmit}
          >
            {
              ({ setFieldValue, errors, values, resetForm }) => {
                return (
                  <FormikForm>
                    <div className="flex mb-6 relative">
                      {/* Left Side Panel Code Starts */}
                      <button ref={submitBtnRef} className="pointer-event-none hidden ">hey there</button>
                      <div
                        className="relative transition-all bg-slate-100 overflow-x-hidden shadow-lg bottom-0 ml-3 z-40 w-2/6"
                        id="left"
                        style={{ width: "380px" }}
                      >
                        {/* left side/ settings parts */}
                        <ElementHeaderSetup imagePath={imagePath} values={values} setFieldValue={setFieldValue} />
                      </div>

                      {/* Content Part code Starts */}
                      <div
                        id="#desktop_phone_view"
                        className="transition-all relative grow w-4/6"
                      >

                        <div className="p-4 relative z-10">
                          <div className="border border-dashed border-neutral-200 mx-auto">
                            <div className="w-full mx-auto">
                              <div className="font-inter antialiased bg-slate-100 text-gray-500">
                                <div className="border border-dashed border-neutral-200 mx-auto">
                                  <div className="font-inter antialiased bg-slate-100 text-gray-500">

                                    <div>
                                      <Messages />
                                    </div>
                                    <div className="p-4">
                                      {
                                        values?.template_Id && <TemplateHeader values={values} />
                                      }
                                      <div className="min-h-[42vh]"></div>
                                      <TemplateFooter />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </FormikForm>
                );
              }
            }
          </Formik>

        </div>
      </div>

    </>
  );
};

export default HeaderConfig;