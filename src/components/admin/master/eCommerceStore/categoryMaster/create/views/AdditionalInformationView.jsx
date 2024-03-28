import React, { useState, useEffect, Fragment } from 'react'
import { useDispatch } from 'react-redux';
import { scrollTop, DateTimeFormat } from "services/common/helper/Helper";
import CategoryService from "services/admin/master/store/categoryMaster/CategoryMasterService";
import { setAddLoading } from 'redux/globalLoader/GlobalLoaderAction';
import Image from "components/common/formComponent/Image";

const AdditionalInformationView = ({ index, setactiveTab, values, storeId }) => {
    const dispatch = useDispatch();
    const [categoryFieldsData, setCategoryFieldsData] = useState([]);

    const getCategoryFieldsData = () => {
        dispatch(setAddLoading(true));

        CategoryService.getCategoryFilterCustomFields(values.id, storeId).then((response) => {
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
                    currentObj["parentValue"] = childElem?.categoryCustomFieldName;
                    currentObj["categoryCustomFieldType"] = childElem?.categoryCustomFieldType;
                    return currentObj;
                });

                setCategoryFieldsData(currentValue);
            }
            dispatch(setAddLoading(false));
        }).catch((error) => {
            dispatch(setAddLoading(false));
        })
    };

    useEffect(() => {
        if (storeId && values.id) {
            getCategoryFieldsData();
        }
    }, [storeId, values.id])

    return (
        <>
            <div className="px-6 py-12 border-b-4 border-neutral-200 last:border-b-0">
                <div className="flex items-center justify-between">
                    <div className="block uppercase tracking-wide text-gray-500 text-base font-bold mb-2">
                        {"Additional Information"}
                    </div>
                    <div>
                        <span
                            className="text-indigo-500 cursor-pointer"
                            onClick={() => {
                                setactiveTab(index);
                                scrollTop();
                            }}
                        >
                            {"Edit"}
                        </span>
                    </div>
                </div>
                {categoryFieldsData && categoryFieldsData.length ? (
                    categoryFieldsData.map((value, pIndex) => {
                        return (
                            <Fragment key={pIndex}>
                                <div className="mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center">
                                    <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
                                        {value?.parentValue + ":"}
                                    </label>
                                    <div className="flex flex-wrap col-span-2">
                                        {(value && value.childValue.length > 0) && value.childValue.map((childData, cIndex) => {
                                            const color = childData?.categoryCustomFieldsValue.includes("color") && `${childData?.categoryCustomFieldsValue.slice(7, childData?.categoryCustomFieldsValue?.length - 1)}`;

                                            return (
                                                <Fragment key={cIndex}>
                                                    {value?.categoryCustomFieldType.toLowerCase() === "textbox" &&
                                                        childData?.categoryCustomFieldsValue
                                                    }

                                                    {value?.categoryCustomFieldType.toLowerCase() === "datetime" &&
                                                        <div>
                                                            <span className="mr-2">{DateTimeFormat(childData?.categoryCustomFieldsValue).date}</span>
                                                            <span className="text-[#707070] text-xs font-normal">{DateTimeFormat(childData?.categoryCustomFieldsValue).time}</span>
                                                        </div>
                                                    }

                                                    {(value?.categoryCustomFieldType.toLowerCase() === "dropdown" || value?.categoryCustomFieldType.toLowerCase() === "multidropdown") && childData?.categoryCustomFieldsValue.includes("color") &&
                                                        <div className="flex gap-6">
                                                            <span>{childData?.categoryCustomFieldsValue}</span>
                                                            <div className="inline-flex items-center justify-center mr-2 mb-2 rounded-full border-click w-8 h-8 border-2"
                                                                style={{ background: color }} />
                                                        </div>
                                                    }

                                                    {(value?.categoryCustomFieldType.toLowerCase() === "dropdown" || value?.categoryCustomFieldType.toLowerCase() === "multidropdown") && !childData?.categoryCustomFieldsValue.includes("color") &&
                                                        `${childData?.categoryCustomFieldsValue}${value.childValue.length - 1 > cIndex ? "," : ""}`
                                                    }

                                                    {value?.categoryCustomFieldType.toLowerCase() === "image" &&
                                                        <div>
                                                            <Image
                                                                className="w-20"
                                                                containerHeight={"h-20"}
                                                                src={childData?.categoryCustomFieldsValue}
                                                            />
                                                        </div>
                                                    }
                                                    {value?.categoryCustomFieldType.toLowerCase() === "checkbox" &&
                                                        <div className="flex items-center">
                                                            <input
                                                                id={`${childData?.id}_${childData?.categoryCustomFieldsValue}`}
                                                                name={childData?.categoryCustomFieldsValue}
                                                                value=""
                                                                type="checkbox"
                                                                checked="checked"
                                                                readOnly
                                                                className="h-4 w-4 border-gray-300 rounded !mt-0"
                                                            />
                                                            <label className="ml-[4px] mr-[6px] font-sub text-small-text font-semibold mb-0"
                                                            >
                                                                {childData?.categoryCustomFieldsValue}
                                                            </label>
                                                        </div>
                                                    }
                                                </Fragment>
                                            )
                                        })}
                                    </div >
                                </div >
                            </Fragment >
                        );
                    })
                ) : (
                    <div className="text-rose-500 leading-none">No Data Found!</div>
                )}
            </div >
        </>
    )
}

export default AdditionalInformationView;