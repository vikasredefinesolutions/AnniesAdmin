import React, { useState, useCallback, useMemo } from "react";
import ReactTable from "components/common/table/ReactTableServerSide";
import { useDispatch } from "react-redux";
import { paginationDetails } from "global/Enum";
import StoreService from "services/admin/store/StoreService";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { TitleNameHelper } from "services/common/helper/Helper";

const TopStore = () => {
    const [Data, setData] = useState([]);
    const dispatch = useDispatch();
    const [paginationData, setPaginationData] = useState({
        ...paginationDetails,
    });
    const [filteringOptions, setColumnFilteringOptions] = useState([]);
    const [sortingOptions, setSortingOptions] = useState([
        {
            field: "name",
            direction: 0,
            priority: 0,
        },
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

    const getTopStoreData = useCallback(
        (pageIndex) => {
            dispatch(setAddLoading(true));
            StoreService.getTopStoreData({
                args: {
                    pagingStrategy: 0,
                    sortingOptions,
                    filteringOptions,
                },
            }).then((response) => {
                // setData(response.data.data.items);
                setPaginationData((prevState) => ({
                    ...prevState,
                    pageIndex: response.data.data.pageIndex,
                    pageSize: response.data.data.pageSize,
                }));
                dispatch(setAddLoading(false));
            });
        },
        [filteringOptions, sortingOptions]
    );

    const COLUMNS = [
        {
            id: "items",
            Header: "Items",
            accessor: "items",
            column_name: "items",
            Cell: ({ value }) => {
                return value ? (
                    <>
                        <div className="font-semibold text-left">{value}</div>
                    </>
                ) : (
                    ""
                );
            },
        },
        {
            id: "quantity",
            Header: "Searched",
            accessor: "quantity",
            column_name: "quantity",
            Cell: ({ value }) => {
                return value || value === 0 ? (
                    <>
                        <div className="font-semibold text-left">{value}</div>
                    </>
                ) : (
                    ""
                );
            },
        },
    ];

    return (
        <>
            <title>{TitleNameHelper({ defaultTitleName: "Top Items Searched" })} </title>
            {/* <!-- topstore --> */}
            <div className="col-span-full xl:col-span-4 bg-white shadow-lg rounded-md h-full">
                <div className="flex px-5 py-4 border-b-2 border-neutral-200 justify-between items-center">
                    <div className="font-semibold text-base lg:text-xl text-gray-700 inline-block">
                        {TitleNameHelper({ defaultTitleName: "Top Items Searched" })}
                    </div>
                </div>
                <div>
                    <div className="">
                        <ReactTable
                            COLUMNS={COLUMNS}
                            DATA={Data}
                            fetchData={getTopStoreData}
                            sortingOptions={sortingOptions}
                            setSortingOptions={setSortingOptionHandler}
                            setColumnFilteringOptions={setColumnFilteringOptions}
                            hiddenColumns={useMemo(() => ["rowSelection"], [])}
                            displaySearch={false}
                            filters={false}
                            tablePadding={"0"}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
export default TopStore;
