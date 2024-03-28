/*Component Name: List
Component Functional Details: User can create or update List of Customer master details from here.
Created By: Happy
Created Date: 06/01/22
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import React, { useEffect, useCallback, useState, useMemo } from "react";
import { format } from "date-fns";
import ReactTable from "components/common/table/ReactTableServerSide";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import CustomerService from "services/admin/customer/CustomerService";
import ConfirmDelete from "components/common/modals/ConfirmDelete";
import BasicModal from "components/common/modals/Basic";
import Messages from "components/common/alerts/messages/Index";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { DateTimeFormat, TitleNameHelper, serverError } from "services/common/helper/Helper";
import Image from "components/common/formComponent/Image";
import { CurrencySymbolByCode, defaultImage, PageName, paginationDetails, RecStatusValuebyName, RecStatusValueForMorFilter, anniesAnnualData } from "global/Enum";
import Actions from "components/common/others/admin/Action";
import ViewHistory from "components/common/modals/ViewHistory";
import { ValidationMsgs } from "global/ValidationMessages";
import { useSelector } from "react-redux";
import Status from "components/common/displayStatus/Status";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import StoreService from "services/admin/store/StoreService";

const List = () => {
  const dispatch = useDispatch();
  const location = useSelector((store) => store.location);
  const user = useSelector((store) => store?.user);
  const company = useSelector((store) => store?.CompanyConfiguration);
  const permission = useSelector((store) => store?.permission);
  const storeIdFromDropDown = useSelector((store) => store?.TempDataReducer?.order?.storeIdFromDropDown);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [viewHistoryModal, setViewHistoryModal] = useState(false);
  const [openBasicModal, setOpenBasicModal] = useState(false);
  const [storeOptions, setStoreOptions] = useState([]);
  // const [storeFilter, setStoreFilter] = useState("-1");
  const [customerOptions, setCustomerOptions] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const [selectedRows, setSelectedRows] = useState([]);
  const [filteringOptions, setColumnFilteringOptions] = useState([]);
  const [customerNavIdDropdown, setCustomerNavIdDropdown] = useState([]);

  const [Data, setData] = useState([]);
  const [storeDropdownRef, setstoreDropdownRef] = useState(true)

  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "lastactive",
      direction: 1,
      priority: 0,
    },
  ]);

  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
  });

  const setPaginationDataFunc = (key, value) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const COLUMNS = [
    {
      id: "id",
      Header: "Customer No",
      accessor: "id",
      column_name: "id",
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
      id: "name",
      Header: "Customer Name",
      accessor: "name",
      column_name: "name",
      disableShowHide: true,
      Cell: ({ value, row }) => {
        return row ? (
          <>
            <div
              className="w-full flex justify-start items-center group"
              style={{ width: "200px" }}
            >
              <div>
                <NavLink
                  to={"/admin/Customer/customer/edit/" + row.original.id}
                >
                  <div className="text-sm font-normal">
                    {value ? value : ""}
                  </div>
                </NavLink>
              </div>
            </div>
          </>
        ) : (
          ""
        );
      },
    },
    // {
    //   id: "storeLogo",
    //   Header: "stores",
    //   accessor: "storeEmailLogo",
    //   column_name: "storeLogo",
    //   disableSortBy: true,
    //   Cell: ({ value, row }) => {
    //     return value !== null && value !== "" && value !== undefined ? (
    //       <>
    //         <div className="flex items-center">
    //           <Image src={value} className="w-20" containerHeight={"h-20"} />
    //         </div>
    //       </>
    //     ) : (
    //       <>
    //         <div className="flex items-center">
    //           <Image
    //             src={defaultImage}
    //             className="w-20"
    //             containerHeight={"h-20"}
    //           />
    //         </div>
    //       </>
    //     );
    //   },
    // },
    {
      id: "customerType",
      Header: "CUSTOMER TYPE",
      accessor: "customerType",
      column_name: "customerType",
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
      id: "email",
      Header: "Customer Email",
      accessor: "email",
      column_name: "email",
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
      id: "revenue",
      Header: `REVENUE (${CurrencySymbolByCode.USD})`,
      accessor: "revenue",
      column_name: "revenue",
      disableSortBy: true,
      Cell: ({ value }) => {
        return value ? (
          <>
            <div className="pl-8">{parseFloat(value).toFixed(2)}</div>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "orders",
      Header: "Orders",
      accessor: "orders",
      column_name: "orders",
      disableSortBy: true,
      Cell: ({ value }) => {
        return value ? (
          <>
            <div className="pl-5">{value}</div>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "createdDate",
      Header: "Created Date",
      accessor: "createdDate",
      column_name: "createdDate",
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
      id: "createdName",
      Header: "Created By",
      accessor: "createdName",
      column_name: "createdName",
      Cell: ({ value }) => {
        return value ? (
          <>
            <div className="pl-5">{value}</div>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "modifiedDate",
      Header: "Modified Date",
      accessor: "modifiedDate",
      column_name: "modifiedDate",
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
      id: "modifiedName",
      Header: "Modified By",
      accessor: "modifiedName",
      column_name: "modifiedName",
      Cell: ({ value }) => {
        return value ? (
          <>
            <div className="pl-5">{value}</div>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "recStatus",
      Header: "status",
      accessor: "recStatus",
      column_name: "recStatus",
      Cell: ({ value }) => {
        return <Status type={value} />;
      },
    },
    {
      id: "lastActive",
      Header: "Last Active",
      accessor: "lastactive",
      column_name: "lastactive",
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
      id: "isRegistered",
      Header: "Registered",
      accessor: "isRegistered",
      column_name: "isRegistered",
      Cell: ({ value }) => {
        return (
          <>
            <div>{value === 1 ? "Yes" : "No"}</div>
          </>
        );
      },
    },
    {
      id: "action",
      Header: "",
      accessor: "id",
      column_name: "action",
      Cell: ({ value, row }) => {
        return (
          <Actions
            row={row}
            openDeleteModal={openDeleteModal}
            setOpenDeleteModal={setOpenDeleteModal}
            setDeleteData={setCustomer}
            setModalInfo={setCustomer}
            setOpenBasicModal={setOpenBasicModal}
            editUrl={`/admin/Customer/customer/edit/${row.original.id}`}
            moduleName={`${TitleNameHelper({
              defaultTitleName: "Customer List",
            })}`}
            setViewHistoryModal={setViewHistoryModal}
            setRecordId={setCustomer}
          />
        );
      },
      disableSortBy: true,
      disableShowHide: true,
    },
  ];

  const getCustomerData = useCallback(
    (pageIndex = 1) => {

      if (anniesAnnualData.storeId) {
        dispatch(setAddLoading(true));

        CustomerService.getCustomers({
          args: {
            pageSize: paginationData.pageSize,
            pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
            sortingOptions,
            filteringOptions: [...filteringOptions, {
              field: "storeId",
              operator: 1,
              value: anniesAnnualData.storeId,
            }],
          },
        })
          .then((response) => {
            setstoreDropdownRef(true)
            let responseData = response.data.data;
            setData(responseData.items);
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
          })
          .catch(() => {
            dispatch(setAddLoading(false));
          });
      }
    },
    [
      storeIdFromDropDown,
      paginationData.pageSize,
      sortingOptions,
      paginationData.pageIndex,
      filteringOptions,
    ]
  );

  const setSortingOptionHandler = (column, direction) => {
    setSortingOptions([
      {
        field: column,
        direction: direction,
        priority: 0,
      },
    ]);
  };

  const handleSort = useCallback((sortValue) => { });

  const statusChange = (customer) => {
    var success =
      customer.changeStatus !== RecStatusValuebyName.Archived
        ? ValidationMsgs.customer.customerStatus
        : ValidationMsgs.customer.customerDeleted;
    var fail =
      customer.changeStatus !== RecStatusValuebyName.Archived
        ? ValidationMsgs.customer.customerNotStatus
        : ValidationMsgs.customer.customerNotDeleted;

    dispatch(setAddLoading(true));

    CustomerService.updateStatus({
      args: {
        id: customer.id,
        status: customer.changeStatus,
        rowVersion: customer.rowVersion,
        ...location,
      },
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: success,
            })
          );
          getCustomerData();
          setColumnFilteringOptions((prevData) => {
            let prevFilterData = prevData.filter((currentFilterObj) => {
              return currentFilterObj.field !== "id";
            });
            return prevFilterData;
          });
        } else {
          dispatch(
            setAlertMessage({
              type: "danger",
              message: fail,
            })
          );
        }
        dispatch(setAddLoading(false));
      })
      .catch((errors) => {
        dispatch(
          setAlertMessage({
            type: "danger",
            message: fail,
          })
        );
        dispatch(setAddLoading(false));
      });
    setOpenBasicModal(false);
  };

  const moreFilterOptions = useMemo(
    () => [
      {
        name: "Customer Nav ID",
        options: customerNavIdDropdown,
        columnName: "navCustomerId",
        type: "checkbox",
        conditionalSearch: true,
      },
      {
        name: "Customer E-Mail",
        columnName: "email",
        type: "custom_component",
        Component: MoreFilterEmailSearch,
      },
      {
        name: "Last Active Date",
        columnName: "lastactive",
        options: [],
        type: "date",
      },
      {
        name: "Created Date",
        columnName: "createddate",
        options: [],
        type: "date",
      },
      {
        name: "Updated Date",
        columnName: "modifiedDate",
        options: [],
        type: "date",
      },
      {
        name: "Status",
        columnName: "recStatus",
        options: RecStatusValueForMorFilter,
        type: "radio",
        conditionalSearch: true,
      },
    ],
    [customerOptions, customerNavIdDropdown]
  );

  // const saveFilterOptionsHandler = () => {
  //   const saveFilterOptions = {
  //     'hiddenColumns': hiddenColumns,
  //     'filteringOptions': filteringOptions,
  //     'initialColumnFilterOrder': initialColumnFilterOrder,
  //     'activeTab': activeTab
  //   };
  // };

  // const getCustomerDropdownData = useCallback(() => {
  //   DropdownService.getDropdownValues("customer", true)
  //     .then((response) => {
  //       setCustomerOptions(response.data.data);
  //       console.log(response.data.data, "response.data.data")
  //     })
  //     .catch(() => { });
  // }, []);

  useEffect(() => {
    if (user?.id && company?.id) {
      StoreService.getStoreByUserId({
        userid: user?.id,
        companyConfigurationId: company?.id,
        isSuperUser: user?.isSuperUser,
      })
        .then((response) => {
          if (response?.data?.data && response?.data?.success) {
            if (response?.data?.data && response?.data?.data.length > 0) {
              const allStore = response?.data?.data.map((storeObj) => storeObj.value).join(",")
              setStoreOptions([{ value: allStore, label: 'All Stores' }, ...response?.data?.data]);
            }
          }
        })
        .catch((error) => { });
    }
  }, []);

  useEffect(() => {
    if (storeIdFromDropDown && storeIdFromDropDown.length) {
      let allstoreIDs = [];
      storeIdFromDropDown.map((value) => {
        if (value.label === "All Stores") {
          value.value.split(",").map((stId) => allstoreIDs.push(stId))
        } else {
          allstoreIDs.push(value.value)
        }
      })
      CustomerService.getDropdownCustomerNavId(allstoreIDs)
        .then((response) => {
          if (response?.data?.success && response?.data?.data) {
            setCustomerNavIdDropdown(response.data.data);
          }
        })
        .catch(() => { });
      getCustomerData();
      setstoreDropdownRef(false)

    } else {
      setData([]);
      setPaginationData({ ...paginationDetails })
    }
  }, [storeIdFromDropDown])

  const { pathname } = useLocation();
  return (
    <>
      <title>{TitleNameHelper({ defaultTitleName: "Customer List" })} </title>
      <div className="py-4" >
        <div className="px-4 sm:px-6 lg:px-8 w-full items-center flex justify-between sticky top-0 z-20 py-2 bg-slate-100">
          <div className="col-span-full w-full flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
              {TitleNameHelper({ defaultTitleName: "Customer List" })}
            </h1>
            <div className="flex flex-wrap sm:auto-cols-min gap-2">
              {
                (permission?.isEdit || permission?.isDelete) && (
                  <NavLink
                    to={"create"}
                    className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                  >
                    <span className="material-icons-outlined">add</span>
                    <span className="ml-1">
                      Create {TitleNameHelper({ defaultTitleName: `Customer` })}
                    </span>
                  </NavLink>
                )
              }
            </div >
          </div >
        </div >
        <div className="px-4 sm:px-6 lg:px-8 w-full pt-7">
          {openModal ? "" : <Messages />}
          <div className="col-span-full w-full bg-white shadow-xxl rounded-md mb-8 relative">
            <ReactTable
              COLUMNS={COLUMNS}
              DATA={Data}
              {...paginationData}
              fetchData={getCustomerData}
              sortingOptions={sortingOptions}
              setSortingOptions={setSortingOptionHandler}
              handleSort={handleSort}
              setTablePageSize={(value) =>
                setPaginationDataFunc("pageSize", value)
              }
              // column filters
              editColumnFilter={true}
              filteringOptions={filteringOptions}
              setColumnFilteringOptions={setColumnFilteringOptions}
              hiddenColumns={useMemo(() => ["rowSelection"], [])}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              morefilter={true}
              moreFilterOption={moreFilterOptions}
              saveFilter={{ show: true, tabName: pathname + "_" + "customer" }}
            // checkBoxFilterOptions={[
            //   {
            //     columnName: "type",
            //     name: "Tags",
            //     options: CustomerTags,
            //     icon: 'expand_more',
            //     iconPosition: 'right',
            //   },
            // ]}
            />
          </div>
        </div>
      </div >
      <ConfirmDelete
        handleDelete={statusChange}
        data={customer}
        message="Deleting this Brand will permanently remove this record from your account. This can't be undone"
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        title={"Delete"}
      />
      <BasicModal
        handleConfirmation={statusChange}
        openModal={openBasicModal}
        setOpenModal={setOpenBasicModal}
        {...customer}
      />

      {
        viewHistoryModal && (
          <ViewHistory
            title={"View History"}
            openModal={viewHistoryModal}
            setOpenModal={setViewHistoryModal}
            rowId={customer}
            pageName={PageName.Product}
          />
        )
      }
    </>
  );
};

export default List;

const MoreFilterEmailSearch = ({
  name,
  type,
  mainFilter,
  columnName = name.toLowerCase().replaceAll(" ", "_"),
  setmainColumnFilter,
  clearSubFilter,
}) => {
  const [tag, setTag] = useState("");
  useEffect(() => {
    setTag(() => {
      var temp = mainFilter.filter((value) => {
        return value.field === columnName;
      });
      if (temp.length > 0) {
        return temp[0].value;
      } else {
        return "";
      }
    });
  }, [mainFilter, columnName]);
  return (
    <>
      <input
        type="text"
        value={tag}
        onChange={(e) => {
          setmainColumnFilter({
            field: columnName,
            operator: 0,
            value: e.target.value,
          });
        }}
        maxLength={255}
        className={`block w-64 bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md m-5`}
      />
    </>
  );
};
