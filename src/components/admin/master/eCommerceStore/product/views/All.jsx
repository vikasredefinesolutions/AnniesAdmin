/*Component Name: All
Component Functional Details: User can create or update All master details from here.
Created By: Happy
Created Date: <Creation Date>
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { productType } from "dummy/Dummy";
import {
  paginationDetails,
  PageName,
  defaultImage,
  CurrencySymbolByCode,
  anniesAnnualData,
  RecStatusValuebyName,
  ProductStatusMoreFilterOption,
  StoreProductStatusTabs,
} from "global/Enum";
import { ValidationMsgs } from "global/ValidationMessages";

import {
  DateTimeFormat,
  serverError,
  TitleNameHelper,
} from "services/common/helper/Helper";
import MasterCatalogCommonService from "services/admin/master/masterCommonService";
import ProductService from "services/admin/master/store/product/ProductService";
import DropdownService from "services/common/dropdown/DropdownService";
import StoreService from "services/admin/store/StoreService";

import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import BundleList from "components/admin/master/eCommerceStore/bundle/list/List";

import VarientProductModal from "components/admin/master/common/product/create/forms/VarientProductModal";
import ReactTable from "components/common/table/ReactTableServerSide";
import ConfirmDelete from "components/common/modals/ConfirmDelete";
import ViewHistory from "components/common/modals/ViewHistory";
import Status from "components/common/displayStatus/Status";
import Actions from "components/common/others/admin/Action";
import Image from "components/common/formComponent/Image";
import BasicModal from "components/common/modals/Basic";

import CheckBoxAction from "./CheckBoxAction";

const All = ({
  type,
  filterData,
  tab,
  activeTab,
  setSelectedData,
  storeType,
}) => {
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const location = useSelector((store) => store?.location);
  const permission = useSelector((store) => store.permission);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [product, setProduct] = useState(null);
  const [ModelInfo] = useState({});
  const [openBasicModal, setOpenBasicModal] = useState(false);
  const [viewHistoryModal, setViewHistoryModal] = useState(false);
  const [Data, setData] = useState([]);
  const [store, setStore] = useState({});
  const [ProductTypeOption] = useState([]);
  const [userNameValues, setUserNameValues] = useState([]);
  const [storeLevelProReadinessData, setStoreLevelProReadinessData] = useState(
    []
  );
  const [, setHiddenColumns] = useState([]);
  const [, setInitialColumnFilterOrder] = useState([]);
  const [filteringOptions, setColumnFilteringOptions] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [paginationData, setPaginationData] = useState({
    ...paginationDetails,
  });
  const [openVarientModal, setOpenVarientModal] = useState({
    name: "",
    ourSku: "",
    toShow: false,
  });
  const [dataForVarientProducts, setdataForVarientProducts] = useState([]);
  const [sortingOptions, setSortingOptions] = useState([
    { field: "name", direction: 0, priority: 0 },
  ]);

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

  const getAllData = useCallback(
    (pageIndex = 1) => {
      dispatch(setAddLoading(true));

      ProductService.getStoreProductsWithoutSubrows({
        args: {
          pageSize: paginationData.pageSize,
          pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
          sortingOptions,
          filteringOptions: [...filterData, ...filteringOptions],
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
    // {
    //     id: "expander",
    //     accessor: "a",
    //     Header: () => (""),
    //     Cell: ({ row }) => {
    //         return <span title="Show Sub Product" className="material-icons-outlined select-none leading-none ml-2 w-6 h-6 cursor-pointer transition-all variant-arrow" onClick={() => {
    //             getVarientDataFunc(row?.original)
    //         }}>add</span>
    //     },
    //     disableShowHide: fa,
    //     disableSortBy: true,
    // },
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
                    // <Link key={index} to={getEditUrl(row.original.id, masterCatalogStoreTypes, storeTypeFinal, storeNameFinal, storeIdFinal, storeType, false)}>
                    <Link
                      key={index}
                      to={`/admin/master/products/edit/${row.original.id}`}
                    >
                      <div className="h-14 w-14 flex items-center justify-center overflow-hidden  box-content rounded-full border bg-white">
                        <Image
                          src={ProductMainImg}
                          containerHeight={""}
                          className="max-h-full"
                        />
                        {/* <img key={index} className="max-h-full" src={`${AdminAppConfigReducers["azure:BlobUrl"]}${ProductMainImg}`} alt="No Image" /> */}
                      </div>
                    </Link>
                  );
                })
              ) : (
                // <Link to={getEditUrl(row?.original.productId, masterCatalogStoreTypes, storeTypeFinal, storeNameFinal, storeIdFinal, storeType, false)}>
                <Link
                  to={`/admin/master/products/edit/${row?.original.productId}`}
                >
                  <div className="w-14 h-14 shrink-0 mr-2 sm:mr-3 bg-sky-400/10 rounded-full text-center">
                    <Image src={defaultImage} className="max-h-full" />
                  </div>
                </Link>
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
          // <Link to={getEditUrl(row?.original.productId, masterCatalogStoreTypes, storeTypeFinal, storeNameFinal, storeIdFinal, storeType, false)}>
          <Link to={`/admin/master/products/edit/${row?.original.productId}`}>
            <div className="h-14 w-14 flex items-center justify-center overflow-hidden  box-content rounded-full border bg-white">
              <Image src={value} containerHeight={""} className="max-h-full" />
            </div>
          </Link>
        ) : (
          <>
            {/* <Link to={getEditUrl(row.original.id, masterCatalogStoreTypes, storeTypeFinal, storeNameFinal, storeIdFinal, storeType, false)}> */}
            <Link to={`/admin/master/products/edit/${row.original.id}`}>
              <div className="h-14 w-14 flex items-center justify-center overflow-hidden  box-content rounded-full border bg-white">
                <Image
                  src={value}
                  containerHeight={""}
                  className="max-h-full"
                />
              </div>
            </Link>
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
      id: "ourSku",
      Header: "SKU/ID",
      accessor: "ourSKU",
      column_name: "ourSKU",
      Cell: ({ value }) => {
        return value ? value : "";
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
              <div>
                {
                  row.id.includes(".") ? (
                    // <Link to={getEditUrl(row?.original.productId, masterCatalogStoreTypes, storeTypeFinal, storeNameFinal, storeIdFinal, storeType, false)}>{value}</Link>
                    <Link
                      to={`/admin/master/products/edit/${row?.original.productId}`}
                    >
                      {value}
                    </Link>
                  ) : (
                    <Link
                      to={`/admin/master/products/edit/${row?.original.id}`}
                    >
                      {value}
                    </Link>
                  )
                  // <Link to={getEditUrl(row?.original.id, masterCatalogStoreTypes, storeTypeFinal, storeNameFinal, storeIdFinal, storeType, false)}>{value}</Link>
                }
              </div>
            </div>
          </>
        ) : (
          ""
        );
      },
    },
    {
      id: "cultivarName",
      Header: "Cultivar Name",
      accessor: "cultivarName",
      column_name: "cultivarName",
      Cell: ({ value }) => {
        return value ? value : "";
      },
    },
    {
      id: "preferredCommonName",
      Header: "Preferred Common Name",
      accessor: "preferredCommonName",
      column_name: "preferredCommonName",
      Cell: ({ value }) => {
        return value ? value : "";
      },
    },
    {
      id: "secondaryCommonName",
      Header: "Secondary Common Name",
      accessor: "secondaryCommonName",
      column_name: "secondaryCommonName",
      Cell: ({ value }) => {
        return value ? value : "";
      },
    },
    // {
    //     id: "plantType",
    //     Header: "Plant Type",
    //     accessor: "plantType",
    //     column_name: "plantType",
    //     disableSortBy: true,
    //     Cell: ({ row }) => {
    //         return row && row?.original?.facetFilterFields.length ? (
    //             <div className="w-48">
    //                 {row?.original?.facetFilterFields?.map((value)=>{
    //                     if(value.label && value.label.toLowerCase().replaceAll(" ","") === "planttype"){
    //                         return <div className="break-words">{value.value}</div>
    //                     }
    //                 })}
    //             </div>
    //         ) : ""
    //     },
    // },
    {
      id: "zones",
      Header: "Zones",
      accessor: "zones",
      column_name: "zones",
      disableSortBy: true,
      Cell: ({ row }) => {
        return row && row?.original?.facetFilterFields.length ? (
          <div className="w-48">
            {row?.original?.facetFilterFields?.map((value) => {
              if (
                value.label &&
                value.label.toLowerCase().replaceAll(" ", "") === "zone"
              ) {
                const arrayZones = value.value && value.value.split(",");
                return (
                  <div className="break-words flex flex-wrap gap-1">
                    {arrayZones.length > 0 &&
                      arrayZones.map((zone) => {
                        return (
                          <span className="p-[5px] rounded-md bg-green-900 font-sub text-white text-small-text inline-block">
                            {zone}
                          </span>
                        );
                      })}
                  </div>
                );
              }
            })}
          </div>
        ) : (
          ""
        );
      },
    },
    // {
    //     id: "category",
    //     Header: "Category",
    //     accessor: "category",
    //     column_name: "category",
    //     disableSortBy: true,
    //     Cell: ({ value }) => {
    //         if (!value) {
    //             return " ";
    //         } else {
    //             return value;
    //         }
    //     },
    // },
    // {
    //     id: "ourCost",
    //     Header: `our Cost (${CurrencySymbolByCode.USD})`,
    //     accessor: "ourCost",
    //     column_name: "ourCost",
    //     Cell: ({ value }) => {
    //         return (<div className=' text-right relative w-[116px]'>
    //             <div className='absolute right-[.7vw] sm:right[.2vw] md:right[.4vw]'>
    //                 {value ? parseFloat(value).toFixed(2) : "0.00"}
    //             </div>
    //         </div>)
    //     },
    // },
    {
      id: "msrp",
      Header: `MSRP (${CurrencySymbolByCode.USD})`,
      accessor: "msrp",
      column_name: "msrp",
      Cell: ({ value }) => {
        return (
          <div className=" text-right relative w-[82px]">
            <div className="absolute right-[.7vw] sm:right[.2vw] md:right[.4vw]">
              {value ? parseFloat(value).toFixed(2) : "0.00"}
            </div>
          </div>
        );
      },
    },
    // {
    //     id: "imap",
    //     Header: `IMAP (${CurrencySymbolByCode.USD})`,
    //     accessor: "imap",
    //     column_name: "imap",
    //     Cell: ({ value }) => {
    //         return value ? parseFloat(value).toFixed(2) : "";
    //     },
    // },
    {
      id: "salePrice",
      Header: `Sale Price (${CurrencySymbolByCode.USD})`,
      accessor: "salePrice",
      column_name: "salePrice",
      Cell: ({ value }) => {
        return (
          <div className=" text-right relative w-[124px]">
            <div className="absolute right-[.7vw] sm:right[.2vw] md:right[.4vw]">
              {value ? parseFloat(value).toFixed(2) : "0.00"}
            </div>
          </div>
        );
      },
    },
    // {
    //     id: "createdDate",
    //     Header: "CREATED Date",
    //     accessor: "createdDate",
    //     Footer: "CREATED",
    //     column_name: "createdDate",
    //     Cell: ({ value }) => {
    //         return value ? (
    //             <>
    //                 <div >{DateTimeFormat(value).date} </div>
    //                 <div className="text-[#707070] text-xs font-normal">
    //                     {DateTimeFormat(value).time}
    //                 </div>
    //             </>
    //         ) : (
    //             " "
    //         );
    //     },
    // },
    // {
    //     id: "createdBy",
    //     Header: "Created BY",
    //     accessor: "createdName",
    //     column_name: "createdName",
    //     Cell: ({ value }) => {
    //         return value ? (
    //             <>
    //                 <div>{value}</div>
    //             </>
    //         ) : (
    //             " "
    //         );
    //     },
    // },
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
      id: "isDiscontinue",
      Header: `${tab?.value !== "Discontinued" ? "Discontinue" : ""}`,
      accessor: "isDiscontinue",
      column_name: "isDiscontinue",
      disableSortBy: tab?.value === "Discontinued" ? true : false,
      Cell: ({ value }) => {
        return tab?.value !== "Discontinued" && value ? (
          <>
            <div className="text-xs inline-block font-medium border border-green-300 bg-green-100 text-green-600 rounded-md text-center px-2.5 py-1 w-28">
              {"Discontinued"}
            </div>
          </>
        ) : (
          ""
        );
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
              row={row}
              openDeleteModal={openDeleteModal}
              setOpenDeleteModal={setOpenDeleteModal}
              setDeleteData={setProduct}
              setModalInfo={setProduct}
              setOpenBasicModal={setOpenBasicModal}
              // editUrl={masterCatalogStoreTypes.includes(storeType) ? `/admin/master/${storeType}/${storeNameFinal}/${storeIdFinal}/products/edit/${row.id.includes(".") ? row?.original?.productId : row?.original?.id}` : ""}
              // editUrl={getEditUrl(row.id.includes(".") ? row?.original?.productId : row?.original?.id, masterCatalogStoreTypes, storeTypeFinal, storeNameFinal, storeIdFinal, storeType, false)}
              editUrl={`/admin/master/products/edit/${
                row.id.includes(".")
                  ? row?.original?.productId
                  : row?.original?.id
              }`}
              // moduleName={'Product'}
              moduleName={`${TitleNameHelper({
                defaultTitleName: "Product",
              })} Product`}
              setViewHistoryModal={setViewHistoryModal}
              setRecordId={setProduct}
              type={type}
              // hideAction={['delete']}
            />
          </>
        );
      },
      disableSortBy: true,
      disableShowHide: true,
    },
  ];

  const handleSort = (sortValue) => {};

  const statusChangedHandler = (data) => {
    if (
      ![productType.GMC, productType.MC].includes(store?.storeTypeId) &&
      !data.isGiftCardProduct
    ) {
      if (data?.changeStatus === "A" && data?.id) {
        dispatch(setAddLoading(true));
        MasterCatalogCommonService.validateProduct(data?.id, store?.storeTypeId)
          .then((response) => {
            if (response?.data?.data?.length > 0 && response?.data?.otherData) {
              dispatch(
                setAlertMessage({
                  type: "danger",
                  message: serverError({
                    data: { errors: response?.data?.otherData },
                  }),
                })
              );
            } else {
              if (storeLevelProReadinessData.readyToPublish === true) {
                ChangeProductStatus(data);
              } else {
                dispatch(
                  setAlertMessage({
                    type: "danger",
                    message: serverError(storeLevelProReadinessData),
                  })
                );
              }
            }
            dispatch(setAddLoading(false));
          })
          .catch((error) => {
            dispatch(setAddLoading(false));
          });
      } else {
        ChangeProductStatus(data);
      }
      setOpenBasicModal(false);
    } else {
      ChangeProductStatus(data);
    }
  };

  const ChangeProductStatus = (data) => {
    var ids = [];
    if (data.length > 0) {
      ids = data.map((value) => {
        return { item1: value.id, item2: value.rowVersion };
      });
    } else {
      ids = [{ item1: data.id, item2: data.rowVersion }];
    }
    dispatch(setAddLoading(true));
    const statusUpdated =
      data?.changeStatus == "A" || data?.changeStatus == "I"
        ? ValidationMsgs.product.statusUpdated
        : ValidationMsgs.product.Deleted;
    const statusNotUpdated =
      data?.changeStatus == "A" || data?.changeStatus == "I"
        ? ValidationMsgs.product.statusNotUpdated
        : ValidationMsgs.product.notDeleted;
    // var statusNotUpdated = data?.length > 0 ? ValidationMsgs.product.notDeleted : ValidationMsgs.product.statusNotUpdated
    ProductService.updateMultipleProductStatus({
      args: {
        idsRowVersion: ids,
        status: data.length > 0 ? "R" : data?.changeStatus,
        ...location,
      },
    })
      .then((response) => {
        if (response.data.data) {
          dispatch(
            setAlertMessage({
              view: true,
              type: "success",
              // message: data?.length > 0 ? ValidationMsgs.product.Deleted : ValidationMsgs.product.statusUpdated,
              message: statusUpdated,
            })
          );
          getAllData();
        } else {
          dispatch(
            setAlertMessage({
              view: true,
              type: "danger",
              message: statusNotUpdated,
            })
          );
        }
        dispatch(setAddLoading(false));
      })
      .catch((errors) => {
        if (errors.response.data.errors) {
          dispatch(
            setAlertMessage({
              message: errors.response.data.Errors.Error,
              type: "danger",
            })
          );
        } else {
          dispatch(
            setAlertMessage({ message: statusNotUpdated, type: "danger" })
          );
        }
        dispatch(setAddLoading(false));
      });
    setOpenBasicModal(false);
  };

  const CheckBoxFunc = useCallback(
    ({ ...rest }) => (
      <CheckBoxAction
        setProduct={setProduct}
        setSelectedRows={setSelectedRows}
        setOpenDeleteModal={setOpenDeleteModal}
        permission={permission}
        {...rest}
      />
    ),
    []
  );

  const moreFilterOptions = useMemo(
    () => [
      {
        name: "Created Date",
        columnName: "createddate",
        options: [],
        type: "date",
      },
      {
        name: "Created By",
        options: userNameValues,
        columnName: "createdBy",
        type: "checkbox",
      },
      {
        name: "Updated Date",
        columnName: "modifieddate",
        options: [],
        type: "date",
      },
      {
        name: "Updated By",
        options: userNameValues,
        columnName: "modifiedBy",
        type: "checkbox",
      },
      {
        name: "Status",
        columnName: "recStatus",
        options: ProductStatusMoreFilterOption,
        type: "radio",
        conditionalSearch: true,
      },
    ],
    [userNameValues, ProductTypeOption]
  );

  const columnForVarientProducts = [
    {
      id: "product Image",
      Header: "product Image",
      accessor: "productImage",
      column_name: "product Image",
      isVisible: false,
      disableShowHide: true,
      disableSortBy: true,
      Cell: ({ value, row }) => {
        return value && value.length > 0 ? (
          <>
            <div
              className={`flex -space-x-9 items-center`}
              style={{ width: "160px" }}
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
                <div className="h-14 w-14 flex items-center justify-center overflow-hidden  rounded-full border bg-white">
                  <Image src={value} className={"max-h-full"} />
                </div>
              )}
              {row.original.subRows && row.original.subRows.length !== 0 && (
                <div>
                  <span className="w-14 h-14 rounded-full box-content bg-neutral-200 flex items-center justify-center text-center">
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
                <span className="w-14 h-14 rounded-full box-content bg-neutral-200 inline-flex items-center justify-center text-center">
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
      disableSortBy: true,
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
          " "
        );
      },
    },
    {
      id: "ourSku",
      Header: "Our SKU",
      accessor: "ourSKU",
      column_name: "ourSKU",
      disableShowHide: true,
      disableSortBy: true,
      Cell: ({ value }) => {
        return value ? value : "";
      },
    },
    {
      id: "upc",
      Header: "UPC",
      accessor: "upc",
      column_name: "upc",
      disableShowHide: true,
      disableSortBy: true,
      Cell: ({ value }) => {
        return value ? value : "";
      },
    },
    {
      id: "quantity",
      Header: "Quantity",
      accessor: "quantity",
      column_name: "quantity",
      disableShowHide: true,
      disableSortBy: true,
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
      disableShowHide: true,
      disableSortBy: true,
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
      accessor: "createdBy",
      column_name: "createdName",
      disableShowHide: true,
      disableSortBy: true,
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
      disableShowHide: true,
      disableSortBy: true,
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
      accessor: "modifiedBy",
      column_name: "modifiedName",
      disableShowHide: true,
      disableSortBy: true,
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
      disableShowHide: true,
      disableSortBy: true,
      Cell: ({ value }) => {
        return <Status type={value} />;
      },
    },
  ];

  useEffect(() => {
    StoreService.getStoreById(anniesAnnualData.storeId)
      .then((response) => {
        if (response?.data?.success && response?.data?.data) {
          setStore(response?.data?.data);
        }
      })
      .catch(() => {});
  }, [anniesAnnualData.storeId]);

  useEffect(() => {
    if (product?.data?.id && product?.data?.storeId) {
      ProductService.getProductRedinessById(
        product?.data?.id,
        product?.data?.storeId
      ).then((response) => {
        if (response.data.data && response.data.success) {
          setStoreLevelProReadinessData({ ...response.data.data });
        } else {
          setStoreLevelProReadinessData(response);
        }
      });
    }
  }, [product]);

  useEffect(() => {
    DropdownService.getDropdownValues("adminuser").then((response) => {
      setUserNameValues(response.data.data);
    });
  }, [Data]);

  useEffect(() => {
    if (
      pathname.includes("/admin/stores/ecommercestore") ||
      pathname.includes("/admin/stores/FormBuilder")
    ) {
      setHiddenColumns([permission?.isDelete ? "" : "rowSelection"]);
    }
  }, []);

  useEffect(() => {
    let firsLevelRecord = selectedRows.filter(
      (value) =>
        value.depth === 0 &&
        value.original.recStatus === RecStatusValuebyName.Active &&
        !value.original
          .isDiscontinue /* && ((value.original.navSyncStatus === RecStatusValuebyName.NavSync)) */
    );
    setSelectedData(firsLevelRecord);
  }, [selectedRows]);

  return (
    <>
      {StoreProductStatusTabs[activeTab]?.value !== "Bundle" ? (
        <>
          <div className="col-span-full w-full bg-white shadow-xxl rounded-md  relative">
            <ReactTable
              COLUMNS={COLUMNS}
              DATA={Data}
              {...paginationData}
              setTablePageSize={(value) =>
                setPaginationDataFunc("pageSize", value)
              }
              fetchData={getAllData}
              sortingOptions={sortingOptions}
              setSortingOptions={setSortingOptionHandler}
              handleSort={handleSort}
              // column filters
              editColumnFilter={true}
              // setHiddenColumns={setHiddenColumns}
              filteringOptions={filteringOptions}
              setColumnFilteringOptions={setColumnFilteringOptions}
              setSelectedRows={setSelectedRows}
              moreFilterOption={moreFilterOptions}
              selectedRows={selectedRows}
              saveFilter={{ show: true, tabName: pathname + "_" + tab?.value }}
              buttonText={"Saved"}
              expandedRows={true}
              productSubCheckboxAction={false}
              setInitialColumnFilterOrder={setInitialColumnFilterOrder}
              CheckBoxAction={CheckBoxFunc}
              // hiddenColumns={hiddenColumns}
              hiddenColumns={[
                permission?.isEdit || permission?.isDelete
                  ? ""
                  : "rowSelection",
                "expander",
              ]}
            />
          </div>
          <ConfirmDelete
            handleDelete={statusChangedHandler}
            data={product}
            message={ValidationMsgs.product.deletePermanently}
            openDeleteModal={openDeleteModal}
            setOpenDeleteModal={setOpenDeleteModal}
            {...ModelInfo}
            title={"Delete"}
          />

          <VarientProductModal
            title={`Variant Of ${openVarientModal.name} | SKU : ${openVarientModal.ourSku}`}
            openModal={openVarientModal}
            setOpenModal={setOpenVarientModal}
            COLUMNS={columnForVarientProducts}
            DATA={dataForVarientProducts}
            setdataForVarientProducts={setdataForVarientProducts}
          />

          <BasicModal
            handleConfirmation={statusChangedHandler}
            openModal={openBasicModal}
            setOpenModal={setOpenBasicModal}
            {...product}
          />
          {viewHistoryModal && (
            <ViewHistory
              title={"View History"}
              openModal={viewHistoryModal}
              setOpenModal={setViewHistoryModal}
              rowId={product}
              pageName={PageName.Product}
            />
          )}
        </>
      ) : (
        <BundleList storeType={storeType} />
      )}
    </>
  );
};

export default All;
