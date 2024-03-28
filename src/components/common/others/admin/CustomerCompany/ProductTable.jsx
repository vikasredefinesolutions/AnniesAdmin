/*Component Name: ProductTable
Component Functional Details: User can create or update ProductTable master details from here.
Created By: Shrey Patel
Created Date: 01/11/2023
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { CurrencySymbolByCode, defaultImage } from 'global/Enum';
import { paginationDetails } from 'global/Enum';
import Status from 'components/common/displayStatus/Status';
import ImageComponent from 'components/common/formComponent/Image';
import { DateTimeFormat } from 'services/common/helper/Helper';
import { setAddLoading } from 'redux/globalLoader/GlobalLoaderAction';
import ReactTableServerSide from 'components/common/table/ReactTableServerSide';

const Table = ({ API, CompanyId, CustomerId, ColumnHeaderDate, ColumnHeaderCount, ColumnHide, accessorDate, columnNameDate, accessorViewCount, columnNameCount }) => {
    const dispatch = useDispatch();

    const COLUMNS = [
        {
            id: "image",
            Header: "Image",
            accessor: "productImage",
            column_name: "image",
            disableSortBy: true,
            Cell: ({ value }) => {
                return value && value !== "" ? (
                    <div className="h-14 w-14 flex items-center justify-center overflow-hidden  box-content border bg-white">
                        <ImageComponent src={value} containerHeight={""} className="max-h-full" />
                    </div>
                ) :
                    <div className="h-14 w-14 flex items-center justify-center overflow-hidden  box-content border bg-white">
                        <ImageComponent src={defaultImage} className="max-h-full" />
                    </div>
            }
        },
        {
            id: "sku",
            Header: "sku",
            accessor: "ourSKU",
            column_name: "sku",
        },
        {
            id: "name",
            Header: "Title",
            accessor: "name",
            column_name: "name",
            Cell: ({ value, row }) => {
                return row ? (
                    <>
                        <div
                            className="w-full flex justify-start items-center group text-indigo-500"
                            style={{ width: "200px" }}
                        >
                            <div>
                                {row?.original?.url ?
                                    <a href={`${row?.original?.url}/${row?.original.sename}.html`} target="_blank" >{value}</a> : ''
                                }
                            </div>
                        </div>
                    </>
                ) : (
                    " "
                );
            },
        },
        {
            id: "status",
            Header: "Status",
            accessor: "recStatus",
            column_name: "status",
            disableSortBy: true,
            Cell: ({ value }) => {
                return (
                    <Status type={value} />
                )
            }
        },
        {
            id: "productCount",
            Header: "Quantity",
            accessor: "productCount",
            column_name: "productCount",
        },
        {
            id: "ourcost",
            Header: `Estimated Cost (${CurrencySymbolByCode.USD})`,
            accessor: "ourcost",
            column_name: "ourcost",
            Cell: ({ value }) => {
                return value ? parseFloat(value).toFixed(2) : '0.00'
            }
        },
        {
            id: "salePrice",
            Header: `Default List Price (${CurrencySymbolByCode.USD})`,
            accessor: "salePrice",
            column_name: "salePrice",
            Cell: ({ value }) => {
                return value ? parseFloat(value).toFixed(2) : '0.00'
            }
        },
        {
            id: "category",
            Header: "Category",
            accessor: "category",
            column_name: "category",
        },
        {
            id: ColumnHeaderDate,
            Header: ColumnHeaderDate,
            accessor: accessorDate,
            column_name: columnNameDate,
            Cell: ({ value }) => {
                return value ? (
                    <>
                        <div >{DateTimeFormat(value).date} </div>
                        <div className="text-[#707070] text-xs font-normal">
                            {DateTimeFormat(value).time}
                        </div>
                    </>
                ) :
                    ""
            },
        },
        {
            id: ColumnHeaderCount,
            Header: ColumnHeaderCount,
            accessor: accessorViewCount,
            column_name: columnNameCount,
        },
    ];
    const [filteringOptions, setColumnFilteringOptions] = useState([]);
    const [sortingOptions, setSortingOptions] = useState([
        {
            field: "name",
            direction: 0,
            priority: 0,
        },
    ]);
    const [Data, setData] = useState([]);
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

    const getProductData = useCallback(
        (pageIndex = 1) => {
            dispatch(setAddLoading(true))
            if (API instanceof Function) {
                API({
                    args: {
                        pageSize: paginationData.pageSize,
                        pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
                        sortingOptions,
                        filteringOptions,
                    },
                    comapnyid: CompanyId || 0,
                    customerId: CustomerId || 0
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
            }
        },
        [filteringOptions,
            paginationData.pageSize,
            sortingOptions,
            paginationData.pageIndex]
    );

    return (

        <ReactTableServerSide
            COLUMNS={COLUMNS}
            DATA={Data}
            {...paginationData}
            setTablePageSize={(value) =>
                setPaginationDataFunc("pageSize", value)
            }
            fetchData={getProductData}
            sortingOptions={sortingOptions}
            setSortingOptions={setSortingOptionHandler}
            hiddenColumns={ColumnHeaderCount === "Wishlist Count" ? ['rowSelection', 'Wishlist Count'] : ['rowSelection']}
            tablePadding={'px-4 pb-4'}
            displaySearch={true}
            filters={false}
        />

    );
};

export default Table;
