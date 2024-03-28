import React, { useState, useEffect, useCallback, useMemo } from "react";
import ReactTable from "components/common/table/ReactTableServerSide";
import { useDispatch, useSelector } from "react-redux";
import { paginationDetails, anniesAnnualData } from "global/Enum";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import DashboardWidgetServices from "services/admin/dashboardWidget/DashboardWidgetServices";
import { TitleNameHelper } from "services/common/helper/Helper";

const TopItemsLowInventory = ({ DropDownData, DataFromDate }) => {
    const [Data, setData] = useState([]);
    const dispatch = useDispatch();
    const reduxData = useSelector((store) => store);
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

    const getTopTenMasterProductLowInventory = () => {
        if (DropDownData) {
            dispatch(setAddLoading(true));
            DashboardWidgetServices.getTopTenMasterProductLowInventory({
                args: {
                    pagingStrategy: 0,
                    sortingOptions,
                    filteringOptions,
                },
                filter: DropDownData,
                storeId: anniesAnnualData.storeId,
                userId: reduxData?.user?.id,
                companyConfigurationId: reduxData?.CompanyConfiguration?.id,
                startDate: null,
                endDate: null
            }).then((response) => {
                setData(response.data.data.items);
                setPaginationData((prevState) => ({
                    ...prevState,
                    pageIndex: response.data.data.pageIndex,
                    pageSize: response.data.data.pageSize,
                }));
                dispatch(setAddLoading(false));
            });
        }
    }

    useEffect(() => {
        getTopTenMasterProductLowInventory();
    }, [filteringOptions, sortingOptions, DropDownData])

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
            Header: "Quantity",
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
            <title>{TitleNameHelper({ defaultTitleName: "Top Items Low Inventory" })} </title>
            {/* <!-- topItemsLowInventory --> */}
            <div className="col-span-full xl:col-span-4 bg-white shadow-lg rounded-md">
                <div className="flex px-5 py-4 border-b-2 border-neutral-200 justify-between items-center sticky top-0 z-10 bg-white">
                    <div className="font-semibold text-base lg:text-xl text-gray-700 inline-block">
                        {TitleNameHelper({ defaultTitleName: "Top Items Low Inventory" })}
                        <div className="text-sm">
                            <span className={"ml-1 text-sm text-cyan-600"}>
                                ( {DataFromDate} )
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="">
                        <ReactTable
                            COLUMNS={COLUMNS}
                            DATA={Data}
                            fetchData={() => { }}
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
export default TopItemsLowInventory;
