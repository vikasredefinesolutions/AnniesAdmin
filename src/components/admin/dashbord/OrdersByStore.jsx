import React, { useState, useEffect, useCallback, useMemo } from "react";
import ReactTable from "components/common/table/ReactTableServerSide";
import { paginationDetails, CurrencySymbolByCode, anniesAnnualData } from "global/Enum";
import OrderService from "services/admin/order/OrderService";
import { DateTimeFormat, TitleNameHelper } from "services/common/helper/Helper";
import { NavLink } from "react-router-dom";

const OrdersByStore = ({ DataFromDate, DropDownData }) => {
  const [Data, setData] = useState([]);
  const [TotalDataCount, setTotalDataCount] = useState([]);

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
  const getOrdersByStore = useCallback(
    (pageIndex) => {
      return
      if (DropDownData) {
        OrderService.getOrdersByStoreData({
          args: {
            pageSize: paginationData.pageSize,
            pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
            // pagingStrategy: 0,
            sortingOptions,
            filteringOptions,
          },
          storeId: anniesAnnualData.storeId,
          filter: DropDownData
        }).then((response) => {
          setData(response?.data?.data?.items);
          setTotalDataCount(response.data.data);
          setPaginationData((prevState) => ({
            ...prevState,
            pageIndex: response.data.data.pageIndex,
            pageSize: response.data.data.pageSize,
            totalCount: response.data.data.totalCount,
            totalPages: response.data.data.totalPages,
            hasPreviousPage: response.data.data.hasPreviousPage,
            hasNextPage: response.data.data.hasNextPage,
          }));
        });
      }
    },
    [
      filteringOptions,
      paginationData.pageSize,
      sortingOptions,
      paginationData.pageIndex,
      DropDownData
    ]
  );

  useEffect(() => {
    getOrdersByStore();
  }, [DropDownData]);

  const COLUMNS = [
    {
      id: "orderNo",
      Header: "ORDER NO.",
      accessor: "id",
      column_name: "orderNo",
      disableSortBy: true,
      Cell: ({ value, row }) => {
        return value ? (
          <>
            <div>
              <NavLink to={"/admin/Order/Orders/edit/" + row.original.id}>
                <div className="font-medium text-indigo-500">#{value}</div>
              </NavLink>
            </div>
          </>
        ) : (
          "-"
        );
      },
    },
    {
      id: "items",
      Header: "ITEMS",
      accessor: "totalItems",
      column_name: "items",
      disableSortBy: true,
      Cell: ({ value }) => {
        return value || value === 0 ? (
          <>
            <div className="font-semibold text-left">{value} Items</div>
          </>
        ) : (
          "-"
        );
      },
    },
    {
      id: "total",
      Header: `TOTAL (${CurrencySymbolByCode.USD})`,
      accessor: "orderTotal",
      column_name: "total",
      disableSortBy: true,
      Cell: ({ value }) => {
        return value ? (
          <>
            <div className="font-semibold text-left">{parseInt(value).toFixed(2)}</div>
          </>
        ) : (
          "-"
        );
      },
    },
    {
      id: "date",
      Header: "DATE",
      accessor: "orderDate",
      column_name: "date",
      disableSortBy: true,
      Cell: ({ value }) => {
        return value ? (
          <>
            <div className="font-semibold text-left">
              {DateTimeFormat(value).date}
            </div>
          </>
        ) : (
          "-"
        );
      },
    },
    {
      id: "printLabel",
      Header: "PRINT LABEL",
      accessor: "printLabel",
      column_name: "printLabel",
      disableSortBy: true,
      Cell: ({ value, row }) => {
        return value ? (
          <>
            <div className="text-xs inline-flex font-medium border border-green-300 bg-green-100 text-green-600 rounded-md text-center px-2.5 py-1">
              {value}
            </div>
          </>
        ) : (
          "-"
        );
      },
    },
    {
      id: "captureOrder",
      Header: "CAPTURE ORDER",
      accessor: "captureOrder",
      column_name: "captureOrder",
      disableSortBy: true,
      Cell: ({ value }) => {
        return value ? (
          <>
            <div className="text-xs inline-flex font-medium border border-blue-300 bg-indigo-100 text-blue-600 rounded-md text-center px-2.5 py-1 ">
              {value}
            </div>
          </>
        ) : (
          "-"
        );
      },
    },
  ];

  return (
    <>
      <title>{TitleNameHelper({ defaultTitleName: "Orders By Store" })} </title>
      {/* <!-- OrdersByStore --> */}
      <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-md">
        <div className="flex px-5 py-4 border-b-2 border-neutral-200 justify-between items-center sticky top-0 z-10 bg-white">
          <div className="font-semibold text-base lg:text-xl text-gray-700 inline-block">
            {TitleNameHelper({ defaultTitleName: "Orders By Store" })} :{" "}
            <span className="ml-1">
              Total Orders : {TotalDataCount?.totalCount ? TotalDataCount?.totalCount : 0}
            </span>
            <div className="text-sm">
              Duration :
              <span className={"ml-1 text-sm text-cyan-600"}>
                ( {DataFromDate} )
              </span>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto h-[420px]">
          <ReactTable
            COLUMNS={COLUMNS}
            DATA={Data}
            {...paginationData}
            setTablePageSize={(value) =>
              setPaginationDataFunc("pageSize", value)
            }
            fetchData={getOrdersByStore}
            sortingOptions={sortingOptions}
            setSortingOptions={setSortingOptionHandler}
            hiddenColumns={useMemo(() => ["rowSelection"], [])}
            displaySearch={false}
            filters={false}
            tablePadding={"0"}
          />
        </div>
      </div>
    </>
  );
};
export default OrdersByStore;
