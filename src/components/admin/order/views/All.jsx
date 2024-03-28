/*Component Name: All
Component Functional Details: User can create or update All master details from here.
Created By: Happy
Created Date: <Creation Date>
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import React, { useCallback, useEffect, useState, useMemo, useRef } from 'react';
import { CurrencySymbolByCode, paginationDetails, anniesAnnualData } from "global/Enum";
import ReactTable from 'components/common/table/ReactTableServerSide';
import { DateTimeFormat, serverError } from 'services/common/helper/Helper';
import { format } from 'date-fns';
import { NavLink, useLocation } from 'react-router-dom';
import General from '../list/customerOrderDetail/General';
import OrderService from 'services/admin/order/OrderService';
import { useDispatch, useSelector } from 'react-redux';
import { setAddLoading } from 'redux/globalLoader/GlobalLoaderAction';
import Image from "components/common/formComponent/Image";
import VariantProductModal from 'components/admin/master/common/product/create/forms/VarientProductModal';
import GeneralStatus from 'components/common/displayStatus/General';
import CheckBox from 'components/common/table/CheckBox';
import History from '../list/History';
import StoreBuilderService from 'services/admin/storeBuilder/StoreBuilderService';
import CountryService from 'services/admin/country/CountryService';
import DropdownService from 'services/common/dropdown/DropdownService';
import BasicModal from "components/common/modals/Basic";
import StoreCustomerService from "services/front/StoreCustomerService";
import { ValidationMsgs } from 'global/ValidationMessages';
import CustomerService from 'services/admin/customer/CustomerService';
import { setAlertMessage } from 'redux/alertMessage/AlertMessageReducers';
import Actions from './Actions';
import ConfirmDelete from 'components/common/modals/ConfirmDelete';
import { setOrderStoreId } from "redux/tempData/tempDataAction";

const All = ({ filterData, setDisplayTabs, tab, setNavSyncRows, setShowListMessage, statusList }) => {

    const dispatch = useDispatch();
    const location = useSelector(store => store.location);
    const permission = useSelector(store => store?.permission)

    const [Data, setData] = useState([]);
    const [CustomerOrderModal, setCustomerOrderModal] = useState({ state: false, fromWhereItIsClicked: "", currenttab: 0 });
    const [historyModal, setHistoryModal] = useState(false);
    const [, setInitialColumnFilterOrder] = useState([]);
    const [filteringOptions, setColumnFilteringOptions] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [paginationData, setPaginationData] = useState({ ...paginationDetails });
    const [orderDetails, setOrderDetails] = useState({});
    const [productItemData, setProductItemData] = useState([]);
    const [openItemModal, setOpenItemModal] = useState({ orderNumber: null, refNo: '', toShow: false });
    const [orderStatusOptions, setOrderStatusOptions] = useState([]);
    const [paymentStatusOptions, setPaymentStatusOptions] = useState([]);
    const [fulfillmentStatusOptions, setFulfillmentStatusOptions] = useState([]);
    const [salesPersonOption, setsalesPersonOption] = useState([]);
    const [country, setCountry] = useState([]);
    const [CouponCodes, setCouponCodes] = useState([]);
    const [PaymentMethods, setPaymentMethods] = useState([]);
    const [openBasicModal, setOpenBasicModal] = useState(false);
    const [customerData, setCustomerData] = useState({});
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [DelOrderData, setDelOrderData] = useState(null);
    let AllStoresId = useRef([anniesAnnualData.storeId])

    let storeId = [anniesAnnualData.storeId]

    useEffect(() => {
        setShowListMessage(!CustomerOrderModal.state);
    }, [CustomerOrderModal.state]);

    useEffect(() => {
        setNavSyncRows(() => {
            return selectedRows.filter(value => (!value?.original?.isNavImport && ['CAPTURED', 'Pending', 'AUTHORIZE'].includes(value?.original?.paymentStatus) && !['Void', 'Cancelled', 'Shipped', 'Fraud'].includes(value?.original?.orderStatus))).map(value => value?.original?.id);
        });
    }, [selectedRows]);

    const getProductItems = (order) => {
        dispatch(setAddLoading(true));
        OrderService.OrderedShoppingCartItems({
            pageSearchArgs: {
                pageIndex: 0,
                pageSize: 0,
                pagingStrategy: 0,
                filteringOptions: [{
                    field: 'isItemCancel',
                    operator: 1,
                    value: false
                }]
            },
            orderId: order?.id
        }).then((response) => {
            if (response?.data?.data?.items) {
                setProductItemData(response.data.data.items);
                setOpenItemModal((prevData) => ({
                    toShow: true,
                    refNo: order?.refenceOrderID,//this referenceOrderID spelling mistake from API side
                    orderNumber: order?.orderNumber
                }))
            }
            dispatch(setAddLoading(false));
        }).catch(() => {
            dispatch(setAddLoading(false));
        });
    }

    const setPaginationDataFunc = (key, value) => {
        setPaginationData((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    const [sortingOptions, setSortingOptions] = useState([
        {
            field: "orderDate",
            direction: 1,
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

    const getAllData = useCallback((pageIndex = 1) => {

        if (storeId && storeId.length > 0) {
            dispatch(setAddLoading(true));

            let focousEmptyButton = document.getElementById("focousEmptyButton");
            if (focousEmptyButton) {
                focousEmptyButton.focus();
            }

            OrderService.getOrders({
                pageSearchArgs: {
                    pageSize: paginationData.pageSize,
                    pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
                    sortingOptions,
                    filteringOptions: [...filterData, ...filteringOptions],
                },
                storeID: [5],
                customerId: 0,
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
                setDisplayTabs((prev) => {
                    return prev.map((value, index) => {
                        return { ...value, recordCount: (value.id === tab?.id ? response?.data?.data?.totalCount : value?.recordCount) }
                    })
                });
                dispatch(setAddLoading(false));
            }).catch(() => {
                dispatch(setAddLoading(false));
            })
        }
    }, [filteringOptions, paginationData.pageSize, sortingOptions, filterData, AllStoresId.current, tab]);

    useEffect(() => {
        if (storeId && storeId?.length > 0) {
            getAllData();
        } else {
            setData([]);
            setDisplayTabs((prev) => {
                return prev.map((value, index) => {
                    return { ...value, recordCount: value.id === tab?.id ? 0 : 0 };
                });
            });
            setPaginationData((prevState) => ({
                ...prevState,
                totalCount: 0,
            }));
        }
    }, []);

    const getMoreFilterOptions = () => {
        OrderService.getMoreFilterOptions({
            storeId: 0
        }).then((response) => {
            if (response?.data?.success && response?.data?.data) {
                setOrderStatusOptions(() => {
                    return response.data.data.status.map((value) => {
                        return {
                            label: value?.name,
                            value: value?.name
                        }
                    });
                });
                setPaymentStatusOptions(() => {
                    return response.data.data.paymentStatus.map((value) => {
                        return {
                            label: value?.name,
                            value: value?.name
                        }
                    });
                });
                setFulfillmentStatusOptions(() => {
                    return response.data.data.fulfillmentStatus.map((value) => {
                        return {
                            label: value?.name,
                            value: value?.name
                        }
                    });
                });
            }
        })
    };

    const getSalesPersonOptions = (storeId) => {
        if (storeId && storeId.length > 0) {
            StoreBuilderService.getSalesPersonWithMultipleStore({
                storeId: storeId.filter((value, index, self) => self.indexOf(value) === index),
            }).then((res) => {
                if (res?.data?.data && res?.data?.success) {
                    setsalesPersonOption(res.data.data);
                }
            }).catch((err) => { });
        }
    };

    const handleConfirmationResetPassword = () => {
        dispatch(setAddLoading(true));
        StoreCustomerService.sendResetPasswordLink(orderDetails?.storeId, customerData?.email).then((response) => {
            if (response?.data?.data?.issend) {
                dispatch(setAlertMessage({
                    message: ValidationMsgs.customer.resetPasswordLink,
                    type: 'success'
                }));

            } else {
                dispatch(setAlertMessage({
                    message: ValidationMsgs.customer.resetPasswordLinkNotSend,
                    type: 'danger'
                }));
            }
            dispatch(setAddLoading(false));
            setOpenBasicModal(false)
        }).catch(() => {
            dispatch(setAddLoading(false));
            setOpenBasicModal(false)

        })
    }

    const getCustomerData = useCallback(() => {
        dispatch(setAddLoading(true));
        CustomerService.getCustomerById(orderDetails?.customerId).then((response) => {
            if (response.data.data) {
                setCustomerData(response.data.data);
            } else {
                dispatch(
                    setAlertMessage({
                        message: ValidationMsgs.customer.customerNotFound,
                        type: "danger",
                    })
                );
            }
            dispatch(setAddLoading(false));
        }).catch((error) => {
            dispatch(setAddLoading(false));
        });
    }, [orderDetails]);

    useEffect(() => {
        if (orderDetails?.orderNumber) {
            getCustomerData();
        }
    }, [orderDetails])


    const getCountry = () => {
        CountryService.getCountryWithCode().then((response) => {
            if (response?.data?.success && response?.data?.data) {
                setCountry(() => {
                    return response?.data?.data?.map(value => {
                        return {
                            ...value,
                            label: value.name,
                            value: value.name,
                            countryCode: value.countryCode,
                        }
                    })
                });
            }
        }).catch(() => { });
    }

    useEffect(() => {
        getMoreFilterOptions();
    }, []);

    const getCouponCodeDropdownData = useCallback(() => {
        DropdownService.getDropdownValues("promotion").then((res) => {
            if (res.data.success && res.data.data) {
                setCouponCodes(() => {
                    return res.data.data;
                });
            }
        });
    }, []);

    const getPaymentMethodDropdownData = useCallback(() => {
        DropdownService.getDropdownValues("paymentoptions").then((res) => {
            if (res.data.success && res.data.data) {
                setPaymentMethods(() => {
                    return res.data.data;
                });
            }
        });
    }, []);

    useEffect(() => {
        getPaymentMethodDropdownData();
        getCouponCodeDropdownData();
    }, [getCouponCodeDropdownData, getPaymentMethodDropdownData]);

    useEffect(() => {
        getSalesPersonOptions(AllStoresId.current);
    }, [AllStoresId.current]);

    useEffect(() => {
        getCountry();
    }, []);

    const COLUMNS = [
        {
            id: "id",
            disableShowHide: true,
            Header: ({ getToggleAllRowsSelectedProps }) => {
                return (
                    <div className="flex items-center relative">
                        <span className={`inline-flex leading-none w-4 h-4`}>
                            <CheckBox {...getToggleAllRowsSelectedProps()} />
                        </span>
                    </div>
                );
            },
            accessor: "id",
            column_name: "id",
            disableSortBy: true,
            Cell: ({ value, row }) => {
                return (!row?.original?.isNavImport && ['CAPTURED', 'Pending', 'AUTHORIZE'].includes(row?.original?.paymentStatus) && !['Void', 'Cancelled', 'Shipped', 'Fraud'].includes(row?.original?.orderStatus)) && <CheckBox {...row.getToggleRowSelectedProps()} />
            }
        },
        {
            id: "expander",
            accessor: "a",
            Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
                ""
            ),
            Cell: ({ row }) => {
                return <span title="Show Sub Product" className="material-icons-outlined select-none leading-none ml-2 w-6 h-6 cursor-pointer transition-all variant-arrow" onClick={() => {
                    getProductItems(row?.original);
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
            accessor: "orderStatus",
            column_name: "orderStatus",
            isVisible: false,
            disableShowHide: true,
            Cell: ({ value, row }) => {
                let CheckValue = row?.original?.orderStatus.toLowerCase();
                return (
                    <>
                        <div className="text-sm mt-1 flex flex-col">

                            {/* {(CheckValue === OrderStatusForListPage.Export || CheckValue === OrderStatusForListPage.Exported) ? <div className="text-green-500">Exported</div> : (CheckValue === OrderStatusForListPage.Pending || CheckValue === OrderStatusForListPage.PendingStr) ? <div className="text-indigo-500">Pending</div> : <div className="text-black-500">Error</div>} */}

                            {/* <Status type={row?.original?.orderStatus} className="border-white a bg-white" /> */}
                            {value ? <GeneralStatus type={row?.original?.orderStatus} style={{ backgroundColor: `${statusList?.['orderstatus']?.[row?.original?.orderStatus?.toLowerCase()]?.color}`, color: `${statusList?.['orderstatus']?.[row?.original?.orderStatus?.toLowerCase()]?.textColor}` }} /> : ''}
                            {(CheckValue.toLowerCase() === "p" || CheckValue.toLowerCase() === "pending") ? "" :
                                <>
                                    {value === 1 && <span className="text-indigo-500 cursor-pointer" onClick={() => {
                                        setHistoryModal(true);
                                        setOrderDetails(row?.original);
                                    }}>History</span>}
                                </>
                            }
                        </div>
                    </>
                );
            },
        },
        {
            id: "orderNumber",
            Header: "order",
            accessor: "orderNumber",
            column_name: "orderNumber",
            Cell: ({ value, row }) => {
                return row ? (
                    <>
                        <div className="w-full flex justify-start items-center group ">
                            <div >
                                <NavLink
                                    to={
                                        `/admin/Order/orders/edit/${row?.original?.id}`
                                    }
                                    className="font-medium text-indigo-500"
                                    onClick={() => {
                                        if (row?.original?.storeId) {
                                            dispatch(setOrderStoreId(row?.original?.storeId))
                                        }
                                    }}
                                >
                                    <div className="text-xl text-green-600 font-bold ">
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
            id: "orderDate",
            Header: "date",
            accessor: "orderDate",
            column_name: "orderDate",
            Cell: ({ value }) => {
                return <>
                    <div >{DateTimeFormat(value).date} </div>
                    <div className="text-[#707070] text-xs font-normal">
                        {format(new Date(value), "hh:mm a")}
                    </div>
                </>
            },
        },
        {
            id: "customerName",
            Header: "Customer Name / Zipcode",
            accessor: "customerName",
            column_name: "customerName",
            Cell: ({ value, row }) => {
                return <div className='w-[300px]'>
                    <div className="mb-2 last:mb-0 flex items-center justify-between cursor-pointer text-indigo-500">
                        <div className=""><span className="text-indigo-500" onClick={() => {
                            setCustomerOrderModal({
                                state: true,
                                fromWhereItIsClicked: "userName",
                                currenttab: 0
                            });
                            setOrderDetails(row?.original);
                        }}>  {(value) ? value : ""}</span></div>
                        <div className=""><span className="text-indigo-500" onClick={() => {
                            setCustomerOrderModal({
                                state: true,
                                fromWhereItIsClicked: "userName",
                                currenttab: 2
                            });
                            setOrderDetails(row?.original);
                        }}>Total {row?.original?.totalOrderNo || 0} Order</span></div>
                    </div>
                    <div className="mb-2 last:mb-0">
                        {row?.original?.customerShippingAddress1 ? <>{row?.original?.customerShippingAddress1 + ","} < br /></> : ''}
                        {row?.original?.customerShippingAddress2 !== " " && row?.original?.customerShippingAddress2 !== "" ? <>{row?.original?.customerShippingAddress2 + ", "} < br /></> : ''}
                        {row?.original?.customerShippingCity ? row?.original?.customerShippingCity + ", " : ''}
                        {row?.original?.customerShippingState ? <>{row?.original?.customerShippingState + ", "}  </> : ''}
                        {row?.original?.customerShippingZipcode ? <>{row?.original?.customerShippingZipcode + ","} < br /> </> : ''}
                        {row?.original?.customerShippingCountry ? row?.original?.customerShippingCountry : ''}
                    </div>
                </div>
            },
        },
        {
            id: "orderTotal",
            Header: `total (${CurrencySymbolByCode.USD})`,
            accessor: "orderTotal",
            column_name: "orderTotal",
            Cell: ({ value }) => {
                return <div className=' text-right relative w-[100px]'>
                    <div className='absolute right-[.7vw] sm:right[.2vw] md:right[.4vw]'>
                        {
                            value ? parseFloat(value).toFixed(2) : parseFloat(0).toFixed(2)
                        }
                    </div>
                </div>

            },
        },
        {
            id: "paymentType",
            Header: "Payment Type",
            accessor: "paymentType",
            column_name: "paymentType",
            Cell: ({ value }) => {
                return value ? <GeneralStatus type={value} style={{ backgroundColor: `${statusList?.['paymenttype']?.[value?.toLowerCase()]?.color}`, color: `${statusList?.['paymenttype']?.[value?.toLowerCase()]?.textColor}` }} /> : ''
            },
        },
        {
            id: "paymentStatus",
            Header: "Payment Status",
            accessor: "paymentStatus",
            column_name: "paymentStatus",
            Cell: ({ value }) => {
                if (value) {
                    return value ? <GeneralStatus type={value} style={{ backgroundColor: `${statusList?.['paymentstatus']?.[value?.toLowerCase()]?.color}`, color: `${statusList?.['paymentstatus']?.[value?.toLowerCase()]?.textColor}` }} /> : ''

                };
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
                            {value ? <GeneralStatus type={value} style={{ backgroundColor: `${statusList?.['fulfillmentstatus']?.[value?.toLowerCase()]?.color}`, color: `${statusList?.['fulfillmentstatus']?.[value?.toLowerCase()]?.textColor}` }} /> : ''}
                            <span className="text-indigo-500 block" >{row?.original?.shippingTackingNumber}</span>
                        </>
                    );
                }
            },
        },
        {
            id: "totalItems",
            Header: "Items",
            accessor: "totalItems",
            column_name: "totalItems",
        },
        {
            id: "deliveryMethod",
            Header: "Shipping Method",
            accessor: "deliveryMethod",
            column_name: "deliveryMethod",
            Cell: ({ value }) => {
                return value ? <GeneralStatus type={value} style={{ backgroundColor: `${statusList?.['deliverymethod']?.[value?.toLowerCase()]?.color}`, color: `${statusList?.['deliverymethod']?.[value?.toLowerCase()]?.textColor}` }} /> : ''
            },
        },
        {
            id: "action",
            Header: "",
            accessor: "id",
            column_name: "action",
            Cell: ({ value, row }) => {
                return row.original.orderStatus === "Cancelled" && permission?.isDelete ? (
                    <Actions
                        id={value}
                        row={row}
                        setDelOrderData={setDelOrderData}
                        setOpenDeleteModal={setOpenDeleteModal}
                    // setModalInfo={setModalInfo}
                    // setOpenBasicModal={setOpenBasicModal}
                    />
                )
                    : (
                        ""
                    )
            },
            disableSortBy: true,
            disableShowHide: true,
        },
    ];
    const ProductItemCOLUMNS = [
        {
            id: "productName",
            Header: "Product Name",
            accessor: "productName",
            column_name: "customerName_Zipcode",
            Cell: ({ value, row }) => {
                return (
                    <>
                        <div className='flex'>
                            <div className="h-14 w-14 flex items-center justify-center overflow-hidden  box-content border bg-white">
                                <Image src={row?.original?.colorImage} containerHeight={""} className="max-h-full" />
                            </div>

                            <div className='ml-7'>
                                <div className="">{value}</div>
                                {row?.original?.refenceOrderID &&
                                    <div className="text-[#707070] text-sm font-normal">Ref. Order #: {row?.original?.refenceOrderID}</div>
                                }
                                {row?.original?.attributeOptionValue &&
                                    <div className="text-[#707070] text-sm font-normal">Color: {row?.original?.attributeOptionValue} </div>
                                }
                                {row?.original?.sku &&
                                    <div className="text-[#707070] text-sm font-normal">SKU: {row?.original?.sku} </div>
                                }
                                {row?.original?.qty &&
                                    <div className="text-[#707070] text-sm font-normal">Quantity: {row?.original?.qty}</div>
                                }
                            </div>
                        </div>
                    </>
                );
            },
            disableSortBy: true
        },
        {
            id: "isPreOrder",
            Header: "Pre Order",
            accessor: "isPreOrder",
            column_name: "isPreOrder",
            Cell: ({ value }) => {
                return (
                    <>
                    {value &&
                        <div className='border uppercase text-xs inline-block font-medium rounded-md text-center px-2.5 py-1 border-orange-300 bg-orange-100 text-orange-600'>
                             Pre Order
                        </div>
                    }
                    </>
                );
            },
            disableSortBy: true
        },
        {
            id: "price",
            Header: "Price",
            accessor: "price",
            column_name: "price",
            Cell: ({ value }) => {
                return (
                    <>
                        <div className="">${value ? parseFloat(value).toFixed(2) : parseFloat(0).toFixed(2)}</div>
                    </>
                );
            },
            disableSortBy: true
        },
        {
            id: "subTotal",
            Header: "Total Price",
            accessor: "subTotal",
            column_name: "subTotal",
            Cell: ({ value }) => {
                return (
                    <>
                        <div className="">${value ? parseFloat(value).toFixed(2) : parseFloat(0).toFixed(2)}</div>
                    </>
                );
            },
            disableSortBy: true
        },
        {
            id: "isItemCancel",
            Header: "Status",
            accessor: "isItemCancel",
            column_name: "isItemCancel",
            Cell: ({ value }) => {
                return (
                    <>
                        {value ? <GeneralStatus type={'Cancel'} className="bg-red-100 text-red-600 rounded-md text-center px-2.5 py-1 w-28" /> : <GeneralStatus type={'Active'} className="border-green-300 bg-green-100 text-green-600 rounded-md text-center px-2.5 py-1 w-28" />}
                    </>
                );
            },
            disableSortBy: true
        },
    ];

    const handleDelete = (DelOrderData) => {
        dispatch(setAddLoading(true));
        OrderService.updateOrderStatus({
            orderId: DelOrderData.orderNumber,
            orderStatus: DelOrderData.changeStatus,
            ...location
        }).then((response) => {
            if (response?.data?.success) {
                dispatch(setAlertMessage({
                    message: ValidationMsgs.order.Deleted,
                    type: 'success'
                }));
            } else {
                dispatch(
                    setAlertMessage({ type: "danger", message: serverError(response) })
                );
            }
            getAllData();
            dispatch(setAddLoading(false));
        }).catch(() => {
            dispatch(setAddLoading(false));
            dispatch(setAlertMessage({
                message: ValidationMsgs.order.DeletedNot,
                type: 'danger'
            }));
        })
        setOpenDeleteModal(false);
    };
    const handleSort = (sortValue) => { };
    const { pathname } = useLocation();
    return (
        <>
            <ReactTable
                COLUMNS={COLUMNS}
                DATA={Data}
                {...paginationData}
                setTablePageSize={(value) =>
                    setPaginationDataFunc("pageSize", value)
                }
                fetchData={getAllData}
                sortingOptions={sortingOptions}
                setSortingOptions={setSortingOptionHandler}
                handleSort={handleSort}
                // column filters
                editColumnFilter={true}
                filteringOptions={filteringOptions}
                setColumnFilteringOptions={setColumnFilteringOptions}
                moreFilterOption={[
                    {
                        name: "Order Status",
                        options: orderStatusOptions,
                        columnName: "orderStatus",
                        type: "checkbox",
                    },
                    {
                        name: "Payment / Transaction Status",
                        options: paymentStatusOptions,
                        columnName: "paymentStatus",
                        type: "checkbox",
                    },
                    {
                        name: "Fulfillment Status",
                        options: fulfillmentStatusOptions,
                        columnName: "fulfillmentStatus",
                        type: "checkbox",
                    },
                    {
                        name: "Order Date",
                        columnName: "orderDate",
                        options: [],
                        type: "date",
                    },
                    {
                        name: "Tag",
                        columnName: "tags",
                        type: "custom_component",
                        Component: MoreFilterTagSearch
                    },
                    {
                        name: "Payment Method",
                        options: PaymentMethods,
                        columnName: "paymentmethod",
                        type: "checkbox",
                    },
                    {
                        name: "Country",
                        options: country,
                        columnName: "country",
                        type: "checkbox",
                    },
                    {
                        name: "State",
                        columnName: "state",
                        type: "custom_component",
                        Component: MoreFilterStateSearch
                    },
                    {
                        name: "Ref. Order Number",
                        columnName: "refenceOrderID",
                        type: "custom_component",
                        Component: MoreFilterOrderNumberSearch
                    },
                    {
                        name: "Zip Code",
                        columnName: "zipcode",
                        type: "custom_component",
                        Component: MoreFilterZipCodeSearch
                    },
                    {
                        name: "Company Name",
                        columnName: "company",
                        type: "custom_component",
                        Component: MoreFilterCompanyNameSearch
                    },
                    {
                        name: "Customer Email",
                        columnName: "email",
                        type: "custom_component",
                        Component: MoreFilterCustomerIdSearch
                    },
                    {
                        name: "Customer Id",
                        columnName: "customerId",
                        type: "custom_component",
                        Component: MoreFilterCustomerIdSearch
                    },
                    {
                        name: "Product Name",
                        columnName: "productname",
                        type: "custom_component",
                        Component: MoreFilterProductNameSearch
                    },
                    {
                        name: "SKU",
                        columnName: "sku",
                        type: "custom_component",
                        Component: MoreFilterSKUSearch
                    },
                    {
                        name: "Sales Agent",
                        options: salesPersonOption,
                        columnName: "salesagent",
                        type: "checkbox",
                    },
                    {
                        name: "Coupon Code",
                        options: CouponCodes,
                        columnName: "couponcode",
                        type: "checkbox",
                    },
                ]}
                // expandedRows={useMemo(() => false, [])}
                setSelectedRows={setSelectedRows}
                selectedRows={selectedRows}
                hiddenColumns={useMemo(() => ["rowSelection"], [])}
                setInitialColumnFilterOrder={setInitialColumnFilterOrder}
                saveFilter={{ show: true, tabName: pathname + '_' + tab?.value }}
            />

            {CustomerOrderModal.state && <General
                setCustomerOrderModal={setCustomerOrderModal}
                CustomerOrderModal={CustomerOrderModal}
                orderDetails={orderDetails}
                from={"order"}
                customerId={orderDetails?.customerId ? orderDetails?.customerId : 0}
                setOpenBasicModal={setOpenBasicModal}
                customerData={customerData}
            />}

            <BasicModal
                openModal={openBasicModal}
                setOpenModal={setOpenBasicModal}
                handleConfirmation={handleConfirmationResetPassword}
                title={"Reset Password"}
                message={'Are you sure you want to Reset Password?'}
                ButtonName={'Yes'}
            />

            <VariantProductModal
                title={`Order Products ${openItemModal?.orderNumber ? '-' + ' #' + openItemModal?.orderNumber : ''} ${openItemModal?.refNo ? '(Ref.#' + openItemModal?.refNo + ')' : ''}`}
                openModal={openItemModal}
                setOpenModal={setOpenItemModal}
                COLUMNS={ProductItemCOLUMNS}
                DATA={productItemData}
                setdataForVarientProducts={setProductItemData}
            />

            <ConfirmDelete
                handleDelete={handleDelete}
                data={DelOrderData}
                message={"Deleting Order will permanently remove this record from your account. This can't be undone."}
                title={"Delete"}
                openDeleteModal={openDeleteModal}
                setOpenDeleteModal={setOpenDeleteModal}
            />

            {historyModal && <History setHistoryModal={setHistoryModal} orderDetails={orderDetails} />}
        </>
    );
};

