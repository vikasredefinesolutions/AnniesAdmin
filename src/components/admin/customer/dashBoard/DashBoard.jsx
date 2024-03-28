/*Component Name: DashBoard
Component Functional Details: User can create or update DashBoard master details from here.
Created By: Shrey Patel
Created Date: Currunt Date
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardService from "services/admin/customer/DashBoardService";
import { useDispatch, useSelector } from "react-redux";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { CurrencySymbolByCode, DurationFilter } from "global/Enum";
import CustomerReports from "./CustomerReports";
import CustomerReviewsReport from "./CustomerReviewsReport";
import { MenuNameReturner, TitleNameHelper } from "services/common/helper/Helper";
import TopCustomerByProfitability from "./TopCustomerByProfitability";
import Select from "components/common/formComponent/Select";
import StoreService from "services/admin/store/StoreService";
import CustomerByState from "./CustomerByState";

const DashBoard = () => {
    const dispatch = useDispatch();
    const user = useSelector((store) => store?.user);
    const company = useSelector((store) => store?.CompanyConfiguration);
    const [storeData, setStoreData] = useState([]);
    const [store, setStore] = useState({
        label: "",
        value: "",
    });
    // const [CustomerData, setCustomerData] = useState({});
    const [CustomerDetailData, setCustomerDetailData] = useState([]);
    const [CompanyData, setCompanyData] = useState(null);
    // const [RevenueData, setRevenueData] = useState({});
    const [HourWeekMonthYearData, setHourWeekMonthYearData] = useState([]);
    const [DropDownData, setDropDownData] = useState("1");
    const [DataFromDate, setDataFromDate] = useState("Last 24 Hours");

    const MenuListByUserRoleReducers = useSelector(
        (store) => store?.MenuListByUserRoleReducers
    );

    const getCompanyReportData = useCallback(() => {
        if (store?.value) {
            dispatch(setAddLoading(true));
            DashboardService.getCompanyReportData(store?.value, DropDownData)
                .then((CompanyData) => {
                    if (CompanyData.data.success) {
                        setCompanyData(CompanyData.data.data);
                    }

                    dispatch(setAddLoading(false));
                })
                .catch((error) => {
                    dispatch(setAddLoading(false));
                });
        }
    }, [DropDownData, store?.value]);

    useEffect(() => {
        getCompanyReportData();
    }, [store, DropDownData]);

    useEffect(() => {
        if (store?.value) {
            DashboardService.getCustomerDetailTotalDataByStore(
                store?.value,
                DropDownData
            )
                .then((CustomerDetailData) => {
                    if (
                        CustomerDetailData?.data?.success &&
                        CustomerDetailData?.data?.data
                    ) {
                        setCustomerDetailData(CustomerDetailData.data.data);
                    }
                })
                .catch((error) => { });
        }
    }, [store?.value, DropDownData]);

    useEffect(() => {
        DashboardService.getCustomerOrderRevenueByFilter(DropDownData)
            .then((CustomerData) => {
                if (CustomerData.data.success) {
                    setHourWeekMonthYearData(CustomerData.data.data);
                }
            })
            .catch((error) => { });
    }, [DropDownData]);

    const getStoreDropdownData = useCallback(() => {
        if (user?.id && company?.id) {
            StoreService.getStoreByUserId({
                userid: user?.id,
                companyConfigurationId: company?.id,
                isSuperUser: user?.isSuperUser,
            })
                .then((response) => {
                    if (response?.data?.data) {
                        setStoreData([
                            { label: "All Stores", value: "0" },
                            ...response?.data?.data,
                        ]);
                    }
                })
                .catch((error) => { });
        }
    }, []);

    useEffect(() => {
        if (storeData.length > 0) {
            setStore(storeData[0]);
        }
    }, [storeData]);

    useEffect(() => {
        getStoreDropdownData();
    }, [getStoreDropdownData]);

    return (
        <>
            <title>
                {TitleNameHelper({ defaultTitleName: "Customer Dashboard" })}{" "}
            </title>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto">
                {/* <div className="grid grid-cols-12 gap-6 max-w-3xl mx-auto mb-6">
                   // Customer
                    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-6 bg-white shadow-lg rounded-md">
                        <div className="text-center item-center block">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full max-w-full text-center">
                                    <Link
                                        to={CustomerData?.activeCustomer?.link}
                                    // onClick={() => SetChangeTab(0)}
                                    >
                                        <div className="p-3 font-semibold text-xl text-gray-700 border-b-2 border-neutral-200">
                                            Customer
                                        </div>
                                    </Link>
                                    <div className="p-3 text-gray-700 uppercase text-xs flex justify-between border-b border-neutral-200 last:border-b-0">
                                        <Link
                                            to={CustomerData?.activeCustomer?.link}
                                        // onClick={() => SetChangeTab(0)}
                                        >
                                            <div>Active</div>
                                        </Link>
                                        <div>{CustomerData?.activeCustomer?.count}</div>
                                    </div>
                                    <div className="p-3 text-gray-700 uppercase text-xs flex justify-between border-b border-neutral-200 last:border-b-0">
                                        <Link to={CustomerData?.activeCustomer?.link}>
                                            <div>InActive</div>
                                        </Link>
                                        <div>{CustomerData?.inActiveCustomer?.count}</div>
                                    </div>
                                    <div className="p-3 text-gray-700 uppercase text-xs flex justify-between border-b border-neutral-200 last:border-b-0">
                                        <Link to={CustomerData?.activeCustomer?.link}>
                                            <div>Total</div>
                                        </Link>
                                        <div>{CustomerData?.totalCustomer?.count}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                {/* <div className="border border-t-2"></div> */}
                {/* Dropdown */}
                <div className="sm:flex sm:justify-between sm:items-center mb-4 sticky top-0 z-20 p-2 rounded-md bg-slate-100">
                    <div className="col-span-full w-full flex flex-wrap justify-between items-center"></div>
                    <div className="flex flex-wrap items-center gap-2">
                        <Select
                            onChange={(e) => {
                                if (e) {
                                    setStore((prevState) => ({
                                        ...prevState,
                                        label: e.label,
                                        value: e.value,
                                    }));
                                } else {
                                    setStore({});
                                }
                            }}
                            isClearable={false}
                            defaultValue={store?.value}
                            className={"w-[250px] bg-white font-semibold"}
                            options={storeData}
                            isMulti={false}
                        />
                    </div>
                    <div className="flex flex-wrap items-center gap-2 ml-2">
                        <Select
                            className="w-[250px] bg-white font-semibold"
                            options={DurationFilter}
                            onChange={(e) => {
                                setDropDownData(e.value);
                                setDataFromDate(e.label);
                            }}
                            name="Duration Filter"
                            defaultValue={DropDownData}
                            isClearable={false}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-10 gap-6 max-w-full mx-auto mb-6">
                    {/* Company */}
                    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-2 bg-white shadow-lg rounded-md">
                        <div className="text-center item-center block">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full max-w-full text-center">
                                    <Link
                                        to={CompanyData?.activeCompany?.link}
                                    // onClick={() => SetChangeTab(0)}
                                    >
                                        <div className="p-3 font-semibold text-xl text-gray-700 border-b-2 border-neutral-200">
                                            Company
                                            <div className="text-sm">
                                                Store :
                                                <span className={"ml-1 text-sm text-orange-600"}>
                                                    {store?.label}
                                                </span>
                                                <span className={"ml-1 text-sm text-cyan-600"}>
                                                    ( {DataFromDate} )
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="p-3 text-gray-700 uppercase text-xs flex justify-between border-b border-neutral-200 last:border-b-0">
                                        <Link
                                            to={CompanyData?.activeCompany?.link}
                                        // onClick={() => SetChangeTab(0)}
                                        >
                                            <div>Active</div>
                                        </Link>
                                        <div>{CompanyData?.activeCompany?.count}</div>
                                    </div>
                                    <div className="p-3 text-gray-700 uppercase text-xs flex justify-between border-b border-neutral-200 last:border-b-0">
                                        <Link to={CompanyData?.activeCompany?.link}>
                                            <div>InActive</div>
                                        </Link>
                                        <div>{CompanyData?.inActiveCompany?.count}</div>
                                    </div>
                                    <div className="p-3 text-gray-700 uppercase text-xs flex justify-between border-b border-neutral-200 last:border-b-0">
                                        <Link to={CompanyData?.activeCompany?.link}>
                                            <div>Total</div>
                                        </Link>
                                        <div>{CompanyData?.totalCompany?.count}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Customer Detail */}
                    {CustomerDetailData.length > 0 &&
                        CustomerDetailData.map((Data, index) => {
                            return (
                                <Fragment key={index}>
                                    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-2 bg-white shadow-lg rounded-md">
                                        <div className="text-center item-center block">
                                            <div className="flex flex-wrap items-center">
                                                <div className="relative w-full max-w-full text-center">
                                                    <Link
                                                        to={""}
                                                    // onClick={() => SetChangeTab(0)}
                                                    >
                                                        <div className="p-3 font-semibold text-xl text-gray-700 border-b-2 border-neutral-200">
                                                            {Data.name}
                                                            <div className="text-sm">
                                                                Store :
                                                                <span
                                                                    className={"ml-1 text-sm text-orange-600"}
                                                                >
                                                                    {store?.label}
                                                                </span>
                                                                <span className={"ml-1 text-sm text-cyan-600"}>
                                                                    ( {DataFromDate} )
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    {Data?.child.map((ChildData, index) => {
                                                        return (
                                                            <Fragment key={index}>
                                                                <div className="p-3 text-gray-700 uppercase text-xs flex justify-between border-b border-neutral-200 last:border-b-0">
                                                                    <Link to={""}>
                                                                        <div>{ChildData.name}</div>
                                                                    </Link>
                                                                    <div>{ChildData.count}</div>
                                                                </div>
                                                            </Fragment>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Fragment>
                            );
                        })}

                    {/* E-Comm Store Revenue */}
                    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-2 bg-white shadow-lg rounded-md">
                        <div className="text-center item-center block">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full max-w-full text-center">
                                    <div className="p-3 font-semibold text-xl text-gray-700 border-b-2 border-neutral-200">
                                        {MenuNameReturner(MenuListByUserRoleReducers, "codeName", "EcommerceStore")[0]?.name}
                                        Revenue
                                        <div className="text-sm">
                                            {/* Store :
                                            <span className={"ml-1 text-sm text-orange-600"}>
                                                {store?.label}
                                            </span> */}
                                            <span className={"ml-1 text-sm text-cyan-600"}>
                                                ( {DataFromDate} )
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-5 text-gray-700 uppercase text-xs flex justify-between border-b border-neutral-200 last:border-b-0">
                                        <div>Order Total</div>
                                        <div>
                                            {CurrencySymbolByCode.USD}{" "}
                                            {parseInt(
                                                HourWeekMonthYearData[0]?.eCommerceStore.orderTotalCount
                                            ).toFixed(2)}
                                        </div>
                                    </div>
                                    <div className="p-5 text-gray-700 uppercase text-xs flex justify-between border-b border-neutral-200 last:border-b-0">
                                        <div>Revenue</div>
                                        <div>
                                            {CurrencySymbolByCode.USD}{" "}
                                            {parseInt(
                                                HourWeekMonthYearData[0]?.eCommerceStore.revenueCount
                                            ).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Corporate Store Revenue */}
                    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-2 bg-white shadow-lg rounded-md">
                        <div className="text-center item-center block">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full max-w-full text-center">
                                    <div className="p-3 font-semibold text-xl text-gray-700 border-b-2 border-neutral-200">
                                        {MenuNameReturner(MenuListByUserRoleReducers, "codeName", "CorporateStore")[0]?.name}
                                        Revenue
                                        <div className="text-sm">
                                            {/* Store :
                                            <span className={"ml-1 text-sm text-orange-600"}>
                                                {store?.label}
                                            </span> */}
                                            <span className={"ml-1 text-sm text-cyan-600"}>
                                                ( {DataFromDate} )
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-5 text-gray-700 uppercase text-xs flex justify-between border-b border-neutral-200 last:border-b-0">
                                        <div>Order Total</div>
                                        <div>
                                            {CurrencySymbolByCode.USD}{" "}
                                            {parseInt(
                                                HourWeekMonthYearData[0]?.corporateStore.orderTotalCount
                                            ).toFixed(2)}
                                        </div>
                                    </div>
                                    <div className="p-5 text-gray-700 uppercase text-xs flex justify-between border-b border-neutral-200 last:border-b-0">
                                        <div>Revenue</div>
                                        <div>
                                            {CurrencySymbolByCode.USD}{" "}
                                            {parseInt(
                                                HourWeekMonthYearData[0]?.corporateStore.revenueCount
                                            ).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Store Builder Revenue */}
                    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-2 bg-white shadow-lg rounded-md">
                        <div className="text-center item-center block">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full max-w-full text-center">
                                    <div className="p-3 font-semibold text-xl text-gray-700 border-b-2 border-neutral-200">
                                        {MenuNameReturner(MenuListByUserRoleReducers, "codeName", "StoreBuilder")[0]?.name} Revenue
                                        <div className="text-sm">
                                            {/* Store :
                                            <span className={"ml-1 text-sm text-orange-600"}>
                                                {store?.label}
                                            </span> */}
                                            <span className={"ml-1 text-sm text-cyan-600"}>
                                                ( {DataFromDate} )
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-5 text-gray-700 uppercase text-xs flex justify-between border-b border-neutral-200 last:border-b-0">
                                        <div>Order Total</div>
                                        <div>
                                            {CurrencySymbolByCode.USD}{" "}
                                            {parseInt(
                                                HourWeekMonthYearData[0]?.storeBuilder?.orderTotalCount
                                            ).toFixed(2)}
                                        </div>
                                    </div>
                                    <div className="p-5 text-gray-700 uppercase text-xs flex justify-between border-b border-neutral-200 last:border-b-0">
                                        <div>Revenue</div>
                                        <div>
                                            {CurrencySymbolByCode.USD}{" "}
                                            {parseInt(
                                                HourWeekMonthYearData[0]?.storeBuilder?.revenueCount
                                            ).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <CustomerReviewsReport
                    DataFromDate={DataFromDate}
                    DropDownData={DropDownData}
                    store={store}
                />

                {/* Customer By State */}
                <div className="grid grid-cols-12 gap-6 max-w-full mx-auto mb-6">
                    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-6 rounded-md">
                        <CustomerByState />
                    </div>
                    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-6 rounded-md">
                        <TopCustomerByProfitability
                            DataFromDate={DataFromDate}
                            DropDownData={DropDownData}
                            store={store}
                        />
                    </div>
                </div>

                {/* CustomerReports */}
                <div className="mb-6">
                    <CustomerReports
                        DataFromDate={DataFromDate}
                        DropDownData={DropDownData}
                        store={store}
                    />
                </div>
            </div>
        </>
    );
};

export default DashBoard;
