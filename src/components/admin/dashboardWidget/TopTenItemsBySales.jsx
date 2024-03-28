import React, { useState, useEffect, useCallback, useMemo } from "react";
import ReactTable from "components/common/table/ReactTableServerSide";
import { useDispatch, useSelector } from "react-redux";
import { paginationDetails, anniesAnnualData } from "global/Enum";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import DashboardWidgetServices from "services/admin/dashboardWidget/DashboardWidgetServices";
import { TitleNameHelper } from "services/common/helper/Helper";

const TopItemsBySales = ({ DropDownData, DataFromDate }) => {
    const [Data, setData] = useState([]);
    const dispatch = useDispatch();
    const reduxData = useSelector((store) => store);
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

    const setSortingOptionHandler = (column, direction) => {
        setSortingOptions([
            {
                field: column,
                direction: direction,
                priority: 0,
            },
        ]);
    };

    const getTopItemBySales = () => {
        if (DropDownData) {
            dispatch(setAddLoading(true));
            DashboardWidgetServices.getTopItemBySales({
                args: {
                    pagingStrategy: 0,
                    sortingOptions,
                    filteringOptions,
                },
                filter: DropDownData,
                storeid: [anniesAnnualData.storeId],
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
                }));
                dispatch(setAddLoading(false));
            });
        }
    }

    useEffect(() => {
        getTopItemBySales();
    }, [filteringOptions, sortingOptions, DropDownData]);

    const COLUMNS = [
        {
            id: "productName",
            Header: "Items",
            accessor: "productName",
            column_name: "productName",
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
            id: "totalSolds",
            Header: "Sold",
            accessor: "totalSolds",
            column_name: "totalSolds",
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
    ];

    return (
        <>
            <title>{TitleNameHelper({ defaultTitleName: "Top Items By Sales" })} </title>
            {/* <!-- topItemsBySales --> */}
            <div className="col-span-full xl:col-span-4 bg-white shadow-lg rounded-md">
                <div className="flex px-5 py-4 border-b-2 border-neutral-200 justify-between items-center sticky top-0 z-10 bg-white">
                    <div className="font-semibold text-base lg:text-xl text-gray-700 inline-block">
                        {TitleNameHelper({ defaultTitleName: "Top Items By Sales" })}
                        <div className="text-sm">
                            {/* Duration : */}
                            <span className={"ml-1 text-sm text-cyan-600"}>
                                ( {DataFromDate} )
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="">
                        <ReactTable
                            COLUMNS={COLUMNS}
                            DATA={Data}
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
        </>
    );
};
export default TopItemsBySales;
