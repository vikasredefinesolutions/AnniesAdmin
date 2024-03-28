import React, { useState, useCallback, useMemo, useEffect } from "react";
import ReactTable from "components/common/table/ReactTableServerSide";
import { useDispatch, useSelector } from "react-redux";
import { paginationDetails, CurrencySymbolByCode, anniesAnnualData } from "global/Enum";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import DashboardWidgetServices from "services/admin/dashboardWidget/DashboardWidgetServices";
import { DateTimeFormat, TitleNameHelper } from "services/common/helper/Helper";

const TopCustomer = ({ DropDownData, DataFromDate, store }) => {
  const [Data, setData] = useState([]);
  const reduxData = useSelector((store) => store);
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

  const getTopCustomerData = () => {
    if (DropDownData) {
      dispatch(setAddLoading(true));
      DashboardWidgetServices.getTopCustomers({
        args: {
          pagingStrategy: 0,
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
    getTopCustomerData();
  }, [DropDownData]);

  const COLUMNS = [
    {
      id: "customerName",
      Header: "Customer Name",
      accessor: "customerName",
      column_name: "customerName",
      Cell: ({ value }) => {
        return value ? (
          <div className="font-semibold text-left">{value}</div>
        ) : (
          ""
        );
      },
    },
    {
      id: "totalItems",
      Header: "Items",
      accessor: "totalItems",
      column_name: "totalItems",
      Cell: ({ value }) => {
        return value ? (
          <div className="font-semibold">{value} Items </div>
        ) : (
          <div className="font-semibold">0 Item</div>
        );
      },
    },
    {
      id: "lastOrderRevenue",
      Header: `Last Order Revenue (${CurrencySymbolByCode.USD})`,
      accessor: "lastOrderRevenue",
      column_name: "lastOrderRevenue",
      Cell: ({ value }) => {
        return value || value === 0 ? (
          <>
            <div className="font-semibold text-left">
              {parseInt(value).toFixed(2)}
            </div>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "lastOrderDate",
      Header: "Last Order Date",
      accessor: "lastOrderDate",
      column_name: "lastOrderDate",
      Cell: ({ value }) => {
        return value ? (
          <>
            <div className="font-semibold">{DateTimeFormat(value).date} </div>
            {/* <div className="text-[#707070] text-xs font-normal">
              {DateTimeFormat(value).time}
            </div> */}
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "totalRevenue",
      Header: `Total Revenue (${CurrencySymbolByCode.USD})`,
      accessor: "totalRevenue",
      column_name: "totalRevenue",
      Cell: ({ value }) => {
        return value || value === 0 ? (
          <>
            <div className="font-semibold text-left">
              {parseInt(value).toFixed(2)}
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
      <title>{TitleNameHelper({ defaultTitleName: "Top 10 Customer" })} </title>
      {/* <!-- TopCustomer --> */}
      <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-md">
        <div className="flex px-5 py-4 border-b-2 border-neutral-200 justify-between items-center sticky top-0 z-10 bg-white">
          <div className="font-semibold text-base lg:text-xl text-gray-700 inline-block">
            {TitleNameHelper({ defaultTitleName: "Top 10 Customer" })}
            <div className="text-sm">
              {/* Duration : */}
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
export default TopCustomer;