export default React.memo(All);

const MoreFilterTagSearch = ({
    name,
    type,
    mainFilter,
    columnName = name.toLowerCase().replaceAll(' ', "_"),
    setmainColumnFilter,
    clearSubFilter,
}) => {
    const [tag, setTag] = useState('');
    useEffect(() => {
        setTag(() => {
            var temp = mainFilter.filter((value) => {
                return value.field === columnName
            });
            if (temp.length > 0) {
                return temp[0].value;
            } else {
                return "";
            }
        });
    }, [mainFilter, columnName]);
    return (
        <>
            <input type="text" value={tag} onChange={(e) => {
                setmainColumnFilter({
                    field: columnName,
                    operator: 0,
                    value: e.target.value,
                });
            }} maxLength={255} className={`block w-64 bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md m-5`} />
        </>
    )
}

const MoreFilterStateSearch = ({
    name,
    type,
    mainFilter,
    columnName = name.toLowerCase().replaceAll(' ', "_"),
    setmainColumnFilter,
    clearSubFilter,
}) => {
    const [tag, setTag] = useState('');
    useEffect(() => {
        setTag(() => {
            var temp = mainFilter.filter((value) => {
                return value.field === columnName
            });
            if (temp.length > 0) {
                return temp[0].value;
            } else {
                return "";
            }
        });
    }, [mainFilter, columnName]);
    return (
        <>
            <input type="text" value={tag} onChange={(e) => {
                setmainColumnFilter({
                    field: columnName,
                    operator: 0,
                    value: e.target.value,
                });
            }} maxLength={255} className={`block w-64 bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md m-5`} />
        </>
    )
}

