/*Component Name: LifeCycle
Component Functional Details: User can create or update LifeCycle master details from here.
Created By: Keval Takodara
Created Date: 26th JULY, 2022
Modified By: Shrey Patel
Modified Date: 01/27/2023 */

import React, { useState, useEffect, useCallback } from 'react';
import LifeCycleView from 'components/common/others/admin/CustomerCompany/LifeCycle';
import { productActivityDropDownData } from 'global/Enum';
import { setAddLoading } from 'redux/globalLoader/GlobalLoaderAction';
import { productType } from "dummy/Dummy";
import { useDispatch, useSelector } from 'react-redux';
import StoreProductLifeCycle from 'services/admin/master/store/product/LifeCycle'

const LifeCycle = ({ type, productId }) => {
    const dispatch = useDispatch();
    const user = useSelector((store) => store?.user);
    const company = useSelector((store) => store?.CompanyConfiguration);

    let today = new Date();
    const [StartFromDate, setStartFromDate] = useState(new Date(new Date().setDate(today.getDate() - 31)));
    const [EndToDate, setEndToDate] = useState(new Date());
    const [StoreDropDownOption, setStoreDropDownOption] = useState([]);
    const [StoreDropDownSelectedValue, setStoreDropDownSelectedValue] = useState("0");
    const [Data, setData] = useState([]);
    const [dropDownSelectedValue, setdropDownSelectedValue] = useState("0");

    const getLifecycleData = useCallback(
        () => {
            dispatch(setAddLoading(true))
            StoreProductLifeCycle.getLifecycleData({
                productId: productId,
                fromDate: StartFromDate,
                todate: EndToDate,
                activitytype: dropDownSelectedValue,
            }).then((response) => {
                const OrderData = response?.data;
                setData(OrderData?.data);
                dispatch(setAddLoading(false))
            }).catch(() => {
                dispatch(setAddLoading(false))
            })
        },
        [StartFromDate, EndToDate, StoreDropDownSelectedValue, dropDownSelectedValue]
    );

    useEffect(() => {
        if (StartFromDate && EndToDate) {
            getLifecycleData()
        }
    }, [StartFromDate, EndToDate, dropDownSelectedValue, StoreDropDownSelectedValue])

  
    return (
        <>
            <LifeCycleView chartData={Data} storeDropDown={type === productType.MC ? true : false} ProductView={true} setStartFromDate={setStartFromDate} StartFromDate={StartFromDate} EndToDate={EndToDate} setEndToDate={setEndToDate} dropDownSelectedValue={dropDownSelectedValue} StoreDropDownSelectedValue={StoreDropDownSelectedValue} setdropDownSelectedValue={setdropDownSelectedValue} setStoreDropDownSelectedValue={setStoreDropDownSelectedValue} dropDownOption={productActivityDropDownData} StoreDropDownOption={StoreDropDownOption} storeActivityDropDown={true} />
        </>
    );
};

export default LifeCycle;