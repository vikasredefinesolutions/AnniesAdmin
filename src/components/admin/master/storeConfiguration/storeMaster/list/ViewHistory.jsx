import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { DateTimeFormat } from "services/common/helper/Helper";
import { paginationDetails } from "global/Enum";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import StoreService from "services/admin/store/StoreService";
import ReactTable from "components/common/table/ReactTableServerSide";

const ViewHistory = ({ openModal, setOpenModal, storeId, title }) => {
  const dispatch = useDispatch();
  const [Data, setData] = useState([]);

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

  const getStoreViewHistory = useCallback(
    (pageIndex) => {
      if (storeId) {
        dispatch(setAddLoading(true));
        StoreService.getStoreViewHistory({
          args: {
            pageSize: paginationData.pageSize,
            pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
            sortingOptions,
            filteringOptions,
          },
          storeId: storeId,
        })
          .then((response) => {
            if (response?.data?.success && response?.data?.data) {
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
          })
          .catch((error) => {
            dispatch(setAddLoading(false));
          });
      }
    },
    [
      filteringOptions,
      paginationData.pageSize,
      sortingOptions,
      paginationData.pageIndex,
      storeId,
    ]
  );

  const COLUMNS = [
    {
      id: "createdName",
      Header: "Created By",
      accessor: "createdName",
      column_name: "createdName",
      Cell: ({ value }) => {
        return value ? (
          <>
            <div>{value} </div>
          </>
        ) : (
          "-"
        );
      },
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
          "-"
        );
      },
    },
    {
      id: "status",
      Header: "Status",
      accessor: "status",
      column_name: "status",
      Cell: ({ value }) => {
        return value ? (
          <>
            <div>{value} </div>
          </>
        ) : (
          "-"
        );
      },
    },
  ];
  return (
    <>
      <div
        id="viewhistoryModal"
        aria-hidden="true"
        className={`${
          !openModal && "hidden"
        } overflow-y-auto overflow-x-hidden fixed inset-0 justify-center items-center h-modal max-h-screen z-30 `}
      >
        <div className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="relative px-4 w-full max-w-2xl h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow max-h-screen overflow-y-auto">
              <div className="flex justify-between items-start p-5 rounded-t border-b sticky top-0 left-0 bg-white z-20">
                <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl">
                  {title}
                </h3>
                <button
                  onClick={() => setOpenModal((prev) => !prev)}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                  data-modal-toggle="viewhistoryModal"
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
                    ></path>
                  </svg>
                </button>
              </div>
              <ReactTable
                COLUMNS={COLUMNS}
                DATA={Data}
                {...paginationData}
                setTablePageSize={(value) =>
                  setPaginationDataFunc("pageSize", value)
                }
                fetchData={getStoreViewHistory}
                sortingOptions={sortingOptions}
                setSortingOptions={setSortingOptionHandler}
                setColumnFilteringOptions={setColumnFilteringOptions}
                filteringOptions={filteringOptions}
                moreFilter={true}
                displaySearch={false}
                filters={false}
                disableSortBy={true}
                hiddenColumns={["rowSelection"]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewHistory;
