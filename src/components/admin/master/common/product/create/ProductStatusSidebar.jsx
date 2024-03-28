/*Component Name: ProductStatusSidebar.jsx
Component Functional Details: User can create or update Untitled-1 master details from here.
Created By: <Your Name>
Created Date: <Creation Date>
Modified By: chandan
Modified Date: 13-06-2022 */

import React, { useState } from "react";
import { productType } from "dummy/Dummy";
import { useLocation } from "react-router-dom";
import ProductStatus from "./ProductStatus";
import StatusDetailsTile from "components/common/productTiles/StatusDetailTile";
import ProgressDetailsTile from "components/common/productTiles/ProgressDetailTile";
import { ProductStatusMoreFilterOption, RecStatusValuebyName } from "global/Enum";
import Select from "components/common/formComponent/Select";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useCallback } from "react";
import ProductService from "services/admin/master/grandMaster/products/ProductService";
import { useDispatch } from "react-redux";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { MenuNameReturner, DateTimeFormat, serverError } from "services/common/helper/Helper";
import { ValidationMsgs } from "global/ValidationMessages";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import MasterCatalogCommonService from "services/admin/master/masterCommonService";

const ProductStatusSidebar = ({
  displayFieldElement,
  fetchFieldProperty,
  fields,
  ProReadinessData,
  SEOReadinessData,
  type,
  data,
  statusError,
  updateProductStatus,
  setProductStatusVal,
  productstatusVal,
  isAddMode,
  getProductData,
  store = {},
  updateSingleField,
}) => {
  const permission = useSelector(store => store.permission);
  const { pathname } = useLocation();
  const AdminAppConfigReducers = useSelector(
    (store) => store?.AdminAppConfigReducers
  );

  const MenuListByUserRoleReducers = useSelector(
    (store) => store?.MenuListByUserRoleReducers
  );

  const [RecStatusDisabled, setRecStatusDisabled] = useState();
  const [ProductStatusValue, setProductStatusValue] = useState(0);
  const [SEOStatusValue, setSEOStatusValue] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    setRecStatusDisabled(([productType.EcommerceStore, productType.CorporateStore].includes(type) ? (!ProReadinessData.readyToPublish && !SEOReadinessData.readyToPublish ? true : false) : isAddMode))
    setProductStatusValue(ProReadinessData?.data?.data?.totalPercentageMatched)

    setSEOStatusValue(SEOReadinessData.totalPercentageMatched)

  }, [ProReadinessData, SEOReadinessData, data])

  const cloneProductToMaster = useCallback(() => {
    let ClonePageTitle = MenuNameReturner(MenuListByUserRoleReducers, "codeName", "MC")[0]?.name

    ProductService.cloneProduct([data.id]).then((response) => {
      if (response.data.success) {
        dispatch(
          setAlertMessage({
            type: "success",
            message: ValidationMsgs.product.cloned + " " + ClonePageTitle + ".",
          })
        );
        getProductData();
      } else {
        dispatch(setAlertMessage({ type: "danger", message: serverError(response) }));
      }
    })
      .catch((errors) => {
        dispatch(
          setAlertMessage({
            type: "danger",
            message: ValidationMsgs.product.notCloned,
          })
        );
      });
  }, [data.id]);

  const handleToggleProductStatus = (e) => {

    const TypeCheck = pathname ? pathname.toLowerCase().includes("storebuilder") : false

    if (data?.id && e?.value === 'A') {
      dispatch(setAddLoading(true));
      MasterCatalogCommonService.validateProduct(data?.id, TypeCheck === true ? productType.StoreBuilderStoreType : type)
        .then((response) => {
          if (response?.data?.data?.length > 0 && response?.data?.otherData) {
            dispatch(setAlertMessage({
              type: 'danger',
              message: serverError({ data: { errors: response?.data?.otherData } })
            }))
          } else {
            if (ProReadinessData?.data?.data?.readyToPublish === true || store?.isProductReadinessAllow === false) {
              setProductStatusVal(e.value);
              updateSingleField(e.value);
            } else {
              if (data.isGiftCardProduct !== undefined && !data.isGiftCardProduct){
                dispatch(setAlertMessage({ type: "danger", message: serverError(ProReadinessData) }));
              } else {
                setProductStatusVal(e.value);
                updateSingleField(e.value);
              }
            }
          }

          dispatch(setAddLoading(false));
        }).catch((error) => {
          dispatch(setAddLoading(false))
        });
    } else if (e?.value !== data.recStatus) {
      setProductStatusVal(e ? e.value : '');
      updateSingleField(e ? e.value : '');
    }
  }
  
  return (
    <>
      <div className="w-full bg-white shadow-lg rounded-md border border-neutral-200 mb-6">
        {type === productType.GMC &&
          (permission?.isEdit || permission?.isDelete) &&
          data?.recStatus === RecStatusValuebyName.Active && (
            <>
              <div className="border-b-2 border-neutral-200 p-6">
                <button
                  type={"button"}
                  className="btn w-full block bg-green-500 hover:bg-green-600 text-white"
                  onClick={cloneProductToMaster}
                  disabled={data.isCloned}
                >
                  {!data.isCloned
                    ? "Add Listing / Clone"
                    : "Product is already cloned in Core Product Feed"}
                </button>
              </div>
            </>
          )}
        <div className="p-6 border-b-2 border-neutral-200">
          <div className="block uppercase tracking-wide text-gray-500 text-base font-bold mb-2">
            Product Status
          </div>
          <Select
            options={ProductStatusMoreFilterOption}
            onChange={(e) => handleToggleProductStatus(e)}
            name="recStatus"
            defaultValue={productstatusVal}
            isClearable={false}
            isDisabled={
              (!permission?.isEdit && !permission?.isDelete) || isAddMode
            }
          />
          <span className="text-red-500">{statusError}</span>
        </div>

      </div>
      {!isAddMode &&
        <div className="w-full bg-white shadow-lg rounded-md border border-neutral-200 mb-6">
          <div className="p-6 border-b-2 border-neutral-200 rounded-md">
            <div className="w-full flex items-center gap-4 ">
              <div className="w-1/1">
                {(data?.productImage !== null && data?.productImage !== "") ?
                  <div className="grow flex items-center border-spacing-1 border-dashed border-2 border-neutral-200 rounded-lg justify-center p-1 h-40 w-40">
                    <img
                      className="max-h-full mx-auto"
                      src={`${AdminAppConfigReducers["azure:BlobUrl"]}${data?.productImage}?${Math.random(5)}`}
                      alt=""
                    />
                  </div>
                  :
                  <div className="grow flex items-center border-spacing-1 border-dashed border-2 border-neutral-200 rounded-lg justify-center p-1 h-40 w-40  bg-sky-400/10">
                    <img
                      className="max-h-full mx-auto"
                      src="/noImage.png"
                      alt=""
                    />
                  </div>
                }
              </div>

              <div className="text-left w-1/2">
                <span className="font-semibold"> Product Name :</span> {data?.name}
                <div className="text-left">
                  <span className="font-semibold"> Our SKU :</span> {data?.ourSKU}
                </div>
              </div>
            </div>
          </div>

        </div>
      }

      {!isAddMode &&
        [
          productType.MC,
          productType.EcommerceStore,
          productType.CorporateStore,
          productType.Bundle,
        ].includes(type) && (
          <>
            <div className="w-full bg-white shadow-lg rounded-md border border-neutral-200 mb-6">
              <div className="relative w-full">
                {data && (
                  <StatusDetailsTile
                    data={{
                      title: "Last Publish Detail",
                      subTitle: data?.publishDate
                        ? `Last Published on ${DateTimeFormat(data?.publishDate, "MMM dd,yyyy")
                          ?.date +
                        " - " +
                        DateTimeFormat(data?.publishDate)?.time
                        } `
                        : "Product is not publish yet.",
                      subTitle2: data?.publishByName
                        ? `Last Published by ${data?.publishByName}. `
                        : "",
                    }}
                  />
                )}
                {data && (
                  <StatusDetailsTile
                    data={{
                      title: "Last Save Detail ",
                      subTitle: `Last Saved on  ${data?.createdDate
                        ? DateTimeFormat(
                          data?.modifiedDate || data?.createdDate,
                          "MMM dd,yyyy"
                        )?.date +
                        " - " +
                        DateTimeFormat(
                          data?.modifiedDate || data?.createdDate
                        )?.time
                        : ""
                        } `,
                      subTitle2: `Last Saved by ${data?.modifiedByName
                        ? data?.modifiedByName
                        : "" || data?.createdByName
                          ? data?.createdByName
                          : ""
                        }.`,
                    }}
                  />
                )}
              </div>
            </div>
            {store?.isProductReadinessAllow && !data.isGiftCardProduct && (
              <div className="w-full relative bg-white shadow-lg rounded-md border border-neutral-200 mb-6 p-1">
                <ProgressDetailsTile
                  name={"Product Readiness"}
                  ProgressValue={ProductStatusValue}
                />
                {ProReadinessData?.data?.data === null && ProReadinessData?.data?.errors && (
                  <span className="ml-5 mb-2 text-red-500 text-left flex">
                    {serverError(ProReadinessData)}
                  </span>
                )}
              </div>
            )}

            {store?.isSeoReadinessAllow && !data.isGiftCardProduct && (
              <div className="w-full relative bg-white shadow-lg rounded-md border border-neutral-200 mb-6 p-1">
                <ProgressDetailsTile
                  name={"SEO Readiness"}
                  ProgressValue={SEOStatusValue}
                />
                {SEOReadinessData?.errors && (
                  <span className="ml-5 mb-2 text-red-500">
                    {serverError({
                      data: { errors: SEOReadinessData?.errors },
                    })}
                  </span>
                )}
              </div>
            )}
          </>
        )}
      {!isAddMode && type === productType.MC && (
        <>
          <div className="w-full relative bg-white shadow-lg rounded-md border border-neutral-200 mb-6 p-1">
            <ProgressDetailsTile
              name={" Product Readiness"}
              ProgressValue={ProductStatusValue}
            />
            {ProReadinessData?.data?.data === null && ProReadinessData?.data?.errors && (
              <span className="ml-5 mb-2 text-red-500 text-left flex">
                {serverError(ProReadinessData)}
              </span>
            )}
          </div>
        </>
      )}

      {type !== productType.GMC && !isAddMode && (
        <>
          {/* here we will list down all {Product Title}  with its {toggle button} */}
          <ProductStatus
            data={data}
            type={type}
            updateStatus={updateProductStatus}
            displayFieldElement={displayFieldElement}
            fetchFieldProperty={fetchFieldProperty}
            fields={fields}
            getProductData={getProductData}
          />
        </>
      )}
    </>
  );
};

export default ProductStatusSidebar;
