/*Component Name: List
Component Functional Details: User can create or update List master details from here.
Created By: Shrey Patel
Created Date: 11/03/2023
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import React, { useCallback, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { defaultImage, paginationDetails, RecStatusValuebyName, StatusValue, anniesAnnualData, RecStatusValue } from "global/Enum";
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
import Actions from "./Actions";
import TestimonialServicesCls from "services/admin/testimonial/TestimonialService";

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
                        to={"/admin/Customer/testimonial/edit/" + row.original.id}
                    >
                        <Image src={value} className="w-20" containerHeight={"h-20"} />
                    </NavLink>
                </div>
            ) :
                <div className="flex items-center">
                    <div className="w-40 max-h-40 shrink-0 p-1 sm:p-1 ">
                        <NavLink
                            to={"/admin/Customer/testimonial/edit/" + row.original.id}
                        >
                            <Image src={defaultImage} className="w-20" containerHeight={"h-20"} />
                        </NavLink>
                    </div>
                </div>
        },
    },
    {
        id: "customerName",
        Header: "Customer Name",
        accessor: "customerName",
        column_name: "customerName",
        disableShowHide: true,
        Cell: ({ value, row }) => {
            return row ? (
                <>
                    <div className="w-full flex justify-start items-center group">
                        <NavLink
                            to={"/admin/Customer/testimonial/edit/" + row.original.id} >
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
        id: "customerEmail",
        Header: "Customer Email",
        accessor: "customerEmail",
        column_name: "customerEmail",
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
        id: "comment",
        Header: "Comment",
        accessor: "comment",
        column_name: "comment",
        disableSortBy: true,
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
        id: "authorName",
        Header: "Author",
        accessor: "authorName",
        column_name: "authorName",
    },
    {
        id: "testimonialDate",
        Header: "Testimonial Date",
        accessor: "testimonialDate",
        column_name: "testimonialDate",
        Cell: ({ value }) => {
            return value ? (
                <>
                    <div >{DateTimeFormat(value).date} </div>
                </>
            ) : (
                ""
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
        id: "approveStatus",
        Header: "Approval Status",
        accessor: "approveStatus",
        column_name: "approveStatus",
        Cell: ({ value }) => {
            return value == "A" ? <div className="text-xs inline-block font-medium border border-green-300 bg-green-100 text-green-600 rounded-md text-center px-2.5 py-1 w-28">Approved</div>
                : value == "P" ?
                    <div className="text-xs inline-block font-medium border border-yellow-300 bg-yellow-100 text-yellow-600 rounded-md text-center px-2.5 py-1 w-28">Pending</div>
                    :
                    <div className="text-xs inline-block font-medium border border-red-300 bg-red-100 text-red-600 rounded-md text-center px-2.5 py-1 w-28">Disapproved</div>
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

    const getTestimonialData = useCallback(
        (pageIndex = 1) => {
            dispatch(setAddLoading(true))
            TestimonialServicesCls.getTestimonials({
                args: {
                    pageSize: paginationData.pageSize,
                    pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
                    sortingOptions,
                    filteringOptions,
                },
                storeId: anniesAnnualData.storeId,
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

    const handleSort = (sortValue) => { };

    const statusChangedHandler = (data) => {
        if (data?.id) {
            dispatch(setAddLoading(true))

            TestimonialServicesCls.updateStatus({
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
                            message: ValidationMsgs.testimonial.statusUpdated,
                        })
                    );
                    getTestimonialData();
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
                        setAlertMessage({ message: ValidationMsgs.testimonial.statusNotUpdated, type: "danger" })
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

        TestimonialServicesCls.updateMultipleStatus({
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
                        message: ValidationMsgs.testimonial.deleted,
                    })
                );
                getTestimonialData();
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
                    setAlertMessage({ message: ValidationMsgs.testimonial.notDeleted, type: "danger" })
                );
            }
            dispatch(setAddLoading(false))
        });
        setOpenDeleteModal(false);
    };

    const getRecordHistory = (id) => {
        // setViewHistoryModal(true);
    };

    const moreFilterOptions = useMemo(
        () => [
            {
                name: "Testimonial Date",
                columnName: "testimonialDate",
                options: [],
                type: "date",
            },
            {
                name: "Testimonial Approval",
                columnName: "approveStatus",
                options: StatusValue,
                type: "radio",
                conditionalSearch: true,
            },
            {
                name: "Status",
                columnName: "recStatus",
                options: RecStatusValue,
                type: "radio",
                conditionalSearch: true,
            }
        ]);

    return (
        <>
            <title>{TitleNameHelper({ defaultTitleName: "Testimonial" })}</title>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full">
                <div className="sm:flex sm:justify-between sm:items-center mb-8">
                    <div className="col-span-full w-full flex justify-between items-center">
                        <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
                            {TitleNameHelper({ defaultTitleName: "Testimonial" })}
                        </h1>
                        {(permission?.isEdit || permission?.isDelete) && <div className="flex flex-wrap sm:auto-cols-max gap-2">
                            <NavLink
                                to={"create"}
                                className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                            >
                                <span className="material-icons-outlined">add</span>
                                <span className="ml-1">Add Testimonial</span>
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
                        fetchData={getTestimonialData}
                        sortingOptions={sortingOptions}
                        setSortingOptions={setSortingOptionHandler}
                        handleSort={handleSort}
                        // column filters
                        editColumnFilter={true}
                        filteringOptions={filteringOptions}
                        setColumnFilteringOptions={setColumnFilteringOptions}
                        setSelectedRows={setSelectedRows}
                        moreFilterOption={moreFilterOptions}
                        selectedRows={selectedRows}
                        saveFilter={{ show: true, tabName: pathname + '_' + 'All' }}
                        hiddenColumns={["rowSelection"]}
                    />
                </div>
            </div>
            <ConfirmDelete
                handleDelete={handleDelete}
                data={brand}
                message={ValidationMsgs.testimonial.deletePermanently}
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