import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import StoriesCategory from "services/admin/storiesCategory/StoriesCategoryServices";
import ReactTable from "components/common/table/ReactTableServerSide";
import { DateTimeFormat, serverError, TitleNameHelper } from "services/common/helper/Helper";
import { paginationDetails, RecStatusValuebyName } from "global/Enum";
import Status from "components/common/displayStatus/Status";
import AddStoriesCategoryModal from "../create/AddStoriesCategoryModal";
import { RecStatusValueForForm } from "global/Enum";
import ConfirmDelete from "components/common/modals/ConfirmDelete";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { ValidationMsgs } from "global/ValidationMessages";
import Messages from "components/common/alerts/messages/Index";
import BasciModal from "components/common/modals/Basic";
import { useLocation } from "react-router";
import Actions from "./Action";
import DropdownService from "services/common/dropdown/DropdownService";

const List = () => {
  const [Data, setData] = useState([]);
  const dispatch = useDispatch();
  const [userNameValues, setUserNameValues] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editId, setEditId] = useState(null);
  const [openAddActionModal, setOpenAddActionModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [basicModalInfo, setBasicModalInfo] = useState({});
  const [openBasicModal, setOpenBasicModal] = useState(false);
  const [storiesCategoryData, setStoriesCategoryData] = useState(null);
  const location = useSelector((store) => store?.location);
  const permission = useSelector(store => store.permission);
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
  const handleSort = (sortValue) => { };

  useEffect(() => {
    DropdownService.getDropdownValues("adminuser").then((response) => {
      if (response?.data?.data && response?.data?.success) {
        setUserNameValues(response.data.data);
      }
    });
  }, []);

  const getStoriesCategory = useCallback(
    (pageIndex) => {
      dispatch(setAddLoading(true));
      StoriesCategory.getStoriesCategory({
        args: {
          pageSize: paginationData.pageSize,
          pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
          sortingOptions,
          filteringOptions,
        },
      }).then((response) => {
        setData(response?.data?.data?.items);
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
      }).catch(() => {
        dispatch(setAddLoading(false));
      })
    },
    [
      filteringOptions,
      paginationData.pageSize,
      sortingOptions,
      paginationData.pageIndex,
    ]
  );

  const handleDelete = (storiesCategoryData) => {
    dispatch(setAddLoading(true));
    StoriesCategory.updateStatus({
      args: {
        id: storiesCategoryData.id,
        rowVersion: storiesCategoryData.rowVersion,
        status: RecStatusValuebyName.Archived,
        ...location,
      },
    })
      .then((response) => {
        if (response?.data?.data) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.storiesCategory.storiesCategoryDeleted,
            })
          );
          getStoriesCategory();
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
              type: "danger",
              message: errors.response.data.Errors.Error,
            })
          );
        } else {
          setAlertMessage({
            type: "danger",
            message: ValidationMsgs.storiesCategory.storiesCategoryNotDeleted,
          });
        }
        dispatch(setAddLoading(false));
      });
    setOpenDeleteModal(false);
  };

  const statusChangedHandler = (data) => {
    if (data?.id) {
      dispatch(setAddLoading(true));

      StoriesCategory.updateStatus({
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
                message:
                  ValidationMsgs.storiesCategory.storiesCategoryStatusUpdated,
              })
            );
            getStoriesCategory();
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
                message:
                  ValidationMsgs.storiesCategory
                    .storiesCategoryStatusNotUpdated,
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
      Header: "Category",
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
      id: "slug",
      Header: "Slug",
      accessor: "slug",
      column_name: "slug",
      disableShowHide: true,
      Cell: ({ value }) => {
        return value ? (
          <>
            <div className="text-sm font-normal">{value ? value : ""}</div>
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
      id: "createdByName",
      Header: "Created By",
      accessor: "createdByName",
      column_name: "createdByName",
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
      id: "modifiedByName",
      Header: "Updated By",
      accessor: "modifiedByName",
      column_name: "modifiedByName",
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
            setStoriesCategoryData={setStoriesCategoryData}
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
      <title>{TitleNameHelper({ defaultTitleName: "Stories Category" })}</title>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="col-span-full w-full flex justify-between mb-8">
          <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
            {TitleNameHelper({ defaultTitleName: "Stories Category" })}
          </h1>
          {(permission.isEdit || permission.isDelete) &&
            <button
              className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
              type="button"
              onClick={() => {
                setEditId(null);
                handleShowModal();
              }}
            >
              <span className="material-icons-outlined"> add</span>
              <span className="ml-1">Add Stories Category</span>
            </button>
          }
        </div>
        <Messages />
        <div className="col-span-full w-full bg-white shadow-xxl rounded-md mb-8 relative">
          <ReactTable
            COLUMNS={COLUMNS}
            DATA={Data}
            {...paginationData}
            setTablePageSize={(value) =>
              setPaginationDataFunc("pageSize", value)
            }
            fetchData={getStoriesCategory}
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
            saveFilter={{
              show: true,
              tabName: pathname + "_" + "storiesCategory",
            }}
          />
        </div>
      </div>
      <ConfirmDelete
        handleDelete={handleDelete}
        data={storiesCategoryData}
        messages={ValidationMsgs.storiesCategory.storiesCategoryPermanentDelete}
        title={"Delete"}
        module={"Stories Category"}
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
        <AddStoriesCategoryModal
          handleShowModal={handleShowModal}
          getStoriesCategory={getStoriesCategory}
          idson={editId}
        />
      )}
    </>
  );
};

export default List;
