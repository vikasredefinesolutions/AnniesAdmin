import React, { useCallback, useState, useEffect } from "react";
import { format } from "date-fns";
import ReactTable from "../../../../common/table/ReactTableServerSide";
import { DateTimeFormat, serverError } from "services/common/helper/Helper";
import { paginationDetails } from "global/Enum";
import SystemLogService from "services/admin/systemLog/SystemLogService";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import DropdownService from "services/common/dropdown/DropdownService";
import Download from "components/common/table/filters/Download";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { ValidationMsgs } from "global/ValidationMessages";
import Messages from "components/common/alerts/messages/Index";
import { useMemo } from "react";

const Table = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const ParamURL = useLocation();
  const [dropdownTeamAndMyLog, setDropdownTeamAndMyLog] = useState([]);
  const [Data, setData] = useState([]);
  const [paginationData, setPaginationData] = useState({ ...paginationDetails });
  const [sortingOptions, setSortingOptions] = useState([{ field: "date", direction: 1, priority: 0 }]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [IPAddressDropDownData, setIPAddressDropDownData] = useState([]);
  const [PageNamesDropDownData, setPageNamesDropDownData] = useState([]);
  const [UserDropDownData, setUserDropDownData] = useState([]);
  const [ModuleData, setModuleData] = useState([]);
  const [filteringOptions, setColumnFilteringOptions] = useState(() => !id ? [{ "field": "userId", "operator": 0, "value": user.id }] : [{ "field": "userId", "operator": 0, "value": id }]);

  const COLUMNS = [
    {
      id: "page",
      Header: "Page",
      accessor: "page",
      column_name: "page",
    },
    {
      id: "module",
      Header: "Module Name",
      accessor: "module",
      column_name: "module",
      Cell: ({ value, row }) => {
        return value ? (
          <>
            <div>
              <span className="">{value}</span>
            </div>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "event",
      Header: "Event",
      accessor: "event",
      column_name: "event",
      disableShowHide: true,
      Cell: ({ value, row }) => {
        return value ? (
          <>
            <div>
              <span className="cursor-pointer">{value}</span>
            </div>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "user",
      Header: "Created By",
      accessor: "user",
      column_name: "user",
    },
    {
      id: "date",
      Header: "Date",
      accessor: "date",
      column_name: "date",
      Cell: ({ value }) => {
        return value ? (
          <>
            <div >{DateTimeFormat(value).date} </div>
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
      id: "ipAddress",
      Header: "IP Address",
      accessor: "ipAddress",
      column_name: "ipAddress",
    },
  ];


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

  const getUserSystemLogData = useCallback(
    (pageIndex = 1) => {
      dispatch(setAddLoading(true))
      SystemLogService.getSystemLog({
        args: {
          pageSize: paginationData.pageSize,
          pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
          sortingOptions,
          filteringOptions,
        },
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
        dispatch(setAddLoading(false))
      }).catch(() => {
        dispatch(setAddLoading(false))
      })
    },
    [
      filteringOptions,
      paginationData.pageSize,
      sortingOptions,
      paginationData.pageIndex,
    ]
  );

  const Export = (pageIndex) => {
    dispatch(setAddLoading(true));
    SystemLogService.Export({
      args: {
        pageIndex: 0,
        pageSize: paginationData.pageSize,
        pagingStrategy: 0,
        sortingOptions,
        filteringOptions,
      },
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

  const getUserAndModuleDropdownData = useCallback((APIDropDownKeyName) => {
    DropdownService.getDropdownValues(APIDropDownKeyName).then((res) => {
      if (res.data.success && res.data.data) {
        if (APIDropDownKeyName === "accessright") {
          setModuleData(() => {
            return res.data.data;
          });
        } else {
          setUserDropDownData(() => {
            return res.data.data;
          });
        }
      }
    });
  }, []);

  const geDropdownData = useCallback((apiEndPointName) => {
    // GetIPAddressDropDownData, GetPageNamesDropDownData,
    SystemLogService[apiEndPointName]().then((res) => {
      if (res.data.success && res.data.data) {
        if (apiEndPointName === "GetIPAddressDropDownData") {
          setIPAddressDropDownData(() => {
            return res.data.data;
          });
        } else {
          setPageNamesDropDownData(() => {
            return res.data.data;
          });
        }
      }
    });
  }, []);

  useEffect(() => {
    geDropdownData("GetIPAddressDropDownData");
    geDropdownData("GetPageNamesDropDownData");
    getUserAndModuleDropdownData("accessright")
    getUserAndModuleDropdownData("adminuser")
  }, []);

  const moreFilterOption = [
    {
      name: "Event",
      options: [
        { value: "Created", label: "Created" },
        { value: "Updated", label: "Updated" },
        { value: "Deleted", label: "Deleted" },
      ],
      columnName: "event",
      type: "checkbox",
      conditionalSearch: true,
    },
    {
      name: "Page",
      options: PageNamesDropDownData,
      columnName: "page",
      type: "checkbox",
      conditionalSearch: true,
    },
    {
      name: "Module",
      options: ModuleData,
      columnName: "moduleId",
      type: "checkbox",
      conditionalSearch: true,
    },
    {
      name: "User",
      options: UserDropDownData,
      columnName: "userId",
      type: "checkbox",
      conditionalSearch: true,
    },
    {
      name: "IP Address",
      options: IPAddressDropDownData,
      columnName: "ipAddress",
      type: "checkbox",
      conditionalSearch: true,
    },
    {
      name: "Date",
      options: [],
      columnName: "date",
      type: "date",
      conditionalSearch: true,
    },
  ]

  const handleSort = (sortValue) => { };
  const index = filteringOptions.findIndex((obj) => obj.field === "userId");
  const { pathname } = useLocation();

  useEffect(() => {
    // if (user?.reportingTo !== 0) {
    setDropdownTeamAndMyLog([
      { value: "userid", label: "My Log", columnName: "userId", finalValue: user.id },
      { value: "log", label: "Team Log", columnName: "log", finalValue: user.id }
    ])
    // } else {
    //   setDropdownTeamAndMyLog([
    //     { value: user.id, label: "My Log" },
    //   ])
    // }
  }, [user])

  return (
    <>
      {ParamURL.pathname.includes("profile") ? "" : <Messages />}
      <ReactTable
        COLUMNS={COLUMNS}
        DATA={Data}
        {...paginationData}
        setTablePageSize={(value) => setPaginationDataFunc("pageSize", value)}
        fetchData={getUserSystemLogData}
        sortingOptions={sortingOptions}
        setSortingOptions={setSortingOptionHandler}
        handleSort={handleSort}
        // column filters
        filteringOptions={filteringOptions}
        moreFilterOption={
          filteringOptions[index]?.value === user.id
            ? moreFilterOption.filter(
              (moreFilter) => moreFilter.columnName !== "userId"
            )
            : moreFilterOption
        }
        setColumnFilteringOptions={setColumnFilteringOptions}
        editColumnFilter={true}
        refreshTable={true}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        // download={true}
        extraFilter={[{ Component: Download, onClick: Export }]}
        dropdownFilterOptions={!id ? [
          {
            name: "userId",
            options: dropdownTeamAndMyLog,
            // defaultValue: user.id,
            defaultValue: "userId"

          },
        ] : []}
        hiddenColumns={useMemo(() => ['rowSelection'], [])}
        saveFilter={{ show: true, tabName: pathname + '_' + 'systemLog' }}
      />
    </>
  );
};

export default Table;