/*Component Name: SalesDiscountReport
Component Functional Details: User can create or update SalesDiscountReport master details from here.
Created By: Shrey Patel
Created Date: Current Date
Modified By: Chandan
Modified Date: <Modified Date> */

import React, { useState, useCallback } from "react";
import ReactTable from "components/common/table/ReactTableServerSide";
import PromotionsService from "services/admin/promotions/PromotionsService";
import { CurrencySymbolByCode, paginationDetails } from "global/Enum";
import { DateTimeFormat } from "services/common/helper/Helper";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { useDispatch } from "react-redux";

const SalesDiscountReport = ({ OpenDiscountReport, setOpenDiscountReport, id }) => {
    const dispatch = useDispatch();

    const [data, setData] = useState([]);
    const COLUMNS = [
        {
            id: "orderNumber",
            Header: "orders",
            accessor: "orderNumber",
            column_name: "orderNumber",
        },
        {
            id: "customerName",
            Header: "Customer Name",
            accessor: "customerName",
            column_name: "customerName",
        },
        {
            id: "orderSubTotalValue",
            Header: " Sub Total",
            accessor: "orderSubTotalValue",
            column_name: "orderSubTotalValue",
            Cell: ({ value,row }) => {
                return value ?`${CurrencySymbolByCode.USD} ${value}`: ""
            },
            Footer: () => {
                return (
                  <>
                    {CurrencySymbolByCode.USD}
                  </>
                );
              },

        },
        {
            id: "discount",
            Header: "Total Discounts",
            accessor: "discount",
            column_name: "discount",
            Cell: ({ value }) => {
                return value ? CurrencySymbolByCode.USD + value : ""
            }
        },
        {
            id: "discountCode",
            Header: "discount code",
            accessor: "discountCode",
            column_name: "discountCode",
            disableShowHide: true,
        },
        {
            id: "discountType",
            Header: "discount type",
            accessor: "discountType",
            column_name: "discountType",
        },
        {
            id: "orderDate",
            Header: "Order Date",
            accessor: "orderDate",
            column_name: "orderDate",
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
        ];
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
        const getDiscountReportData = useCallback(
            (pageIndex) => {
            dispatch(setAddLoading(true))

            PromotionsService.getDiscountReport({
                promotionsId: id,
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
    const handleSort = (sortValue) => { };

    return (
        <>
            <div id="viewhistoryModal"
                aria-hidden="true"
                className={`${!OpenDiscountReport && "hidden"
                    } overflow-y-auto overflow-x-hidden fixed z-30 right-0 left-0 top-4 justify-center items-center h-modal md:h-full md:inset-0`}
            >
                <div className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="relative px-4 w-full max-w-6xl h-full md:h-auto">
                        <div className="relative bg-white rounded-lg shadow max-h-screen overflow-y-auto">
                            <div className="flex justify-between items-start p-5 rounded-t border-b sticky z-20 top-0 left-0 bg-white">
                                <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl">
                                    Sales by discount report
                                </h3>
                                <button
                                    onClick={() => setOpenDiscountReport((prev) => !prev)}
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                                    data-modal-toggle="viewhistoryModal"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                </button>
                            </div>

                            <div className="">
                                <ReactTable
                                    COLUMNS={COLUMNS}
                                    DATA={data}
                                    {...paginationData}
                                    setTablePageSize={(value) =>
                                        setPaginationDataFunc("pageSize", value)
                                    }
                                    fetchData={getDiscountReportData}
                                    sortingOptions={sortingOptions}
                                    setSortingOptions={setSortingOptionHandler}
                                    handleSort={handleSort}
                                    // column filters
                                    filteringOptions={filteringOptions}
                                    displaySearch={false}
                                    tablePadding={'1'}
                                    filters={false}
                                    hiddenColumns={["rowSelection"]}

                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SalesDiscountReport;
