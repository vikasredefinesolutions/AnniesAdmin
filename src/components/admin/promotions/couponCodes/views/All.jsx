// /*Component Name: All
// Component Functional Details: User can create or update All master details from here.
// Created By: Shrey Patel
// Created Date: 07/14/22
// Modified By: chandan
// Modified Date: <Modified Date> */


import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";

import { serverError } from "services/common/helper/Helper";
import PromotionsService from 'services/admin/promotions/PromotionsService';
import { DateTimeFormat } from 'services/common/helper/Helper';
import DropdownService from "services/common/dropdown/DropdownService";

import ConfirmDelete from "components/common/modals/ConfirmDelete";
import BasicModal from "components/common/modals/Basic";
import ReactTable from 'components/common/table/ReactTableServerSide';
import Status from 'components/common/displayStatus/Status';

import { ValidationMsgs } from "global/ValidationMessages";
import { paginationDetails, RecStatusValuebyName, RecStatusValueForPromotionFilter, RecStatusValueForForm, anniesAnnualData } from "global/Enum";

import SalesDiscountReport from '../create/SalesDiscountReport';
import Actions from "../../couponCodes/list/Actions";

const All = ({ activeTab, filterData, storeFilter, tab }) => {
    const { pathname } = useLocation();
    const dispatch = useDispatch();

    const location = useSelector((store) => store?.location);

    const [Data, setData] = useState([]);
    // const [initialColumnFilterOrder, setInitialColumnFilterOrder] = useState([]);
    const [filteringOptions, setColumnFilteringOptions] = useState(filterData);
    const [selectedRows, setSelectedRows] = useState([]);
    const [Promotions, setPromotions] = useState(null);
    const [ModalInfo, setModalInfo] = useState({});
    const [openBasicModal, setOpenBasicModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [OpenManageLogoLocation, setOpenManageLogoLocation] = useState(false);
    const [paginationData, setPaginationData] = useState({ ...paginationDetails });
    // const [Store, setStore] = useState([]);
    const [Users, setUsers] = useState([]);
    const [discountOptions, setDiscountOptions] = useState([]);

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

    const handleLogoLocationModel = (id) => {
        setOpenManageLogoLocation(!OpenManageLogoLocation);
        setPromotions(id);
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

    const getAllData = useCallback((pageIndex = 1) => {
        if (anniesAnnualData.storeId) {
            dispatch(setAddLoading(true));
            PromotionsService.getPromotions({
                args: {
                    pageSize: paginationData.pageSize,
                    pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
                    sortingOptions,
                    filteringOptions: [...filteringOptions,
                    {
                        field: "storeId",
                        // operator: storeFilter === 0 ? "0" : 1,
                        operator: 1,
                        value: anniesAnnualData.storeId,
                    },
                    ]
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
                dispatch(setAddLoading(false));
            }).catch(() => {
                dispatch(setAddLoading(false));
            });
        }
    }, [
        filteringOptions,
        paginationData.pageSize,
        sortingOptions,
        activeTab,
    ]);

    const getStoreDropdownData = useCallback(() => {
        // DropdownService.getDropdownValues("store", false).then((res) => {
        //     if (res.data.success && res.data.data) {
        //         setStore(() => {
        //             return res.data.data;
        //         });
        //     }
        // });
        DropdownService.getDropdownValues("adminuser", false).then((res) => {
            if (res.data.success && res.data.data) {
                setUsers(() => {
                    return res.data.data;
                });
            }
        });

    }, []);

    const getDiscountDropdownData = useCallback(() => {
        DropdownService.getDropdownValues("promotion", true, anniesAnnualData.storeId).then((response) => {
            setDiscountOptions(() => {
                return response.data.data;
            });
        });
    }, [])

    useEffect(() => {
        getStoreDropdownData()
        getDiscountDropdownData();
    }, [getStoreDropdownData, getDiscountDropdownData])

    // useEffect(() => {
    //     getAllData()
    // }, [storeFilter])

    const COLUMNS = [
        {
            id: "name",
            Header: "Discount Name",
            accessor: "name",
            column_name: "name",
            disableShowHide: true,
            Cell: ({ value, row }) => {
                return value ? (
                    <>
                        <div className="w-full flex justify-start items-center group">
                            <div>
                                <Link to={"/admin/promotions/couponCodes/edit/" + row.original.id}>{value}</Link>
                            </div>
                        </div>
                    </>
                ) : (
                    ""
                );
            },
        },
        {
            id: "storeName",
            Header: "Stores",
            accessor: "storeName",
            column_name: "storeName",
            isVisible: false,
            disableShowHide: true,
            Cell: ({ value, row }) => {
                return row ? (
                    <>
                        <div  > {value} </div >
                    </>
                ) : (
                    ""
                );
            },
        },
        {
            id: "discountCode",
            Header: "Discount Code",
            accessor: "discountCode",
            column_name: "discountCode",
            disableSortBy: true,
            Cell: ({ value }) => {

                if (!value) {
                    return "";
                } else {
                    return value;
                }
            },
        },
        {
            id: "couponUsedCount",
            Header: "Users",
            accessor: "couponUsedCount",
            column_name: "couponUsedCount",
            Cell: ({ value }) => {
                if (!value) {
                    return 0 + " Used";
                } else {
                    return value + " Used";
                }
            },
        },
        {
            id: "createdDate",
            Header: "Created date",
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
            id: "createdName",
            Header: "Created By",
            accessor: "createdName",
            column_name: "createdName",
            Cell: ({ value }) => {
                if (!value) {
                    return "";
                } else {
                    return value;
                }
            },
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
            Header: "UpdatedBy",
            accessor: "modifiedName",
            column_name: "modifiedName",
            Cell: ({ value }) => {
                if (!value) {
                    return "";
                } else {
                    return value;
                }
            },
        },
        {
            id: "status",
            Header: "Promotions Status",
            accessor: "status",
            column_name: "Status",
            Cell: ({ value, row }) => {
                return <div className='w-34'><Status type={value} /></div>;
            },
        },
        {
            id: "recStatus",
            Header: "Status",
            accessor: "recStatus",
            column_name: "recStatus",
            Cell: ({ value, row }) => {
                return <div className='w-34'><Status type={value} /></div>;
            },
        },
        {
            id: "viewOrder",
            accessor: "id",
            disableSortBy: true,
            /* column_name: "abc", */
            Cell: ({ value }) => {
                return (
                    <>
                        <button
                            className="text-indigo-500 inline-block w-44"
                            data-modal-toggle="ManageLocationModal"
                            onClick={() => { handleLogoLocationModel(value) }}
                            type="button"
                        >
                            {"View Orders"}
                        </button>
                    </>
                )
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
                        setPromotions={setPromotions}
                        setOpenDeleteModal={setOpenDeleteModal}
                        setModalInfo={setModalInfo}
                        setOpenBasicModal={setOpenBasicModal}
                        editUrl={`/admin/promotions/couponCodes/edit/${row.original.id}`}
                    />
                );
            },
            disableSortBy: true,
            disableShowHide: true,
        },
    ];

    const moreFilterOptions = useMemo(
        () => [
            {
                name: "Discount Name",
                columnName: "id",
                options: discountOptions,
                type: "checkbox",
                conditionalSearch: true,
            },
            {
                name: "Promotions Status",
                columnName: "Status",
                options: RecStatusValueForPromotionFilter,
                type: "radio",
                conditionalSearch: true,
            },
            {
                name: "Status",
                columnName: "recStatus",
                options: RecStatusValueForForm,
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
                name: "Created By",
                options: Users,
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
                options: Users,
                columnName: "modifiedBy",
                type: "checkbox",
            },
        ],
        [filteringOptions, Data]
    );

    const handleSort = () => { };

    const statusChangedHandler = (data) => {
        if (data?.id) {
            dispatch(setAddLoading(true))

            const statusNotUpdated = ValidationMsgs.promotions.promotionStatusNotUpdated;
            PromotionsService.MultipleUpdatePromotionStatusByIds({
                args: {
                    idsRowVersion: [
                        {
                            "item1": data?.id,
                            "item2": data?.rowVersion
                        }
                    ],
                    status: data?.changeStatus,
                    ...location,
                },
            }).then((response) => {
                if (response.data.data) {
                    dispatch(
                        setAlertMessage({
                            view: true,
                            type: "success",
                            message: ValidationMsgs.promotions.promotionStatusUpdated,
                        })
                    );
                    getAllData();
                    getDiscountDropdownData();
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
                        setAlertMessage({ message: statusNotUpdated, type: "danger" })
                    );
                }
                dispatch(setAddLoading(false))

            });
        }
        setOpenBasicModal(false);
    };

    const handleDelete = (Promotions) => {
        var ids = [];
        dispatch(setAddLoading(true))

        if (Promotions?.length > 0) {
            ids = Promotions?.map((value) => {
                return { item1: value.id, item2: value.rowVersion };
            });
        } else {
            ids = [{ item1: Promotions.id, item2: Promotions.rowVersion }];
        }
        const PromotionsNotDelete = ValidationMsgs.promotions.notDelete;
        PromotionsService.MultipleUpdatePromotionStatusByIds({
            args: {
                idsRowVersion: ids,
                status: RecStatusValuebyName.Archived,
                ...location,
            },
        })
            .then((response) => {
                if (response.data.data) {
                    if (response?.data?.data[0].data.item1 === false) {
                        dispatch(
                            setAlertMessage({
                                type: "danger",
                                message: response?.data?.data[0].data.item2,
                            })
                        );
                        dispatch(setAddLoading(false))
                    } else {
                        dispatch(
                            setAlertMessage({
                                type: "success",
                                message: ValidationMsgs.promotions.deleted,
                            })
                        );
                        getAllData();
                        dispatch(setAddLoading(false))
                    }
                } else {
                    dispatch(
                        setAlertMessage({
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
                            type: "danger",
                            message: errors.response.data.Errors.Error,
                        })
                    );
                } else {
                    dispatch(
                        setAlertMessage({ message: PromotionsNotDelete, type: "danger" })
                    );
                }
                dispatch(setAddLoading(false))

            });
        setOpenDeleteModal(false);
    };

    return (
        <>
            <div>
                {(OpenManageLogoLocation && Promotions !== null) && (
                    <SalesDiscountReport OpenDiscountReport={OpenManageLogoLocation} setOpenDiscountReport={setOpenManageLogoLocation} id={Promotions} />
                )}
                <div className='w-full'>
                    <div className="col-span-full w-full bg-white shadow-xxl rounded-md relative">
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
                            setSelectedRows={setSelectedRows}
                            moreFilterOption={moreFilterOptions}
                            selectedRows={selectedRows}
                            saveFilter={{ show: true, tabName: pathname + '_' + tab?.value }}
                            buttonText={'Saved'}
                            // extraFilter={[{ Component: ActionButton, saveFilterOptionsHandler }]}
                            // setInitialColumnFilterOrder={setInitialColumnFilterOrder}
                            hiddenColumns={["rowSelection"]}
                        />
                    </div>
                </div>

                <ConfirmDelete
                    handleDelete={handleDelete}
                    data={Promotions}
                    message={ValidationMsgs.promotions.deletePermanently}
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
            </div>
        </>
    );
};

export default All;