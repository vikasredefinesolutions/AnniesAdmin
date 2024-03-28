import React, { useState, useEffect, useCallback, useRef } from "react";
import { fillSerchQuery } from "redux/searchQueryForMGS/SearchQueryAction";
import { TitleNameHelper, serverError } from "services/common/helper/Helper";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { CategoryEditTabs, anniesAnnualData } from "global/Enum";
import Messages from "components/common/alerts/messages/Index";
import Tabs from "components/common/Tabs";
import BasicInfo from "./form/BasicInfo";
import AdditionalInformation from "./form/AdditionalInformation";
import All from "./views/AllInfo";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { ValidationMsgs } from "global/ValidationMessages";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import CategoryService from "services/admin/master/store/categoryMaster/CategoryMasterService";
import SideBar from "./SideBar";
import CartPagePolicy from "./form/CartPagePolicy";
import CategorySEO from "./form/CategorySEO";
import CategoryProducts from "./form/categoryProducts/CategoryProducts";
import CategoryImages from "./form/CategoryImages";

const Create = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const GlobalLoading = useSelector(
    (store) => store?.GlobalLoaderReducer?.toLoad
  );
  const permission = useSelector((store) => store.permission);
  const storeId = anniesAnnualData.storeId;

  const searchQuery = useSelector(
    (store) => store?.SearchQueryReducers?.searchQuery
  );
  const [CategoryTabData, setCategoryTabData] = useState([]);
  const [data, setData] = useState({});

  const [FormSubmit, setFormSubmit] = useState(null);
  const [activeTab, setactiveTab] = useState(0);
  let outerSubmitCount = useRef({});
  const isAddMode = !id;

  const onTabClick = (e, index) => {
    setactiveTab(index);
    outerSubmitCount.current = {};
    dispatch(setAlertMessage({}));
  };

  const getCategoryData = useCallback(() => {
    if (id) {
      dispatch(setAddLoading(true));
      CategoryService.getCategoryById(id)
        .then((response) => {
          if (response.data.data) {
            setData(response.data.data);
          } else {
            dispatch(
              setAlertMessage({
                message: ValidationMsgs.common.productNotFound,
                type: "danger",
              })
            );
          }
          dispatch(setAddLoading(false));
        })
        .catch((error) => {
          dispatch(
            setAlertMessage({
              message: ValidationMsgs.common.productNotFound,
              type: "danger",
            })
          );
          dispatch(setAddLoading(false));
        });
    }
  }, [id]);
  
  const components = {
    all: All,
    BasicInfo: BasicInfo,
    AdditionalInformation: AdditionalInformation,
    CategoryProducts: CategoryProducts,
    CartPagePolicy: CartPagePolicy,
    CategorySEO: CategorySEO,
    Images: CategoryImages,
  };

  useEffect(() => {
    if (isAddMode) {
      setCategoryTabData(
        CategoryEditTabs.filter((element) => element.componentname != "all")
      );
    } else {
      if (data.isShopTheGardenTabDisplay) {
        setCategoryTabData(
          CategoryEditTabs.map((tab) => {
            if (tab.componentname == "CategoryProducts") {
              return {
                ...tab,
                label: "Garden Products",
                value: "Garden Products",
              };
            }
            return tab;
          })
        );
      } else {
        setCategoryTabData(CategoryEditTabs);
      }
    }
  }, [isAddMode, id, data]);

  useEffect(() => {
    getCategoryData();
  }, [id]);

  return (
    <>
      <title>
        {isAddMode ? "Create" : "Edit"}
        {TitleNameHelper({ defaultTitleName: "Category" })}
        {data.firstname ? "| " + data.firstname + " " + data.lastName : ""}
      </title>
      <div className="py-8">
        {/* Page header */}
        <div className="px-4 sm:px-6 lg:px-8 w-full items-center flex justify-between sticky top-0 z-20 py-2 bg-slate-100">
          <div className="flex items-center">
            <div
              onClick={() => {
                searchQuery && dispatch(fillSerchQuery(true));
              }}
            >
              <NavLink
                to={-1}
                className="btn border-neutral-200 hover:border-neutral-400 text-gray-500 hover:text-gray-700 flex items-center mr-2"
              >
                <span className="material-icons-outlined">west</span>
              </NavLink>
            </div>
            <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
              {isAddMode ? "Create " : "Edit "}
              {TitleNameHelper({ defaultTitleName: "Category" })}
            </h1>
          </div>
          {((FormSubmit && activeTab !== 0) || isAddMode) &&
            (permission?.isEdit || permission?.isDelete) && (
              <div className="flex flex-wrap space-x-2">
                <NavLink
                  className="btn bg-white border-neutral-200 text-gray-500 hover:text-gray-700"
                  to={"/admin/master/Configuration/CategoryMaster"}
                >
                  Cancel
                </NavLink>

                <button
                  type="button"
                  className={`btn px-6 bg-indigo-500 hover:bg-indigo-600 text-white`}
                  onClick={(e) => {
                    if (
                      outerSubmitCount &&
                      Object.keys(outerSubmitCount.current).length > 0 &&
                      activeTab == 1
                    ) {
                      dispatch(
                        setAlertMessage({
                          type: "danger",
                          message: serverError({
                            data: { errors: outerSubmitCount },
                          }),
                        })
                      );
                    }
                    if (FormSubmit && FormSubmit?.handleSubmit) {
                      FormSubmit.handleSubmit();
                    }
                  }}
                >
                  {GlobalLoading && (
                    <span className="spinner-border spinner-border-sm mr-2"></span>
                  )}
                  Save
                </button>
              </div>
            )}
        </div>
        <div className="px-4 sm:px-6 lg:px-8 w-full pt-7">
          <Messages />
          {/* Form Part */}
          <div className="grid grid-cols-12 gap-6">
            {/* Information Part */}
            <div className="col-span-full xl:col-span-9 relative">
              <div className="w-full bg-white shadow-xxl rounded-md mb-8">
                <Tabs
                  options={CategoryTabData}
                  activeTab={activeTab}
                  setActiveTab={setactiveTab}
                  isAddMode={isAddMode}
                  onTabClick={onTabClick}
                />
                {CategoryTabData.filter((element) =>
                  isAddMode ? element.componentname === "BasicInfo" : true
                ).map((value, index) => {
                  let Component = components[value.componentname];
                  return (
                    <div key={index} className="px-5">
                      {activeTab === index && (
                        <Component
                          setFormSubmit={setFormSubmit}
                          index={index}
                          activeTab={activeTab}
                          setactiveTab={setactiveTab}
                          values={data}
                          getCategoryData={getCategoryData}
                          CategoryEditTabs={CategoryEditTabs}
                          isAddMode={isAddMode}
                          isEditCustomerShow={true}
                          storeIdFromCustomerEdit={data?.storeId}
                          storeId={storeId}
                          mainCategoryId={id}
                          CategoryService={CategoryService}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col col-span-full xl:col-span-3">
              <SideBar
                isAddMode={isAddMode}
                values={data}
                storeId={storeId}
                getCategoryData={getCategoryData}
                updateCategorySingleField={
                  CategoryService.updateCategorySingleField
                }
                CategoryService={CategoryService}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
