import React, { useCallback, useState } from "react";
import {
  DateTimeFormat,
  TitleNameHelper,
  serverError,
} from "services/common/helper/Helper";
import { useSelector, useDispatch } from "react-redux";
import {
  RecStatusValuebyName,
  anniesAnnualData,
  paginationDetails,
} from "global/Enum";
import ReactTable from "components/common/table/ReactTableServerSide";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import PageRedirect from "services/admin/pageRedirect/PageRedirect";
import { NavLink } from "react-router-dom";
import { ValidationMsgs } from "global/ValidationMessages";
import ConfirmDelete from "components/common/modals/ConfirmDelete";
import Actions from "./Action";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import Messages from "components/common/alerts/messages/Index";

const List = () => {
  const dispatch = useDispatch();
  const permission = useSelector((store) => store?.permission);
  const location = useSelector((store) => store?.location);
  const [Data, setData] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [pageRedirectData, setPageRedirectData] = useState(null);

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

  const getPageRedirectData = useCallback(
    (pageIndex = 1) => {
      dispatch(setAddLoading(true));
      PageRedirect.getPageRedirect({
        args: {
          pageSize: paginationData.pageSize,
          pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
          sortingOptions,
          filteringOptions: [
            ...filteringOptions,
            {
              field: "storeId",
              operator: 1,
              value: anniesAnnualData.storeId,
            },
          ],
        },
      }).then((response) => {
        if (response?.data?.success && response?.data?.data) {
          setData(response.data?.data?.items);
          setPaginationData((prevState) => ({
            ...prevState,
            pageIndex: response?.data?.data?.pageIndex,
            pageSize: response?.data?.data?.pageSize,
            totalCount: response?.data?.data?.totalCount,
            totalPages: response?.data?.data?.totalPages,
            hasPreviousPage: response?.data?.data?.hasPreviousPage,
            hasNextPage: response?.data?.data?.hasNextPage,
          }));
          dispatch(setAddLoading(false));
        }
      });
    },
    [
      paginationData.pageSize,
      sortingOptions,
      paginationData.pageIndex,
      filteringOptions,
    ]
  );

  const handleDelete = (pageRedirectData) => {
    dispatch(setAddLoading(true));
    PageRedirect.updateStatusById({
      args: {
        id: pageRedirectData.id,
        rowVersion: pageRedirectData.rowVersion,
        status: RecStatusValuebyName.Archived,
        ...location,
      },
    })
      .then((response) => {
        if (response.data.data) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.pageRedirect.pageRedirectDeleted,
            })
          );
          getPageRedirectData();
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
            message: ValidationMsgs.pageRedirect.pageRedirectNotDeleted,
          });
        }
        dispatch(setAddLoading(false));
      });
    setOpenDeleteModal(false);
  };

  const COLUMNS = [
    {
      id: "storeName",
      Header: "Store Name",
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
      id: "oldUrl",
      Header: "Old Url",
      accessor: "oldUrl",
      column_name: "oldUrl",
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
      id: "newUrl",
      Header: "New Url",
      accessor: "newUrl",
      column_name: "newUrl",
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
      id: "action",
      Header: "",
      accessor: "id",
      column_name: "action",
      disableSortBy: true,
      Cell: ({ value, row }) => {
        return (
          <Actions
            id={value}
            row={row}
            setOpenDeleteModal={setOpenDeleteModal}
            setPageRedirectData={setPageRedirectData}
          />
        );
      },
    },
  ];

  return (
    <>
      <title>{TitleNameHelper({ defaultTitleName: "Page Redirect" })}</title>
      <div className="py-8">
        <div className="px-4 sm:px-6 lg:px-8 w-full items-center flex justify-between sticky top-0 z-20 py-2 bg-slate-100">
          <div className="col-span-full w-full flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
              {TitleNameHelper({ defaultTitleName: "Customer Gift Card" })}
            </h1>
            <div className="flex flex-wrap sm:auto-cols-min gap-2">
              <div>
                {(permission?.isEdit || permission?.isDelete) && (
                  <div className="flex flex-wrap sm:auto-cols-max gap-2">
                    <NavLink
                      to={"/admin/Master/Configuration/pageRedirect/create"}
                      className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                    >
                      <span className="material-icons-outlined"> add</span>
                      <span className="ml-1">Add Page Redirect</span>
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 sm:px-6 lg:px-8 w-full pt-7">
          <Messages />
          <div className="col-span-full w-full bg-white shadow-xxl rounded-md mb-8 relative">
            <ReactTable
              COLUMNS={COLUMNS}
              DATA={Data}
              {...paginationData}
              fetchData={getPageRedirectData}
              sortingOptions={sortingOptions}
              setSortingOptions={setSortingOptionHandler}
              setTablePageSize={(value) =>
                setPaginationDataFunc("pageSize", value)
              }
              editColumnFilter={true}
              filteringOptions={filteringOptions}
              setColumnFilteringOptions={setColumnFilteringOptions}
              hiddenColumns={[
                "rowSelection",
                permission?.isDelete ? "" : "action",
              ]}
              morefilter={true}
            />
          </div>
        </div>
      </div>
      <ConfirmDelete
        handleDelete={handleDelete}
        data={pageRedirectData}
        messages={ValidationMsgs.fixCharges.fixChargesPermanentDelete}
        title={"Delete"}
        module={"Page Redirect"}
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
      />
    </>
  );
};

export default List;
