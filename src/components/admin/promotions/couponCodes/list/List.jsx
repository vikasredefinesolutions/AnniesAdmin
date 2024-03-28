// /*Component Name: List
// Component Functional Details: User can create or update List master details from here.
// Created By: Shrey Patel
// Created Date: 07/14/22
// Modified By: <Modified By Name>
// Modified Date: <Modified Date> */

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { TitleNameHelper } from "services/common/helper/Helper";
// import StoreService from "services/admin/store/StoreService";

import { PromotionStatusTabs } from "global/Enum";

import Tabs from "components/common/Tabs";
// import Select from "components/common/formComponent/Select";
import Messages from "components/common/alerts/messages/Index";
import All from "../views/All";

const List = () => {
  // const user = useSelector((store) => store?.user);
  // const company = useSelector((store) => store?.CompanyConfiguration);
  const permission = useSelector(store => store.permission);

  const [activeTab, setActiveTab] = useState(0);
  const [stores] = useState([]);
  const [storeFilter, setStoreFilter] = useState("0");

  const displayTabs = PromotionStatusTabs

  const onTabClick = (e, index) => {
    setActiveTab(index);
  };

  // const getDropdownData = useCallback(() => {
  //   if (user?.id && company?.id) {
  //     StoreService.getStoreByUserId({
  //       userid: user?.id,
  //       companyConfigurationId: company?.id,
  //       isSuperUser: user?.isSuperUser,
  //     })
  //       .then((response) => {
  //         if (response?.data?.data) {
  //           setStores([
  //             { label: "All Stores", value: "0" },
  //             ...response?.data?.data,
  //           ]);
  //         }
  //       })
  //       .catch((error) => { });
  //   }
  // }, []);

  useEffect(() => {
    if (stores) {
      setStoreFilter(stores[0]?.value)
    }
  }, [stores])

  // useEffect(() => {
  //   getDropdownData();
  // }, [getDropdownData]);

  return (
    <>
      {/* <title>Promotions List</title> */}
      <title>{TitleNameHelper({ defaultTitleName: "Promotions List" })}</title>
      <div className="py-4">
        <div className='px-4 sm:px-6 lg:px-8 w-full items-center flex justify-between sticky top-0 z-20 py-2 bg-slate-100'>
          <div className="mb-4 sm:mb-0">
            {/* <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">Promotions</h1> */}
            <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">{TitleNameHelper({ defaultTitleName: "Promotions" })}</h1>
          </div>
          <div className="flex flex-wrap sm:auto-cols-min gap-2">
            {/* <Select
              name=""
              options={stores}
              defaultValue={storeFilter}
              isClearable={false}
              onChange={(e) => {
                if (e) {
                  setStoreFilter(e.value);
                } else {
                  setStoreFilter("none");
                }
              }}
              classNames={'w-56'}

            /> */}
            {(permission?.isEdit || permission?.isDelete) &&
              <NavLink
                to={"create"}
                className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
              >
                <span className="material-icons-outlined">add</span>
                <span className="ml-1">Create Discounts</span>
              </NavLink>
            }
          </div>
        </div>
        {/* Product Filter */}
        <div className="px-4 sm:px-6 lg:px-8 w-full pt-7">
          <Messages />

          <>
            <div className="bg-white shadow-xxl rounded-md mb-8">
              <div className="col-span-full w-full bg-white shadow-xxl rounded-md mb-8 relative">
                <Tabs
                  options={displayTabs}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  onTabClick={onTabClick}
                  isCount={false}
                />
                <div className='w-full'>
                  <div className={`rounded-md mb-8 tab-content text-sm `}>
                    <div className=" grow">
                      {
                        PromotionStatusTabs.map((value, index) => {
                          if (index === activeTab) {
                            return (
                              <All key={value.componentname} activeTab={activeTab} filterData={value.filter} storeFilter={storeFilter} setStoreFilter={setStoreFilter} tab={value} />
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
        </div></div>
    </>
  )
}

export default List;
