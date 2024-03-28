/*Component Name: Emails
Component Functional Details:  Emails .
Created By: PK Kher
Created Date: <Creation Date>
Modified By: chandan
Modified Date: <Modified Date> */

import React, { useState, useCallback, useEffect } from 'react';
import { CurrencySymbolByCode, anniesAnnualData, defaultImage, paginationDetails } from 'global/Enum';
import ReactTableServerSide from 'components/common/table/ReactTableServerSide';
import { useMemo } from 'react';
import { useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { DateTimeFormat, serverError } from 'services/common/helper/Helper';
import Status from 'components/common/displayStatus/Status';
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import Image from 'components/common/formComponent/Image';
import OrderService from 'services/admin/order/OrderService';
import VarientProductModal from 'components/admin/master/common/product/create/forms/VarientProductModal';
import GeneralStatus from 'components/common/displayStatus/General';
import StatusService from 'services/admin/status/StatusService';
import { ValidationMsgs } from 'global/ValidationMessages';
import { setAlertMessage } from 'redux/alertMessage/AlertMessageReducers';

const Orders = ({ activeTab, filterData = [] }) => {

    const { id } = useParams();
    const dispatch = useDispatch();

    const [statusList, setStatusList] = useState({});
    useEffect(() => {
        StatusService.getAllStatus({
            pageIndex: 0,
            pageSize: 999999999,
            pagingStrategy: 0,
            sortingOptions: [],
            filteringOptions: []
        }).then((response) => {
            if (response?.data?.success && response.data?.data?.items) {
                setStatusList(() => {
                    let status = {};
                    response.data?.data?.items.map(value => {
                        status = {
                            ...status, [value?.type?.toLowerCase()]: {
                                ...status[value?.type?.toLowerCase()], [value?.name?.toLowerCase()]: value
                            }
                        }
                    });
                    return status;
                });
            }
        }).catch(() => {

        });
    }, []);

    const COLUMNS = [
        {
            id: "expander",
            accessor: "a",
            Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => "",
            Cell: ({ row }) => {
                return (
                    <span
                        title="Show Sub Product"
                        className="material-icons-outlined select-none leading-none ml-2 w-6 h-6 cursor-pointer transition-all variant-arrow"
                        onClick={() => {
                            getVarientDataFunc(row?.original);
                        }}
                    >
                        add
                    </span>
                );
            },
            disableShowHide: true,
            disableSortBy: true,
        },
        {
            id: "orderStatus",
            Header: "Order Status",
            accessor: "orderStatus",
            column_name: "orderStatus",
            isVisible: false,
            disableShowHide: true,
            Cell: ({ value, row }) => {
                return (
                    <>
                        <div className="text-sm mt-1 flex flex-col">
                            {value ? (
                                <GeneralStatus
                                    type={row?.original?.orderStatus}
                                    style={{
                                        backgroundColor: `${statusList?.["orderstatus"]?.[
                                            row?.original?.orderStatus?.toLowerCase()
                                        ]?.color
                                            }`,
                                        color: `${statusList?.["orderstatus"]?.[
                                            row?.original?.orderStatus?.toLowerCase()
                                        ]?.textColor
                                            }`,
                                    }}
                                />
                            ) : (
                                ""
                            )}
                        </div>
                    </>
                );
            },
        },
        {
            id: "orderNumber",
            Header: "Order",
            accessor: "orderNumber",
            column_name: "orderNumber",
            Cell: ({ value, row }) => {
                return row ? (
                    <>
                        <div
                            className="w-full flex justify-start items-center group"
                            style={{ width: "200px" }}
                        >
                            <div>
                                <NavLink
                                    to={`/admin/Order/orders/edit/${row?.original?.orderNumber}`}
                                >
                                    <div className="text-indigo-500 text-sm font-normal">
                                        #{value ? value : ""}
                                    </div>
                                </NavLink>
                                {row?.original?.refenceOrderID ? (
                                    <div className="text-[#707070] text-sm font-normal">
                                        Ref.#{row?.original?.refenceOrderID}{" "}
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    ""
                );
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
            id: "customerNameZipcode",
            Header: "Customer Name / Zipcode",
            accessor: "customerName",
            column_name: "customerName_Zipcode",
            Cell: ({ value, row }) => {
                if (row.original) {
                    return value ? (
                        <>
                            <div className="font-bold">
                                <div className="font-semibold">{value}</div>
                            </div>
                            <div className="mb-2 last:mb-0">
                                {row?.original?.customerShippingAddress1
                                    ? row?.original?.customerShippingAddress1 + ", "
                                    : ""}
                                {row?.original?.customerShippingAddress2 ? (
                                    <>
                                        {row?.original?.customerShippingAddress2 + ", "} <br />
                                    </>
                                ) : (
                                    ""
                                )}
                                {row?.original?.customerShippingCity
                                    ? row?.original?.customerShippingCity + ", "
                                    : ""}
                                {row?.original?.customerShippingState ? (
                                    <>
                                        {row?.original?.customerShippingState + ", "} <br />{" "}
                                    </>
                                ) : (
                                    ""
                                )}
                                {row?.original?.customerShippingCountry
                                    ? row?.original?.customerShippingCountry + ", "
                                    : ""}
                                {row?.original?.customerShippingZipcode
                                    ? row?.original?.customerShippingZipcode
                                    : ""}
                            </div>
                            <div className="text-indigo-500 cursor-pointer">
                                {row?.original ? row?.original?.shippingTackingNumber : ""}
                            </div>
                        </>
                    ) : (
                        <>{row.original.productDetails}</>
                    );
                } else {
                    return (
                        <>
                            <div className="">{row?.original?.customerName}</div>
                            <div className="text-[#707070] text-sm font-normal">
                                Ref. Order$: {row?.original?.refenceOrderID}
                            </div>
                            <div className="text-[#707070] text-sm font-normal">
                                Color: {row?.original?.attributeOptionValue}{" "}
                            </div>
                            <div className="text-[#707070] text-sm font-normal">
                                SKU: {row?.original?.sku}{" "}
                            </div>
                            <div className="text-[#707070] text-sm font-normal">
                                Quantity: 2{" "}
                            </div>
                        </>
                    );
                }
            },
        },
        {
            id: "orderTotal",
            Header: `total (${CurrencySymbolByCode.USD})`,
            accessor: "orderTotal",
            column_name: "orderTotal",
            Cell: ({ value }) => {
                if (!value) {
                    return "";
                } else {
                    return parseFloat(value).toFixed(2);
                }
            },
        },
        {
            id: "paymentType",
            Header: "Payment Type",
            accessor: "paymentType",
            column_name: "paymentType",
            Cell: ({ value }) => {
                if (!value) {
                    return "";
                } else {
                    return <span className="capitalize">{value}</span>;
                }
            },
        },
        {
            id: "paymentStatus",
            Header: "Payment Status",
            accessor: "paymentStatus",
            column_name: "paymentStatus",
            Cell: ({ value, row }) => {
                if (value && row?.original) {
                    return value === "paid" ? (
                        <Status
                            type={value}
                            className="border-green-300 bg-green-100 text-green-600"
                        />
                    ) : (
                        <Status
                            type={value}
                            className="border-yellow-300 bg-yellow-100 text-yellow-600"
                        />
                    );
                } else {
                    return "";
                }
            },
        },
        {
            id: "fulfillmentStatus",
            Header: "Fulfillment Status",
            accessor: "fulfillmentStatus",
            column_name: "fulfillmentStatus",
            Cell: ({ value, row }) => {
                if (!value) {
                    return "";
                } else {
                    return (
                        <>
                            <div className="text-center">
                                <Status type={value} />
                                <div className="text-indigo-500 cursor-pointer">
                                    {row?.original?.shippingTackingNumber}
                                </div>
                            </div>
                        </>
                    );
                }
            },
        },
        {
            id: "totalItems",
            Header: "Item",
            accessor: "totalItems",
            column_name: "totalItems",
            Cell: ({ value }) => {
                if (!value) {
                    return "";
                } else {
                    return value;
                }
            },
        },
        {
            id: "deliveryMethod",
            Header: "delivery method",
            accessor: "deliveryMethod",
            column_name: "deliveryMethod",
            Cell: ({ value, row }) => {
                return value ? <GeneralStatus type={value} /> : "";
            },
        },
        {
            id: "id",
            Header: "",
            accessor: "id",
            column_name: "",
            disableShowHide: true,
            disableSortBy: true,
            Cell: ({ value, row }) => {
                return (
                    <button
                        className="text-sm text-indigo-500"
                        style={{ width: "100px" }}
                        onClick={() => ResendOrderDetails(row?.original)}
                    >
                        Resend Order Details
                    </button>
                );
            },
        },
    ];

    const columnForVarientProducts = [
        {
            id: "colorImage",
            Header: "product Image",
            accessor: "colorImage",
            column_name: "colorImage",
            isVisible: false,
            disableShowHide: true,
            disableSortBy: true,
            Cell: ({ value, row }) => {
                return value && value !== "" ? (
                    <>
                        <div className="h-16 w-16 flex items-center justify-center overflow-hidden  box-content border bg-white">
                            <Image src={value} containerHeight={""} className="max-h-full" />
                        </div>
                    </>
                ) :
                    <div className="h-16 w-16 flex items-center justify-center overflow-hidden  box-content border bg-white">
                        <Image src={defaultImage} className="max-h-full" containerHeight={""} />
                    </div>
            },
        },
        {
            id: "productName",
            Header: "Product Name",
            accessor: "productName",
            column_name: "productName",
            disableShowHide: true,
            disableSortBy: true,
            Cell: ({ value, row }) => {
                if (row.original) {
                    return value ? (
                        <>
                            <div className="font-semibold">{value}</div>
                            <div className="mb-2 last:mb-0">
                                <div className="text-[#707070] text-sm font-normal">Ref. Order$: {/* {row?.original?.refenceOrderID} */}</div>
                                <div className="text-[#707070] text-sm font-normal">Color: {/* {row?.original?.attributeOptionValue}  */}</div>
                                <div className="text-[#707070] text-sm font-normal">SKU: {row?.original?.sku} </div>
                                <div className="text-[#707070] text-sm font-normal">Quantity: {row?.original?.qty} </div>
                            </div>
                        </>
                    ) :
                        <>{row?.original?.productName}</>
                }
            },
        },
        {
            id: "price",
            Header: `Price (${CurrencySymbolByCode.USD})`,
            accessor: "price",
            column_name: "price",
            disableShowHide: true,
            disableSortBy: true,
            Cell: ({ value }) => {
                return value ? `${parseInt(value).toFixed(2)}` : "";
            },
        },
        {
            id: "subTotal",
            Header: `Total Amount (${CurrencySymbolByCode.USD})`,
            accessor: "subTotal",
            column_name: "subTotal",
            disableShowHide: true,
            disableSortBy: true,
            Cell: ({ value }) => {
                return value ? `${parseInt(value).toFixed(2)}` : "";
            },
        },
        {
            id: "qty",
            Header: "Items",
            accessor: "qty",
            column_name: "qty",
            disableShowHide: true,
            disableSortBy: true,
            Cell: ({ value }) => {
                return value ? value : "";
            },
        },
        {
            id: "fulfillmentStatus",
            Header: "Fulfillment Status",
            accessor: "fulfillmentStatus",
            column_name: "fulfillmentStatus",
            disableShowHide: true,
            disableSortBy: true,
            Cell: ({ value, row }) => {
                if (!value) {
                    return "";
                } else {
                    return (
                        <>
                            <div className='text-center'>
                                <div className='capitalize'>{value}</div>
                                <span className='text-indigo-500 cursor-pointer'>{row?.original?.shippingTackingNumber}</span>
                            </div>
                        </>
                    )
                }
            },
        },
    ];

    const [loading/* , setLoading */] = useState(false);
    const [Data, setData] = useState([]);
    const [filteringOptions, setColumnFilteringOptions] = useState([]);
    const [dataForVarientProducts, setdataForVarientProducts] = useState([]);
    const [openVarientModal, setOpenVarientModal] = useState({
        name: "",
        ourSku: "",
        toShow: false
    });
    const [sortingOptions, setSortingOptions] = useState([
        {
            field: "orderDate",
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
    const getAllData = useCallback((pageIndex = 1, storeId = [anniesAnnualData.storeId]) => {
        dispatch(setAddLoading(true));
        OrderService.getOrders(
            {
                pageSearchArgs: {
                    pageSize: paginationData.pageSize,
                    pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
                    pagingStrategy: 0,
                    sortingOptions,
                    filteringOptions: [...filterData, ...filteringOptions],
                },
                storeID: storeId,
                customerId: id,
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
            })
    },
        [filteringOptions, paginationData.pageSize, sortingOptions, activeTab, filterData]);

    const getVarientDataFunc = (currentRowData) => {
        dispatch(setAddLoading(true))
        setOpenVarientModal((prevData) => ({
            ...prevData,
            name: currentRowData.name,
            ourSku: currentRowData.ourSKU,
            toShow: true
        }))

        OrderService.OrderedShoppingCartItems({
            pageSearchArgs: {
                pageIndex: paginationData.pageIndex,
                pagingStrategy: 0,
                sortingOptions,
                filteringOptions: [{
                    field: 'isItemCancel',
                    operator: 1,
                    value: false
                }],
            },
            orderId: currentRowData.id
        }).then((response) => {
            const VarientData = response?.data?.data.items;
            setdataForVarientProducts(VarientData || [])
            dispatch(setAddLoading(false))
        }).catch(() => {
            dispatch(setAddLoading(false))
        })
    }

    const ResendOrderDetails = (orderDetail) => {
        if (orderDetail?.orderNumber) {
            dispatch(setAddLoading(true))
            OrderService.sendOrderMailInvoice({ orderId: orderDetail?.orderNumber }).then((response) => {
                if (response?.data?.success && response?.data?.data) {
                    dispatch(setAlertMessage({
                        type: 'success',
                        message: response?.data?.data,
                    }));
                } else {
                    dispatch(setAlertMessage({
                        type: 'danger',
                        message: serverError(response),
                    }));
                }
                dispatch(setAddLoading(false));
            }).catch(() => {
                dispatch(setAlertMessage({
                    type: 'danger',
                    message: ValidationMsgs.orderPaymentPendingEmail.ResetPasswordNotSuccess,
                }));
                dispatch(setAddLoading(false));
            })
        }
    }
    
    return (
        <div className='grow'>
            <div className='py-6 space-y-6'>
                <h2 className="text-2xl text-gray-800 font-bold mb-5">Orders</h2>
                <ReactTableServerSide
                    COLUMNS={COLUMNS}
                    DATA={Data}
                    {...paginationData}
                    setTablePageSize={(value) =>
                        setPaginationDataFunc("pageSize", value)
                    }
                    fetchData={getAllData}
                    sortingOptions={sortingOptions}
                    filteringOptions={filteringOptions}
                    setColumnFilteringOptions={setColumnFilteringOptions}
                    setSortingOptions={setSortingOptionHandler}
                    loading={loading}
                    hiddenColumns={['rowSelection']}
                    tablePadding={'px-4 pb-4'}
                    expandedRows={useMemo(() => true, [])}
                />
            </div>

            <VarientProductModal
                title={`Ordered Products`}
                openModal={openVarientModal}
                setOpenModal={setOpenVarientModal}
                COLUMNS={columnForVarientProducts}
                DATA={dataForVarientProducts}
                setdataForVarientProducts={setdataForVarientProducts}
            />

        </div>
    );
};

export default Orders;
