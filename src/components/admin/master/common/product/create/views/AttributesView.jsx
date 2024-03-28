/*Component Name: AttributesView
Component Functional Details: User can create or update AttributesView master details from here.
Created By: Shrey Patel
Created Date: 11/01/2023
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import React, { useState, useEffect, useCallback, Fragment } from 'react';
import ReactTable from 'components/common/table/ReactTableServerSide';
import { blobFolder, defaultImage, paginationDetails, RecStatusValuebyName, CurrencySymbolByCode, ProductAttributeTypeValues } from 'global/Enum';
import ColorService from 'services/admin/color/ColorService';
import Checkbox from 'components/common/formComponent/Checkbox';
import { productType } from 'dummy/Dummy';
import MasterAttributesService from 'services/admin/master/master/products/attribute/AttributesService';
import GrandMasterAttributesService from 'services/admin/master/grandMaster/products/attribute/AttributesService';
import StoreAttributesService from 'services/admin/master/store/product/attribute/AttributesService';
import MasterAttributeImageService from "services/admin/master/master/products/attribute/AttributeImageService";
import GrandMasterAttributeImageService from "services/admin/master/grandMaster/products/attribute/AttributeImageService";
import StoreAttributeImageService from "services/admin/master/store/product/attribute/AttributeImageService";
import MasterAttributeCombinationService from "services/admin/master/master/products/attribute/AttributeCombinationService";
import GrandMasterAttributeCombinationService from "services/admin/master/grandMaster/products/attribute/AttributeCombinationService";
import StoreAttributeCombinationService from "services/admin/master/store/product/attribute/AttributeCombinationService";
import axios from 'axios';
import ImageFile from 'components/common/formComponent/ImageFile';
import { useSelector, useDispatch } from "react-redux";
import DropdownService from 'services/common/dropdown/DropdownService';
import Image from 'components/common/formComponent/Image';
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { scrollTop } from 'services/common/helper/Helper';
import Status from 'components/common/displayStatus/Status';


const AttributesView = ({ values, type, tab, setActiveTab, index, readOnly, productId, moduleName }) => {
  const [TableData, setTableData] = useState([]);
  const [ImageData, setImageData] = useState([]);
  const [AttributeData, setAttributeData] = useState([]);
  const [AttributesOption, setAttributesOption] = useState();
  const dispatch = useDispatch();

  const API = (type === productType.MC ? MasterAttributesService : type === productType.GMC ? GrandMasterAttributesService : StoreAttributesService)
  const ImageAPI = (type === productType.MC ? MasterAttributeImageService : type === productType.GMC ? GrandMasterAttributeImageService : StoreAttributeImageService)
  const CombinationAPI = (type === productType.MC ? MasterAttributeCombinationService : type === productType.GMC ? GrandMasterAttributeCombinationService : StoreAttributeCombinationService)

  useEffect(() => {

    DropdownService.getDropdownValues("attributes").then((response) => {
      if (response.data && response.data.data !== null) {
        setAttributesOption(() => {
          return response.data.data;
        });
      }

    });

    getAtrributeData()
    getCombinationData()
  }, [tab])

  const getAtrributeData = useCallback(() => {
    dispatch(setAddLoading(true))

    API.getAttributesByID(productId)
      .then((res) => {
        var response = res.data;
        setAttributeData(response.data)
        dispatch(setAddLoading(false))
      })
      .catch((err) => {
        dispatch(setAddLoading(false))
      });

  }, [productId]);

  const getCombinationData = useCallback(() => {
    dispatch(setAddLoading(true))

    ImageAPI.getAttributeImagesByID({
      productTypeValues: ProductAttributeTypeValues.WithAttribute,
      productId: productId
    }).then((response) => {
      if (response.data.success) {
        setImageData(response.data.data)
      }
      dispatch(setAddLoading(false))
    }).catch((errors) => {
      dispatch(setAddLoading(false))
    });

    CombinationAPI.getAttributeCombinationByID(productId).then((response) => {
      if (response.data.success) {
        setTableData(response.data.data)
      }
      dispatch(setAddLoading(false))
    }).catch((errors) => {
      dispatch(setAddLoading(false))
    });
  }, []);

  return (
    <>
      <div className="px-6 py-12 border-b-4 border-neutral-200 last:border-b-0">
        <div className='flex items-center justify-between'>
          <div className='block uppercase tracking-wide text-gray-500 text-base font-bold mb-2'>
            {tab.label}
          </div>
          <div >
            <span className="text-indigo-500 cursor-pointer" onClick={() => { setActiveTab(index); scrollTop(); }}>Edit</span>
          </div>
        </div>
        <div className='px-6 py-12 border-b-4 border-neutral-200 last:border-b-0'>
          {type !== productType.Bundle &&
            <>
              {AttributeData ? AttributeData.map((attribute, index1) => {
                return (
                  <div className="mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center" key={index1}>
                    <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
                      {AttributesOption?.map((attropt, index1) => {
                        return (
                          <Fragment key={index1}>
                            {attropt.value == attribute.atributeId ? attropt.label : ""}
                          </Fragment>
                        )
                      })
                      }  :
                    </label>
                    <div className="col-span-2">
                      {attribute.productAttributeOptionsList.map((attrValue, index2) => {

                        let attributeValue = ""
                        attributeValue += `${attrValue.value}${attribute.productAttributeOptionsList.length - 1 > index2 ? "," : ""}`
                        return (
                          <Fragment key={index2}>
                            {attributeValue}
                          </Fragment>
                        );
                      })}
                    </div>
                  </div>

                )
              })
                : <p className="flex justify-center items-center rounded-t sticky top-0 left-0 text-red-600 bg-white">No data found as of now.</p>
              }
            </>
          }
          {
            AttributeData &&
            <AttributeImages ImageData={ImageData} getCombinationData={getCombinationData} moduleName={moduleName} productId={productId} type={type} />
          }
          {type !== productType.Bundle && AttributeData &&
            <AttributeCombination TableData={TableData} getCombinationData={getCombinationData} />
          }
        </div>
      </div>
    </>
  );
};

export default AttributesView;

const AttributeCombination = ({ TableData, getCombinationData }) => {
  const COLUMNS = [
    {
      id: "varientImagePath",
      Header: "",
      accessor: "varientImagePath",
      Footer: "",
      Cell: ({ row, value }) => {
        return value ? (
          <>
            <div className="h-14 w-14 flex items-center justify-center overflow-hidden  box-content border bg-white">
              <Image src={value} containerHeight={""} className="max-h-full" />
            </div>
          </>
        ) :
          <>
            <div className="h-14 w-14 flex items-center justify-center overflow-hidden  box-content border bg-white">
              <Image src={defaultImage} className="max-h-full" />
            </div>
          </>
      },
      disableSortBy: true,
      disableShowHide: true,
    },
    {
      id: "variants",
      Header: "Variant",
      accessor: "varientName",
      Footer: "variants",
      column_name: "varientName",
      Cell: ({ row, value }) => {
        return (
          <>
            <div className=""> {value}</div>
          </>
        );
      },
    },
    {
      id: "sku",
      Header: "sku",
      accessor: "sku",
      Footer: "sku",
      column_name: "sku",
      Cell: ({ row, value }) => {
        return (
          <>
            <div className=""> {value}</div>
          </>
        );
      },
    },
    {
      id: "price",
      Header: `price (${CurrencySymbolByCode.USD})`,
      accessor: "price",
      Footer: "price",
      column_name: "price",
      Cell: ({ row, value }) => {

        return row.original.subRows !== undefined ? (
          "0.00"
        ) : (
          <label>{parseInt(value).toFixed(2)}</label>
        );
      },
    },
    {
      id: "minQuantity",
      Header: "min quantity",
      accessor: "minQuantity",
      Footer: "min quantity",
      column_name: "minQuantity",
      Cell: ({ row, value }) => {
        return row.original.subRows === undefined ? (
          ""
        ) : (
          <label>{value}</label>
        );
      },
    },
    {
      id: "multipleQuantity",
      Header: "multiple quantity",
      accessor: "multipleQuantity",
      Footer: "multiple quantity",
      Cell: ({ row, value }) => {
        return row.original.subRows === undefined ? (
          ""
        ) : (
          <label>{value}</label>
        );
      },
    },

    {
      id: "upcGtin",
      Header: "upc/gtin",
      accessor: "upC_GTIN",
      Footer: "upc/gtin",
      column_name: "upcGtin",
      Cell: ({ row, value }) => {
        return row.original.subRows !== undefined ? (
          ""
        ) : (
          <label>{value}</label>
        );
      },
    },
    {
      id: "recStatus",
      Header: "Status",
      accessor: "recStatus",
      disableSortBy: true,
      Cell: ({ row, value }) => {
        return (
          <Status type={value} />
        )
      },
    },

  ];

  const [paginationData, setPaginationData] = useState({
    paginationDetails,
  });

  const [sortingOptions, setSortingOptions] = useState([
    {
      field: "firstname",
      direction: 0,
      priority: 0,
    },
  ]);

  const [selectedRows, setSelectedRows] = useState([]);
  const [filteringOptions, setColumnFilteringOptions] = useState([]);

  const setSortingOptionHandler = (column, direction) => {
    setSortingOptions([
      {
        field: column,
        direction: direction,
        priority: 0,
      },
    ]);
  };

  const setPaginationDataFunc = (key, value) => {
    setPaginationData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSort = (sortValue) => { };
  return (
    <>
      <div className="tracking-wide text-gray-500 text-base font-bold mb-2">Attribute Combination</div>
      <div className="overflow-x-auto max-h-screen border-t">
        <ReactTable
          COLUMNS={COLUMNS}
          DATA={TableData}
          hasNextPage={paginationData.hasNextPage}
          hasPreviousPage={paginationData.hasPreviousPage}
          pageIndex={paginationData.pageIndex}
          setPageIndex={(value) =>
            setPaginationDataFunc("pageIndex", value)
          }
          pageSize={25}
          setTablePageSize={(value) =>
            setPaginationDataFunc("pageSize", value)
          }
          totalCount={paginationData.totalCount}
          fetchData={getCombinationData}
          sortingOptions={sortingOptions}
          setSortingOptions={setSortingOptionHandler}
          hiddenColumns={["rowSelection"]}
          handleSort={handleSort}
          filteringOptions={filteringOptions}
          setColumnFilteringOptions={setColumnFilteringOptions}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          expandedRows={(() => true, [])}
          displaySearch={false}
          tablePadding={'p-0'}

        />
      </div>
    </>
  );
};

const AttributeImages = ({ ImageData, readOnly, productId, moduleName, type }) => {
  const [colors, setColors] = useState([]);
  let unmounted = false;
  let source = axios.CancelToken.source();

  useEffect(() => {
    let temp = []
    ColorService.getColors({
      args: {
        pageIndex: 0,
        pageSize: 0,
        pagingStrategy: 0,
        sortingOptions: [
          {
            field: "string",
            direction: 0,
            priority: 0,
          },
        ],
        filteringOptions: [
          {
            field: "string",
            operator: 0,
            value: "string",
          },
        ],
      },
    }).then((color) => {
      temp = color.data.data.items.filter((A, index) => {
        return A.recStatus === RecStatusValuebyName.Active
      })
      setColors(temp)
    }).catch((error) => { });
    return () => {
      unmounted = true;
      source.cancel("Cancelling in cleanup");
    };
  }, []);

  return (
    <>
      <div className="tracking-wide text-gray-500 text-base font-bold mb-2 mt-10">Attribute Images</div>
      <div className="overflow-x-auto max-h-screen border-t border-neutral-200">
        <table className="table-auto w-full text-sm text-[#191919] overflow-scroll">
          <thead className="text-sm font-bold uppercase text-[#b3b3b3] border-b border-neutral-200">
            <tr>
              <th className="h-full">
                <div className="flex items-center h-full px-2 py-3 border-neutral-200">
                  {" "}
                </div>
              </th>
              {type !== productType.Bundle && (
                <>
                  <th className="px-2 first:pl-5 py-4">
                    <div className="text-left flex w-48 items-center h-full px-2 py-3 border-neutral-200">
                      <span>Color</span>
                    </div>
                  </th>
                  <th className="px-2 first:pl-5 py-4">
                    <div className="font-semibold text-left w-40 max-w-sm flex items-center">
                      <span>Suffix</span>
                    </div>
                  </th>
                </>
              )}
              {/* {type === productType.Bundle &&
                                <th className="px-2 first:pl-5 py-4">
                                    <div className="font-semibold text-left w-40 max-w-sm flex items-center">
                                        <span>{" "}</span>
                                    </div>
                                </th>
                            } */}
              <th className="px-2 first:pl-5 py-4">
                <div className="text-left w-40 max-w-sm flex items-center">
                  <span>Media</span>
                </div>
              </th>
              {type !== productType.Bundle &&
                <th className="px-2 first:pl-5 py-4">
                  <div className="text-left flex w-40 items-center h-full px-2 py-3 border-neutral-200"> <span>Swatch</span>
                  </div>
                </th>
              }
              <th className="px-2 first:pl-5 py-4">
                <div className="text-left flex w-40 max-w-xs px-2 py-3 items-center border-neutral-200">
                  <span>Facet Color</span>
                </div>
              </th>
              {/* <th className="px-2 first:pl-5 py-4">
                                <div className="text-center max-w-32 flex items-center justify-center">
                                    <span>SKU</span>
                                </div>
                            </th> */}
              <th className="px-2 first:pl-5 py-4">
                <div className="font-semibold text-left flex w-40 max-w-xs px-2 py-3 items-center border-neutral-200">
                  <span>Status</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-200">
            {ImageData.length > 0 ? ImageData.map((imageData, index) => {
              return (
                <Fragment key={index}>
                  <TR
                    imageData={imageData}
                    index={index}
                    key={index + productId}
                    readOnly={readOnly}
                    productId={productId}
                    moduleName={moduleName}
                    type={type}
                    colors={colors}
                  />
                </Fragment>
              );
            }) : <tr>
              <td colSpan={5}><div className="flex justify-center items-center p-5 rounded-t sticky top-0 left-0 text-red-600 bg-white">No data found as of now.</div></td>
            </tr>}
          </tbody>
        </table>
      </div>
    </>

  );
};

