/*Component Name: Orders
Component Functional Details: User can create or update Orders master details from here.
Created By: chandan
Created Date: <Creation Date>
Modified By: chandan,Divyesh
Modified Date: <Modified Date> */

import React, { useCallback, useMemo, useState, useEffect } from 'react';
import ReactTable from "../../../../../common/table/ReactTableServerSide";
import { NavLink, useParams } from "react-router-dom";
import Status from "../../../../../common/displayStatus/Status";
import { paginationDetails, defaultImage, CurrencySymbolByCode } from "global/Enum";
import { DateTimeFormat } from "services/common/helper/Helper";
import { useDispatch, useSelector } from "react-redux";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import Image from "components/common/formComponent/Image";
import { format } from 'date-fns';
import OrderService from 'services/admin/order/OrderService';
import VarientProductModal from 'components/admin/master/common/product/create/forms/VarientProductModal';
import GeneralStatus from 'components/common/displayStatus/General';
import StatusService from 'services/admin/status/StatusService';

const Orders = ({ activeTab, filterData = [], PageName }) => {
    const dispatch = useDispatch();
    const [filteringOptions, setColumnFilteringOptions] = useState([]);
    const [paginationData, setPaginationData] = useState({ ...paginationDetails });
    const [selectedRows, setSelectedRows] = useState([]);
    const { id } = useParams();
    const [Data, setData] = useState([]);
    const [dataForVarientProducts, setdataForVarientProducts] = useState([]);
    const AdminAppConfigReducers = useSelector((store) => store?.AdminAppConfigReducers);
    const [openVarientModal, setOpenVarientModal] = useState({
        name: "",
        ourSku: "",
        toShow: false
    });
    const handleSort = (sortValue) => { };

    const setPaginationDataFunc = (key, value) => {
        setPaginationData((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

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

    const getAllData = useCallback((pageIndex = 1, storeId = [0]) => {
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
                customerId: 0,
                companyId: id
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

        // OrderService.OrderedShoppingCartItemDetails({
        OrderService.OrderedShoppingCartItems({
            pageSearchArgs: {
                pageIndex: paginationData.pageSize,
                pageIndex: paginationData.pageIndex,
                pagingStrategy: 0,
                sortingOptions,
                filteringOptions: [...filterData, ...filteringOptions],
            },
            orderId: currentRowData.id
        }).then((response) => {
            // const VarientData = response?.data?.data;
            const VarientData = response?.data?.data.items;
            setdataForVarientProducts(VarientData || [])
            dispatch(setAddLoading(false))
        }).catch(() => {
            dispatch(setAddLoading(false))
        })
    }

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
            Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
                ""
            ),
            Cell: ({ row }) => {
                return <span title="Show Sub Product" className="material-icons-outlined select-none leading-none ml-2 w-6 h-6 cursor-pointer transition-all variant-arrow" onClick={() => {
                    getVarientDataFunc(row?.original)
                }}>
                    add
                </span>
            },
            disableShowHide: true,
            disableSortBy: true,
        },
        {
            id: "orderStatus",
            Header: "Order Status",
            accessor: "orderExportStatus",
            column_name: "orderStatus",
            isVisible: false,
            disableShowHide: true,
            Cell: ({ value, row }) => {
                return (
                    <>
                        <div className="text-sm mt-1 flex flex-col">
                            {value ? <GeneralStatus type={row?.original?.orderStatus} style={{ backgroundColor: `${statusList?.['orderstatus']?.[row?.original?.orderStatus?.toLowerCase()]?.color}`, color: `${statusList?.['orderstatus']?.[row?.original?.orderStatus?.toLowerCase()]?.textColor}` }} /> : ''}
                        </div>
                    </>
                );
            },
        },
        {
            id: "order",
            Header: "order",
            accessor: "orderNumber",
            column_name: "order",
            disableShowHide: true,
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
                                        `/admin/Order/orders/edit/${row?.original?.orderNumber}`
                                    }
                                    className="font-medium text-indigo-500"
                                >
                                    <div className="text-sm font-normal">
                                        {value ? "#" + value : ""}
                                    </div>
                                </NavLink>
                                {row?.original?.refenceOrderID ? <div className="text-[#707070] text-sm font-normal">Ref.#{row?.original?.refenceOrderID} </div> : ''}
                            </div>
                        </div>
                    </>
                ) : (
                    ""
                );
            },
        },
        {
            id: "date",
            Header: "date",
            accessor: "orderDate",
            column_name: "date",
            Cell: ({ value, row }) => {
                if (row?.colorImage) {
                    return (
                        <Image src={row?.colorImage} className="w-40" containerHeight={"h-24"} alt="IMG" />
                    );
                }
                return value ? (
                    <>
                        <div >{DateTimeFormat(value).date} </div>
                        <div className="text-[#707070] text-xs font-normal">
                            {format(new Date(value), "hh:mm a")}
                        </div>
                    </>
                ) :
                    <div className='w-14 h-14 shrink-0 mr-2 sm:mr-3'>
                        <img className="max-w-20 max-h-20" src={AdminAppConfigReducers["azure:BlobUrl"] + row.original.colorImage} alt="" />
                    </div>
            },
        },
        {
            id: "customerName",
            Header: "Customer Name / Zipcode",
            accessor: "customerName",
            column_name: "customerName",
            Cell: ({ value, row }) => {
                if (row?.original) {
                    return value ? (
                        <>
                            <div className="text-indigo-500 cursor-pointer">
                                {/* {value ? value : "-"} */}
                                <NavLink
                                    to={
                                        "/admin/Customer/customer/edit/" +
                                        row.original.customerId
                                    }
                                >
                                    <div className="font-semibold">{value}</div>
                                </NavLink>
                            </div>
                            <div className="mb-2 last:mb-0">
                                {row?.original?.customerShippingAddress1 ? row?.original?.customerShippingAddress1 + ', ' : ''}
                                {row?.original?.customerShippingAddress2 ? <>{row?.original?.customerShippingAddress2 + ", "} < br /></> : ''}
                                {row?.original?.customerShippingCity ? row?.original?.customerShippingCity + ", " : ''}
                                {row?.original?.customerShippingState ? <>{row?.original?.customerShippingState + ", "} < br /> </> : ''}
                                {row?.original?.customerShippingCountry ? row?.original?.customerShippingCountry + ", " : ''}
                                {row?.original?.customerShippingZipcode ? row?.original?.customerShippingZipcode : ''}
                            </div>
                        </>
                    ) :
                        <>{row.original.productDetails}</>
                } else {
                    return (
                        <>
                            <div className="">{row?.original?.productName}</div>
                            <div className="text-[#707070] text-sm font-normal">Ref. Order$: {row?.original?.refenceOrderID}</div>
                            <div className="text-[#707070] text-sm font-normal">Color: {row?.original?.attributeOptionValue} </div>
                            <div className="text-[#707070] text-sm font-normal">SKU: {row?.original?.sku} </div>
                            <div className="text-[#707070] text-sm font-normal">Quantity: 2 </div>
                        </>
                    );
                }

            },
        },
        // {
        //     id: "customerTotalOrder",
        //     Header: "",
        //     accessor: "customerTotalOrder",
        //     column_name: "customerTotalOrder",
        //     disableSortBy: true,
        //     Cell: ({ value }) => {
        //         if (!value) {
        //             return "";
        //         } else {
        //             return <div class=""><a href={undefined} class="text-indigo-500" data-modal-toggle="customerModal">Total {value} Orders</a></div>;
        //         }
        //     },
        // },
        {
            id: "total",
            Header: `total (${CurrencySymbolByCode.USD})`,
            accessor: "orderTotal",
            column_name: "total",
            Cell: ({ value }) => {
                if (!value) {
                    return "";
                } else {
                    return value;
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
                    return (
                        <span className='capitalize'>{value}</span>
                    );
                }
            },
        },
        {
            id: "paymentStatus",
            Header: "Payment Status",
            accessor: "paymentStatus",
            column_name: "paymentStatus",
            Cell: ({ value, row }) => {
                if (value) {
                    return value === 'paid' ? <Status type={value} className="border-green-300 bg-green-100 text-green-600" /> : <Status type={value} className="border-yellow-300 bg-yellow-100 text-yellow-600" />;
                } else {
                    return "-";
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
                        <div className='text-center'>
                            <Status type={value} />
                            <span className="text-indigo-500 block">{row?.original?.shippingTackingNumber}</span>
                        </div>
                    );
                }
            },
        },
        {
            id: "totalItems",
            Header: "Items",
            accessor: "totalItems",
            column_name: "totalItems",
            Cell: ({ value }) => {
                if (!value) {
                    return "-";
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
                if (!value) {
                    return "";
                } else {
                    return <span className='capitalize '>{value}</span>;
                }
            },
        },
    ];

    const columnForVarientProducts = [
        {
            id: "product Image",
            Header: "product Image",
            accessor: "colorImage",
            column_name: "product Image",
            isVisible: false,
            disableShowHide: true,
            disableSortBy: true,
            Cell: ({ value, row }) => {
                return value && value !== "" ? (
                    <>
                        <div className="h-16 w-16 flex items-center justify-center overflow-hidden  box-content border bg-white">
                            {/* <Link to={`/admin/master/master/edit/${row.original.id}`} > */}
                            <Image className="max-h-full" src={value} containerHeight={""} />
                            {/* </Link> */}
                        </div>
                    </>
                ) :
                    <div className="h-16 w-16 flex items-center justify-center overflow-hidden  box-content border bg-white">
                        <Image className="max-h-full" src={defaultImage} containerHeight={""} />
                    </div>
            },
        },
        {
            id: "name",
            Header: "Product Name",
            accessor: "productName",
            column_name: "name",
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
            Header: "Price",
            accessor: "price",
            column_name: "price",
            disableShowHide: true,
            disableSortBy: true,
            Cell: ({ value }) => {
                return value ? `$${value}` : "";
            },
        },
        {
            id: "totalAmount",
            Header: "Total Amount",
            accessor: "subTotal",
            column_name: "totalAmount",
            disableShowHide: true,
            disableSortBy: true,
            Cell: ({ value }) => {
                return value ? `$${value}` : "";
            },
        },
        {
            id: "items",
            Header: "Items",
            accessor: "qty",
            column_name: "items",
            disableShowHide: true,
            disableSortBy: true,
            Cell: ({ value }) => {
                return value ? value : "";
            },
        },
        {
            id: "fulfillment Status",
            Header: "Fulfillment Status",
            accessor: "fulfillmentStatus",
            column_name: "fulfillment Status",
            disableShowHide: true,
            disableSortBy: true,
            Cell: ({ value }) => {
                if (!value) {
                    return "-";
                } else {
                    return value;
                }
            },
        },
    ];

    return (
        <>
            <h2 className="text-2xl text-gray-800 font-bold my-6">{PageName}</h2>
            <ReactTable
                COLUMNS={COLUMNS}
                DATA={Data}
                {...paginationData}
                setTablePageSize={(value) =>
                    setPaginationDataFunc("pageSize", value)
                }
                sortingOptions={sortingOptions}
                setSortingOptions={setSortingOptionHandler}
                handleSort={handleSort}
                // column filters
                //   editColumnFilter={true}
                filteringOptions={filteringOptions}
                fetchData={getAllData}
                setColumnFilteringOptions={setColumnFilteringOptions}
                // moreFilterOption={[
                //     {
                //         name: "Payment Status",
                //         options: paymentStatus,
                //         columnName: "paymentStatus",
                //         type: "checkbox",
                //     },
                // ]}
                setSelectedRows={setSelectedRows}
                expandedRows={useMemo(() => true, [])}
                selectedRows={selectedRows}
                savedButton={true}
                buttonText={'Saved'}
                hiddenColumns={useMemo(() => ['rowSelection'], [])}
                // setInitialColumnFilterOrder={setInitialColumnFilterOrder}
                // extraFilter={[{ Component: ActionButton, saveFilterOptionsHandler }]}
                tablePadding={true}
            />
            {/* <General
                setCustomerOrderModal={setCustomerOrderModal}
                CustomerOrderModal={CustomerOrderModal}
            /> */}

            <VarientProductModal
                title={`Ordered Products`}
                openModal={openVarientModal}
                setOpenModal={setOpenVarientModal}
                COLUMNS={columnForVarientProducts}
                DATA={dataForVarientProducts}
                setdataForVarientProducts={setdataForVarientProducts}
            />
        </>
    );
};

export default Orders;
