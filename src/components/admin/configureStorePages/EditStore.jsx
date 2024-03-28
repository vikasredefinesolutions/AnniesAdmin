/*Component Name: EditStore
Component Functional Details: User can create or update EditStore master details from here.
Created By: chandan
Created Date: <Creation Date>
Modified By: chandan
Modified Date: <Modified Date> */

import React, { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { UpdateJsonDetails, stringToJsonParser, updateStoreDetails } from "services/common/helper/Helper"

import StoreHeader from "components/admin/configureStorePages/common/StoreHeader";
import StoreAsideBar from "components/admin/configureStorePages/common/StoreSideBar";
import StoreSetting from "./common/StoreSetting";
import {
  storeSettingProductPageDate,
  storeProductListProperty,
  storeMyAccountPageProperty,
  storeCartPageProperty,
} from "dummy/Dummy";
// import Messages from "components/common/alerts/messages/Index";

import PreviewStore from "./PreviewStore";
// import CategoryListing from './storePages/categoryListing/CategoryListing';
import ProductListing from "./storePages/prodoctListing";
import MyAccountPage from "./storePages/myAccountPage";
import CartPage from "./storePages/cartPage";
import StoreService from "services/admin/store/StoreService";
import { Formik, Form as FormikForm } from "formik";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { useDispatch } from "react-redux";
import CMSConfiguration from "services/admin/cmsConfiguration/CMSConfiguration";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { serverError, TitleNameHelper } from "services/common/helper/Helper";
import { ValidationMsgs } from "global/ValidationMessages";
import StoreEditHeader from "../content/page/edit/StoreEditHeader";
import CategoryServiceCls from "services/admin/category/CategoryService";
import TopicsDetailsServicesCls from "services/admin/topics/TopicsDetailsServices";

import AnniesShoppingCart from "dummy/plainStaticPages/anniesShoppingCart/Index"
import { UpdateMessage, anniesAnnualData } from "global/Enum";

const EditStore = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [initialValues, setInitialValues] = useState({});
  const [configData, setConfigData] = useState({});
  const [showSidebar, setShowSideBar] = useState(true);
  const { type, id } = useParams();
  const [store, setStore] = useState({});

  const PreviewPages = {
    productDetail: {
      Component: PreviewStore,
      Property: storeSettingProductPageDate,
    },
    // categoryPage: { Component: CategoryListing, Property: storeCategoryListProperty },
    productListing: {
      Component: ProductListing,
      Property: storeProductListProperty,
    },
    myAccountPage: {
      Component: MyAccountPage,
      Property: storeMyAccountPageProperty,
    },
    cartPage: { Component: CartPage, Property: storeCartPageProperty },
  };

  const changePage = (event) => {
    navigate(
      "/admin/configurator/storeconfiguration/configuration/" + event.value + "/" + id
    );
  };

  const getCMSConfiguration = useCallback(() => {
    CMSConfiguration.getConfiguration(id, type)
      .then((res) => {
        if (res.data.success && res.data.data) {
          const ourInitialData = JSON.parse(res.data.data.config_value);

          const headerConfigObj = stringToJsonParser(res.data.data.config_value).data

          ourInitialData["someKey"] = "";
          ourInitialData["buy_it_with"] = headerConfigObj?.buy_it_with || [];

          setInitialValues(ourInitialData);
          setConfigData(res.data.data);
          dispatch(setAddLoading(false));
        } else {
          setInitialValues({ someKey: "", buy_it_with: [] });
        }
      })
      .catch((error) => {
        dispatch(setAddLoading(false));
      });
  }, [id, type]);

  const updateProductDetailPageTheme = useCallback((data) => {
    var jsonData = JSON.stringify(data);
    dispatch(setAddLoading(true));

    let headerConfigObj = {
      id: configData?.id || 0,
      store_id: id,
      config_name: type,
      config_value: jsonData,
      status: "Y",
    };
    CMSConfiguration.updateConfiguration(headerConfigObj)
      .then(async (res) => {
        if (res.data.success) {
          // UpdateJsonDetails(dispatch,UpdateMessage.storeThemeConfiguration.message)
          if (store?.url) {
            await updateStoreDetails(store?.url);
          }
          getCMSConfiguration();
        } else {
          dispatch(
            setAlertMessage({
              type: "danger",
              message: serverError(res),
            })
          );
        }
        dispatch(setAddLoading(false));
      })
      .catch((error) => {
        dispatch(
          setAlertMessage({
            type: "danger",
            message: ValidationMsgs.cmsConfig.themeNotStored,
          })
        );
        dispatch(setAddLoading(false));
      });
  },
    [configData,store]
  );

  const handleAttribute = (fields, resetForm) => {
    const myPayload = Object.values(fields);
    if (myPayload.length > 1) {
      delete fields["someKey"];
      updateProductDetailPageTheme(fields);
    } else {
      dispatch(
        setAlertMessage({
          type: "danger",
          message: ValidationMsgs.cmsConfig.FieldsAreMissing,
        })
      );
    }
  };

  useEffect(() => {
    dispatch(setAddLoading(true));

    StoreService.getStoreById(id)
      .then((response) => {
        if (response.data.data) {
          let storeData = response.data.data;
          setStore(storeData);
        }
        dispatch(setAddLoading(false));
      })
      .catch((error) => {
        dispatch(setAddLoading(false));
      });
  }, [id]);

  useEffect(() => {
    if (id && type) {
      getCMSConfiguration();
    }
  }, [id, type]);

  return (
    <>
      <title>{TitleNameHelper({ defaultTitleName: "Configure Store" })}</title>
      <StoreEditHeader activeTab={1} />
      <main className="bg-white">
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          onSubmit={handleAttribute}
        >
          {({ setFieldValue, errors, values, isSubmitting, touched }) => {
            return (
              <FormikForm>
                <StoreHeader type={type} setPage={changePage} store={store} />
                <div className="border-solid border-b-gray-100 w-full flex items-start">
                  <div className={`sticky top-16 bg-slate-100 overflow-x-hidden shadow-lg inset-0 bottom-auto z-60 ${showSidebar ? "min-w-[380px] max-w-[380px]" : ""}`}>
                    <StoreAsideBar
                      showSidebar={showSidebar}
                      setShowSideBar={setShowSideBar}
                    >
                      <StoreSetting
                        page={type}
                        AttributeData={
                          PreviewPages[type]
                            ? PreviewPages[type]?.Property
                            : []
                        }
                        initialValues={initialValues}
                        setInitialValues={setInitialValues}
                      />
                    </StoreAsideBar>
                  </div>
                  <div className="w-full p-2">
                    <AnniesShoppingCart />
                  </div>
                </div>
              </FormikForm >
            );
          }}
        </Formik >
      </main >
    </>
  );
};

export default EditStore;
