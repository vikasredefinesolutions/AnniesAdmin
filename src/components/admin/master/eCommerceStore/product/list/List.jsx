/*Component Name: List
Component Functional Details: User can create or update List master details from here.
Created By: chandan
Created Date: 01-07-2022
Modified By: Shrey Patel
Modified Date: 09-13-2022 */

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { StoreProductStatusTabs } from "global/Enum";
import { useDispatch, useSelector } from "react-redux";
import { TitleNameHelper } from "services/common/helper/Helper";
import { addActiveTab } from "redux/searchQueryForMGS/SearchQueryAction"
import Tabs from "components/common/Tabs";
import Messages from "components/common/alerts/messages/Index";

import All from "../views/All";

const List = () => {
  const dispatch = useDispatch();

  const permission = useSelector(store => store.permission);
  const { toFill, currentTab } = useSelector((store) => store?.SearchQueryReducers);

  const [activeTab, setActiveTab] = useState(toFill ? currentTab : 0);
  const [selectedData, setSelectedData] = useState([]);

  const displayTabs = StoreProductStatusTabs;

  const onTabClick = (e, index) => {
    setActiveTab(index);
    dispatch(addActiveTab(index));
  };

  useEffect(() => {
    if (!toFill) {
      setActiveTab(0);
    }
  }, []);

  return (
    <>
      <title> {"Annies Annual & Perennials " + `${TitleNameHelper({ defaultTitleName: "Product" })}`}</title>
      <div>
        <div className="px-4 sm:px-6 lg:px-8 w-full items-center flex justify-between sticky top-0 z-20 py-2 bg-slate-100">
          {/* Page Title */}
          <div className="col-span-full w-full flex flex-wrap justify-between items-center">
            {/* Title */}
            <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
              {"Annies Annual & Perennials " + `${TitleNameHelper({ defaultTitleName: "Product" })}`}
            </h1>
            <div className="flex flex-wrap space-x-2 items-center">
              {(permission?.isEdit || permission?.isDelete) && (
                <NavLink
                  to={`/admin/master/products/create`}
                  className="items-center btn bg-indigo-500 hover:bg-indigo-600 text-white rounded mb-2"
                >
                  <span className="material-icons-outlined text-[12px]">
                    add
                  </span>
                  <span className="ml-1">Add Product</span>
                </NavLink>
              )}
              {(permission?.isEdit || permission?.isDelete) && (
                <NavLink
                  to={`/admin/master/products/bundle/create`}
                  className="items-center btn bg-indigo-500 hover:bg-indigo-600 text-white rounded mb-2"
                >
                  <span className="material-icons-outlined text-[12px]">
                    add
                  </span>
                  <span className="ml-1">Add Bundle</span>
                </NavLink>
              )}
            </div>
          </div>
        </div>
        {/* Product Filter */}
        <div className="px-4 sm:px-6 lg:px-8 w-full pt-7">
          <Messages />
          <>
            <div className="shadow-sm mb-8">
              <div className="col-span-full w-full bg-[white] shadow-xxl rounded-md mb-8">
                <div className="lg:sticky z-10 lg:top-[57px] lg:bg-white">
                  <Tabs
                    options={displayTabs}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    onTabClick={onTabClick}
                  /></div>
                <div className='w-full'>
                  {/* <div className={`rounded-md mb-8 tab-content text-sm overflow-x-auto`}> */}
                  <div>
                    <div>
                      {/* <div className="overflow-x-auto grow"> */}
                      {/* <All activeTab={activeTab} type={[productType.EcommerceStore, productType.CorporateStore].includes(type)} /> */}
                      {
                        StoreProductStatusTabs.map((value, index) => {
                          if (index === activeTab) {
                            return (
                              <All key={value.componentname} activeTab={activeTab} filterData={value.filter} tab={value} setSelectedData={setSelectedData} selectedData={selectedData} />
                            )
                          } else {
                            return "";
                          }
                        })
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>
      </div >
    </>
  );
};

export default List;