const TR = ({
  imageData,
  index,
  readOnly,
  productId,
  moduleName,
  type,
  colors
}) => {

  const [showChild, setShowChild] = useState(false)

  const CompanyId = useSelector((store) => store?.CompanyConfiguration.id)
  const FolderPath = `/${blobFolder.temp}/${CompanyId}/${blobFolder[moduleName]}${!productId ? "/0" : `/${productId}`}/${blobFolder.attribute}`
  const AdminAppConfigReducers = useSelector((store) => store?.AdminAppConfigReducers);

  return (
    <Fragment key={index}>
      <tr role={`row`}>
        <td className="px-2 first:pl-5 py-3 relative">
          <div>
            <div
              className="leading-none w-6 h-6 cursor-pointer transition-all variant-arrow"
              onClick={() => {
                setShowChild((prev) => !prev);
              }}
            >
              <span className="material-icons-outlined select-none">
                {showChild ? "remove" : "add"}
              </span>
            </div>
          </div>
        </td>
        {type !== productType.Bundle && (
          <>
            <td className="px-2 first:pl-5 py-3 relative">
              <div>{imageData.colorName}</div>
            </td>
            <td className="px-2 first:pl-5 py-3 relative">
              <div>{imageData.suffix}</div>
            </td>
          </>
        )}
        <td className="px-2 first:pl-5 py-3 relative">
          <div>
            {imageData.subRows !== undefined &&
              imageData.subRows[0] !== undefined ? (
              <div className="flex -space-x-9 items-center relative">
                <div className="w-20 h-20 rounded-full box-content overflow-hidden justify-center items-center flex">
                  <img
                    className="max-h-full"
                    src={`${AdminAppConfigReducers["azure:BlobUrl"]}${imageData.subRows[0].imagePath}`}
                    alt={imageData.subRows[0].altTag}
                  />
                </div>
                {imageData.subRows.length - 1 > 0 && (
                  <span className="w-14 h-14 rounded-full box-content bg-neutral-200 inline-flex items-center justify-center">
                    +{imageData.subRows.length - 1}
                  </span>
                )}
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full box-content overflow-hidden justify-center items-center flex">
                <Image src={defaultImage} className={"max-h-full"} />
              </div>
            )}
          </div>
        </td>
        {type !== productType.Bundle && (
          <td className="px-2 first:pl-5 py-3 relative">
            <>
              <div className="w-20 h-20 rounded-full box-content overflow-hidden justify-center items-center flex">
                <Image src={imageData.swatch} className={"max-h-full"} />
                {/* <img
                                    className="max-h-full"
                                    src={`${AdminAppConfigReducers["azure:BlobUrl"]}${imageData.swatch}`}
                                /> */}
              </div>
            </>
          </td>
        )}
        <td className="px-2 first:pl-5 py-3 relative">
          <div className="flex flex-wrap items-center max-w-xs">
            {colors.map((color, index) => {
              return (
                <Fragment key={index}>
                  <div className="relative" key={index}>
                    <Checkbox
                      id={`tell[${color.id}].${imageData.attributeOptionId}`}
                      key={index}
                      className={
                        "form-checkbox inline-flex items-center justify-center mr-2 mb-2 border-click w-6 h-6 border-2"
                      }
                      style={{
                        backgroundColor: color.hexCode,
                        borderColor: color.borderColor,
                      }}
                      value={color.id}
                      defaultChecked={imageData.facetColorId.includes(
                        color.id
                      )}
                      type="checkbox"
                      disabled={true}
                    />
                    <label
                      className="absolute inset-0 h-6 w-6"
                      htmlFor={`tell[${color.id}].${imageData.attributeOptionId}`}
                      title={color.name}
                    >
                      <svg
                        className={`h-6 w-6 ${imageData.facetColorId.includes(color.id)
                          ? ""
                          : "hidden"
                          }`}
                        viewBox="0 0 16 16"
                        fill={color.textColor}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* <path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z"></path> */}
                      </svg>
                    </label>
                  </div>
                </Fragment>
              );
            })}
          </div>
        </td>
        <td className="px-2 first:pl-5 py-3 relative">
          <div className="flex flex-wrap items-center max-w-xs">
            <Status type={imageData?.recStatus} />
          </div>
        </td>
      </tr>
      {showChild && (
        <>
          <tr role="row">
            <td colSpan={6}>
              <div className="w-full py-2 px-4">
                <div className="grid grid-cols-12 gap-3">
                  {imageData?.subRows?.map(
                    (value, i) =>
                      value.recStatus !== "R" && (
                        <div
                          className="col-span-full lg:col-span-2 relative "
                          key={value.id}
                        >
                          <ImageFile
                            folderpath={`${FolderPath}`}
                            className="sr-only"
                            divClass={
                              "w-full flex flex-wrap items-center h-52 bg-center bg-no-repeat bg-contain relative"
                            }
                            url={value.imagePath}
                            disabled={true}
                          />
                          {type !== productType.Bundle && (
                            <div className="mt-1">
                              <span>{value.altTag}</span>
                            </div>
                          )}
                        </div>
                      )
                  )}
                </div>
              </div>
            </td>
          </tr>
        </>
      )}
    </Fragment>
  );
};
