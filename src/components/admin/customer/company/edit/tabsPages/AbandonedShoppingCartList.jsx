/*Component Name: RequestConsultation
Component Functional Details: User can create or update RequestConsultation master details from here.
Created By: Shrey Patel
Created Date: 02/28/2023
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateTimeFormat, serverError } from "services/common/helper/Helper";
import { CurrencySymbolByCode, defaultImage, paginationDetails } from "global/Enum";
import ReactTable from "components/common/table/ReactTableServerSide";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { ValidationMsgs } from "global/ValidationMessages";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import AbandonedShoppingCartService from "services/admin/customer/AbandonedShoppingCartService";
import AbandonedCartPrintTemplate from "./../../../AbandonedShoppingCart/AbandonedCartPrintTemplate";
import Image from "components/common/formComponent/Image";
import CompanyInformationServices from "services/admin/companyInformation/CompanyInformationServices";

const RequestConsultation = ({ CompanyInfo }) => {
    const permission = useSelector((store) => store.permission);
    const dispatch = useDispatch();

    const [Data, setData] = useState([]);
    const [CustomerId, setCustomerId] = useState(0);
    const [ShowViewCart, setShowViewCart] = useState(false);
    const [sortingOptions, setSortingOptions] = useState([
        {
            field: "name",
            direction: 0,
            priority: 0,
        },
    ]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [filteringOptions, setColumnFilteringOptions] = useState([]);
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

    const COLUMNS = [
        {
            id: "customerId",
            Header: "Customer Id",
            accessor: "customerId",
            column_name: "customerId",
            Cell: ({ value, row }) => {
                return value ? value : "";
            },
        },
        {
            id: "shoppingCartId",
            Header: "ShoppingCart Id",
            accessor: "shoppingCartId",
            column_name: "shoppingCartId",
            Cell: ({ value, row }) => {
                return row ? (
                    <>
                        <div className="w-full flex justify-start items-center group">
                            <div className="text-sm font-normal">{value ? value : ""}</div>
                        </div>
                    </>
                ) : (
                    ""
                );
            },
        },
        {
            id: "subTotal",
            Header: `Order Total (${CurrencySymbolByCode.USD})`,
            accessor: "subTotal",
            column_name: "subTotal",
            Cell: ({ value }) => {
                return value ? (
                    <>
                        <div className="text-left">{parseInt(value).toFixed(2)}</div>
                    </>
                ) : (
                    "0.00"
                );
            },
        },
        {
            id: "name",
            Header: "First Name",
            accessor: "name",
            column_name: "name",
            Cell: ({ value, row }) => {
                return row ? (
                    <>
                        <div
                            className="w-full flex justify-start items-center group"
                            style={{ width: "200px" }}
                        >
                            <div className="text-sm font-normal">{value ? value : ""}</div>
                        </div>
                    </>
                ) : (
                    ""
                );
            },
        },
        {
            id: "email",
            Header: "Email",
            accessor: "email",
            column_name: "email",
        },
        {
            id: "storeLogoUrl",
            Header: "Store Logo",
            accessor: "storeLogoUrl",
            column_name: "storeLogoUrl",
            disableSortBy: true,
            Cell: ({ value, row }) => {
                return value !== null && value !== "" && value !== undefined ? (
                    <>
                        <div className="flex items-center ">
                            <Image
                                className="w-20"
                                containerHeight={"h-20"}
                                src={value}
                                alt={row.name}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex items-center ">
                            <Image
                                className="w-20"
                                containerHeight={"h-20"}
                                src={defaultImage}
                            />
                        </div>
                    </>
                );
            },
        },
        {
            id: "storeName",
            Header: "Store Name",
            accessor: "storeName",
            column_name: "storeName",
            Cell: ({ value, row }) => {
                return row ? (
                    <>
                        <div className="w-full flex justify-start items-center group">
                            <div className="text-sm font-normal">{value ? value : ""}</div>
                        </div>
                    </>
                ) : (
                    ""
                );
            },
        },
        {
            id: "createdDate",
            Header: "Created On",
            accessor: "createdDate",
            column_name: "createdDate",
            Cell: ({ value }) => {
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
            id: "",
            Header: "View Cart",
            accessor: "",
            column_name: "",
            disableSortBy: true,
            Cell: ({ value, row }) => {
                return (
                    <>
                        <div className="w-full flex justify-start items-center group">
                            <span
                                className="material-icons-outlined text-indigo-700 text-2xl cursor-pointer"
                                onClick={() => {
                                    setShowViewCart(true);
                                    setCustomerId(row.original.customerId);
                                }}
                            >
                                visibility
                            </span>
                        </div>
                    </>
                );
            },
        },
        {
            id: "sendMail",
            Header: "Send Mail",
            accessor: "",
            column_name: "sendMail",
            disableSortBy: true,
            Cell: ({ value, row }) => {
                return row ? (
                    <>
                        <div className="w-full flex justify-start items-center group">
                            <span
                                className="material-icons-outlined text-indigo-700 text-2xl cursor-pointer"
                                onClick={() => {
                                    SendEmail(row.original.customerId);
                                }}
                            >
                                mail
                            </span>
                        </div>
                    </>
                ) : (
                    ""
                );
            },
        },
    ];

    const getAbandonedShoppingCartList = useCallback(
        (pageIndex = 1) => {
            dispatch(setAddLoading(true));
            CompanyInformationServices.getAbandonedShoppingCartByCompanyId({
                args: {
                    pageSize: paginationData.pageSize,
                    pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
                    sortingOptions,
                    filteringOptions,
                },
                companyId: CompanyInfo.id,
            })
                .then((response) => {
                    setData(response?.data?.data?.items);
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
                })
                .catch(() => {
                    dispatch(setAddLoading(false));
                });
        },
        [
            filteringOptions,
            paginationData.pageSize,
            sortingOptions,
            paginationData.pageIndex,
        ]
    );
    const handleSort = (sortValue) => { };

    const SendEmail = (CustomerDataId) => {
        dispatch(setAddLoading(true));
        AbandonedShoppingCartService.sendAbandonedShoppingCartMail(CustomerDataId, false)
            .then((response) => {
                if (response.data.success) {
                    dispatch(
                        setAlertMessage({
                            type: "success",
                            message: ValidationMsgs.profile.myAccount.emailSend,
                        })
                    );
                    dispatch(setAddLoading(false));
                } else {
                    dispatch(
                        setAlertMessage({ type: "danger", message: serverError(response) })
                    );
                }
                dispatch(setAddLoading(false));
            })
            .catch(() => {
                dispatch(
                    setAlertMessage({
                        type: "success",
                        message: ValidationMsgs.profile.myAccount.emailNotSend,
                    })
                );
                dispatch(setAddLoading(false));
            });
    };

    const moreFilterOptions = useMemo(
        () => [
            {
                name: "Created On",
                columnName: "createdDate",
                options: [],
                type: "date",
            },
            // {
            //     name: "Status",
            //     columnName: "recStatus",
            //     options: RecStatusValueForForm,
            //     type: "radio",
            //     conditionalSearch: true,
            // },
        ],
        []
    );

    return (
        <>
            {ShowViewCart ? (
                <AbandonedCartPrintTemplate
                    CustomerId={CustomerId}
                    ShowViewCart={ShowViewCart}
                    setShowViewCart={setShowViewCart}
                    title={`View Cart`}
                />
            ) : (
                <ReactTable
                    COLUMNS={COLUMNS}
                    DATA={Data}
                    {...paginationData}
                    setTablePageSize={(value) => setPaginationDataFunc("pageSize", value)}
                    fetchData={getAbandonedShoppingCartList}
                    sortingOptions={sortingOptions}
                    setSortingOptions={setSortingOptionHandler}
                    handleSort={handleSort}
                    // column filters
                    editColumnFilter={false}
                    filteringOptions={filteringOptions}
                    setColumnFilteringOptions={setColumnFilteringOptions}
                    setSelectedRows={setSelectedRows}
                    moreFilterOption={false}
                    selectedRows={selectedRows}
                    hiddenColumns={[
                        "rowSelection",
                        permission?.isEdit || permission?.isDelete ? "" : "sendMail",
                    ]}
                />
            )}
        </>
    );
};

export default RequestConsultation;
