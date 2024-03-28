/*Component Name: RequestConsultation
Component Functional Details: User can create or update RequestConsultation master details from here.
Created By: Shrey Patel
Created Date: 02/28/2023`1
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import React, { useCallback, useState, useMemo } from "react";
import Status from "components/common/displayStatus/Status";
import { useDispatch, useSelector } from "react-redux";
import { DateTimeFormat } from "services/common/helper/Helper";
import {
  defaultImage,
  paginationDetails,
  RecStatusValueForForm,
} from "global/Enum";
import ReactTable from "components/common/table/ReactTableServerSide";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import ConsultationRequestService from "services/admin/customer/ConsultationRequestService";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import CustomerService from "services/admin/customer/CustomerService";
import Image from "components/common/formComponent/Image";
import Actions from "./../../consultationRequest/Action";
import BasicModal from "components/common/modals/Basic";
import { ValidationMsgs } from "global/ValidationMessages";

const RequestConsultation = ({ customerInfo }) => {
  const permission = useSelector((store) => store.permission);
  const AdminAppConfigReducers = useSelector((store) => store?.AdminAppConfigReducers);
  const dispatch = useDispatch();
  const [Data, setData] = useState([]);
  const [openBasicModal, setOpenBasicModal] = useState(false);
  const [basicModalInfo, setBasicModalInfo] = useState({});
  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "name",
      direction: 0,
      priority: 0,
    },
  ]);
  const [selectedRows, setSelectedRows] = useState([]);
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

  const COLUMNS = [
    {
      id: "submissionDate",
      Header: "Submission Date",
      accessor: "submissionDate",
      column_name: "submissionDate",
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
      id: "firstName",
      Header: "First Name",
      accessor: "firstname",
      column_name: "firstname",
      Cell: ({ value, row }) => {
        return row ? (
          <>
            <div className="w-full flex justify-start items-center group">
              <div className="text-sm font-normal">{value ? value : ""}</div>
            </div>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "lastName",
      Header: "Last Name",
      accessor: "lastname",
      column_name: "lastname",
    },
    {
      id: "email",
      Header: "Email",
      accessor: "email",
      column_name: "email",
    },
    {
      id: "phone",
      Header: "Phone",
      accessor: "phone",
      column_name: "phone",
      Cell: ({ value, row }) => {
        return value ? value : "";
      },
    },
    {
      id: "inHandsDate",
      Header: "in Hands Date",
      accessor: "inHandsDate",
      column_name: "inHandsDate",
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
      id: "storeLogoUrl",
      Header: "Store Logo",
      accessor: "storeLogoUrl",
      column_name: "storeLogoUrl",
      disableSortBy: true,
      Cell: ({ value, row }) => {
        return value !== null && value !== "" && value !== undefined ? (
          <>
            <div className="flex items-center ">
              <Image
                className="w-20"
                containerHeight={"h-20"}
                src={value}
                alt={row.name}
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center ">
              <Image
                className="w-20"
                containerHeight={"h-20"}
                src={defaultImage}
              />
            </div>
          </>
        );
      },
    },
    {
      id: "storeName",
      Header: "Store Name",
      accessor: "storeName",
      column_name: "storeName",
      Cell: ({ value, row }) => {
        return row ? (
          <>
            <div className="w-full flex justify-start items-center group">
              <div className="text-sm font-normal">{value ? value : ""}</div>
            </div>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "productName",
      Header: "product Name",
      accessor: "productName",
      column_name: "productName",
      Cell: ({ value, row }) => {
        return value ? (
          <>
            <a href={row?.original?.url} target={"_blank"}>
              <span className="text-sm text-indigo-500">{value}</span>
            </a>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "logoUrl",
      Header: "Logo Url",
      accessor: "logoUrl",
      column_name: "logoUrl",
      Cell: ({ value }) => {
        return value ? (
          <>
            <a
              href={`${AdminAppConfigReducers["azure:BlobUrl"]}${value}`}
              target={"_blank"}
            >
              <span className="text-sm text-indigo-500">View Logo</span>
            </a>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "desiredQuantity",
      Header: "Desired Quantity",
      accessor: "desiredQuantity",
      column_name: "desiredQuantity",
    },
    {
      id: "message",
      Header: "Message",
      accessor: "message",
      column_name: "message",
    },
    {
      id: "status",
      Header: "Consultation Status",
      accessor: "status",
      column_name: "status",
      Cell: ({ value }) => {
        return <Status type={value} />;
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
      id: "gclid",
      Header: "GCLID",
      accessor: "gclid",
      column_name: "gclid",
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
            setOpenBasicModal={setOpenBasicModal}
            setBasicModalInfo={setBasicModalInfo}
          // handleShowModal={handleShowModal}
          // setOpenConsultationModal={setOpenConsultationModal}
          // setModalInformation={setModalInformation}
          />
        );
      },
    },
  ];

  const getConsultationRequestByCustomerId = useCallback(
    (pageIndex = 1) => {
      dispatch(setAddLoading(true));

      CustomerService.getConsultationRequestByCustomerId({
        args: {
          pageSize: paginationData.pageSize,
          pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
          sortingOptions,
          filteringOptions,
        },
        customerId: customerInfo.id,
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
  const handleSort = (sortValue) => { };

  const statusChangedHandler = (data) => {
    dispatch(setAddLoading(true));
    if (data.id) {
      ConsultationRequestService.updateStatusConsultationRequest(data)
        .then((response) => {
          if (response.data.success) {
            dispatch(
              setAlertMessage({
                type: "success",
                message: `${ValidationMsgs.consultationRequestStatus.statusChanged
                  } ${data?.status === "Inprogress" ? "In Progress" : data?.status
                  }`,
              })
            );
            getConsultationRequestByCustomerId();
          } else {
            dispatch(
              setAlertMessage({
                type: "danger",
                message: ValidationMsgs.consultationRequestStatus.statusNotChange,
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
                message: "Consultation Status not changed",
              })
            );
          }
          dispatch(setAddLoading(false));
        });
    }
    setOpenBasicModal(false);
  };

  const moreFilterOptions = useMemo(
    () => [
      {
        name: "From Date",
        columnName: "submissionDate",
        options: [],
        type: "date",
      },
      {
        name: "To Date",
        columnName: "inHandsDate",
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
    ],
    []
  );

  return (
    <>
      <ReactTable
        COLUMNS={COLUMNS}
        DATA={Data}
        {...paginationData}
        setTablePageSize={(value) => setPaginationDataFunc("pageSize", value)}
        fetchData={getConsultationRequestByCustomerId}
        sortingOptions={sortingOptions}
        setSortingOptions={setSortingOptionHandler}
        handleSort={handleSort}
        // column filters
        editColumnFilter={false}
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setColumnFilteringOptions}
        setSelectedRows={setSelectedRows}
        moreFilterOption={false}
        selectedRows={selectedRows}
        hiddenColumns={[
          "rowSelection",
          permission?.isEdit || permission?.isDelete ? "" : "action",
        ]}
      />

      <BasicModal
        handleConfirmation={statusChangedHandler}
        openModal={openBasicModal}
        setOpenModal={setOpenBasicModal}
        {...basicModalInfo}
      />
    </>
  );
};

export default RequestConsultation;
