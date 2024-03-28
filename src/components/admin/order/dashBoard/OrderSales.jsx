/*Component Name: OrderSales
Component Functional Details: User can create or update OrderSales master details from here.
Created By: Shrey Patel
Created Date: Currunt Date
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import React from "react";
import { Link } from "react-router-dom";
import CircleChart from "components/admin/reports/reports/Chart/CircleChart";
import { CurrencySymbolByCode } from "global/Enum";
import { Tooltip } from "recharts";
import { Fragment } from "react";

const OrderSales = ({ CouPons, Orders, OrdersData, DropDownData, OrderRevenueData, PayingNonPayingCustomerData, PayingCustomerNonPayingCustomer, CouPonsData, DataFromDate, store }) => {
    return (
        <>
            <div className="flex flex-col col-span-full sm:col-span-12 xl:col-span-12 shadow-lg+ rounded-md">
                <div className="item-center block">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full max-w-full">
                            <div className="text-gray-700 uppercase font-bold text-xs flex justify-between -mx-3 mb-4 mt-2">
                                {OrderRevenueData.filter(
                                    (RevenueData) =>
                                        RevenueData.name !== "Shipped Orders" &&
                                        RevenueData.name !== "Revenue"
                                ).map((OrderData, index) => {
                                    return (
                                        <Fragment key={index}>
                                            <div className="h-52 w-full sm:w-1/2 xl:w-1/3  px-3">
                                                <div className="bg-white shadow-lg rounded-md h-full">
                                                    <div className="p-3 text-gray-700 uppercase font-bold text-xs flex justify-between">
                                                        <Link to="#">
                                                            <div>
                                                                <span className="material-icons-outlined">
                                                                    insights
                                                                </span>
                                                                <span className="ml-4 text-lg">
                                                                    {OrderData?.name}
                                                                </span>
                                                            </div>
                                                            <div className="ml-10">
                                                                <span className="text-sm">Store : </span>
                                                                <span className={"text-sm text-orange-600"}>
                                                                    {store?.label}
                                                                </span>
                                                                <span className={"ml-1 text-sm text-cyan-600"}>
                                                                    ( {DataFromDate} )
                                                                </span>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                    <div className="p-3 h-24 flex items-center justify-center">
                                                        <span className="text-2xl text-[#35A592]">
                                                            {OrderData?.name !== "Total Orders"
                                                                ? CurrencySymbolByCode.USD
                                                                : ""}
                                                            {OrderData?.count}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Fragment>
                                    );
                                })}
                            </div>
                            <div className="text-gray-700 uppercase font-bold text-xs flex justify-between -mx-3">
                                <div className="h-auto w-auto sm:w-1/2 xl:w-1/3  px-3">
                                    {/* <div className="bg-white shadow-lg rounded-md h-full"> */}
                                    <CircleChart
                                        title={"Total Orders By Status"}
                                        data={OrdersData}
                                        DataFromDate={DataFromDate}
                                        SubDataClassName={"text-sm text-orange-600"}
                                        label={true}
                                        StoreNameLabel={true}
                                        StoreName={store?.label}
                                    >
                                        <Tooltip />
                                    </CircleChart>
                                    {/* </div> */}
                                </div>
                                <div className="h-auto w-auto sm:w-1/2 xl:w-1/3  px-3">
                                    {/* <div className="bg-white shadow-lg rounded-md h-full"> */}
                                    <CircleChart
                                        title={CouPons?.name}
                                        data={CouPonsData}
                                        DataFromDate={DataFromDate}
                                        SubDataClassName={"text-sm text-orange-600"}
                                        label={true}
                                        StoreNameLabel={true}
                                        StoreName={store?.label}
                                    >
                                        <Tooltip />
                                    </CircleChart>
                                    {/* </div> */}
                                </div>
                                <div className="h-auto w-auto sm:w-1/2 xl:w-1/3  px-3">
                                    {/* <div className="bg-white shadow-lg rounded-md h-full"> */}
                                    <CircleChart
                                        title={PayingCustomerNonPayingCustomer?.name}
                                        data={PayingNonPayingCustomerData}
                                        DataFromDate={DataFromDate}
                                        label={true}
                                        StoreNameLabel={true}
                                        StoreName={store?.label}
                                        SubDataClassName={"text-sm text-orange-600"}
                                    >
                                        <Tooltip />
                                    </CircleChart>
                                    {/* </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderSales;
