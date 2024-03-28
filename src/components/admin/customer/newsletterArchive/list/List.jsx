/*Component Name: List
Component Functional Details: User can create or update List master details from here.
Created By: Shrey Patel
Created Date: 11/03/2023
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { defaultImage, paginationDetails, RecStatusValuebyName, RecStatusValue } from "global/Enum";
import { ValidationMsgs } from "global/ValidationMessages";

import { DateTimeFormat, serverError, TitleNameHelper } from "services/common/helper/Helper";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";

import ConfirmDelete from "components/common/modals/ConfirmDelete";
import Messages from "components/common/alerts/messages/Index";
import Image from "components/common/formComponent/Image";
import BasicModal from "components/common/modals/Basic";

import ReactTable from "./../../../../common/table/ReactTableServerSide";
import Status from "./../../../../common/displayStatus/Status";
import CheckBoxAction from "./CheckBoxAction";
import Actions from "./Actions";
import NewsLetterArchiveServices from "services/admin/newsletterArchive/NewsLetterArchiveServices";
import DropdownServiceCls from "services/common/dropdown/DropdownService";

const List = () => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const permission = useSelector(store => store.permission);
    const location = useSelector((store) => store?.location);

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [brand, setBrand] = useState(null);
    const [basicModalInfo, setModalInfo] = useState({});
    const [openBasicModal, setOpenBasicModal] = useState(false);
    const [Data, setData] = useState([]);
    const [sortingOptions, setSortingOptions] = useState([{ field: "name", direction: 0, priority: 0 }]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [filteringOptions, setColumnFilteringOptions] = useState([]);
    const [paginationData, setPaginationData] = useState({ ...paginationDetails });
    const [userNameValues, setUserNameValues] = useState([]);

    const setPaginationDataFunc = (key, value) => {
        setPaginationData((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    const COLUMNS = [{
        id: "imagePath",
        Header: "Image",
        accessor: "imagePath",
        column_name: "imagePath",
        disableSortBy: true,
        disableShowHide: true,
        Cell: ({ value, row }) => {
            return value && value !== "" ? (
                <div className="flex items-center">
                    <NavLink
                        to={"/admin/Customer/newsLetterArchive/edit/" + row.original.id}
                    >
                        <Image src={value} className="w-20" containerHeight={"h-20"} />
                    </NavLink>
                </div>
            ) :
                <div className="flex items-center">
                    <div className="w-40 max-h-40 shrink-0 p-1 sm:p-1 ">
                        <NavLink
                            to={"/admin/Customer/newsLetterArchive/edit/" + row.original.id}
                        >
                            <Image src={defaultImage} className="w-20" containerHeight={"h-20"} />
                        </NavLink>
                    </div>
                </div>
        },
    },
    {
        id: "title",
        Header: "Title",
        accessor: "title",
        column_name: "title",
        disableShowHide: true,
        Cell: ({ value, row }) => {
            return row ? (
                <>
                    <div className="w-full flex justify-start items-center group">
                        <NavLink
                            to={"/admin/Customer/newsLetterArchive/edit/" + row.original.id} >
                            <div className="text-sm font-normal">
                                {value ? value : ""}
                            </div>
                        </NavLink>
                    </div>
                </>
            ) : (
                ""
            );
        },
    },
    {
        id: "subTitle",
        Header: "Sub Title",
        accessor: "subTitle",
        column_name: "subTitle",
        Cell: ({ value, row }) => {
            return row ? (
                <>
                    <div className="w-full flex justify-start items-center group"
                        style={{ width: "100px" }}>
                        <div className="text-sm font-normal">
                            {value ? value : ""}
                        </div>
                    </div>
                </>
            ) : (
                ""
            );
        },
    },
    {
        id: "description",
        Header: "Description",
        accessor: "description",
        column_name: "description",
        // disableSortBy: true,
        Cell: ({ value }) => {
            let Content = value.replace(/<\/?[^>]+>/gi, ' ')
            function shorten(text, max) {
                return text && text.length > max ? text.slice(0, max).split(' ').slice(0, -1).join(' ') + "..." : text
            }
            return value ? (
                <div className="w-full flex justify-start items-center group"
                    style={{ width: "400px" }} >
                    <div className="text-sm font-normal text-ellipsis">
                        {shorten(Content, 300)}
                    </div>
                </div>
            ) : (
                ""
            );
        },
    },
    {
        id: "author",
        Header: "Author",
        accessor: "author",
        column_name: "author",
    },
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
                ""
            );
        },
    },
    {
        id: "createdBy",
        Header: "Created By",
        accessor: "createdName",
        column_name: "createdName",
    },
    {
        id: "updatedDate",
        Header: "Updated Date",
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
                ""
            );
        },
    },
    {
        id: "updatedBy",
        Header: "Updated By",
        accessor: "modifiedName",
        column_name: "modifiedName",
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
                    setBrand={setBrand}
                    setOpenDeleteModal={setOpenDeleteModal}
                    setModalInfo={setModalInfo}
                    setOpenBasicModal={setOpenBasicModal}
                />
            );
        },
        disableSortBy: true,
        disableShowHide: true,
    },
    ];

    const getNewsLetterArchive = useCallback(
        (pageIndex = 1) => {
            dispatch(setAddLoading(true))
            NewsLetterArchiveServices.getNewsLetterArchive({
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
        }, [
        filteringOptions,
        paginationData.pageSize,
        sortingOptions,
        paginationData.pageIndex,
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

    const statusChangedHandler = (data) => {
        if (data?.id) {
            dispatch(setAddLoading(true))
            NewsLetterArchiveServices.updateStatus({
                args: {
                    id: data.id,
                    rowVersion: data.rowVersion,
                    status: data.changeStatus,
                    ...location,
                },
            }).then((response) => {
                if (response.data.data) {
                    dispatch(
                        setAlertMessage({
                            view: true,
                            type: "success",
                            message: ValidationMsgs.newsLetterArchive.statusUpdated,
                        })
                    );
                    getNewsLetterArchive();
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
            }).catch((errors) => {
                if (errors.response.data.Errors.Error) {
                    dispatch(
                        setAlertMessage({
                            message: errors.response.data.Errors.Error,
                            type: "danger",
                        })
                    );
                } else {
                    dispatch(
                        setAlertMessage({ message: ValidationMsgs.newsLetterArchive.statusNotUpdated, type: "danger" })
                    );
                }
                dispatch(setAddLoading(false))
            });
        }
        setOpenBasicModal(false);
    };

    const handleDelete = (brand) => {
        var ids = [];
        if (brand.length > 0) {
            ids = brand.map((value) => {
                return { item1: value.id, item2: value.rowVersion };
            });
        } else {
            ids = [{ item1: brand.id, item2: brand.rowVersion }];
        }

        dispatch(setAddLoading(true))
        NewsLetterArchiveServices.updateMultipleStatus({
            args: {
                idsRowVersion: ids,
                status: RecStatusValuebyName.Archived,
                ...location,
            },
        }).then((response) => {
            if (response.data.data) {
                dispatch(
                    setAlertMessage({
                        view: true,
                        type: "success",
                        message: ValidationMsgs.newsLetterArchive.deleted,
                    })
                );
                getNewsLetterArchive();
                setColumnFilteringOptions((prevData) => {
                    let prevFilterData = prevData.filter((currentFilterObj) => {
                        return currentFilterObj.field !== "id"
                    })
                    return prevFilterData
                })
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
        }).catch((errors) => {
            if (errors.response.data.Errors.Error) {
                dispatch(
                    setAlertMessage({
                        message: errors.response.data.Errors.Error,
                        type: "danger",
                    })
                );
            } else {
                dispatch(
                    setAlertMessage({ message: ValidationMsgs.newsLetterArchive.notDeleted, type: "danger" })
                );
            }
            dispatch(setAddLoading(false))
        });
        setOpenDeleteModal(false);
    };

    useEffect(() => {
        DropdownServiceCls.getDropdownValues("adminuser").then((response) => {
            setUserNameValues(response.data.data);
        });
    }, []);

    const moreFilterOptions = useMemo(
        () => [
            {
                name: "Created Date",
                columnName: "createddate",
                options: [],
                type: "date",
            },
            {
                name: "Created By",
                options: userNameValues,
                columnName: "createdBy",
                type: "checkbox",
            },
            {
                name: "Updated Date",
                columnName: "modifiedDate",
                options: [],
                type: "date",
            },
            {
                name: "Updated By",
                options: userNameValues,
                columnName: "modifiedBy",
                type: "checkbox",
            },
            {
                name: "Status",
                columnName: "recStatus",
                options: RecStatusValue,
                type: "radio",
                conditionalSearch: true,
            }
        ], [userNameValues]);

    return (
        <>
            <title>{TitleNameHelper({ defaultTitleName: "Newsletter Archive" })}</title>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full">
                <div className="sm:flex sm:justify-between sm:items-center mb-8">
                    <div className="col-span-full w-full flex justify-between items-center">
                        <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
                            {TitleNameHelper({ defaultTitleName: "Testimonial" })}
                        </h1>
                        {(permission?.isEdit || permission?.isDelete) &&
                            <div className="flex flex-wrap sm:auto-cols-max gap-2">
                                <NavLink
                                    to={"create"}
                                    className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                                >
                                    <span className="material-icons-outlined">add</span>
                                    <span className="ml-1">Add Newsletter</span>
                                </NavLink>
                            </div>}
                    </div>
                </div>
                <Messages />
                <div className="col-span-full w-full bg-white shadow-xxl rounded-md mb-8 relative">
                    <ReactTable
                        COLUMNS={COLUMNS}
                        DATA={Data}
                        {...paginationData}
                        setTablePageSize={(value) =>
                            setPaginationDataFunc("pageSize", value)
                        }
                        fetchData={getNewsLetterArchive}
                        sortingOptions={sortingOptions}
                        setSortingOptions={setSortingOptionHandler}
                        // column filters
                        editColumnFilter={true}
                        filteringOptions={filteringOptions}
                        setColumnFilteringOptions={setColumnFilteringOptions}
                        CheckBoxAction={useCallback(
                            ({ ...rest }) => (
                                <CheckBoxAction
                                    setBrand={setBrand}
                                    setSelectedRows={setSelectedRows}
                                    setOpenDeleteModal={setOpenDeleteModal}
                                    permission={permission}
                                    {...rest}
                                />
                            ),
                            []
                        )}
                        setSelectedRows={setSelectedRows}
                        moreFilterOption={moreFilterOptions}
                        selectedRows={selectedRows}
                        saveFilter={{ show: true, tabName: pathname + '_' + 'All' }}
                        hiddenColumns={[(permission?.isDelete ? '' : 'rowSelection')]}
                    />
                </div>
            </div>
            <ConfirmDelete
                handleDelete={handleDelete}
                data={brand}
                message={ValidationMsgs.newsLetterArchive.deletePermanently}
                title={"Delete"}
                openDeleteModal={openDeleteModal}
                setOpenDeleteModal={setOpenDeleteModal}
            />
            <BasicModal
                handleConfirmation={statusChangedHandler}
                openModal={openBasicModal}
                setOpenModal={setOpenBasicModal}
                {...basicModalInfo}
            />
        </>
    );
};

export default List;