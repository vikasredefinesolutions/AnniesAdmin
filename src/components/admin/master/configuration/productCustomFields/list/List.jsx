import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { RecStatusValue, RecStatusValuebyName, paginationDetails } from "global/Enum";
import { ValidationMsgs } from "global/ValidationMessages";

import ProductCustomFieldsServices from "services/admin/productCustomFields/ProductCustomFieldsServices";
import { DateTimeFormat, TitleNameHelper, serverError } from "services/common/helper/Helper";
import DropdownServiceCls from "services/common/dropdown/DropdownService";

import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";

import ConfirmDelete from "components/common/modals/ConfirmDelete";
import Messages from "components/common/alerts/messages/Index";
import Status from "components/common/displayStatus/Status";
import BasicModal from "components/common/modals/Basic";

import ReactTable from "../../../../../common/table/ReactTableServerSide";
import CheckBoxAction from "./CheckBoxAction";
import Actions from "./Actions";

const List = () => {
  const dispatch = useDispatch();

  const permission = useSelector((store) => store.permission);
  const location = useSelector((store) => store?.location);

  const [Data, setData] = useState([]);
  const [filteringOptions, setColumnFilteringOptions] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [userNameValues, setUserNameValues] = useState([]);
  const [ModalInfo, setModalInfo] = useState({});
  const [openBasicModal, setOpenBasicModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [productCustomFields, setProductCustomFields] = useState(null);
  const [paginationData, setPaginationData] = useState({ ...paginationDetails });
  const [sortingOptions, setSortingOptions] = useState([{ field: "name", direction: 0, priority: 0 }]);

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

  const ProductCustomFieldsList = useCallback(
    (pageIndex = 1) => {
      dispatch(setAddLoading(true));
      ProductCustomFieldsServices.getProductCustomFieldsList({
        args: {
          pageSize: paginationData.pageSize,
          pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
          pagingStrategy: 0,
          sortingOptions,
          filteringOptions,
        },
      }).then((response) => {
        if (response.data.success && response.data.data) {
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
        }
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

  const statusChangedHandler = (data) => {
    const object = {
      id: data.id,
      status: data.changeStatus,
      rowVersion: data.rowVersion,
    };
    dispatch(setAddLoading(true));

    ProductCustomFieldsServices.updateStatus({
      args: { ...object, ...location },
    })
      .then((response) => {
        if (response?.data?.success) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.productCustomFields.updated,
            })
          );
          ProductCustomFieldsList();
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
            message: ValidationMsgs.productCustomFields.notUpdated
          })
        );
        dispatch(setAddLoading(false));
      });
    setOpenBasicModal(false);
  };

  const handleDelete = (category) => {
    var ids = [];
    dispatch(setAddLoading(true));

    if (category.length > 0) {
      ids = category.map((value) => {
        return { item1: value.id, item2: value.rowVersion };
      });
    } else {
      ids = [{ item1: category.id, item2: category.rowVersion }];
    }
    ProductCustomFieldsServices.updateMultipleStatus({
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
              message: ValidationMsgs.productCustomFields.deleted,
            })
          );
          ProductCustomFieldsList();
        } else {
          dispatch(
            setAlertMessage({
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
              type: "danger",
              message: errors.response.data.Errors.Error,
            })
          );
        } else {
          dispatch(
            setAlertMessage({
              type: "danger",
              message: ValidationMsgs.productCustomFields.notDeleted,
            })
          );
        }
        dispatch(setAddLoading(false));
      });
    setOpenDeleteModal(false);
  };

  const COLUMNS = [
    {
      id: "customFieldName",
      Header: "Title",
      accessor: "customFieldName",
      column_name: "customFieldName",
      Cell: ({ value, row }) => {
        return value ? (
          <>
            <div>
              <NavLink
                to={`/admin/master/Configuration/ProductCustom/edit/${row.original.id}`}
              >
                <div className="font-semibold">{value}</div>
              </NavLink>
            </div>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "displayOrder",
      Header: "Display Order",
      accessor: "displayOrder",
      column_name: "displayOrder",
      Cell: ({ value }) => {
        return value ? <div>{value}</div> : "";
      },
    },
    {
      id: "customFieldType",
      Header: "Custom Field Type",
      accessor: "customFieldType",
      column_name: "customFieldType",
    },

    {
      id: "createdDate",
      Header: "Created Date",
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
      id: "modifiedDate",
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
      id: "modifiedName",
      Header: "Updated By",
      accessor: "modifiedName",
      column_name: "modifiedName",
    },
    {
      id: "recStatus",
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
            setProductCustomFields={setProductCustomFields}
            openDeleteModal={openDeleteModal}
            setOpenDeleteModal={setOpenDeleteModal}
            setModalInfo={setModalInfo}
            setOpenBasicModal={setOpenBasicModal}
          />
        );
      },
      disableSortBy: true,
      disableShowHide: true,
    },
  ];

  const moreFilterOptions = useMemo(
    () => [
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
        options: RecStatusValue,
        type: "radio",
        conditionalSearch: true,
      },
    ],
    [userNameValues]
  );

  useEffect(() => {
    DropdownServiceCls.getDropdownValues("adminuser").then((response) => {
      setUserNameValues(response.data.data);
    });
  }, []);

  return (
    <>
      <title>{TitleNameHelper({ defaultTitleName: "Product Custom" })}</title>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="sm:flex sm:justify-between sm:items-center mb-8">
          <div className="col-span-full w-full flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
              {TitleNameHelper({ defaultTitleName: "Product Custom" })}
            </h1>
            {(permission?.isEdit || permission?.isDelete) && (
              <div className="flex flex-wrap sm:auto-cols-max gap-2">
                <NavLink
                  to={"create"}
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                >
                  <span className="material-icons-outlined">add</span>
                  <span className="ml-1">Add Product Custom</span>
                </NavLink>
              </div>
            )}
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
            fetchData={ProductCustomFieldsList}
            sortingOptions={sortingOptions}
            setSortingOptions={setSortingOptionHandler}
            // column filters
            editColumnFilter={true}
            filteringOptions={filteringOptions}
            setColumnFilteringOptions={setColumnFilteringOptions}
            CheckBoxAction={useCallback(
              ({ ...rest }) => (
                <CheckBoxAction
                  setProductCustomFields={setProductCustomFields}
                  setSelectedRows={setSelectedRows}
                  setOpenDeleteModal={setOpenDeleteModal}
                  permission={permission}
                  {...rest}
                />
              ),
              []
            )}
            setSelectedRows={setSelectedRows}
            moreFilterOption={moreFilterOptions}
            selectedRows={selectedRows}
            hiddenColumns={[permission?.isDelete ? "" : "rowSelection"]}
          />
        </div>
      </div>
      <ConfirmDelete
        handleDelete={handleDelete}
        data={productCustomFields}
        message={
          "Deleting these Category will permanently remove this record from your account. This can't be undone."
        }
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
    </>
  );
};

export default List;
