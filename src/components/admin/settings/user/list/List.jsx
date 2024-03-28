import React, { useCallback, useState } from "react";
import { format } from "date-fns";
import ReactTable from "../../../../common/table/ReactTableServerSide";
import { Link, NavLink } from "react-router-dom";
import Actions from "./Actions";
import CheckBoxAction from "./CheckBoxAction";
import UserService from "services/admin/user/UserService";
import Status from "components/common/displayStatus/Status";
import { defaultImage, RecStatusValuebyName, RecStatusValueForUserList, RecStatusValueForForm } from "global/Enum";
import Messages from "components/common/alerts/messages/Index";
import { paginationDetails } from "global/Enum";
import { DateTimeFormat, TitleNameHelper } from "services/common/helper/Helper";
import ConfirmDelete from "components/common/modals/ConfirmDelete";
import BasicModal from "components/common/modals/Basic";
import CloneModal from "./Clone";
import { useDispatch, useSelector } from "react-redux";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { ValidationMsgs } from "global/ValidationMessages";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { useMemo } from "react";
import Image from "components/common/formComponent/Image";

const List = () => {
  const permission = useSelector(store => store.permission);
  const [user, setUser] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [basicModalInfo, setModalInfo] = useState({});
  const [openCloneModal, setOpenCloneModal] = useState(false);
  const [openBasicModal, setOpenBasicModal] = useState(false);
  const dispatch = useDispatch();
  const location = useSelector((store) => store?.location);
  const CurrentUserObject = useSelector((store) => store?.user)
  const [selectedRows, setSelectedRows] = useState([]);
  const [filteringOptions, setColumnFilteringOptions] = useState([]);
  const COLUMNS = [
    {
      id: "firstName",
      Header: "Name",
      accessor: "firstname",
      column_name: "firstname",
      isVisible: false,
      disableShowHide: true,
      Cell: ({ value, row }) => {
        return value ?
          <>
            <div className='flex'>
              <div>
                {row?.original?.userPhoto !== "" ? (
                  <NavLink
                    to={
                      "/admin/Settings/user/profile/myAccount/" + row.original.id
                    }
                  >
                    <div className="h-16 w-16 mr-8 flex items-center justify-center overflow-hidden  rounded-full border bg-white">
                      <Image src={row?.original?.userPhoto} containerHeight={""} className="max-h-full" />
                    </div>
                  </NavLink>
                ) : (
                  <NavLink
                    to={
                      "/admin/Settings/user/profile/myAccount/" + row.original.id
                    }
                  >
                    <div className="h-16 w-16 mr-4 flex items-center justify-center overflow-hidden  rounded-full border bg-white">
                      <Image src={defaultImage} className="max-h-full" />
                    </div>
                  </NavLink>
                )}
              </div>
              <NavLink
                to={
                  "/admin/Settings/user/profile/myAccount/" + row.original.id
                }
              >
                <div className="font-semibold pt-3">
                  {value + " " + row.original.lastname}
                </div>
                <div className="text-sm font-normal">
                  {row.original.email && value ? row.original.email : "-"}
                </div>
              </NavLink>
            </div>
          </>
          :
          ""
      },
    },
    {
      id: "roles",
      Header: "Roles",
      accessor: "roleName",
      column_name: "roleName",
      Cell: ({ value }) => {
        if (value !== undefined) {
          return value;
        } else {
          return "";
        }
      },
    },
    /* {
      id: "modules",
      Header: "Modules",
      accessor: "modules",
      column_name: "modules",
      Cell: ({ value }) => {
        if (value !== undefined) {
          return value;
        } else {
          return "";
        }
      },
    }, */
    {
      id: "lastLoginTime",
      Header: "Last Login Time",
      accessor: "lastLoginTime",
      column_name: "lastLoginTime",
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
      id: "createdDate",
      Header: "Created date",
      accessor: "createdDate",
      column_name: "createdDate",
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
      id: "createdBy",
      Header: "Created By",
      accessor: "createdName",
      column_name: "createdName",
      Cell: ({ value }) => {
        return value ? value : "-";
      }
    },
    {
      id: "updatedDate",
      Header: "Updated date",
      accessor: "modifiedDate",
      column_name: "modifiedDate",
      Cell: ({ value }) => {
        //   console.log(value);
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
      id: "updatedBy",
      Header: "Updated By",
      accessor: "modifiedName",
      column_name: "modifiedName",
      Cell: ({ value }) => {
        return value ? value : "-";
      }
    },
    {
      id: "status",
      Header: "Status",
      accessor: "recStatus",
      column_name: "recStatus",
      Cell: ({ value }) => {
        if (value !== undefined) {
          return <Status type={value} />;
        } else {
          return "";
        }
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
            setUser={setUser}
            setOpenDeleteModal={setOpenDeleteModal}
            setOpenCloneModal={setOpenCloneModal}
            setModalInfo={setModalInfo}
            setOpenBasicModal={setOpenBasicModal}
            id={value}
            row={row}
          />
        );
      },
      disableSortBy: true,
    },
  ]
  const [Data, setData] = useState([]);
  const [paginationData, setPaginationData] = useState({ ...paginationDetails });
  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "firstname",
      direction: 0,
      priority: 0,
    },
  ]);


  const getUserData = useCallback(
    (pageIndex = 1) => {
      dispatch(setAddLoading(true))

      UserService.getUsers({
        args: {
          pageSize: paginationData.pageSize,
          pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
          sortingOptions,
          filteringOptions,
        },
        userId: CurrentUserObject.id
      }).then((response) => {
        // console.log(response.data);
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
    [filteringOptions, paginationData.pageSize, sortingOptions, paginationData.pageIndex, CurrentUserObject]
  );

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

  const handleSort = (sortValue) => { };

  const statusChangedHandler = (data) => {
    var changeStatus = "";
    var ids = [];
    if (Array.isArray(data)) {
      ids = data.map((value) => {
        changeStatus = value.changeStatus;
        return { item1: value.id, item2: value.rowVersion };
      });
    } else {
      changeStatus = data.changeStatus;
      ids = [{ item1: data.id, item2: data.rowVersion }];
    }
    if (ids.length > 0) {
      const statusNotUpdated = ValidationMsgs.user.userStatusNotUpdated;
      dispatch(setAddLoading(true))

      UserService.updateMultipleStatus({
        args: {
          idsRowVersion: ids,
          status: changeStatus,
          ...location,
        }
      })
        .then((response) => {
          if (response.data.data) {
            dispatch(
              setAlertMessage({
                type: "success",
                message: (changeStatus === RecStatusValuebyName.Archived ? ValidationMsgs.user.userDeleted : ValidationMsgs.user.userStatusUpdated),
              })
            );
            getUserData();
          } else {
            dispatch(
              setAlertMessage({
                view: true,
                type: "danger",
                message: statusNotUpdated,
              })
            );
          }
          dispatch(setAddLoading(false))
        })
        .catch((errors) => {
          if (errors.response.data.Errors.Error) {
            dispatch(
              setAlertMessage({
                message: errors.response.data.Errors.Error,
                type: "danger",
              })
            );
          } else {
            dispatch(
              setAlertMessage({ message: (changeStatus === RecStatusValuebyName.Archived ? ValidationMsgs.user.userNotDeleted : statusNotUpdated), type: "danger" })
            );
          }
          dispatch(setAddLoading(false))
        });
    }
    setOpenBasicModal(false);
  };
  const moreFilterOption = useMemo(() => [
    {
      name: "Status",
      columnName: "recStatus",
      options: Object.entries(RecStatusValueForUserList).map((obj) => ({ value: obj[0], label: obj[1] })),
      type: "radio",
      conditionalSearch: true,
    },
  ]);

  return (
    <>
      {/* <title>All Users</title> */}
      <title>{TitleNameHelper({ defaultTitleName: "All Users" })}</title>
      <div className="py-4">
        <div className="px-4 sm:px-6 lg:px-8 w-full items-center flex justify-between sticky top-0 z-20 py-2 bg-slate-100">
          <div className="col-span-full w-full flex justify-between ">
            {/* <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
              Users
            </h1> */}
            <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
              {TitleNameHelper({ defaultTitleName: "Users" })}
            </h1>
            {(permission?.isEdit || permission?.isDelete) &&
              <div className="flex flex-wrap sm:auto-cols-max gap-2">
                <NavLink
                  to={"/admin/Settings/user/create"}
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                >
                  <span className="material-icons-outlined"> add</span>
                  <span className="ml-1">Invite {TitleNameHelper({ defaultTitleName: "Users" })}</span>
                </NavLink>
              </div>}
          </div>
        </div>
        <div className="px-4 sm:px-6 lg:px-8 w-full pt-7">
          {!openCloneModal && <Messages />}
          <div className="col-span-full w-full bg-white shadow-xxl rounded-md mb-8 relative">
            <ReactTable
              COLUMNS={COLUMNS}
              DATA={Data}
              {...paginationData}
              setTablePageSize={(value) =>
                setPaginationDataFunc("pageSize", value)
              }
              fetchData={getUserData}
              sortingOptions={sortingOptions}
              setSortingOptions={setSortingOptionHandler}
              handleSort={handleSort}
              // column filters
              filteringOptions={filteringOptions}
              morefilter={true}
              moreFilterOption={moreFilterOption}
              setColumnFilteringOptions={setColumnFilteringOptions}
              displayColumnFilter={[
                {
                  columnName: "rcstatus",
                  name: "Status",
                  options: RecStatusValueForUserList,
                },
              ]}
              editColumnFilter={false}
              CheckBoxAction={useCallback(
                ({ ...rest }) => (
                  <CheckBoxAction
                    setUser={setUser}
                    setSelectedRows={setSelectedRows}
                    setOpenDeleteModal={setOpenDeleteModal}
                    {...rest}
                  />
                ),
                []
              )}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              hiddenColumns={[permission?.isDelete ? "" : "rowSelection"]}
            // sortingColumns={[
            //   { name: "Name A-Z", direction: "0", column_name: "firstname" },
            //   { name: "Name Z-A", direction: "1", column_name: "firstname" },
            //   {
            //     name: "Status A-Z",
            //     direction: "0",
            //     column_name: "recStatus",
            //   },
            //   {
            //     name: "Status Z-A",
            //     direction: "1",
            //     column_name: "recStatus",
            //   },
            //   {
            //     name: "Created (Oldest First)",
            //     direction: "0",
            //     column_name: "createdDate",
            //   },
            //   {
            //     name: "Created (Newest First)",
            //     direction: "1",
            //     column_name: "createdDate",
            //   },
            //   {
            //     name: "Updated (Oldest First)",
            //     direction: "0",
            //     column_name: "modifiedDate",
            //   },
            //   {
            //     name: "Updated (Newest First)",
            //     direction: "1",
            //     column_name: "modifiedDate",
            //   },
            // ]}

            />
          </div>
        </div>
      </div>
      <ConfirmDelete
        handleDelete={statusChangedHandler}
        data={user}
        module={"User"}
        title={"Delete"}
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
      />
      <BasicModal
        handleConfirmation={statusChangedHandler}
        openModal={openBasicModal}
        setOpenModal={setOpenBasicModal}
        {...basicModalInfo}
      />
      <CloneModal
        getUserData={getUserData}
        openCloneModal={openCloneModal}
        setOpenCloneModal={setOpenCloneModal}
        data={user}
        moduleName="User"
      />
    </>
  );
};

export default List;
