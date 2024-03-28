import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import ReactTable from "components/common/table/ReactTableServerSide";
import { paginationDetails, anniesAnnualData } from "global/Enum";
import { DateTimeFormat } from "services/common/helper/Helper";
import DashboardWidgetServices from "services/admin/dashboardWidget/DashboardWidgetServices";
import Status from "components/common/displayStatus/Status";
import { TitleNameHelper } from "services/common/helper/Helper";

const TopCustomerApplicationRequest = ({ DropDownData, DataFromDate }) => {
    const userId = useSelector((store) => store?.user?.id);
    const companyInfo = useSelector(store => store?.CompanyConfiguration);
    const [Data, setData] = useState([]);
    const [paginationData, setPaginationData] = useState({
        ...paginationDetails,
    });
    const [filteringOptions, setColumnFilteringOptions] = useState([]);
    const [sortingOptions, setSortingOptions] = useState([
        {
            field: "name",
            direction: 0,
            priority: 0,
        },
    ]);

    const setPaginationDataFunc = (key, value) => {
        setPaginationData((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    const setSortingOptionHandler = (column, direction) => {
        setSortingOptions([
            {
                field: column,
                direction: direction,
                priority: 0,
            },
        ]);
    };
    const getTopCustomersApplication = useCallback(
        (pageIndex = 1) => {
            if (DropDownData) {
                DashboardWidgetServices.getTopCustomersApplication({
                    args: {
                        pageSize: paginationData.pageSize,
                        pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
                        sortingOptions,
                        filteringOptions,
                    },
                    storeId: [anniesAnnualData.storeId],
                    filter: DropDownData,
                    userId: userId,
                    companyConfigurationId: companyInfo?.id,
                    startDate: "2024-02-12T08:14:53.187Z",
                    endDate: "2024-02-12T08:14:53.187Z"
                }).then((response) => {
                    setData(response?.data?.data?.items);
                    setPaginationData((prevState) => ({
                        ...prevState,
                        pageIndex: response.data.data.pageIndex,
                        pageSize: response.data.data.pageSize,
                    }));
                });
            }
        }, [filteringOptions, sortingOptions, DropDownData]);

    useEffect(() => {
        getTopCustomersApplication();
    }, [DropDownData])

    const COLUMNS = [
        {
            id: "customerName",
            Header: "Customer Name",
            accessor: "customerName",
            column_name: "customerName",
            Cell: ({ value }) => {
                return value ? (
                    <>
                        <div className="font-semibold text-left">{value}</div>
                    </>
                ) : (
                    ""
                );
            },
        },
        {
            id: "storeName",
            Header: "STORE",
            accessor: "storeName",
            column_name: "storeName",
            disableSortBy: true,
            Cell: ({ value }) => {
                return value ? (
                    <>
                        <div className="w-[130px] text-left">{value}</div>
                    </>
                ) : (
                    ""
                );
            },
        },
        {
            id: "date",
            Header: "DATE",
            accessor: "date",
            column_name: "date",
            Cell: ({ value }) => {
                return value ? (
                    <>
                        <div className="font-semibold text-left">
                            {DateTimeFormat(value).date}
                        </div>
                    </>
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
            Cell: ({ value, row }) => {
                return <Status type={value} />;
                // return value ? value : ""
            },
        },
    ];

    return (
        <>
            <title>{TitleNameHelper({ defaultTitleName: "Top 10 Customer Application Request" })} </title>
            {/* <!-- Top Customer Application Request --> */}
            <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-md">
                <div className="flex px-5 py-4 border-b-2 border-neutral-200 justify-between items-center sticky top-0 z-10 bg-white">
                    <div className="font-semibold text-base lg:text-xl text-gray-700 inline-block">
                        {TitleNameHelper({ defaultTitleName: "Customer Application Request" })}
                        <div className="text-sm">
                            Duration :
                            <span className={"ml-1 text-sm text-cyan-600"}>
                                ( {DataFromDate} )
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="overflow-x-auto">
                        <ReactTable
                            COLUMNS={COLUMNS}
                            DATA={Data}
                            {...paginationData}
                            setTablePageSize={(value) =>
                                setPaginationDataFunc("pageSize", value)
                            }
                            fetchData={getTopCustomersApplication}
                            sortingOptions={sortingOptions}
                            setSortingOptions={setSortingOptionHandler}
                            hiddenColumns={useMemo(() => ['rowSelection'], [])}
                            displaySearch={false}
                            filters={false}
                            tablePadding={"0"}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
export default TopCustomerApplicationRequest;
