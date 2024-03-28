/*Component Name: Emails
Component Functional Details:  Emails .
Created By: PK Kher
Created Date: <Creation Date>
Modified By: PK Kher
Modified Date: <Modified Date> */

import React, { useState, useCallback, useEffect } from 'react';
import { paginationDetails } from 'global/Enum';
import ReactTableServerSide from 'components/common/table/ReactTableServerSide';
import { DateTimeFormat } from 'services/common/helper/Helper';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setAddLoading } from 'redux/globalLoader/GlobalLoaderAction';
import CustomerResendEmailModel from './CustomerResendEmailModel';
import MailServices from 'services/admin/mail/MailServices';

const Emails = ({ customerInfo }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const permission = useSelector(store => store?.permission)
    const [ShowResetEmailModel, SetShowResetEmailModel] = useState(false);
    const [EmailDataId, setEmailDataId] = useState(0);

    const COLUMNS = [
        {
            id: "name",
            Header: "Campaign/Flow",
            accessor: "name",
            column_name: "name",
            Cell: ({ value, row }) => {
                return value ? (
                    <>
                        <div className="text-left">{value}</div>
                    </>
                ) : (
                    ""
                );
            },
        },
        {
            id: "sentAt",
            Header: "Scheduled_Sent_At",
            accessor: "sentAt",
            column_name: "sentAt",
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
            id: "status",
            Header: "Status",
            accessor: "status",
            column_name: "status",
            Cell: ({ value, row }) => {
                return value ? (
                    <>
                        <div className="">{value}</div>
                    </>
                ) : (
                    ""
                );
            },
        },
        {
            id: "emailCount",
            Header: "Resend Email count",
            accessor: "emailCount",
            column_name: "emailCount",
        },
        {
            id: "modifiedDate",
            Header: "Last Email Send On",
            accessor: "modifiedDate",
            column_name: "modifiedDate",
            Cell: ({ value }) => {
                return value ? (
                    <>
                        <div >{DateTimeFormat(value).date} </div>
                        <div className="text-[#707070] text-xs font-normal ">
                            {DateTimeFormat(value).time}
                        </div>
                    </>
                ) : (
                    ""
                );
            },
        },
        {
            id: "id",
            Header: "Actions",
            accessor: "id",
            column_name: "id",
            disableSortBy: true,
            disableShowHide: true,
            Cell: ({ row, value }) => {
                return (
                    <>
                        {(permission?.isEdit || permission?.isDelete) &&
                            <span className="text-indigo-500 cursor-pointer text-center" onClick={() => {
                                SetShowResetEmailModel(true);
                                setEmailDataId(row);
                            }}>Resend
                            </span>
                        }
                    </>
                )
            },
        },
    ];
    const [loading/* , setLoading */] = useState(false);
    const [Data, setData] = useState([]);
    const [filteringOptions, setColumnFilteringOptions] = useState([]);

    const [sortingOptions, setSortingOptions] = useState([
        {
            field: "name",
            direction: 0,
            priority: 0,
        },
    ]);
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

    const getEmailListData = useCallback(
        (pageIndex = 1) => {
            dispatch(setAddLoading(true))
            MailServices.getEmailByCustomerId({
                pageSize: paginationData.pageSize,
                pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
                sortingOptions,
                filteringOptions: [...filteringOptions, {
                    field: "toEmail",
                    operator: 0,
                    value: customerInfo.email
                }],
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
        [filteringOptions,
            paginationData.pageSize,
            sortingOptions,
            paginationData.pageIndex, id]
    );

    return (
        <div className='grow'>
            <div className='py-6 space-y-6'>
                <h2 className="text-2xl text-gray-800 font-bold mb-5">Email Log</h2>
                <ReactTableServerSide
                    COLUMNS={COLUMNS}
                    DATA={Data}
                    {...paginationData}
                    setTablePageSize={(value) =>
                        setPaginationDataFunc("pageSize", value)
                    }
                    fetchData={getEmailListData}
                    sortingOptions={sortingOptions}
                    setSortingOptions={setSortingOptionHandler}
                    loading={loading}
                    hiddenColumns={['rowSelection']}
                    tablePadding={'px-4 pb-4'}

                />
            </div>
            {(permission?.isEdit || permission?.isDelete) &&
                <CustomerResendEmailModel
                    storeId={customerInfo.storeId}
                    EmailDataId={EmailDataId}
                    getEmailListData={getEmailListData}
                    filteringOptions={filteringOptions}
                    SetShowResetEmailModel={SetShowResetEmailModel}
                    ShowResetEmailModel={ShowResetEmailModel}
                />
            }
        </div>
    );
};

export default Emails;
