/*Component Name: Index
Component Functional Details:  Index .
Created By: PK Kher
Created Date: <Creation Date>
Modified By: PK Kher
Modified Date: <Modified Date> */

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Home from './Home';
import Messages from "components/common/alerts/messages/Index";
import { TitleNameHelper } from "services/common/helper/Helper";
import { getStoreDataById } from "redux/tempData/tempDataAction";
import { anniesAnnualData } from 'global/Enum';
import StoreServiceCls from 'services/admin/store/StoreService';

const Index = () => {
    const dispatch = useDispatch();

    const [storeId] = useState("");
    const [store, setStore] = useState([]);

    useEffect(() => {
        if (storeId) {
            dispatch(getStoreDataById({ storeId }))
            StoreServiceCls.getStoreById(anniesAnnualData.storeId)
                .then((response) => {
                    if (response?.data?.success && response?.data?.data ) {
                        setStore(response?.data?.data);
                    }
                })
                .catch((errors) => { });
        }
    }, [storeId]);

    return (
        <>
            <title>{TitleNameHelper({ defaultTitleName: "Clear Cache" })}</title>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full">
                <div className="sm:flex sm:justify-between sm:items-center mb-8">
                    <div className="col-span-full w-full flex justify-between items-center">
                        <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
                            {TitleNameHelper({ defaultTitleName: "Clear Cache" })}
                        </h1>
                    </div>
                </div>
                <Messages />
                
                <Home store={store} />
            </div>
        </>
    );
};

export default Index;
