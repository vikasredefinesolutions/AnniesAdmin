import React, { useCallback, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { RecStatusValuebyName, anniesAnnualData, paginationDetails, RecStatusValueForForm } from "global/Enum";
import { ValidationMsgs } from "global/ValidationMessages";

import SlideShowServices from "services/admin/SlideShowMaster/SlideShowServices";
import { TitleNameHelper, serverError } from "services/common/helper/Helper";

import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";

import ConfirmDelete from "components/common/modals/ConfirmDelete";
import ReactTable from "components/common/table/ReactTableServerSide";
import Messages from "components/common/alerts/messages/Index";
import Image from "components/common/formComponent/Image";

import Actions from "./Action";

const CustomerGiftCard = () => {
  const dispatch = useDispatch();
  const location = useSelector((store) => store?.location);

  const [Data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [sortingOptions, setSortingOptions] = useState([{ field: "name", direction: 0, priority: 0 }]);
  const [filteringOptions, setColumnFilteringOptions] = useState([]);
  const [paginationData, setPaginationData] = useState({ ...paginationDetails });

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

  const getSlideShowData = useCallback((pageIndex = 1) => {
    dispatch(setAddLoading(true));
    SlideShowServices.listSlideShow({
      args: {
        pageSize: paginationData.pageSize,
        pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
        pagingStrategy: 0,
        sortingOptions,
        filteringOptions: [
          ...filteringOptions,
          {
            field: "String",
            operator: 0,
            value: ""
          },
        ],
        storeId: anniesAnnualData.storeId
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
      }
      dispatch(setAddLoading(false));
    });
  }, [paginationData.pageSize, sortingOptions, paginationData.pageIndex, filteringOptions]);

  const handleDelete = (dataToDelete) => {

    dispatch(setAddLoading(true))

    SlideShowServices.updateSlideShowStatus({
      args: {
        id: dataToDelete.id,
        rowVersion: dataToDelete.rowVersion,
        status: RecStatusValuebyName.Archived,
        ...location,
      },
    }).then((response) => {
      if (response.data.data) {
        dispatch(
          setAlertMessage({
            view: true,
            type: "success",
            message: ValidationMsgs.SlideShow.SlideShowDeleted,
          })
        );
        getSlideShowData();

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
          setAlertMessage({ message: ValidationMsgs.SlideShow.SlideShowDeleted, type: "danger" })
        );
      }
      dispatch(setAddLoading(false))
    });
    setEditId(null);
  };

  const COLUMNS = [
    {
      id: "imagePath",
      Header: () => {
        return <div className="w-10 text-center">
          <span className="">Image</span>
        </div>
      },
      accessor: "imagePath",
      column_name: "imagePath",
      Cell: ({ value, row }) => {
        return row ? (
          <div className="w-10">
            <NavLink
              to={`/admin/Master/GardeningSlideshows/edit/${row.original.id}`}>
              <Image src={value} className="w-20" containerHeight={"h-20"} />
            </NavLink>
          </div>
        ) : (
          ""
        );
      },
    },
    {
      id: "title",
      Header: "TITLE",
      accessor: "title",
      column_name: "title",
      Cell: ({ value, row }) => {
        return value ? (
          <>
            <NavLink
              to={
                `/admin/Master/GardeningSlideshows/edit/${row.original.id}`}>
              <div className="text-sm font-normal">
                {value ? value : ""}
              </div>
            </NavLink>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "slides",
      Header: "SLIDES",
      accessor: "slides",
      column_name: "slides",
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
      id: "createdName",
      Header: "CREATED BY",
      accessor: "createdName",
      column_name: "createdName",
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
            setEditId={setEditId}
          />
        );
      },
    },
  ];

  const moreFilterOptions = useMemo(
    () => [
      {
        name: "Status",
        options: RecStatusValueForForm,
        columnName: "recStatus",
        type: "checkbox",
        conditionalSearch: true,
      },
    ], []);

  return (
    <>
      <title>
        {TitleNameHelper({
          defaultTitleName: "Gardening Slideshows"
        })}
      </title>

      <div className="py-8">
        <div className="px-4 sm:px-6 lg:px-8 w-full items-center flex justify-between sticky top-0 z-20 py-2 bg-slate-100">
          <div className="col-span-full w-full flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
              {TitleNameHelper({
                defaultTitleName: "Gardening Slideshows"
              })}
            </h1>
            <div className="flex flex-wrap sm:auto-cols-min gap-2">
              <NavLink
                to={"create"}>
                <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white" type="button">
                  <span className="material-icons-outlined">add</span>
                  <span className="ml-1">
                    Add {TitleNameHelper({
                      defaultTitleName: `Gardening Slideshows`
                    })}
                  </span>
                </button>
              </NavLink>

            </div>
          </div>
        </div>
        <div
          className={"px-4 sm:px-6 lg:px-8 w-full pt-7"}>
          <Messages />
          <div className={`col-span-full w-full bg-white shadow-xxl rounded-md mb-8 relative`}>
            <ReactTable
              COLUMNS={COLUMNS}
              DATA={Data}
              {...paginationData}
              fetchData={getSlideShowData}
              sortingOptions={sortingOptions}
              setSortingOptions={setSortingOptionHandler}
              setTablePageSize={(value) => setPaginationDataFunc("pageSize", value)}
              editColumnFilter={true}
              filteringOptions={filteringOptions}
              setColumnFilteringOptions={setColumnFilteringOptions}
              hiddenColumns={["rowSelection"]}
              moreFilterOption={moreFilterOptions}
            />
          </div>
        </div>
      </div>

      <ConfirmDelete
        handleDelete={handleDelete}
        data={editId}
        message={ValidationMsgs.SlideShow.SlideShowDeleted}
        title={"Delete"}
        openDeleteModal={editId}
        setOpenDeleteModal={setEditId}
      />

    </>
  );
};

export default CustomerGiftCard;
