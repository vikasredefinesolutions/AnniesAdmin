import React, { useCallback, useState, useEffect } from "react";
import { format } from "date-fns";
import CategoryService from "services/admin/master/store/categoryMaster/CategoryMasterService";
import Messages from "components/common/alerts/messages/Index";
import {
  serverError,
  DateTimeFormat,
  TitleNameHelper,
} from "services/common/helper/Helper";
import { paginationDetails, anniesAnnualData } from "global/Enum";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { useDispatch, useSelector } from "react-redux";
import { ValidationMsgs } from "global/ValidationMessages";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import Status from "components/common/displayStatus/Status";
import ReactDragDropTable from "components/common/table/ReactDragDropTable";

const List = () => {
  const dispatch = useDispatch();
  const location = useSelector((store) => store?.location);
  const [Data, setData] = useState([]);
  const [paginationData, setPaginationData] = useState(paginationDetails);
  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "displayOrder",
      direction: 0,
      priority: 0,
    },
  ]);
  const [filteringOptions, setColumnFilteringOptions] = useState([]);
  const [selectedFilterFacet, setSelectedFilterFacet] = useState();

  const getCategoryData = useCallback(
    (pageIndex = 1) => {
      dispatch(setAddLoading(true));
      CategoryService.getCategoriesWithTreeview({
        args: {
          pageSize: paginationData.pageSize,
          pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
          sortingOptions,
          filteringOptions: [
            ...filteringOptions,
            {
              field: "ismaincategory",
              operator: 0,
              value: true,
            },
          ],
        },
        storeId: anniesAnnualData.storeId,
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

  const COLUMNS = [
    {
      id: "name",
      Header: "Title",
      accessor: "name",
      column_name: "name",
      colSpan: 4,
      isVisible: false,
      disableShowHide: true,
      Cell: ({ value, row }) => {
        return row ? (
          <>
            <div
              className="w-full flex justify-start items-center group"
              style={{ width: "200px" }}
            >
              <div>
                <div className="font-semibold">{value}</div>
              </div>
            </div>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "productCount",
      Header: "# Products",
      accessor: "productCount",
      column_name: "productCount",
      colSpan: 1,
      Cell: ({ value }) => {
        return <div>{value}</div>;
      },
    },
    {
      id: "createdDate",
      Header: "Created date",
      accessor: "createdDate",
      column_name: "createddate",
      colSpan: 1,
      Cell: ({ value }) => {
        return value ? (
          <>
            <div>{DateTimeFormat(value).date} </div>
            <div className="text-[#707070] text-xs font-normal">
              {format(new Date(value), "hh:mm a")}
            </div>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "createdBy",
      Header: "Created By",
      accessor: "createdByName",
      column_name: "createdName",
      colSpan: 1,
      Cell: ({ value }) => {
        return (
          <>
            <div>{value} </div>
          </>
        );
      },
    },
    {
      id: "updatedDate",
      Header: "Updated Date",
      accessor: "modifiedDate",
      column_name: "modifiedDate",
      colSpan: 1,
      Cell: ({ value }) => {
        return value ? (
          <>
            <div>{DateTimeFormat(value).date} </div>
            <div className="text-[#707070] text-xs font-normal">
              {format(new Date(value), "hh:mm a")}
            </div>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "updatedBy",
      Header: "Updated By",
      accessor: "modifiedByName",
      column_name: "modifiedByName",
      colSpan: 1,
      Cell: ({ value }) => {
        return (
          <>
            <div>{value} </div>
          </>
        );
      },
    },
    {
      id: "status",
      Header: "Status",
      accessor: "recStatus",
      column_name: "recStatus",
      colSpan: 2,
      Cell: ({ value }) => {
        return <Status type={value} />;
      },
    },
  ];

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

  const orderChangeHandler = (index, data, allCategoryData) => {
    
    dispatch(setAddLoading(true))

    let payload = allCategoryData.map((items,index)=>{
      return {
        id: items?.id,
        rowVersion: items?.rowVersion || "",
        ...location,
        parentId: items?.parentCategoryId,
        oldSequence: items?.displayOrder,
        newSequence: index + 1,
        storeId: items?.storeID,
      }
    })

    if (data?.storeID) {
      CategoryService.CategoriesDragAndDrop(
        {
          changeStoreCategorySequenceModel: payload
        }
      ).then((response) => {
        if (response.data.data) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.navigation.sequenceChanged,
            })
          );
          getCategoryData();
        } else {
          dispatch(
            setAlertMessage({
              type: "danger",
              message: serverError(response),
            })
          );
        }
        dispatch(setAddLoading(false))

      }).catch(() => {
        dispatch(
          setAlertMessage({
            type: "danger",
            message: ValidationMsgs.navigation.sequenceNotChanged,
          })
        )
        dispatch(setAddLoading(false))
      });
    }
  }

  useEffect(() => {
    if (
      selectedFilterFacet &&
      selectedFilterFacet !== null &&
      selectedFilterFacet !== "" &&
      selectedFilterFacet?.value
    ) {
      setColumnFilteringOptions([
        {
          field:
            selectedFilterFacet?.label == "Main Category"
              ? "ismaincategory"
              : "controltype",
          operator: 0,
          value:
            selectedFilterFacet?.label == "Main Category"
              ? true
              : selectedFilterFacet?.value,
        },
      ]);
    } else {
      setColumnFilteringOptions([]);
    }
  }, [selectedFilterFacet]);

  return (
    <>
      <title>{TitleNameHelper({ defaultTitleName: "Category Master" })}</title>
      <div className="px-4 sm:px-6 py-8 w-full mx-auto">
        <div className="grid grid-cols-12">
          <div className="col-span-full w-full flex justify-between mb-8">
            <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
              {TitleNameHelper({ defaultTitleName: "Category Master" })}
            </h1>
          </div>
        </div>
        <Messages />
        <div className="col-span-full w-full bg-white shadow-xxl rounded-md mb-8">
          <ReactDragDropTable
            DATA={Data}
            COLUMNS={COLUMNS}
            displaySearch={false}
            fetchData={getCategoryData}
            {...paginationData}
            setTablePageSize={(value) =>
              setPaginationDataFunc("pageSize", value)
            }
            orderChangeHandler={orderChangeHandler}
          />
        </div>
      </div>
    </>
  );
};

export default List;
