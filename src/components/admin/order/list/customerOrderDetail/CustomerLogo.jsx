/*Component Name: CustomerLogo
Component Functional Details: User can create or update CustomerLogo master details from here.
Created By: Happy
Created Date: 11/10/22
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import React, { useState, useCallback } from 'react';
import { paginationDetails } from 'global/Enum';
import ReactTableServerSide from 'components/common/table/ReactTableServerSide';
import { DateTimeFormat } from 'services/common/helper/Helper';
import Status from 'components/common/displayStatus/Status';
import Image from "components/common/formComponent/Image";
import { useDispatch, useSelector } from 'react-redux';
import { setAddLoading } from 'redux/globalLoader/GlobalLoaderAction';
import OrderService from 'services/admin/order/OrderService';
import { saveAs } from 'file-saver';

const CustomerLogo = ({ orderDetails, setCustomLogoId, setAllCustomLogoIData }) => {
    const dispatch = useDispatch();
    const AdminAppConfigReducers = useSelector((store) => store?.AdminAppConfigReducers);

    const handleDownloadImage = (value) => {
        // saveAs(`https://cdn.pixabay.com/photo/2023/03/27/17/40/tree-7881297_1280.jpg`, "myFile.png")
        const myImagePath = `${AdminAppConfigReducers["azure:BlobUrl"]}${value}`
        saveAs(myImagePath, "myFile.png")
    }

    const COLUMNS = [
        {
            id: "status",
            Header: "Status",
            accessor: "status",
            column_name: "status",
            Cell: ({ value, row }) => {
                return value && value.toLowerCase().includes("waiting") ? (
                    <div
                        // to={`/admin/Order/orders/cl/edit/${orderDetails?.customerId}?tab=7&logoId=${row?.original?.customerLogoId}`}
                        onClick={() => {
                            setAllCustomLogoIData(row?.original);
                            setCustomLogoId(row?.original?.customerLogoId);
                        }}
                        className={`text-indigo-500 text-xs inline-block font-medium text-center py-1 w-28 cursor-pointer`}
                    >
                        Waiting For Approval
                    </div>
                ) : (
                    <div className='cursor-pointer' onClick={() => {
                        setAllCustomLogoIData(row?.original);
                        setCustomLogoId(row?.original?.customerLogoId);
                    }}>
                        <Status type={value} />
                    </div>
                );
            },
        },
        {
            id: "logo",
            Header: "Logo",
            accessor: "logo",
            column_name: "logo",
            Cell: ({ value, row }) => {
                return (
                    <div className="group flex items-center relative overflow-hidden w-full">
                        <Image src={value} className="w-20" containerHeight={"h-20"} />
                        {value && (
                            <div
                                className={`w-40 bg-gray-50 opacity-80 h-full transition transform translate-y-8 ease-in-out invisible absolute group-hover:visible group-hover:translate-y-0  cursor-pointer flex justify-center items-center`}
                                onClick={() => handleDownloadImage(value)}
                            >
                                <span className="material-icons-outlined text-red-400 text-4xl">
                                    download
                                </span>
                            </div>
                        )}
                    </div>
                );
            },
        },
        {
            id: "logoName",
            Header: "Logo Name",
            accessor: "logoName",
            column_name: "logoName",
        },
        {
            id: "logoNumber",
            Header: "Logo Number",
            accessor: "logoNumber",
            column_name: "logoNumber",
        },
        {
            id: "logoSize",
            Header: "Logo Size",
            accessor: "logoSize",
            column_name: "logoSize",
        },
        // {
        //     id: "ProductType",
        //     Header: "Product Type",
        //     accessor: "productType",
        //     column_name: "ProductType",
        //     Cell: ({ value, row }) => {
        //         return <div className="flex items-center">
        //             <Image src={value} className="w-20" containerHeight={"h-20"} />
        //         </div>

        //     }
        // },
        {
            id: "logoLocation",
            Header: "Logo Location",
            accessor: "logoLocationImage",
            column_name: "logoLocation",
            Cell: ({ value, row }) => {
                return (
                    <div className="flex items-center">
                        <Image src={value} className="w-20" containerHeight={"h-20"} />
                    </div>
                );
            },
        },
        {
            id: "uploadDate",
            Header: "Upload Date",
            accessor: "uploadDate",
            column_name: "uploadDate",
            Cell: ({ value }) => {
                return value ? (
                    <>
                        <div>{DateTimeFormat(value).date} </div>
                        <div className="text-[#707070] text-xs font-normal">
                            {DateTimeFormat(value).time}
                        </div>
                    </>
                ) : (
                    "-"
                );
            },
        },
        {
            id: "approvedDate",
            Header: "Approved Date",
            accessor: "approvedDate",
            column_name: "approveDate",
            Cell: ({ value }) => {
                return value ? (
                    <>
                        <div>{DateTimeFormat(value).date} </div>
                        <div className="text-[#707070] text-xs font-normal">
                            {DateTimeFormat(value).time}
                        </div>
                    </>
                ) : (
                    "-"
                );
            },
        },

        {
            id: "oldUrl",
            Header: "Old Logo Urls",
            accessor: "oldUrl",
            column_name: "oldUrl",
            Cell: ({ value }) => {
                return (
                    <ul className="w-[50px] relative">
                        <li className="group cursor-pointer relative flex justify-center items-center">
                            logo 1
                            <div className="absolute transition transform translate-y-8 ease-in-out invisible group-hover:visible group-hover:translate-y-0 ">
                                <img
                                    className={`max-h-[70px] `}
                                    src={`https://redefinecommerce.blob.core.windows.net/rdcbeta/1/logolocation/1/details/1006.jpg`}
                                    alt=""
                                />
                                <span>22/05/2023</span>
                            </div>
                        </li>
                    </ul>
                );
            },
        },

        {
            id: "id",
            Header: "",
            accessor: "id",
            column_name: "id",
            disableSortBy: true,
            Cell: ({ value }) => {
                return "";
            },
        },
    ];
    const [Data, setData] = useState([]);
    const [sortingOptions, setSortingOptions] = useState([
        {
            field: "name",
            direction: 0,
            priority: 0,
        },
    ]);
    const [filteringOptions] = useState([]);
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
    const getCustomerLogoData = useCallback(
        (pageIndex) => {
            dispatch(setAddLoading(true));
            OrderService.getCustomerLogoByOrderId({
                args: {
                    pageSize: paginationData.pageSize,
                    pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
                    sortingOptions,
                    filteringOptions: [],
                },
                orderId: orderDetails?.orderNumber,
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
        },
        [
            paginationData.pageSize,
            sortingOptions,
            paginationData.pageIndex,
            orderDetails
        ]
    );
    return (
        <div className='grow' >

            {
                orderDetails?.orderNumber && <ReactTableServerSide
                    COLUMNS={COLUMNS}
                    DATA={Data}
                    {...paginationData}
                    setTablePageSize={(value) =>
                        setPaginationDataFunc("pageSize", value)
                    }
                    fetchData={getCustomerLogoData}
                    filteringOptions={filteringOptions}
                    sortingOptions={sortingOptions}
                    setSortingOptions={setSortingOptionHandler}
                    hiddenColumns={['rowSelection']}
                    // tablePadding={'pb-10'}
                    filters={false}
                    displaySearch={false}
                    actionRelativeCl={`first:pl-2`}
                />
            }


        </div>
    );
};

export default CustomerLogo;
