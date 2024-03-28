import React, { useState, useCallback, useMemo, useEffect } from "react";
import ReactTable from "components/common/table/ReactTableServerSide";
import { DateTimeFormat } from "services/common/helper/Helper";
import { useDispatch, useSelector } from "react-redux";
import { paginationDetails, CurrencySymbolByCode, anniesAnnualData } from "global/Enum";
import Status from "components/common/displayStatus/Status";
import { Link, NavLink } from "react-router-dom";
import DashBoardServices from "services/admin/order/DashBoardServices";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";

const LastFewDaysReport = ({ title, store, DropDownData, DataFromDate }) => {
  const [Data, setData] = useState([]);
  const dispatch = useDispatch();
  const reduxData = useSelector((store) => store);

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

  const getUncapturedOrderData = (pageIndex = 1) => {
    dispatch(setAddLoading(true));
    DashBoardServices.getUncapturedOrderData({
      args: {
        pageSize: paginationData.pageSize,
        pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
        sortingOptions,
        filteringOptions,
      },
      filter: DropDownData,
      storeid: [anniesAnnualData.storeId],
      userId: reduxData?.user?.id,
      companyConfigurationId: reduxData?.CompanyConfiguration?.id,
      startDate: null,
      endDate: null
    }).then((response) => {
      let responseData = response?.data?.data;
      setData(responseData?.items);
      setPaginationData((prevState) => ({
        ...prevState,
        pageIndex: responseData.pageIndex,
        pageSize: responseData.pageSize,
        totalCount: responseData.totalCount,
        totalPages: responseData.totalPages,
        hasPreviousPage: responseData.hasPreviousPage,
        hasNextPage: responseData.hasNextPage,
      }));
      dispatch(setAddLoading(false));
    }).catch(() => {
      dispatch(setAddLoading(false));
    });
  }

  useEffect(() => {
    getUncapturedOrderData();
  }, [DropDownData,
    paginationData.pageSize,
    sortingOptions,
    paginationData.pageIndex,
    filteringOptions,]);

  const COLUMNS = [
    {
      id: "",
      Header: "#",
      accessor: "",
      column_name: "",
      disableSortBy: true,
      Cell: ({ row }) => {
        return row && <div>{row.index + 1}.</div>;
      },
    },
    {
      id: "storeName",
      Header: "Store Name",
      accessor: "storeName",
      column_name: "storeName",
      Cell: ({ value, row }) => {
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
      id: "orderNumber",
      Header: "order",
      accessor: "orderNumber",
      column_name: "orderNumber",
      Cell: ({ value, row }) => {
        return row ? (
          <>
            <div
              className="w-full flex justify-start items-center group"
              style={{ width: "200px" }}
            >
              <div>
                <NavLink
                  to={`/admin/Order/orders/edit/${row?.original?.orderNumber}`}
                  className="font-medium text-indigo-500"
                >
                  <div className="text-sm font-normal">
                    {value ? "#" + value : ""}
                  </div>
                </NavLink>
                {row?.original?.refenceOrderID ? (
                  <div className="text-[#707070] text-sm font-normal">
                    Ref.#{row?.original?.refenceOrderID}{" "}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
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
    {
      id: "customerName",
      Header: "Customer NAME",
      accessor: "customerName",
      column_name: "customerName",
      Cell: ({ value, row }) => {
        return value ? (
          <>
            {/* <Link
              to={"/admin/Customer/customer/edit/" + row?.original?.customerId}
            > */}
            <div>{value}</div>
            {/* </Link> */}
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "email",
      Header: "Email",
      accessor: "email",
      column_name: "email",
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
      id: "orderTotal",
      Header: `Order Total (${CurrencySymbolByCode.USD})`,
      accessor: "orderTotal",
      column_name: "orderTotal",
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
      id: "orderStatus",
      Header: "Status",
      accessor: "orderStatus",
      column_name: "orderStatus",
      Cell: ({ value }) => {
        return <Status type={value} />;
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
              {/* Store :
              <span className={"ml-1 text-sm text-orange-600"}>
                {store?.label}
              </span> */}
              <span className={"ml-1 text-sm text-cyan-600"}>
                ( {DataFromDate} )
              </span>
            </div>
          </div>
        </div>
        <div className="w-full rounded-md mb-8 h-[467px] overflow-y-scroll">
          <ReactTable
            COLUMNS={COLUMNS}
            DATA={Data}
            {...paginationData}
            setTablePageSize={(value) =>
              setPaginationDataFunc("pageSize", value)
            }
            fetchData={() => { }}
            sortingOptions={sortingOptions}
            setSortingOptions={setSortingOptionHandler}
            setColumnFilteringOptions={setColumnFilteringOptions}
            editColumnFilter={false}
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
