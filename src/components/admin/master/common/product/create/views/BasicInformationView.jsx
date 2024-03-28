/*Component Name: BasicInformation.jsx
Component Functional Details: Basic Information tab field display
Created By: Vikas Patel
Created Date: 11-May-2022
Modified By: Viks Patel
Modified Date: June/02/2022 */
import React, { useState, useEffect } from "react";
import { scrollTop } from "services/common/helper/Helper";
import { useParams } from "react-router-dom";
import { productType } from "dummy/Dummy";
import CategoryService from "services/admin/category/CategoryService";
import { anniesAnnualData } from "global/Enum";

const BasicInformationView = ({
  displayFieldElement,
  fetchFieldProperty,
  fields,
  values,
  requiredFields,
  tab,
  setActiveTab,
  index,
  type
}) => {

  // const [CategoryList, setCategoryList] = useState("");
  // const categoryDropDownAPI = ([productType.MC, productType.GMC].includes(type) ? CategoryService.getCategoryDropdownOptions : CategoryService.getStoreCategoryDropdownOptions);

  // useEffect(() => {
  //   categoryDropDownAPI(-1, anniesAnnualData.storeId)
  //     .then((response) => {
  //       if (response?.data?.data.length > 0 && response?.data?.success) {
  //         const CategoryName = response?.data?.data.find((CategoryData) => { return CategoryData?.value === values?.categoryId })
  //         setCategoryList(CategoryName?.label);
  //       }
  //     })
  // }, [values])

  return (
    <>
      <div className="px-6 py-12 border-b-4 border-neutral-200 last:border-b-0">
        <div className="flex items-center justify-between">
          <div className="block uppercase tracking-wide text-gray-500 text-base font-bold mb-2">
            {tab.label}
          </div>
          <div >
            <span
              className="text-indigo-500 cursor-pointer"
              onClick={() => {
                setActiveTab(index);
                scrollTop();
              }}
            >
              Edit
            </span>
          </div>
        </div>

        {/* Brand Field Display */}
        {displayFieldElement(fields, "brandName") && (
          <>
            <div className="mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center">
              <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
                {fetchFieldProperty("displayname", "brandName")}
                {requiredFields.indexOf("brandName") >= 0 && (
                  <>
                    <span className="text-rose-500 text-2xl leading-none">*</span>
                  </>
                )}
                :
              </label>
              <div className="col-span-2">{values?.brandName}</div>
            </div>
          </>
        )}

        {/* vendor Field Display */}
        {displayFieldElement(fields, "vendorName") && (
          <>
            <div className="mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center">
              <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
                {fetchFieldProperty("displayname", "vendorName")}
                {requiredFields.indexOf("vendorName") >= 0 && (
                  <>
                    <span className="text-rose-500 text-2xl leading-none">*</span>
                  </>
                )}
                :
              </label>
              <div className="col-span-2">{values.vendorName}</div>
            </div>
          </>
        )}

        {/* product name Field Display */}
        {displayFieldElement(fields, "name") && (
          <>
            <div className="mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center">
              <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
                {fetchFieldProperty("displayname", "name")}
                {requiredFields.indexOf("name") >= 0 && (
                  <>
                    <span className="text-rose-500 text-2xl leading-none">*</span>
                  </>
                )}
                :
              </label>
              <div className="col-span-2">{values?.name}</div>
            </div>
          </>
        )}

        {/* Google feed name Field Display */}
        {displayFieldElement(fields, "googlefeedname") && (
          <>
            <div className="mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center">
              <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
                {fetchFieldProperty("displayname", "googlefeedname")}
                {requiredFields.indexOf("googlefeedname") >= 0 && (
                  <>
                    <span className="text-rose-500 text-2xl leading-none">*</span>
                  </>
                )}
                :
              </label>
              <div className="col-span-2">{values?.googlefeedname}</div>
            </div>
          </>
        )}

        {/* SEName  Field Display */}
        {displayFieldElement(fields, "seName") && (
          <>
            <div className="mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center">
              <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
                {fetchFieldProperty("displayname", "seName")}
                {/* {requiredFields.indexOf("seName") >= 0 && (
                  <>
                    <span className="text-rose-500 text-2xl leading-none">*</span>
                  </>
                )} */}
                :
              </label>
              <div className="col-span-2">{values?.seName}</div>
            </div>
          </>
        )}

        {/* is Gift Card Product  Field Display */}
        {displayFieldElement(fields, "isGiftCardProduct") && (
          <>
            <div className="mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center">
              <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
                {fetchFieldProperty("displayname", "isGiftCardProduct")}
                :
              </label>
              <div className="col-span-2">{values?.isGiftCardProduct === true ? "Yes" : "No"}</div>
            </div>
          </>
        )}

        {/* ERP Name  Field Display */}
        {displayFieldElement(fields, "nameInERP") && (
          <>
            <div className="mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center">
              <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
                {fetchFieldProperty("displayname", "nameInERP")}
                {requiredFields.indexOf("nameInERP") >= 0 && (
                  <>
                    {/* <span className="text-rose-500 text-2xl leading-none">*</span> */}
                  </>
                )}
                :
              </label>
              <div className="col-span-2">{values.nameInERP}</div>
            </div>
          </>
        )}

        {/* ERP Nav Item ID  Field Display */}
        {displayFieldElement(fields, "erpItemId") && (
          <>
            <div className="mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center">
              <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
                {fetchFieldProperty("displayname", "erpItemId")}
                {requiredFields.indexOf("erpItemId") >= 0 && (
                  <>
                    <span className="text-rose-500 text-2xl leading-none">*</span>
                  </>
                )}
                :
              </label>
              <div className="col-span-2">{values?.erpItemId ? values?.erpItemId : ''}</div>
            </div>
          </>
        )}

        {/* Vendor SKU  Item ID  Field Display */}
        {displayFieldElement(fields, "vendorSKU") && (
          <>
            <div className="mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center">
              <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
                {fetchFieldProperty("displayname", "vendorSKU")}
                {requiredFields.indexOf("vendorSKU") >= 0 && (
                  <>
                    <span className="text-rose-500 text-2xl leading-none">*</span>
                  </>
                )}
                :
              </label>
              <div className="col-span-2">{values.vendorSKU}</div>
            </div>
          </>
        )}

        {/* Our SKU  Item ID  Field Display */}
        {displayFieldElement(fields, "ourSKU") && (
          <>
            <div className="mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center">
              <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
                {fetchFieldProperty("displayname", "ourSKU")}
                {requiredFields.indexOf("ourSKU") >= 0 && (
                  <>
                    <span className="text-rose-500 text-2xl leading-none">*</span>
                  </>
                )}
                :
              </label>
              <div className="col-span-2">{values.ourSKU}</div>
            </div>
          </>
        )}

        {/* Ecom Safety Qty  Field Display */}
        {displayFieldElement(fields, "ecom_safety_qty") && (
          <>
            <div className="mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center">
              <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
                {fetchFieldProperty("displayname", "ecom_safety_qty")}
                {requiredFields.indexOf("ecom_safety_qty") >= 0 && (
                  <>
                    <span className="text-rose-500 text-2xl leading-none">*</span>
                  </>
                )}
                :
              </label>
              <div className="col-span-2">{values.ecom_safety_qty}</div>
            </div>
          </>
        )}

        {/* Product Type  Field Display */}
        {displayFieldElement(fields, "productTypeName") && (
          <>
            <div className="mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center">
              <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
                {fetchFieldProperty("displayname", "productTypeName")}
                {requiredFields.indexOf("productTypeName") >= 0 && (
                  <>
                    <span className="text-rose-500 text-2xl leading-none">*</span>
                  </>
                )}
                :
              </label>
              <div className="col-span-2">{values.productTypeName}</div>
            </div>
          </>
        )}

        {/* Product Sub Type  Field Display */}
        {displayFieldElement(fields, "product_sub_type") && (
          <>
            <div className="mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center">
              <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
                {fetchFieldProperty("displayname", "product_sub_type")}
                {requiredFields.indexOf("product_sub_type") >= 0 && (
                  <>
                    <span className="text-rose-500 text-2xl leading-none">*</span>
                  </>
                )}
                :
              </label>
              <div className="col-span-2">{values.product_sub_type}</div>
            </div>
          </>
        )}

        {/* Companion Product  Field Display */}
        {displayFieldElement(fields, "companionProduct") && (
          <>
            <div className="mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center">
              <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
                {fetchFieldProperty("displayname", "companionProduct")}
                {requiredFields.indexOf("companionProduct") >= 0 && (
                  <>
                    <span className="text-rose-500 text-2xl leading-none">*</span>
                  </>
                )}
                :
              </label>
              <div className="col-span-2">{values.companionProduct}</div>
            </div>
          </>
        )}

        {/* GTIN Field Display */}
        {displayFieldElement(fields, "gtin") && (
          <>
            <div className="mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center">
              <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
                {fetchFieldProperty("displayname", "gtin")}
                {requiredFields.indexOf("gtin") >= 0 && (
                  <>
                    <span className="text-rose-500 text-2xl leading-none">*</span>
                  </>
                )}
                :
              </label>
              <div className="col-span-2">{values.gtin}</div>
            </div>
          </>
        )}

        {/* Inventory Field Display */}
        {displayFieldElement(fields, "inventory") && (
          <>
            <div className="mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center">
              <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
                {fetchFieldProperty("displayname", "inventory")}
                {requiredFields.indexOf("inventory") >= 0 && (
                  <>
                    <span className="text-rose-500 text-2xl leading-none">*</span>
                  </>
                )}
                :
              </label>
              <div className="col-span-2">{values.inventory}</div>
            </div>
          </>
        )}

        {/* High Inventory Value Field Display */}
        {displayFieldElement(fields, "high_inventory_value") && (
          <>
            <div className="mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center">
              <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
                {fetchFieldProperty("displayname", "high_inventory_value")}
                {requiredFields.indexOf("high_inventory_value") >= 0 && (
                  <>
                    <span className="text-rose-500 text-2xl leading-none">*</span>
                  </>
                )}
                :
              </label>
              <div className="col-span-2">{values.high_inventory_value}</div>
            </div>
          </>
        )}

        {/* Low Inventory Field Display */}
        {displayFieldElement(fields, "low_inventory") && (
          <>
            <div className="mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center">
              <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
                {fetchFieldProperty("displayname", "low_inventory")}
                {requiredFields.indexOf("low_inventory") >= 0 && (
                  <>
                    <span className="text-rose-500 text-2xl leading-none">*</span>
                  </>
                )}
                :
              </label>
              <div className="col-span-2">{values.low_inventory}</div>
            </div>
          </>
        )}

        {/* Size Field Display */}
        {displayFieldElement(fields, "size") && (
          <>
            <div className="mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center">
              <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
                {fetchFieldProperty("displayname", "size")}
                {requiredFields.indexOf("size") >= 0 && (
                  <>
                    <span className="text-rose-500 text-2xl leading-none">*</span>
                  </>
                )}
                :
              </label>
              <div className="col-span-2">{values.size}</div>
            </div>
          </>
        )}

        {/* Tax Code Field Display */}
        {displayFieldElement(fields, "taxCode") && (
          <>
            <div className="mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center">
              <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
                {fetchFieldProperty("displayname", "taxCode")}
                {requiredFields.indexOf("taxCode") >= 0 && (
                  <>
                    <span className="text-rose-500 text-2xl leading-none">*</span>
                  </>
                )}
                :
              </label>
              <div className="col-span-2">{values.taxCode}</div>
            </div>
          </>
        )}

        {/* Category Field Display */}
        {/* {displayFieldElement(fields, "categoryId") && (
          <>
            <div className="mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center">
              <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
                {fetchFieldProperty("displayname", "categoryId")}
                {requiredFields.indexOf("categoryId") >= 0 && (
                  <>
                    <span className="text-rose-500 text-2xl leading-none">*</span>
                  </>
                )}
                :
              </label>
              <div className="col-span-2">{CategoryList}</div>
            </div>
          </>
        )} */}

        {/* New URl Field Display */}
        {displayFieldElement(fields, "newUrl") && (
          <>
            <div className="mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center">
              <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
                {fetchFieldProperty("displayname", "newUrl")}
                {requiredFields.indexOf("newUrl") >= 0 && (
                  <>
                    <span className="text-rose-500 text-2xl leading-none"></span>
                  </>
                )}
                :
              </label>
              <div className="col-span-2">{values.newUrl}</div>
            </div>
          </>
        )}

        {/* Tax Class Field Display */}
        {displayFieldElement(fields, "tax_class") && (
          <>
            <div className="mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center">
              <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
                {fetchFieldProperty("displayname", "tax_class")}
                {requiredFields.indexOf("tax_class") >= 0 && (
                  <>
                    <span className="text-rose-500 text-2xl leading-none">*</span>
                  </>
                )}
                :
              </label>
              <div className="col-span-2">{values?.tax_class}</div>
            </div>
          </>
        )}

        {/* Description Field Display */}
        {displayFieldElement(fields, "description") && <>
          <div className='mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center'>
            <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
              {fetchFieldProperty("displayname", "description")}
              {requiredFields.indexOf("description") >= 0 && <><span className="text-rose-500 text-2xl leading-none">*</span></>} : </label>
            <div className="col-span-2" dangerouslySetInnerHTML={{ __html: values?.description }}></div>
          </div>
        </>
        }

        {/* Short Description Field Display */}
        {displayFieldElement(fields, "shortDescription") && <>
          <div className='mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center'>
            <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
              {fetchFieldProperty("displayname", "shortDescription")}
              {requiredFields.indexOf("shortDescription") >= 0 && <><span className="text-rose-500 text-2xl leading-none">*</span></>} : </label>
            <div className="col-span-2" dangerouslySetInnerHTML={{ __html: values.shortDescription }}></div>
          </div>
        </>}

        {/* List Page Short Description*/}
        {displayFieldElement(fields, "listPageShortDescription") && <>
          <div className='mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center'>
            <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
              {fetchFieldProperty("displayname", "listPageShortDescription")}
              {requiredFields.indexOf("listPageShortDescription") >= 0 && <><span className="text-rose-500 text-2xl leading-none">*</span></>} : </label>
            <div className="col-span-2" dangerouslySetInnerHTML={{ __html: values.listPageShortDescription }}></div>
          </div>
        </>}

        {/* Product Specification*/}
        {displayFieldElement(fields, "productSpecification") && <>
          <div className='mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center'>
            <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
              {fetchFieldProperty("displayname", "productSpecification")}
              {requiredFields.indexOf("productSpecification") >= 0 && <><span className="text-rose-500 text-2xl leading-none">*</span></>} : </label>
            <div className="col-span-2" dangerouslySetInnerHTML={{ __html: values.productSpecification }}></div>
          </div>
        </>}

        {/* Product Features*/}
        {displayFieldElement(fields, "productFeatures") && <>
          <div className='mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center'>
            <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
              {fetchFieldProperty("displayname", "productFeatures")}
              {requiredFields.indexOf("productFeatures") >= 0 && <><span className="text-rose-500 text-2xl leading-none">*</span></>} : </label>
            <div className="col-span-2" dangerouslySetInnerHTML={{ __html: values.productFeatures }}></div>
          </div>
        </>}

        {/* How To Use*/}
        {displayFieldElement(fields, "howToUse") && <>
          <div className='mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center'>
            <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
              {fetchFieldProperty("displayname", "howToUse")}
              {requiredFields.indexOf("howToUse") >= 0 && <><span className="text-rose-500 text-2xl leading-none">*</span></>} : </label>
            <div className="col-span-2" dangerouslySetInnerHTML={{ __html: values.howToUse }}></div>
          </div>
        </>}
        {/* Weight Type Field Display */}
        {displayFieldElement(fields, "weight_type") && (
          <>
            <div className="mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center">
              <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
                {fetchFieldProperty("displayname", "weight_type")}
                {requiredFields.indexOf("weight_type") >= 0 && (
                  <>
                    <span className="text-rose-500 text-2xl leading-none">*</span>
                  </>
                )}
                :
              </label>
              <div className="col-span-2">{values?.weight_type}</div>
            </div>
          </>
        )}

        {/* Weight Field Display */}
        {displayFieldElement(fields, "weightInLBS") && (
          <>
            <div className="mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center">
              <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
                {fetchFieldProperty("displayname", "weightInLBS")}
                {requiredFields.indexOf("weightInLBS") >= 0 && (
                  <>
                    <span className="text-rose-500 text-2xl leading-none">*</span>
                  </>
                )}
                :
              </label>
              <div className="col-span-2">{values.weightInLBS}</div>
            </div>
          </>
        )}

        {/* Ship Weight Field Display */}
        {displayFieldElement(fields, "shipWeightinLBS") && (
          <>
            <div className="mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center">
              <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
                {fetchFieldProperty("displayname", "shipWeightinLBS")}
                {requiredFields.indexOf("shipWeightinLBS") >= 0 && (
                  <>
                    <span className="text-rose-500 text-2xl leading-none">*</span>
                  </>
                )}
                :
              </label>
              <div className="col-span-2">{values.shipWeightinLBS}</div>
            </div>
          </>
        )}

        {/* Volume Field Display */}
        {displayFieldElement(fields, "volume") && (
          <>
            <div className="mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center">
              <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
                {fetchFieldProperty("displayname", "volume")}
                {requiredFields.indexOf("volume") >= 0 && (
                  <>
                    <span className="text-rose-500 text-2xl leading-none">*</span>
                  </>
                )}
                :
              </label>
              <div className="col-span-2">{values.volume}</div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default BasicInformationView;
