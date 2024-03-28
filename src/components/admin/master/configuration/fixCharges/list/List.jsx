import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import FixChargesServices from "services/admin/fixCharges/fixChargesServices";
import ReactTable from "components/common/table/ReactTableServerSide";
import {
  DateTimeFormat,
  TitleNameHelper,
  serverError,
} from "services/common/helper/Helper";
import {
  CurrencySymbolByCode,
  paginationDetails,
  RecStatusValuebyName,
} from "global/Enum";
import Status from "components/common/displayStatus/Status";
import DropdownService from "services/common/dropdown/DropdownService";
import { RecStatusValueForForm } from "global/Enum";
import AddFixChargesModal from "../create/AddFixChargesModal";
import ConfirmDelete from "components/common/modals/ConfirmDelete";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { ValidationMsgs } from "global/ValidationMessages";
import Messages from "components/common/alerts/messages/Index";
import BasciModal from "components/common/modals/Basic";
import Actions from "./Action";
import { useLocation } from "react-router";
import StoreService from "services/admin/store/StoreService";

const List = () => {
  const permission = useSelector((store) => store.permission);
  const user = useSelector((store) => store?.user);
  const company = useSelector((store) => store?.CompanyConfiguration);
  const [Data, setData] = useState([]);
  const dispatch = useDispatch();
  const [userNameValues, setUserNameValues] = useState([]);
  const [openAddActionModal, setOpenAddActionModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [basicModalInfo, setBasicModalInfo] = useState({});
  const [openBasicModal, setOpenBasicModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [fixCharges, setFixCharges] = useState(null);
  const [editId, setEditId] = useState(null);
  const [StoreValues, setStoreValues] = useState([]);

  const location = useSelector((store) => store?.location);
  const handleShowModal = () => {
    setOpenAddActionModal((prev) => !prev);
  };
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

  useEffect(() => {
    DropdownService.getDropdownValues("adminuser").then((response) => {
      setUserNameValues(response.data.data);
    });
  }, []);

  useEffect(() => {
    if (user?.id && company?.id) {
      StoreService.getStoreByUserId({
        userid: user?.id,
        companyConfigurationId: company?.id,
        isSuperUser: user?.isSuperUser,
      })
        .then((response) => {
          if (response?.data?.data) {
            setStoreValues([...response?.data?.data]);
          }
        })
        .catch((error) => {});
    }
  }, []);

  const handleSort = (sortValue) => {};

  const getFixCharges = useCallback(
    (pageIndex = 1) => {
      dispatch(setAddLoading(true));
      FixChargesServices.getFixCharges({
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
        dispatch(setAddLoading(false));
      });
    },
    [
      filteringOptions,
      paginationData.pageSize,
      sortingOptions,
      paginationData.pageIndex,
    ]
  );

  const handleDelete = (fixCharges) => {
    var ids = [];
    if (fixCharges.length) {
      ids = fixCharges.map((value) => {
        return { item1: value.id, item2: value.rowVersion };
      });
    } else {
      ids = [{ item1: fixCharges.id, item2: fixCharges.rowVersion }];
    }
    dispatch(setAddLoading(true));

    FixChargesServices.updateMultipleStatus({
      args: {
        idsRowVersion: ids,
        status: RecStatusValuebyName.Archived,
        ...location,
      },
    })
      .then((response) => {
        if (response.data.data) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.fixCharges.fixChargesDeleted,
            })
          );
          getFixCharges();
        } else {
          dispatch(
            setAlertMessage({
              type: "success",
              message: serverError(response),
            })
          );
        }
        dispatch(setAddLoading(false));
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
          setAlertMessage({
            message: ValidationMsgs.fixCharges.fixChargesNotDeleted,
            type: "danger",
          });
        }
        dispatch(setAddLoading(false));
      });
    setOpenDeleteModal(false);
  };

  const statusChangedHandler = (data) => {
    if (data?.id) {
      dispatch(setAddLoading(true));

      FixChargesServices.updateStatus({
        args: {
          id: data.id,
          rowVersion: data.rowVersion,
          status: data.changeStatus,
          ...location,
        },
      })
        .then((response) => {
          if (response.data.data) {
            dispatch(
              setAlertMessage({
                view: true,
                type: "success",
                message: ValidationMsgs.fixCharges.fixChargesStatusUpdated,
              })
            );
            getFixCharges();
          } else {
            dispatch(
              setAlertMessage({
                view: true,
                type: "danger",
                message: serverError(response),
              })
            );
          }
          dispatch(setAddLoading(false));
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
              setAlertMessage({
                message: ValidationMsgs.fixCharges.fixChargesStatusNotUpdated,
                type: "danger",
              })
            );
          }
          dispatch(setAddLoading(false));
        });
    }
    setOpenBasicModal(false);
  };

  const COLUMNS = [
    {
      id: "name",
      Header: "Name",
      accessor: "name",
      column_name: "name",
      disableShowHide: true,
      Cell: ({ value, row }) => {
        return row ? (
          <>
            <div
              className="w-full flex justify-start items-center group + cursor-pointer"
              style={{ width: "200px" }}
            >
              <div>
                <div
                  className="text-sm font-normal"
                  onClick={() => {
                    setEditId(row.original.id);
                    handleShowModal();
                  }}
                >
                  {value ? value : ""}
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "charges",
      Header: `Charges (${CurrencySymbolByCode.USD})`,
      accessor: "charges",
      column_name: "charges",
      Cell: ({ value }) => {
        return value ? (
          <>
            <div
              className="w-full flex justify-start items-center group"
              style={{ width: "100px" }}
            >
              <div>{parseInt(value).toFixed(2)}</div>
            </div>
          </>
        ) : (
          "0.00"
        );
      },
    },
    {
      id: "storeName",
      Header: "STORE NAME",
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
      id: "createdDate",
      Header: "created Date",
      accessor: "createdDate",
      column_name: "createdDate",
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
      id: "createdName",
      Header: "Created By",
      accessor: "createdName",
      column_name: "createdName",
    },
    {
      id: "updatedDate",
      Header: "Updated Date",
      accessor: "modifiedDate",
      column_name: "modifiedDate",
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
      id: "updatedBy",
      Header: "Updated By",
      accessor: "modifiedName",
      column_name: "modifiedName",
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
            handleShowModal={handleShowModal}
            id={value}
            row={row}
            setOpenDeleteModal={setOpenDeleteModal}
            setBasicModalInfo={setBasicModalInfo}
            setOpenBasicModal={setOpenBasicModal}
            setOpenAddActionModal={setOpenAddActionModal}
            setFixCharges={setFixCharges}
            setEditId={setEditId}
          />
        );
      },
      disableSortBy: true,
      disableShowHide: true,
    },
  ];

  const moreFilterOption = useMemo(() => [
    {
      name: "Store",
      options: StoreValues,
      columnName: "storeId",
      type: "checkbox",
    },
    {
      name: "Created By",
      options: userNameValues,
      columnName: "createdBy",
      type: "checkbox",
    },
    {
      name: "Created Date",
      columnName: "createddate",
      options: [],
      type: "date",
    },
    {
      name: "Updated By",
      options: userNameValues,
      columnName: "modifiedBy",
      type: "checkbox",
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
      options: RecStatusValueForForm,
      type: "radio",
      conditionalSearch: true,
    },
  ]);
  const { pathname } = useLocation();
  return (
    <>
      {/* <title>Fix Charges</title> */}
      <title>{TitleNameHelper({ defaultTitleName: `Fix Charges` })}</title>
      <div className="py-8">
        <div className="px-4 sm:px-6 lg:px-8 w-full items-center flex justify-between sticky top-0 z-20 py-2 bg-slate-100">
          {/* <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
            Fix Charges
          </h1> */}
          <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
            {TitleNameHelper({ defaultTitleName: `Fix Charges` })}
          </h1>

          {(permission?.isEdit || permission?.isDelete) && (
            <button
              className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
              type="button"
              onClick={() => {
                setEditId(null);
                handleShowModal();
              }}
            >
              <span className="material-icons-outlined"> add</span>
              <span className="ml-1">
                {TitleNameHelper({ defaultTitleName: `Fix Charges` })}
              </span>
            </button>
          )}
        </div>
        <div className="px-4 sm:px-6 lg:px-8 w-full">
          {!openAddActionModal && <Messages />}
          <div className="col-span-full w-full bg-white shadow-xxl rounded-md mb-8 relative">
            <ReactTable
              COLUMNS={COLUMNS}
              DATA={Data}
              {...paginationData}
              setTablePageSize={(value) =>
                setPaginationDataFunc("pageSize", value)
              }
              fetchData={getFixCharges}
              sortingOptions={sortingOptions}
              setSortingOptions={setSortingOptionHandler}
              handleSort={handleSort}
              setColumnFilteringOptions={setColumnFilteringOptions}
              moreFilterOption={moreFilterOption}
              editColumnFilter={true}
              setSelectedRows={setSelectedRows}
              selectedRows={selectedRows}
              filteringOptions={filteringOptions}
              moreFilter={true}
              hiddenColumns={useMemo(() => ["rowSelection"], [])}
              saveFilter={{ show: true, tabName: pathname + "_" + "fixCharge" }}
            />
          </div>
        </div>
      </div>
      <ConfirmDelete
        handleDelete={handleDelete}
        data={fixCharges}
        messages={ValidationMsgs.fixCharges.fixChargesPermanentDelete}
        title={"Delete"}
        module={"Fix Charges"}
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
      />
      <BasciModal
        handleConfirmation={statusChangedHandler}
        openModal={openBasicModal}
        setOpenModal={setOpenBasicModal}
        {...basicModalInfo}
      />
      {openAddActionModal && (
        <AddFixChargesModal
          handleShowModal={handleShowModal}
          getFixCharges={getFixCharges}
          idson={editId}
        />
      )}
    </>
  );
};

export default List;
