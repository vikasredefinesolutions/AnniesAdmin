import React, { useCallback, useState, useEffect, Fragment } from "react";
import { TitleNameHelper, serverError } from "services/common/helper/Helper";
import { Formik, Form, useFormikContext, FieldArray } from "formik";
import { debounce } from "lodash";
import ProductInventoryServiceCls from "services/admin/productInventory/ProductInventoryService";
import AppConfigServiceCls from "services/admin/appConfig/AppConfigService";
import Dropdown from "components/common/formComponent/Dropdown";
import Image from "components/common/formComponent/Image";
import InputNumber from "components/common/formComponent/InputNumber";
import ToggleButton from "components/common/formComponent/ToggleButton";
import DatePicker from "components/common/formComponent/DatePicker";
import DropdownService from "services/common/dropdown/DropdownService";
import { RecStatusValuebyName, anniesAnnualData } from "global/Enum";
import { useDispatch, useSelector } from "react-redux";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import Pagination from "components/common/table/Pagination";
import { paginationDetails } from "global/Enum";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import Messages from "components/common/alerts/messages/Index";
import { ValidationMsgs } from "global/ValidationMessages";
import Import from "./Import";

const ProductInventory = () => {
  const dispatch = useDispatch();
  const location = useSelector((store) => store?.location);
  const permission = useSelector((store) => store?.permission);
  const [vendors, setVendors] = useState([]);
  const [listData, setListData] = useState([]);
  const [futureInventoryLength, setFutureInventoryLength] = useState([]);
  const [eCommSafetyData, setECommSafetyData] = useState({});
  const [eCoomSafety, setECommSafety] = useState("");
  const [showImportModal, setShowImportModal] = useState(false);

  const initialValues = {
    listData: listData,
  };

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

  const addMoreFutureInventory = (
    setFieldValue,
    values,
    futureInventory,
    pIndex
  ) => {
    if (futureInventoryLength.length <= futureInventory.length) {
      setFutureInventoryLength((prev) => [1, ...prev]);
    }
    setFieldValue(`listData[${pIndex}].futureInventoryList`, [
      ...futureInventory,
      {
        rowVersion: "",
        id: 0,
        futureInventryDate: "",
        futureInventryQty: 0,
        recStatus: RecStatusValuebyName.Active,
      },
    ]);
  };

  const getListInventory = useCallback(
    (pageIndex, search) => {
      dispatch(setAddLoading(true));
      ProductInventoryServiceCls.listInventory({
        args: {
          pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
          pageSize: paginationData.pageSize,
          sortingOptions,
          filteringOptions: [
            ...filteringOptions,
            {
              field: search ? "global" : "",
              operator: 0,
              value: search ? search : "",
            },
          ],
        },
        storeId: anniesAnnualData.storeId,
        vendorId: anniesAnnualData.vendorId,
      }).then((response) => {
        if (response.data.success && response.data.data) {
          setPaginationData((prevState) => ({
            ...prevState,
            pageIndex: response?.data?.data?.pageIndex,
            pageSize: response?.data?.data?.pageSize,
            totalCount: response?.data?.data?.totalCount,
            totalPages: response?.data?.data?.totalPages,
            hasPreviousPage: response?.data?.data?.hasPreviousPage,
            hasNextPage: response?.data?.data?.hasNextPage,
          }));
          const FutureInvetoryLength =
            response?.data?.data?.items.length &&
            findObjectWithMostElements(
              response?.data?.data?.items,
              "futureInventoryList"
            );

          setFutureInventoryLength(FutureInvetoryLength);
          setListData(response?.data?.data?.items);
        }
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

  const getEcommSafetyData = () => {
    dispatch(setAddLoading(true));
    AppConfigServiceCls.getAppConfigById(745)
      .then((response) => {
        if (response.data.success && response.data.data) {
          setECommSafetyData(response.data.data);
          setECommSafety(response.data.data.value);
        }
        dispatch(setAddLoading(false));
      })
      .catch((error) => {
        dispatch(setAddLoading(false));
      });
  };

  const updateEcommSafetyData = () => {
    if (eCoomSafety) {
      dispatch(setAddLoading(true));
      AppConfigServiceCls.createUpdateAppConfig({
        id: eCommSafetyData?.id,
        rowVersion: eCommSafetyData?.rowVersion,
        name: eCommSafetyData?.name,
        value: eCoomSafety,
        description: eCommSafetyData?.description,
        isDeleted: eCommSafetyData.isDeleted,
        storeId: eCommSafetyData?.storeId,
        recStatus: eCommSafetyData?.recStatus,
        ...location,
      })
        .then((response) => {
          dispatch(setAddLoading(false));
        })
        .catch((error) => {
          dispatch(setAddLoading(false));
        });
    }
  };

  const debouncedSearch = useCallback(
    debounce(async (value) => {
      await getListInventory(1, value);
    }, 1000),
    []
  );

  async function handleSearch(e) {
    debouncedSearch(e.target.value);
  }

  const onSubmit = (values) => {
    const payload =
      values.listData.length > 0 &&
      values.listData.map((obj) => ({
        productId: obj?.productId,
        productfutureinventorymodel: [
          {
            id: obj?.id,
            recStatus: obj?.recStatus,
            rowVersion: obj?.rowVersion,
            attributeCombinationId: obj?.attributeCombinationId,
            quantity: obj?.quantity,
            isAvailableOnline: obj?.isAvailableOnline,
            isAvailableWholeSale: obj?.isAvailableWholeSale,
            actualInventory: obj?.actualInventory,
            ...location,
            futureInventoryList: obj?.futureInventoryList.filter(
              (list) => list.futureInventryDate && list.futureInventryQty
            ),
          },
        ],
      }));

    if (!eCoomSafety) {
      dispatch(
        setAlertMessage({
          type: "danger",
          message: "ECommSafety is required",
        })
      );
    } else {
      dispatch(setAddLoading(true));
      updateEcommSafetyData();
      ProductInventoryServiceCls.updateProductInventory({
        vendorId: 1,
        storeProductInventoryModel: payload,
      })
        .then((response) => {
          if (response.data.success && response.data.data) {
            dispatch(
              setAlertMessage({
                type: "success",
                message: ValidationMsgs.productInventory.update,
              })
            );
            getListInventory();
            getEcommSafetyData();
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
              message: ValidationMsgs.productInventory.notUpdated,
            })
          );
          dispatch(setAddLoading(false));
        });
    }
  };

  const ExportSampleFile = (pageIndex) => {
    dispatch(setAddLoading(true));
    ProductInventoryServiceCls.liststoreproductinventoryexport({
      args: {
        pageIndex: pageIndex ? pageIndex : paginationData.pageIndex,
        pageSize: paginationData.pageSize,
        sortingOptions,
        filteringOptions: [...filteringOptions],
      },
      storeId: anniesAnnualData.storeId,
      vendorId: anniesAnnualData.vendorId,
    })
      .then((response) => {
        if (response.data.success) {
          window.location.href = response.data.data;

          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.product.export.exportSuccess,
            })
          );
        } else {
          dispatch(
            setAlertMessage({ type: "danger", message: serverError(response) })
          );
        }
        dispatch(setAddLoading(false));
      })
      .catch(() => {
        dispatch(setAddLoading(false));
      });
  };

  useEffect(() => {
    DropdownService.getDropdownValues("vendor").then((response) => {
      if (response.data.success && response.data.data) {
        setVendors(response.data.data);
      }
    });
    getListInventory();
    getEcommSafetyData();
  }, []);

  useEffect(() => {
    getListInventory();
  }, [paginationData?.pageSize]);

  return (
    <>
      <title>
        {TitleNameHelper({ defaultTitleName: "Product Inventory" })}
      </title>

      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({ setFieldValue, values }) => {
          return (
            <Form>
              <div className="py-8">
                <div className="px-4 sm:px-6 lg:px-8 w-full items-center flex justify-between sticky top-0 z-20 py-2 bg-slate-100">
                  <div className="col-span-full w-full flex justify-between items-center">
                    <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
                      {TitleNameHelper({
                        defaultTitleName: "Gardening Slideshows",
                      })}
                    </h1>
                    <div className="flex flex-wrap sm:auto-cols-min gap-2">
                      <button
                        className="btn shadow-none text-indigo-500 hover:text-indigo-600 font-semibold"
                        type="button"
                        onClick={() => ExportSampleFile()}
                      >
                        <span className="px-6">Export</span>
                      </button>

                      {permission?.isEdit && permission?.isDelete && (
                        <div>
                          <button
                            className="btn shadow-none text-indigo-500 hover:text-indigo-600 font-semibold"
                            type="button"
                            onClick={() => setShowImportModal((prev) => !prev)}
                          >
                            <span className="px-6">Import</span>
                          </button>
                          <button
                            className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                            type="submit"
                          >
                            <span className="px-6">save</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className={"px-4 sm:px-6 lg:px-8 w-full pt-7"}>
                  {!showImportModal && <Messages />}
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-full xl:col-span-12 bg-white shadow-xxl rounded-md mb-8">
                      <div className="w-full">
                        <div>
                          <div className="px-6 pt-6">
                            <div className="w-full mb-6 last:mb-0">
                              <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">
                                Ecomm Safety Qty
                                <span className="text-rose-500 text-2xl leading-none"></span>
                              </label>
                              <InputNumber
                                className={
                                  "block w-full bg-white border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md"
                                }
                                value={Number(eCommSafetyData?.value)}
                                onChange={(e) => {
                                  setECommSafety(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 p-6">
                            <div className="grow relative">
                              <div>
                                <input
                                  className="block w-full bg-[#f7f7fa] border-neutral-200 hover:border-neutral-300 focus:border-neutral-100 focus:ring-neutral-300 focus:shadow-lg pl-2 pr-2 py-2 rounded-md"
                                  placeholder="search"
                                  onChange={handleSearch}
                                />
                              </div>
                            </div>
                            <div>
                              <Dropdown
                                options={vendors}
                                defaultValue={vendors && vendors[0]?.value}
                                isClearable={false}
                                classNames={"w-48"}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="overflow-auto border-t border-neutral-200 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-300">
                              <table className="table-auto w-full text-sm text-[#191919] font-semibold h-px">
                                <thead className="text-sm font-bold uppercase text-[#b3b3b3] border-b border-neutral-200">
                                  <tr className="relative">
                                    <th className="px-2 first:pl-5 py-4 cursor-pointer w-[120px]">
                                      <div className="font-semibold text-left w-auto whitespace-nowrap flex items-center break-before-avoid 150">
                                        image
                                      </div>
                                    </th>
                                    <th className="h-full">
                                      <div className="font-semibold text-left flex max-w-md items-center h-full px-2 py-3 w-[180px]">
                                        <span>Product Name</span>
                                      </div>
                                    </th>
                                    <th className="h-full">
                                      <div className="font-semibold text-left flex max-w-md items-center h-full px-2 py-3 w-[220px]">
                                        <span>Cultivar Name</span>
                                      </div>
                                    </th>
                                    <th className="h-full">
                                      <div className="font-semibold text-left flex max-w-md items-center h-full px-2 py-3 w-[220px]">
                                        <span>Preferred Common Name</span>
                                      </div>
                                    </th>
                                    <th className="h-full">
                                      <div className="font-semibold text-left flex max-w-md items-center h-full px-2 py-3 w-[220px]">
                                        <span>Secondary Common Name</span>
                                      </div>
                                    </th>
                                    <th className="h-full">
                                      <div className="font-semibold text-left flex max-w-md items-center h-full px-2 py-3 w-[180px] relative">
                                        <span>SKU/ID</span>
                                      </div>
                                    </th>
                                    <th className="h-full">
                                      <div className="font-semibold text-left flex items-center h-full px-2 py-3 w-[180px] relative">
                                        <span>Qty</span>
                                      </div>
                                    </th>
                                    <th className="h-full">
                                      <div className="font-semibold text-left flex items-center h-full px-2 py-3 w-[180px] relative">
                                        <span>Actual Inventory</span>
                                      </div>
                                    </th>
                                    <th className="h-full">
                                      <div className="font-semibold text-left flex max-w-md items-center justify-center h-full px-2 py-3 w-[180px] relative">
                                        <span>AVL online</span>
                                      </div>
                                    </th>
                                    <th className="h-full">
                                      <div className="font-semibold text-left flex max-w-md items-center justify-center h-full px-2 py-3 w-[180px] relative">
                                        <span>AVL wholesale</span>
                                      </div>
                                    </th>
                                    <td></td>
                                    {futureInventoryLength.length > 0 &&
                                      futureInventoryLength.map(
                                        (obj, index) => (
                                          <Fragment key={index}>
                                            <th className="h-full">
                                              <div className="font-semibold text-left flex max-w-md items-center h-full px-2 py-3 w-[200px] relative">
                                                <span>
                                                  Future Inventory Date
                                                </span>
                                              </div>
                                            </th>
                                            <th className="h-full">
                                              <div className="font-semibold text-left flex max-w-md items-center h-full px-2 py-3 w-[180px] relative">
                                                <span>Future QTY</span>
                                              </div>
                                            </th>
                                          </Fragment>
                                        )
                                      )}
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-200 border-b border-neutral-200">
                                  <FieldArray
                                    name="listData"
                                    render={(FormikFieldArr) => {
                                      const { listData } =
                                        FormikFieldArr.form.values;
                                      return (
                                        <Fragment>
                                          {listData.length
                                            ? listData.map((fields, pIndex) => {
                                                return (
                                                  <tr key={pIndex}>
                                                    <td className="px-2 first:pl-5 py-3">
                                                      <div className="h-14 w-14 mr-2 flex items-center justify-center overflow-hidden rounded-full border bg-white">
                                                        <Image
                                                          src={
                                                            fields
                                                              ?.productImage[0]
                                                          }
                                                          className="max-h-full"
                                                        />
                                                      </div>
                                                    </td>
                                                    <td className="px-2 first:pl-5 py-3">
                                                      <div>{fields?.name}</div>
                                                    </td>
                                                    <td className="px-2 first:pl-5 py-3">
                                                      <div>
                                                        {fields?.cultivarName}
                                                      </div>
                                                    </td>
                                                    <td className="px-2 first:pl-5 py-3">
                                                      <div>
                                                        {
                                                          fields?.preferredCommonName
                                                        }
                                                      </div>
                                                    </td>
                                                    <td className="px-2 first:pl-5 py-3">
                                                      <div>
                                                        {
                                                          fields?.secondaryCommonName
                                                        }
                                                      </div>
                                                    </td>
                                                    <td className="px-2 first:pl-5 py-3">
                                                      <div>
                                                        {fields?.ourSKU}
                                                      </div>
                                                    </td>
                                                    <td className="px-2 first:pl-5 py-3">
                                                      <div className="w-[180px]">
                                                        <InputNumber
                                                          name={`listData[${pIndex}].quantity`}
                                                          value={
                                                            fields?.quantity
                                                          }
                                                          onChange={(e) => {
                                                            setFieldValue(
                                                              `listData[${pIndex}].quantity`,
                                                              e.target.value
                                                            );
                                                          }}
                                                          className={
                                                            "block w-full bg-gray-100 border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md"
                                                          }
                                                        />
                                                      </div>
                                                    </td>
                                                    <td className="px-2 first:pl-5 py-3">
                                                      <div className="w-[180px]">
                                                        <InputNumber
                                                          name={`listData[${pIndex}].actualInventory`}
                                                          value={
                                                            fields?.actualInventory
                                                          }
                                                          onChange={(e) => {
                                                            setFieldValue(
                                                              `listData[${pIndex}].actualInventory`,
                                                              e.target.value
                                                            );
                                                          }}
                                                          className={
                                                            "block w-full bg-gray-100 border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md"
                                                          }
                                                        />
                                                      </div>
                                                    </td>
                                                    <td className="px-2 first:pl-5 py-3">
                                                      <div className="flex items-center justify-center">
                                                        <ToggleButton
                                                          name={`listData[${pIndex}].isAvailableOnline`}
                                                          id={`listData[${pIndex}].isAvailableOnline`}
                                                          onChange={(e) => {
                                                            setFieldValue(
                                                              `listData[${pIndex}].isAvailableOnline`,
                                                              e.target.checked
                                                            );
                                                          }}
                                                          on="Yes"
                                                          off="No"
                                                          defaultValue={
                                                            fields.isAvailableOnline
                                                          }
                                                        />
                                                      </div>
                                                    </td>
                                                    <td className="px-2 first:pl-5 py-3">
                                                      <div className="flex items-center justify-center">
                                                        <ToggleButton
                                                          name={`listData[${pIndex}].isAvailableWholeSale`}
                                                          id={`listData[${pIndex}].isAvailableWholeSale`}
                                                          onChange={(e) => {
                                                            setFieldValue(
                                                              `listData[${pIndex}].isAvailableWholeSale`,
                                                              e.target.checked
                                                            );
                                                          }}
                                                          on="Yes"
                                                          off="No"
                                                          defaultValue={
                                                            fields.isAvailableWholeSale
                                                          }
                                                        />
                                                      </div>
                                                    </td>
                                                    <td>
                                                      <div className="flex justify-center items-center h-full">
                                                        <span
                                                          onClick={() =>
                                                            addMoreFutureInventory(
                                                              setFieldValue,
                                                              values,
                                                              fields?.futureInventoryList,
                                                              pIndex
                                                            )
                                                          }
                                                          className="cursor-pointer bg-indigo-500 rounded-md text-white w-5 h-5 inline-flex items-center justify-center"
                                                        >
                                                          <span className="material-icons-outlined text-sm">
                                                            add
                                                          </span>
                                                        </span>
                                                      </div>
                                                    </td>

                                                    {fields &&
                                                      fields.futureInventoryList
                                                        .length &&
                                                      fields.futureInventoryList.map(
                                                        (
                                                          childValue,
                                                          cIndex
                                                        ) => {
                                                          return (
                                                            <FutureInventoryColumns
                                                              pIndex={pIndex}
                                                              cIndex={cIndex}
                                                              childValue={
                                                                childValue
                                                              }
                                                            />
                                                          );
                                                        }
                                                      )}
                                                  </tr>
                                                );
                                              })
                                            : ""}
                                        </Fragment>
                                      );
                                    }}
                                  />
                                </tbody>
                              </table>
                            </div>
                          </div>
                          {paginationData?.totalCount > 0 && (
                            <Pagination
                              totalCount={paginationData?.totalCount}
                              pageSize={paginationData?.pageSize}
                              totalPages={paginationData?.totalPages}
                              pageIndex={paginationData?.pageIndex}
                              setTablePageSize={(value) =>
                                setPaginationDataFunc("pageSize", value)
                              }
                              hasPreviousPage={paginationData?.hasPreviousPage}
                              hasNextPage={paginationData?.hasNextPage}
                              hasPageSize={true}
                              fetchData={getListInventory}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>

      {showImportModal && (
        <Import
          setShowImportModal={setShowImportModal}
          showImportModal={showImportModal}
        />
      )}
    </>
  );
};

export default ProductInventory;

export const FutureInventoryColumns = ({ pIndex, cIndex, childValue }) => {
  const { values, setFieldValue } = useFormikContext();
  return (
    <Fragment>
      <td className="px-2 first:pl-5 py-3">
        <DatePicker
          name={`listData[${pIndex}].futureInventoryList[${cIndex}].futureInventryDate`}
          defaultValue={
            childValue?.futureInventryDate ? childValue?.futureInventryDate : ""
          }
          minDate={new Date()}
          onChange={(date) => {
            setFieldValue(
              `listData[${pIndex}].futureInventoryList[${cIndex}].futureInventryDate`,
              date
            );
            setFieldValue(
              `listData[${pIndex}].futureInventoryList[${cIndex}].id`,
              childValue?.id ? childValue?.id : 0
            );
            setFieldValue(
              `listData[${pIndex}].futureInventoryList[${cIndex}].recStatus`,
              childValue?.recStatus
                ? childValue?.recStatus
                : RecStatusValuebyName.Active
            );
            setFieldValue(
              `listData[${pIndex}].futureInventoryList[${cIndex}].rowVersion`,
              childValue?.rowVersion ? childValue?.rowVersion : null
            );
          }}
          isClearable={true}
        />
      </td>
      <td className="px-2 first:pl-5 py-3">
        <InputNumber
          name={`listData[${pIndex}].futureInventoryList[${cIndex}].futureInventryQty`}
          className={
            "block w-full bg-gray-100 border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md"
          }
          value={
            childValue?.futureInventryQty ? childValue?.futureInventryQty : ""
          }
          onChange={(e) => {
            setFieldValue(
              `listData[${pIndex}].futureInventoryList[${cIndex}].futureInventryQty`,
              e.target.value
            );
            setFieldValue(
              `listData[${pIndex}].futureInventoryList[${cIndex}].id`,
              childValue?.id ? childValue?.id : 0
            );
            setFieldValue(
              `listData[${pIndex}].futureInventoryList[${cIndex}].recStatus`,
              childValue?.recStatus
                ? childValue?.recStatus
                : RecStatusValuebyName.Active
            );
            setFieldValue(
              `listData[${pIndex}].futureInventoryList[${cIndex}].rowVersion`,
              childValue?.rowVersion ? childValue?.rowVersion : null
            );
          }}
        />
      </td>
    </Fragment>
  );
};

export function findObjectWithMostElements(arrayOfObjects, keyName) {
  let maxElementCount = 0;
  let maxElementObject = [];
  for (const obj of arrayOfObjects) {
    if (obj.hasOwnProperty(keyName) && Array.isArray(obj[keyName])) {
      const elementCount = obj[keyName].length;
      if (elementCount > maxElementCount) {
        maxElementCount = elementCount;
        maxElementObject = obj;
      }
    }

    if (obj[keyName].length <= 0) {
      obj[keyName] = [
        {
          rowVersion: "",
          id: 0,
          futureInventryDate: "",
          futureInventryQty: 0,
          recStatus: RecStatusValuebyName.Active,
        },
      ];
    }
  }

  const keyNameLenght = maxElementObject[keyName]?.map((obj, index) => index);

  return keyNameLenght && keyNameLenght.length > 0 ? keyNameLenght : [1];
}
