import React, { useCallback, useMemo, useState } from "react";
import ReactTable from "components/common/table/ReactTableServerSide";
import { useDispatch } from "react-redux";
import { PageName } from "global/Enum";
import { paginationDetails, RecStatusValuebyName, } from "global/Enum";
import Actions from "./Actions";
import ConfirmDelete from "components/common/modals/ConfirmDelete";
import BasicModal from "components/common/modals/Basic";
import Messages from "components/common/alerts/messages/Index";
import { Link, NavLink } from "react-router-dom";
import { DateTimeFormat, serverError } from "services/common/helper/Helper";
import { format } from "date-fns";
import Status from "components/common/displayStatus/Status";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { useSelector } from "react-redux";
import ViewHistory from "components/common/modals/ViewHistory";
import { ValidationMsgs } from "global/ValidationMessages";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";

const List = ({ title, editURL, ByWeight, ShippingWeightAndUnitsList, statusChangeAPI, multiplestatusChangeAPI }) => {
  const permission = useSelector(store => store.permission);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const location = useSelector((store) => store?.location);
  const [readiness, setReadiness] = useState(null);
  const [ModelInfo, setModalInfo] = useState({});
  const [openBasicModal, setOpenBasicModal] = useState(false);
  const [viewHistoryModal, setViewHistoryModal] = useState(false);
  const [RecordId, setRecordId] = useState(null);

  const dispatch = useDispatch();
  const [Data, setData] = useState([]);

  const COLUMNS = useMemo(
    () => [
      {
        id: "fromRange",
        Header: "From Range",
        accessor: "fromRange",
        column_name: "fromRange",
        Cell: ({ value, row }) => {
          return row ? (
            <>
              <div
                className="w-full flex justify-start items-center group"
                style={{ width: "200px" }}
              >
                <div >
                  <NavLink to={`${editURL}/${row.original.id}`}>
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
      {
        id: "toRange",
        Header: "To Range",
        accessor: "toRange",
        column_name: "toRange",
      },
      {
        id: "createdDate",
        Header: "Created Date",
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
          return value ? (
            <>
              <div >{value}</div>
            </>
          ) : (
            ""
          );
        },
      },
      {
        id: "updatedDate",
        Header: "Updated Date",
        accessor: "modifiedDate",
        column_name: "modifiedDate",
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
        accessor: "modifiedName",
        column_name: "modifiedName",
        Cell: ({ value }) => {
          return value ? (
            <>
              <div >{value} </div>
            </>
          ) : (
            ""
          );
        },
      },
      {
        id: "status",
        Header: "Status",
        accessor: "recStatus",
        column_name: "recStatus",
        Cell: ({ value }) => {
          return <Status type={value} />;
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
              row={row}
              setReadiness={setReadiness}
              setOpenDeleteModal={setOpenDeleteModal}
              setModalInfo={setModalInfo}
              setOpenBasicModal={setOpenBasicModal}
              setViewHistoryModal={setViewHistoryModal}
              setRecordId={setRecordId}
            />
          );
        },
        disableSortBy: true,
        disableShowHide: true,
      },
    ], [])

  const [paginationData, setPaginationData] = useState({ ...paginationDetails });
  const [filteringOptions, setColumnFilteringOptions] = useState([]);
  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "name",
      direction: 0,
      priority: 0,
    },
  ]);
  const [selectedRows, setSelectedRows] = useState([]);

  const getShippingWeightAndUnitsListData = useCallback(
    (pageIndex = 1) => {
      dispatch(setAddLoading(true))

      ShippingWeightAndUnitsList({
        args: {
          pageSize: paginationData.pageSize,
          pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
          sortingOptions,
          filteringOptions: [...filteringOptions, {
            field: ByWeight ? "isShippingRatesWeight" : "isShippingRatesPlants",
            operator: 0,
            value: true
          }],
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
      });

    },
    [
      filteringOptions,
      paginationData.pageSize,
      sortingOptions,
      paginationData.pageIndex,
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
  const setPaginationDataFunc = (key, value) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSort = (sortValue) => { };

  const statusChangedHandler = (data) => {
    dispatch(setAddLoading(true))

    const object = {
      id: data.id,
      status: data.changeStatus,
      rowVersion: data.rowVersion,
    };

    console.log();
    statusChangeAPI({
      args: {
        ...object,
        ...location,
      },
    }).then((response) => {
        if (response.data.success) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: `${title} Status Updated Successfully.`,
            })
          );
          getShippingWeightAndUnitsListData();
        } else {
          dispatch(
            setAlertMessage({
              type: "danger",
              message: serverError(response),
            })
          );
        }
        dispatch(setAddLoading(false))
      }).catch((errors) => {
        dispatch(
          setAlertMessage({
            type: "danger",
            message: `${title} Status not Updated.`,
          })
        );
        setOpenBasicModal(false);
        dispatch(setAddLoading(false))
      });
    setOpenBasicModal(false);

  };

  const handleDelete = (fields5) => {
    dispatch(setAddLoading(true))

    var ids = [];
    if (Array.isArray(fields5)) {
      ids = fields5.map((value) => {
        return { item1: value.id, item2: value.rowVersion };
      });
    } else {
      ids = [{ item1: fields5.id, item2: fields5.rowVersion }];
    }
    multiplestatusChangeAPI({
      args: {
        idsRowVersion: ids,
        status: RecStatusValuebyName.Archived,
        ...location,
      },
    }).then((response) => {
        if (response.data.data) {
          dispatch(
            setAlertMessage({
              view: true,
              type: "success",
              message: `${title} Deleted Successfully`,
            })
          );
          getShippingWeightAndUnitsListData();
        } else {
          dispatch(
            setAlertMessage({
              view: true,
              type: "danger",
              message: serverError(response),
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
            setAlertMessage({ message: `${title} not Deleted.`, type: "danger" })
          );
        }
        dispatch(setAddLoading(false))
      });
    setOpenDeleteModal(false);
  };

  return (
    <>
      <title>{title} </title>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="sm:flex sm:justify-between sm:items-center mb-8">
          <div className="col-span-full w-full flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
              {title}
            </h1>
            {(permission?.isEdit || permission?.isDelete) && <div className="flex flex-wrap sm:auto-cols-max gap-2">
              <Link
                to={"create"}
                className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
              >
                <span className="material-icons-outlined">add</span>{" "}
                <span className="ml-1">{`Add ${title}`}</span>
              </Link>
            </div>}
          </div>
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
            fetchData={getShippingWeightAndUnitsListData}
            sortingOptions={sortingOptions}
            setSortingOptions={setSortingOptionHandler}
            setColumnFilteringOptions={setColumnFilteringOptions}
            handleSort={handleSort}
            // column filters
            editColumnFilter={false}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            morefilter={false}
            hiddenColumns={["rowSelection"]}

          />
        </div>
      </div>
      <ConfirmDelete
        message={`Deleting this ${title} Readiness will permanently remove this record from your account. This can't be undone`}
        handleDelete={handleDelete}
        title={"Delete"}
        data={readiness}
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
      />

      <BasicModal
        handleConfirmation={statusChangedHandler}
        openModal={openBasicModal}
        setOpenModal={setOpenBasicModal}
        {...ModelInfo}
      />

      {viewHistoryModal && (
        <ViewHistory
          title={"View History"}
          openModal={viewHistoryModal}
          setOpenModal={setViewHistoryModal}
          rowId={RecordId}
          pageName={PageName.ProductReady}
          page={title}
        />
      )}

    </>
  );
};

export default List;