const MoreFilterOrderNumberSearch = ({
    name,
    type,
    mainFilter,
    columnName = name.toLowerCase().replaceAll(' ', "_"),
    setmainColumnFilter,
    clearSubFilter,
}) => {
    const [tag, setTag] = useState('');
    useEffect(() => {
        setTag(() => {
            var temp = mainFilter.filter((value) => {
                return value.field === columnName
            });
            if (temp.length > 0) {
                return temp[0].value;
            } else {
                return "";
            }
        });
    }, [mainFilter, columnName]);
    return (
        <>
            <input type="text" value={tag} onChange={(e) => {
                setmainColumnFilter({
                    field: columnName,
                    operator: 0,
                    value: e.target.value,
                });
            }} maxLength={255} className={`block w-64 bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md m-5`} />
        </>
    )
}

const MoreFilterCustomerIdSearch = ({
    name,
    type,
    mainFilter,
    columnName = name.toLowerCase().replaceAll(' ', "_"),
    setmainColumnFilter,
    clearSubFilter,
}) => {
    const [tag, setTag] = useState('');
    useEffect(() => {
        setTag(() => {
            var temp = mainFilter.filter((value) => {
                return value.field === columnName
            });
            if (temp.length > 0) {
                return temp[0].value;
            } else {
                return "";
            }
        });
    }, [mainFilter, columnName]);
    return (
        <>
            <input type="text" value={tag} onChange={(e) => {
                setmainColumnFilter({
                    field: columnName,
                    operator: 0,
                    value: e.target.value,
                });
            }} maxLength={255} className={`block w-64 bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md m-5`} />
        </>
    )
}

