import React, { useState, useEffect, useCallback, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { paginationDetails, CurrencySymbolByCode, anniesAnnualData } from "global/Enum";

import OrderService from "services/admin/order/OrderService";
import { DateTimeFormat, TitleNameHelper } from "services/common/helper/Helper";

import ReactTable from "components/common/table/ReactTableServerSide";

const DashboardOrders = ({ DropDownData, DataFromDate }) => {
  const reduxData = useSelector((store) => store);

  const [Data, setData] = useState([]);
  const [paginationData, setPaginationData] = useState({ ...paginationDetails });
  const [filteringOptions, setColumnFilteringOptions] = useState([]);
  const [hidden, setHidden] = useState(false);
  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "",
      direction: 0,
      priority: 0,
    },
  ]);

  const [tempSortingOptions, setTempSortingOptions] = useState([]);

  const setSortingOptionHandler = (column, direction) => {
    setSortingOptions([
      {
        field: column,
        direction: direction,
        priority: 0,
      },
    ]);
  };

  const getLast10OrdersData = () => {
    if (DropDownData) {
      OrderService.getOrderDashboardData({
        args: {
          pagingStrategy: 0,
          sortingOptions,
          filteringOptions,
        },
        filter: DropDownData,
        storeId: [anniesAnnualData.storeId],
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
      });
    }
  }

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (e && e?.target && e?.target?.className && typeof e?.target?.className === "string" && !e?.target?.className.includes("CurrentItem")) {
        setHidden(false);
      }
    });
  }, [document]);

  useEffect(() => {
    getLast10OrdersData();
  }, [filteringOptions, sortingOptions, DropDownData]);

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
      id: "totalItems",
      Header: "ITEMS",
      accessor: "totalItems",
      column_name: "totalItems",
      disableSortBy: true,
      Cell: ({ value }) => {
        return value || value === 0 ? (
          <>
            <div className="text-left w-20">{value} Items</div>
          </>
        ) : (
          "-"
        );
      },
    },
    {
      id: "orderTotal",
      Header: `TOTAL (${CurrencySymbolByCode.USD})`,
      accessor: "orderTotal",
      column_name: "orderTotal",
      disableSortBy: true,
      Cell: ({ value }) => {
        return value || value === 0 ? (
          <>
            <div className="text-left">{parseInt(value).toFixed(2)}</div>
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
      column_name: "orderDate",
      disableSortBy: true,
      Cell: ({ value }) => {
        return value ? (
          <>
            <div className="text-left">{DateTimeFormat(value).date}</div>
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

  const handleApplyFilter = () => {
    setSortingOptions(tempSortingOptions);
    setHidden((prevValue) => !prevValue);
  };
  const clearFilter = () => {
    setTempSortingOptions([]);
  };

  return (
    <>
      <title>{TitleNameHelper({ defaultTitleName: "Last 10 Orders" })} </title>
      {/* <!-- Orders --> */}

      <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-md">
        <div className="flex px-5 py-4 border-b-2 border-neutral-200 justify-between items-center sticky top-0 z-10 bg-white">
          <div className="font-semibold text-base lg:text-xl text-gray-700 inline-block">
            {TitleNameHelper({ defaultTitleName: "Last 10 Orders" })}
            <div className="text-sm">
              {/* Duration : */}
              <span className={"ml-1 text-sm text-cyan-600"}>
                ( {DataFromDate} )
              </span>
            </div>
          </div>
          <div className=" inline-flex CurrentItem">
            <div className="relative inline-flex CurrentItem">
              <button
                className="CurrentItem btn bg-white border-neutral-200 hover:border-neutral-300 text-gray-500 hover:text-gray-600"
                aria-haspopup="true"
                onClick={() => setHidden((prevValue) => !prevValue)}
              >
                <span className="sr-only CurrentItem">Filter</span>
                <wbr />
                <svg
                  className="w-4 h-4 fill-current CurrentItem"
                  viewBox="0 0 16 16"
                >
                  <path d="M9 15H7a1 1 0 010-2h2a1 1 0 010 2zM11 11H5a1 1 0 010-2h6a1 1 0 010 2zM13 7H3a1 1 0 010-2h10a1 1 0 010 2zM15 3H1a1 1 0 010-2h14a1 1 0 010 2z" />
                </svg>
              </button>
              <div
                className={`origin-top-left z-10 absolute top-full right-0 min-w-56 bg-white border border-neutral-200 pt-1.5 rounded shadow-lg overflow-hidden mt-1 ${hidden ? "" : "hidden"
                  }`}
              >
                <div className="text-xs font-semibold text-gray-400 uppercase pt-1.5 pb-2 px-4">
                  Filters
                </div>
                <ul className="mb-4 CurrentItem">
                  <li className="py-1 px-3 CurrentItem">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox CurrentItem"
                        checked={
                          tempSortingOptions
                            ? tempSortingOptions.some(
                              (Obj) => Obj.field === "orderDate")
                            : false
                        }
                        onChange={(e) => {
                          if (e.target.checked) {
                            setTempSortingOptions((prevState) => [
                              ...prevState,
                              {
                                field: "orderDate",
                                direction: 0,
                                priority: 0,
                              },
                            ]);
                          } else {
                            setTempSortingOptions((prevState) =>
                              prevState.filter(
                                (sortingObj) =>
                                  sortingObj?.field !== "orderDate"
                              )
                            );
                          }
                        }}
                      />
                      <span className="text-sm font-medium ml-2 CurrentItem">
                        Sort By Date
                      </span>
                    </label>
                  </li>
                  <li className="py-1 px-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox CurrentItem"
                        checked={
                          tempSortingOptions
                            ? tempSortingOptions.some(
                              (Obj) => Obj.field === "status")
                            : false
                        }
                        onChange={(e) => {
                          if (e.target.checked) {
                            setTempSortingOptions((prevState) => [
                              ...prevState,
                              {
                                field: "status",
                                direction: 0,
                                priority: 0,
                              },
                            ]);
                          } else {
                            setTempSortingOptions((prevState) =>
                              prevState.filter(
                                (sortingObj) => sortingObj?.field !== "status"
                              )
                            );
                          }
                        }}
                      />
                      <span className="text-sm font-medium ml-2 CurrentItem">
                        Sort By Status
                      </span>
                    </label>
                  </li>
                  <li className="py-1 px-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox CurrentItem"
                        checked={
                          tempSortingOptions
                            ? tempSortingOptions.some(
                              (Obj) => Obj.field === "captureOrder")
                            : false
                        }
                        onChange={(e) => {
                          if (e.target.checked) {
                            setTempSortingOptions((prevState) => [
                              ...prevState,
                              {
                                field: "captureOrder",
                                direction: 0,
                                priority: 0,
                              },
                            ]);
                          } else {
                            setTempSortingOptions((prevState) =>
                              prevState.filter(
                                (sortingObj) =>
                                  sortingObj?.field !== "captureOrder"
                              )
                            );
                          }
                        }}
                      />
                      <span className="text-sm font-medium ml-2 CurrentItem">
                        Sort By Capture
                      </span>
                    </label>
                  </li>
                  <li className="py-1 px-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox CurrentItem"
                        checked={
                          tempSortingOptions
                            ? tempSortingOptions.some(
                              (Obj) => Obj.field === "orderTotal")
                            : false
                        }
                        onChange={(e) => {
                          if (e.target.checked) {
                            setTempSortingOptions((prevState) => [
                              ...prevState,
                              {
                                field: "orderTotal",
                                direction: 0,
                                priority: 0,
                              },
                            ]);
                          } else {
                            setTempSortingOptions((prevState) =>
                              prevState.filter(
                                (sortingObj) =>
                                  sortingObj?.field !== "orderTotal"
                              )
                            );
                          }
                        }}
                      />
                      <span className="text-sm font-medium ml-2 CurrentItem">
                        Total Spent
                      </span>
                    </label>
                  </li>
                </ul>
                <div className="py-4 px-3 border-t border-neutral-200 bg-slate-50">
                  <ul className="flex items-center justify-between">
                    <li>
                      <button
                        className="btn-xs bg-white border-neutral-200 hover:border-neutral-300 text-gray-500 hover:text-gray-600 CurrentItem"
                        onClick={clearFilter}
                      >
                        Clear
                      </button>
                    </li>
                    <li>
                      <button
                        className="btn-xs bg-indigo-500 hover:bg-indigo-600 text-white"
                        onClick={handleApplyFilter}
                      >
                        Apply
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="overflow-x-auto">
            <ReactTable
              COLUMNS={COLUMNS}
              DATA={Data}
              fetchData={() => { }}
              sortingOptions={sortingOptions}
              setSortingOptions={setSortingOptionHandler}
              setColumnFilteringOptions={setColumnFilteringOptions}
              filteringOptions={filteringOptions}
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
export default DashboardOrders;
