import React, { useState, useEffect, forwardRef, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import ReactTable from "components/common/table/ReactTableServerSide";
import { paginationDetails, anniesAnnualData } from "global/Enum";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import DatePicker from "react-datepicker";
import { subDays } from "date-fns";
import { serverError, DateTimeFormat } from "services/common/helper/Helper";
import "react-datepicker/dist/react-datepicker.css";
import CustomreportServices from "services/admin/reports/customReports/CustomReports";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { ValidationMsgs } from "global/ValidationMessages";
import Messages from "components/common/alerts/messages/Index";
import { useSelector } from "react-redux";
import VarientProductModal from "components/admin/master/common/product/create/forms/VarientProductModal";
import MailLogSendAndResendEmailModel from "./MailLogSendAndResendEmailModel";
import { NavLink } from "react-router-dom";

const MailLog = () => {
  const dispatch = useDispatch();
  const permission = useSelector((store) => store?.permission);
  const toDatePicker = useRef();
  const [Data, setData] = useState([]);
  const [startDate, setstartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());
  const [store] = useState(anniesAnnualData.storeId);
  const [openVarientModal, setOpenVarientModal] = useState({
    name: "",
    data: [{}],
    toShow: false,
  });
  const [, setdataForVarientProducts] = useState([]);
  const [ShowResetEmailModel, SetShowResetEmailModel] = useState(false);
  const [EmailDataId, setEmailDataId] = useState(0);
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
  const handleSort = (sortValue) => { };

  const getMailLog = useCallback(
    (pageIndex) => {
      if (store) {
        dispatch(setAddLoading(true));
        CustomreportServices.getMailLog({
          args: {
            pageSize: paginationData.pageSize,
            pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
            sortingOptions,
            filteringOptions,
          },
          storeId: store ? [store] : [0],
          startDate: startDate,
          endDate: endDate,
        }).then((response) => {
          setData(response?.data?.data?.items);
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
        });
      }
    },
    [
      store,
      startDate,
      endDate,
      filteringOptions,
      paginationData.pageSize,
      sortingOptions,
      paginationData.pageIndex,
    ]
  );

  const Export = (pageIndex) => {
    dispatch(setAddLoading(true));
    CustomreportServices.ExportMailLog({
      args: {
        pageIndex: 0,
        pageSize: paginationData.pageSize,
        pagingStrategy: 0,
        sortingOptions,
        filteringOptions,
      },
      storeId: store ? store : 0,
      startDate: startDate,
      endDate: endDate,
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.commonExport.success,
            })
          );
          window.location.href = response.data.data;
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
      .catch((error) => {
        dispatch(
          setAlertMessage({
            type: "danger",
            message: ValidationMsgs.commonExport.failed,
          })
        );
        dispatch(setAddLoading(false));
      });
  };

  useEffect(() => {
    getMailLog();
  }, [store]);

  const onStartDateChangeHandler = (date) => {
    setstartDate(date);
    toDatePicker.current.input.click();
  };

  const onEndDateChangeHandler = (date) => {
    setendDate(date);
  };

  const onClick = () => {
    getMailLog();
  };

  const getVarientDataFunc = (currentRowData, pageIndex) => {
    setOpenVarientModal(() => ({
      data: [currentRowData],
      toShow: true,
    }));
  };

  // const handleResendMail = (emailLogoId) => {
  //   dispatch(setAddLoading(true))

  //   MailServices.getEmailByDetailsById(emailLogoId).then((response) => {
  //     const finalRes = response.data.data
  //     if (finalRes && finalRes.length) {
  //       const { toEmail, subject, body, attachmentsFilePath } = finalRes[0]

  //       const payload = {
  //         mailAttachmentsModel: {
  //           toEmail,
  //           subject,
  //           body,
  //           attachmentsFilePath: attachmentsFilePath ? attachmentsFilePath : ""
  //         }
  //       }

  //       MailServices.resendEmail(payload).then((response) => {
  //         dispatch(setAddLoading(false))

  //         if (response.data.success) {
  //           dispatch(setAlertMessage({ type: "success", message: ValidationMsgs.common.reSentEmail, }));
  //         } else {
  //           dispatch(setAlertMessage({ type: "danger", message: ValidationMsgs.common.notReSentEmail, }));
  //         }
  //       })
  //     } else {
  //       dispatch(setAddLoading(false))
  //       dispatch(setAlertMessage({ type: "danger", message: ValidationMsgs.common.notReSentEmail, }));
  //     }
  //   }).catch(() => {
  //     dispatch(setAddLoading(false))
  //     dispatch(setAlertMessage({ type: "danger", message: ValidationMsgs.common.notReSentEmail, }));
  //   })
  // }

  const COLUMNS = [
    {
      id: "fromEmail",
      Header: "FROM EMAIL",
      accessor: "fromEmail",
      column_name: "fromEmail",
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
      id: "toEmail",
      Header: "TO EMAIL",
      accessor: "toEmail",
      column_name: "toEmail",
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
      id: "storeName",
      Header: "STORE NAME",
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
      id: "subject",
      Header: "SUBJECT",
      accessor: "subject",
      column_name: "subject",
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
      id: "ipAddress",
      Header: "IP ADDRESS",
      accessor: "ipAddress",
      column_name: "ipAddress",
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
      id: "sentOn",
      Header: "SENT ON",
      accessor: "sentOn",
      column_name: "sentOn",
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
      id: "view",
      Header: "VIEW",
      accessor: "view",
      column_name: "view",
      Cell: ({ row }) => {
        return (
          <>
            <a className="text-indigo-500">
              <span
                className="material-icons-outlined cursor-pointer"
                onClick={() => {
                  getVarientDataFunc(row?.original);
                }}
              >
                visibility
              </span>
            </a>
          </>
        );
      },
    },
    {
      id: "sendMail",
      Header: "SEND MAIL",
      accessor: "sendMail",
      column_name: "sendMail",
      Cell: ({ row }) => {
        return (
          <>
            <a className="text-indigo-500">
              <span
                className="material-icons-outlined cursor-pointer"
                onClick={() => {
                  SetShowResetEmailModel(true);
                  setEmailDataId(row);
                }}
              >
                email
              </span>
            </a>
          </>
        );
      },
    },
    {
      id: "resendMail",
      Header: "RESEND MAIL",
      accessor: "resendMail",
      column_name: "resendMail",
      Cell: ({ value }) => {
        return (
          <>
            <a className="text-center">
              <span className="material-icons-round">shortcut</span>
              {`(${value})`}
            </a>
          </>
        );
      },
    },
  ];

  const MailLogViewCOLUMNS = [
    {
      id: "fromEmail",
      Header: "FROM EMAIL",
      accessor: "fromEmail",
      column_name: "fromEmail",
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
      id: "toEmail",
      Header: "TO EMAIL",
      accessor: "toEmail",
      column_name: "toEmail",
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
      id: "storeName",
      Header: "STORE NAME",
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
      id: "subject",
      Header: "SUBJECT",
      accessor: "subject",
      column_name: "subject",
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
      id: "ipAddress",
      Header: "IP ADDRESS",
      accessor: "ipAddress",
      column_name: "ipAddress",
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
      id: "sentOn",
      Header: "SENT ON",
      accessor: "sentOn",
      column_name: "sentOn",
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
  ];
  return (
    <>
      <title>Mail Log</title>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto">
        <div className="flex justify-between mb-8">
          <div className="flex items-center">
            <NavLink
              className="btn border-neutral-200 hover:border-neutral-400 text-gray-500 hover:text-gray-700 flex items-center mr-2"
              to={"/admin/reports"}
            >
              <span className="material-icons-outlined">west </span>
            </NavLink>
            <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
              Mail Log
            </h1>
          </div>
          <div className="flex flex-wrap items-center">
            <button type="button" className="text-indigo-500" onClick={Export}>
              Export
            </button>
          </div>
        </div>
        <Messages />
        <div className="bg-white shadow-xxl rounded-md mb-8">
          <div className="p-6 flex items-center justify-end">
            <div className="inline-flex flex-wrap justify-between items-center">
              <ExtraComponent
                startDate={startDate}
                endDate={endDate}
                onStartDateChangeHandler={onStartDateChangeHandler}
                onEndDateChangeHandler={onEndDateChangeHandler}
                toDatePicker={toDatePicker}
                onClick={onClick}
              />
            </div>
          </div>

          <div className="overflow-x-auto max-h-screen">
            <ReactTable
              COLUMNS={COLUMNS}
              DATA={Data}
              {...paginationData}
              setTablePageSize={(value) =>
                setPaginationDataFunc("pageSize", value)
              }
              fetchData={getMailLog}
              sortingOptions={sortingOptions}
              setSortingOptions={setSortingOptionHandler}
              handleSort={handleSort}
              setColumnFilteringOptions={setColumnFilteringOptions}
              filteringOptions={filteringOptions}
              hiddenColumns={[
                "rowSelection",
                permission?.isEdit || permission?.isDelete ? "" : "sendMail",
              ]}
            />
            <VarientProductModal
              title={"Email Preview"}
              openModal={openVarientModal}
              setOpenModal={setOpenVarientModal}
              COLUMNS={MailLogViewCOLUMNS}
              DATA={openVarientModal.data}
              setdataForVarientProducts={setdataForVarientProducts}
              MailLog={true}
            />
            {(permission?.isEdit || permission?.isDelete) && (
              <MailLogSendAndResendEmailModel
                EmailDataId={EmailDataId}
                getMailLog={getMailLog}
                SetShowResetEmailModel={SetShowResetEmailModel}
                ShowResetEmailModel={ShowResetEmailModel}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MailLog;

const CustomDatePicker = ({
  onChangeHandler,
  defaultDate,
  minDate,
  maxDate,
  refDatePicker,
}) => {
  const CustomInput = forwardRef(({ value, onClick, disabledLogo }, ref) => (
    <button
      type="button"
      className={`w-full h-10 bg-white border text-left border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md ${"className"}`}
      onClick={onClick}
      ref={ref}
    >
      {value}
      {!disabledLogo && (
        <div className="absolute top-0 right-0 px-3 py-2 ">
          <svg
            className="h-6 w-6 text-gray-400 bg-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            ></path>
          </svg>
        </div>
      )}
    </button>
  ));

  return (
    <>
      <div className="w-52">
        <DatePicker
          dateFormat={"MM - dd - yyyy"}
          selected={defaultDate}
          onChange={onChangeHandler}
          minDate={subDays(minDate, 0)}
          maxDate={subDays(maxDate, 0)}
          customInput={<CustomInput disabledLogo={false} />}
          ref={refDatePicker}
        />
      </div>
    </>
  );
};

const ExtraComponent = ({
  startDate,
  endDate,
  onStartDateChangeHandler,
  onEndDateChangeHandler,
  toDatePicker,
  onClick,
}) => {
  return (
    <>
      <div className="flex items-center justify-end">
        <div className="inline-flex flex-wrap justify-between items-center gap-2">
          <CustomDatePicker
            onChangeHandler={onStartDateChangeHandler}
            defaultDate={startDate}
            maxDate={endDate}
          />
          <div className="mx-2">to</div>
          <CustomDatePicker
            onChangeHandler={onEndDateChangeHandler}
            defaultDate={endDate}
            minDate={startDate}
            refDatePicker={toDatePicker}
          />
        </div>
      </div>
      <div className="inline-flex flex-wrap justify-between items-center">
        <div className="ml-2">
          <button
            className="btn px-6 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white"
            onClick={onClick}
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
};
