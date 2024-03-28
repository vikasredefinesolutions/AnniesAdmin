/*Component Name: MC Dashboard
Component Functional Details: User can create or update All master details from here.
Created By: Divyesh
Created Date: <Creation Date>
Modified By: chandan
Modified Date: 03/10/2022 */

import React, { useState, useEffect, useCallback, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import DashboardService from "services/admin/master/dashboard/DashboardService";
import { MenuNameReturner, TitleNameHelper } from "services/common/helper/Helper";

import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";

const DashBoard = ({ SetChangeTab }) => {
  const dispatch = useDispatch();
  const [MasterData, setMasterData] = useState(null);
  const [ECommerceTileData, setECommerceTileData] = useState({});

  const MenuListByUserRoleReducers = useSelector(
    (store) => store?.MenuListByUserRoleReducers
  );

  const productRedirectUrl = MenuNameReturner(
    MenuListByUserRoleReducers,
    "codeName",
    "GMC"
  )[0]?.url;

  const getMasterProductData = useCallback((pageIndex) => {
    dispatch(setAddLoading(true));

    DashboardService.getECommerceProductData({})
      .then((response) => {
        if (response?.data?.success && response?.data?.data) {
          let StoreData = response?.data?.data.filter(
            (data) =>
              data.name.replace(" ", "").toLowerCase() === "ecommercestore"
          );
          if (StoreData[0].child.length > 0) {
            setMasterData(
              StoreData[0].child.filter(
                (value) =>
                  value.name !== "Brand" && value.name !== "Product Categories"
              )
            );
            setECommerceTileData(StoreData[0].child.filter((value) => value.name.toLowerCase() === "total product"))
          }
        }
        dispatch(setAddLoading(false));
      }).catch((error) => {
        dispatch(setAddLoading(false));
      });
  }, []);

  // const getOnlyTotal = () => {
  //   DashboardService.getECommerceData({})
  //     .then((MasterData) => {
  //       if (MasterData.data.success && MasterData.data.data) {
  //         let ECommerceData = MasterData.data.data.filter(
  //           (data) => data.name === "ECommerce Store"
  //         );
  //         setECommerceTileData(ECommerceData[0]);
  //       }

  //       dispatch(setAddLoading(false));
  //     })
  //     .catch((error) => {
  //       dispatch(setAddLoading(false));
  //     });
  // };

  useEffect(() => {
    getMasterProductData();
    // getOnlyTotal();
  }, []);
  return (
    <>
      <title>
        {TitleNameHelper({ defaultTitleName: "Master Product Feed Dashboard" })}
      </title>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto">
        <div className="grid grid-cols-12 gap-6 max-w-3xl mx-auto mb-6 justify-center">
          <div className="flex flex-col col-span-full sm:col-span-12 xl:col-span-12 bg-white shadow rounded-md">
            <div className="text-center item-center block">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full max-w-full text-center">
                  <Link
                    to={productRedirectUrl}
                    onClick={() => {
                      SetChangeTab(0);
                    }}
                  >
                    <div className="p-3 font-semibold text-xl text-gray-700 border-b-2 border-neutral-200">
                      {
                        MenuNameReturner(
                          MenuListByUserRoleReducers,
                          "codeName",
                          "MCF"
                        )[0]?.name
                      }
                    </div>
                  </Link>
                  <div className="p-3 text-gray-700 uppercase font-bold text-xs flex justify-between border-b border-neutral-200 last:border-b-0">
                    <Link to={productRedirectUrl}>
                      <div>Product</div>
                    </Link>
                    <div>{ECommerceTileData?.[0]?.count}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 max-w-6xl mx-auto">
          <div className="flex flex-col col-span-full sm:col-span-12">
            <div className="text-center item-center block">
              <div className="p-3 font-semibold text-base lg:text-xl text-gray-700 border-b-2 border-neutral-200 mb-6">
                {
                  MenuNameReturner(
                    MenuListByUserRoleReducers,
                    "codeName",
                    "MCF"
                  )[0]?.name
                }
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {MasterData &&
                  MasterData.length > 0 &&
                  MasterData.map((data, index) => {
                    return (
                      <Fragment key={index}>
                        <div className="relative w-full text-center">
                          <div className="text-gray-700 font-bold text-sm bg-white shadow rounded-md">
                            <div className="p-3 h-40 flex items-center justify-center">
                              <span className="material-icons-outlined text-6xl">
                                {data?.menuIcon}
                              </span>
                            </div>
                            <div className="p-3 border-t border-neutral-200 text-xl">
                              {data?.count}
                            </div>
                            <Link
                              to={productRedirectUrl}
                              onClick={() => {
                                SetChangeTab(3);
                              }}
                            >
                              <div className="p-3 border-t border-neutral-200">
                                {data?.name}
                              </div>
                            </Link>
                          </div>
                        </div>
                      </Fragment>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
