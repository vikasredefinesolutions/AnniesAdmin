import React, { useState, useCallback, useMemo } from "react";
import ReactTable from "components/common/table/ReactTableServerSide";
import { paginationDetails, anniesAnnualData } from "global/Enum";
import DashboardWidgetServices from "services/admin/dashboardWidget/DashboardWidgetServices";
import { TitleNameHelper } from "services/common/helper/Helper";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const DashboardOrders = ({ DropDownData, DataFromDate, store }) => {
  const [Data, setData] = useState([]);
  const reduxData = useSelector((store) => store);
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
  });
  const [filteringOptions, setColumnFilteringOptions] = useState([]);
  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "",
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

  const getTopTenVisitedPages = () => {
    if (DropDownData) {
      DashboardWidgetServices.getTopTenVisitedPages({
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
      });
    }
  }

  useEffect(() => {
    getTopTenVisitedPages();
  }, [filteringOptions, sortingOptions, DropDownData]);

  const COLUMNS = [
    {
      id: "pageName",
      Header: "Page Name",
      accessor: "pageName",
      column_name: "pageName",
      Cell: ({ value }) => {
        return value || value === 0 ? (
          <>
            <div className="text-left w-20" style={{ width: "200px" }}>
              {value}
            </div>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "pageUrl",
      Header: "Page URL",
      accessor: "pageUrl",
      column_name: "pageUrl",
      Cell: ({ value }) => {
        return value ? (
          <>
            <div>
              <a href={value} target="_blank">
                <div className="font-medium text-indigo-500">{value}</div>
              </a>
            </div>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "visitedCount",
      Header: "Visited Count",
      accessor: "visitedCount",
      column_name: "visitedCount",
      Cell: ({ value }) => {
        return value ? (
          <>
            <div className="font-medium">{value}</div>
          </>
        ) : (
          ""
        );
      },
    },
  ];

  return (
    <>
      <title>
        {TitleNameHelper({ defaultTitleName: "Top 10 Visited Pages" })}{" "}
      </title>
      {/* <!-- Top 10 Visited Pages --> */}

      <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-md h-full">
        <div className="flex px-5 py-4 border-b-2 border-neutral-200 justify-between items-center">
          <div className="font-semibold text-base lg:text-xl text-gray-700 inline-block">
            {TitleNameHelper({ defaultTitleName: "Top 10 Visited Pages" })}
            <div className="text-sm">
              {/* Duration : */}
              <span className={"ml-1 text-sm text-cyan-600"}>
                ( {DataFromDate} )
              </span>
            </div>
          </div>
        </div>
        <div>
          <div className="h-[420px] overflow-x-auto rounded-md">
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
