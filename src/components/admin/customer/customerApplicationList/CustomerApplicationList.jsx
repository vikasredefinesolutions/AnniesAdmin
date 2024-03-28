/*Component Name: Customer Application List
Component Functional Details: User can only view, approve, reject, asi distributor from here.
Created By: Shrey Patel
Created Date: 02/28/2023
Modified By: Bhargav Yadav
Modified Date: 19/09/2023 */

import React, { useCallback, useState, useMemo } from "react";
import Status from "components/common/displayStatus/Status";
import { useDispatch, useSelector } from "react-redux";
import {
  paginationDetails,
  RecStatusValuebyName,
  RecStatusValueForCustomerApproval,
  anniesAnnualData,
} from "global/Enum";
import ReactTable from "components/common/table/ReactTableServerSide";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import Messages from "components/common/alerts/messages/Index";
import CustomerAccountCreationApprovalService from "services/admin/customer/CustomerAccountCreationApprovalService";
import Actions from "./Actions";
import ApproveRejectModel from "./ApproveRejectModel";
import { TitleNameHelper, DateTimeFormat } from "services/common/helper/Helper";

const CustomerAccountCreationApproval = () => {
  const permission = useSelector((store) => store.permission);
  const dispatch = useDispatch();

  const [Data, setData] = useState([]);
  const [openBasicModal, setOpenBasicModal] = useState(false);
  const [basicModalInfo, setModalInfo] = useState({});
  const [sortingOptions, setSortingOptions] = useState([
    { field: "id", direction: 1, priority: 0 },
  ]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filteringOptions, setColumnFilteringOptions] = useState([]);
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
  });
  const [modalStatus, setModalStatus] = useState("");
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
      id: "id",
      Header: "Id",
      accessor: "id",
      column_name: "id",
    },
    {
      id: "name",
      Header: "Customer Name",
      accessor: "name",
      column_name: "name",
      Cell: ({ value, row }) => {
        return value ? (
          <>
            <div
              className="cursor-pointer"
              onClick={() => {
                setOpenBasicModal((prev) => !prev);
                setModalStatus("view");
                setModalInfo((prev) => {
                  return {
                    ...prev,
                    module: "Application",
                    status: "Approve",
                    title: "Approve this Application",
                    ButtonName: "Approve",
                    data: {
                      ...row.original,
                      changeStatus: RecStatusValuebyName.Active,
                    },
                  };
                });
              }}
            >
              {value}
            </div>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "email",
      Header: "Email",
      accessor: "email",
      column_name: "email",
    },
    {
      id: "companyPhoneNumber",
      Header: " Phone",
      accessor: "companyPhoneNumber",
      column_name: "companyPhoneNumber",
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
      id: "status",
      Header: "Status",
      accessor: "status",
      column_name: "status",
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
            setModalInfo={setModalInfo}
            setOpenBasicModal={setOpenBasicModal}
            setModalStatus={setModalStatus}
          />
        );
      },
      disableSortBy: true,
      disableShowHide: true,
    },
  ];

  const getCustomerApproveList = useCallback(
    (pageIndex = 1) => {
      dispatch(setAddLoading(true));
      CustomerAccountCreationApprovalService.getCustomerApproveList({
        args: {
          pageSize: paginationData.pageSize,
          pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
          sortingOptions,
          filteringOptions,
        },
        storeId: anniesAnnualData.storeId,
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
        dispatch(setAddLoading(false));
      }).catch(() => {
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

  // const exportCustomerApplicationListData = () => {
  //   dispatch(setAddLoading(true));
  //   CustomerAccountCreationApprovalService.exportCustomerApplicationList({
  //     args: {
  //       pageSize: paginationData.pageSize,
  //       pageIndex: 0,
  //       pagingStrategy: 0,
  //       sortingOptions,
  //       filteringOptions,
  //     },
  // storeId: anniesAnnualData.storeId,
  //   })
  //     .then((response) => {
  //       if (response.data.success) {
  //         dispatch(setAlertMessage(ValidationMsgs.commonExport.success));
  //         window.location.href = response.data.data;
  //       }
  //       dispatch(setAddLoading(false));
  //     })
  //     .catch((err) => {
  //       dispatch(setAddLoading(false));
  //     });
  // };

  const moreFilterOptions = useMemo(
    () => [
      {
        name: "Created Date",
        columnName: "createddate",
        options: [],
        type: "date",
      },
      {
        name: "Status",
        columnName: "status",
        options: RecStatusValueForCustomerApproval,
        type: "radio",
        conditionalSearch: true,
      },
    ],
    []
  );

  return (
    <>
      <title>
        {TitleNameHelper({ defaultTitleName: "Customer Application List" })}
      </title>
      <div className="py-4">
        <div className="px-4 sm:px-6 lg:px-8 w-full items-center flex justify-between sticky top-0 z-20 py-2 bg-slate-100">
          <div className="col-span-full w-full flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
              {TitleNameHelper({
                defaultTitleName: "Customer Application List",
              })}
            </h1>
            <div className="ml-328px "></div>
            {/* {(permission?.isEdit || permission?.isDelete) && */}
            {/* <div className="flex flex-wrap sm:auto-cols-min gap-2">
              <button
                className="text-indigo-500"
                onClick={exportCustomerApplicationListData}
              >
                Export
              </button>
            </div> */}
            {/* } */}
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
              fetchData={getCustomerApproveList}
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
          </div>
        </div>
        {openBasicModal && (
          <ApproveRejectModel
            setOpenBasicModal={setOpenBasicModal}
            basicModalInfo={basicModalInfo}
            getCustomerApproveList={getCustomerApproveList}
            modalStatus={modalStatus}
            setModalStatus={setModalStatus}
          />
        )}
      </div>
    </>
  );
};

export default CustomerAccountCreationApproval;
