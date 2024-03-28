/*Component Name: RequestConsultation
Component Functional Details: User can create or update RequestConsultation master details from here.
Created By: Shrey Patel
Created Date: 02/28/2023
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import React, { useCallback, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DateTimeFormat, serverError, TitleNameHelper } from 'services/common/helper/Helper';
import { paginationDetails, CurrencySymbolByCode, anniesAnnualData } from "global/Enum";
import ReactTable from 'components/common/table/ReactTableServerSide';
import { setAddLoading } from 'redux/globalLoader/GlobalLoaderAction';
import Messages from "components/common/alerts/messages/Index";
import { ValidationMsgs } from 'global/ValidationMessages';
import { setAlertMessage } from 'redux/alertMessage/AlertMessageReducers';
import AbandonedShoppingCartService from 'services/admin/customer/AbandonedShoppingCartService';
import AbandonedCartPrintTemplate from './AbandonedCartPrintTemplate';
import SendMailModal from './SendMailModal';

const RequestConsultation = () => {
    const permission = useSelector(store => store.permission);
    const dispatch = useDispatch();
    const [Data, setData] = useState([]);
    const [CustomerId, setCustomerId] = useState(0);
    const [ShowViewCart, setShowViewCart] = useState(false);
    const [sendMailModal, setSendMailModal] = useState(false);
    const [sendMailModalData, setSendMailModalData] = useState("");
    const [sortingOptions, setSortingOptions] = useState([
        {
            field: "createdDate",
            direction: 1,
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
            id: "name",
            Header: "Name",
            accessor: "name",
            column_name: "name",
            Cell: ({ value, row }) => {
                return row ? (
                    <>
                        <div className="w-full flex justify-start items-center group" style={{ width: "200px" }}>
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
            id: "email",
            Header: "Email",
            accessor: "email",
            column_name: "email",
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
            id: "createdDate",
            Header: "Created On",
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
            id: "",
            Header: "View Cart",
            accessor: "",
            column_name: "",
            disableSortBy: true,
            Cell: ({ value, row }) => {
                return <>
                    <div className="w-full flex justify-start items-center group">
                        <span className="material-icons-outlined text-indigo-700 text-2xl cursor-pointer" onClick={() => { setShowViewCart(true); setCustomerId(row.original.customerId) }}>
                            visibility
                        </span>
                    </div>
                </>
            },
        },
        // {
        //     id: "sendMail",
        //     Header: "Send Mail",
        //     accessor: "",
        //     column_name: "sendMail",
        //     disableSortBy: true,
        //     Cell: ({ value, row }) => {
        //         return row ? (
        //             <>
        //                 <div className="w-full flex justify-start items-center group">
        //                     <span className="material-icons-outlined text-indigo-700 text-2xl cursor-pointer" onClick={() => { setSendMailModal(true); setCustomerId(row.original.customerId); SendEmail(row.original.customerId, true) }}>
        //                         mail
        //                     </span>
        //                 </div>
        //             </>
        //         ) : (
        //             ""
        //         );
        //     },
        // },
    ];

    const getConsultationAndProof = useCallback(
        (pageIndex = 1) => {
            dispatch(setAddLoading(true));
            AbandonedShoppingCartService.getAbandonedShoppingCartList({
                pageSearchArgs: {
                    pageSize: paginationData.pageSize,
                    pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
                    sortingOptions,
                    filteringOptions,
                },
                storeId: anniesAnnualData.storeId
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
    const handleSort = (sortValue) => { };

    const SendEmail = (CustomerDataId, IsSendEmail) => {
        dispatch(setAddLoading(true));
        AbandonedShoppingCartService.sendAbandonedShoppingCartMail(CustomerDataId, IsSendEmail).then((response) => {
            if (response.data.success) {
                setSendMailModalData(response?.data?.data)
                if (IsSendEmail === false) {
                    dispatch(
                        setAlertMessage({
                            type: "success",
                            message: ValidationMsgs.profile.myAccount.emailSend,
                        })
                    );
                    setSendMailModal(false);
                    setSendMailModalData("");
                }
                dispatch(setAddLoading(false));
            } else {
                dispatch(setAlertMessage({ type: "danger", message: serverError(response) }));
            }
            dispatch(setAddLoading(false))
        }).catch(() => {
            dispatch(
                setAlertMessage({
                    type: "success",
                    message: ValidationMsgs.profile.myAccount.emailNotSend,
                })
            );
            dispatch(setAddLoading(false));
        });
    }

    const moreFilterOptions = useMemo(
        () => [
            {
                name: "Created On",
                columnName: "createdDate",
                options: [],
                type: "date",
            },
        ], []);

    return (
        <>
            <title>{TitleNameHelper({ defaultTitleName: "Abandoned Shopping Cart" })}</title>
            <div className="py-4">
                <div className="px-4 sm:px-6 lg:px-8 w-full items-center flex justify-between sticky top-0 z-20 py-2 bg-slate-100">
                    <div className="col-span-full w-full flex justify-between items-center">
                        <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
                            {TitleNameHelper({ defaultTitleName: "Abandoned Shopping Cart" })}
                        </h1>
                        <div className="ml-328px "></div>
                    </div>
                </div>
                <div className="px-4 sm:px-6 lg:px-8 w-full pt-7">
                    <Messages />
                    <div className="col-span-full w-full bg-white shadow-xxl rounded-md mb-8 relative">
                        {ShowViewCart ?
                            <AbandonedCartPrintTemplate CustomerId={CustomerId} ShowViewCart={ShowViewCart} setShowViewCart={setShowViewCart} title={`View Cart`} />
                            :
                            <ReactTable
                                COLUMNS={COLUMNS}
                                DATA={Data}
                                {...paginationData}
                                setTablePageSize={(value) =>
                                    setPaginationDataFunc("pageSize", value)
                                }
                                fetchData={getConsultationAndProof}
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
                                hiddenColumns={["rowSelection", ((permission?.isEdit || permission?.isDelete) ? '' : 'sendMail')]}
                            />
                        }
                    </div>
                </div>
            </div>

            <SendMailModal
                sendMailModal={sendMailModal}
                setSendMailModal={setSendMailModal}
                setSendMailModalData={setSendMailModalData}
                sendMailModalData={sendMailModalData}
                SendEmail={SendEmail}
                CustomerId={CustomerId}
            />

        </>
    );
};

export default RequestConsultation;
