/*Component Name: DashBoardWidget
Component Functional Details: User can create or update DashBoardWidget master details from here.
Created By: Shrey Patel
Created Date: <Created Date>
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import React, { useState } from "react";
import { useSelector } from "react-redux";
import Cards from "./Cards";
import Card from "../dashbord/Cards";
import Last10Orders from "../dashbord/LastTenOrders";
import OrdersByStore from "../dashbord/OrdersByStore";
import TopCustomers from "./TopTenCustomers";
import UserService from "services/admin/user/UserService";
import TopItemsBySales from "./TopTenItemsBySales";
import TopItemsLowInventory from "./TopItemsInventory";
import TopCustomerApplicationRequest from "./TopCustomerApplicationRequest";
import TopUpdatedPages from "./TopUpdatedPages";
import TopVisitedPages from "./TopVisitedPages";
import OrderByState from "../dashbord/OrderByState";
import TopStore from "../dashbord/TopStore";
import CirecleAndBarChart from "./CirecleAndBarChart";
import { TitleNameHelper } from "services/common/helper/Helper";
import { DurationFilter } from "global/Enum";
import Select from "components/common/formComponent/Select";

const DashBoardWidget = () => {
    const Company = useSelector((store) => store?.CompanyConfiguration);
    const user = useSelector((store) => store?.user);
    const permission = useSelector((store) => store?.permission);

    const [DropDownData, setDropDownData] = useState("1");
    const [DataFromDate, setDataFromDate] = useState("Last 24 Hours");

    const tilesVisible = (url) => {
        url = "/" + url.replace(/^\/+|\/+$/g, "");
        if (permission && permission?.allPermission?.[url?.toLowerCase()]) {
            return permission?.allPermission?.[url?.toLowerCase()];
        }
    };

    return (
        <>
            <title>
                {TitleNameHelper({ defaultTitleName: "Dashboard Widget" })}{" "}
            </title>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto">
                <div className="flex flex-wrap justify-end mb-6 gap-2 sticky top-0 z-20 pb-2 pt-2 bg-slate-100 ">
                    <div className="flex flex-wrap items-center gap-2">
                        <Select
                            className="w-[250px] font-semibold"
                            options={DurationFilter}
                            onChange={(e) => {
                                setDropDownData(e.value);
                                setDataFromDate(e.label);
                            }}
                            name="recStatus"
                            defaultValue={DropDownData}
                            isClearable={false}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-6 mb-6">
                    <Card tilesVisible={tilesVisible} />
                </div>

                <div className="grid grid-cols-12 gap-6 mb-6">
                    {tilesVisible("/admin/Order/orders") && (
                        <OrderByState tilesVisible={tilesVisible} />
                    )}
                    <TopStore tilesVisible={tilesVisible} />
                </div>

                <div className="grid grid-cols-12 gap-6">
                    {tilesVisible("/admin/Order/orders") && (
                        <Last10Orders
                            tilesVisible={tilesVisible}
                            DropDownData={DropDownData}
                            DataFromDate={DataFromDate}
                        />
                    )}

                    {tilesVisible("/admin/Order/orders") && (
                        <OrdersByStore tilesVisible={tilesVisible}
                            DropDownData={DropDownData}
                            DataFromDate={DataFromDate}
                        />
                    )}
                </div>
            </div>
            <div className="px-4 sm:px-6 lg:px-8 w-full mx-auto">
                <div className="grid grid-cols-12 gap-6 mb-6">
                    <TopCustomers
                        tilesVisible={tilesVisible}
                        DropDownData={DropDownData}
                        DataFromDate={DataFromDate}
                    />
                    <TopCustomerApplicationRequest
                        tilesVisible={tilesVisible}
                        DropDownData={DropDownData}
                        DataFromDate={DataFromDate}
                    />
                </div>

                <div className="grid grid-cols-12 gap-6 mb-6">
                    <TopItemsBySales
                        tilesVisible={tilesVisible}
                        DropDownData={DropDownData}
                        DataFromDate={DataFromDate}
                    />
                    <TopItemsLowInventory
                        tilesVisible={tilesVisible}
                        DropDownData={DropDownData}
                        DataFromDate={DataFromDate}
                    />
                    {/* <TopItemsSearched tilesVisible={tilesVisible} /> */}
                </div>

                <div className="grid grid-cols-12 gap-6 mb-6">
                    <Cards
                        tilesVisible={tilesVisible}
                        DropDownData={DropDownData}
                        DataFromDate={DataFromDate}
                    />
                </div>

                <div className="grid grid-cols-12 gap-6 mb-6">
                    <TopUpdatedPages
                        tilesVisible={tilesVisible}
                        DropDownData={DropDownData}
                        DataFromDate={DataFromDate}
                    />
                    <TopVisitedPages
                        tilesVisible={tilesVisible}
                        DropDownData={DropDownData}
                        DataFromDate={DataFromDate}
                    />
                </div>

                <div className="grid grid-cols-12 gap-6 mb-6">
                    <CirecleAndBarChart
                        title={"Page Title"}
                        name={"pageTitle"}
                        DropDownData={DropDownData}
                        DataFromDate={DataFromDate}
                    />
                    <CirecleAndBarChart
                        title={"Meta Keywords"}
                        name={"metaKeywords"}
                        DropDownData={DropDownData}
                        DataFromDate={DataFromDate}
                    />
                    <CirecleAndBarChart
                        title={"Meta Description"}
                        name={"metaDescriptionReport"}
                        DropDownData={DropDownData}
                        DataFromDate={DataFromDate}
                    />
                </div>
            </div>
        </>
    );
};

export default DashBoardWidget;
