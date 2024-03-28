import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { ValidationMsgs } from "global/ValidationMessages";
import { paginationDetails } from "global/Enum";
import { API } from "helpers/API";

import { DateTimeFormat, TitleNameHelper } from "services/common/helper/Helper";
import TemplateService from "services/admin/template/TemplateService";
import { serverError } from "services/common/helper/Helper";

import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";

import ReactTable from "components/common/table/ReactTableServerSide";
import ConfirmDelete from "components/common/modals/ConfirmDelete";
import Messages from "components/common/alerts/messages/Index";

import Actions from "./Action";
import CreateTemplatePopup from "./CreateTemplatePopup";

const List = () => {
  const dispatch = useDispatch();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [basicModalInfo, setBasicModalInfo] = useState({});
  const [openBasicModal, setOpenBasicModal] = useState(false);
  const [GridView, setGridView] = useState(false);
  const [viewHistoryModal, setViewHistoryModal] = useState(false);
  const [RecordId, setRecordId] = useState(null);
  const [Data, setData] = useState([]);

  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "name",
      direction: 0,
      priority: 0,
    },
  ]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filteringOptions, setColumnFilteringOptions] = useState([]);
  const permission = useSelector((store) => store?.permission);
  const getTemplateData = useCallback((pageIndex = 1) => {
    dispatch(setAddLoading(true));

    TemplateService.getTemplates({
      args: {
        pageIndex: 0,
        pageSize: 0,
        pagingStrategy: 0,
        sortingOptions: [
          {
            field: "string",
            direction: 0,
            priority: 0,
          },
        ],
        filteringOptions: [
          {
            field: "string",
            operator: 0,
            value: "string",
          },
        ],
      },
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
      .catch((err) => {
        // Handle error
        console.log(err);
        dispatch(setAddLoading(false));
      });
  }, []);

  const ListGridButton = () => {
    return (
      <div className="flex " style={{ marginLeft: "12px" }}>
        <button
          onClick={() => setGridView(true)}
          className={`flex flex-wrap rounded-l items-center text-sm px-3 py-2 leading-6 bg-white border hover:text-indigo-500 hover:border-indigo-300 ${GridView ? "text-indigo-500 border-indigo-300" : "border-gray-300"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="fill-current w-4 h-4 mr-2"
          >
            <rect x={3} y={3} width={7} height={7} />{" "}
            <rect x={14} y={3} width={7} height={7} />{" "}
            <rect x={14} y={14} width={7} height={7} />{" "}
            <rect x={3} y={14} width={7} height={7} />
          </svg>
          <span>Grid</span>
        </button>

        <button
          onClick={() => setGridView(false)}
          className={`flex flex-wrap rounded-r items-center text-sm px-3 py-2 leading-6 bg-white border hover:text-indigo-500 hover:border-indigo-300 ${!GridView ? "text-indigo-500 border-indigo-300" : "border-gray-300"}  text-gray-600`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="fill-current w-4 h-4 mr-2"
          >
            <line x1={8} y1={6} x2={21} y2={6} />{" "}
            <line x1={8} y1={12} x2={21} y2={12} />{" "}
            <line x1={8} y1={18} x2={21} y2={18} />{" "}
            <line x1={3} y1={6} x2="3.01" y2={6} />{" "}
            <line x1={3} y1={12} x2="3.01" y2={12} />{" "}
            <line x1={3} y1={18} x2="3.01" y2={18} />
          </svg>
          <span>List</span>
        </button>
      </div>
    );
  };

  const COLUMNS = [
    {
      id: "name",
      Header: "name",
      accessor: "title",
      column_name: "title",
      Cell: ({ value, row }) => {
        return value != null ? (
          <>
            <div
              className="w-full flex justify-start items-center group + cursor-pointer"
              style={{ width: "200px" }}
            >
              <Link
                className="text-sm font-normal"
                to={"/admin/Content/template/edit/" + row.original.id}
              >
                {value ? value : "-"}
              </Link>
            </div>
          </>
        ) : (
          "-"
        );
      },
    },
    {
      id: "createdAt",
      Header: "Created Date",
      accessor: "created_At",
      column_name: "createdAt",
      Cell: ({ value }) => {
        return value ? (
          <>
            <div>{DateTimeFormat(value).date} </div>
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
      accessor: "created_By",
      column_name: "createdBy",
      Cell: ({ value }) => {
        return value ? (
          <>
            <div>{value}</div>
          </>
        ) : (
          "-"
        );
      },
    },
    {
      id: "updatedAt",
      Header: "Update Date",
      accessor: "updated_At",
      column_name: "updatedAt",
      Cell: ({ value }) => {
        return value ? (
          <>
            <div>{DateTimeFormat(value).date} </div>
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
      id: "updatedBy",
      Header: "Updated By",
      accessor: "updated_By",
      column_name: "updatedBy",
      Cell: ({ value }) => {
        return value ? (
          <>
            <div>{value}</div>
          </>
        ) : (
          "-"
        );
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
            setOpenDeleteModal={setOpenDeleteModal}
            setBasicModalInfo={setBasicModalInfo}
            setOpenBasicModal={setOpenBasicModal}
            setViewHistoryModal={setViewHistoryModal}
            setRecordId={setRecordId}
          />
        );
      },
      disableSortBy: true,
      disableShowHide: true,
    },
  ];

  const GRIDCOLUMNS = [
    {
      id: "imageName",
      Header: "imageName",
      accessor: "image_src",
      column_name: "imageName",
      disableShowHide: true,
      Cell: ({ value, row }) => {
        return row ? (
          <>
            <div className="col-span-full sm:col-span-6 xl:col-span-3 bg-white shadow-lg rounded-sm border border-neutral-200 overflow-hidden">
              <div className="flex flex-col h-full">
                <div className="h-96 border-b overflow-hidden">
                  <img
                    className="w-full"
                    src={row?.original?.image_src}
                    width={286}
                    alt={row?.original?.name}
                  />
                </div>
                <div className="grow flex flex-col p-5">
                  <div className="grow">
                    <header className="flex justify-between">
                      <h3 className="text-lg text-left text-gray-800 font-semibold">
                        <a href="javascript:void(0)">
                          {row?.original?.title ? row?.original?.title : "-"}
                        </a>
                      </h3>
                    </header>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          "-"
        );
      },
    },
  ];

  const handleSort = (sortValue) => { };
  const setSortingOptionHandler = (column, direction) => {
    setSortingOptions([
      {
        field: column,
        direction: direction,
        priority: 0,
      },
    ]);
  };
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
  });
  const setPaginationDataFunc = (key, value) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleDelete = (topic) => {
    dispatch(setAddLoading(true));

    const url = `/CmsTemplateController/delete/${RecordId}.json`;
    API.get(url)
      .then((response) => {
        if (response.data.success) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs?.template?.deletedSuccessFully,
            }),
          );
          getTemplateData();
          setOpenDeleteModal(false);
        } else {
          dispatch(
            setAlertMessage({
              type: "danger",
              message: serverError(response),
            }),
          );
        }
        dispatch(setAddLoading(false));
      })
      .catch((error) => {
        dispatch(setAddLoading(false));
        dispatch(
          setAlertMessage({
            type: "danger",
            message: serverError(error),
          }),
        );
      });
  };

  return (
    <>
      <title>{TitleNameHelper({ defaultTitleName: "Template" })}</title>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="sm:flex sm:justify-between sm:items-center mb-8">
          <div className="col-span-full w-full flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
              {TitleNameHelper({ defaultTitleName: "Template" })}
            </h1>
            {(permission.isEdit || permission.isDelete) && (
              <div className="relative inline-flex">
                <CreateTemplatePopup />
              </div>
            )}
          </div>
        </div>

        <Messages />
        <div className="col-span-full w-full bg-white shadow-xxl rounded-md mb-8 relative">
          <ReactTable
            COLUMNS={GridView ? GRIDCOLUMNS : COLUMNS}
            DATA={Data}
            {...paginationData}
            sortingOptions={sortingOptions}
            fetchData={getTemplateData}
            setSortingOptions={setSortingOptionHandler}
            setPageIndex={(value) => setPaginationDataFunc("pageIndex", value)}
            setTablePageSize={(value) =>
              setPaginationDataFunc("pageSize", value)
            }
            handleSort={handleSort}
            // column filters
            filteringOptions={filteringOptions}
            setColumnFilteringOptions={setColumnFilteringOptions}
            editColumnFilter={false}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            hiddenColumns={GridView ? ["rowSelection"] : ["rowSelection", "id"]}
            colSpan={4}
            Gap={6}
            GridView={GridView}
            extraFilter={[{ Component: ListGridButton }]}
            expanded
          />
        </div>
        <ConfirmDelete
          handleDelete={handleDelete}
          data={Data}
          message="Deleting this Template will permanently remove this record from your account. This can't be undone"
          title={"Delete"}
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      </div>
    </>
  );
};

export default List;
