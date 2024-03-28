import React, { useCallback, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";

import {
  CurrencySymbolByCode,
  paginationDetails,
  RecStatusValuebyName,
  RecStatusValueForForm,
} from "global/Enum";
import { ValidationMsgs } from "global/ValidationMessages";

import {
  DateTimeFormat,
  TitleNameHelper,
  serverError,
} from "services/common/helper/Helper";
import CustomerGiftCardServices from "services/admin/customer/CustomerGiftCardServices";

import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";

import ReactTable from "components/common/table/ReactTableServerSide";
import ConfirmDelete from "components/common/modals/ConfirmDelete";
import Messages from "components/common/alerts/messages/Index";
import Status from "components/common/displayStatus/Status";
import BasicModal from "components/common/modals/Basic";

import CustomerAddUpdateModal from "./GiftCardModal";
import Actions from "./Action";

const CustomerGiftCard = ({
  isEditCustomerShow = false,
  storeIdFromCustomerEdit,
}) => {
  const dispatch = useDispatch();
  const location = useSelector((store) => store?.location);

  const [Data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [openCustomerAddUpdateModal, setOpenCustomerAddUpdateMofal] =
    useState(false);
  const [sortingOptions, setSortingOptions] = useState([
    { field: "name", direction: 0, priority: 0 },
  ]);
  const [filteringOptions, setColumnFilteringOptions] = useState([]);
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
  });
  const [basicModalInfo, setModalInfo] = useState({});
  const [openBasicModal, setOpenBasicModal] = useState(false);

  const handleShowModal = () => {
    setOpenCustomerAddUpdateMofal((prev) => !prev);
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

  const getCustomerGiftCardData = useCallback(
    (pageIndex = 1) => {
      dispatch(setAddLoading(true));
      CustomerGiftCardServices.getCustomerGiftCard({
        args: {
          pageSize: paginationData.pageSize,
          pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
          sortingOptions,
          filteringOptions: filteringOptions,
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
    },
    [
      paginationData.pageSize,
      sortingOptions,
      paginationData.pageIndex,
      filteringOptions,
      storeIdFromCustomerEdit,
    ]
  );

  const handleDelete = (data) => {
    dispatch(setAddLoading(true));

    CustomerGiftCardServices.updateCustomerGiftCardStatus({
      args: {
        id: data.id,
        rowVersion: data.rowVersion,
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
              message: ValidationMsgs.giftCard.giftCardDeleted,
            })
          );
          getCustomerGiftCardData();
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
              message: ValidationMsgs.giftCard.giftCardDeleted,
              type: "danger",
            })
          );
        }
        dispatch(setAddLoading(false));
      });
    setEditId(null);
  };

  const statusChangedHandler = (data) => {
    if (data?.id) {
      dispatch(setAddLoading(true));

      CustomerGiftCardServices.updateCustomerGiftCardStatus({
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
                message: ValidationMsgs.giftCard.giftCardUpdated,
              })
            );
            getCustomerGiftCardData();
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
                message: ValidationMsgs.giftCard.giftCardNotUpdated,
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
      id: "serialNumber",
      Header: "GIFT CARD NUMBER",
      accessor: "serialNumber",
      column_name: "serialNumber",
      Cell: ({ value, row }) => {
        return row ? (
          <>
            {isEditCustomerShow === true ? (
              value
            ) : (
              <div
                className="cursor-pointer"
                onClick={() => {
                  setEditId(row.original.id);
                  handleShowModal();
                }}
              >
                {value}
              </div>
            )}
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "sku",
      Header: "SKU/ ID",
      accessor: "sku",
      column_name: "sku",
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
    // {
    //   id: "recipientName",
    //   Header: "Recipient Name",
    //   accessor: "recipientName",
    //   column_name: "recipientName",
    //   Cell: ({ value }) => {
    //     return value ? (
    //       <>
    //         <div>{value}</div>
    //       </>
    //     ) : (
    //       ""
    //     );
    //   },
    // },
    // {
    //   id: "emailTo",
    //   Header: "Email To",
    //   accessor: "emailTo",
    //   column_name: "emailTo",
    //   Cell: ({ value }) => {
    //     return value ? (
    //       <>
    //         <div>{value}</div>
    //       </>
    //     ) : (
    //       ""
    //     );
    //   },
    // },
    {
      id: "balance",
      Header: `AVAILABLE BALANCE (${CurrencySymbolByCode.USD})`,
      accessor: "balance",
      column_name: "balance",
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
      id: "initialAmount",
      Header: `ISSUE BALANCE (${CurrencySymbolByCode.USD})`,
      accessor: "initialAmount",
      column_name: "initialAmount",
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
      id: "orderNumber",
      Header: "LAST USED ORDER NUMBER",
      accessor: "orderNumber",
      column_name: "orderNumber",
      Cell: ({ value }) => {
        return value && value !== 0 ? <div>{`#${value}`}</div> : "";
      },
    },
    {
      id: "lastUsedDate",
      Header: "LAST USED DATE",
      accessor: "lastUsedDate",
      column_name: "lastUsedDate",
      Cell: ({ value, row }) => {
        return value ? (
          <>
            <div>
              {row?.original?.lastUsedCustomerEmail &&
                DateTimeFormat(value).date}{" "}
            </div>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "lastUsedCustomerName",
      Header: "LAST USED CUSTOMER NAME",
      accessor: "lastUsedCustomerName",
      column_name: "lastUsedCustomerName",
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
      id: "lastUsedCustomerEmail",
      Header: "LAST USED CUSTOMER EMAIL ID",
      accessor: "lastUsedCustomerEmail",
      column_name: "lastUsedCustomerEmail",
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
      id: "issueDate",
      Header: "Expiry  Date",
      accessor: "issueDate",
      column_name: "issueDate",
      Cell: ({ value }) => {
        return value ? (
          <>
            <div>{DateTimeFormat(value).date} </div>
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
      Cell: ({ value }) => {
        if (!value) {
          return "";
        } else {
          return value;
        }
      },
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
      disableSortBy: true,
      Cell: ({ value, row }) => {
        return (
          <Actions
            handleShowModal={handleShowModal}
            id={value}
            row={row}
            setEditId={setEditId}
            setModalInfo={setModalInfo}
            setOpenBasicModal={setOpenBasicModal}
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
      // {
      //   name: "Edit Column",
      //   columnName: "editColumn",
      //   options: [],
      //   type: "checkbox",
      // },
      // {
      //   name: "Sort",
      //   options: [],
      //   columnName: "sort",
      //   type: "checkbox",
      // },
      // {
      //   name: "Created Date",
      //   columnName: "createddate",
      //   options: [],
      //   type: "date",
      // },
      // {
      //   name: "Created By",
      //   columnName: "createdby",
      //   options: [],
      //   type: "date",
      // },
      // {
      //   name: "Updated Date",
      //   columnName: "modifiedDate",
      //   options: [],
      //   type: "date",
      // },
      // {
      //   name: "Updated By",
      //   options: [],
      //   columnName: "modifiedBy",
      //   type: "checkbox",
      // },
      // {
      //   name: "Filter By",
      //   columnName: "filterby",
      //   options: RecStatusValueForForm,
      //   type: "radio",
      //   conditionalSearch: true,
      // },
    ],
    []
  );

  return (
    <>
      <title>{TitleNameHelper({ defaultTitleName: "Gift Card" })}</title>

      <div className="py-8">
        {isEditCustomerShow === true ? (
          ""
        ) : (
          <div className="px-4 sm:px-6 lg:px-8 w-full items-center flex justify-between sticky top-0 z-20 py-2 bg-slate-100">
            <div className="col-span-full w-full flex justify-between items-center">
              <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
                {TitleNameHelper({ defaultTitleName: "Gift Card" })}
              </h1>
              <div className="flex flex-wrap sm:auto-cols-min gap-2">
                <button
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                  type="button"
                  onClick={() => {
                    setEditId(null);
                    handleShowModal();
                  }}
                >
                  <span className="material-icons-outlined">add</span>
                  <span className="ml-1">
                    Add {TitleNameHelper({ defaultTitleName: `Gift Card` })}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
        <div
          className={
            isEditCustomerShow === true
              ? ""
              : "px-4 sm:px-6 lg:px-8 w-full pt-7"
          }
        >
          {!openCustomerAddUpdateModal && <Messages />}
          <div
            className={`col-span-full w-full ${
              isEditCustomerShow === true ? "" : "bg-white shadow-xxl"
            } rounded-md mb-8 relative`}
          >
            <ReactTable
              COLUMNS={COLUMNS}
              DATA={Data}
              {...paginationData}
              fetchData={getCustomerGiftCardData}
              sortingOptions={sortingOptions}
              setSortingOptions={setSortingOptionHandler}
              setTablePageSize={(value) =>
                setPaginationDataFunc("pageSize", value)
              }
              editColumnFilter={isEditCustomerShow === true ? false : true}
              filteringOptions={filteringOptions}
              setColumnFilteringOptions={setColumnFilteringOptions}
              hiddenColumns={[
                "rowSelection",
                isEditCustomerShow === true ? "action" : "",
              ]}
              moreFilterOption={moreFilterOptions}
            />
          </div>
        </div>
      </div>
      {openCustomerAddUpdateModal ? (
        <CustomerAddUpdateModal
          handleShowModal={handleShowModal}
          editId={editId}
          getCustomerGiftCardData={getCustomerGiftCardData}
        />
      ) : (
        <ConfirmDelete
          handleDelete={handleDelete}
          data={editId}
          message={ValidationMsgs.giftCard.giftCardDeleted}
          title={"Delete"}
          openDeleteModal={editId}
          setOpenDeleteModal={setEditId}
        />
      )}

      <BasicModal
        handleConfirmation={statusChangedHandler}
        openModal={openBasicModal}
        setOpenModal={setOpenBasicModal}
        {...basicModalInfo}
      />
    </>
  );
};

export default CustomerGiftCard;
