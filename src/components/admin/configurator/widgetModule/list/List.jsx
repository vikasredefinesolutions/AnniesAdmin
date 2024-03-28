/*Component Name: List
Component Functional Details: User can create or update List master details from here.
Created By: Shrey Patel
Created Date: 03/20/2023
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import React, { useState, useCallback, useMemo, Fragment } from "react";
import ReactTable from "components/common/table/ReactTableServerSide";
import ConfirmDelete from "components/common/modals/ConfirmDelete";
import BasicModal from "components/common/modals/Basic";
import Messages from "components/common/alerts/messages/Index";
import Actions from "./Actions";
import { useDispatch, useSelector } from "react-redux";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { paginationDetails } from "global/Enum";
import { serverError, TitleNameHelper } from "services/common/helper/Helper";
import { ValidationMsgs } from "global/ValidationMessages";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import widgetModuleService from "services/admin/widgetModule/widgetModuleService";
import AddWidgetModal from "../create/AddWidgetModal";

const List = () => {
    const permission = useSelector(store => store.permission);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [WidgetDataId, setWidgetDataId] = useState(null);
    const [ModelInfo, setModalInfo] = useState({});
    const [openBasicModal, setOpenBasicModal] = useState(false);
    const [openAddActionModal, setOpenAddActionModal] = useState(false);
    const [editId, setEditId] = useState(null);

    const dispatch = useDispatch();
    const location = useSelector((store) => store?.location);
    const COLUMNS = [
        {
            id: "name",
            Header: "Name",
            accessor: "name",
            Footer: "Name",
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
                                <div
                                    className="text-sm font-normal"
                                    onClick={() => {
                                        setEditId(row.original.id);
                                        handleShowModal();
                                    }}
                                >
                                    <div className="text-sm font-normal cursor-pointer">
                                        {value ? value : ""}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    ""
                );
            },
        },
        {
            id: "moduleList",
            Header: "Module Name",
            accessor: "moduleList",
            Footer: "moduleList",
            column_name: "moduleList",
            disableShowHide: true,
            disableSortBy: true,
            Cell: ({ value, row }) => {
                return row ? (
                    <>
                        <div className="w-full flex justify-start items-center group" style={{ width: "400px" }}>
                            <div className="text-sm font-normal"
                            >
                                <div className="text-sm font-normal">
                                    {/* {row?.original?.moduleList.map((data) => { return data + "," })} */}
                                    {value.map((name, index) => {
                                        return name ? (
                                            <span
                                                key={index}
                                                className="text-xs inline-flex font-medium border border-neutral-200 bg-slate-100 text-gray-500 rounded-md text-center px-2.5 py-1 ml-1"
                                            >
                                                {name}
                                            </span>
                                        ) : (
                                            <Fragment key={index}></Fragment>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    ""
                );
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
                        setWidgetDataId={setWidgetDataId}
                        setOpenDeleteModal={setOpenDeleteModal}
                        setModalInfo={setModalInfo}
                        setOpenBasicModal={setOpenBasicModal}
                        handleShowModal={handleShowModal}
                        setEditId={setEditId}
                    />
                );
            },
            disableSortBy: true,
            disableShowHide: true,
        },
    ];

    const handleShowModal = () => {
        setOpenAddActionModal((prev) => !prev);
    };

    const [Data, setData] = useState([]);
    const [paginationData, setPaginationData] = useState({ ...paginationDetails });
    const [sortingOptions, setSortingOptions] = useState([
        {
            field: "displayOrder",
            direction: 0,
            priority: 0,
        },
    ]);

    const [selectedRows, setSelectedRows] = useState([]);
    const [filteringOptions, setColumnFilteringOptions] = useState([]);

    const getWidgetModuleList = useCallback(
        (pageIndex) => {
            dispatch(setAddLoading(true))

            widgetModuleService.getWidgetList({
                args: {
                    pageSize: paginationData.pageSize,
                    pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
                    sortingOptions,
                    filteringOptions,
                },
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
                dispatch(setAddLoading(false))
            }).catch(() => {
                dispatch(setAddLoading(false))
            })
        },
        [
            filteringOptions,
            paginationData.pageSize,
            sortingOptions,
            paginationData.pageIndex,
        ]
    );

    const setSortingOptionHandler = (column, direction) => {
        setSortingOptions([
            {
                field: column,
                direction: direction,
                priority: 0,
            },
        ]);
    };

    const setPaginationDataFunc = (key, value) => {
        setPaginationData((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    const handleDelete = (data) => {
        dispatch(setAddLoading(true))
        widgetModuleService.deleteWidgetServices({
            args: {
                id: data.linkId,
                rowVersion: data?.rowVersion,
                status: data?.changeStatus,
                ...location
            },
        }).then((response) => {
                if (response.data.success) {
                    dispatch(
                        setAlertMessage({
                            type: "success",
                            message: ValidationMsgs.widgetModuleMapping.deleted,
                        })
                    );
                    getWidgetModuleList();
                } else {
                    dispatch(
                        setAlertMessage({
                            type: "danger",
                            message: serverError(response),
                        })
                    );
                }
                dispatch(setAddLoading(false))
            }).catch((errors) => {
                dispatch(
                    setAlertMessage({
                        type: "danger",
                        message: ValidationMsgs.widgetModuleMapping.notDeleted,
                    })
                );
                dispatch(setAddLoading(false))
            });
    }

    const handleSort = (sortValue) => { };

    return (
        <>
            <title>{TitleNameHelper({ defaultTitleName: "Widget Module" })}</title>
            <div className="py-4">
                <div className="px-4 sm:px-6 lg:px-8 w-full items-center flex justify-between sticky top-0 py-2 bg-slate-100">
                    <div className="col-span-full w-full flex justify-between items-center">
                        <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
                            {TitleNameHelper({ defaultTitleName: "Widget Module" })}
                        </h1>
                        {(permission?.isEdit || permission?.isDelete) && <div className="flex flex-wrap sm:auto-cols-max gap-2">
                            <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                                onClick={() => handleShowModal((prev) => !prev)}
                            >
                                <span className="material-icons-outlined">add</span>
                                <span className="ml-1">Add Widget</span>
                            </button>
                        </div>}
                    </div>
                </div>
                <div className="px-4 sm:px-6 lg:px-8 w-full pt-7">
                {!openAddActionModal && <Messages />}
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
                            fetchData={getWidgetModuleList}
                            sortingOptions={sortingOptions}
                            setSortingOptions={setSortingOptionHandler}
                            hiddenColumns={useMemo(() => ['rowSelection'], [])}
                            handleSort={handleSort}
                            filteringOptions={filteringOptions}
                            setColumnFilteringOptions={setColumnFilteringOptions}
                            selectedRows={selectedRows}
                            setSelectedRows={setSelectedRows}
                            moreFilterOption={false}
                            editColumnFilter={false}
                        />
                    </div>
                </div></div>

            <ConfirmDelete
                handleDelete={handleDelete}
                data={WidgetDataId}
                message={ValidationMsgs.thirdPartyService.thirdPartyPermanentDelete}
                title={"Delete"}
                openDeleteModal={openDeleteModal}
                setOpenDeleteModal={setOpenDeleteModal}
                {...ModelInfo}
            />
            <BasicModal
                // handleConfirmation={statusChangedHandler}
                openModal={openBasicModal}
                setOpenModal={setOpenBasicModal}
                {...ModelInfo}
            />

            {openAddActionModal && (
                <AddWidgetModal
                    handleShowModal={handleShowModal}
                    getWidgetModuleList={getWidgetModuleList}
                    idson={editId}
                    setEditId={setEditId}
                    openAddActionModal={openAddActionModal}
                />
            )}
        </>
    );
};

export default List;