const MoreFilterCompanyNameSearch = ({
    name,
    type,
    mainFilter,
    columnName = name.toLowerCase().replaceAll(' ', "_"),
    setmainColumnFilter,
    clearSubFilter,
}) => {
    const [tag, setTag] = useState('');
    useEffect(() => {
        setTag(() => {
            var temp = mainFilter.filter((value) => {
                return value.field === columnName
            });
            if (temp.length > 0) {
                return temp[0].value;
            } else {
                return "";
            }
        });
    }, [mainFilter, columnName]);
    return (
        <>
            <input type="text" value={tag} onChange={(e) => {
                setmainColumnFilter({
                    field: columnName,
                    operator: 0,
                    value: e.target.value,
                });
            }} maxLength={255} className={`block w-64 bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md m-5`} />
        </>
    )
}

const MoreFilterProductNameSearch = ({
    name,
    type,
    mainFilter,
    columnName = name.toLowerCase().replaceAll(' ', "_"),
    setmainColumnFilter,
    clearSubFilter,
}) => {
    const [tag, setTag] = useState('');
    useEffect(() => {
        setTag(() => {
            var temp = mainFilter.filter((value) => {
                return value.field === columnName
            });
            if (temp.length > 0) {
                return temp[0].value;
            } else {
                return "";
            }
        });
    }, [mainFilter, columnName]);
    return (
        <>
            <input type="text" value={tag} onChange={(e) => {
                setmainColumnFilter({
                    field: columnName,
                    operator: 0,
                    value: e.target.value,
                });
            }} maxLength={255} className={`block w-64 bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md m-5`} />
        </>
    )
}

