/*Component Name: All
Component Functional Details: User can create or update All master details from here.
Created By: Happy
Created Date: <Creation Date>
Modified By: chandan
Modified Date: <Modified Date> */

import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from 'react-router-dom';

import { PageName, paginationDetails, RecStatusValuebyName, ProductStatusMoreFilterOption, defaultImage, CurrencySymbolByCode, MasterProductStatusTabs } from "global/Enum";
import { ValidationMsgs } from "global/ValidationMessages";
import { productType } from 'dummy/Dummy';

import MasterCatalogCommonService from 'services/admin/master/masterCommonService';
import ProductService from 'services/admin/master/master/products/ProductService';
import ReadinessCheckService from 'services/admin/master/store/product/ProductService';
import { DateTimeFormat, serverError, TitleNameHelper } from 'services/common/helper/Helper';

import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { setCurrentPageIndexData } from "redux/tempData/tempDataAction";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";

import VarientProductModal from 'components/admin/master/common/product/create/forms/VarientProductModal';
import ProductAttributeCloneModal from 'components/common/modals/ProductAttributeClone';
import ProductCloneModal from 'components/common/modals/ProductCloneModal';
import ReactTable from 'components/common/table/ReactTableServerSide';
import ConfirmDelete from 'components/common/modals/ConfirmDelete';
import ViewHistory from 'components/common/modals/ViewHistory';
import Status from 'components/common/displayStatus/Status';
import Actions from 'components/common/others/admin/Action';
import Image from 'components/common/formComponent/Image';
import BasicModal from 'components/common/modals/Basic';
import CheckBox from 'components/common/table/CheckBox';

import CheckBoxAction from './CheckBoxAction';

