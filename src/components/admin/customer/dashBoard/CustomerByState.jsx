/*Component Name: CustomerByState
Component Functional Details: User can create or update CustomerByState master details from here.
Created By: Shrey Patel
Created Date: Currunt Date
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import { anniesAnnualData } from "global/Enum";
import React, { useState, useEffect } from "react";
import Chart from "react-google-charts";
import DashBoardService from "services/admin/customer/DashBoardService";
import { TitleNameHelper } from "services/common/helper/Helper";

const CustomerByState = () => {
    const [StateData, setStateData] = useState([
        ["State", "", { role: "tooltip", type: "string", p: { html: true } }],
    ]);
    const getCustomerCountByState = () => {
        DashBoardService.getCustomerCountByState({ storeId: [anniesAnnualData.storeId] }).then((res) => {
            if (res.data.success) {
                getStorename(res.data.data);
            }
        });
    };

    const getStorename = (data) => {
        if (data) {
            data.map((stateDataFromAPI) => {
                const StateNameFromApi = stateDataFromAPI.stateName || "";
                let CustomerCountFromApi =
                    stateDataFromAPI?.customerCount || 0;
                let CustomerCountForTooltip = `Customer Count : ${stateDataFromAPI?.customerCount}`;

                return setStateData((prevState) => {
                    return [
                        ...prevState,
                        [StateNameFromApi, CustomerCountFromApi, CustomerCountForTooltip],
                    ];
                });
            });
        }
    };

    useEffect(() => {
        getCustomerCountByState();
    }, []);

    const options = {
        width: "auto",
        region: "US",
        resolution: "provinces",
        colorAxis: { colors: ["#AFD3FF", "#9AC6FD"] },
    };

    return (
        <>
            <title>{TitleNameHelper({ defaultTitleName: "Customer By State" })} </title>
            {/* <!-- Customer By State --> */}
            <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-md">
                <header className="px-5 py-4 border-b-2 border-neutral-200 sticky top-0 z-10 bg-white">
                    <h2 className="font-semibold text-base lg:text-xl text-gray-700">
                        {TitleNameHelper({ defaultTitleName: "Customer By State" })}
                    </h2>
                </header>
                <div className="p-3 w-full overflow-hidden">
                    <Chart
                        chartType="GeoChart"
                        width="100%"
                        height="550px"
                        data={StateData}
                        options={options}
                        loader={<div>Loading Chart</div>}
                    />
                </div>
            </div>
        </>
    );
};

export default CustomerByState;
