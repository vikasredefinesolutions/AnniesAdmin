/*Component Name: List
Component Functional Details: User can create or update List master details from here.
Created By: chandan
Created Date: 01-07-2022
Modified By: chandan
Modified Date: 04-07-2022 */

import React, { useState, useEffect, Fragment } from "react";
import { OrderStatusTabs } from "global/Enum";
import All from "../views/All";
import Tabs from "components/common/Tabs";
import { useDispatch } from "react-redux";
import Messages from "components/common/alerts/messages/Index";
import { TitleNameHelper } from "services/common/helper/Helper";
import { useSelector } from "react-redux";
import StoreService from "services/admin/store/StoreService";
import { addActiveTab } from "redux/searchQueryForMGS/SearchQueryAction"

const List = ({ statusList }) => {
  const dispatch = useDispatch();

  const user = useSelector(store => store?.user);
  const companyInfo = useSelector(store => store?.CompanyConfiguration);
  const storeIdFromDropDown = useSelector((store) => store?.TempDataReducer?.order?.storeIdFromDropDown);
  const { toFill, currentTab } = useSelector((store) => store?.SearchQueryReducers);

  const [activeTab, setActiveTab] = useState(toFill ? currentTab : 0);
  const [showListMessage, setShowListMessage] = useState(true);
  const [storeOptions, setStoreOption] = useState([]);
  const [displayTabs, setDisplayTabs] = useState(OrderStatusTabs);
  const [, setNavSyncRows] = useState([]);

  const getAllData = React.useRef(null);

  const onTabClick = (e, index) => {
    if (index !== activeTab) {
      setActiveTab(index);
      dispatch(addActiveTab(index));
    }
  };

  useEffect(() => {
    if (user?.id && companyInfo?.id && storeOptions && storeOptions.length <= 0) {
      StoreService.getStoreByUserId({
        userid: user?.id,
        companyConfigurationId: companyInfo?.id,
        isSuperUser: user?.isSuperUser
      }).then((response) => {
        if (response?.data?.data) {
          const allStore = response?.data?.data.map((storeObj) => storeObj.value).join(",")

          setStoreOption([{ value: allStore, label: 'All Stores' }, ...response?.data?.data]);
        }
      }).catch((error) => { })
    }
  }, [user, companyInfo]);

  useEffect(() => {
    if (!toFill) {
      setActiveTab(0);
    }
  }, []);

  return (
    <>
      <title>{TitleNameHelper({ defaultTitleName: `Order List` })}</title>
      <div className="py-4">
        <div className='px-4 sm:px-6 lg:px-8 w-full items-center flex justify-between sticky top-0 z-20 py-2 bg-slate-100'>
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">{TitleNameHelper({ defaultTitleName: `Order` })}</h1>
          </div>

        </div>
        {/* Product Filter */}
        <div className="px-4 sm:px-6 lg:px-8 w-full pt-7">
          {showListMessage && <Messages />}
          <>
            <div className="bg-white shadow-xxl rounded-md mb-8">
              <div className="col-span-full w-full bg-white shadow-xxl rounded-md mb-8 relative">
                <Tabs
                  options={displayTabs}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  onTabClick={onTabClick}
                  isCount={true}
                />
                <div className='w-full'>
                  <div className={`rounded-md mb-8 tab-content text-sm`}>
                    <div className="">
                      {
                        OrderStatusTabs.map((value, index) => {
                          return (
                            <Fragment key={index}>
                              <div className={`${(index === activeTab) ? "" : "hidden"}`}>
                                <All statusList={statusList} storeId={storeIdFromDropDown} setShowListMessage={setShowListMessage} activeTab={activeTab} filterData={[...value.filter]} key={index} childFunc={getAllData} setDisplayTabs={setDisplayTabs} tab={value} setNavSyncRows={setNavSyncRows} />
                              </div>
                            </Fragment>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  )
}

export default List
