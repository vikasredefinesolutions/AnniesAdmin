import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { ValidationMsgs } from "global/ValidationMessages";
import { paginationDetails } from "global/Enum";

import { serverError, TitleNameHelper } from "services/common/helper/Helper";
import NavigationService from "services/admin/module/NavigationService";
import ExtensionService from "services/admin/module/ExtensionService";
import ModuleService from "services/admin/module/ModuleService";

import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { getMenuListForSideBar } from "redux/GetMenuListByUserRole/MenuListByUserRoleActions";

import ReactDragDropTable from "components/common/table/ReactDragDropTable";
import ConfirmDelete from "components/common/modals/ConfirmDelete";
import Messages from "components/common/alerts/messages/Index";
import Status from "components/common/displayStatus/Status";
import BasicModal from "components/common/modals/Basic";

import Actions from "./Actions"

const List = () => {
  const dispatch = useDispatch();

  const CurrentUserObject = useSelector((store) => store?.user)
  const permission = useSelector(store => store.permission);
  const CompanyId = useSelector((store) => store?.CompanyConfiguration?.id)
  const location = useSelector((store) => store?.location);

  const [module, setModule] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openBasicModal, setOpenBasicModal] = useState(false);
  const [Data, setData] = useState([]/* sampleProduct.AttributesData.imageData */);
  const [sortingOptions/* , setSortingOptions */] = useState([{ field: "sequence", direction: 0, priority: 0 }]);
  const [filteringOptions/* , setColumnFilteringOptions */] = useState([]);
  const [paginationData, setPaginationData] = useState({ ...paginationDetails });

  const COLUMNS = [
    {
      id: "name",
      Header: "Name",
      accessor: "name",
      column_name: "name",
      colSpan: 4,
      isVisible: false,
      disableShowHide: true,
      disableSortBy: true,
      Cell: ({ value, row }) => {
        return row ? (
          <>
            <div className="w-full flex justify-start items-center group">
              <NavLink to={row.isNavigation ? "/admin/configurator/Modules/Navigation/edit/" + row.navId : '/admin/configurator/Modules/Extension/edit/' + row.extId}>
                <div className="font-semibold">{value}</div>
              </NavLink>
            </div>
          </>
        ) : (
          "-"
        );
      },
    },
    {
      id: "isDisplay",
      Header: "Is Display",
      accessor: "isDisplay",
      column_name: "isDisplay",
      colSpan: 2,
      Cell: ({ value, row }) => {
        return <div>{value}</div>
      },
    },
    {
      id: "accessCode",
      Header: "Access Code",
      accessor: "accesscode",
      column_name: "accessCode",
      colSpan: 2,
      Cell: ({ value, row }) => {
        return <div>{value}</div>
      },

    },
    {
      id: "menuIcon",
      Header: "Menu Icon",
      accessor: "menuicon",
      colSpan: 1,

      Cell: ({ value, row }) => {
        return <div>
          <span className="material-icons-outlined">{value}</span>
        </div>
      }
    },
    {
      id: "status",
      Header: "Status",
      accessor: "recStatus",
      colSpan: 2,
      Cell: ({ value, row }) => {
        return <Status type={value} />
      }
    },
    {
      id: "action",
      Header: "",
      accessor: "action",
      colSpan: 1,

      Cell: ({ value, row }) => {
        return <Actions
          setModule={setModule}
          setOpenDeleteModal={setOpenDeleteModal}
          setOpenBasicModal={setOpenBasicModal}
          id={value}
          row={row}
        />
      },
    },
  ];

  const setPaginationDataFunc = (key, value) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const getModuleData = useCallback((pageIndex) => {
    dispatch(setAddLoading(true))

    ModuleService.getModules({
      pageSearchArgs: {
        pageSize: paginationData.pageSize,
        pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
        sortingOptions,
        filteringOptions,
      },
      companyConfigurationId: CompanyId,
      isSuperUser: CurrentUserObject?.isSuperUser || false
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

    }).catch(errors => {
      dispatch(setAddLoading(false))
    });
  },
    [
      paginationData.pageSize,
      paginationData.pageIndex,
      filteringOptions,
      sortingOptions,
      CompanyId
    ]
  );

  const orderChangeHandler = (index, data) => {
    dispatch(setAddLoading(true))

    const newSequenceIndex = index + 1

    ModuleService.changeSequence({
      changeModuleSequenceModel: {
        id: (data.isNavigation ? data.navId : data.extId),
        rowVersion: "",
        ...location,
        oldSequence: data.sequence,
        newSequence: newSequenceIndex,
        isNavigation: data.isNavigation,
        companyConfigurationId: CompanyId,
      }
    }).then((response) => {
      if (response.data.data) {
        dispatch(
          setAlertMessage({
            type: "success",
            message: ValidationMsgs.navigation.sequenceChanged,
          })
        );
        getModuleData();

        if (CurrentUserObject?.id && CompanyId) {
          dispatch(getMenuListForSideBar({ userId: CurrentUserObject.id, isSuperUser: CurrentUserObject.isSuperUser, CompanyId: CompanyId }))
        }

      } else {
        dispatch(
          setAlertMessage({
            type: "danger",
            message: serverError(response),
          })
        );
      }
      dispatch(setAddLoading(false))

    }).catch(() => {
      dispatch(
        setAlertMessage({
          type: "danger",
          message: ValidationMsgs.navigation.sequenceNotChanged,
        })
      )
      dispatch(setAddLoading(false))
    });
  }

  const statusChangedHandler = (data) => {
    if (data?.isNavigation && data.navId) {
      dispatch(setAddLoading(true))

      NavigationService.updateMultipleStatus({
        args: {
          idsRowVersion: [
            {
              item1: data.navId,
              item2: data.rowVersion,
            }
          ],
          status: data.changeStatus,
          ...location
        }
      }).then((response) => {
        if (response.data.data) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: (data.changeStatus !== 'R' ? ValidationMsgs.navigation.statusUpdated : ValidationMsgs.navigation.delete),
            })
          );
          getModuleData();
          if (CurrentUserObject?.id && CompanyId) {
            dispatch(getMenuListForSideBar({ userId: CurrentUserObject.id, isSuperUser: CurrentUserObject.isSuperUser, CompanyId: CompanyId }))
          }
        } else {
          dispatch(
            setAlertMessage({
              type: "success",
              message: (data.changeStatus !== 'R' ? ValidationMsgs.navigation.statusNotUpdated : ValidationMsgs.navigation.notDelete),
            })
          );
        }
        dispatch(setAddLoading(false))
      }).catch((errors) => {
        if (errors.response.data.Errors.Error) {
          dispatch(
            setAlertMessage({
              message: errors.response.data.Errors.Error,
              type: "danger",
            })
          );
        } else {
          dispatch(
            setAlertMessage({ message: (data.changeStatus !== 'R' ? ValidationMsgs.navigation.statusNotUpdated : ValidationMsgs.navigation.notDelete), type: "danger" })
          );
        }
        dispatch(setAddLoading(false))

      })
      setOpenBasicModal(false);

    } else if (data.extId) {
      dispatch(setAddLoading(true))

      ExtensionService.updateMultipleStatus({
        args: {
          idsRowVersion: [
            {
              item1: data.extId,
              item2: data.rowVersion,
            }
          ],
          status: data.changeStatus,
          ...location
        }
      }).then((response) => {
        if (response.data.data) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: (data.changeStatus !== 'R' ? ValidationMsgs.extension.statusUpdated : ValidationMsgs.extension.delete),
            })
          );
          getModuleData();
          if (CurrentUserObject?.id && CompanyId) {
            dispatch(getMenuListForSideBar({ userId: CurrentUserObject.id, isSuperUser: CurrentUserObject.isSuperUser, CompanyId: CompanyId }))
          }
        } else {
          dispatch(
            setAlertMessage({
              type: "success",
              message: (data.changeStatus !== 'R' ? ValidationMsgs.extension.statusNotUpdated : ValidationMsgs.extension.notDelete),
            })
          );
        }
        dispatch(setAddLoading(false))
      }).catch((errors) => {
        if (errors.response.data.Errors.Error) {
          dispatch(
            setAlertMessage({
              message: errors.response.data.Errors.Error,
              type: "danger",
            })
          );
        } else {
          dispatch(
            setAlertMessage({ message: (data.changeStatus !== 'R' ? ValidationMsgs.navigation.statusNotUpdated : ValidationMsgs.navigation.notDelete), type: "danger" })
          );
        }
        dispatch(setAddLoading(false))
      })
      setOpenBasicModal(false);
    }
  };

  return (
    <>
      {/* <Messages /> */}
      <title>{TitleNameHelper({ defaultTitleName: "Module" })}</title>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="sm:flex sm:justify-between sm:items-center mb-8">
          <div className="col-span-full w-full flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
              {TitleNameHelper({ defaultTitleName: "Module" })}
            </h1>
            {(permission?.isEdit || permission?.isDelete) && <div className="flex flex-wrap sm:auto-cols-max gap-2">
              <NavLink
                to={"Navigation/create"}
                className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
              >
                <span className="material-icons-outlined">add</span>
                <span className="ml-1">Add Navigation</span>
              </NavLink>
              <NavLink
                to={"Extension/create"}
                className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
              >
                <span className="material-icons-outlined">add</span>
                <span className="ml-1">Add Extension</span>
              </NavLink>
            </div>}
          </div>
        </div>
        <Messages />
        <div className="col-span-full w-full bg-white shadow-xxl rounded-md  relative">
          <ReactDragDropTable
            DATA={Data}
            COLUMNS={COLUMNS}
            displaySearch={false}
            fetchData={getModuleData}
            {...paginationData}
            setTablePageSize={(value) =>
              setPaginationDataFunc("pageSize", value)
            }
            orderChangeHandler={orderChangeHandler}
          />
        </div>

        <ConfirmDelete
          handleDelete={statusChangedHandler}
          data={module}
          module={"Module"}
          title={"Delete"}
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
        />

        <BasicModal
          handleConfirmation={statusChangedHandler}
          openModal={openBasicModal}
          setOpenModal={setOpenBasicModal}
          {...module}
        />
      </div>
    </>
  );
};

export default List;
