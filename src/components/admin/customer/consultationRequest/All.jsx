import React, { useCallback, useEffect, useState, useMemo } from "react";
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
import Image from "components/common/formComponent/Image";
import Actions from "./Action";
import BasicModal from "components/common/modals/Basic";
import { ValidationMsgs } from "global/ValidationMessages";
import { replaceMyBaseUrl } from "services/common/helper/Helper";

const All = ({
  activeTab,
  filterData,
  storeFilter,
  setStoreFilter,
  tab,
  setExportCSVData,
}) => {
  const dispatch = useDispatch();
  const permission = useSelector((store) => store.permission);
  const AdminAppConfigReducers = useSelector(
    (store) => store?.AdminAppConfigReducers
  );
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
  const [filteringOptions, setColumnFilteringOptions] = useState(filterData);
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
  });

  const [openConsultationModal, setOpenConsultationModal] = useState(false);
  const handleShowModal = () => {
    setOpenConsultationModal((prev) => !prev);
  };

  const [modalInformation, setModalInformation] = useState({});

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

  const getConsultationAndProof = useCallback(
    (pageIndex = 1) => {
      dispatch(setAddLoading(true));

      ConsultationRequestService.getConsultationAndProof({
        args: {
          pageSize: paginationData.pageSize,
          pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
          sortingOptions,
          filteringOptions,
        },
        storeId: storeFilter > 0 ? storeFilter : 0,
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
      storeFilter,
      activeTab,
    ]
  );
  useEffect(() => {
    setExportCSVData({
      newargs: {
        pageSize: 100000,
        pageIndex: 1 || paginationData.pageIndex,
        pagingStrategy: 0,
        sortingOptions,
        filteringOptions,
      },
      storeId: storeFilter,
    });
  }, [filteringOptions, storeFilter]);

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
            getConsultationAndProof();
          } else {
            dispatch(

              setAlertMessage({
                type: "danger",
                message:
                  ValidationMsgs.consultationRequestStatus.statusNotChange,
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
                message: ValidationMsgs.consultationRequestStatus.statusNotChange,
              })
            );
          }
          dispatch(setAddLoading(false));
        });
    }
    setOpenBasicModal(false);
  };

  useEffect(() => {
    setSortingOptions([
      ...sortingOptions,
      {
        field: "submissionDate",
        direction: 1,
        priority: 0,
      },
    ]);
  }, []);

  useEffect(() => {
    if (storeFilter) {
      getConsultationAndProof();
    }
  }, [storeFilter]);

  const handleSort = (sortValue) => { };

  const COLUMNS = [
    {
      id: "storeLogoUrl",
      Header: "Store Image",
      accessor: "storeLogoUrl",
      column_name: "storeLogoUrl",
      disableSortBy: true,
      Cell: ({ value, row }) => {
        return value &&
          value !== "" &&
          value !== undefined &&
          value.length > 0 ? (
          <>
            <div className="flex items-center h-40">
              <Image src={value} className="w-40" containerHeight={"h-20"} />
            </div>
          </>
        ) : (
          <div className="flex items-center h-40">
            <Image
              src={defaultImage}
              className="w-40"
              containerHeight={"h-20"}
            />
          </div>
        );
      },
    },
    {
      id: "storeName",
      Header: "Store Name",
      accessor: "storeName",
      column_name: "storeName",
      Cell: ({ value, row }) => {
        return value ? (
          <>
            <div
              className="w-full flex justify-start items-center group"
              style={{ width: "200px" }}
            >
              <div className="text-sm font-normal">{value ? value : ""}</div>
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
        return value ? (
          <>
            <div
              className="w-full flex justify-start items-center group"
              style={{ width: "200px" }}
            >
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
      Header: "Company Phone",
      accessor: "phone",
      column_name: "phone",
      Cell: ({ value, row }) => {
        return value ? value : "";
      },
    },
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
      id: "productName",
      Header: "product Name",
      accessor: "productName",
      column_name: "productName",
      Cell: ({ value, row }) => {
        return value ? (
          <>
            <a href={row.original.url} target={"_blank"}>
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
      disableSortBy: true,
      Cell: ({ value }) => {
        return value ? (
          <>
            <a href={value.includes(`${AdminAppConfigReducers["azure:BlobUrl"]}`) ? value : `${AdminAppConfigReducers["azure:BlobUrl"]}${value}`} target={"_blank"}>
              <span className="text-sm text-indigo-500">View Logo</span>
            </a>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "consultationStatus",
      Header: "Consultation Status",
      accessor: "status",
      column_name: "status",
      Cell: ({ value }) => {
        return value ? (
          <>
            {value.toLowerCase() === "new" && (
              <div className="border text-xs inline-block font-medium rounded-md text-center px-2.5 py-1 break-words w-32  border-sky-300 bg-sky-100 text-sky-600">
                {value}
              </div>
            )}
            {value.toLowerCase() === "inprogress" && (
              <div className="text-xs inline-block font-medium rounded-md text-center px-2.5 py-1 break-words w-32 border border-yellow-300 bg-yellow-100 text-yellow-600">
                {value}
              </div>
            )}
            {value.toLowerCase() === "rejected" && (
              <div className="text-xs inline-block font-medium rounded-md text-center px-2.5 py-1 break-words w-32  border border-red-300 bg-red-100 text-red-600">
                {value}
              </div>
            )}
            {value.toLowerCase() === "junk" && (
              <div className="text-xs inline-block font-medium rounded-md text-center px-2.5 py-1 break-words w-32  border border-slate-300 bg-slate-100 text-slate-600">
                {value}
              </div>
            )}
            {value.toLowerCase() === "approved" && (
              <div className="text-xs inline-block font-medium rounded-md text-center px-2.5 py-1 break-words w-32  border border-green-300 bg-green-100 text-green-600">
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
      id: "gclid",
      Header: "GCLID",
      accessor: "gclid",
      column_name: "gclid",
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
      disableSortBy: true,
      Cell: ({ value, row }) => {
        return (
          <Actions
            id={value}
            row={row}
            setOpenBasicModal={setOpenBasicModal}
            setBasicModalInfo={setBasicModalInfo}
            handleShowModal={handleShowModal}
            setOpenConsultationModal={setOpenConsultationModal}
            setModalInformation={setModalInformation}
            viewShow={true}
          />
        );
      },
    },
  ];

  const moreFilterOptions = useMemo(
    () => [
      {
        name: "Submission Date",
        columnName: "submissionDate",
        options: [],
        type: "date",
      },
      {
        name: "In Hands Date",
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
    [storeFilter]
  );

  return (
    <>
      <ReactTable
        COLUMNS={COLUMNS}
        DATA={Data}
        {...paginationData}
        setTablePageSize={(value) => setPaginationDataFunc("pageSize", value)}
        fetchData={getConsultationAndProof}
        sortingOptions={sortingOptions}
        setSortingOptions={setSortingOptionHandler}
        handleSort={handleSort}
        // column filters
        editColumnFilter={true}
        filteringOptions={filteringOptions}
        setColumnFilteringOptions={setColumnFilteringOptions}
        setSelectedRows={setSelectedRows}
        moreFilterOption={moreFilterOptions}
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
      {openConsultationModal && (
        <ConsultationModal
          handleShowModal={handleShowModal}
          modalInformation={modalInformation}
          AdminAppConfigReducers={AdminAppConfigReducers}
        />
      )}
    </>
  );
};

export default All;

const ConsultationModal = ({
  handleShowModal,
  modalInformation,
  AdminAppConfigReducers,
}) => {
  return (
    <>
      <div
        id="paymentModal"
        className="overflow-y-auto overflow-x-hidden fixed z-30 right-0 left-0 top-4 justify-center items-center h-modal md:h-full md:inset-0"
      >
        <div className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="relative px-4 w-full max-w-6xl h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow max-h-screen overflow-y-auto">
              <div className="flex justify-between items-start p-5 rounded-t border-b sticky top-0 left-0 bg-white">
                {/* <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl">
                  {isAddMode === true ? "Add Fix Charges" : "Edit Fix Charges"}
                </h3> */}
                <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl">
                  {"Request Consultation & Proof"}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                  data-modal-toggle="actionModal"
                  onClick={handleShowModal}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-12 gap-6 p-6">
                <div className="col-span-4">
                  <div className="flex items-center justify-center border-spacing-1 border-dashed border-2 border-neutral-200 rounded-lg h-72 w-full text-center">
                    {modalInformation?.storeLogoUrl !== "" &&
                      modalInformation?.storeLogoUrl !== undefined ? (
                      <img
                        src={`${AdminAppConfigReducers["azure:BlobUrl"]}${modalInformation?.storeLogoUrl}`}
                        alt={"not available"}
                      />
                    ) : (
                      <div className="h-24 w-40 p-2 border border-neutral-200 flex justify-center items-center bg-sky-400/10">
                        <img src={`/noImage.png`} alt={"not available"} />
                      </div>
                    )}
                  </div>
                  {/* <div>
                    <h1 className="font-bold">
                      {modalInformation?.productName}
                    </h1>
                  </div> */}
                </div>
                <div className=" col-span-8">
                  <div className="flex flex-wrap gap-1 mb-4 items-center">
                    <label className="w-1/4" />
                    <div className="font-extrabold text-lg items-center pt-[12px] pb-[12px] grow">
                      Contact Information
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4 items-center">
                    <label className="w-1/4">Product Name : </label>
                    <div className="pl-7 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[12px] pb-[12px] grow">
                      {modalInformation?.productName}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4 items-center">
                    <label className="w-1/4">First Name : </label>
                    <div className="pl-7 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[12px] pb-[12px] grow">
                      {modalInformation?.firstname}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4 items-center">
                    <label className="w-1/4">Last Name : </label>
                    <div className="pl-7 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[12px] pb-[12px] grow">
                      {modalInformation?.lastname}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4 items-center">
                    <label className="w-1/4">Company : </label>
                    <div className="pl-7 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[12px] pb-[12px] grow">
                      {modalInformation?.company}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4 items-center">
                    <label className="w-1/4">Email : </label>
                    <div className="pl-7 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[12px] pb-[12px] grow">
                      {modalInformation?.email}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4 items-center">
                    <label className="w-1/4">Phone : </label>
                    <div className="pl-7 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[12px] pb-[12px] grow">
                      {modalInformation?.phone}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4 items-center">
                    <label className="w-1/4" />
                    <div className="font-extrabold text-lg items-center pt-[12px] pb-[12px] grow">
                      Optional Information
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4 items-center">
                    <label className="w-1/4">In Hand Date : </label>
                    <div className="pl-7 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[12px] pb-[12px] grow">
                      {DateTimeFormat(modalInformation?.inHandsDate).date}
                    </div>
                  </div>
                  <div className="flex flex-wrap mb-4 items-center">
                    <label className="w-1/4">Logo Url : </label>
                    <div className="pl-7 font-bold flex items-center justify-center border-spacing-1 border-dashed border-2 border-neutral-200 rounded-lg h-36 w-[400px] text-center grow">
                      {/* <img
                        className=""
                        src={`${AdminAppConfigReducers["azure:BlobUrl"]}${modalInformation?.logoUrl}`}
                        alt={"not available"}
                      /> */}
                      <div className="flex items-center h-40">
                        <Image
                          src={modalInformation?.logoUrl /* replaceMyBaseUrl(modalInformation?.logoUrl, AdminAppConfigReducers["azure:BlobUrl"]) */}
                          className="w-40"
                          containerHeight={"h-20"}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4 items-center">
                    <label className="w-1/4">Message : </label>
                    <div className="pl-7 font-bold text-medium-text bg-slate-100 text-gray-500 border border-[#ababab] rounded pt-[12px] pb-[12px] grow">
                      {modalInformation?.message}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
