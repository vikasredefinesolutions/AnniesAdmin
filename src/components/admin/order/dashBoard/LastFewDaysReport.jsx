import React, { useState, useEffect, useCallback, useMemo } from "react";
import DashBoardServices from "services/admin/order/DashBoardServices";
import ReactTable from "components/common/table/ReactTableServerSide";
import { useDispatch } from "react-redux";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { DateTimeFormat } from "services/common/helper/Helper";
import { paginationDetails, CurrencySymbolByCode } from "global/Enum";

import { Link } from "react-router-dom";

const LastFewDaysReport = ({ title, store }) => {
  const [Data, setData] = useState([]);
  const dispatch = useDispatch();

  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "name",
      direction: 0,
      priority: 0,
    },
  ]);
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

  const getOrdersFewDaysReport = useCallback(
    (pageIndex = 1) => {
      if (store?.value) {
        dispatch(setAddLoading(true));
        DashBoardServices.getOrdersFewDaysReport({
          args: {
            pageSize: paginationData.pageSize,
            pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
            sortingOptions,
            filteringOptions,
          },
          storeid: store?.value
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
        })
      }
    },
    [
      store?.value,
      filteringOptions,
      paginationData.pageSize,
      sortingOptions,
      paginationData.pageIndex,
    ]
  );

  useEffect(() => {
    getOrdersFewDaysReport();
  }, [store?.value])


  const COLUMNS = [
    {
      id: "customerName",
      Header: "Customer NAME",
      accessor: "customerName",
      column_name: "customerName",
      Cell: ({ value, row }) => {
        return value ? (
          <>
            <Link to={"/admin/Customer/customer/edit/" + row?.original?.customerId}>
              <div>{value}</div>
            </Link>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "orderNo",
      Header: "Order Number",
      accessor: "orderNo",
      column_name: "orderNo",
      Cell: ({ value, row }) => {
        return value ? (
          <>
            <Link to={"/admin/Order/orders/edit/" + row?.original?.orderNo}>
              <div className="text-indigo-500">#{value}</div>
            </Link>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "orderNote",
      Header: "Order Note",
      accessor: "orderNote",
      column_name: "orderNote",
      Cell: ({ value }) => {
        return value ? (
          <>
            <div>{value}</div>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "orderIsCancel",
      Header: "Order Is Cancel",
      accessor: "orderIsCancel",
      column_name: "orderIsCancel",
      Cell: ({ value }) => {
        return value ? (
          <>
            <div>{value}</div>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "totalItems",
      Header: "Total Items",
      accessor: "totalItems",
      column_name: "totalItems",
      Cell: ({ value }) => {
        return value ? (
          <>
            <div>{value}</div>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "subTotal",
      Header: `Sub Total (${CurrencySymbolByCode.USD})`,
      accessor: "subTotal",
      column_name: "subTotal",
      Cell: ({ value }) => {
        return value ? (
          <>
            <div>{parseInt(value).toFixed(2)}</div>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "total",
      Header: `Total (${CurrencySymbolByCode.USD})`,
      accessor: "total",
      column_name: "total",
      Cell: ({ value }) => {
        return value ? (
          <>
            <div>{parseInt(value).toFixed(2)}</div>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "orderDate",
      Header: "Order Date",
      accessor: "orderDate",
      column_name: "orderDate",
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
  ];

  return (
    <>
      <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-md">
        <div className="lex px-5 py-4 border-b-2 border-neutral-200 justify-between items-center">
          <div className="text-base lg:text-xl text-gray-700 inline-block font-semibold">
            {title}
            <div className="text-sm">
              Store :
              <span className={"ml-1 text-sm text-orange-600"}>
                {store?.label}
              </span>
              {/* <span className={"ml-1 text-sm text-cyan-600"}>
                ( {DataFromDate} )
              </span> */}
            </div>
          </div>
        </div>
        <div className="w-full rounded-md mb-8 h-[467px] overflow-y-scroll">
          <ReactTable
            COLUMNS={COLUMNS}
            DATA={Data}
            {...paginationData}
            setTablePageSize={(value) => setPaginationDataFunc("pageSize", value)}
            fetchData={getOrdersFewDaysReport}
            sortingOptions={sortingOptions}
            setSortingOptions={setSortingOptionHandler}
            setColumnFilteringOptions={setColumnFilteringOptions}
            editColumnFilter={true}
            filteringOptions={filteringOptions}
            moreFilter={false}
            displaySearch={false}
            filters={false}
            hiddenColumns={useMemo(() => ["rowSelection"], [])}
            tablePadding={"0"}
          />
        </div>
      </div>
    </>
  );
};

export default LastFewDaysReport;
