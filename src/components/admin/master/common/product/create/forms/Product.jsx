/*Component Name: Product
Component Functional Details: User can create or update Product master details from here.
Created By: Shrey Patel
Created Date: Currunt Date
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import React, { useState, useCallback, useEffect } from "react";
import {
  paginationDetails,
  RecStatusValuebyName,
  defaultImage,
  anniesAnnualData,
} from "global/Enum";
import ReactTableServerSide from "components/common/table/ReactTableServerSide";
import Image from "components/common/formComponent/Image";
import ProductService from "services/admin/master/store/product/ProductService";
import BundleProductsService from "services/admin/master/store/bundle/BundleProductsService";
import { useDispatch, useSelector } from "react-redux";
import { serverError } from "services/common/helper/Helper";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import DropdownService from "services/common/dropdown/DropdownService";
import { ValidationMsgs } from "global/ValidationMessages";
import CheckBox from "components/common/table/CheckBox";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import Products from "components/admin/master/common/product/create/forms/products/Products";

const Product = ({ productId, ourTotalCost }) => {
  const dispatch = useDispatch();

  const [brand, setBrand] = useState([]);
  const [MasterData, setMasterData] = useState([]);
  const [BundleData, setBundleData] = useState([]);
  const [filteringOptions, setColumnFilteringOptions] = useState([{
      field: "isBundle",
      operator: 0,
      value: "false"
  }]);
  const [selectedRows, setSelectedRows] = useState([]);
  const location = useSelector((store) => store?.location);
  const GlobalLoading = useSelector(
    (store) => store?.GlobalLoaderReducer?.toLoad
  );

  const COLUMNS = [
    {
      id: "id",
      Header: () => {
        return "";
      },
      accessor: "id",
      column_name: "id",
      disableSortBy: true,
      Cell: ({ value, row }) => {
        if (!row?.original?.subRows || row?.original?.subRows?.length === 0) {
          return <CheckBox {...row.getToggleRowSelectedProps()} />;
        } else {
          return "";
        }
      },
    },
    {
      id: "image",
      Header: "product Image",
      accessor: "productImage",
      column_name: "image",
      isVisible: false,
      disableShowHide: true,
      Cell: ({ value, row }) => {
        return value && value?.length > 0 ? (
          <>
            <div
              className={`flex -space-x-9 items-center`}
              style={{ width: "160px" }}
            >
              {Array.isArray(value) ? (
                value.map((ProductMainImg, index) => {
                  return (
                    <div
                      key={index}
                      className="h-14 w-14 flex items-center justify-center overflow-hidden box-content rounded-full border bg-white"
                    >
                      <Image
                        src={ProductMainImg}
                        containerHeight={""}
                        className="max-h-full"
                      />
                    </div>
                  );
                })
              ) : (
                <>
                  <div className="h-14 w-14 flex items-center justify-center overflow-hidden box-content rounded-full border bg-white">
                    <Image
                      src={value}
                      containerHeight={""}
                      className="max-h-full"
                    />
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="h-14 w-14 flex items-center justify-center overflow-hidden box-content rounded-full border bg-white">
              <Image
                src={defaultImage}
                containerHeight={""}
                className="max-h-full"
              />
            </div>
          </>
        );
      },
    },
    {
      id: "name",
      Header: "Product Name",
      accessor: "name",
      column_name: "name",
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
      id: "sku",
      Header: "Our SKU",
      accessor: "ourSKU",
      column_name: "sku",
      Cell: ({ value }) => {
        if (!value) {
          return "";
        } else {
          return value;
        }
      },
    },
    // {
    //   id: "quantity",
    //   Header: "Quantity",
    //   accessor: "quantity",
    //   column_name: "quantity",
    //   Cell: ({ value }) => {
    //     if (!value) {
    //       return "";
    //     } else {
    //       return value;
    //     }
    //   },
    // },
    {
      id: "salePrice",
      Header: "Customer Price",
      accessor: "salePrice",
      column_name: "salePrice",
      Cell: ({ value }) => {
        if (!value) {
          return "";
        } else {
          return value;
        }
      },
    },
  ];

  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "name",
      direction: 0,
      priority: 0,
    },
  ]);
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

  const getBundleProductData = useCallback(() => {
    dispatch(setAddLoading(true));

    BundleProductsService.getBundleProducts(productId).then((response) => {
      const BundleProductResponse = response.data.data;
      let initialCost = 0;
      BundleProductResponse.lstBundleXProducts.map(
        (ourProduct) => (initialCost += ourProduct?.ourCost * ourProduct?.quantity)
      );
      if (ourTotalCost) {
        ourTotalCost.current = initialCost;
      }

      setBundleData(BundleProductResponse.lstBundleXProducts);
      dispatch(setAddLoading(false));
    });
  }, [productId]);

  const getProductData = useCallback(
    (pageIndex = 1) => {
      // if (filteringOptions?.length > 0) {
      dispatch(setAddLoading(true));
      ProductService.getStoreProductsWithoutSubrows({
        args: {
          pageSize: paginationData.pageSize,
          pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
          sortingOptions,
          filteringOptions: [...filteringOptions, {
            field: "bundalproductid",
            operator: 0,
            value: productId
          }],
        },
        storeId: anniesAnnualData.storeId,
      }).then((response) => {
          const productResponse = response.data.data;
          setMasterData(productResponse.items);
          setPaginationData((prevState) => ({
            ...prevState,
            pageIndex: productResponse?.pageIndex,
            pageSize: productResponse?.pageSize,
            totalCount: productResponse?.totalCount,
            totalPages: productResponse?.totalPages,
            hasPreviousPage: productResponse?.hasPreviousPage,
            hasNextPage: productResponse?.hasNextPage,
          }));
          dispatch(setAddLoading(false));
        })
        .catch(() => {
          dispatch(setAddLoading(false));
        });
      // } else {
      //     setMasterData([]);
      //     setPaginationData({});
      //     dispatch(setAddLoading(false));
      // }
    },
    [
      productId,
      filteringOptions,
      paginationData.pageSize,
      sortingOptions,
      paginationData.pageIndex,
    ]
  );

  useEffect(() => {
    DropdownService.getDropdownValues("brand")
      .then((res) => {
        if (res.data.success) {
          setBrand(() => {
            return res.data.data;
          });
        }
      })
      .catch((error) => {});
  }, []);

  const addProductToBundle = () => {
    // dispatch(setAddLoading(true));
    const selectedRowsData = selectedRows;
    const { browser, ...rest } = location;

    let getSelectedProductId = [];

    selectedRowsData.forEach((bundleProduct, index) => {
      if (bundleProduct?.subRows?.length < 1) {
        getSelectedProductId.push({
          id: 0,
          productId: bundleProduct.original.id,
          productAttributeCombinationId: 0,
          quantity: 1,
          status: RecStatusValuebyName.Active,
        });
      }
    });
    BundleProductsService.createProduct({
        storeBundleProductXModel: {
            bundleProductId: productId,
            bundleProductXModelLists: getSelectedProductId,
        ...rest,
      },
    }).then((response) => {
        if (response?.data?.success) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.product.bundleAdded,
            })
          );
          getProductData();
          getBundleProductData();
        } else {
          dispatch(
            setAlertMessage({ type: "danger", message: serverError(response) })
          );
          dispatch(setAddLoading(false));
        }
      }).catch((errors) => {
        dispatch(
          setAlertMessage({
            type: "danger",
            message: ValidationMsgs.product.bundleNotAdded,
          })
        );
        dispatch(setAddLoading(false));
      });
  };

  return (
    <>
      <div
        className={`pt-5 max-h-[42em] min-h-[30rem] ${
          MasterData?.length > 0 ? "overflow-auto" : "overflow-ellipsis"
        }`}
      >
        <ReactTableServerSide
          COLUMNS={COLUMNS}
          DATA={MasterData}
          {...paginationData}
          setTablePageSize={(value) => setPaginationDataFunc("pageSize", value)}
          fetchData={getProductData}
          sortingOptions={sortingOptions}
          setSortingOptions={setSortingOptionHandler}
          // column filters
          filteringOptions={filteringOptions}
          setColumnFilteringOptions={setColumnFilteringOptions}
          setSelectedRows={setSelectedRows}
          selectedRows={selectedRows}
          expandedRows={true}
          hiddenColumns={["rowSelection"]}
          tablePadding={"px-4 pb-4"}
          displaySearch={"right"}
          //   checkBoxFilterOptions={[
          //     {
          //       columnName: "brandId",
          //       name: "Select Brand",
          //       options: brand,
          //       icon: "filter_alt",
          //       search: true,
          //     },
          //   ]}
        />
      </div>
      {filteringOptions?.length > 0 && (
        <div className="w-full pl-5 pt-3">
          <button
            disabled={GlobalLoading}
            type="button"
            onClick={addProductToBundle}
            className={`flex justify-center btn px-6 bg-indigo-500 hover:bg-indigo-600 text-white ${
              GlobalLoading
                ? "bg-indigo-200 hover:bg-indigo-200"
                : "cursor-pointer"
            }`}
          >
            <div className={`w-full flex justify-center align-middle `}>
              {GlobalLoading && (
                <span className="spinner-border spinner-border-sm mr-2"></span>
              )}
              Add Selected Product in Bundle
            </div>
          </button>
        </div>
      )}

      <Products
        productId={productId}
        getBundleProductData={getBundleProductData}
        BundleData={BundleData}
      />
    </>
  );
};
export default Product;
