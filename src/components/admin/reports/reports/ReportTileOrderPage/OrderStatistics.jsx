import React, { useState, useEffect, forwardRef, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import { subDays } from "date-fns";

import { paginationDetails, CurrencySymbolByCode, anniesAnnualData } from "global/Enum";
import { ValidationMsgs } from "global/ValidationMessages";

import { DateTimeFormat, serverError } from "services/common/helper/Helper";
import OrderService from "services/admin/reports/order/orderServices";

import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";

import ReactTable from "components/common/table/ReactTableServerSide";
import Messages from "components/common/alerts/messages/Index";

import "react-datepicker/dist/react-datepicker.css";

const OrderStatistics = () => {
  const dispatch = useDispatch();

  const [Data, setData] = useState([]);
  const [startDate, setstartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());

  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "name",
      direction: 0,
      priority: 0,
    },
  ]);
  const [filteringOptions, setColumnFilteringOptions] = useState([]);
  const [paginationData, setPaginationData] = useState({ ...paginationDetails });

  const toDatePicker = useRef();

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

  const getOrderStatistics = (pageIndex = 1) => {
    dispatch(setAddLoading(true));
    OrderService.getOrderStatisticsReport({
      args: {
        pageSize: paginationData.pageSize,
        pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
        sortingOptions,
        filteringOptions,
      },
      storeId: [anniesAnnualData.storeId],
      startDate: startDate,
      endDate: endDate,
    }).then((response) => {
      setData(response.data.data);
      setPaginationData((prevState) => ({
        ...prevState,
        pageIndex: response.data.data.details.pageIndex,
        pageSize: response.data.data.details.pageSize,
        totalCount: response.data.data.details.totalCount,
        totalPages: response.data.data.details.totalPages,
        hasPreviousPage: response.data.data.details.hasPreviousPage,
        hasNextPage: response.data.data.details.hasNextPage,
      }));
      dispatch(setAddLoading(false));
    });
  }

  const Export = (pageIndex) => {
    dispatch(setAddLoading(true));
    OrderService.ExportOrderStatisticsReport({
      args: {
        pageIndex: 0,
        pageSize: paginationData.pageSize,
        pagingStrategy: 0,
        sortingOptions,
        filteringOptions,
      },
      storeId: [anniesAnnualData.storeId],
      startDate: startDate,
      endDate: endDate,
    }).then((response) => {
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
    }).catch((error) => {
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
    getOrderStatistics();
  }, [startDate,
    endDate,
    filteringOptions,
    paginationData.pageSize,
    sortingOptions,
    paginationData.pageIndex,]);

  const onStartDateChangeHandler = (date) => {
    setstartDate(date);
    toDatePicker.current.input.click();
  };

  const onEndDateChangeHandler = (date) => {
    setendDate(date);
  };

  const onClick = () => {
    getOrderStatistics();
  };

  const COLUMNS = [
    {
      id: "day",
      Header: "day",
      accessor: "day",
      column_name: "day",
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
      Footer: "Total",
    },
    {
      id: "totalOrders",
      Header: "TOTAL ORDERS",
      accessor: "totalOrders",
      column_name: "totalOrders",
      Cell: ({ value }) => {
        return value ? (
          <>
            <div className="text-left">{value}</div>
          </>
        ) : (
          "-"
        );
      },
      Footer: () => {
        return <>{Data?.total?.totalOrdersTotal}</>;
      },
    },
    {
      id: "subTotal",
      Header: `SUB TOTAL (${CurrencySymbolByCode.USD})`,
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
      Header: `TAX (${CurrencySymbolByCode.USD})`,
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
      Header: `SHIPPING (${CurrencySymbolByCode.USD})`,
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
      Header: `REFUND (${CurrencySymbolByCode.USD})`,
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
      Header: `DISCOUNT (${CurrencySymbolByCode.USD})`,
      accessor: "discount",
      column_name: "discount",
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
            {Data?.total?.totalAdjustmentAmount.toFixed(2)}
          </>
        );
      },
    },
    {
      id: "total",
      Header: `TOTAL (${CurrencySymbolByCode.USD})`,
      accessor: "total",
      column_name: "total",
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
            {Data?.total?.totalTotal.toFixed(2)}
          </>
        );
      },
    },
  ];
  return (
    <>
      <title>Order statistics</title>
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
              Order statistics
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button className="text-indigo-500" onClick={Export}>
              Export
            </button>
          </div>
        </div>
        <Messages />
        <div className="bg-white shadow-xxl rounded-md mb-8">
          <div className="p-6 flex items-center justify-end">
            <div className="inline-flex flex-wrap justify-between items-center">
              <ExtraComponent
                startDate={startDate}
                endDate={endDate}
                onStartDateChangeHandler={onStartDateChangeHandler}
                onEndDateChangeHandler={onEndDateChangeHandler}
                toDatePicker={toDatePicker}
                onClick={onClick}
              />
            </div>
          </div>

          <div className="max-h-full">
            <ReactTable
              COLUMNS={COLUMNS}
              DATA={Data?.details?.items || []}
              {...paginationData}
              setTablePageSize={(value) =>
                setPaginationDataFunc("pageSize", value)
              }
              fetchData={() => { }}
              sortingOptions={sortingOptions}
              setSortingOptions={setSortingOptionHandler}
              setColumnFilteringOptions={setColumnFilteringOptions}
              filteringOptions={filteringOptions}
              hiddenColumns={["rowSelection"]}
              footer={true}
              filters={false}
              displaySearch={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderStatistics;

const CustomDatePicker = ({
  onChangeHandler,
  defaultDate,
  minDate,
  maxDate,
  refDatePicker,
}) => {
  const CustomInput = forwardRef(({ value, onClick, disabledLogo }, ref) => (
    <button
      type="button"
      className={`w-full h-10 bg-white border text-left border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md ${"className"}`}
      onClick={onClick}
      ref={ref}
    >
      {value}
      {!disabledLogo && (
        <div className="absolute top-0 right-0 px-3 py-2 ">
          <svg
            className="h-6 w-6 text-gray-400 bg-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            ></path>
          </svg>
        </div>
      )}
    </button>
  ));

  return (
    <>
      <div className="w-52">
        <DatePicker
          dateFormat={"MM - dd - yyyy"}
          selected={defaultDate}
          onChange={onChangeHandler}
          minDate={subDays(minDate, 0)}
          maxDate={subDays(maxDate, 0)}
          customInput={<CustomInput disabledLogo={false} />}
          ref={refDatePicker}
        />
      </div>
    </>
  );
};

const ExtraComponent = ({
  startDate,
  endDate,
  onStartDateChangeHandler,
  onEndDateChangeHandler,
  toDatePicker,
  onClick,
}) => {
  return (
    <>
      <div className="flex items-center justify-end">
        <div className="inline-flex flex-wrap justify-between items-center gap-2">
          <CustomDatePicker
            onChangeHandler={onStartDateChangeHandler}
            defaultDate={startDate}
            maxDate={endDate}
          />
          <div className="mx-2">to</div>
          <CustomDatePicker
            onChangeHandler={onEndDateChangeHandler}
            defaultDate={endDate}
            minDate={startDate}
            refDatePicker={toDatePicker}
          />
        </div>
      </div>
      <div className="inline-flex flex-wrap justify-between items-center">
        <div className="ml-2">
          <button
            className="btn px-6 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white"
            onClick={onClick}
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
};
