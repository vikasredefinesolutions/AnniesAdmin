import React, { useState, useCallback, useEffect, useRef, Fragment, } from "react";
import Input from "components/common/formComponent/Input";
import { Formik, Form, useFormikContext } from "formik";
import DatePicker from "components/common/formComponent/DatePicker";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { useDispatch, useSelector } from "react-redux";
import { serverError } from "services/common/helper/Helper"
import * as Yup from "yup";
import { DateTimeFormat } from "services/common/helper/Helper";
import StoreInventoryService from "services/admin/master/store/product/InventoryService";
import StoreVendorSKUMappingService from "services/admin/master/store/product/VendorSKUMapping";
import { ProductAttributeTypeValues, RecStatusValuebyName } from "global/Enum";
import SingleFieldUpdateServiceStore from "services/admin/master/store/product/SingleFieldUpdateService";
import Dropdown from "components/common/formComponent/Dropdown";
import { ValidationMsgs } from "global/ValidationMessages";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import UnsavedFormHandler from "./UnsavedFormHandler";
import InputNumber from "components/common/formComponent/InputNumber";
import Image from "components/common/formComponent/Image";
import ToggleButton from "components/common/formComponent/ToggleButton";

const Inventory = ({
  displayFieldElement,
  fetchFieldProperty,
  fields,
  values,
  setFormSubmit,
  activeTab,
  index,
  type,
  productId,
  checkProductStatus,
  productstatusVal,
  readOnly,
  getProductData,
  getProductReadinessData,
  // getValidationForAllFilledFieldsFunc,
  setsaveUnSavedFields,
  setWishedToChangeTab,
  clearCacheForBrandCategory,
  ProductAttributeLength
}) => {
  const dispatch = useDispatch();
  const formRef = useRef();

  const GlobalLoading = useSelector((store) => store?.GlobalLoaderReducer?.toLoad);
  const location = useSelector((store) => store?.location);

  const [SelectedVendor, setSelectedVendor] = useState("");
  const [APIData, setAPIData] = useState([]);
  const [initialValues, setInitialValues] = useState({});
  const [FutureInventoryLength, setFutureInventoryLength] = useState([]);
  const CheckAttribute = ProductAttributeLength ? ProductAttributeTypeValues.WithAttribute : ProductAttributeTypeValues.WithoutAttribute

  const getInventoryData = useCallback(() => {
    if (SelectedVendor && CheckAttribute) {
      dispatch(setAddLoading(true))
      StoreInventoryService.getInventory(productId, SelectedVendor, CheckAttribute)
        .then((res) => {
          var response = res.data;
          setAPIData(response.data);
          dispatch(setAddLoading(false))
        }).catch((err) => {
          dispatch(setAddLoading(false))
        });
    }
  }, [SelectedVendor, ProductAttributeLength]);

  useEffect(() => {
    if (SelectedVendor && CheckAttribute) {
      getInventoryData()
    }
  }, [SelectedVendor, activeTab, ProductAttributeLength]);

  const convertSingleArray = useCallback((value) => {
    let temp = {};
    let temp1 = {};
    value.map((data) => {
      temp1 = {
        ...temp1, id: data.id == null ? 0 : data.id,
        attributeCombinationId: data.attributeCombinationId,
        image: data?.image, varientName: data?.varientName,
        sku: data?.sku, quantity: data?.quantity == null ? 0 : data.quantity,
        recStatus: data?.recStatus || RecStatusValuebyName.Active,
        rowVersion: data?.rowVersion || null,
        subRows: value?.subRows,
        futureInventoryList: data?.futureInventoryList || [],
        isAvailableOnline: data?.isAvailableOnline || false,
        isAvailableWholeSale: data?.isAvailableWholeSale || false,
      };

      if (data.subRows) {
        temp = {
          ...temp,
          [data.attributeCombinationId]: temp1,
          ...convertSingleArray(data.subRows),
        };
      } else {
        temp = { ...temp, [data.attributeCombinationId]: temp1 };
      }
      return "";
    });
    return temp;
  }, []);

  useEffect(() => {
    setInitialValues(() => {
      let temp = {};
      let main = {};
      APIData?.map((value) => {
        main = {
          ...main, id: value.id == null ? 0 : value.id,
          attributeCombinationId: value.attributeCombinationId,
          quantity: value?.quantity == null ? 0 : value.quantity,
          recStatus: value?.recStatus || RecStatusValuebyName.Active,
          rowVersion: value?.rowVersion || null,
          subRows: value?.subRows,
          futureInventoryList: value?.futureInventoryList || [],
          isAvailableOnline: value?.isAvailableOnline || false,
          isAvailableWholeSale: value?.isAvailableWholeSale || false,
        };
        if (value.subRows) {
          var rows = { ...main };
          delete rows.subRows;
          temp = {
            ...temp,
            [value.attributeCombinationId]: rows,
            ...convertSingleArray(main.subRows),
          };
        } else {
          temp = { ...temp, [value.attributeCombinationId]: main };
        }
        return "";
      });
      return { productfutureinventorymodel: temp };
    });
  }, [APIData]);

  useEffect(() => {
    setFutureInventoryLength(() => {
      var temp = [];
      APIData?.map((value) => {
        value?.subRows.map((subRow) => {
          if (temp?.length < subRow?.futureInventoryList?.length) {
            temp = subRow?.futureInventoryList;
          }
        });
        return temp;
      });
      return temp.length > 0 ? temp : [1];
    });
  }, [APIData]);

  // form related
  useEffect(() => {
    if (activeTab == index) {
      setFormSubmit(formRef.current);
    }
  }, [formRef, setFormSubmit, activeTab]);

  const submitHandler = (fields, { resetForm }) => {
    let Obj = []
    let temp = {}
    let finalObj = {}
    Object.keys(fields.productfutureinventorymodel).map((value, key) => {
      if (fields.productfutureinventorymodel[value]?.futureInventoryList && fields.productfutureinventorymodel[value]?.futureInventoryList?.length > 0) {
        let futureInventoryList = [];
        fields.productfutureinventorymodel[value]?.futureInventoryList.map((row, index) => {
          if (row.id === undefined) {
            futureInventoryList = [...futureInventoryList, { ...row, id: 0, rowVersion: null }];
          }
          else {
            futureInventoryList = [...futureInventoryList, { ...row }]
          }
        })
        Obj = [...Obj, { ...fields.productfutureinventorymodel[value], ...location, futureInventoryList: futureInventoryList }];
      }
      else {
        Obj = [...Obj, { ...fields.productfutureinventorymodel[value], ...location }];
      }
    })
    finalObj = {
      productId: productId,
      vendorId: SelectedVendor,
      productTypeValues: ProductAttributeLength ? ProductAttributeTypeValues.WithAttribute : ProductAttributeTypeValues.WithoutAttribute,
      productfutureinventorymodel: Obj
    }

    dispatch(setAddLoading(true))
    StoreInventoryService.addUpdateInventory(finalObj).then((response) => {
      if (response.data.success) {
        dispatch(
          setAlertMessage({
            type: "success",
            message: ValidationMsgs.masterCatalog.inventory.created,
          })
        );
        getProductReadinessData()
        const obj = [
          {
            path: `/ecomSafetyQty`,
            op: "Replace",
            value: fields.ecomSafetyQty
          }
        ]
        getInventoryData()
        SingleFieldUpdateServiceStore.updateSingleField(productId, obj).then((response) => {
          if (response.data.success) {
            dispatch(
              setAlertMessage({
                type: "success",
                message: ValidationMsgs.masterCatalog.inventory.Updated,
              })
            );
            getProductReadinessData();
            getProductData();
            clearCacheForBrandCategory();
          } else {
            dispatch(
              setAlertMessage({ type: "danger", message: serverError(response) })
            );
          }
          dispatch(setAddLoading(false))
          // getValidationForAllFilledFieldsFunc()
        })
          .catch((errors) => {
            dispatch(
              setAlertMessage({
                type: "danger",
                message: ValidationMsgs.masterCatalog.inventory.NotUpdated,
              })
            );
            dispatch(setAddLoading(false))

          });
      } else {
        dispatch(setAlertMessage({ type: "danger", message: serverError(response) }));
        dispatch(setAddLoading(false))

      }
    }).catch((errors) => {
      dispatch(
        setAlertMessage({
          type: "danger",
          message: ValidationMsgs.masterCatalog.inventory.notCreated,
        })
      );
      dispatch(setAddLoading(false))
      getInventoryData()
    });
    resetForm({});
  };

  const schema = Yup.object().shape({
    productfutureinventorymodel: Yup.object().shape({
      ...(() => {
        var validations = {};
        var validationData = initialValues.productfutureinventorymodel
          ? Object.keys(initialValues.productfutureinventorymodel)
          : [];
        validationData.map((v, i) => {
          validations = {
            ...validations,
            [v]: Yup.object().shape({
              [fetchFieldProperty("dbfield", "sku")]:
                displayFieldElement(fields, "sku") && null,
            }),
          };
        });
        return validations;
      })(),
    }),
  });

  useEffect(() => {
    setWishedToChangeTab(false)
  }, []);

  const InitialData = {
    ...initialValues,
    productstatus: productstatusVal,
    ecomSafetyQty: values.ecomSafetyQty,
  }

  return (
    <>
      <div className="w-full px-6 pt-6 flex flex-wrap items-center justify-between">
        <div className="grow uppercase tracking-wide text-gray-500 text-lg font-bold">
          Inventory
        </div>
      </div>

      <div className="pb-5">
        <Formik
          enableReinitialize={true}
          initialValues={InitialData}
          innerRef={formRef}
          onSubmit={submitHandler}
          validationSchema={schema}
          validateOnMount={true}
        >
          {({ errors, setFieldValue, values }) => {
            checkProductStatus(errors);
            return (
              <Form>
                <UnsavedFormHandler values={values} setsaveUnSavedFields={setsaveUnSavedFields} InitialData={InitialData} />

                <Input type="hidden" name="productstatus" id="productstatus" />
                <div className="px-6 pt-6">
                  <div className="w-full mb-6 last:mb-0">
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">
                      Ecomm Safety Qty
                      <span className="text-rose-500 text-2xl leading-none"></span>
                    </label>
                    <InputNumber name="ecomSafetyQty" id="ecomSafetyQty" value={values.ecomSafetyQty} allowNegative={false}
                      onChange={(e) => {
                        setFieldValue("ecomSafetyQty", e.target.value)
                      }}
                      // onKeyPress={(event) => {
                      //   if (!/^\d*$/.test(event.key)) {
                      //     event.preventDefault();
                      //   }
                      // }}
                      disabled={readOnly} />
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 p-6">
                  <div className="grow relative">
                    <div className="absolute h-10 mt-0 left-0 top-0 flex items-center">
                      {/* <svg
                        className="h-4 pl-4 fill-current text-gray-600"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
                      </svg> */}
                    </div>
                    {/* <input
                      id="search-toggle"
                      type="search"
                      placeholder="search"
                      className="block w-full bg-[#f7f7fa] border-neutral-200 hover:border-neutral-300 focus:border-neutral-100 focus:ring-neutral-300 focus:shadow-lg pl-10 pr-2 py-2 rounded-md"
                    /> */}
                  </div>
                  <div>
                    <VendorDropdown productId={productId} setSelectedVendor={setSelectedVendor} SelectedVendor={SelectedVendor} type={type} activeTab={activeTab} />
                  </div>
                </div>
                <div className="max-h-screen border-t border-neutral-200 overflow-x-scroll scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-300" >
                  <table className="table-auto w-full text-sm text-[#191919] justify-between">
                    <thead className="text-sm font-bold uppercase text-[#b3b3b3] border-b border-t border-neutral-200">
                      <tr className="relative">
                        <th className="h-full">
                          <div className="flex items-center h-full px-2 py-3 border-neutral-200">
                            {/* <span className="material-icons-outlined select-none leading-none ml-2 w-6 h-6 transition-all variant-arrow">add</span> */}
                          </div>
                        </th>
                        <th className=" h-full px-2 py-3 border-r border-neutral-200" colSpan="2">
                          <div className="font-semibold text-left flex w-48 items-center">
                            <span>Variants</span>
                          </div>
                        </th>
                        <th className=" h-full px-2 py-3 border-r border-neutral-200">
                          <div className="font-semibold text-left flex w-48 items-center">
                            <span>SKU</span>
                          </div>
                        </th>
                        <th className=" h-full px-2 py-3 border-r border-neutral-200">
                          <div className="font-semibold text-left flex w-48 items-center">
                            <span>Avl. Online</span>
                          </div>
                        </th>
                        <th className=" h-full px-2 py-3 border-r border-neutral-200">
                          <div className="font-semibold text-left flex w-48 items-center">
                            <span>Avl. WholeSale</span>
                          </div>
                        </th>
                        <th className="w-[119px] px-2 py-3 border-r border-neutral-200 relative">
                          <div className="font-semibold text-left flex max-w-md items-center ">
                            {(!readOnly /* && SelectedVendor > 0 */) && <span
                              onClick={() =>
                                setFutureInventoryLength((prev) => [
                                  1,
                                  ...prev,
                                ])
                              }
                              className="cursor-pointer absolute -right-2.5 top-0 bg-indigo-500 rounded-md text-white w-5 h-5 inline-flex items-center justify-center"
                            >
                              <span className="material-icons-outlined text-sm">
                                add
                              </span>
                            </span>}
                            <span>Quantity</span>
                          </div>
                        </th>
                        {FutureInventoryLength?.map((value, index) => {
                          return (
                            <Fragment key={index}>
                              <th className="h-full px-2 py-3 border-r border-neutral-200">
                                <div className="font-semibold text-left flex w-72 max-w-md items-center ">
                                  <span>Future Inventory Date</span>
                                </div>
                              </th>
                              <th className="h-full px-2 py-3 border-r border-neutral-200">
                                <div className="font-semibold text-left flex w-56 max-w-md items-center relative">
                                  <span>Future Inventory</span>
                                </div>
                              </th>
                            </Fragment>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody className="">
                      {!GlobalLoading && APIData && APIData.length ? APIData?.map((inventory, index) => {
                        return (
                          <Fragment key={index}>
                            <TR
                              displayFieldElement={displayFieldElement}
                              fields={fields}
                              inventory={inventory}
                              SelectedVendor={SelectedVendor}
                              index={index}
                              key={index}
                              FutureInventoryLength={FutureInventoryLength}
                              readOnly={readOnly}
                              ProductAttributeLength={ProductAttributeLength}
                            />
                          </Fragment>
                        );
                      }) :
                        <tr>
                          <td className="text-red-600 bg-white text-center" colSpan="12">No data found as of now.</td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default Inventory;

const TR = ({
  inventory,
  index,
  FutureInventoryLength,
  displayFieldElement,
  fields,
  SelectedVendor,
  readOnly,
  ProductAttributeLength
}) => {
  const [showChild, setShowChild] = useState(false);
  const { values, setFieldValue } = useFormikContext();

  return (
    <>
      <tr role={`row`} className="border border-neutral-200">
        <td className="px-2 first:pl-5 py-3">
          {ProductAttributeLength &&
            <div>
              <div className="leading-none w-6 h-6 cursor-pointer transition-all variant-arrow"
                onClick={() => {
                  setShowChild((prev) => !prev);
                }}
              >
                <span className="material-icons-outlined select-none">
                  {showChild ? "remove" : "add"}
                </span>
              </div>
            </div>
          }
        </td>
        <td className="px-2 first:pl-5 py-3">
          <div className="h-12 w-12 mr-2 flex items-center justify-center overflow-hidden rounded-md border bg-white">
            <Image src={inventory?.varientImage} containerHeight={""} className="max-h-full" />
          </div>
        </td>
        <td className="px-2 first:pl-5 py-3">
          <div>
            {/* <a href="mc-add-options.html" className="font-medium leading-10"> */}
            {inventory?.varientName}
            {/* </a> */}
          </div>
        </td>
        <td className="px-2 first:pl-5 py-3">
          <div>
            {inventory?.sku}
          </div>
        </td>
        {!ProductAttributeLength ?
          <>
            <td className="px-2 first:pl-5 py-3 text-center justify-center">
              <div>
                <ToggleButton
                  id={`productfutureinventorymodel.${0}.isAvailableOnline`}
                  onChange={(e) => setFieldValue(`productfutureinventorymodel.${0}.isAvailableOnline`, e.target.checked)}
                  defaultValue={values?.productfutureinventorymodel && values?.productfutureinventorymodel[0]?.isAvailableOnline}
                  name={`productfutureinventorymodel.${0}.isAvailableOnline`}
                  on={"Yes"}
                  off={"No"}
                />
              </div>
            </td>
            <td className="px-2 first:pl-5 py-3 text-center justify-center">
              <div>
                <ToggleButton
                  id={`productfutureinventorymodel.${0}.isAvailableWholeSale`}
                  onChange={(e) => setFieldValue(`productfutureinventorymodel.${0}.isAvailableWholeSale`, e.target.checked)}
                  defaultValue={values?.productfutureinventorymodel && values?.productfutureinventorymodel[0]?.isAvailableWholeSale}
                  name={`productfutureinventorymodel.${0}.isAvailableWholeSale`}
                  on={"Yes"}
                  off={"No"}
                />
              </div>
            </td>
            <td className="px-2 first:pl-5 py-3">
              <div>
                {readOnly || SelectedVendor == 0 ? (values?.productfutureinventorymodel ? values?.productfutureinventorymodel[0]?.quantity : '') :
                  <InputNumber
                    name={`productfutureinventorymodel.${0}.quantity`}
                    allowNegative={false}
                    placeholder=""
                    value={values?.productfutureinventorymodel ? values?.productfutureinventorymodel[0]?.quantity : ''}
                    onChange={(e) => { setFieldValue(`productfutureinventorymodel.${0}.quantity`, e.target.value) }}
                    displayError={true}
                    onKeyPress={(event) => {
                      if (!/^\d*$/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    onBlur={(e) => {
                      setFieldValue(
                        `productfutureinventorymodel[${0}].quantity`,
                        e.target.value === "" ? "0" : e.target.value
                      );
                    }}
                  />
                }
              </div>
            </td>
            {FutureInventoryLength?.length && FutureInventoryLength.map((v, index) => {
              return (
                <Fragment key={index}>
                  <td className="px-2 first:pl-5 py-3 w-[200px]">
                    <Input type="hidden" name={`productfutureinventorymodel[${0}].futureInventoryList.${index}.id`} value={values.productfutureinventorymodel?.[0]?.futureInventoryList?.[index] ? values.productfutureinventorymodel?.[0]?.futureInventoryList?.[index]?.id : 0} />
                    <Input type="hidden" name={`productfutureinventorymodel[${0}].futureInventoryList.${index}.rowVersion`} value={values.productfutureinventorymodel?.[0]?.futureInventoryList?.[index] ? values.productfutureinventorymodel?.[0]?.futureInventoryList?.[index]?.rowVersion : null} />
                    <div>
                      {readOnly || SelectedVendor == 0 ? (values.productfutureinventorymodel?.[0]?.futureInventoryList?.[index] ?
                        DateTimeFormat(values.productfutureinventorymodel?.[0]?.futureInventoryList?.[index]?.futureInventryDate) : '').date :
                        <DatePicker
                          defaultValue={values.productfutureinventorymodel?.[0]?.futureInventoryList?.[index] ? values.productfutureinventorymodel?.[0]?.futureInventoryList?.[index]?.futureInventryDate : ""}
                          name={`productfutureinventorymodel[${0}].futureInventoryList.${index}.futureInventryDate`}
                          minDate={new Date()}
                          isClearable={true}
                          onChange={(date) => {
                            if (!date) {
                              setFieldValue(`productfutureinventorymodel[${0}].futureInventoryList.${index}.futureInventryQty`, 0)
                              setFieldValue(`productfutureinventorymodel[${0}].futureInventoryList.${index}.recStatus`, "R")
                            } else {
                              setFieldValue(`productfutureinventorymodel[${0}].futureInventoryList.${index}.futureInventryDate`, date)
                              setFieldValue(`productfutureinventorymodel[${0}].futureInventoryList.${index}.recStatus`, "A")
                            }
                          }}
                        />
                      }
                    </div>
                  </td>
                  <td className="px-2 first:pl-5 py-3 w-[200px]">
                    <div >
                      {readOnly || SelectedVendor == 0 ? (values.productfutureinventorymodel?.[0]?.futureInventoryList?.[index] ?
                        (values.productfutureinventorymodel?.[0]?.futureInventoryList?.[index]?.futureInventryQty) : '') :
                        <InputNumber
                          name={`productfutureinventorymodel[${0}].futureInventoryList.${index}.futureInventryQty`}
                          allowNegative={false}
                          onKeyPress={(event) => {
                            if (!/^\d*$/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                          placeholder=""
                          value={values.productfutureinventorymodel?.[0]?.futureInventoryList?.[index] ? values.productfutureinventorymodel?.[0]?.futureInventoryList?.[index]?.futureInventryQty : ""}
                          displayError={true}
                          onChange={(e) => { setFieldValue(`productfutureinventorymodel[${0}].futureInventoryList.${index}.futureInventryQty`, e.target.value) }}
                        />
                      }
                    </div>
                  </td>
                </Fragment>
              );
            })}
          </>
          :
          <>
            <td className="px-2 first:pl-5 py-3">
              <div ></div>
            </td>
            <td className="px-2 first:pl-5 py-3">
              <div ></div>
            </td>
            <td className="px-2 first:pl-5 py-3">
              <div ></div>
            </td>
          </>
        }
      </tr>
      {showChild && (
        <>
          {inventory.subRows?.length && inventory?.subRows.map((value, index) => {
            return (
              <Fragment key={index}>
                <tr key={index} className="border border-neutral-200">
                  <td className="px-2 first:pl-5 py-3">
                    <div > </div>
                  </td>
                  <td className="px-2 first:pl-5 py-3">
                    <div className="h-12 w-12 mr-2 flex items-center justify-center overflow-hidden rounded-md border bg-white">
                      <Image src={value.varientImage} containerHeight={""} className="max-h-full" />
                    </div>
                  </td>
                  <td className="px-2 first:pl-5 py-3">
                    <div >
                      <span className="font-medium leading-10">
                        {values.productfutureinventorymodel?.[value.attributeCombinationId]?.varientName}
                      </span>
                    </div>
                  </td>
                  <td className="px-2 first:pl-5 py-3">
                    <span className="leading-10">
                      {values.productfutureinventorymodel[value.attributeCombinationId].sku}
                    </span>
                  </td>
                  <td className="px-2 first:pl-5 py-3">
                    <span className="leading-10">
                      <ToggleButton
                        id={`productfutureinventorymodel.${value.attributeCombinationId}.isAvailableOnline`}
                        onChange={(e) => setFieldValue(`productfutureinventorymodel.${value.attributeCombinationId}.isAvailableOnline`, e.target.checked)}
                        defaultValue={values?.productfutureinventorymodel && values?.productfutureinventorymodel[value.attributeCombinationId]?.isAvailableOnline}
                        name={`productfutureinventorymodel.${value.attributeCombinationId}.isAvailableOnline`}
                        on={"Yes"}
                        off={"No"}
                      />
                    </span>
                  </td>
                  <td className="px-2 first:pl-5 py-3">
                    <span className="leading-10">
                      <ToggleButton
                        id={`productfutureinventorymodel.${value.attributeCombinationId}.isAvailableWholeSale`}
                        onChange={(e) => setFieldValue(`productfutureinventorymodel.${value.attributeCombinationId}.isAvailableWholeSale`, e.target.checked)}
                        defaultValue={values?.productfutureinventorymodel && values?.productfutureinventorymodel[value.attributeCombinationId]?.isAvailableWholeSale}
                        name={`productfutureinventorymodel.${value.attributeCombinationId}.isAvailableWholeSale`}
                        on={"Yes"}
                        off={"No"}
                      />
                    </span>
                  </td>
                  <td className="px-2 first:pl-5 py-3">
                    <div >
                      {readOnly || SelectedVendor == 0 ? (values?.productfutureinventorymodel ? values?.productfutureinventorymodel[value.attributeCombinationId]?.quantity : '') :
                        // <InputNumber
                        //   type="text"
                        //   defaultValue={values.quantity}
                        //   name={`productfutureinventorymodel.${value.attributeCombinationId}.quantity`}
                        // onBlur={(e) => {
                        //   setFieldValue(
                        //     `productfutureinventorymodel[${value.attributeCombinationId}].quantity`,
                        //     e.target.value === "" ? "0" : e.target.value
                        //   );
                        // }}
                        //   value={values?.productfutureinventorymodel ? values?.productfutureinventorymodel[value.attributeCombinationId]?.quantity : ''} onChange={(e) => { setFieldValue(`productfutureinventorymodel.${value.attributeCombinationId}.quantity`, e.target.value) }}

                        // />
                        <InputNumber
                          name={`productfutureinventorymodel.${value.attributeCombinationId}.quantity`}
                          allowNegative={false}
                          placeholder=""
                          value={values?.productfutureinventorymodel ? values?.productfutureinventorymodel[value.attributeCombinationId]?.quantity : ''}
                          onChange={(e) => { setFieldValue(`productfutureinventorymodel.${value.attributeCombinationId}.quantity`, e.target.value) }}
                          displayError={true}
                          onKeyPress={(event) => {
                            if (!/^\d*$/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                          onBlur={(e) => {
                            setFieldValue(
                              `productfutureinventorymodel[${value.attributeCombinationId}].quantity`,
                              e.target.value === "" ? "0" : e.target.value
                            );
                          }}
                        />
                      }
                    </div>
                  </td>
                  {FutureInventoryLength?.length && FutureInventoryLength.map((v, index) => {
                    return (
                      <Fragment key={index}>
                        <td className="px-2 first:pl-5 py-3 w-[200px]">
                          <Input type="hidden" name={`productfutureinventorymodel[${value?.attributeCombinationId}].futureInventoryList.${index}.id`} value={values.productfutureinventorymodel?.[value.attributeCombinationId]?.futureInventoryList?.[index] ? values.productfutureinventorymodel?.[value.attributeCombinationId]?.futureInventoryList?.[index]?.id : 0} />
                          <Input type="hidden" name={`productfutureinventorymodel[${value?.attributeCombinationId}].futureInventoryList.${index}.rowVersion`} value={values.productfutureinventorymodel?.[value.attributeCombinationId]?.futureInventoryList?.[index] ? values.productfutureinventorymodel?.[value.attributeCombinationId]?.futureInventoryList?.[index]?.rowVersion : null} />
                          <div>
                            {readOnly || SelectedVendor == 0 ? (values.productfutureinventorymodel?.[value.attributeCombinationId]?.futureInventoryList?.[index] ?
                              DateTimeFormat(values.productfutureinventorymodel?.[value.attributeCombinationId]?.futureInventoryList?.[index]?.futureInventryDate) : '').date :
                              <DatePicker
                                defaultValue={values.productfutureinventorymodel?.[value.attributeCombinationId]?.futureInventoryList?.[index] ? values.productfutureinventorymodel?.[value.attributeCombinationId]?.futureInventoryList?.[index]?.futureInventryDate : ""}
                                name={`productfutureinventorymodel[${value.attributeCombinationId}].futureInventoryList.${index}.futureInventryDate`}
                                minDate={new Date()}
                                isClearable={true}
                                onChange={(date) => {
                                  if (!date) {
                                    setFieldValue(`productfutureinventorymodel[${value.attributeCombinationId}].futureInventoryList.${index}.futureInventryQty`, 0)
                                    setFieldValue(`productfutureinventorymodel[${value.attributeCombinationId}].futureInventoryList.${index}.recStatus`, "R")
                                  } else {
                                    setFieldValue(`productfutureinventorymodel[${value.attributeCombinationId}].futureInventoryList.${index}.futureInventryDate`, date)
                                    setFieldValue(`productfutureinventorymodel[${value.attributeCombinationId}].futureInventoryList.${index}.recStatus`, "A")
                                  }
                                }}
                              />
                            }
                          </div>
                        </td>
                        <td className="px-2 first:pl-5 py-3 w-[200px]">
                          <div >
                            {readOnly || SelectedVendor == 0 ? (values.productfutureinventorymodel[value.attributeCombinationId].futureInventoryList?.[index] ?
                              (values.productfutureinventorymodel?.[value.attributeCombinationId]?.futureInventoryList?.[index]?.futureInventryQty) : '') :
                              // <Input
                              //   defaultValue={
                              //     values.productfutureinventorymodel[value.attributeCombinationId].futureInventoryList[index] ? values.productfutureinventorymodel[value.attributeCombinationId]?.futureInventoryList[index].futureInventryQty
                              //       : ""
                              //   }
                              //   name={`productfutureinventorymodel[${value.attributeCombinationId}].futureInventoryList.${index}.futureInventryQty`}
                              // />
                              <InputNumber
                                name={`productfutureinventorymodel[${value.attributeCombinationId}].futureInventoryList.${index}.futureInventryQty`}
                                allowNegative={false}
                                onKeyPress={(event) => {
                                  if (!/^\d*$/.test(event.key)) {
                                    event.preventDefault();
                                  }
                                }}
                                placeholder=""
                                value={values.productfutureinventorymodel?.[value.attributeCombinationId]?.futureInventoryList?.[index] ? values.productfutureinventorymodel?.[value.attributeCombinationId]?.futureInventoryList?.[index]?.futureInventryQty : ""}
                                displayError={true}
                                onChange={(e) => { setFieldValue(`productfutureinventorymodel[${value.attributeCombinationId}].futureInventoryList.${index}.futureInventryQty`, e.target.value) }}
                              />
                            }
                          </div>
                        </td>
                      </Fragment>
                    );
                  })}
                </tr>
              </Fragment>
            );
          })}
        </>
      )}
    </>
  );
};

const VendorDropdown = React.memo(({ productId, SelectedVendor, setSelectedVendor, type, activeTab }) => {

  const [vendors, setVendors] = useState([]);
  const getVendorDropdownData = useCallback(() => {
    StoreVendorSKUMappingService.getVendorListByProductId(productId).then((res) => {
      if (res.data.success) {
        let vendorData = res.data.data.map((value, key) => {
          return { label: value.vendorName, value: value.id }
        })
        if (vendorData.length > 0) {
          setVendors([{ label: "All Vendors", value: "0" }, ...vendorData])

          if (vendorData.length === 1) {
            setSelectedVendor(vendorData[0].value)
          }
        }
      }
    });
  }, [activeTab]);
  useEffect(() => {
    getVendorDropdownData();
  }, [getVendorDropdownData]);
  return (
    <div >
      <Dropdown options={vendors}
        onChange={(e) => {
          if (e) {
            setSelectedVendor(e.value);
          }
          else {
            setSelectedVendor(0);
          }
        }}
        defaultValue={SelectedVendor}
        isClearable={false}
        classNames={'w-48'}
      />
    </div>
  );
});
