import React, { useState, useCallback, useEffect, useRef } from "react";
import ReactTable from "../../../../../../../common/table/ReactTableServerSide";
import { anniesAnnualData, defaultImage, paginationDetails } from "global/Enum";
import Status from "components/common/displayStatus/Status";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { useDispatch, useSelector } from "react-redux";
import ProductService from "services/admin/master/store/product/ProductService";
import Image from "components/common/formComponent/Image";
import { DateTimeFormat, serverError } from "services/common/helper/Helper";
import CategoryService from "services/admin/master/store/categoryMaster/CategoryMasterService";
import ConfirmDelete from "components/common/modals/ConfirmDelete";
import Actions from "./Actions";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { ValidationMsgs } from "global/ValidationMessages";
import { Link } from "react-router-dom";

const CategoryProducts = ({
  storeId,
  setFormSubmit,
  index,
  activeTab,
  mainCategoryId,
  values,
}) => {
  const formRef = useRef();
  const dispatch = useDispatch();
  const location = useSelector((store) => store?.location);

  const [Data, setData] = useState([]);
  const [GardenData, setGardenData] = useState([]);
  const [shopGardenDelete, setShopGardenDelete] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  /* For Product List */
  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "name",
      direction: 0,
      priority: 0,
    },
  ]);
  const [selectedRows, setSelectedRows] = useState([]);
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
  /* END */

  /* For Shop The Garden Product List */
  const [gardenSortingOptions, setGardenSortingOptions] = useState([
    {
      field: "name",
      direction: 0,
      priority: 0,
    },
  ]);
  const [gardenFilteringOptions, setGardenColumnFilteringOptions] = useState(
    []
  );
  const [gardenPaginationData, setGardenPaginationData] =
    useState(paginationDetails);

  const setGardenPaginationDataFunc = (key, value) => {
    setGardenPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const setGardenSortingOptionHandler = (column, direction) => {
    setGardenSortingOptions([
      {
        field: column,
        direction: direction,
        priority: 0,
      },
    ]);
  };
  /* END */

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

  const gardenCOLUMNS = [
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
              <Link to={`/admin/master/products/edit/${row?.original?.id}`}>{value}</Link>
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
    {
      id: "action",
      Header: "",
      accessor: "id",
      column_name: "action",
      Cell: ({ value, row }) => {
        return (
          <>
            <Actions
              id={value}
              row={row}
              setShopGardenDelete={setShopGardenDelete}
              openDeleteModal={openDeleteModal}
              setOpenDeleteModal={setOpenDeleteModal}
            />
          </>
        );
      },
      disableSortBy: true,
      disableShowHide: true,
    },
  ];

  const getAllData = useCallback(
    (pageIndex = 1) => {
      if (mainCategoryId) {
        dispatch(setAddLoading(true));

        ProductService.getStoreProductsWithoutSubrows({
          args: {
            pageSize: paginationData.pageSize,
            pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
            sortingOptions,
            filteringOptions: [
              ...filteringOptions,
              {
                field: "recStatus",
                operator: 0,
                value: "A",
                type: "moreFilter",
              },
            ],
          },
          storeId: anniesAnnualData.storeId,
        })
          .then((response) => {
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
            dispatch(setAddLoading(false));
          })
          .catch(() => {
            dispatch(setAddLoading(false));
          });
      }
    },
    [
      filteringOptions,
      paginationData.pageSize,
      sortingOptions,
      paginationData.pageIndex,
      mainCategoryId,
    ]
  );

  const createProductsShopByGarden = () => {
    var productIds = [];
    if (selectedRows.length > 0) {
      productIds = selectedRows.map((value) => {
        return value.original.id;
      });
      dispatch(setAddLoading(true));
      CategoryService.createShopByGardenProducts({
        productCategories: {
          storeId: storeId,
          categoryId: mainCategoryId,
          productId: productIds,
          ...location,
        },
      })
        .then((response) => {
          if (response.data.success && response.data.data) {
            dispatch(
              setAlertMessage({
                type: "success",
                message: ValidationMsgs.category.addProductShopGarden,
              })
            );
            getShopGardenProeductsList();
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
                message: ValidationMsgs.category.notAddProductShopGarden,
              })
            );
          }
          dispatch(setAddLoading(false));
        });
    }
  };

  const getShopGardenProeductsList = useCallback(
    (pageIndex = 1) => {
      dispatch(setAddLoading(true));
      CategoryService.getShopGardenProducts({
        args: {
          pageSize: gardenPaginationData.pageSize,
          pageIndex: pageIndex ? pageIndex : gardenPaginationData.pageIndex,
          sortingOptions: gardenSortingOptions,
          filteringOptions: gardenFilteringOptions,
        },
        storeId: anniesAnnualData.storeId,
        categoryId: mainCategoryId,
      })
        .then((response) => {
          if (response.data.success && response.data.data) {
            const productResponse = response.data.data;
            setGardenData(productResponse.items);
            setGardenPaginationData((prevState) => ({
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
      gardenFilteringOptions,
      gardenPaginationData.pageSize,
      gardenSortingOptions,
      gardenPaginationData.pageIndex,
      mainCategoryId,
    ]
  );

  const handleDelete = (gardenData) => {
    if (gardenData && gardenData.multipleCategoryXMainId) {
      dispatch(setAddLoading(true));
      CategoryService.deleteShopGardenProducts({
        multipleCategoryXMainId: gardenData.multipleCategoryXMainId,
      })
        .then((response) => {
          if (response.data.success && response.data.data) {
            dispatch(
              setAlertMessage({
                type: "success",
                message: ValidationMsgs.category.removeProduct,
              })
            );
            getShopGardenProeductsList();
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
                message: ValidationMsgs.category.notRemoveProduct,
              })
            );
          }
          dispatch(setAddLoading(false));
        });
    }
    setOpenDeleteModal(false);
  };

  useEffect(() => {
    if (activeTab == index) {
      setFormSubmit(formRef.current);
    }
  }, [formRef, setFormSubmit, activeTab]);

  return (
    <>
      {values?.isShopTheGardenTabDisplay && (
        <div>
          {/* <div className="w-full p-6 pb-0 flex flex-wrap items-center justify-between mb-2">
            <div className="block uppercase tracking-wide text-gray-500 text-lg font-bold">
              Category Products
            </div>
          </div> */}

          <ReactTable
            className="overflow-x-auto max-h-screen border-t border-neutral-200"
            COLUMNS={COLUMNS}
            DATA={Data}
            {...paginationData}
            fetchData={getAllData}
            setTablePageSize={(value) =>
              setPaginationDataFunc("pageSize", value)
            }
            sortingOptions={sortingOptions}
            setSortingOptions={setSortingOptionHandler}
            // column filters
            filteringOptions={filteringOptions}
            setColumnFilteringOptions={setColumnFilteringOptions}
            displayColumnFilter={[]}
            editColumnFilter={false}
            morefilter={false}
            setSelectedRows={setSelectedRows}
            selectedRows={selectedRows}
          />

          <div className="w-full">
            <button
              className="btn px-6 bg-indigo-500 hover:bg-indigo-600 text-white"
              onClick={createProductsShopByGarden}
            >
              Add Selected Product
            </button>
          </div>
        </div>
      )}

      <div
        className={
          values?.isShopTheGardenTabDisplay
            ? `mt-10 border-t-2 border-neutral-200`
            : ""
        }
      >
        {values?.isShopTheGardenTabDisplay && (
          <div className="w-full p-6 pb-0 flex flex-wrap items-center justify-between mb-2">
            <div className="block uppercase tracking-wide text-gray-500 text-lg font-bold">
              Garden Products
            </div>
          </div>
        )}

        <ReactTable
          className="overflow-x-auto max-h-screen border-t border-neutral-200"
          COLUMNS={gardenCOLUMNS}
          DATA={GardenData}
          {...gardenPaginationData}
          fetchData={getShopGardenProeductsList}
          setTablePageSize={(value) =>
            setGardenPaginationDataFunc("pageSize", value)
          }
          sortingOptions={gardenSortingOptions}
          setSortingOptions={setGardenSortingOptionHandler}
          // column filters
          filteringOptions={gardenFilteringOptions}
          setColumnFilteringOptions={setGardenColumnFilteringOptions}
          displayColumnFilter={[]}
          editColumnFilter={false}
          morefilter={false}
          hiddenColumns={[
            "rowSelection",
            !values?.isShopTheGardenTabDisplay && "action",
          ]}
        />
      </div>

      <ConfirmDelete
        handleDelete={handleDelete}
        data={shopGardenDelete}
        message={
          "Deleting these Product will permanently remove this record from your account. This can't be undone."
        }
        title={"Remove"}
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
        deleteButtonName={"Remove"}
      />
    </>
  );
};

export default CategoryProducts;
