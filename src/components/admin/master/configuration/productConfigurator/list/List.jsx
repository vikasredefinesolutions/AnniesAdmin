/*Component Name: List
Component Functional Details: User can create or update List master details from here.
Created By: Shrey Patel
Created Date: 11/02/2023
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setAddLoading } from 'redux/globalLoader/GlobalLoaderAction';
import productConfigServices from 'services/admin/productConfigurator/ProductConfiguratorService';
import { paginationDetails, RecStatusValuebyName, RecStatusValue } from "global/Enum";
import { format } from "date-fns";
import ReactTable from "components/common/table/ReactTableServerSide";
import CheckBoxAction from './CheckBoxAction';
import Status from "../../../../../common/displayStatus/Status";
import { NavLink, useLocation } from 'react-router-dom';
import { DateTimeFormat, TitleNameHelper, serverError, } from 'services/common/helper/Helper';
import Actions from './Actions';
import Messages from "components/common/alerts/messages/Index";
import ConfirmDelete from 'components/common/modals/ConfirmDelete';
import { setAlertMessage } from 'redux/alertMessage/AlertMessageReducers';
import { ValidationMsgs } from "global/ValidationMessages";
import DropdownService from 'services/common/dropdown/DropdownService';
import ViewHistory from "components/common/modals/ViewHistory";
import BasicModal from "components/common/modals/Basic";

const List = () => {
    const permission = useSelector(store => store.permission)
    const [Data, setData] = useState([])
    const [userNameValues, setUserNameValues] = useState([]);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [size, setSize] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);
    const [ModalInfo, setModalInfo] = useState({});
    const [openBasicModal, setOpenBasicModal] = useState(false);
    const [viewHistoryModal, setViewHistoryModal] = useState(false);

    const location = useSelector((store) => store?.location)
    const [RecordId, setRecordId] = useState(null);
    const [paginationData, setPaginationData] = useState({ ...paginationDetails })
    const [filteringOptions, setColumnFilteringOptions] = useState([]);
    const handleSort = (sortValue) => { };
    const { pathname } = useLocation();

    const COLUMNS = [
        {
            id: "fieldName",
            Header: "title",
            accessor: "fieldName",
            column_name: "fieldName",
            disableShowHide: true,
            Cell: ({ value, row }) => {
                return row ? (
                    <>
                        <div
                            className="w-full flex justify-start items-center group"
                            style={{ width: "200px" }}
                        >
                            <div >
                                <NavLink to={"/admin/master/Configuration/productConfigurator/edit/" + row.original.id}>
                                    <div className="text-sm font-normal">
                                        {value ? value : ""}
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                    </>
                ) : (
                    ""
                );
            },
        },
        {
            id: "displayOrder",
            Header: "Display Order",
            accessor: "displayOrder",
            column_name: "displayOrder",
            Cell: ({ value }) => {
                return value ? <div>{value}</div> : "";
            },
        },
        {
            id: "createdDate",
            Header: "CREATED DATE",
            accessor: "createdDate",
            Footer: "CREATED DATE",
            column_name: "createdDate",
            Cell: ({ value }) => {
                return value ? (
                    <>
                        <div >{DateTimeFormat(value).date} </div>
                        <div className="text-[#707070] text-xs font-normal">
                            {format(new Date(value), "hh:mm a")}
                        </div>
                    </>
                ) : (
                    ""
                );
            },
        },
        {
            id: "createdBy",
            Header: "CREATED BY",
            accessor: "createdName",
            column_name: "createdName",
            Cell: ({ value }) => {
                return value ? (
                    <>
                        <div >{value} </div>
                    </>
                ) : (
                    ""
                );
            },
        },
        {
            id: "updatedDate",
            Header: "UPDATED DATE",
            accessor: "modifiedDate",
            column_name: "modifiedDate",
            Cell: ({ value }) => {
                return value ? (
                    <>
                        <div >{DateTimeFormat(value).date} </div>
                        <div className="text-[#707070] text-xs font-normal">
                            {format(new Date(value), "hh:mm a")}
                        </div>
                    </>
                ) : (
                    ""
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
                        <div >{value} </div>
                    </>
                ) : (
                    ""
                );
            },
        },
        {
            id: "recStatus",
            Header: "Status",
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
                        setSize={setSize}
                        setOpenDeleteModal={setOpenDeleteModal}
                        setModalInfo={setModalInfo}
                        setOpenBasicModal={setOpenBasicModal}
                        setViewHistoryModal={setViewHistoryModal}
                        setRecordId={setRecordId}
                    />
                );
            },
            disableSortBy: true,
            disableShowHide: true,
        },

    ];

    const setPaginationDataFunc = (key, value) => {
        setPaginationData((prevState) => ({
            ...prevState,
            [key]: value
        }))
    }

    const [sortingOptions, setSortingOptions] = useState([
        {
            field: "firstname",
            direction: 0,
            priority: 0
        }
    ])

    const setSortingOptionHandler = (column, direction) => {
        setSortingOptions([
            {
                field: column,
                direction: direction,
                priority: 0,
            },
        ]);
    };

    const dispatch = useDispatch();
    const getCategoriesConfig = useCallback(
        (pageIndex = 1) => {
            dispatch(setAddLoading(true))
            productConfigServices.getCategoryConfigList({
                args: {
                    pageSize: paginationData.pageSize,
                    pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
                    sortingOptions,
                    filteringOptions
                },
            }).then((response) => {
                setData(response.data.data.items)
                setPaginationData((prevState) => ({
                    ...prevState,
                    pageIndex: response.data.data.pageIndex,
                    pageSize: response.data.data.pageSize,
                    totalCount: response.data.data.totalCount,
                    totalPages: response.data.data.totalPages,
                    hasPreviousPage: response.data.data.hasPreviousPage,
                    hasNextPage: response.data.data.hasNextPage,
                }));
                dispatch(setAddLoading(false))
            }).catch(() => {
                dispatch(setAddLoading(false))
            })
        },
        [
            filteringOptions,
            paginationData.pageSize,
            sortingOptions,
            paginationData.pageIndex
        ]
    )

    const statusChangedHandler = (data) => {
        dispatch(setAddLoading(true))

        productConfigServices.updateStatus({
            args: {
                id: data.id,
                status: data.changeStatus,
                rowVersion: data.rowVersion,
                ...location,
            },
        }).then((response) => {
            if (response.data.success) {
                dispatch(
                    setAlertMessage({
                        type: "success",
                        message: ValidationMsgs.ProductConfig.ProductConfigStatusUpdated,
                    })
                );
                getCategoriesConfig();
            } else {
                dispatch(
                    setAlertMessage({
                        type: "danger",
                        message: serverError(response),
                    })
                )
            }
            dispatch(setAddLoading(false))
        }).catch((errors) => {
            dispatch(
                setAlertMessage({
                    type: "danger",
                    message: ValidationMsgs.ProductConfig.ProductConfigStatusNotUpdated,
                })
            );
            dispatch(setAddLoading(false))
        });
        setOpenBasicModal(false);
    };

    const handleDelete = (size) => {
        var ids = [];
        dispatch(setAddLoading(true))

        if (Array.isArray(size)) {
            ids = size.map((value) => {
                return { item1: value.id, item2: value.rowVersion };
            });
        } else {
            ids = [{ item1: size.id, item2: size.rowVersion }];
        }

        productConfigServices.updateMultipleStatus({
            args: {
                idsRowVersion: ids,
                status: RecStatusValuebyName.Archived,
                ...location,
            },
        }).then((response) => {
            if (response.data.data && response.data.success) {
                dispatch(
                    setAlertMessage({
                        view: true,
                        type: "success",
                        message: ValidationMsgs.ProductConfig.ProductConfigDeleted,
                    })
                );
                getCategoriesConfig();
                setColumnFilteringOptions((prevData) => {
                    let prevFilterData = prevData.filter((currentFilterObj) => {
                        return currentFilterObj.field !== "product_type"
                    })
                    return prevFilterData
                })
            } else {
                dispatch(
                    setAlertMessage({
                        view: true,
                        type: "danger",
                        message: serverError(response, true).replaceAll(",",": "),
                    })
                );
            }
            dispatch(setAddLoading(false))
        }).catch((errors) => {
            if (errors.response.data.Errors.Error) {
                dispatch(
                    setAlertMessage({
                        message: errors.response.data.Errors.Error,
                        type: "danger",
                    })
                );
            } else {
                dispatch(setAlertMessage({ message: ValidationMsgs.ProductConfig.ProductConfigNotDeleted, type: "danger" }));
            }
            dispatch(setAddLoading(false))

        });
        setOpenDeleteModal(false);
    };

    useEffect(() => {
        DropdownService.getDropdownValues("adminuser").then((response) => {
            setUserNameValues(response.data.data);
        });
    }, []);

    const moreFilterOptions = [
        {
            name: "Created By",
            columnName: "createdBy",
            options: userNameValues,
            type: "checkbox",
            conditionalSearch: true,
        },
        {
            name: "Created Date",
            columnName: "createddate",
            options: [],
            type: "date",
        },
        {
            name: "Updated By",
            columnName: "modifiedBy",
            options: userNameValues,
            type: "checkbox",
            conditionalSearch: true,
        },
        {
            name: "Updated Date",
            columnName: "modifiedDate",
            options: [],
            type: "date",
        },
        {
            name: "Status",
            columnName: "recStatus",
            options: RecStatusValue,
            type: "radio",
        }
    ];

    return (
        <>
            <title>{TitleNameHelper({ defaultTitleName: "Products Configurator" })}</title>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto">
                <div className="col-span-full w-full flex justify-between mb-8">
                    <div className="col-span-full w-full flex justify-between items-center">
                        <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
                            {TitleNameHelper({ defaultTitleName: "Products Configurator" })}
                        </h1>
                        {(permission?.isEdit || permission?.isDelete) && <div className="flex flex-wrap sm:auto-cols-max gap-2">
                            <NavLink
                                to={"create"}
                                className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                            >
                                <span className="material-icons-outlined">add</span>
                                <span className="ml-1">Add Configurator</span>
                            </NavLink>
                        </div>}
                    </div>
                </div>
                <Messages />
                <div className="col-span-full w-full bg-white shadow-xxl rounded-md mb-8 relative">
                    <ReactTable
                        COLUMNS={COLUMNS}
                        DATA={Data}
                        hasNextPage={paginationData.hasNextPage}
                        hasPreviousPage={paginationData.hasPreviousPage}
                        pageIndex={paginationData.pageIndex}
                        setPageIndex={(value) => setPaginationDataFunc("pageIndex", value)}
                        pageSize={paginationData.pageSize}
                        setTablePageSize={(value) =>
                            setPaginationDataFunc("pageSize", value)
                        }
                        totalCount={paginationData.totalCount}
                        totalPages={paginationData.totalPages}
                        fetchData={getCategoriesConfig}
                        sortingOptions={sortingOptions}
                        setSortingOptions={setSortingOptionHandler}
                        CheckBoxAction={({ ...rest }) => (
                            <CheckBoxAction
                                setOpenDeleteModal={setOpenDeleteModal}
                                setSize={setSize}
                                {...rest}
                            />
                        )}
                        handleSort={handleSort}
                        // column filters
                        filteringOptions={filteringOptions}
                        setColumnFilteringOptions={setColumnFilteringOptions}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                        editColumnFilter={true}
                        moreFilterOption={moreFilterOptions}
                        displayColumnFilter={[
                            {
                                columnName: "recStatus",
                                name: "Status",
                                options: RecStatusValue,
                            },
                        ]}
                        saveFilter={{ show: false, tabName: pathname + '_' + 'All' }}
                        hiddenColumns={[(permission?.isDelete ? '' : 'rowSelection')]}
                    />

                    <ConfirmDelete
                        handleDelete={handleDelete}
                        data={size}
                        message={ValidationMsgs.ProductConfig.ProductConfigPermanentDelete}
                        title={"Delete"}
                        openDeleteModal={openDeleteModal}
                        setOpenDeleteModal={setOpenDeleteModal}
                    />
                    <BasicModal
                        handleConfirmation={statusChangedHandler}
                        openModal={openBasicModal}
                        setOpenModal={setOpenBasicModal}
                        {...ModalInfo}
                    />
                    {viewHistoryModal && (
                        <ViewHistory
                            title={"View History"}
                            openModal={viewHistoryModal}
                            setOpenModal={setViewHistoryModal}
                            rowId={RecordId}
                            pageName={"Category Configurator"}
                        />
                    )}
                </div>
            </div>
        </>
    )
}

export default List