import React, { useState, useEffect, useCallback } from "react";
import FilterFacetService from "services/admin/master/master/products/FilterFacetService";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { scrollTop } from "services/common/helper/Helper";
import { useDispatch } from "react-redux";

const FilterFacetView = ({ tab, setActiveTab, index, productId, storeIdFinal, }) => {
  const dispatch = useDispatch();
  const [filterFacetFields, setFilterFacetFields] = useState([]);

  const getProductFilterFieldsData = useCallback(() => {
    if (productId && storeIdFinal) {
      dispatch(setAddLoading(true));
      FilterFacetService.getProductfilterfacetfields(productId, storeIdFinal)
        .then((response) => {
          if (response.data.success && response.data.data) {
            const currentValue = response.data.data.map((childElem) => {
              const currentObj = {};
              if (childElem?.fieldvalues?.length > 0) {
                var childInnerElemArr = childElem.fieldvalues.filter(
                  (check) => check.isInProduct
                );

                currentObj["childValue"] = childInnerElemArr;
              } else {
                currentObj["childValue"] = childInnerElemArr;
              }
              currentObj["parentValue"] = childElem.fieldName;
              currentObj["selectionType"] = childElem.selectionType;
              return currentObj;
            });

            setFilterFacetFields(currentValue);
          }
          dispatch(setAddLoading(false));
        })
        .catch((error) => {
          dispatch(setAddLoading(false));
        });
    }
  }, [productId, storeIdFinal]);

  useEffect(() => {
    getProductFilterFieldsData();
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
        {filterFacetFields && filterFacetFields.length
          ? filterFacetFields.map((data, pIndex) => {
            return (
              <div
                className="mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center"
                key={pIndex}
              >
                <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
                  {data?.parentValue}
                </label>
                <div className="flex flex-wrap col-span-2">
                  {data &&
                    data?.childValue?.length > 0 &&
                    data?.childValue.map((childData, cIndex) => {
                      return (
                        <div key={cIndex}>
                          {data?.parentValue.toLowerCase() == "zone" ? (
                            <>
                              {/* checkbox */}
                              <ul className="flex flex-wrap gap-1">
                                <li class="flex justify-between items-center pb-[10px]">
                                  <div class="flex items-center">
                                    <input
                                      id={`${childData?.id}_${childData?.fieldValue}`}
                                      name={childData?.fieldValue}
                                      value=""
                                      type="checkbox"
                                      checked="checked"
                                      readOnly
                                      class="h-4 w-4 border-gray-300 rounded !mt-0"
                                    />
                                    <label
                                      for="Zone-4"
                                      class="ml-[4px] mr-[6px] font-sub text-small-text font-semibold mb-0"
                                    >
                                      {childData?.fieldValue}
                                    </label>
                                  </div>
                                </li>
                              </ul>
                            </>
                          ) : (
                            <div>
                              {data.childValue.length > 1
                                ? `${childData?.fieldValue}` + ","
                                : childData?.fieldValue}
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })
          : ""}
      </div>
    </>
  );
};

export default FilterFacetView;
