/*Component Name: TopCustomerByProfitability
Component Functional Details: User can create or update TopCustomerByProfitability master details from here.
Created By: Shrey Patel
Created Date: Currunt Date
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import React, { useState, useCallback, useMemo, useEffect } from "react";
import ReactTable from "components/common/table/ReactTableServerSide";
import { useDispatch } from "react-redux";
import { CurrencySymbolByCode } from "global/Enum";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import DashBoardService from "services/admin/customer/DashBoardService";

const TopCustomerByProfitability = ({ DropDownData, store, DataFromDate }) => {

    const [Data, setData] = useState([]);
    const dispatch = useDispatch();
    // const [paginationData, setPaginationData] = useState({ ...paginationDetails, });
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

    const getTopCustomerByProfitability = useCallback(
        (pageIndex = 1) => {
            dispatch(setAddLoading(true));
            DashBoardService.getTopCustomerByProfitability({
                filter: DropDownData,
                storeid: store?.value
            }).then((response) => {
                if (response?.data?.success && response?.data?.data) {
                    // setData(response?.data?.data);
                    // setPaginationData((prevState) => ({
                    //     ...prevState,
                    //     pageIndex: response.data.data.pageIndex,
                    //     pageSize: response.data.data.pageSize,
                    // }));
                }
                dispatch(setAddLoading(false));
            }).catch((errors)=>{
                dispatch(setAddLoading(false));
            })
        },
        [filteringOptions, sortingOptions, DropDownData, store]
    );

    useEffect(() => {
        getTopCustomerByProfitability();
    }, [DropDownData, store])

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
            id: "customerName",
            Header: "Customer Name",
            accessor: "customerName",
            column_name: "customerName",
            Cell: ({ value }) => {
                return value ? (<div className="">{value}</div>
                ) : ("")
            },
        },
        {
            id: "totalProfitAmount",
            Header: `Total Profit (${CurrencySymbolByCode.USD})`,
            accessor: "totalProfitAmount",
            column_name: "totalProfitAmount",
            Cell: ({ value }) => {
                return value ? (
                    <div className=""> {parseInt(value).toFixed(2)}</div>
                ) : (
                    ""
                );
            },
        },
    ];
    return (
        <>
            <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-md h-[630px]">
                <div className="flex px-5 py-4 border-b-2 border-neutral-200 justify-between items-center">
                    <div className="font-semibold text-base lg:text-xl text-gray-700 inline-block">
                        Top Customer By Profitability
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
                </div>
                <div>
                    <div className="">
                        <ReactTable
                            COLUMNS={COLUMNS}
                            DATA={Data}
                            fetchData={getTopCustomerByProfitability}
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

export default TopCustomerByProfitability;
