/*Component Name: Order
Component Functional Details: User can create or update Order master details from here.
Created By: Happy
Created Date: 11/10/22
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import React, { useState, useCallback } from 'react';
import { CurrencySymbolByCode, paginationDetails } from 'global/Enum';
import ReactTableServerSide from 'components/common/table/ReactTableServerSide';
import { NavLink } from 'react-router-dom';
import { DateTimeFormat } from 'services/common/helper/Helper';
import Status from 'components/common/displayStatus/Status';
import { setAddLoading } from 'redux/globalLoader/GlobalLoaderAction';
import OrderService from 'services/admin/order/OrderService';
import { useDispatch } from 'react-redux';

const Order = ({ orderDetails }) => {
    const dispatch = useDispatch();
    const COLUMNS = [
        {
            id: "orderNumber",
            Header: "order",
            accessor: "orderNumber",
            column_name: "orderNumber",
            Cell: ({ value, row }) => {
                return row ? (
                    <>
                        <div
                            className="w-full flex justify-start items-center group"
                            style={{ width: "200px" }}
                        >
                            <div >
                                <NavLink
                                    to={
                                        `/admin/Order/orders/edit/${value}`
                                    }
                                >
                                    <div className="text-sm font-normal text-indigo-500">
                                        {value ? '#' + value : "-"}
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                    </>
                ) : (
                    "-"
                );
            },
        },
        {
            id: "fulfillmentStatus",
            Header: "Status",
            accessor: "fulfillmentStatus",
            column_name: "fulfillmentStatus",
            Cell: ({ value, row }) => {
                if (!value) {
                    return "";
                } else {
                    return (
                        <>
                            <Status type={value} />
                        </>
                    );
                }
            },
        },

        {
            id: "orderDate",
            Header: "date",
            accessor: "orderDate",
            column_name: "orderDate",
            Cell: ({ value, row }) => {
                return value ? (
                    <>
                        <div >{DateTimeFormat(value).date} </div>
                        <div className="text-[#707070] text-xs font-normal">
                            {DateTimeFormat(value).time}
                        </div>
                    </>
                ) :
                    <> <img className="max-w-20 max-h-20" src={row.original.image} alt="" /></>
            },
        }, {
            id: "subTotal",
            Header: `Sub Total (${CurrencySymbolByCode.USD})`,
            accessor: "subTotal",
            column_name: "subTotal",
            Cell: ({ value }) => {
                return `${(value ? parseFloat(value).toFixed(2) : "0.00")}`
            },
        },
        {
            id: "discounts",
            Header: `Discount Amt (${CurrencySymbolByCode.USD})`,
            accessor: "discounts",
            column_name: "discounts",
            Cell: ({ value }) => {
                return `${(value ? parseFloat(value).toFixed(2) : "0.00")}`
            },
        },
        {
            id: "shipping",
            Header: `Shipping (${CurrencySymbolByCode.USD})`,
            accessor: "shipping",
            column_name: "Shipping",
            Cell: ({ value }) => {
                return `${(value ? parseFloat(value).toFixed(2) : "0.00")}`
            },
        },
        {
            id: "tax",
            Header: `tax (${CurrencySymbolByCode.USD})`,
            accessor: "tax",
            column_name: "tax",
            Cell: ({ value }) => {
                return `${(value ? parseFloat(value).toFixed(2) : "0.00")}`
            },
        },
        {
            id: "adjAmount",
            Header: `Adj. Amount (${CurrencySymbolByCode.USD})`,
            accessor: "adjAmount",
            column_name: "adjAmount",
            Cell: ({ value }) => {
                return `${(value ? parseFloat(value).toFixed(2) : "0.00")}`
            },
        },
        {
            id: "orderTotal",
            Header: `total (${CurrencySymbolByCode.USD})`,
            accessor: "orderTotal",
            column_name: "orderTotal",
            Cell: ({ value }) => {
                return `${(value ? parseFloat(value).toFixed(2) : "0.00")}`
            },
        },

    ];
    const [Data, setData] = useState([]);
    const [sortingOptions, setSortingOptions] = useState([
        {
            field: "name",
            direction: 0,
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
            OrderService.getOrders({
                pageSearchArgs: {
                    pageSize: paginationData.pageSize,
                    pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
                    sortingOptions,
                    filteringOptions: [],
                },
                storeID: [orderDetails?.storeId],
                customerId: orderDetails?.customerId,
                companyId: 0
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
        },
        [paginationData.pageSize, sortingOptions]
    );
    return (
        <div className='grow'>
            <div className=' space-y-6'>
                <ReactTableServerSide
                    COLUMNS={COLUMNS}
                    DATA={Data}
                    {...paginationData}
                    setTablePageSize={(value) =>
                        setPaginationDataFunc("pageSize", value)
                    }
                    fetchData={getExportHistoryData}
                    sortingOptions={sortingOptions}
                    setSortingOptions={setSortingOptionHandler}
                    hiddenColumns={['rowSelection']}
                    tablePadding={'px-4 pb-4'}
                    displaySearch={false}

                />
            </div>
        </div>
    );
};

export default Order;
