import React, { useState, useCallback, useMemo, useEffect } from "react";
import ReactTable from "components/common/table/ReactTableServerSide";
import { useDispatch } from "react-redux";
import { paginationDetails, CurrencySymbolByCode, cutomerFilterDropdown } from "global/Enum";
import DashBoardServices from "services/admin/order/DashBoardServices";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import Image from "components/common/formComponent/Image";
import { defaultImage } from "global/Enum";
import Select from "components/common/formComponent/Select";

const OrderByCustomer = ({ title, store, DropDownData, DataFromDate }) => {
  const dispatch = useDispatch();
  const [Data, setData] = useState([]);
  const [filterOrderOrEmployee, setFilterOrderOrEmployee] = useState("0");
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

  const getOrderByCustomer = useCallback(
    (pageIndex = 1) => {
      if (store?.value) {
        dispatch(setAddLoading(true));
        DashBoardServices.getOrderByCustomerData({
          args: {
            pageSize: paginationData.pageSize,
            pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
            sortingOptions,
            filteringOptions,
          },
          storeId: store?.value,
          filter: DropDownData,
          customerOrEmployee: filterOrderOrEmployee,
        })
          .then((response) => {
            if (response?.data?.success && response?.data?.data) {
              setData(response.data.data.items);
              setPaginationData((prevState) => ({
                ...prevState,
                pageIndex: response.data.data.pageIndex,
                pageSize: response.data.data.pageSize,
                totalCount: response.data.data.totalCount,
                totalPages: response.data.totalPages,
                hasPreviousPage: response.data.data.hasPreviousPage,
                hasNextPage: response.data.data.hasNextPage,
              }));
              dispatch(setAddLoading(false));
            }
          })
          .catch(() => {
            dispatch(setAddLoading(false));
          });
      }
    },
    [
      store?.value,
      paginationData.pageSize,
      sortingOptions,
      paginationData.pageIndex,
      filteringOptions,
      DropDownData,
      filterOrderOrEmployee,
    ]
  );

  useEffect(() => {
    getOrderByCustomer();
  }, [store?.value, DropDownData, filterOrderOrEmployee]);

  const COLUMNS = [
    {
      id: "storeLogoUrl",
      Header: "Store Logo",
      accessor: "storeLogoUrl",
      column_name: "storeLogoUrl",
      disableSortBy: true,
      Cell: ({ value }) => {
        return value !== null && value !== "" && value !== undefined ? (
          <>
            <div className="h-16 w-16 flex items-center justify-center overflow-hidden  box-content border bg-white">
              <Image src={value} className="max-h-full" containerHeight={""} />
            </div>
          </>
        ) : (
          <>
            <div className="h-16 w-16 flex items-center justify-center overflow-hidden  box-content border bg-white">
              <Image
                className="max-h-full"
                containerHeight={""}
                src={defaultImage}
              />
            </div>
          </>
        );
      },
    },
    {
      id: "storeName",
      Header: "Store Name",
      accessor: "storeName",
      column_name: "storeName",
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
      id: "customerName",
      Header: "Customer Name",
      accessor: "customerName",
      column_name: "customerName",
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
      id: "customerEmail",
      Header: "Customer Email",
      accessor: "customerEmail",
      column_name: "customerEmail",
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
      id: "totalOrders",
      Header: "Total Orders",
      accessor: "totalOrders",
      column_name: "totalOrders",
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
  ];

  return (
    <>
      <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-md">
        <div className="flex px-5 py-4 border-b-2 border-neutral-200 justify-between items-center">
          <div className="text-base lg:text-xl text-gray-700 inline-block font-semibold">
            {title}
            <div className="text-sm">
              Store :
              <span className={"ml-1 text-sm text-orange-600"}>
                {store?.label}
              </span>
              <span className={"ml-1 text-sm text-cyan-600"}>
                ( {DataFromDate} )
              </span>
            </div>
          </div>
          <div className="flex">
            <Select
              onChange={(e) => {
                setFilterOrderOrEmployee(e?.value);
                // if (e) {
                //   setFilterOrderOrEmployee((prevState) => ({
                //     ...prevState,
                //     label: e.label,
                //     value: e.value,
                //   }));
                // } else {
                //   setFilterOrderOrEmployee({});
                // }
              }}
              isClearable={false}
              defaultValue={filterOrderOrEmployee}
              className={"w-[250px]"}
              options={cutomerFilterDropdown}
              isMulti={false}
            />
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
            fetchData={getOrderByCustomer}
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

export default OrderByCustomer;
