/*Component Name: CustomerReviewsReport
Component Functional Details: User can create or update CustomerReviewsReport master details from here.
Created By: Shrey Patel
Created Date: Currunt Date
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "recharts";

import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";

import DashBoardServices from "services/admin/customer/DashBoardService";
import DashBoardService from "services/admin/customer/DashBoardService";

import { defaultImage, paginationDetails, RandomColors, anniesAnnualData } from "global/Enum";

import CircleChart from "components/admin/reports/reports/Chart/CircleChart";
import ReactTableServerSide from "components/common/table/ReactTableServerSide";
import Image from "components/common/formComponent/Image";
import StarRating from "components/common/others/admin/Rating";

const CustomerReviewsReport = ({
    DataFromDate,
    DropDownData,
    showInMainDashboard = false,
    extraDropDownData,
    extraDataFromDate,
    store,
}) => {
    const dispatch = useDispatch();
    const reduxData = useSelector((store) => store);
    const [OrdersData, setOrdersData] = useState([]);
    const [Data, setData] = useState([]);
    const [paginationData, setPaginationData] = useState({ ...paginationDetails });
    const [filteringOptions, setColumnFilteringOptions] = useState([]);
    const [sortingOptions, setSortingOptions] = useState([
        {
            field: "name",
            direction: 0,
            priority: 0,
        },
    ]);

    const setSortingOptionHandler = (column, direction) => {
        setSortingOptions([
            {
                field: column,
                direction: direction,
                priority: 0,
            },
        ]);
    };

    const getCustomerReviewTotalReport = () => {
        dispatch(setAddLoading(true));
        DashBoardServices.getCustomerReviewTotal({
            storeid: [anniesAnnualData.storeId],
            filter: showInMainDashboard === true ? extraDropDownData : DropDownData,
            userId: reduxData?.user?.id,
            companyConfigurationId: reduxData?.CompanyConfiguration?.id,
            startDate: null,
            endDate: null
        }).then((res) => {
            if (res?.data?.success && res?.data?.data) {
                const updatedTotalOrdersArray = res?.data?.data.map(
                    (order, index) => {
                        order["color"] = RandomColors[index];
                        order["name"] = order.label;
                        order["value"] = Number(order.value);
                        return order;
                    }
                );
                setOrdersData(updatedTotalOrdersArray);
            }
            dispatch(setAddLoading(false));
        }).catch(() => {
            dispatch(setAddLoading(false));
        });
    };

    const getCustomerReviewListData = () => {
        dispatch(setAddLoading(true));
        DashBoardService.getCustomerReviewListData({
            args: {
                pagingStrategy: 0,
                sortingOptions,
                filteringOptions,
            },
            storeid: [anniesAnnualData.storeId],
            filter: showInMainDashboard === true ? extraDropDownData : DropDownData,
            userId: reduxData?.user?.id,
            companyConfigurationId: reduxData?.CompanyConfiguration?.id,
            startDate: null,
            endDate: null
        }).then((response) => {
            setData(response.data.data.items);
            setPaginationData((prevState) => ({
                ...prevState,
                pageIndex: response.data.data.pageIndex,
                pageSize: response.data.data.pageSize,
                totalCount: response.data.data.totalCount,
                totalPages: response.data.data.totalPages,
                hasPreviousPage: response.data.data.hasPreviousPage,
                hasNextPage: response.data.data.hasNextPage,
            }));
            dispatch(setAddLoading(false));
        }).catch(() => {
            dispatch(setAddLoading(false));
        });
    }

    const COLUMNS = [
        {
            id: "porduct",
            Header: "Product Name",
            accessor: "porduct",
            column_name: "porduct",
            Cell: ({ value, row }) => {
                return value ? (
                    <>
                        <div className="flex">
                            <div>
                                {row?.original?.porductImage !== "" ? (
                                    <div className="h-16 w-16 mr-8 flex items-center justify-center overflow-hidden  rounded-full border bg-white">
                                        <Image
                                            src={row?.original?.porductImage}
                                            containerHeight={""}
                                            className="max-h-full"
                                        />
                                    </div>
                                ) : (
                                    <div className="h-16 w-16 mr-4 flex items-center justify-center overflow-hidden  rounded-full border bg-white">
                                        <Image src={defaultImage} className="max-h-full" />
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center justify-center">{value}</div>
                        </div>
                    </>
                ) : (
                    ""
                );
            },
        },
        {
            id: "storeName",
            Header: "Store Name",
            accessor: "storeName",
            column_name: "storeName",
            disableSortBy: true,
            Cell: ({ value }) => {
                return value ? (
                    <>
                        <div>{value}</div>
                    </>
                ) : (
                    ""
                );
            },
        },
        {
            id: "time",
            Header: "Time",
            accessor: "time",
            column_name: "time",
            Cell: ({ value }) => {
                return value ? (
                    <>
                        <div>{value}</div>
                    </>
                ) : (
                    ""
                );
            },
        },
        {
            id: "reviewer",
            Header: "Reviewer",
            accessor: "reviewer",
            column_name: "reviewer",
            Cell: ({ value }) => {
                return value ? <div className="">{value}</div> : "";
            },
        },
        {
            id: "review",
            Header: "Review",
            accessor: "review",
            column_name: "review",
            Cell: ({ value }) => {
                return value ? (
                    <>
                        <div className="" style={{ width: "170px" }}>
                            {value}{" "}
                        </div>
                    </>
                ) : (
                    ""
                );
            },
        },
        {
            id: "rating",
            Header: "Rating",
            accessor: "rating",
            column_name: "rating",
            Cell: ({ value }) => {
                return value ? (
                    <div className="first:pr-2 flex-center justify-center">
                        <StarRating value={value} size="30px" avgRating={value} />
                    </div>
                ) : (
                    ""
                );
            },
        },
        {
            id: "status",
            Header: "Status",
            accessor: "status",
            column_name: "status",
            Cell: ({ value }) => {
                // return <Status type={value} />;
                return value === "A" ? (
                    <div className="text-xs inline-block font-medium border border-green-300 bg-green-100 text-green-600 rounded-md text-center px-2.5 py-1 w-28">
                        Approved
                    </div>
                ) : (
                    <div className="text-xs inline-block font-medium border border-yellow-300 bg-yellow-100 text-yellow-600 rounded-md text-center px-2.5 py-1 w-28">
                        {" "}
                        Pending
                    </div>
                );
            },
        },
    ];

    useEffect(() => {
        getCustomerReviewTotalReport();
    }, [DropDownData, extraDropDownData]);

    useEffect(() => {
        getCustomerReviewListData();
    }, [filteringOptions,
        paginationData.pageSize,
        sortingOptions,
        paginationData.pageIndex,
        DropDownData,
        extraDropDownData]);

    return (
        <>
            <div className="h-full">
                <div className="grid grid-cols-12 gap-6 max-w-full mx-auto mb-6 h-full">
                    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 rounded-md">
                        <CircleChart
                            title={"Reviews"}
                            data={OrdersData}
                            DataFromDate={showInMainDashboard === false ? DataFromDate : extraDataFromDate}
                            label={true}
                            SubDataClassName={"text-sm text-orange-600"}
                            StoreNameLabel={false}
                            StoreName={store?.label}
                        >
                            <Tooltip />
                        </CircleChart>
                    </div>
                    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-8 bg-white shadow-lg rounded-md">
                        <div className="col-span-full xl:col-span-6 rounded-md">
                            <div className="p-3 text-gray-700 text-md border-b-2 border-neutral-200 flex justify-between">
                                <div>
                                    <div className="mt-2 mb-2 uppercase font-bold">
                                        Latest Reviews
                                    </div>
                                    <div>
                                        {/* <span className="text-sm">Duration : </span> */}
                                        {/* <span className={"text-sm text-orange-600"}>
                                            {store?.label}
                                        </span> */}
                                        <span className={"ml-1 text-sm text-cyan-600"}>
                                            (
                                            {showInMainDashboard === false
                                                ? DataFromDate
                                                : extraDataFromDate}{" "}
                                            )
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full rounded-md mb-8 overflow-auto h-[367px]">
                                <ReactTableServerSide
                                    COLUMNS={COLUMNS}
                                    DATA={Data}
                                    {...paginationData}
                                    fetchData={() => { }}
                                    sortingOptions={sortingOptions}
                                    setSortingOptions={setSortingOptionHandler}
                                    setColumnFilteringOptions={setColumnFilteringOptions}
                                    hiddenColumns={useMemo(() => ["rowSelection"], [])}
                                    displaySearch={false}
                                    filters={false}
                                    tablePadding={"0"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomerReviewsReport;
