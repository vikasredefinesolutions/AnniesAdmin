/*Component Name: SEOConfiguration
Component Functional Details: User can create or update General master details from here.
Created By: Chandan 
Created Date: 29-06-2022
Modified By: Chandan 
Modified Date: 29-06-2022 */

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Social from "./Social";
import Integration from "./Integration";
import General from "./General";
import BasicModal from "components/common/modals/Basic";
import Tabs from "components/common/Tabs";
import SeoConfigurationService from "services/admin/seoConfiguration/SeoConfigurationService"
import { useSelector, useDispatch } from "react-redux";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { serverError, TitleNameHelper } from "services/common/helper/Helper";
import Messages from "components/common/alerts/messages/Index";
import { displayTabs } from "global/Enum"
import { ValidationMsgs } from "global/ValidationMessages";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";

const SEOConfiguration = () => {
  const permission = useSelector(store => store.permission);
  const GlobalLoading = useSelector((store) => store?.GlobalLoaderReducer?.toLoad);
  const [ModalInfo, setModalInfo] = useState({});
  const [openBasicModal, setOpenBasicModal] = useState(false);
  const [FormSubmit, setFormSubmit] = useState(null);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [isError, setIsError] = useState(false);
  const [Data, setData] = useState({});
  const location = useSelector((store) => store?.location);
  // const [isDesabledAddCatalog, setisDesabledAddCatalog] = useState("");
  const dispatch = useDispatch();
  const moduleName = "seo";

  const componentsForm = {
    General: General,
    Social: Social,
    Integration: Integration,
  };
  const onTabClick = (e, index) => {
    e.preventDefault();
    if (!isError) {
      setActiveTab(index);
    } else {
      setModalInfo((prev) => {
        return {
          ...prev,
          message: ValidationMsgs.common.tabValidation,
          module: "Product",
          title: "Form Error",
          ButtonName: "Save Changes",
          displayCancelButton: false,
        };
      });
      setOpenBasicModal((prev) => !prev);
    }
  };
  const getSeoConfigurationService = () => {
    dispatch(setAddLoading(true))

    SeoConfigurationService.getSeoConfigurationService()
      .then((res) => {
        var SeoData = res.data;
        if (SeoData.success && res.data.data) {
          setData(SeoData?.data);
        }
        dispatch(setAddLoading(false))
      })
      .catch((err) => {
        dispatch(setAddLoading(false))
      });
  };

  useEffect(() => {
    getSeoConfigurationService();
  }, []);

  const createSeoConfigurationService = (fields) => {
    dispatch(setAddLoading(true))

    SeoConfigurationService.createSeoConfigurationService({ seoConfigurationModel: { ...fields, ...location,/*  rowVersion: "" */ } })
      .then((response) => {
        if (response.data.success) {
          // setisDesabledAddCatalog(response.data.data.id);

          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.seoConfig.created,
            })
          );
          getSeoConfigurationService();
        } else {
          dispatch(
            setAlertMessage({ type: "danger", message: serverError(response) })
          );
          dispatch(setAddLoading(false))

        }
      })
      .catch((errors) => {
        dispatch(
          setAlertMessage({
            type: "danger",
            message: ValidationMsgs.seoConfig.notCreated,
          })
        );
        dispatch(setAddLoading(false))

      });
  };

  const updateSeoConfigurationService = (fields) => {
    dispatch(setAddLoading(true))

    // fields.id = Number(id);
    SeoConfigurationService.updateSeoConfigurationService({ seoConfigurationModel: { ...Data, ...fields, ...location, } })
      .then((response) => {
        if (response.data.success) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.seoConfig.updated,
            })
          );
          getSeoConfigurationService();
          dispatch(setAddLoading(false))

        } else {
          dispatch(
            setAlertMessage({ type: "danger", message: serverError(response) })
          );
          dispatch(setAddLoading(false))
        }

      })
      .catch((errors) => {
        dispatch(
          setAlertMessage({
            type: "danger",
            message: ValidationMsgs.seoConfig.notUpdated,
          })
        );
        dispatch(setAddLoading(false))

      });
  };

  const submitHandler = (fields) => {
    if (!Data?.id) {
      createSeoConfigurationService(fields);
    } else {
      updateSeoConfigurationService(fields);
    }
  };

  return (
    <>
      <title>{TitleNameHelper({ defaultTitleName: "SEO Configuration" })}</title>
      <div>
        <div className="px-4 sm:px-6 lg:px-8 w-full items-center flex justify-between sticky top-[0px] mb-2 z-20 py-4 bg-slate-100">
          <div className="flex items-center">
            <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
              {TitleNameHelper({ defaultTitleName: "SEO Configuration" })}
            </h1>
          </div>
          {(FormSubmit && (permission?.isEdit || permission?.isDelete)) && <div className="flex flex-wrap space-x-2">
            <button type="button" onClick={() => navigate(-1)} className="btn bg-white border-neutral-200 text-gray-500 hover:text-gray-700">
              Cancel
            </button>

            <button
              type="submit"
              disabled={GlobalLoading}
              onClick={() => {
                FormSubmit.handleSubmit();
              }}
              className="btn px-6 bg-indigo-500 hover:bg-indigo-600 text-white"
            >
              <div className={`w-full flex justify-center align-middle `}>
                {GlobalLoading && (
                  <span className="spinner-border spinner-border-sm mr-2"></span>
                )}
                Save
              </div>
            </button>
          </div>}
        </div>
        <div className="px-4 sm:px-6 lg:px-8 w-full">
          <Messages />
          <div className="bg-white shadow-xxl rounded-md mb-8">
            <div className="w-full bg-white shadow-xxl rounded-md mb-8 pt-4">
              <Tabs
                options={displayTabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onTabClick={onTabClick}
              />
              <div className="w-full">
                <>
                  {displayTabs.map((tab, index) => {

                    const Component = componentsForm[tab.componentname];
                    return (
                      <div className={`${activeTab !== index && "hidden"} w-full rounded-md mb-8 tab-content text-sm`} key={index}>
                        <Component
                          setFormSubmit={setFormSubmit}
                          activeTab={activeTab}
                          setActiveTab={setActiveTab}
                          index={index}
                          Data={Data}
                          setIsError={setIsError}
                          moduleName={moduleName}
                          getSeoConfigurationService={getSeoConfigurationService}
                          submitHandler={submitHandler}

                        />
                      </div>
                    );
                  })}
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BasicModal
        openModal={openBasicModal}
        setOpenModal={setOpenBasicModal}
        {...ModalInfo}
      />
    </>
  );
};

export default SEOConfiguration;