/*Component Name: BasicInformation.jsx
Component Functional Details: Basic Information tab field display
Created By: Vikas Patel
Created Date: 11-May-2022
Modified By: Viks Patel
Modified Date: 1-June-2022 */

import React, { useState, useEffect, useRef } from "react";
import { Formik, Form as FormikForm, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Dropdown from "components/common/formComponent/Dropdown";
import { productType } from "dummy/Dummy";
import Input from "components/common/formComponent/Input";
import CKEditor from "components/common/formComponent/CKEditor";
import { useDispatch, useSelector } from "react-redux";
import { serverError } from "services/common/helper/Helper";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import MasterProductService from "services/admin/master/master/products/ProductService";
import GrandMasterProductService from "services/admin/master/grandMaster/products/ProductService";
import StoreProductService from "services/admin/master/store/product/ProductService";
import BundleProductService from "services/admin/master/store/bundle/ProductService";
import InputNumber from "components/common/formComponent/InputNumber";
import ToggleButton from "components/common/formComponent/ToggleButton";
import { ValidationMsgs } from "global/ValidationMessages";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import UnsavedFormHandler from "./UnsavedFormHandler";
import ErrorHandler from "./ErrorHandler";
import { RecStatusValuebyName, anniesAnnualData } from "global/Enum";

const BasicInformation = ({
  displayFieldElement,
  fetchFieldProperty,
  fields,
  values,
  type,
  setFormSubmit,
  setIsError,
  activeTab,
  isAddMode,
  index,
  requiredFields,
  checkProductStatus,
  productstatusVal,
  readOnly,
  getProductData,
  getProductReadinessData,
  setsaveUnSavedFields,
  setWishedToChangeTab,
  clearCacheForBrandCategory,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef();

  const location = useSelector((store) => store?.location);

  const [CategoryList, setCategoryList] = useState([]);
  const [, setFinalCategoryRootPath] = useState("");

  const API = (type === productType.MC ? MasterProductService : type === productType.GMC ? GrandMasterProductService : [productType.EcommerceStore, productType.CorporateStore, productType.StoreBuilder, productType.FormBuilder].includes(type) ? StoreProductService : BundleProductService);

  const descriptionData = values.description;
  const shortDescriptionData = values.shortDescription;

  const InitialData = {
    id: values?.id || 0,
    brandId: anniesAnnualData.brandId,
    vendorId: anniesAnnualData.vendorId,
    storeId: anniesAnnualData.storeId,
    isBundle: false,
    name: values?.name || "",
    isNameDifferentfromERP: false,
    nameInERP: "",
    isERPNameDifferent: false,
    erpItemId: 0,
    vendorSKU: "",
    ourSKU: values?.ourSKU || "",
    isOurSkuEditable: values?.isOurSkuEditable || false,
    producttypeId: 0,
    companionProduct: "",
    taxCode: "",
    newUrl: "",
    seName: values?.seName || "",
    isSENameChanged: values?.isSENameChanged || false,
    categoryId: anniesAnnualData.categoryId,
    // categoryId: values?.multipleCategoryId ? values?.multipleCategoryId[0] : values?.categoryId,
    categoryRootPath: values?.categoryRootPath || "",/* finalCategoryRootPath */
    multipleCategoryId: values?.multipleCategoryId || [],
    description: values?.description || "",
    shortDescription: values?.shortDescription || "",
    productTagDetails: values?.productTagDetails || "",
    isShortDescriptionOnTop: false,
    dimensionTemplateId: 0,
    length: 0,
    height: 0,
    width: 0,
    volume: 0,
    weightInLBS: values?.weightInLBS || 0,
    shipWeightinLBS: values?.shipWeightinLBS || 0,
    recStatus: values?.productStatus || productstatusVal || 'A',
    rowVersion: values?.rowVersion || null,
    isGiftCardProduct: values?.isGiftCardProduct || false,
  }

  useEffect(() => {
    if (activeTab === index) {
      setFormSubmit(formRef.current);
    }
  }, [formRef, setFormSubmit, activeTab]);

  // useEffect(() => {
  // var tableName = [productType.GMC, productType.MC].includes(type) ? "brand" : "storebrand"

  // getCompanionList()

  // DropdownService.getDropdownValues(tableName, false, storeID).then((response) => {
  //   setBrandList(() => {
  //     return response.data.data;
  //   });
  // });

  // categoryDropDownAPI(-1, anniesAnnualData.storeId).then((response) => {
  //   if (response?.data?.data.length > 0) {
  //     setCategoryList(() => {
  //       return response.data.data;
  //     });
  //   }
  // })

  // DropdownService.getDropdownValues("dimension").then((response) => {
  //   setDimensionList(() => {
  //     return response.data.data;
  //   });
  // });

  // DropdownService.getDropdownValues("producttype").then((response) => {
  //   setProductTypeList(() => {
  //     if ([productType.EcommerceStore, productType.MC, productType.GMC].includes(type)) {
  //       return response.data.data.filter((items) => {
  //         return items.label !== "Decorated"
  //       })
  //     } else { return response.data.data }
  //   });
  // });
  // }, [type, values]);

  useEffect(() => {
    if (CategoryList && CategoryList.length) {
      const categoryRootPathFinal = CategoryList.filter((value) => { return ((value.value === values?.multipleCategoryId) ? values?.multipleCategoryId[0] : values?.categoryId) })
      setFinalCategoryRootPath(categoryRootPathFinal[0]?.label)
    }
  }, [values?.categoryId, CategoryList])

  // const getCompanionList = () => {
  //   if (type === productType.GMC || type === productType.MC || type === productType.CorporateStore || type === productType.EcommerceStore) {
  //     API.getSKUList(productId).then((response) => {
  //       setSKUList(() => {
  //         return response.data.data;
  //       });
  //     })
  //   }
  // }

  // const getVendorOption = (brandId) => {
  //   VendorDropDownAPI(brandId).then((response) => {
  //     setVendorList(() => {
  //       return response.data.data;
  //     });
  //   });
  // }
  // useEffect(() => {
  //   if (values?.brandId) {
  //     getVendorOption(values.brandId);
  //   }
  // }, [values])


  const schema = Yup.object({
    // [fetchFieldProperty("dbfield", "brandId")]:
    //   displayFieldElement(fields, "brandId") &&
    //     requiredFields.indexOf("brandId") > -1
    //     ? Yup.string().trim().required(ValidationMsgs.common.brandIdRequired)
    //     : null,
    [fetchFieldProperty("dbfield", "bundleName")]:
      displayFieldElement(fields, "bundleName") &&
        requiredFields.indexOf("bundleName") > -1
        ? Yup.string().trim().required(ValidationMsgs.masterCatalog.basicInformation.bundleNameRequired)
        : null,
    // [fetchFieldProperty("dbfield", "vendorId")]:
    //   displayFieldElement(fields, "vendorId") &&
    //     requiredFields.indexOf("vendorId") > -1
    //     ? Yup.string().trim().required(ValidationMsgs.common.vendorIdRequired)
    //     : null,
    [fetchFieldProperty("dbfield", "name")]:
      displayFieldElement(fields, "name") && requiredFields.indexOf("name") > -1
        ? Yup.string().trim().required(ValidationMsgs.masterCatalog.basicInformation.nameRequired)
        : null,
    // [fetchFieldProperty("dbfield", "nameInERP")]: Yup.string().trim().when("isNameDifferentfromERP", {
    //   is: (isNameDifferentfromERP) => isNameDifferentfromERP === true,
    //   then: Yup.string().trim().required(ValidationMsgs.masterCatalog.basicInformation.nameInERPRequired),
    //   otherwise: Yup.string().trim(),
    // }),
    // [fetchFieldProperty("dbfield", "erpItemId")]: Yup.string().trim().when("isERPNameDifferent", {
    //   is: (isERPNameDifferent) => isERPNameDifferent === true,
    //   then: Yup.string().trim().required(ValidationMsgs.masterCatalog.basicInformation.erpItemId),
    //   otherwise: Yup.string().trim(),
    // }),
    // [fetchFieldProperty("dbfield", "vendorSKU")]:
    //   displayFieldElement(fields, "vendorSKU") &&
    //     requiredFields.indexOf("vendorSKU") > -1
    //     ? Yup.string().trim().required(ValidationMsgs.masterCatalog.basicInformation.vendorSKURequired)
    //     : null,
    [fetchFieldProperty("dbfield", "ourSKU")]:
      displayFieldElement(fields, "ourSKU") && requiredFields.indexOf("ourSKU") > -1
        ? Yup.string().trim().required(ValidationMsgs.masterCatalog.basicInformation.ourSKURequired)
        : null,
    // [fetchFieldProperty("dbfield", "producttypeId")]:
    //   displayFieldElement(fields, "producttypeId") &&
    //     requiredFields.indexOf("producttypeId") > -1
    //     ? Yup.string().trim().required(ValidationMsgs.masterCatalog.basicInformation.producttypeIdRequired)
    //     : null,
    // [fetchFieldProperty("dbfield", "companionProduct")]:
    //   displayFieldElement(fields, "companionProduct") &&
    //     requiredFields.indexOf("companionProduct") > -1
    //     ? Yup.string().trim().required(ValidationMsgs.masterCatalog.basicInformation.companionProductRequired)
    //     : null,
    // [fetchFieldProperty("dbfield", "taxCode")]:
    //   displayFieldElement(fields, "taxCode") &&
    //     requiredFields.indexOf("taxCode") > -1
    //     ? Yup.string().trim().required(ValidationMsgs.masterCatalog.basicInformation.taxCodeRequired)
    //     : null,
    // [fetchFieldProperty("dbfield", "categoryId")]:
    //   displayFieldElement(fields, "categoryId") &&
    //     requiredFields.indexOf("categoryId") > -1
    //     ? Yup.string().trim().required(ValidationMsgs.masterCatalog.basicInformation.categoryIdRequired)
    //     : null,
    [fetchFieldProperty("dbfield", "multipleCategoryId")]:
      displayFieldElement(fields, "multipleCategoryId") &&
        requiredFields.indexOf("multipleCategoryId") > -1
        ? Yup.array().min(1, ValidationMsgs.masterCatalog.basicInformation.categoryIdRequired).required(ValidationMsgs.masterCatalog.basicInformation.categoryIdRequired)
        : null,
    [fetchFieldProperty("dbfield", "description")]:
      displayFieldElement(fields, "description") &&
        requiredFields.indexOf("description") > -1
        ? Yup.string().trim().required(ValidationMsgs.masterCatalog.basicInformation.descriptionRequired)
        : null,
    [fetchFieldProperty("dbfield", "shortDescription")]:
      displayFieldElement(fields, "shortDescription") &&
        requiredFields.indexOf("shortDescription") > -1
        ? Yup.string().trim().required(ValidationMsgs.masterCatalog.basicInformation.shortDescriptionRequired)
        : null,
    // [fetchFieldProperty("dbfield", "dimensionTemplateId")]:
    //   displayFieldElement(fields, "dimensionTemplateId") &&
    //     requiredFields.indexOf("dimensionTemplateId") > -1
    //     ? Yup.string().trim().required(ValidationMsgs.masterCatalog.basicInformation.dimensionTemplateIdRequired)
    //     : null,
    // [fetchFieldProperty("dbfield", "width")]:
    //   displayFieldElement(fields, "width") &&
    //     requiredFields.indexOf("width") > -1
    //     ? Yup.string().trim().required(ValidationMsgs.masterCatalog.basicInformation.widthRequired)
    //     : null,
    // [fetchFieldProperty("dbfield", "height")]:
    //   displayFieldElement(fields, "height") &&
    //     requiredFields.indexOf("height") > -1
    //     ? Yup.string().trim().required(ValidationMsgs.masterCatalog.basicInformation.heightRequired)
    //     : null,
    // [fetchFieldProperty("dbfield", "length")]:
    //   displayFieldElement(fields, "length") &&
    //     requiredFields.indexOf("length") > -1
    //     ? Yup.string().trim().required(ValidationMsgs.masterCatalog.basicInformation.lengthRequired)
    //     : null,
    // [fetchFieldProperty("dbfield", "volume")]:
    //   displayFieldElement(fields, "volume") &&
    //     requiredFields.indexOf("volume") > -1
    //     ? Yup.string().trim().required(ValidationMsgs.masterCatalog.basicInformation.volumeRequired)
    //     : null,
    [fetchFieldProperty("dbfield", "weightInLBS")]:
      displayFieldElement(fields, "weightInLBS") &&
        requiredFields.indexOf("weightInLBS") > -1
        ? Yup.string().trim().required(ValidationMsgs.masterCatalog.basicInformation.weightInLBSRequired)
        : null,
    // [fetchFieldProperty("dbfield", "seName")]:
    //   displayFieldElement(fields, "seName") &&
    //     requiredFields.indexOf("seName") > -1
    //     ? Yup.string().trim().required(ValidationMsgs.masterCatalog.basicInformation.seNameRequired)
    //     : null,
    [fetchFieldProperty("dbfield", "shipWeightinLBS")]:
      displayFieldElement(fields, "shipWeightinLBS") &&
        requiredFields.indexOf("shipWeightinLBS") > -1
        ? Yup.string().trim().required(ValidationMsgs.masterCatalog.basicInformation.shipWeightinLBSRequired)
        : null,
    recStatus: Yup.string().trim().required(ValidationMsgs.common.productstatus),
  });

  const HandlePageRedirectURL = (fields) => {
    if (!fields.newUrl === "" && (fields.newUrl !== values?.newUrl)) {
      StoreProductService.redirectProduct({
        pageredirectmodel: {
          id: 0,
          rowVersion: "",
          oldUrl: values.seName === null ? "/" : values.seName,
          newUrl: fields.newUrl,
          storeId: anniesAnnualData.storeId,
          recStatus: RecStatusValuebyName.Active,
          ...location
        }
      })
        .then((response) => {
          if (response?.data?.success) {
            dispatch(
              setAlertMessage({
                type: "success",
                message: "",
              })
            );
            getProductData();
            if(!fields.isGiftCardProduct){
              getProductReadinessData();
            }
            clearCacheForBrandCategory(fields?.brandId, fields?.categoryId, fields?.storeId);
          } else {
            dispatch(
              setAlertMessage({ type: "danger", message: serverError(response) })
            );
          }
          // getValidationForAllFilledFieldsFunc();
          dispatch(setAddLoading(false));
        })
        .catch((errors) => {
          dispatch(
            setAlertMessage({
              type: "danger",
              message: "Not Updated",
            })
          );
          dispatch(setAddLoading(false))
        });
    }
  }

  const submitHandler = (fields, { resetForm }) => {
    dispatch(setAddLoading(true))

    fields = {
      ...fields,
      weightInLBS: (fields.weightInLBS && fields.weightInLBS !== '' ? fields.weightInLBS : 0),
      shipWeightinLBS: (fields.shipWeightinLBS && fields.shipWeightinLBS !== '' ? fields.shipWeightinLBS : 0),
    }
    window.scrollTo({ top: 0, left: 0 });
    let SubmitObj = type === productType.EcommerceStore ? {
      storeProductModel: { ...fields, ...location },
    } : {productModel: { ...fields, isBundle: true, ...location }}

    if (isAddMode) {
      API.createProduct(SubmitObj)
        .then((response) => {
          if (response.data.success) {
            dispatch(
              setAlertMessage({
                type: "success",
                message: ValidationMsgs.masterCatalog.basicInformation.created,
              })
            );
            if(!fields.isGiftCardProduct){
              getProductReadinessData();
            }
            resetForm({});
            navigate(type === productType.EcommerceStore ? `/admin/master/products/edit/${response.data.data.id}`
              : `/admin/master/products/bundle/edit/${response.data.data.id}`)
          } else {
            dispatch(
              setAlertMessage({ type: "danger", message: serverError(response) })
            );
          }
          dispatch(setAddLoading(false))
        })
        .catch((errors) => {
          dispatch(
            setAlertMessage({
              type: "danger",
              message: ValidationMsgs.masterCatalog.basicInformation.notCreated,
            })
          );
          dispatch(setAddLoading(false))

        });
    } else {
      API.updateProduct({ productBasicInfoModel: { ...fields, ...location } })
        .then((response) => {
          if (response?.data?.success) {
            dispatch(
              setAlertMessage({
                type: "success",
                message: ValidationMsgs.masterCatalog.basicInformation.updated,
              })
            );
            getProductData();
            if(!fields.isGiftCardProduct){
              getProductReadinessData();
            }
            if (fields.storeId >= 0) {
              HandlePageRedirectURL(fields);
            }
            clearCacheForBrandCategory(fields?.brandId, fields?.categoryId, fields?.storeId);
          } else {
            dispatch(
              setAlertMessage({ type: "danger", message: serverError(response) })
            );
          }
          dispatch(setAddLoading(false));
        })
        .catch((errors) => {
          dispatch(
            setAlertMessage({
              type: "danger",
              message: ValidationMsgs.masterCatalog.basicInformation.notUpdated,
            })
          );
          dispatch(setAddLoading(false))
        });
    }
  };

  useEffect(() => {
    setWishedToChangeTab(false)
  }, []);

  return (
    <>
      <Formik
        enableReinitialize={!isAddMode}
        initialValues={InitialData}
        validationSchema={schema}
        onSubmit={submitHandler}
        innerRef={formRef}
      // validateOnMount={true}
      // validateOnChange={true}
      >
        {({ errors, touched, setFieldValue, values, resetForm, setValues }) => {
          return (
            <>
              <FormikForm>
                {activeTab === 1 &&
                  <ErrorHandler setIsError={setIsError} activeTab={activeTab} errors={errors} checkProductStatus={checkProductStatus} />
                }
                <UnsavedFormHandler values={values} setsaveUnSavedFields={setsaveUnSavedFields} InitialData={InitialData} />
                <Field
                  type="hidden"
                  name="productstatus"
                  id="productstatus"
                />
                <div className="panel-01 tab-content p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 lg:space-x-6">
                    {/* Product Name Field Display */}
                    {displayFieldElement(fields, "name") && (
                      <>
                        <div className="w-full mb-6 last:mb-0">
                          <label className="text-xs font-semibold text-gray-500 uppercase mb-2">
                            {fetchFieldProperty("displayname", "name")}
                            {requiredFields.indexOf("name") >= 0 && (
                              <>
                                <span className="text-rose-500 text-2xl leading-none">
                                  *
                                </span>
                              </>
                            )}
                          </label>

                          <Input
                            type={"text"}
                            name={fetchFieldProperty("dbfield", "name")}
                            placeholder=""
                            id="name"
                            maxLength={200}
                            className={` bg-white`}
                            disabled={readOnly}
                          />
                        </div>
                      </>
                    )}

                    {/* Product SKU field display */}
                    {displayFieldElement(fields, "ourSKU") && (
                      <>
                        <div className="mb-6">
                          <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">
                            {fetchFieldProperty("displayname", "ourSKU")}
                            {requiredFields.indexOf("ourSKU") > -1 && (
                              <>
                                <span className="text-rose-500 text-2xl leading-none">
                                  *
                                </span>
                              </>
                            )}
                          </label>

                          <Input
                            type={"text"}
                            name={fetchFieldProperty("dbfield", `ourSKU`)}
                            placeholder=""
                            id="ourSKU"
                            maxLength={100}
                            className={`skublock w-full border border-neutral-200 hover:border-neutral-300 focus:border-neutral-300 focus:ring-0 focus:shadow-lg px-2 py-2 rounded-md ${values.isOurSkuEditable ? "bg-slate-200" : "bg-white"}`}
                            disabled={readOnly || values.isOurSkuEditable}
                          />
                        </div>
                      </>
                    )}
                  </div>

                  {/* SE Name */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 lg:space-x-6" >
                    <>
                      {!isAddMode && displayFieldElement(fields, "seName") && (
                        <>
                          <div className="mb-6">
                            <label className="text-xs font-semibold text-gray-500 uppercase mb-2">
                              {fetchFieldProperty("displayname", "seName")}
                            </label>

                            <Input
                              type={"text"}
                              name={fetchFieldProperty("dbfield", "seName")}
                              placeholder=""
                              id="seName"
                              onChange={(e) => {
                                let lowerSEName = e.target.value.toLowerCase();
                                const replacedSeName = lowerSEName.replace(/[&\/\#, +()$~%.'":|`_!@;^*?<>{}]/g, "-");
                                setFieldValue("seName", replacedSeName);
                              }}
                              min={4}
                              defaultValue={values.seName}
                              className={`appearance-none block w-full text-gray-700 border border-gray-200 ${values?.isSENameChanged === true ? "bg-slate-200" : ""} rounded p-4 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                              disabled={values?.isSENameChanged === true ? true : false}
                            />
                            <span className="text-rose-500 pb-5">{values.seName.length >= 4 ? "" : "SE Name must be greater than four characters"}</span>
                          </div>
                        </>
                      )}
                    </>

                    {/* is Gift Card Product Field Display */}
                    {displayFieldElement(fields, "isGiftCardProduct") && (
                      <>
                        <div className="w-full mb-6 last:mb-0">
                          <label className="text-xs font-semibold text-gray-500 uppercase mb-2">
                            {fetchFieldProperty("displayname", "isGiftCardProduct")}
                          </label>

                          <ToggleButton
                            name="isGiftCardProduct"
                            id="isGiftCardProduct"
                            onChange={(e) =>
                              setFieldValue(
                                "isGiftCardProduct",
                                e.target.checked ? true : false
                              )
                            }
                            defaultValue={values.isGiftCardProduct}
                          />
                        </div>
                      </>
                    )}
                  </div >

                  {/* Category single id only */}
                  {/* {[productType.MC, productType.GMC, productType.General, productType.Bundle].includes(type) && displayFieldElement(fields, "categoryId") && (
                    <>
                      <div className="w-full mb-6 last:mb-0">
                        <label className="text-xs font-semibold text-gray-500 uppercase mb-2">
                          {fetchFieldProperty("displayname", "categoryId")}
                          {requiredFields.indexOf("categoryId") >= 0 && (
                            <>
                              <span className="text-rose-500 text-2xl leading-none">
                                *
                              </span>
                            </>
                          )}
                        </label>

                        <Dropdown
                          label="category"
                          isMulti={false}
                          name={fetchFieldProperty("dbfield", "categoryId")}
                          options={CategoryList}
                          isSearchable={true}
                          defaultValue={values.categoryId}
                          isDisabled={readOnly}
                          onChange={(e) => {
                            setFieldValue("categoryId", e.value)
                            setFieldValue("categoryRootPath", e.label)
                          }}
                        />
                      </div>
                    </>
                  )} */}
                  {/* category multiple ids for Store Level (Ecommerce Store, Corporate Store, Store Builder, Form Builder) */}
                  {displayFieldElement(fields, "multipleCategoryId") && (
                    <>
                      <div className="w-full mb-6 last:mb-0">
                        <label className="text-xs font-semibold text-gray-500 uppercase mb-2">
                          {fetchFieldProperty("displayname", "multipleCategoryId")}
                          {requiredFields.indexOf("multipleCategoryId") >= 0 && (
                            <>
                              <span className="text-rose-500 text-2xl leading-none">
                                *
                              </span>
                            </>
                          )}
                        </label>

                        <Dropdown
                          label="category"
                          isMulti={true}
                          name={fetchFieldProperty("dbfield", "multipleCategoryId")}
                          options={CategoryList}
                          isSearchable={true}
                          defaultValue={values.multipleCategoryId}
                          isDisabled={readOnly}
                          onChange={(value, event) => {
                            if (value) {
                              let multipleCategoryIds = value.map((v) => isNaN(Number(v.value)) ? v.value : Number(v.value));
                              setFieldValue("multipleCategoryId", multipleCategoryIds);
                              setFieldValue("categoryId", multipleCategoryIds[0]);
                              if (value.length) {
                                setFieldValue("categoryRootPath", value[0].label)
                              }
                            }
                          }}
                        />
                      </div>
                    </>
                  )}
                  {/* } */}

                  {/* Product Product Tag Details field display */}
                  <>
                    {displayFieldElement(fields, "productTagDetails") && (
                      <>
                        <div className="w-full mb-6 last:mb-0">
                          <label className="text-xs font-semibold text-gray-500 uppercase mb-2">
                            {fetchFieldProperty("displayname", "productTagDetails")}
                            {requiredFields.indexOf("productTagDetails") > -1 && (
                              <>
                                <span className="text-rose-500 text-2xl leading-none">
                                  *
                                </span>
                              </>
                            )}
                          </label>
                          <Input
                            type={"text"}
                            name={fetchFieldProperty("dbfield", "productTagDetails")}
                            placeholder=""
                            id="productTagDetails"
                            maxLength={200}
                            className={` bg-white`}
                            disabled={readOnly}
                          />
                        </div>
                      </>
                    )}
                  </>

                  {/* Product Description field display */}
                  {
                    displayFieldElement(fields, "description") && (
                      <>
                        <div className="w-full mb-6 last:mb-0">
                          <label className="text-xs font-semibold text-gray-500 uppercase mb-2">
                            {fetchFieldProperty("displayname", "description")}
                            {requiredFields.indexOf("description") > -1 && (
                              <>
                                <span className="text-rose-500 text-2xl leading-none">
                                  *
                                </span>
                              </>
                            )}
                          </label>
                          <CKEditor
                            id="description"
                            name={fetchFieldProperty("dbfield", "description")}
                            defaultValue={values.description}
                            onChange={(value) => {
                              setFieldValue("description", value);
                            }}
                            readOnly={readOnly}
                            loading={descriptionData}
                          />
                        </div>
                      </>
                    )
                  }

                  {/* Product ShortDescription field display */}
                  <>
                    {displayFieldElement(fields, "shortDescription") && (
                      <>
                        <div className="w-full mb-6 last:mb-0">
                          <label className="text-xs font-semibold text-gray-500 uppercase mb-2">
                            {fetchFieldProperty("displayname", "shortDescription")}
                            {requiredFields.indexOf("shortDescription") > -1 && (
                              <>
                                <span className="text-rose-500 text-2xl leading-none">
                                  *
                                </span>
                              </>
                            )}
                          </label>
                          {/* <Artists /> */}
                          <CKEditor
                            id="shortDescription"
                            name={fetchFieldProperty("dbfield", "shortDescription")}
                            defaultValue={values?.shortDescription}
                            onChange={(value) => {
                              setFieldValue("shortDescription", value);
                            }}
                            readOnly={readOnly}
                            loading={shortDescriptionData}
                          />
                        </div>
                      </>
                    )}
                  </>

                  {/* Product Weight field display */}
                  {
                    displayFieldElement(fields, "weightInLBS") && (
                      <>
                        <div className="grid grid-cols-1 lg:grid-cols-2 lg:space-x-6">

                          <div className="mb-6">
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">
                              {fetchFieldProperty("displayname", "weightInLBS")}
                              {requiredFields.indexOf("weightInLBS") > -1 && (
                                <>
                                  <span className="text-rose-500 text-2xl leading-none">
                                    *
                                  </span>
                                </>
                              )}
                            </label>

                            <InputNumber
                              type={"text"}
                              name={fetchFieldProperty("dbfield", `weightInLBS`)}
                              placeholder=""
                              id="weightInLBS"
                              className={`appearance-none block w-full text-gray-700 border border-gray-200 rounded p-4 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                              disabled={readOnly}
                              maxLength={6}
                              onChange={(e) => {
                                setFieldValue('weightInLBS', e.target.value);
                              }}
                              defaultValue={values.weightInLBS}
                              value={values.weightInLBS}
                            />
                          </div>
                          <div className="mb-6">
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">
                              {fetchFieldProperty("displayname", "shipWeightinLBS")} (LBS)
                              {requiredFields.indexOf("shipWeightinLBS") > -1 && (
                                <>
                                  <span className="text-rose-500 text-2xl leading-none">*</span>
                                </>
                              )}
                            </label>

                            <InputNumber
                              type={"text"}
                              name={`shipWeightinLBS`}
                              placeholder=""
                              id="shipWeightinLBS"
                              className={`appearance-none block w-full text-gray-700 border border-gray-200 rounded p-4 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                              disabled={readOnly}
                              maxLength={6}
                              onChange={(e) => {
                                setFieldValue('shipWeightinLBS', e.target.value);
                              }}
                              defaultValue={values.shipWeightinLBS}
                              value={values.shipWeightinLBS}
                            />
                          </div>
                        </div>
                      </>
                    )
                  }
                </div>

              </FormikForm >
            </>
          );
        }}
      </Formik >
    </>
  );
};

export default BasicInformation;
