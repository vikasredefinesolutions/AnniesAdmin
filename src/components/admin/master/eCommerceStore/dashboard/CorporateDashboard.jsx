/*Component Name: MC Dashboard
Component Functional Details: User can create or update All master details from here.
Created By: Divyesh
Created Date: <Creation Date>
Modified By: chandan
Modified Date: 03/10/2022 */

import React, { useState, useEffect, useCallback } from "react";
import { Link, NavLink } from "react-router-dom";
import DashboardService from "services/admin/master/dashboard/DashboardService";
import { useDispatch, useSelector } from "react-redux";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import ReactTooltip from "react-tooltip";
import { Fragment } from "react";
import { MenuNameReturner, TitleNameHelper, getDashboardRedirectUrl } from "services/common/helper/Helper";

const DashBoard = ({ SetChangeTab }) => {
  const dispatch = useDispatch();
  const [stores, setStores] = useState([]);
  const [CorporateTileData, setCorporateTileData] = useState({});
  const [MasterData, setMasterData] = useState([]);

  const MenuListByUserRoleReducers = useSelector(
    (store) => store?.MenuListByUserRoleReducers
  );
  const AdminAppConfigReducers = useSelector(
    (store) => store?.AdminAppConfigReducers
  );
  const { data: MenuList } = useSelector(
    (store) => store.MenuListByUserRoleReducers
  );
  const currentUser = useSelector((store) => store?.user);
  const CompanyConfiguration = useSelector(
    (store) => store?.CompanyConfiguration
  );

  const getDashboardData = useCallback((pageIndex) => {
    dispatch(setAddLoading(true));

    DashboardService.getDashboardData({
      userid: currentUser?.id,
      companyConfigurationId: CompanyConfiguration?.id,
      isSuperUser: currentUser?.isSuperUser,
    })
      .then((stores) => {
        if (stores.data.success) {
          setStores(stores.data.data);
        }

        dispatch(setAddLoading(false));
      })
      .catch((error) => {
        dispatch(setAddLoading(false));
      });
  }, []);

  const getCorporateProductData = useCallback((pageIndex) => {
    dispatch(setAddLoading(true));

    DashboardService.getECommerceProductData({})
      .then((MasterData) => {
        if (MasterData.data.success && MasterData.data.data) {
          let CommerceCorporateData = MasterData.data.data.filter(
            (data) => data.name === "Corporate Store"
          );
          if (CommerceCorporateData[0].child.length > 0) {
            setMasterData(CommerceCorporateData[0]);
          }
        }
        dispatch(setAddLoading(false));
      })
      .catch((error) => {
        dispatch(setAddLoading(false));
      });
  }, []);

  useEffect(() => {
    getDashboardData();
    getCorporateProductData();
    DashboardService.getECommerceData({})
      .then((MasterData) => {
        if (MasterData.data.success && MasterData.data.data) {
          let ECommerceData = MasterData.data.data.filter(
            (data) => data.name === "Corporate Store"
          );
          setCorporateTileData(ECommerceData[0]);
        }

        dispatch(setAddLoading(false));
      })
      .catch((error) => {
        dispatch(setAddLoading(false));
      });
  }, []);

  return (
    <>
      <title>{TitleNameHelper({ defaultTitleName: "Corporate Store" })} </title>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto">
        <div className="grid gap-6 max-w-3xl mx-auto mb-6">
          {/* Corporate Store */}
          {MenuNameReturner(MenuListByUserRoleReducers, "codeName", "CorporateStore").length >
            0 && (
              <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-6 bg-white shadow-lg rounded-md">
                <div className="text-center item-center block">
                  <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full text-center">
                      <Link
                        to="/admin/master/GrandMasterCatalog"
                        onClick={() => {
                          SetChangeTab(0);
                        }}
                      >
                        <div className="p-3 font-semibold text-xl text-gray-700 border-b-2 border-neutral-200">
                          {MenuNameReturner(MenuListByUserRoleReducers, "codeName", "CorporateStore")[0]?.name}
                        </div>
                      </Link>
                      <div className="p-3 text-gray-700 uppercase font-bold text-xs flex justify-between border-b border-neutral-200 last:border-b-0">
                        <Link
                          to="/admin/master/GrandMasterCatalog"
                          onClick={() => {
                            SetChangeTab(0);
                          }}
                        >
                          <div>Product</div>
                        </Link>
                        <div>{CorporateTileData?.totalProduct}</div>
                      </div>
                      <div className="p-3 text-gray-700 uppercase font-bold text-xs flex justify-between border-b border-neutral-200 last:border-b-0">
                        <Link
                          to="/admin/master/Configuration/brand"
                          onClick={() => {
                            SetChangeTab(0);
                          }}
                        >
                          <div>Brand</div>
                        </Link>
                        <div>{CorporateTileData?.brand}</div>
                      </div>
                      <div className="p-3 text-gray-700 uppercase font-bold text-xs flex justify-between border-b border-neutral-200 last:border-b-0">
                        <Link
                          to="/admin/master/Configuration/vendor"
                          onClick={() => {
                            SetChangeTab(0);
                          }}
                        >
                          <div>Vendor</div>
                        </Link>
                        <div>{CorporateTileData?.vendor}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>

        <div className="mb-6">
          <div className="grid grid-cols-12 gap-6">
            {stores &&
              stores.length > 0 &&
              stores.map((storeType, index) => {
                if (storeType?.storeTypeName === "Corporate Store") {
                  return (
                    <div
                      className="flex flex-col col-span-full sm:col-span-12 xl:col-span-12 bg-white shadow-lg rounded-md"
                      key={index}
                    >
                      {MenuNameReturner(MenuListByUserRoleReducers, "name", storeType?.storeTypeName) && (
                        <div className="text-center item-center block">
                          <div className="p-3 font-semibold text-xl text-gray-700 border-b-2 border-neutral-200">
                            {
                              MenuNameReturner(MenuListByUserRoleReducers, "codeName", "CorporateStore")[0]?.name
                            }
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-10 gap-6 p-6 max-h-[700px] overflow-y-scroll">
                            {storeType?.store.map((storeData, index) => {
                              return (
                                MenuNameReturner(MenuListByUserRoleReducers, "name", storeData.name) && (
                                  <Fragment key={index}>
                                    <div
                                      className="relative w-full text-center"
                                      key={index}
                                    >
                                      <div className="relative">
                                        <NavLink
                                          to={getDashboardRedirectUrl(storeType, storeData)}
                                          // onClick={() => handleRouteNavigate(getDashboardRedirectUrl(storeType, storeData))}
                                          data-tip
                                          data-for={storeData?.name}
                                        // to={`/admin/master/${storeType.storeTypeName.replaceAll(" ","")}/${storeData.name.replaceAll(" ", "")}/${storeData.id}/products`}
                                        >
                                          <div className="text-gray-700 text-xs border border-solid border-neutral-300 rounded-lg">
                                            <div className={`grow flex items-center justify-center p-1 h-40
                                                ${storeData.emailLogo !== "" && storeData.emailLogo !== undefined && storeData.emailLogo !== null ? "" : "bg-sky-400/10"}
                                              `}>
                                              {storeData.emailLogo !== "" && storeData.emailLogo !== undefined && storeData.emailLogo !== null ?
                                                <img
                                                  className="max-h-full mx-auto"
                                                  src={`${AdminAppConfigReducers["azure:BlobUrl"]}${storeData.emailLogo}?${Math.random(5)}`}
                                                  alt=""
                                                /> :
                                                <div className="h-24 w-40 p-2  flex justify-center items-center">
                                                  <img src={`/noImage.png`} alt={"not available"} />
                                                </div>
                                              }</div>
                                            <div className="p-1 border-t bg-slate-100 flex items-center justify-center min-h-[1.682vw] border-neutral-200 overflow-hidden text-ellipsis rounded-b-md">
                                              {storeData?.name}
                                            </div>

                                            <ReactTooltip
                                              id={storeData?.name}
                                              place="bottom"
                                              effect="solid"
                                            >
                                              <div className="text-xs text-gray-200 font-light whitespace-nowrap rounded overflow-hidden min-w-44">
                                                <div className="flex flex-wrap justify-between w-full">
                                                  <div className="text-sm font-semibold text-white mb-1">
                                                    Active Product
                                                  </div>
                                                  <div className="text-sm font-semibold text-white mb-1">
                                                    {storeData.activeProduct}
                                                  </div>
                                                </div>
                                                <div className="flex flex-wrap justify-between w-full">
                                                  <div className="text-sm font-semibold text-white mb-1">
                                                    Inactive Product
                                                  </div>
                                                  <div className="text-sm font-semibold text-white mb-1">
                                                    {storeData.inActiveProduct}
                                                  </div>
                                                </div>
                                                <div className="flex flex-wrap justify-between w-full">
                                                  <div className="text-sm font-semibold text-white mb-1">
                                                    Order
                                                  </div>
                                                  <div className="text-sm font-semibold text-white mb-1">
                                                    {storeData.order}
                                                  </div>
                                                </div>
                                                <div className="flex flex-wrap justify-between w-full">
                                                  <div className="text-sm font-semibold text-white mb-1">
                                                    Active Brand
                                                  </div>
                                                  <div className="text-sm font-semibold text-white mb-1">
                                                    {storeData.activeBrand}
                                                  </div>
                                                </div>
                                                <div className="flex flex-wrap justify-between w-full">
                                                  <div className="text-sm font-semibold text-white mb-1">
                                                    Active Category
                                                  </div>
                                                  <div className="text-sm font-semibold text-white mb-1">
                                                    {storeData.activeCategory}
                                                  </div>
                                                </div>
                                                <div className="flex flex-wrap justify-between w-full">
                                                  <div className="text-sm font-semibold text-white mb-1">
                                                    Total Products
                                                  </div>
                                                  <div className="text-sm font-semibold text-white mb-1">
                                                    {storeData.totalProduct}
                                                  </div>
                                                </div>
                                                {storeType?.storeTypeName.toLowerCase() ==
                                                  "store builder" && (
                                                    <>
                                                      <div className="flex flex-wrap justify-between w-full">
                                                        <div className="text-sm font-semibold text-white mb-1">
                                                          Active Store
                                                        </div>
                                                        <div className="text-sm font-semibold text-white mb-1">
                                                          {storeData.activeStore}
                                                        </div>
                                                      </div>
                                                      <div className="flex flex-wrap justify-between w-full">
                                                        <div className="text-sm font-semibold text-white mb-1">
                                                          Inactive Store
                                                        </div>
                                                        <div className="text-sm font-semibold text-white mb-1">
                                                          {
                                                            storeData.inActiveStore
                                                          }
                                                        </div>
                                                      </div>
                                                      <div className="flex flex-wrap justify-between w-full">
                                                        <div className="text-sm font-semibold text-white mb-1">
                                                          Draft Store
                                                        </div>
                                                        <div className="text-sm font-semibold text-white mb-1">
                                                          {storeData.drafStore}
                                                        </div>
                                                      </div>
                                                      <div className="flex flex-wrap justify-between w-full">
                                                        <div className="text-sm font-semibold text-white mb-1">
                                                          Total Store
                                                        </div>
                                                        <div className="text-sm font-semibold text-white mb-1">
                                                          {storeData.totalStore}
                                                        </div>
                                                      </div>
                                                    </>
                                                  )}
                                              </div>
                                            </ReactTooltip>
                                          </div>
                                        </NavLink>
                                      </div>
                                    </div>
                                  </Fragment>
                                )
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }
              })}

            {/* Corporate Master */}
            {MenuNameReturner(MenuListByUserRoleReducers, "codeName", "CorporateStore").length >
              0 && (
                <div className="flex flex-col col-span-full">
                  <div className="text-center item-center block">
                    <div className="p-3 font-semibold text-base lg:text-xl text-gray-700 border-b-2 border-neutral-200 mb-6">
                      {MenuNameReturner(MenuListByUserRoleReducers, "codeName", "CorporateStore")[0]?.name}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                      {MasterData &&
                        MasterData?.child?.length > 0 &&
                        MasterData?.child.map((data) => {
                          return (
                            <div className="relative w-full text-center">
                              <div className="text-gray-700 font-bold text-sm bg-white shadow-lg rounded-md">
                                <div className="p-3 h-40 flex items-center justify-center">
                                  <span className="material-icons-outlined text-6xl">
                                    {data?.menuIcon}
                                  </span>
                                </div>
                                <div className="p-3 border-t border-neutral-200 text-xl">
                                  {data?.count}
                                </div>
                                <div className="p-3 border-t border-neutral-200">
                                  {data?.name}
                                </div>
                                {/* </Link> */}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
