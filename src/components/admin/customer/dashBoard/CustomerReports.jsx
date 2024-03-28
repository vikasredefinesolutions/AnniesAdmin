import React, { useState, useCallback, useMemo, useEffect, Fragment } from "react";
import ReactTable from "components/common/table/ReactTableServerSide";
import { useDispatch } from "react-redux";
import { paginationDetails, CurrencySymbolByCode } from "global/Enum";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { DateTimeFormat } from "services/common/helper/Helper";
import { format } from "date-fns";
import Status from "components/common/displayStatus/Status";
import DashBoardService from "services/admin/customer/DashBoardService";

const CustomerReports = ({ store, DropDownData, DataFromDate }) => {
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

  const getFrequentlyBuyCustomerListData = useCallback(
    (pageIndex) => {
      if (store?.value) {
        dispatch(setAddLoading(true));
        DashBoardService.getFrequentlyBuyCustomerList({
          args: {
            pageSize: paginationData.pageSize,
            pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
            sortingOptions,
            filteringOptions,
          },
          storeid: store?.value,
          filter: DropDownData,
        })
          .then((response) => {
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
          })
          .catch(() => {
            dispatch(setAddLoading(false));
          });
      }
    },
    [
      store,
      DropDownData,
      filteringOptions,
      sortingOptions,
      paginationData.pageSize,
      paginationData.pageIndex,
    ]
  );

  useEffect(() => {
    getFrequentlyBuyCustomerListData();
  }, [DropDownData, store]);

  const COLUMNS = [
    {
      id: "customerName",
      Header: "Customer Name",
      accessor: "customerName",
      column_name: "customerName",
      Cell: ({ value }) => {
        return value ? <div className="">{value}</div> : "";
      },
    },
    {
      id: "customerEmail",
      Header: "Customer Email",
      accessor: "customerEmail",
      column_name: "customerEmail",
      Cell: ({ value }) => {
        return value ? (
          <>
            <div>{value} </div>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "customerTags",
      Header: "Customer Tags",
      accessor: "customerTags",
      column_name: "customerTags",
      disableSortBy: true,
      Cell: ({ value }) => {
        return value ? (
          <div className="flex flex-wrap gap-1">
            {value.length > 0 &&
              value.map((name, index) => {
                return name ? (
                  <span
                    key={index}
                    className="text-xs inline-flex font-medium border border-neutral-200 bg-slate-100 text-gray-500 rounded-md text-center px-2.5 py-1"
                  >
                    {name}
                  </span>
                ) : (
                  <Fragment key={index}></Fragment>
                );
              })}
          </div>
        ) : (
          ""
        );
      },
    },

    {
      id: "customerLastOrderDate",
      Header: "Last Order Date",
      accessor: "customerLastOrderDate",
      column_name: "customerLastOrderDate",
      Cell: ({ value }) => {
        return value ? (
          <>
            <div>{DateTimeFormat(value).date} </div>
            <div className="text-[#707070] text-xs font-normal">
              {format(new Date(value), "hh:mm a")}
            </div>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "customerOrderCount",
      Header: "Order Count",
      accessor: "customerOrderCount",
      column_name: "customerOrderCount",
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
      id: "customerTotalSpent",
      Header: `Total Spent (${CurrencySymbolByCode.USD})`,
      accessor: "customerTotalSpent",
      column_name: "customerTotalSpent",
      Cell: ({ value }) => {
        return value ? <div className=""> {parseInt(value).toFixed(2)}</div> : "";
      },
    },
    {
      id: "customerStatus",
      Header: "status",
      accessor: "customerStatus",
      column_name: "customerStatus",
      Cell: ({ value }) => {
        return <Status type={value} />;
      },
    },
  ];
  return (
    <>
      <div className="pb-3 col-span-full xl:col-span-8 bg-white shadow-lg rounded-md">
        <div className="flex px-5 py-4 border-b-2 border-neutral-200 justify-between items-center">
          <div className="font-semibold text-base lg:text-xl text-gray-700 inline-block">
            Which are the customers who buy most frequently on the site?
            <div>
              <span className="text-sm">Store : </span>
              <span className={"text-sm text-orange-600"}>{store?.label}</span>
              <span className={"ml-1 text-sm text-cyan-600"}>
                ( {DataFromDate}
                {/* {showInMainDashboard === false ? DataFromDate : extraDataFromDate}{" "} */}
                )
              </span>
            </div>
          </div>
        </div>
        <div>
          <div className="max-h-[550px] overflow-y-auto">
            <ReactTable
              COLUMNS={COLUMNS}
              DATA={Data}
              {...paginationData}
              fetchData={getFrequentlyBuyCustomerListData}
              setTablePageSize={(value) =>
                setPaginationDataFunc("pageSize", value)
              }
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
export default CustomerReports;
