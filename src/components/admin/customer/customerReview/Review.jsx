import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

import { CustomerReview, anniesAnnualData } from "global/Enum";
import { TitleNameHelper } from 'services/common/helper/Helper';
import { setAddLoading } from 'redux/globalLoader/GlobalLoaderAction';

import All from './All';
import Tabs from "components/common/Tabs";
import Messages from "components/common/alerts/messages/Index";

import StoreService from "services/admin/store/StoreService";

const Review = () => {
  const dispatch = useDispatch()

  const [activeTab, setActiveTab] = useState(0);
  const [stores, setStores] = useState([]);
  const [storeFilter, setStoreFilter] = useState("0");

  const onTabClick = (e, index) => {
    setActiveTab(index)
  }

  useEffect(() => {
    StoreService.getStoreById(anniesAnnualData?.storeId)
      .then((res) => {
        var response = res.data;
        if (response.success && response.data) {
          setStores(response?.data);
        }
      }).catch((err) => {
        dispatch(setAddLoading(false))
      });
  }, [])

  return (
    <>
      <title>
        {TitleNameHelper({ defaultTitleName: "Customer Review" })}
      </title>
      <div className="py-8">
        <div className="px-4 sm:px-6 lg:px-8 w-full items-center flex justify-between sticky top-0 z-20 py-2 bg-slate-100">
          <div className="col-span-full w-full flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
              {TitleNameHelper({ defaultTitleName: "Consultation Request" })}
            </h1>
          </div>
        </div>
        <div className="px-4 sm:px-6 lg:px-8 w-full pt-7">
          <Messages />
          <div className="bg-white shadow-xxl rounded-md mb-8">
            <div className="col-span-full w-full bg-white shadow-xxl rounded-md mb-8 relative">
              <Tabs
                options={CustomerReview}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onTabClick={onTabClick}
                isCount={false}
              />
              <div className="w-full">
                <div>
                  {CustomerReview.map((value, index) => {
                    if (index === activeTab) {
                      return (
                        <Fragment key={index}>
                          <All
                            key={value.componentname}
                            activeTab={activeTab}
                            filterData={value.filter}
                            storeFilter={storeFilter}
                            setStoreFilter={setStoreFilter}
                            tab={value}
                            store={stores}
                          />
                        </Fragment>
                      );
                    } else {
                      return <Fragment key={index}></Fragment>;
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Review