import React, { useCallback, useMemo, useState } from "react";
import { format } from "date-fns";
import ReactTable from "../../../../../common/table/ReactTableServerSide";
import { NavLink, useParams } from "react-router-dom";
import CategoryService from "services/admin/master/store/categoryMaster/CategoryMasterService";
import CheckBoxAction from "./CheckBoxAction";
import ConfirmDelete from "components/common/modals/ConfirmDelete";
import BasicModal from "components/common/modals/Basic";
import Actions from "./Actions";
import Messages from "components/common/alerts/messages/Index";
import { serverError, DateTimeFormat, TitleNameHelper, getEditUrl } from "services/common/helper/Helper";
import ViewHistory from "components/common/modals/ViewHistory";
import { paginationDetails, RecStatusValue, RecStatusValueForForm, RecStatusValuebyName, PageName, masterCatalogStoreTypes } from "global/Enum";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { useDispatch, useSelector } from "react-redux";
import { ValidationMsgs } from "global/ValidationMessages";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import Status from "components/common/displayStatus/Status";
import ReactDragDropTable from "components/common/table/ReactDragDropTable";

const List = ({ storeType }) => {
  const { storeName, storeId, FormsId, FormsName, storeType: storeTypeBrowserQuery } = useParams();

  const storeNameFinal = storeName ? storeName : FormsName
  const storeIdFinal = storeId ? storeId : FormsId
  const storeTypeFinal = storeTypeBrowserQuery ? storeTypeBrowserQuery : storeType

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [ModalInfo, setModalInfo] = useState({});
  const [openBasicModal, setOpenBasicModal] = useState(false);
  const [category, setCategory] = useState(null);
  const dispatch = useDispatch();
  const location = useSelector((store) => store?.location);
  const [viewHistoryModal, setViewHistoryModal] = useState(false);
  const [StatusObj, setStatusObj] = useState(RecStatusValueForForm);

  const [Data, setData] = useState([]);
  const [paginationData, setPaginationData] = useState(paginationDetails);
  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "name",
      direction: 0,
      priority: 0,
    },
  ]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filteringOptions, setColumnFilteringOptions] = useState([]);
  const [RecordId, setRecordId] = useState(null);

  const getCategoryData = useCallback(
    (pageIndex = 1) => {
      dispatch(setAddLoading(true))

      CategoryService.getCategoriesWithTreeview({
        args: {
          pageSize: paginationData.pageSize,
          pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
          sortingOptions,
          filteringOptions,
        },
        storeId: storeIdFinal,
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
      paginationData.pageIndex
    ]
  );

  const COLUMNS = [
    {
      id: "name",
      Header: "Title",
      accessor: "name",
      column_name: "name",
      colSpan: 4,
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
                {/* <NavLink
                  to={getEditUrl(row.original.id, masterCatalogStoreTypes, storeTypeFinal, storeNameFinal, storeIdFinal, storeType, false, "category")}> */}
                <div className="font-semibold">{value}</div>
                {/* </NavLink> */}
              </div>
            </div>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "productCount",
      Header: "# Products",
      accessor: "productCount",
      column_name: "productCount",
      colSpan: 1,
      Cell: ({ value }) => {
        return <div >{value}</div>;
      },
    },
    {
      id: "createdDate",
      Header: "Created date",
      accessor: "createdDate",
      column_name: "createddate",
      colSpan: 1,
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
      accessor: "createdByName",
      column_name: "createdName",
      colSpan: 1,
      Cell: ({ value }) => {
        return (
          <>
            <div >{value} </div>
          </>
        );
      },
    },
    {
      id: "updatedDate",
      Header: "Updated Date",
      accessor: "modifiedDate",
      column_name: "modifiedDate",
      colSpan: 1,
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
      id: "updatedBy",
      Header: "Updated By",
      accessor: "modifiedByName",
      column_name: "modifiedByName",
      colSpan: 1,
      Cell: ({ value }) => {
        return (
          <>
            <div >{value} </div>
          </>
        );
      },
    },
    {
      id: "status",
      Header: "Status",
      accessor: "recStatus",
      column_name: "recStatus",
      colSpan: 2,
      Cell: ({ value }) => {
        return (
          <Status type={value} />
        );
      },
    },
    // {
    //   id: "action",
    //   Header: "",
    //   accessor: "id",
    //   column_name: "action",
    //   colSpan: 1,
    //   Cell: ({ value, row }) => {
    //     return (
    //       <Actions
    //         id={value}
    //         setCategory={setCategory}
    //         row={row}
    //         openDeleteModal={openDeleteModal}
    //         setOpenDeleteModal={setOpenDeleteModal}
    //         setModalInfo={setModalInfo}
    //         setOpenBasicModal={setOpenBasicModal}
    //         setViewHistoryModal={setViewHistoryModal}
    //         setRecordId={setRecordId}
    //       />
    //     );
    //   },
    //   disableSortBy: true,
    //   disableShowHide: true,
    // },
  ];

  const getRecordHistory = (id) => {
    // setViewHistoryModal(true);
  };

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

  const handleDelete = (category) => {
    dispatch(setAddLoading(true))

    var ids = [];
    if (category.length > 0) {
      ids = category.map((value) => {
        return { item1: value.id, item2: value.rowVersion };
      });
    } else {
      ids = [{ item1: category.id, item2: category.rowVersion }];
    }
    CategoryService.updateMultipleStatus({
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
              view: true,
              type: "success",
              message: ValidationMsgs.category.categoryDeleted,
            })
          );
          getCategoryData();
        } else {
          dispatch(
            setAlertMessage({
              view: true,
              type: "danger",
              message: serverError(response),
            })
          );
          dispatch(setAddLoading(false))
        }

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
            setAlertMessage({ message: ValidationMsgs.category.categoryNotDeleted, type: "danger" })
          );
        }
        dispatch(setAddLoading(false))

      });
    setOpenDeleteModal(false);
  };

  const orderChangeHandler = (index, data) => {
    dispatch(setAddLoading(true))

    const newSequenceIndex = index + 1

    if (data?.storeID) {
      CategoryService.CategoriesDragAndDrop(
        {
          changeStoreCategorySequenceModel: {
            id: data?.id,
            rowVersion: "",
            ...location,
            parentId: data?.parentCategoryId,
            oldSequence: data?.displayOrder,
            newSequence: newSequenceIndex,
            storeId: data?.storeID,
          }
        }
      ).then((response) => {
        if (response.data.data) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.navigation.sequenceChanged,
            })
          );
          getCategoryData();
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
  }


  const statusChangedHandler = (data) => {
    dispatch(setAddLoading(true))

    const object = {
      id: data.id,
      status: data.changeStatus,
      rowVersion: data.rowVersion,
    };
    CategoryService.updateStatus({
      args: { ...object, ...location },
    })
      .then((response) => {
        if (response?.data?.success) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.category.categoryStatusUpdated,
            })
          );
          getCategoryData();
          setOpenBasicModal(false);
        } else {
          dispatch(
            setAlertMessage({
              type: "danger",
              message: serverError(response),
            })
          );
          setOpenBasicModal(false);
          dispatch(setAddLoading(false))

        }
      })
      .catch((errors) => {
        dispatch(
          setAlertMessage({
            type: "danger",
            message: ValidationMsgs.category.categoryStatusNotUpdated,
          })
        );
        setOpenBasicModal(false);
        dispatch(setAddLoading(false))
      });
  };

  const moreFilterOptions = [
    {
      name: "Status",
      columnName: "recStatus",
      options: StatusObj,
      type: "radio",
    },
  ]

  return (
    <>
      <title>{TitleNameHelper({ defaultTitleName: "Category Master" })}</title>
      <div className="px-4 sm:px-6 py-8 w-full mx-auto">
        <div className="grid grid-cols-12">
          <div className="col-span-full w-full flex justify-between mb-8">
            <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
              {TitleNameHelper({ defaultTitleName: "Category Master" })}
            </h1>
          </div>
        </div>
        <Messages />
        <div className="col-span-full w-full bg-white shadow-xxl rounded-md mb-8">
          <ReactDragDropTable
            DATA={Data}
            COLUMNS={COLUMNS}
            displaySearch={false}
            fetchData={getCategoryData}
            {...paginationData}
            setTablePageSize={(value) =>
              setPaginationDataFunc("pageSize", value)
            }
            orderChangeHandler={orderChangeHandler}
          />
        </div>
      </div>

      <ConfirmDelete
        handleDelete={handleDelete}
        data={category}
        message="Deleting these Category will permanently remove this record from your account. This can't be undone."
        title={"Delete"}
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
      />
      <BasicModal
        handleConfirmation={statusChangedHandler}
        openModal={openBasicModal}
        setOpenModal={setOpenBasicModal}
        {...ModalInfo}
      />

      {viewHistoryModal && (
        <ViewHistory
          title={"View History"}
          openModal={viewHistoryModal}
          setOpenModal={setViewHistoryModal}
          getRecordHistory={getRecordHistory}
          rowId={RecordId}
          pageName={PageName.Category}
        />
      )}

    </>
  );
};

export default List;
