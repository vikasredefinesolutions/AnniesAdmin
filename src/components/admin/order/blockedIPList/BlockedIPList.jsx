import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import ReactTable from "components/common/table/ReactTableServerSide";
import { DateTimeFormat, TitleNameHelper, serverError } from "services/common/helper/Helper";
import { paginationDetails } from "global/Enum";
import { useLocation } from "react-router";
import OrderServiceCls from "services/admin/order/OrderService";
import { ValidationMsgs } from "global/ValidationMessages";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import Messages from "components/common/alerts/messages/Index";

const BlockedIPList = () => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const [Data, setData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const location = useSelector((store) => store?.location);
    const [sortingOptions, setSortingOptions] = useState([
        {
            field: "name",
            direction: 0,
            priority: 0,
        },
    ]);
    const [filteringOptions, setColumnFilteringOptions] = useState([]);
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

    const getBlockedIPListData = useCallback(
        (pageIndex = 1) => {
            dispatch(setAddLoading(true));
            OrderServiceCls.getBlockedIPListData({
                pageSearchArgs: {
                    pageSize: paginationData.pageSize,
                    pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
                    sortingOptions,
                    filteringOptions,
                }
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
            });
        }, [
            filteringOptions,
            paginationData.pageSize,
            sortingOptions,
            paginationData.pageIndex,
        ]
    );

    const UnblockOrderIP = (CustomerDetails) => {
        dispatch(setAddLoading(true));
        OrderServiceCls.blockOrderIP({
            orderId: CustomerDetails?.orderId,
            isBlockIP: false,
            ipAddress: CustomerDetails?.customerIPAddress,
            ...location
        }).then((response) => {
            if (response?.data?.success && response?.data?.data) {
                dispatch(setAlertMessage({
                    type: 'success',
                    message: ValidationMsgs.order.orderIPBlocked,
                }));
                getBlockedIPListData();
            } else {
                dispatch(setAlertMessage({
                    type: 'danger',
                    message: serverError(response),
                }));
            }
            dispatch(setAddLoading(false));
        }).catch((errors) => {
            dispatch(setAlertMessage({
                message: ValidationMsgs.order.orderIPNotBlocked,
                type: 'danger'
            }));
            dispatch(setAddLoading(false));

        });
    };

    const COLUMNS = [
        {
            id: "customerIPAddress",
            Header: "Customer IP Address",
            accessor: "customerIPAddress",
            column_name: "customerIPAddress",
            Cell: ({ value }) => {
                return value ? (
                    <>
                        <div className="text-left">{value}</div>
                    </>
                ) : (
                    "-"
                );
            },
        },
        {
            id: "createdDate",
            Header: "Created Date",
            accessor: "createdDate",
            column_name: "createdDate",
            Cell: ({ value }) => {
                return value ? (
                    <>
                        <div>{DateTimeFormat(value).date} </div>
                        <div className="text-[#707070] text-xs font-normal">
                            {DateTimeFormat(value).time}
                        </div>
                    </>
                ) : (
                    ""
                );
            },
        },
        {
            id: "id",
            Header: "",
            accessor: "id",
            column_name: "id",
            disableSortBy: true,
            Cell: ({ value, row }) => {
                return value ? (
                    <>
                        <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                            onClick={() => UnblockOrderIP(row.original)}
                        >
                         Unblock this IP
                        </button>
                    </>
                ) : (
                    ""
                );
            },
        },
    ];

    return (
        <>
            <title>{TitleNameHelper({ defaultTitleName: "Blocked IP List" })}</title>
            <div className="py-4">
                <div className="px-4 sm:px-6 lg:px-8 w-full items-center flex justify-between sticky top-0 z-20 py-2 bg-slate-100">
                    <div className="flex items-center">
                        <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
                            {TitleNameHelper({ defaultTitleName: "Blocked IP List" })}
                        </h1>
                    </div>
                </div>
                <div className="px-4 sm:px-6 lg:px-8 w-full pt-7">
                <Messages />
                    <div className="col-span-full w-full bg-white shadow-xxl rounded-md mb-8 relative">
                        <ReactTable
                            COLUMNS={COLUMNS}
                            DATA={Data}
                            {...paginationData}
                            setTablePageSize={(value) =>
                                setPaginationDataFunc("pageSize", value)
                            }
                            fetchData={getBlockedIPListData}
                            sortingOptions={sortingOptions}
                            setSortingOptions={setSortingOptionHandler}
                            setColumnFilteringOptions={setColumnFilteringOptions}
                            editColumnFilter={false}
                            setSelectedRows={setSelectedRows}
                            selectedRows={selectedRows}
                            filteringOptions={filteringOptions}
                            moreFilter={false}
                            hiddenColumns={useMemo(() => ["rowSelection"], [])}
                            saveFilter={{ show: false, tabName: pathname + "_" + "contactUs" }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlockedIPList;
