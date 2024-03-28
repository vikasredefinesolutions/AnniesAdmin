/*Component Name: TopOrderByMarketPlace
Component Functional Details: User can create or update TopOrderByMarketPlace master details from here.
Created By: Shrey Patel
Created Date: 04/07/2023
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import React, { useState, useEffect, useCallback, useMemo } from "react";
import ReactTable from "components/common/table/ReactTableServerSide";
import { useDispatch } from "react-redux";
import { paginationDetails } from "global/Enum";
import StoreService from "services/admin/store/StoreService";
import { defaultImage, CurrencySymbolByCode } from "global/Enum";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import Image from "components/common/formComponent/Image";
import DashBoardServices from "services/admin/order/DashBoardServices";
import { Link } from "react-router-dom";

const TopOrderByMarketPlace = ({ stickyShow = false, DataFromDate, DropDownData }) => {
    const [Data, setData] = useState([]);
    const dispatch = useDispatch();

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

    const getTopStoreData = useCallback(
        (pageIndex) => {
            return
            dispatch(setAddLoading(true));
            DashBoardServices.getStoreOrderByMarketPlaceData({ filter: DropDownData })
                .then((response) => {
                    setData(response.data.data);
                    dispatch(setAddLoading(false));
                }).catch(() => {
                    dispatch(setAddLoading(false));
                })
        },
        [filteringOptions, sortingOptions, DropDownData]
    );

    // useEffect(() => {
    //     getTopStoreData();
    // }, [])

    const COLUMNS = [
        {
            id: "",
            Header: "#",
            accessor: "",
            column_name: "",
            disableSortBy: true,
            Cell: ({ row }) => {
                return row && (
                    <div>{row.index + 1}.</div>
                )
            },
        },
        {
            id: "storeName",
            Header: "# MarketPlace",
            accessor: "storeName",
            column_name: "storeName",
            disableSortBy: true,
            Cell: ({ value, row }) => {
                return value ? (
                    <>
                        <Link to={`/admin/configurator/storeconfiguration/edit/${row.original.id}`} >
                            <div className="flex">
                                <div>
                                    {row?.original?.logoUrl !== "" ? (
                                        <div className="h-16 w-16 mr-8 flex items-center justify-center overflow-hidden  rounded-full border bg-white">
                                            <Image src={row?.original?.logoUrl} containerHeight={""} className="max-h-full" />
                                        </div>
                                    ) : (
                                        <div className="h-16 w-16 mr-4 flex items-center justify-center overflow-hidden  rounded-full border bg-white">
                                            <Image src={defaultImage} className="max-h-full" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center justify-center">{value}</div>
                            </div>

                        </Link>
                    </>
                ) : (
                    ""
                );
            },
        },
        {
            id: "totalOrders",
            Header: "# Of Orders",
            accessor: "totalOrders",
            column_name: "totalOrders",
            disableSortBy: true,
            Cell: ({ value, row }) => {
                return value || value === 0 ? (
                    <>
                        <div className="text-left">{value}</div>
                        <div className="text-left text-gray-500">{CurrencySymbolByCode.USD}{row?.original?.revenues.toFixed(2)}</div>
                    </>
                ) : (
                    ""
                );
            },
        },
    ];
    return (
        <>
            <title>Top 5 Store By MarketPlace</title>
            {/* <!-- topstore --> */}
            <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-md">
                <div className={`flex px-5 py-4 border-b-2 border-neutral-200 justify-between items-center ${stickyShow === true ? "sticky top-0 z-10 bg-white" : ""}`}>
                    <div className="text-base lg:text-xl text-gray-700 inline-block font-semibold">
                        Top 5 Store Order By MarketPlace
                        <div className="text-sm">
                            <span className={"ml-1 text-sm text-cyan-600"}>
                                ( {DataFromDate} )
                            </span>
                        </div>
                    </div>
                </div>
                <div className="h-[496px]">
                    <ReactTable
                        COLUMNS={COLUMNS}
                        DATA={Data}
                        fetchData={getTopStoreData}
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
        </>
    );
};

export default TopOrderByMarketPlace;
