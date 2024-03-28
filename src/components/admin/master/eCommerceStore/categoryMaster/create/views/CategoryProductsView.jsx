import React, { useState, useCallback } from "react";
import { DateTimeFormat, scrollTop } from "services/common/helper/Helper";
import Image from "components/common/formComponent/Image";
import { defaultImage, paginationDetails } from "global/Enum";
import Status from "components/common/displayStatus/Status";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { useDispatch } from "react-redux";
import CategoryService from "services/admin/master/store/categoryMaster/CategoryMasterService";
import ReactTable from "../../../../../../common/table/ReactTableServerSide";

const CategoryProductsView = ({
  setactiveTab,
  index,
  mainCategoryId,
  storeId,
  values,
}) => {
  const dispatch = useDispatch();

  const COLUMNS = [
    {
      id: "id",
      disableShowHide: true,
      Header: () => {
        return <></>;
      },
      accessor: "id",
      column_name: "id",
      disableSortBy: true,
      Cell: () => {
        return <></>;
      },
    },
    {
      id: "image",
      Header: "image",
      accessor: "productImage",
      column_name: "image",
      isVisible: false,
      disableShowHide: true,
      disableSortBy: true,
      Cell: ({ value, row }) => {
        return value && value.length > 0 ? (
          <>
            <div
              className="flex -space-x-9 items-center"
              style={{ width: "125px" }}
            >
              {Array.isArray(value) ? (
                value.map((ProductMainImg, index) => {
                  return (
                    <div className="h-14 w-14 flex items-center justify-center overflow-hidden  box-content rounded-full border bg-white">
                      <Image
                        src={ProductMainImg}
                        containerHeight={""}
                        className="max-h-full"
                      />
                    </div>
                  );
                })
              ) : (
                <div className="w-14 h-14 shrink-0 mr-2 sm:mr-3 bg-sky-400/10 rounded-full text-center">
                  <Image src={defaultImage} className="max-h-full" />
                </div>
              )}
              {row.original.subRows && row.original.subRows.length !== 0 && (
                <div>
                  <span className="w-14 h-14 rounded-full box-content bg-neutral-200 inline-flex items-center justify-center">
                    +{row?.original?.subRows?.length}
                  </span>
                </div>
              )}
            </div>
          </>
        ) : row?.original.productId ? (
          <div className="h-14 w-14 flex items-center justify-center overflow-hidden  box-content rounded-full border bg-white">
            <Image src={value} containerHeight={""} className="max-h-full" />
          </div>
        ) : (
          <>
            <div className="h-14 w-14 flex items-center justify-center overflow-hidden  box-content rounded-full border bg-white">
              <Image src={value} containerHeight={""} className="max-h-full" />
            </div>
            {row.original.subRows && row.original.subRows.length !== 0 && (
              <div>
                <span className="w-14 h-14 rounded-full box-content bg-neutral-200 inline-flex items-center justify-center">
                  +{row?.original?.subRows?.length}
                </span>
              </div>
            )}
          </>
        );
      },
    },
    {
      id: "name",
      Header: "Product Name",
      accessor: "name",
      column_name: "name",
      disableShowHide: true,
      Cell: ({ value, row }) => {
        return row ? (
          <>
            <div
              className="w-full flex justify-start items-center group"
              style={{ width: "200px" }}
            >
              <div>{value}</div>
            </div>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "ourSku",
      Header: "Our SKU",
      accessor: "ourSKU",
      column_name: "ourSKU",
      Cell: ({ value }) => {
        return value ? value : "";
      },
    },
    {
      id: "createdDate",
      Header: "CREATED Date",
      accessor: "createdDate",
      Footer: "CREATED",
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
          " "
        );
      },
    },
    {
      id: "createdBy",
      Header: "Created BY",
      accessor: "createdName",
      column_name: "createdName",
      Cell: ({ value }) => {
        return value ? (
          <>
            <div>{value}</div>
          </>
        ) : (
          " "
        );
      },
    },
    {
      id: "updatedDate",
      Header: "UPDATED Date",
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
          " "
        );
      },
    },
    {
      id: "updatedBy",
      Header: "UPDATED BY",
      accessor: "modifiedName",
      column_name: "modifiedName",
      Cell: ({ value }) => {
        return value ? (
          <>
            <div>{value}</div>
          </>
        ) : (
          " "
        );
      },
    },
    {
      id: "recStatus",
      Header: "status",
      accessor: "recStatus",
      column_name: "recStatus",
      Cell: ({ value }) => {
        return <Status type={value} />;
      },
    },
  ];

  const [Data, setData] = useState([]);
  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "name",
      direction: 0,
      priority: 0,
    },
  ]);
  const [filteringOptions, setColumnFilteringOptions] = useState([]);
  const [paginationData, setPaginationData] = useState(paginationDetails);

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

  const getShopGardenProeductsList = useCallback(
    (pageIndex = 1) => {
      dispatch(setAddLoading(true));
      CategoryService.getShopGardenProducts({
        args: {
          pageSize: paginationData.pageSize,
          pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
          sortingOptions: sortingOptions,
          filteringOptions: filteringOptions,
        },
        storeId: storeId,
        categoryId: mainCategoryId,
      })
        .then((response) => {
          if (response.data.success && response.data.data) {
            const productResponse = response.data.data;
            setData(productResponse.items);
            setPaginationData((prevState) => ({
              ...prevState,
              pageIndex: productResponse.pageIndex,
              pageSize: productResponse.pageSize,
              totalCount: productResponse.totalCount,
              totalPages: productResponse.totalPages,
              hasPreviousPage: productResponse.hasPreviousPage,
              hasNextPage: productResponse.hasNextPage,
            }));
          }
          dispatch(setAddLoading(false));
        })
        .catch((errors) => {
          dispatch(setAddLoading(false));
        });
    },
    [
      filteringOptions,
      paginationData.pageSize,
      sortingOptions,
      paginationData.pageIndex,
      mainCategoryId,
    ]
  );
  return (
    <>
      <div className="px-6 py-12 border-b-4 border-neutral-200 last:border-b-0">
        <div className="flex items-center justify-between">
          <div className="block uppercase tracking-wide text-gray-500 text-base font-bold mb-2">
            {values?.isShopTheGardenTabDisplay
              ? "Garden Products"
              : "Category Products"}
          </div>
          <div>
            <span
              className="text-indigo-500 cursor-pointer"
              onClick={() => {
                setactiveTab(index);
                scrollTop();
              }}
            >
              {"Edit"}
            </span>
          </div>
        </div>
        <ReactTable
          className="overflow-x-auto max-h-screen border-t border-neutral-200"
          COLUMNS={COLUMNS}
          DATA={Data}
          {...paginationData}
          fetchData={getShopGardenProeductsList}
          setPageIndex={(value) => setPaginationDataFunc("pageIndex", value)}
          setTablePageSize={(value) => setPaginationDataFunc("pageSize", value)}
          sortingOptions={sortingOptions}
          setSortingOptions={setSortingOptionHandler}
          // column filters
          filteringOptions={filteringOptions}
          setColumnFilteringOptions={setColumnFilteringOptions}
          displayColumnFilter={[]}
          editColumnFilter={false}
          morefilter={false}
          hiddenColumns={["rowSelection"]}
        />
      </div>
    </>
  );
};

export default CategoryProductsView;