const All = ({ activeTab, selectedData, setSelectedData, setGetDataFunction, tab, moreFilterOptions, openAttributeCloneModal, setOpenAttributeCloneModal, stores }) => {
    const { pathname } = useLocation();
    const dispatch = useDispatch();

    const location = useSelector((store) => store?.location);
    const currentPageIndexFromRedux = useSelector((store) => store?.TempDataReducer?.currentPageIndexData);
    const searchQuery = useSelector((store) => store?.SearchQueryReducers);

    const [Product, setProduct] = useState(null);
    const [ProductId, setProductId] = useState(0);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openCloneModal, setOpenCloneModal] = useState(false);
    const [ModalInfo, setModalInfo] = useState({});
    const [openBasicModal, setOpenBasicModal] = useState(false);
    const [openVarientModal, setOpenVarientModal] = useState({ name: "", ourSku: "", toShow: false });
    const [viewHistoryModal, setViewHistoryModal] = useState(false);
    const [Data, setData] = useState([]);
    const [dataForVarientProducts, setdataForVarientProducts] = useState([]);
    const [RecordId, setRecordId] = useState(null);
    const [filteringOptions, setColumnFilteringOptions] = useState(tab?.filter);
    const [selectedRows, setSelectedRows] = useState([]);
    const [paginationData, setPaginationData] = useState({ ...paginationDetails });
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [ProReadinessData, setProReadinessData] = useState([])
    const [sortingOptions, setSortingOptions] = useState([{ field: "name", direction: 0, priority: 0 }]);

    // const ourRandomNum = useMemo(() => Math.random(5), [])
    const currentUrl = useMemo(() => pathname.toLowerCase(), [pathname])

    const type = productType.MC

    const setPaginationDataFunc = (key, value) => {
        setPaginationData((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    const setSortingOptionHandler = useCallback((column, direction) => {
        setSortingOptions([
            {
                field: column,
                direction: direction,
                priority: 0,
            },
        ]);
    }, [activeTab]);

    const getAllData = useCallback((pageIndex) => {
        dispatch(setAddLoading(true))
        ProductService.getMasterProductsWithoutSubrows({
            args: {
                pageSize: paginationData.pageSize,
                pageIndex: (pageIndex || searchQuery?.searchQuery) ? pageIndex : (currentPageIndexFromRedux?.url && pathname.toLowerCase().startsWith(currentPageIndexFromRedux?.url)) ? currentPageIndexFromRedux.pageNo : paginationData.pageIndex,
                sortingOptions,
                filteringOptions: [...tab?.filter, ...filteringOptions]
            },
        }).then((response) => {
            const MasterCatalog = response.data.data;
            setData(MasterCatalog?.items);
            dispatch(setCurrentPageIndexData({ pageNo: MasterCatalog?.pageIndex, url: currentUrl }));

            setPaginationData((prevState) => ({
                ...prevState,
                pageIndex: MasterCatalog?.pageIndex,
                pageSize: MasterCatalog?.pageSize,
                totalCount: MasterCatalog?.totalCount,
                totalPages: MasterCatalog?.totalPages,
                hasPreviousPage: MasterCatalog?.hasPreviousPage,
                hasNextPage: MasterCatalog?.hasNextPage,
            }));
            dispatch(setAddLoading(false))

        }).catch(() => {
            dispatch(setAddLoading(false))
        })
    }, [filteringOptions, paginationData.pageSize, sortingOptions, paginationData.pageIndex, tab, searchQuery?.searchQuery, currentPageIndexFromRedux]);

    const productDiscontinue = () => {
        if (ProductId && ProductId.length > 0) {
            dispatch(setAddLoading(true));
            ProductService.createDiscontinue({
                masterproductDiscontinueModel: {
                    id: 0,
                    rowVersion: "",
                    ...location,
                    masterProductId: ProductId,
                    productDiscontinueModel: []
                }
            }).then((response) => {
                if (response?.data?.success && response?.data?.data) {
                    dispatch(setAlertMessage({
                        type: "success",
                        message: ValidationMsgs.masterCatalog.products.ProductDiscontinuesuccessfully,
                    }))
                    getAllData();
                } else {
                    dispatch(setAlertMessage({
                        type: "danger",
                        message: serverError(response),
                    }))
                }
                dispatch(setAddLoading(false));
            }).catch((errors) => {
                dispatch(setAlertMessage({
                    type: "danger",
                    message: ValidationMsgs.masterCatalog.products.ProductDiscontinue
                }))
                dispatch(setAddLoading(false));
            })
        }
    }

    const COLUMNS = [
        {
            id: "id",
            disableShowHide: true,
            Header: ({ getToggleAllRowsSelectedProps }) => {
                return (
                    <div className="flex items-center relative">
                        <span className={`inline-flex leading-none w-4 h-4`}>
                            {!['Active', 'Inactive', 'Draft', 'Discontinued'].includes(MasterProductStatusTabs[activeTab].value) &&
                                <CheckBox {...getToggleAllRowsSelectedProps()} />
                            }
                        </span>
                        <div className={`absolute left-full bg-white input-check min-w-auto pl-1 ${selectedData.length <= 0 && "hidden"}`}                        >
                            {(MasterProductStatusTabs[activeTab].value !== 'NAVSyncPending' && MasterProductStatusTabs[activeTab].value !== 'ResyncwithNAV') && <CheckBoxAction
                                setOpenDeleteModal={setOpenDeleteModal}
                                setOpenCloneModal={setOpenCloneModal}
                                setOpenAttributeCloneModal={setOpenAttributeCloneModal}
                                selectedFlatRows={selectedData}
                                productDiscontinue={productDiscontinue}

                            />}

                        </div>
                    </div>
                );
            },
            accessor: "id",
            column_name: "id",
            disableSortBy: true,
            Cell: ({ value, row }) => {
                if ((row.original.recStatus === RecStatusValuebyName.Active) /* && (!row.original.isDiscontinue) */ && ((row.original.navSyncStatus === RecStatusValuebyName.NavSync) || MasterProductStatusTabs[activeTab].value === 'NAVSyncPending' || MasterProductStatusTabs[activeTab].value === 'ResyncwithNAV')) {
                    return (
                        <CheckBox {...row.getToggleRowSelectedProps()} />
                    )
                } else {
                    return '';
                }
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
                    getVarientDataFunc(row?.original)
                }}>
                    add
                </span>
            },
            disableShowHide: true,
            disableSortBy: true,
        },
        {
            id: "productImage",
            Header: "product Image",
            accessor: "productImage",
            column_name: "product Image",
            isVisible: false,
            disableShowHide: true,
            disableSortBy: true,
            Cell: ({ value, row }) => {
                return value && value.length > 0 ? (
                    <>
                        <div className={`flex -space-x-9 items-center`} style={{ width: "160px" }}>
                            {
                                Array.isArray(value) ? value.map((ProductMainImg, index) => {
                                    return (
                                        <Link to={`/admin/master/master/edit/${row.original.id}`} key={index}>
                                            <div className="h-14 w-14 flex items-center justify-center overflow-hidden  box-content rounded-full border bg-white">
                                                <Image src={ProductMainImg} containerHeight={""} className="max-h-full" />
                                            </div>
                                        </Link>
                                    )
                                })
                                    :
                                    <Link to={`/admin/master/master/edit/${row?.original.productId}`}>
                                        <div className='w-14 h-14 shrink-0 mr-2 sm:mr-3 bg-sky-400/10 rounded-full text-center'>
                                            <Image src={defaultImage} className="max-h-full" />
                                        </div>
                                    </Link>
                            }
                            {(row.original.subRows && row.original.subRows.length !== 0) &&
                                <div>
                                    <span className="w-14 h-14 rounded-full box-content bg-neutral-200 flex items-center justify-center text-center">+{row?.original?.subRows?.length}</span>
                                </div>
                            }
                        </div>
                    </>
                ) : (row?.original.productId ?
                    <Link to={`/admin/master/master/edit/${row?.original.productId}`}>
                        <div className="h-14 w-14 flex items-center justify-center overflow-hidden  box-content rounded-full border bg-white">
                            <Image src={value} containerHeight={""} className="max-h-full" />
                        </div>
                    </Link> :
                    <>
                        <Link to={`/admin/master/master/edit/${row?.original.id}`}>
                            <div className="h-14 w-14 flex items-center justify-center overflow-hidden  box-content rounded-full border bg-white">
                                <Image src={value} containerHeight={""} className="max-h-full" />
                            </div>
                        </Link>
                        {(row.original.subRows && row.original.subRows.length !== 0) &&
                            <div>
                                <span className="w-14 h-14 rounded-full box-content bg-neutral-200 inline-flex items-center justify-center text-center">+{row?.original?.subRows?.length}</span>
                            </div>
                        }
                    </>
                );
            },
        },
        {
            id: "name",
            Header: "Product Name",
            accessor: "name",
            column_name: "name",
            disableShowHide: true,
            Cell: ({ value, row }) => {
                return row ? (
                    <>
                        <div
                            className="w-full flex justify-start items-center group"
                            style={{ width: "200px" }}
                        >
                            <div >
                                {row.id.includes(".") ?
                                    <Link to={`/admin/master/master/edit/${row?.original.productId}`}>{value}</Link>
                                    :
                                    <Link to={`/admin/master/master/edit/${row.original.id}`}>{value}</Link>
                                }
                            </div>
                        </div>
                    </>
                ) : (
                    " "
                );
            },
        },
        {
            id: "ourSku",
            Header: "Our SKU",
            accessor: "ourSKU",
            column_name: "ourSKU",
            Cell: ({ value }) => {
                return value ? value : ''
            },
        },
        {
            id: "vendorSku",
            Header: "vendor SKU",
            accessor: "vendorSKU",
            column_name: "vendorSKU",
            Cell: ({ value }) => {
                return value ? value : ''
            },
        },
        {
            id: "ourCost",
            Header: `our Cost (${CurrencySymbolByCode.USD})`,
            accessor: "ourcost",
            column_name: "ourcost",
            Cell: ({ value }) => {
                return (<div className=' text-right relative w-[116px]'>
                    <div className='absolute right-[.7vw] sm:right[.2vw] md:right[.4vw]'>
                        {value ? parseFloat(value).toFixed(2) : "0.00"}
                    </div>
                </div>)
            },
        },
        {
            id: "msrp",
            Header: `MSRP (${CurrencySymbolByCode.USD})`,
            accessor: "msrp",
            column_name: "msrp",
            Cell: ({ value }) => {
                return (<div className=' text-right relative w-[82px]'>
                    <div className='absolute right-[.7vw] sm:right[.2vw] md:right[.4vw]'>
                        {value ? parseFloat(value).toFixed(2) : "0.00"}
                    </div>
                </div>)
            },
        },
        {
            id: "imap",
            Header: `IMAP (${CurrencySymbolByCode.USD})`,
            accessor: "imap",
            column_name: "imap",
            Cell: ({ value }) => {
                return (<div className=' text-right relative w-[80px]'>
                    <div className='absolute right-[.7vw] sm:right[.2vw] md:right[.4vw]'>
                        {value ? parseFloat(value).toFixed(2) : "0.00"}
                    </div>
                </div>)

            },
        },
        {
            id: "salePrice",
            Header: `Sale Price (${CurrencySymbolByCode.USD})`,
            accessor: "salePrice",
            column_name: "salePrice",
            Cell: ({ value }) => {
                return (<div className=' text-right relative w-[124px]'>
                    <div className='absolute right-[.7vw] sm:right[.2vw] md:right[.4vw]'>
                        {value ? parseFloat(value).toFixed(2) : "0.00"}
                    </div>
                </div>)
            },
        },
        {
            id: "createdDate",
            Header: "CREATED Date",
            accessor: "createdDate",
            Footer: "CREATED",
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
                    " "
                );
            },
        },
        {
            id: "createdBy",
            Header: "Created BY",
            accessor: "createdName",
            column_name: "createdName",
            Cell: ({ value }) => {
                return value ? (
                    <>
                        <div >{value}</div>
                    </>
                ) : (
                    " "
                );
            },
        },
        {
            id: "updatedDate",
            Header: "UPDATED Date",
            accessor: "modifiedDate",
            column_name: "modifiedDate",
            Cell: ({ value }) => {
                return value ? (
                    <>
                        <div >{DateTimeFormat(value).date} </div>
                        <div className="text-[#707070] text-xs font-normal">
                            {DateTimeFormat(value).time}
                        </div>
                    </>
                ) : (
                    " "
                );
            },
        },
        {
            id: "updatedBy",
            Header: "UPDATED BY",
            accessor: "modifiedName",
            column_name: "modifiedName",
            Cell: ({ value }) => {
                return value ? (
                    <>
                        <div >{value}</div>
                    </>
                ) : (
                    " "
                );
            },
        },
        {
            id: "recStatus",
            Header: "status",
            accessor: "recStatus",
            column_name: "recStatus",
            Cell: ({ value }) => {
                return <Status type={value} />;
            },
        },
        {
            id: "action",
            Header: "",
            accessor: "id",
            column_name: "action",
            Cell: ({ value, row }) => {
                return (
                    <Actions
                        id={value}
                        row={row}
                        setDeleteData={setProduct}
                        moduleName={`${TitleNameHelper({ defaultTitleName: "Master Product" })}`}
                        openDeleteModal={openDeleteModal}
                        setOpenDeleteModal={setOpenDeleteModal}
                        setModalInfo={setModalInfo}
                        setOpenBasicModal={setOpenBasicModal}
                        editUrl={`/admin/master/master/edit/${row.id.includes(".") ? row?.original?.productId : row?.original?.id}`}
                        setViewHistoryModal={setViewHistoryModal}
                        setRecordId={setRecordId}

                    />
                );
            },
            disableSortBy: true,
            disableShowHide: true,
        },
    ];

    const handleSort = (sortValue) => { };

    const handleDelete = (Product) => {
        dispatch(setAddLoading(true))

        ProductService.updateProductStatus({
            args: {
                id: Product.id,
                status: Product.changeStatus,
                rowVersion: Product.rowVersion,
                ...location,
            },
        })
            .then((response) => {
                if (response.data.data) {
                    dispatch(
                        setAlertMessage({
                            view: true,
                            type: "success",
                            message: ValidationMsgs.masterCatalog.products.Deleted,
                        })
                    );
                    getAllData();
                } else {
                    dispatch(
                        setAlertMessage({
                            view: true,
                            type: "danger",
                            message: serverError(response),
                        })
                    );
                }
                dispatch(setAddLoading(false))

            })
            .catch((errors) => {
                if (errors.response.data.Errors.Error) {
                    dispatch(
                        setAlertMessage({
                            message: errors.response.data.Errors.Error,
                            type: "danger",
                        })
                    );
                } else {
                    dispatch(
                        setAlertMessage({ message: ValidationMsgs.masterCatalog.products.notDeleted, type: "danger" })
                    );
                }
                dispatch(setAddLoading(false))

            });
        setOpenDeleteModal(false);
    };

    const statusChangedHandler = (data) => {
        dispatch(setAddLoading(true))
        if (data?.changeStatus === 'A' && data?.id) {
            MasterCatalogCommonService.validateProduct(data?.id, productType.MC)
                .then((response) => {
                    if (response?.data?.data?.length > 0 && response?.data?.otherData) {
                        dispatch(setAlertMessage({
                            type: 'danger',
                            message: serverError({ data: { errors: response?.data?.otherData } })
                        }))
                    } else {
                        if (ProReadinessData.readyToPublish) {
                            ChangeMasterStatus(data);
                        } else {
                            dispatch(setAlertMessage({ type: "danger", message: serverError(ProReadinessData) }));
                        }
                    }
                    dispatch(setAddLoading(false));
                }).catch((error) => {
                    dispatch(setAddLoading(false));
                });
        } else {
            ChangeMasterStatus(data);
        }
        setOpenBasicModal(false);
    };

    const ChangeMasterStatus = (data) => {
        ProductService.updateProductStatus({
            args: {
                id: data.id,
                status: data.changeStatus,
                rowVersion: data.rowVersion,
                ...location,
            },
        })
            .then((response) => {
                if (response.data.success) {
                    dispatch(
                        setAlertMessage({
                            view: true,
                            type: "success",
                            message: ValidationMsgs.masterCatalog.products.statusUpdated,
                        })
                    );
                    getAllData();
                    setOpenBasicModal(false);
                } else {
                    dispatch(
                        setAlertMessage({
                            view: true,
                            type: "danger",
                            message: serverError(response),
                        })
                    );
                }
                dispatch(setAddLoading(false))

            })
            .catch((errors) => {
                dispatch(
                    setAlertMessage({
                        view: true,
                        type: "danger",
                        message: ValidationMsgs.masterCatalog.products.statusNotUpdated,
                    })
                );
                dispatch(setAddLoading(false))

            });
    };

    const moreFilters = useMemo(
        () => [
            {
                name: "Status",
                columnName: "recStatus",
                options: ProductStatusMoreFilterOption,
                type: "radio",
                conditionalSearch: true,
            },
            {
                name: "Created Date",
                columnName: "createddate",
                options: [],
                type: "date",
            },
            {
                name: "Updated Date",
                columnName: "modifieddate",
                options: [],
                type: "date",
            },
            {
                name: "Created By",
                options: moreFilterOptions.adminUsers,
                columnName: "createdBy",
                type: "checkbox",
            },
            {
                name: "Updated By",
                options: moreFilterOptions.adminUsers,
                columnName: "modifiedBy",
                type: "checkbox",
            }
        ],
        [moreFilterOptions, stores]
    );

    const columnForVarientProducts = [
        {
            id: "product Image",
            Header: "product Image",
            accessor: "productImage",
            column_name: "product Image",
            isVisible: false,
            disableShowHide: true,
            disableSortBy: true,
            Cell: ({ value, row }) => {
                return value && value.length > 0 ? (
                    <>
                        <div className={`flex -space-x-9 items-center`} style={{ width: "100px" }}>
                            {
                                Array.isArray(value) ? value.map((ProductMainImg, index) => {
                                    return (
                                        <div className="h-14 w-14 flex items-center justify-center overflow-hidden  box-content border bg-white">
                                            <Image src={ProductMainImg} containerHeight={""} className="max-h-full" />
                                        </div>
                                    )
                                })
                                    :
                                    <>
                                        <div className="h-14 w-14 flex items-center justify-center overflow-hidden  box-content border bg-white">
                                            <Image src={value} className={"max-h-full"} />
                                        </div></>
                            }
                            {(row.original.subRows && row.original.subRows.length !== 0) &&
                                <div>
                                    <span className="w-14 h-14 rounded-full box-content bg-neutral-200 flex items-center justify-center">+{row?.original?.subRows?.length}</span>
                                </div>
                            }
                        </div>
                    </>
                ) : (row?.original.productId ?
                    <Link to={`/admin/master/master/edit/${row?.original.productId}`}>
                        <div className="h-14 w-14 flex items-center justify-center overflow-hidden  box-content border bg-white">
                            <Image src={value} containerHeight={""} className="max-h-full" />
                        </div>
                    </Link> :
                    <>
                        <Link to={`/admin/master/master/edit/${row?.original.id}`}>
                            <div className="h-14 w-14 flex items-center justify-center overflow-hidden  box-content border bg-white">
                                <Image src={value} containerHeight={""} className="max-h-full" />
                            </div>
                        </Link>
                        {(row.original.subRows && row.original.subRows.length !== 0) &&
                            <div>
                                <span className="w-14 h-14 box-content bg-neutral-200 inline-flex items-center justify-center text-center">+{row?.original?.subRows?.length}</span>
                            </div>
                        }
                    </>
                );
            },
        },
        {
            id: "name",
            Header: "Product Name",
            accessor: "name",
            column_name: "name",
            disableShowHide: true,
            disableSortBy: true,
            Cell: ({ value, row }) => {
                return row ? (
                    <>
                        <div
                            className="w-full flex justify-start items-center group"
                            style={{ width: "200px" }}
                        >
                            <div >
                                {value}
                            </div>
                        </div>
                    </>
                ) : (
                    " "
                );
            },
        },
        {
            id: "ourSku",
            Header: "Our SKU",
            accessor: "ourSKU",
            column_name: "ourSKU",
            disableShowHide: true,
            disableSortBy: true,
            Cell: ({ value }) => {
                return value ? (
                    <>
                        <div className="w-56">
                            {value}
                        </div>
                    </>
                ) : ("")
            },
        },
        {
            id: "upc",
            Header: "UPC",
            accessor: "upc",
            column_name: "upc",
            disableShowHide: true,
            disableSortBy: true,
            Cell: ({ value }) => {
                return value ? value : "";
            },
        },
        {
            id: "quantity",
            Header: "Quantity",
            accessor: "quantity",
            column_name: "quantity",
            disableShowHide: true,
            disableSortBy: true,
            Cell: ({ value }) => {
                return value ? value : ''
            },
        },
        {
            id: "createdDate",
            Header: "CREATED Date",
            accessor: "createdDate",
            Footer: "CREATED",
            column_name: "createdDate",
            disableShowHide: true,
            disableSortBy: true,
            Cell: ({ value }) => {
                return value ? (
                    <>
                        <div >{DateTimeFormat(value).date} </div>
                        <div className="text-[#707070] text-xs font-normal">
                            {DateTimeFormat(value).time}
                        </div>
                    </>
                ) : (
                    " "
                );
            },
        },
        {
            id: "createdBy",
            Header: "Created BY",
            accessor: "createdBy",
            column_name: "createdBy",
            disableShowHide: true,
            disableSortBy: true,
            Cell: ({ value }) => {
                return value ? (
                    <>
                        <div >{value}</div>
                    </>
                ) : (
                    " "
                );
            },
        },
        {
            id: "updatedDate",
            Header: "UPDATED Date",
            accessor: "modifiedDate",
            column_name: "modifiedDate",
            disableShowHide: true,
            disableSortBy: true,
            Cell: ({ value }) => {
                return value ? (
                    <>
                        <div >{DateTimeFormat(value).date} </div>
                        <div className="text-[#707070] text-xs font-normal">
                            {DateTimeFormat(value).time}
                        </div>
                    </>
                ) : (
                    " "
                );
            },
        },
        {
            id: "modifiedBy",
            Header: "UPDATED BY",
            accessor: "modifiedBy",
            column_name: "modifiedBy",
            disableShowHide: true,
            disableSortBy: true,
            Cell: ({ value }) => {
                return value ? (
                    <>
                        <div >{value}</div>
                    </>
                ) : (
                    " "
                );
            },
        },
        {
            id: "recStatus",
            Header: "status",
            accessor: "recStatus",
            column_name: "recStatus",
            disableShowHide: true,
            disableSortBy: true,
            Cell: ({ value }) => {
                return <Status type={value} />;
            },
        },
    ];

    const getVarientDataFunc = (currentRowData) => {
        dispatch(setAddLoading(true))
        setOpenVarientModal((prevData) => ({
            ...prevData,
            name: currentRowData.name,
            ourSku: currentRowData.ourSKU,
            toShow: true
        }))

        ProductService.getMasterProductsVarientData(currentRowData.id).then((response) => {
            const VarientData = response?.data?.data;
            setdataForVarientProducts(VarientData || [])

            const QuantityTotalForVarientModal = VarientData.reduce((accumulator, element) => {
                return accumulator + element?.quantity
            }, 0)
            setTotalQuantity(QuantityTotalForVarientModal)

            dispatch(setAddLoading(false))
        }).catch(() => {
            dispatch(setAddLoading(false))
        })
    }

    useEffect(() => {
        if (setGetDataFunction instanceof Function) {
            setGetDataFunction(() => getAllData);
        }
    }, [activeTab]);

    useEffect(() => {
        let firsLevelRecord = selectedRows.filter((value) => (value.depth === 0 && value.original.recStatus === RecStatusValuebyName.Active) && (!value.original.isDiscontinue) && ((value.original.navSyncStatus === RecStatusValuebyName.NavSync) || MasterProductStatusTabs[activeTab].value === 'NAVSyncPending' || MasterProductStatusTabs[activeTab].value === 'ResyncwithNAV'));
        setSelectedData(firsLevelRecord);
    }, [selectedRows]);

    useEffect(() => {
        if (ModalInfo?.data?.id) {
            ReadinessCheckService.getMcProductRedinessById(ModalInfo?.data?.id).then((response) => {
                if (response.data.data && response.data.success) {
                    setProReadinessData({ ...response.data.data });
                } else {
                    setProReadinessData(response)
                }
            })
        }
    }, [ModalInfo]);

    useEffect(() => {
        setProductId(() => selectedData.map(value => value.original.id))
    }, [selectedData]);

    return (
        <>
            <ReactTable
                COLUMNS={COLUMNS}
                DATA={Data}
                {...paginationData}
                setTablePageSize={(value) =>
                    setPaginationDataFunc("pageSize", value)
                }
                type={type}
                fetchData={getAllData}
                sortingOptions={sortingOptions}
                setSortingOptions={setSortingOptionHandler}
                filteringOptions={filteringOptions}
                setColumnFilteringOptions={setColumnFilteringOptions}
                handleSort={handleSort}
                editColumnFilter={true}
                setSelectedRows={setSelectedRows}
                moreFilterOption={moreFilters}
                selectedRows={selectedRows}
                savedButton={true}
                buttonText={'Saved'}
                productSubCheckboxAction={false}
                expandedRows={useMemo(() => true, [])}
                hiddenColumns={useMemo(() => ['rowSelection'], [])}
                saveFilter={{ show: true, tabName: pathname + '_' + tab?.value }}
            />
            <ConfirmDelete
                handleDelete={handleDelete}
                message={ValidationMsgs.product.deletePermanently}
                title={"Delete"}
                openDeleteModal={openDeleteModal}
                setOpenDeleteModal={setOpenDeleteModal}
                data={Product}
                clonedStoresNameFlag={true}
                clonedstoreNames={Product?.storeNames}
            />
            {openCloneModal && <ProductCloneModal
                type={type}
                openCloneModal={openCloneModal}
                setOpenCloneModal={setOpenCloneModal}
                data={Product}
                proId={ProductId}
                getProductData={getAllData}
            />}
            <ProductAttributeCloneModal
                type={type}
                openAttributeCloneModal={openAttributeCloneModal}
                setOpenAttributeCloneModal={setOpenAttributeCloneModal}
                proId={ProductId}
                getProductData={getAllData}
            />
            <BasicModal
                handleConfirmation={statusChangedHandler}
                openModal={openBasicModal}
                setOpenModal={setOpenBasicModal}
                {...ModalInfo}
            />

            <VarientProductModal
                title={`Variant Of ${openVarientModal.name} | SKU : ${openVarientModal.ourSku} | Total Quantity : ${totalQuantity || 0}`}
                openModal={openVarientModal}
                setOpenModal={setOpenVarientModal}
                COLUMNS={columnForVarientProducts}
                DATA={dataForVarientProducts}
                setdataForVarientProducts={setdataForVarientProducts}
            />


            {viewHistoryModal && (
                <ViewHistory
                    title={"View History"}
                    openModal={viewHistoryModal}
                    setOpenModal={setViewHistoryModal}
                    rowId={RecordId}
                    pageName={PageName.MasterCatalogProduct}
                />
            )}
        </>
    );
};

export default All;