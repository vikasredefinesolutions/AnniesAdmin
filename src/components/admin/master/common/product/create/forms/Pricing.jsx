import React, { useRef, useEffect, useState, useCallback } from "react";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { serverError } from "services/common/helper/Helper";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { productType } from "dummy/Dummy";
import MasterProductService from "services/admin/master/master/products/ProductService";
import GrandMasterProductService from "services/admin/master/grandMaster/products/ProductService";
import StoreProductService from "services/admin/master/store/product/ProductService";
import BundleProductService from "services/admin/master/store/bundle/ProductService";
import InputNumber from "components/common/formComponent/InputNumber";
import Checkbox from "components/common/formComponent/Checkbox";
import { ValidationMsgs } from "global/ValidationMessages";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import UnsavedFormHandler from "./UnsavedFormHandler";
import { CurrencySymbolByCode, anniesAnnualData } from "global/Enum";
import DiscountDetailsService from "services/admin/quantityDiscount/DiscountDetailsService";
import Dropdown from "components/common/formComponent/Dropdown";
import OptionConfirmationModal from "./attributes/OptionConfirmationModal";

const Pricing = ({
  values,
  setFormSubmit,
  activeTab,
  type,
  index,
  productstatusVal,
  getProductData,
  readOnly,
  getProductReadinessData,
  setsaveUnSavedFields,
  setWishedToChangeTab,
  clearCacheForBrandCategory,
  ourTotalCost,
  checkProductStatus,
  displayFieldElement,
  fetchFieldProperty,
  fields,
}) => {
  const { id: CurrentId, sid } = useParams();
  const dispatch = useDispatch();
  const permission = useSelector((store) => store.permission);
  const location = useSelector((store) => store?.location);
  const [quantityOptions, setQuantityOptions] = useState([]);
  let [quantityId, setQuantityId] = useState(null);
  const [discountData, setDiscountData] = useState([]);
  const [OpenConfirmationModal, setOpenConfirmationModal] = useState(false);
  const navigate = useNavigate();

  const schema = Yup.object().shape({
    ourCost: Yup.number()
      .required(ValidationMsgs.masterCatalog.pricing.ourCostRequired)
      .min(0, ValidationMsgs.masterCatalog.pricing.ourCostRequired)
      .max(
        Yup.ref("msrp"),
        ValidationMsgs.masterCatalog.pricing.outCostlessThanMSRP
      ),
    msrp: Yup.number()
      .required(ValidationMsgs.masterCatalog.pricing.msrpRequired)
      .min(0, ValidationMsgs.masterCatalog.pricing.msrpRequired),
    // imap: Yup.number()
    //   .when("isEnableMAP", {
    //     is: true, // alternatively: (val) => val === true
    //     then: Yup.number()
    //       .required(ValidationMsgs.masterCatalog.pricing.imapRequired)
    //       .min(0.1, ValidationMsgs.masterCatalog.pricing.imapRequired),
    //   })
    //   .max(
    //     Yup.ref("msrp"),
    //     ValidationMsgs.masterCatalog.pricing.imaplessThanMSRP
    //   ),
    salePrice: Yup.number()
      .required(ValidationMsgs.masterCatalog.pricing.salePriceRequired)
      .min(0, ValidationMsgs.masterCatalog.pricing.salePriceRequired)
      .max(
        Yup.ref("msrp"),
        ValidationMsgs.masterCatalog.pricing.salesLassThenMSRP
      ),
    giftWrapPrice: Yup.number().when("isGiftWrap", {
      is: true, // alternatively: (val) => val === true
      then: Yup.number()
        .required(ValidationMsgs.masterCatalog.pricing.giftWrapRequired)
        .min(0.1, ValidationMsgs.masterCatalog.pricing.giftWrapRequired),
    }),
  });

  const formRef = useRef();
  const API =
    type === productType.MC
      ? MasterProductService
      : type === productType.GMC
        ? GrandMasterProductService
        : [productType.CorporateStore, productType.EcommerceStore].includes(type)
          ? StoreProductService
          : BundleProductService;

  const submitHandler = (fields, { resetForm }) => {
    dispatch(setAddLoading(true));

    const { quantityDiscountTemplate, ...allFields } = fields;
    const { browser, ...AllLocation } = location;
    API.updateProductPricing({
      productPriceModel: {
        id: CurrentId ? Number(CurrentId) : Number(sid),
        recStatus: values?.recStatus || productstatusVal,
        rowVersion: values?.rowVersion || "",
        ...allFields,
        quantityDiscountTemplate,
        ...AllLocation,
      },
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.masterCatalog.pricing.updated,
            })
          );
          getProductData();
          getProductReadinessData();
          clearCacheForBrandCategory();
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
            message: ValidationMsgs.masterCatalog.pricing.notUpdated,
          })
        );
        dispatch(setAddLoading(false));
      });
  };

  const getDiscountsDetails = useCallback(() => {
    if (quantityId) {
      DiscountDetailsService.getDiscountsDetail(quantityId, {
        pageIndex: 0,
        pageSize: 100,
        pagingStrategy: 0,
        sortingOptions: [
          {
            field: "modifiedDate",
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
      })
        .then((response) => {
          if (response.data.success) {
            setDiscountData(response.data.data.items);
          }
        })
        .catch((err) => { });
    } else {
      setDiscountData([]);
    }
  }, [quantityId]);

  const InitialData = {
    ourCost:
      ourTotalCost && ourTotalCost.current
        ? ourTotalCost.current
        : values?.ourCost || "",
    msrp: values?.msrp || "",
    imap: values?.imap || "0.00",
    salePrice: values?.salePrice || "",
    giftWrapPrice: 0,
    isGiftWrap: false,
    callForPrice: values?.callForPrice || false,
    isEnableMAP: values?.isEnableMAP || false,
    quantityDiscountTemplate: values?.quantityDiscountTemplate || 0,
  };

  const handleVariantOption = (data) => {
    navigate("/admin/master/Configuration/Quantitydiscount/create");
    setOpenConfirmationModal(false);
  };

  useEffect(() => {
    getDiscountsDetails();
  }, [quantityId, getDiscountsDetails]);

  useEffect(() => {
    setQuantityId(values.quantityDiscountTemplate);
  }, [values]);

  useEffect(() => {
    setWishedToChangeTab(false);
  }, []);

  useEffect(() => {
    DiscountDetailsService.getQuantityDiscountByBrandandVendorDropdown(
      anniesAnnualData.brandId,
      anniesAnnualData.vendorId,
      anniesAnnualData.storeId
    ).then((response) => {
      setQuantityOptions(() => {
        return response?.data?.data;
      });
    });
  }, []);

  useEffect(() => {
    if (activeTab === index) {
      setFormSubmit(formRef.current);
    }
  }, [formRef, setFormSubmit, activeTab]);

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={InitialData}
        onSubmit={submitHandler}
        validationSchema={schema}
        innerRef={formRef}
      >
        {({ errors, setFieldValue, values }) => {
          checkProductStatus(errors);
          return (
            <FormikForm>
              <UnsavedFormHandler
                values={values}
                setsaveUnSavedFields={setsaveUnSavedFields}
                InitialData={InitialData}
              />

              <div
                x-show="activeTab === 02"
                className="panel-02 tab-content p-6"
              >
                {/* <!-- pricing start -->  */}
                <div className="pt-6">
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="w-64">
                      <div className="text-xs font-semibold text-gray-500 uppercase mb-2">
                        MSRP
                        <span className="text-rose-500 text-2xl leading-none">
                          *
                        </span>
                      </div>
                      <div className="relative grow">
                        <div className="absolute w-10 h-12 mt-0 left-0 top-0 flex items-center justify-center">
                          <span className="material-icons-outlined">
                            attach_money
                          </span>
                        </div>
                        <InputNumber
                          displayError={false}
                          disabled={readOnly}
                          name="msrp"
                          defaultValue={values.msrp}
                          value={values.msrp}
                          placeholder="0.00"
                          className="appearance-none block w-full text-gray-700 border border-gray-200 rounded p-4 py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white pl-10"
                          onChange={(e) => {
                            setFieldValue(e.target.name, e.target.value);
                          }}
                          maxLength={10}
                          allowNegative={false}
                        />
                        <div className="text-rose-600">{errors.msrp}</div>
                      </div>
                    </div>
                    <div className="w-64">
                      <div className="text-xs font-semibold text-gray-500 uppercase mb-2">
                        Our Cost
                        <span className="text-rose-500 text-2xl leading-none">
                          *
                        </span>
                      </div>
                      <div className="relative grow">
                        <div className="absolute w-10 h-12 mt-0 left-0 top-0 flex items-center justify-center">
                          <span className="material-icons-outlined">
                            attach_money
                          </span>
                        </div>
                        <InputNumber
                          displayError={false}
                          type="text"
                          disabled={
                            ourTotalCost && ourTotalCost.current
                              ? true
                              : readOnly
                          }
                          value={
                            ourTotalCost && ourTotalCost.current
                              ? ourTotalCost.current > 0 ? parseFloat(ourTotalCost.current).toFixed(2) : ourTotalCost.current
                              : values.ourCost > 0 ? parseFloat(values.ourCost).toFixed(2) : values.ourCost
                          }
                          name="ourCost"
                          placeholder="0.00"
                          className="appearance-none block w-full text-gray-700 border border-gray-200 rounded p-4 py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white pl-10"
                          onChange={(e) => {
                            setFieldValue(e.target.name, e.target.value);
                          }}
                          maxLength={10}
                          allowNegative={false}
                        />
                        <div className="text-rose-600">{errors.ourCost}</div>
                      </div>
                    </div>

                    {/* <div className="w-64">
                      <div className="text-xs font-semibold text-gray-500 uppercase mb-2">
                        IMAP
                        <span className="text-rose-500 text-2xl leading-none"></span>
                      </div>
                      <div className="relative grow">
                        <div className="absolute w-10 h-12 mt-0 left-0 top-0 flex items-center justify-center">
                          <span className="material-icons-outlined">
                            attach_money
                          </span>
                        </div>
                        <InputNumber
                          displayError={false}
                          disabled={readOnly}
                          name="imap"
                          defaultValue={values.imap}
                          value={values.imap}
                          placeholder="0.00"
                          className="appearance-none block w-full text-gray-700 border border-gray-200 rounded p-4 py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white pl-10"
                          onChange={(e) => {
                            if (e.target.value) {
                              setFieldValue(e.target.name, e.target.value);
                            } else {
                              setFieldValue(e.target.name, 0);
                            }
                          }}
                          maxLength={10}
                          allowNegative={false}
                        />
                        <div className="text-rose-600">{errors.imap}</div>
                      </div>
                    </div> */}
                    <div className="w-64">
                      <div className="text-xs font-semibold text-gray-500 uppercase mb-2">
                        Sale Price
                        <span className="text-rose-500 text-2xl leading-none">
                          *
                        </span>
                      </div>
                      <div className="relative grow">
                        <div className="absolute w-10 h-12 mt-0 left-0 top-0 flex items-center justify-center">
                          <span className="material-icons-outlined">
                            attach_money
                          </span>
                        </div>
                        <InputNumber
                          displayError={false}
                          disabled={readOnly}
                          defaultValue={values.salePrice}
                          value={values.salePrice}
                          name="salePrice"
                          placeholder="0.00"
                          className="appearance-none block w-full text-gray-700 border border-gray-200 rounded p-4 py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white pl-10"
                          onChange={(e) => {
                            setFieldValue("salePrice", e.target.value);
                          }}
                          maxLength={10}
                          allowNegative={false}
                        />
                        <div className="text-rose-600">{errors.salePrice}</div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-6 last:mb-0">
                    <div className="text-gray-500 inline-flex items-center">
                      <Checkbox
                        type="checkbox"
                        className="form-checkbox"
                        disabled={readOnly}
                        name={"callForPrice"}
                        checked={values.callForPrice}
                        onChange={(e) => {
                          setFieldValue("callForPrice", e.target.checked);
                        }}
                      />
                      <span className="ml-2">Call for Price</span>
                    </div>
                  </div>
                  <div className="mb-6 last:mb-0">
                    <label className="text-gray-500 inline-flex items-center">
                      <Checkbox
                        type="checkbox"
                        className="form-checkbox"
                        name={"isEnableMAP"}
                        disabled={readOnly}
                        checked={values.isEnableMAP}
                        onChange={(e) => {
                          setFieldValue(`isEnableMAP`, e.target.checked);
                        }}
                      />
                      <span className="ml-2">
                        Enable (IMAP) Minimum Advertised Price
                      </span>
                    </label>
                  </div>

                  {displayFieldElement(fields, "quantityDiscountTemplate") && (
                    <>
                      <div className="w-full">
                        <div className="block text-xs font-semibold text-gray-500 uppercase">
                          {fetchFieldProperty(
                            "displayname",
                            "quantityDiscountTemplate"
                          )}
                        </div>
                        <div className="flex pt-5">
                          <div className="flex grow">
                            <Dropdown
                              isMulti={false}
                              name={fetchFieldProperty(
                                "dbfield",
                                "quantityDiscountTemplate"
                              )}
                              options={quantityOptions}
                              isSearchable={true}
                              defaultValue={values?.quantityDiscountTemplate}
                              onChange={(data) => {
                                setQuantityId(data?.value);
                                if (data) {
                                  setFieldValue(
                                    "quantityDiscountTemplate",
                                    data.value
                                  );
                                } else {
                                  setFieldValue("quantityDiscountTemplate", 0);
                                }
                              }}
                              isDisabled={readOnly}
                              className="w-full pr-3"
                            />
                          </div>
                          {(permission?.isEdit || permission?.isDelete) && (
                            <div>
                              {/* <AddButton data={values} name={ProductName} /> */}
                              <button
                                type="button"
                                className="btn border-indigo-300 hover:border-indigo-400 text-indigo-500"
                                onClick={() => setOpenConfirmationModal(true)}
                              >
                                <span>Add Quantity Discount</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-5">
                        <div>
                          {discountData.length > 0 && (
                            <table className="table-auto w-full text-sm text-[#191919] font-semibold">
                              <thead className="text-sm font-bold uppercase text-[#b3b3b3] border-b border-neutral-200 border-t">
                                <tr>
                                  <th className="px-2 first:pl-5 py-4">
                                    <div className="font-semibold text-left max-w-max flex items-center">
                                      <span>Low Quantity</span>
                                    </div>
                                  </th>
                                  <th className="px-2 first:pl-5 py-4">
                                    <div className="font-semibold text-left max-w-max flex items-center">
                                      <span>High Quantity</span>
                                    </div>
                                  </th>
                                  <th className="px-2 first:pl-5 py-4">
                                    <div className="font-semibold text-left flex items-center">
                                      <span>Discount Percent</span>
                                    </div>
                                  </th>
                                  <th className="px-2 first:pl-5 py-4">
                                    <div className="font-semibold text-left flex items-center">
                                      <span>Discount Amount</span>
                                    </div>
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-200">
                                {discountData.map((values, index) => {
                                  return (
                                    <tr key={index}>
                                      <td className="px-2 first:pl-5 py-3">
                                        {values?.lowQuantity}
                                      </td>
                                      <td className="px-2 first:pl-5 py-3">
                                        {values?.highQuantity}
                                      </td>
                                      <td className="px-2 first:pl-5 py-3">
                                        {values?.discountPercent}%
                                      </td>
                                      <td className="px-2 first:pl-5 py-3">
                                        {CurrencySymbolByCode.USD + values?.discountAmount}
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </FormikForm>
          );
        }}
      </Formik>

      {OptionConfirmationModal && (
        <OptionConfirmationModal
          handleConfirmation={handleVariantOption}
          setOpenModal={setOpenConfirmationModal}
          openModal={OpenConfirmationModal}
          message={
            "This will Redirect to Add Quantity DIscount.Do you want to continue?"
          }
          displayOkButton={true}
        />
      )}
    </>
  );
};

export default Pricing;
