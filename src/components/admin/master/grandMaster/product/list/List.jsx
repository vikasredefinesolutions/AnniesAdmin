/*Component Name: List
Component Functional Details: User can create or update List master details from here.
Created By: chandan
Created Date: 01-07-2022
Modified By: chandan
Modified Date: 04-07-2022 */

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { GrandMasterProductStatusTabs } from "global/Enum";
import All from "../views/All";
import Tabs from "components/common/Tabs";
import Messages from "components/common/alerts/messages/Index";
import { useDispatch, useSelector } from "react-redux";
import { addActiveTab } from "redux/searchQueryForMGS/SearchQueryAction"
import { TitleNameHelper } from "services/common/helper/Helper";

const List = ({ changeTab }) => {
  const permission = useSelector(store => store.permission);
  const dispatch = useDispatch();

  const { toFill, currentTab } = useSelector((store) => store?.SearchQueryReducers);

  const [activeTab, setActiveTab] = useState(toFill ? currentTab : changeTab);

  const displayTabs = GrandMasterProductStatusTabs
  const onTabClick = (e, index) => {
    setActiveTab(index);
    dispatch(addActiveTab(index));

  };

  return (
    <>
      <title> {TitleNameHelper({ defaultTitleName: "External Product Feed" })}</title>
      <div className="py-4">
        <div className="px-4 sm:px-6 lg:px-8 w-full items-center flex justify-between sticky top-0 z-20 py-2 bg-slate-100">
          {/* Page Title */}
          <div className="col-span-full w-full flex flex-wrap justify-between items-center">
            {/* Title */}
            <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
              {TitleNameHelper({ defaultTitleName: "External Product Feed" })}

            </h1>
            <div className="flex flex-wrap space-x-2 items-center">
              {/* <Select
                options={stores}
                classNames="w-[250px] -top-1"
                placeholder="Select Store"
                name={'store'}
                defaultValue={""}
                onChange={(e) => {
                  navigate(e.value, { replace: true });
                }}

              /> */}
              <NavLink to={'export'}
                className="btn shadow-none text-indigo-500 hover:text-indigo-600 font-semibold mb-2"
              >
                <span >Export</span>
              </NavLink>

              {(permission?.isEdit || permission?.isDelete) &&
                <>
                  <NavLink to='import'
                    type="button"
                    className="btn shadow-none text-indigo-500 hover:text-indigo-600 font-semibold mb-2"
                  >
                    <span >Import</span>
                  </NavLink>
                  <NavLink to={`/admin/master/Grandmaster/create`} className="items-center btn bg-indigo-500 hover:bg-indigo-600 text-white rounded mb-2">
                    <span className="material-icons-outlined text-[12px]">add</span>
                    <span className="ml-1">Add Product</span>
                  </NavLink>
                </>}
            </div>
          </div>
        </div>
        {/* Product Filter */}
        <div className="px-4 sm:px-6 lg:px-8 w-full">
          <Messages />

          <>
            <div className="bg-white shadow-xxl rounded-md mb-8">
              <div className="col-span-full w-full bg-white shadow-xxl rounded-md mb-8 relative">
                <div className="lg:sticky z-10 lg:top-[57px] lg:bg-white">
                  <Tabs
                    options={displayTabs}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    onTabClick={onTabClick}
                  /></div>
                <div className='w-full'>
                  {
                    GrandMasterProductStatusTabs.map((value, index) => {
                      if (index === activeTab) {
                        return (
                          <All key={value.componentname} activeTab={activeTab} filterData={value.filter} tab={value} />
                        )
                      } else {
                        return "";
                      }
                    })
                  }
                </div>
              </div>
            </div>
          </>
        </div></div>
    </>
  );
};

export default List;

