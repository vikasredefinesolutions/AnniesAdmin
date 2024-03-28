import React, { useCallback, useState, useEffect, useMemo } from "react";
import ReactTable from "../../../../../common/table/ReactTableServerSide";
import { Link, NavLink } from "react-router-dom";
import ConfirmDelete from "components/common/modals/ConfirmDelete";
import BasicModal from "components/common/modals/Basic";
import Actions from "./Actions";
import Messages from "components/common/alerts/messages/Index";
import {
  serverError,
  DateTimeFormat,
  TitleNameHelper,
} from "services/common/helper/Helper";
import ViewHistory from "components/common/modals/ViewHistory";
import {
  paginationDetails,
  RecStatusValuebyName,
  PageName,
  anniesAnnualData,
} from "global/Enum";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { ValidationMsgs } from "global/ValidationMessages";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import Status from "components/common/displayStatus/Status";
import CategoryService from "services/admin/master/store/categoryMaster/CategoryMasterService";
import CheckBoxAction from "./CheckBoxAction";
import Select from "components/common/formComponent/Select";
import DropdownServiceCls from "services/common/dropdown/DropdownService";

const List = () => {
  const permission = useSelector((store) => store.permission);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [ModalInfo, setModalInfo] = useState({});
  const [openBasicModal, setOpenBasicModal] = useState(false);
  const [category, setCategory] = useState(null);
  const dispatch = useDispatch();
  const location = useSelector((store) => store?.location);
  const [viewHistoryModal, setViewHistoryModal] = useState(false);

  const [Data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [RecordId, setRecordId] = useState(null);

  const [filteringOptions, setColumnFilteringOptions] = useState([]);
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
  });
  const [sortingOptions, setSortingOptions] = useState([
    { field: "name", direction: 0, priority: 0 },
  ]);

  const [filterFacet, setFilterFacet] = useState([]);
  const [selectedFilterFacet, setSelectedFilterFacet] = useState();

  const setSortingOptionHandler = (column, direction) => {
    setSortingOptions([
      {
        field: column,
        direction: direction,
        priority: 0,
      },
    ]);
  };

  const setPaginationDataFunc = (key, value) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const getCategoryData = useCallback(
    (pageIndex = 1) => {
      dispatch(setAddLoading(true));

      CategoryService.getCategoriesWithTreeview({
        args: {
          pageSize: paginationData.pageSize,
          pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
          sortingOptions,
          filteringOptions,
        },
        storeId: anniesAnnualData.storeId,
      })
        .then((response) => {
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
        })
        .catch(() => {
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
              <Link
                to={
                  row.original.id !== 0 &&
                  `/admin/master/Configuration/CategoryMaster/edit/${row?.original?.id}`
                }
              >
                <div className="font-semibold">{value}</div>
              </Link>
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
        return <div>{value}</div>;
      },
    },
    {
      id: "backgroundColor",
      Header: "Background Color",
      accessor: "backgroundColor",
      column_name: "backgroundColor",
      disableSortBy: true,
      Cell: ({ value }) => {
        const color = `${value.slice(7, value.length - 1)}`;
        return value ? (
          <>
            <div className="flex flex-wrap items-center max-w-xs">
              <div
                className="inline-flex items-center justify-center mr-2 mb-2 rounded-full border-click w-8 h-8 border-2"
                style={{ background: color }}
              />
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
      column_name: "createddate",
      colSpan: 1,
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
      id: "createdBy",
      Header: "Created By",
      accessor: "createdByName",
      column_name: "createdName",
      colSpan: 1,
      Cell: ({ value }) => {
        return (
          <>
            <div>{value} </div>
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
      id: "updatedBy",
      Header: "Updated By",
      accessor: "modifiedByName",
      column_name: "modifiedByName",
      colSpan: 1,
      Cell: ({ value }) => {
        return (
          <>
            <div>{value} </div>
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
        return <Status type={value} />;
      },
    },
    {
      id: "action",
      Header: "",
      accessor: "id",
      column_name: "action",
      colSpan: 1,
      Cell: ({ value, row }) => {
        return row?.original?.id !== 0 ? (
          <Actions
            id={value}
            setCategory={setCategory}
            row={row}
            openDeleteModal={openDeleteModal}
            setOpenDeleteModal={setOpenDeleteModal}
            setModalInfo={setModalInfo}
            setOpenBasicModal={setOpenBasicModal}
            setViewHistoryModal={setViewHistoryModal}
            setRecordId={setRecordId}
          />
        ) : (
          ""
        );
      },
      disableSortBy: true,
      disableShowHide: true,
    },
  ];

  const getRecordHistory = (id) => {};

  const handleDelete = (category) => {
    dispatch(setAddLoading(true));

    var ids = [];
    if (category.length > 0) {
      ids = category.map((value) => {
        return { item1: value.id, item2: value.rowVersion };
      });
    } else {
      ids = [
        { item1: category.original.id, item2: category.original.rowVersion },
      ];
    }

    CategoryService.updateMultipleStatus({
      args: {
        idsRowVersion: ids,
        status: RecStatusValuebyName.Archived,
        ...location,
      },
    })
      .then((response) => {
        if (response.data.success && response.data.data) {
          dispatch(
            setAlertMessage({
              view: true,
              type: response.data.data.item1 === false ? "danger" : "success",
              message:
                response.data.data.item1 === false
                  ? response.data.data.item2
                  : ValidationMsgs.category.categoryDeleted,
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
              message: ValidationMsgs.category.categoryNotDeleted,
              type: "danger",
            })
          );
        }
        dispatch(setAddLoading(false));
      });
    setOpenDeleteModal(false);
  };

  const statusChangedHandler = (data) => {
    dispatch(setAddLoading(true));

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
        }
        dispatch(setAddLoading(false));
      })
      .catch((errors) => {
        dispatch(
          setAlertMessage({
            type: "danger",
            message: ValidationMsgs.category.categoryStatusNotUpdated,
          })
        );
        setOpenBasicModal(false);
        dispatch(setAddLoading(false));
      });
  };

  useEffect(() => {
    DropdownServiceCls.getDropdownValues("filterfacet").then((response) => {
      if (response.data.success && response.data.data) {
        const mainData = response.data.data;
        setFilterFacet([
          ...mainData,
          {
            value: true,
            label: "Main Category",
          },
        ]);
      }
    });
  }, []);

  useEffect(() => {
    if (
      selectedFilterFacet &&
      selectedFilterFacet !== null &&
      selectedFilterFacet !== "" &&
      selectedFilterFacet?.value
    ) {
      setColumnFilteringOptions([
        {
          field:
            selectedFilterFacet?.label == "Main Category"
              ? "ismaincategory"
              : "controltype",
          operator: 0,
          value:
            selectedFilterFacet?.label == "Main Category"
              ? true
              : selectedFilterFacet?.value,
        },
      ]);
    } else {
      setColumnFilteringOptions([]);
    }
  }, [selectedFilterFacet]);

  return (
    <>
      <title>{TitleNameHelper({ defaultTitleName: "Category Master" })}</title>
      <div className="py-8">
        <div className="px-4 sm:px-6 lg:px-8 w-full items-center flex justify-between sticky top-0 z-20 py-2 bg-slate-100">
          <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
            {TitleNameHelper({ defaultTitleName: "Category Master" })}
          </h1>
          <div className="flex flex-wrap sm:auto-cols-max gap-2">
            <div className="">
              <div>
                <Select
                  name={"name"}
                  options={filterFacet}
                  classNames={"max-w-[500px] min-w-[250px]"}
                  value={selectedFilterFacet}
                  onChange={(value) => {
                    setSelectedFilterFacet(value);
                  }}
                />
              </div>
            </div>
            <NavLink
              to={`/admin/master/Configuration/CategoryMaster/create`}
              className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
            >
              <span className="material-icons-outlined">add</span>
              <span className="ml-1"> Add Category </span>
            </NavLink>
          </div>
        </div>
        <div className="px-4 sm:px-6 lg:px-8 w-full pt-7">
          <Messages />
          <div className="col-span-full w-full bg-white shadow-xxl rounded-md mb-8 relative">
            <ReactTable
              COLUMNS={COLUMNS}
              DATA={Data}
              {...paginationData}
              setTablePageSize={(value) =>
                setPaginationDataFunc("pageSize", value)
              }
              fetchData={getCategoryData}
              sortingOptions={sortingOptions}
              setSortingOptions={setSortingOptionHandler}
              morefilter={true}
              // column filters
              filteringOptions={filteringOptions}
              setColumnFilteringOptions={setColumnFilteringOptions}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              CheckBoxAction={({ ...rest }) => (
                <CheckBoxAction
                  setOpenDeleteModal={setOpenDeleteModal}
                  setCategory={setCategory}
                  {...rest}
                />
              )}
              editColumnFilter={true}
              expandedRows={useMemo(() => true, [])}
              hiddenColumns={[permission?.isDelete ? "" : "rowSelection"]}
            />
          </div>
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
          pageName={PageName.StoreProductCategory}
        />
      )}
    </>
  );
};

export default List;