const MoreFilterSKUSearch = ({
    name,
    type,
    mainFilter,
    columnName = name.toLowerCase().replaceAll(' ', "_"),
    setmainColumnFilter,
    clearSubFilter,
}) => {
    const [tag, setTag] = useState('');
    useEffect(() => {
        setTag(() => {
            var temp = mainFilter.filter((value) => {
                return value.field === columnName
            });
            if (temp.length > 0) {
                return temp[0].value;
            } else {
                return "";
            }
        });
    }, [mainFilter, columnName]);
    return (
        <>
            <input type="text" value={tag} onChange={(e) => {
                setmainColumnFilter({
                    field: columnName,
                    operator: 0,
                    value: e.target.value,
                });
            }} maxLength={255} className={`block w-64 bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md m-5`} />
        </>
    )
}

const MoreFilterZipCodeSearch = ({
    name,
    type,
    mainFilter,
    columnName = name.toLowerCase().replaceAll(' ', "_"),
    setmainColumnFilter,
    clearSubFilter,
}) => {
    const [tag, setTag] = useState('');

    useEffect(() => {
        setTag(() => {
            var temp = mainFilter.filter((value) => {
                return value.field === columnName
            });
            if (temp.length > 0) {
                return temp[0].value;
            } else {
                return "";
            }
        });
    }, [mainFilter, columnName]);

    return (
        <>
            <input type="text" value={tag} onChange={(e) => {
                setmainColumnFilter({
                    field: columnName,
                    operator: 0,
                    value: e.target.value,
                });
            }} maxLength={255} className={`block w-64 bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md m-5`} />
        </>
    )
}

