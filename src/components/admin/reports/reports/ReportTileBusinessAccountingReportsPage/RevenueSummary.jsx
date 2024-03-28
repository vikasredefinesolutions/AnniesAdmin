import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import ReactTable from "components/common/table/ReactTableServerSide";
import {
  paginationDetails,
  CurrencySymbolByCode,
  anniesAnnualData,
} from "global/Enum";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import Select from "components/common/formComponent/Select";
import { serverError } from "services/common/helper/Helper";
import "react-datepicker/dist/react-datepicker.css";
import BusinessAccountingService from "services/admin/reports/businessAccountingReports/BusinessAccountingReports";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { ValidationMsgs } from "global/ValidationMessages";
import Messages from "components/common/alerts/messages/Index";
import { NavLink } from "react-router-dom";

const RevenueSummary = () => {
  const dispatch = useDispatch();
  const [Data, setData] = useState([]);
  const store = anniesAnnualData.storeId;
  const [year, setYear] = useState([]);
  const [yearData, setYearData] = useState({});
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

  const getRevenueSummary = useCallback(
    (pageIndex = 1) => {
      if (yearData.value) {
        let date = new Date(yearData.value, 1, 1);
        if (date && store) {
          dispatch(setAddLoading(true));
          let newobj = {
            args: {
              pageSize: paginationData.pageSize,
              pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
              sortingOptions,
              filteringOptions,
            },
            storeId: store ? [store] : [0],
            year: date,
          };
          BusinessAccountingService.getRevenueSummary(newobj).then(
            (response) => {
              setData(response.data.data);
              setPaginationData((prevState) => ({
                ...prevState,
                pageIndex: response?.data?.data?.details?.pageIndex,
                pageSize: response?.data?.data?.details?.pageSize,
                totalCount: response?.data?.data?.details?.totalCount,
                totalPages: response?.data?.data?.details?.totalPages,
                hasPreviousPage: response?.data?.data?.details?.hasPreviousPage,
                hasNextPage: response?.data?.data?.details?.hasNextPage,
              }));
              dispatch(setAddLoading(false));
            }
          );
        }
      }
    },
    [
      store,
      yearData,
      filteringOptions,
      paginationData.pageSize,
      sortingOptions,
      paginationData.pageIndex,
    ]
  );

  const Export = (pageIndex) => {
    let date = new Date(yearData.value, 1, 1);
    dispatch(setAddLoading(true));
    BusinessAccountingService.ExportRevenueSummary({
      args: {
        pageIndex: 0,
        pageSize: paginationData.pageSize,
        pagingStrategy: 0,
        sortingOptions,
        filteringOptions,
      },
      storeId: store ? store : 0,
      year: date,
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.commonExport.success,
            })
          );
          window.location.href = response.data.data;
        } else {
          dispatch(
            setAlertMessage({
              type: "danger",
              message: serverError(response),
            })
          );
        }
        dispatch(setAddLoading(false));
      })
      .catch((error) => {
        dispatch(
          setAlertMessage({
            type: "danger",
            message: ValidationMsgs.commonExport.failed,
          })
        );
        dispatch(setAddLoading(false));
      });
  };

  useEffect(() => {
    if (store && yearData.value) {
      getRevenueSummary();
    }
  }, [store, yearData.value]);

  const yearDropdown = () => {
    const now = new Date().getUTCFullYear();
    const years = Array(now - (now - 5))
      .fill("")
      .map((v, idx) => {
        return {
          label: now - idx,
          value: now - idx,
        };
      });

    setYear(years);
    setYearData(years[0]);
  };

  useEffect(() => {
    yearDropdown();
  }, []);

  const COLUMNS = [
    {
      id: "srNo",
      Header: "srNo",
      accessor: "srNo",
      column_name: "srNo",
      Cell: ({ value }) => {
        return value ? (
          <>
            <div>{value}</div>
          </>
        ) : (
          "0"
        );
      },
      Footer: "Total",
    },
    {
      id: "month",
      Header: "Month",
      accessor: "month",
      column_name: "month",
      Cell: ({ value }) => {
        return value ? (
          <>
            <div className="text-left">{value}</div>
          </>
        ) : (
          "-"
        );
      },
    },
    {
      id: "totalOrders",
      Header: "total Orders",
      accessor: "totalOrders",
      column_name: "totalOrders",
      Cell: ({ value }) => {
        return value ? (
          <>
            <div className="text-left">{parseInt(value).toFixed(2)}</div>
          </>
        ) : (
          "0.00"
        );
      },
      Footer: () => {
        return <>{Data?.total?.totalOrdersTotal.toFixed(2)}</>;
      },
    },
    {
      id: "subTotal",

      Header: `subTotal (${CurrencySymbolByCode.USD})`,
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
      Footer: () => {
        return (
          <>
            {CurrencySymbolByCode.USD}
            {Data?.total?.totalSubTotal.toFixed(2)}
          </>
        );
      },
    },
    {
      id: "tax",
      Header: `tax (${CurrencySymbolByCode.USD})`,
      accessor: "tax",
      column_name: "tax",
      Cell: ({ value }) => {
        return value ? (
          <>
            <div className="text-left">{parseInt(value).toFixed(2)}</div>
          </>
        ) : (
          "0.00"
        );
      },
      Footer: () => {
        return (
          <>
            {CurrencySymbolByCode.USD}
            {Data?.total?.totalTax.toFixed(2)}
          </>
        );
      },
    },
    {
      id: "shipping",
      Header: `shipping (${CurrencySymbolByCode.USD})`,
      accessor: "shipping",
      column_name: "shipping",
      Cell: ({ value }) => {
        return value ? (
          <>
            <div className="text-left">{parseInt(value).toFixed(2)}</div>
          </>
        ) : (
          "0.00"
        );
      },
      Footer: () => {
        return (
          <>
            {CurrencySymbolByCode.USD}
            {Data?.total?.totalShipping.toFixed(2)}
          </>
        );
      },
    },
    {
      id: "refund",
      Header: `refund (${CurrencySymbolByCode.USD})`,
      accessor: "refund",
      column_name: "refund",
      Cell: ({ value }) => {
        return value ? (
          <>
            <div className="text-left">{parseInt(value).toFixed(2)}</div>
          </>
        ) : (
          "0.00"
        );
      },
      Footer: () => {
        return (
          <>
            {CurrencySymbolByCode.USD}
            {Data?.total?.totalRefund.toFixed(2)}
          </>
        );
      },
    },
    {
      id: "discount",
      Header: `discount (${CurrencySymbolByCode.USD})`,
      accessor: "discount",
      column_name: "discount",
      Cell: ({ value }) => {
        return value ? (
          <>
            <div className=" text-left">{parseInt(value).toFixed(2)}</div>
          </>
        ) : (
          "0.00"
        );
      },
      Footer: () => {
        return (
          <>
            {CurrencySymbolByCode.USD}
            {Data?.total?.totalDiscount.toFixed(2)}
          </>
        );
      },
    },
    {
      id: "adjustmentAmount",
      Header: `ADJ. AMOUNT (${CurrencySymbolByCode.USD})`,
      accessor: "adjustmentAmount",
      column_name: "adjustmentAmount",
      Cell: ({ value }) => {
        return value ? (
          <>
            <div className=" text-left">{parseInt(value).toFixed(2)}</div>
          </>
        ) : (
          "0.00"
        );
      },
      Footer: () => {
        return (
          <>
            {CurrencySymbolByCode.USD}
            {Data?.total?.totalAdjustmentAmount.toFixed(2)}
          </>
        );
      },
    },
    {
      id: "total",
      Header: `total (${CurrencySymbolByCode.USD})`,
      accessor: "total",
      column_name: "total",
      Cell: ({ value }) => {
        return value ? (
          <>
            <div className=" text-left">{parseInt(value).toFixed(2)}</div>
          </>
        ) : (
          "0.00"
        );
      },
      Footer: () => {
        return (
          <>
            {CurrencySymbolByCode.USD}
            {Data?.total?.totalTotal.toFixed(2)}
          </>
        );
      },
    },
  ];
  return (
    <>
      <title>Revenue Summary</title>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto">
        <div className="flex justify-between mb-8">
          <div className="flex items-center">
            <NavLink
              className="btn border-neutral-200 hover:border-neutral-400 text-gray-500 hover:text-gray-700 flex items-center mr-2"
              to={"/admin/reports"}
            >
              <span className="material-icons-outlined">west </span>
            </NavLink>
            <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
              Revenue Summary
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" className="text-indigo-500" onClick={Export}>
              Export
            </button>
          </div>
        </div>
        <Messages />
        <div className="bg-white shadow-xxl rounded-md mb-8">
          <div className="p-6 flex items-center justify-end">
            <div className="inline-flex flex-wrap justify-between items-center">
              <Select
                onChange={(e) => {
                  if (e) {
                    setYearData((prevState) => ({
                      ...prevState,
                      value: e.value,
                    }));
                  }
                }}
                isClearable={false}
                defaultValue={yearData.value}
                classNames={"w-[150px]"}
                options={year}
                isMulti={false}
              />
            </div>
          </div>

          <div className="overflow-x-auto max-h-screen">
            <ReactTable
              COLUMNS={COLUMNS}
              DATA={Data?.details?.items || []}
              {...paginationData}
              setTablePageSize={(value) =>
                setPaginationDataFunc("pageSize", value)
              }
              fetchData={getRevenueSummary}
              sortingOptions={sortingOptions}
              setSortingOptions={setSortingOptionHandler}
              setColumnFilteringOptions={setColumnFilteringOptions}
              filteringOptions={filteringOptions}
              hiddenColumns={["rowSelection"]}
              footer={true}
              displaySearch={false}
              filters={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default RevenueSummary;
