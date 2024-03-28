/*Component Name: Log
Component Functional Details:  Log .
Created By: PK Kher
Created Date: 7-25-2022
Modified By: PK Kher
Modified Date: 7-25-2022 */

import React, { useState, useCallback } from 'react';
import { paginationDetails } from 'global/Enum';
import ReactTableServerSide from 'components/common/table/ReactTableServerSide';
import { DateTimeFormat } from "services/common/helper/Helper";
import OrderService from 'services/admin/order/OrderService';
import { useDispatch } from 'react-redux';
import { setAddLoading } from 'redux/globalLoader/GlobalLoaderAction';


const Log = ({ orderDetail }) => {
    const COLUMNS = [
        {
            id: "createdName",
            Header: "User",
            accessor: "createdName",
            column_name: "createdName",

        },

        {
            id: "status",
            Header: "Action",
            accessor: "status",
            column_name: "status",
        },
        // {
        //     id: "logDescription",
        //     Header: "Description",
        //     accessor: "logDescription",
        //     column_name: "logDescription",
        // },

        {
            id: "createdDate",
            Header: "Created Date",
            accessor: "createdDate",
            column_name: "createdDate",
            Cell: ({ value }) => {
                return value ? (
                    <>
                        <div >{DateTimeFormat(value).date} </div>
                        <div className="text-[#707070] text-xs font-normal">
                            {DateTimeFormat(value).time}
                        </div>
                    </>
                ) : (
                    "-"
                );
            },
        },
    ];
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const [Data, setData] = useState([]);
    const [filteringOptions, setColumnFilteringOptions] = useState([]);

    const [sortingOptions, setSortingOptions] = useState([
        {
            field: "createdDate",
            direction: 1,
            priority: 0,
        },
    ]);
    const [paginationData, setPaginationData] = useState({
        ...paginationDetails,
    });
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
    const getExportHistoryData = useCallback(
        (pageIndex) => {
            dispatch(setAddLoading(true));
            OrderService.orderLogList({
                pageSearchArgs: {
                    pageSize: paginationData.pageSize,
                    pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
                    sortingOptions,
                    filteringOptions,
                },
                orderNumber: orderDetail?.orderNumber
            }).then((response) => {
                if (response.data.success && response?.data?.data?.items) {
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
                }
                dispatch(setAddLoading(false));
            }).catch(() => {
                dispatch(setAddLoading(false));
            })
        },
        [
            filteringOptions,
            paginationData.pageSize,
            sortingOptions,
            paginationData.pageIndex,
            orderDetail
        ]
    );
    return (
        <div className="col-span-full w-full rounded-md pt-5">
            {orderDetail?.orderNumber && <ReactTableServerSide
                COLUMNS={COLUMNS}
                DATA={Data}
                {...paginationData}
                setTablePageSize={(value) =>
                    setPaginationDataFunc("pageSize", value)
                }
                fetchData={getExportHistoryData}
                setColumnFilteringOptions={setColumnFilteringOptions}
                sortingOptions={sortingOptions}
                setSortingOptions={setSortingOptionHandler}
                loading={loading}
                hiddenColumns={['rowSelection']}
                tablePadding={'px-4 pb-4'}
            />}
        </div>
    );
};

export default Log;
