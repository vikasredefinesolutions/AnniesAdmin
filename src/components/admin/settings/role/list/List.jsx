import React, { useState, useCallback } from "react";
import { NavLink } from "react-router-dom";
import ReactTable from "components/common/table/ReactTableServerSide";
import RoleServices from "services/admin/role/RoleServices";
import Actions from "./Actions";
import { DateTimeFormat, TitleNameHelper } from "services/common/helper/Helper";
import { paginationDetails } from "global/Enum";
import BasicModal from "components/common/modals/Basic";
import CloneModal from "components/admin/settings/role/create/subComponents/Clone";
import ConfirmDelete from "components/common/modals/ConfirmDelete";
import { useSelector, useDispatch } from "react-redux";
import { ValidationMsgs } from "global/ValidationMessages";
import Messages from "components/common/alerts/messages/Index";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { serverError } from "services/common/helper/Helper";
import Status from "components/common/displayStatus/Status";

import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";

const List = () => {
  const permission = useSelector(store => store.permission);
  const [RoleId, setRoleId] = useState(null);
  const [rowVersion, setrowVersion] = useState(null);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [ModalInfo, setModalInfo] = useState({});
  const [openBasicModal, setOpenBasicModal] = useState(false);
  const [openCloneModal, setOpenCloneModal] = useState(false);
  const [OldData, setOldData] = useState(false);
  const dispatch = useDispatch();

  const [Data, setData] = useState([]);
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
  });
  const [filteringOptions, setColumnFilteringOptions] = useState([]);

  const location = useSelector((store) => store?.location);

  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "name",
      direction: 0,
      priority: 0,
    },
  ]);

  const COLUMNS = [
    {
      id: "name",
      Header: "ROLE NAME",
      accessor: "name",
      column_name: "name",
      isVisible: false,
      disableShowHide: true,
      Cell: ({ value, row }) => {
        return row ? (
          <>
            <div
              className="w-full flex justify-start items-center group"
              style={{ width: "200px" }}
            >
              <div >
                <NavLink to={"/admin/Settings/roles/edit/" + row.original.id}>
                  <div className="font-semibold">{value}</div>
                </NavLink>
              </div>
            </div>
          </>
        ) : (
          "-"
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
              {DateTimeFormat(value).time}
            </div>
          </>
        ) : (
          "-"
        );
      },
    },


    {
      id: "createdBy",
      Header: "Created By",
      accessor: "createdName",
      column_name: "createdName",
      Cell: ({ value }) => {
        if (!value) {
          return "-";
        } else {
          return value;
        }
      },
    },
    {
      id: "updatedBy",
      Header: "Updated By",
      accessor: "modifiedName",
      column_name: "modifiedName",
      Cell: ({ value }) => {
        if (!value) {
          return "-";
        } else {
          return value;
        }
      },
    },
    {
      id: "updatedDate",
      Header: "Updated date",
      accessor: "modifiedDate",
      column_name: "modifiedDate",
      Cell: ({ value }) => {
        return value ? (
          <>
            <div >{DateTimeFormat(value).date} </div>
            <div className="text-[#707070] text-xs font-normal">
              {DateTimeFormat(value).time}
            </div>
          </>
        ) : (
          "-"
        );
      },
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
            id={value}
            rowVersion={row.original.rowVersion}
            setRoleId={setRoleId}
            setrowVersion={setrowVersion}
            row={row}
            openDeleteModal={openDeleteModal}
            setOpenDeleteModal={setOpenDeleteModal}
            setOpenCloneModal={setOpenCloneModal}
            setModalInfo={setModalInfo}
            setOpenBasicModal={setOpenBasicModal}
            setOldData={setOldData}
          />
        );
      },
      disableSortBy: true,
      disableShowHide: true,
    },
  ];

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

  const getAdminRoleData = useCallback(
    (pageIndex = 1) => {
      dispatch(setAddLoading(true))

      RoleServices.getAdminRoles({
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
    [filteringOptions, paginationData.pageSize, sortingOptions, paginationData.pageIndex]
  );

  const setPaginationDataFunc = (key, value) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleCloneRole = (e, values, resetForm, setFieldValue, name) => {
    dispatch(setAddLoading(true))

    RoleServices.cloneRolePermission({
      clone: {
        cloneId: OldData.id,
        name: values.roleName,
        ...location,
      },
    }).then((response) => {
      if (response.data.success) {
        dispatch(
          setAlertMessage({
            type: "success",
            message: response.data.data || ValidationMsgs.profile.myAccount.roleCloned,
          })
        );

        dispatch(setAddLoading(false))

        getAdminRoleData()
      } else {
        dispatch(
          setAlertMessage({
            type: "danger",
            message: response.data.errors.duplicate || ValidationMsgs.profile.myAccount.roleNotCloned,
          })
        );
        dispatch(setAddLoading(false))

      }
    })
      .catch((errors) => {
        dispatch(
          setAlertMessage({
            type: "danger",
            message: errors.duplicate || ValidationMsgs.profile.myAccount.roleNotCloned,
          })
        );
        dispatch(setAddLoading(false))

      });
    resetForm({});
    setFieldValue([name], "");
    setOpenCloneModal(false);
  };

  const handleUpdateRole = (e, values, resetForm, setFieldValue, name) => {
    dispatch(setAddLoading(true))

    RoleServices.updateRolePermissionById({
      args: {
        id: RoleId,
        rowVersion: rowVersion,
        status: "R",
        ...location,
      },
    }).then((response) => {
      if (response.data.success) {
        dispatch(
          setAlertMessage({
            type: "success",
            message: typeof response.data.data === "string" ? response.data.data : ValidationMsgs.profile.myAccount.roleDeleted,
          })
        );
        // refreshReactTable && refreshReactTable();
        getAdminRoleData()
        dispatch(setAddLoading(false))

      } else {
        dispatch(
          setAlertMessage({
            type: "danger",
            message: serverError(response) || response.data.errors.duplicate || ValidationMsgs.profile.myAccount.roleNotDeleted,
          })
        );
        dispatch(setAddLoading(false))

      }
    })
      .catch((errors) => {
        dispatch(
          setAlertMessage({
            type: "danger",
            message: errors.duplicate || ValidationMsgs.profile.myAccount.roleNotDeleted,
          })
        );
        dispatch(setAddLoading(false))

      });

    setOpenDeleteModal(false);
  };

  const statusChangedHandler = (data) => {
    dispatch(setAddLoading(true))

    const object = {
      id: data.id,
      status: data.changeStatus,
      rowVersion: data.rowVersion,
    };
    if (data?.id) {
      RoleServices.updateRolePermissionById({
        args: {
          ...object,
          ...location,
        }
      })
        .then((response) => {

          if (response.data.success) {
            dispatch(
              setAlertMessage({
                type: "success",
                message: ValidationMsgs.role.roleStatusUpdated,
              })
            );
            dispatch(setAddLoading(false))


            getAdminRoleData();
            setOpenDeleteModal(false);
          } else {
            dispatch(
              setAlertMessage({
                type: "danger",
                message: serverError(response),
              })
            );
            dispatch(setAddLoading(false))

          }
        })
        .catch((errors) => {
          dispatch(
            setAlertMessage({
              type: "danger",
              message: ValidationMsgs.role.roleStatusNotUpdated,
            })
          );
          dispatch(setAddLoading(false))

        });
      setOpenBasicModal(false);
    }
  };

  return (
    <>
      {/* <title>Role & Permissions</title> */}
      <title>{TitleNameHelper({ defaultTitleName: `Roles & Permissions` })}</title>
      <div className="py-4">
        <div className="px-4 sm:px-6 lg:px-8 w-full items-center flex justify-between sticky top-0 z-20 py-2 bg-slate-100">
          <div className="col-span-full w-full flex justify-between items-center">
            {/* <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
              Roles &amp; Permissions
            </h1> */}
            <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
              {TitleNameHelper({ defaultTitleName: `Roles & Permissions` })}
            </h1>
            {(permission?.isEdit || permission?.isDelete) && <NavLink
              to={"/admin/Settings/roles/create"}
              className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
            >
              <span className="material-icons-outlined">add</span>
              <span className="ml-1">Create {TitleNameHelper({ defaultTitleName: `new Roles & Permissions` })}</span>
            </NavLink>}
          </div>
        </div>
        <div className="px-4 sm:px-6 lg:px-8 w-full pt-7">
          <Messages />
          <div className="col-span-full w-full bg-white shadow-xxl rounded-md mb-8 ">
            <ReactTable
              COLUMNS={COLUMNS}
              DATA={Data}
              asNextPage={paginationData.hasNextPage}
              hasPreviousPage={paginationData.hasPreviousPage}
              pageIndex={paginationData.pageIndex}
              setPageIndex={(value) => setPaginationDataFunc("pageIndex", value)}
              pageSize={paginationData.pageSize}
              setTablePageSize={(value) =>
                setPaginationDataFunc("pageSize", value)
              }
              totalCount={paginationData.totalCount}
              sortingOptions={sortingOptions}
              setSortingOptions={setSortingOptionHandler}
              handleSort={handleSort}
              // column filters
              // filteringOptions={filteringOptions}
              setColumnFilteringOptions={setColumnFilteringOptions}
              // componentMoreFilterOption={moreFilterOptions}
              // selectedRows={selectedRows}
              // sortingColumns={SORTING_COLUMNS}
              fetchData={getAdminRoleData}
              hiddenColumns={["rowSelection"]}
              pageName={`role`}

            />
          </div>
        </div>
      </div>

      <ConfirmDelete
        message={ValidationMsgs.profile.myAccount.deletePermanently}
        title={"Delete"}
        data={"1"}
        setRoleId={setRoleId}
        handleDelete={handleUpdateRole}
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
      />

      <BasicModal
        handleConfirmation={statusChangedHandler}
        openModal={openBasicModal}
        setOpenModal={setOpenBasicModal}
        {...ModalInfo}
      />

      <CloneModal
        openCloneModal={openCloneModal}
        setOpenCloneModal={setOpenCloneModal}
        moduleName="Role and Permissions"
        name={"roleName"}
        handleClone={handleCloneRole}
        OldData={OldData.name}
      />
    </>
  );
};

export default List;
