import React, { useState, useEffect, Fragment } from "react";
import { scrollTop } from "services/common/helper/Helper";
import AdditonalInformationService from "services/admin/master/master/products/AdditonalInformationService";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { useDispatch } from "react-redux";
import { DateTimeFormat } from "services/common/helper/Helper";

const AdditionalInformationView = ({
  tab,
  setActiveTab,
  index,
  productId,
  storeIdFinal,
}) => {
  const dispatch = useDispatch();
  const [fieldsData, setFieldsData] = useState([]);

  const getProductCustomeFilterFields = () => {
    dispatch(setAddLoading(true));
    AdditonalInformationService.getStoreProductFilterCustomFields(
      productId,
      storeIdFinal
    )
      .then((response) => {
        if (response.data.success && response.data.data) {
          const currentValue = response.data.data.map((childElem) => {
            const currentObj = {};
            if (childElem?.fieldvalues?.length > 0) {
              const childInnerElem = childElem.fieldvalues.filter(
                (check) => check.isInProduct
              );
              currentObj["childValue"] = childInnerElem;
            } else {
              currentObj["childValue"] = childElem.fieldvalues;
            }
            currentObj["parentValue"] = childElem?.customFieldName;
            currentObj["customFieldType"] = childElem?.customFieldType;
            return currentObj;
          });

          setFieldsData(currentValue);
        }
        dispatch(setAddLoading(false));
      })
      .catch((error) => {
        dispatch(setAddLoading(false));
      });
  };

  useEffect(() => {
    if (productId && storeIdFinal) {
      getProductCustomeFilterFields();
    }
  }, [productId, storeIdFinal]);

  return (
    <>
      <div className="px-6 py-12 border-b-4 border-neutral-200 last:border-b-0">
        <div className="flex items-center justify-between">
          <div className="block uppercase tracking-wide text-gray-500 text-base font-bold mb-2">
            {tab.label}
          </div>
          <div>
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
        {fieldsData && fieldsData.length ? (
          fieldsData.map((value, pIndex) => {
            return (
              <Fragment key={pIndex}>
                <div className="mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center">
                  <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
                    {value?.parentValue + ":"}
                  </label>
                  <div className="flex flex-wrap col-span-2">
                    {(value && value.childValue.length > 0) && value.childValue.map((childData, cIndex) => {
                      const color = childData?.customFieldsValue.includes("color") && `${childData?.customFieldsValue.slice(7, childData?.customFieldsValue?.length - 1)}`;

                      return (
                        <Fragment key={cIndex}>
                          {value?.customFieldType.toLowerCase() === "textbox" &&
                            childData?.customFieldsValue
                          }

                          {value?.customFieldType.toLowerCase() === "datetime" &&
                            <div>
                              <span className="mr-2">{DateTimeFormat(childData?.customFieldsValue).date}</span>
                              <span className="text-[#707070] text-xs font-normal">{DateTimeFormat(childData?.customFieldsValue).time}</span>
                            </div>
                          }

                          {(value?.customFieldType.toLowerCase() === "dropdown" || value?.customFieldType.toLowerCase() === "multidropdown") && childData?.customFieldsValue.includes("color") &&
                            <div className="flex gap-6">
                              <span className="pt-1">{childData?.customFieldsValue}</span>
                              <div className="inline-flex items-center justify-center mr-2 mb-2 rounded-full border-click w-8 h-8 border-2"
                                style={{ background: color }} />
                            </div>
                          }

                          {(value?.customFieldType.toLowerCase() === "dropdown" || value?.customFieldType.toLowerCase() === "multidropdown") && !childData?.customFieldsValue.includes("color") &&
                            `${childData?.customFieldsValue}${value.childValue.length - 1 > cIndex ? "," : ""}`
                          }

                          {value?.customFieldType.toLowerCase() === "checkbox" &&
                            <div className="flex items-center">
                              <input
                                id={`${childData?.id}_${childData?.customFieldsValue}`}
                                name={childData?.customFieldsValue}
                                value=""
                                type="checkbox"
                                checked="checked"
                                readOnly
                                className="h-4 w-4 border-gray-300 rounded !mt-0"
                              />
                              <label className="ml-[4px] mr-[6px] font-sub text-small-text font-semibold mb-0"
                              >
                                {childData?.customFieldsValue}
                              </label>
                            </div>
                          }
                        </Fragment>
                      )
                    })}
                  </div>
                </div>
              </Fragment>
            );
          })
        ) : (
          <div className="text-rose-500 leading-none">No Data Found!</div>
        )}
      </div>
    </>
  );
};

export default AdditionalInformationView;
