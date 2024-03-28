/*Component Name: ProductSectionDisplayComponent
Component Functional Details: User can create or update ProductSectionDisplayComponent master details from here.
Created By: chandan
Created Date: <Creation Date>
Modified By: chandan
Modified Date: <Modified Date> */

import React, { useState } from 'react';
import Transition from "utils/Transition";
import { useFormikContext } from 'formik';
import Dropdown from 'components/common/formComponent/Dropdown';

import { productSectionDisplayOption } from "global/Enum"

const ProductSectionDisplayComponent = () => {

    const { setFieldValue, values } = useFormikContext();


    const [showInnerElem, setshowInnerElem] = useState({
        isVisible: false,
        whichRow: 0
    });

    const handleSequenceChange = (value, name, oldObjInsideArray) => {
        if (oldObjInsideArray) {

            // here i need to check which element has the value as value.value is trying to use .
            const ourOldObj = Object.entries(oldObjInsideArray)
            const foundObj = ourOldObj.find((obj) => {
                return obj[1].value === value.value
            })

            if (foundObj) {
                setFieldValue(`sectionDisplay.[${foundObj[0]}].value`, values.sectionDisplay[name].value)
            }
        }
        setFieldValue(`sectionDisplay.[${name}].value`, value.value)
    }

    return (
        <>
            {[{ label: "You May Also Like", name: "youmayalsolike" }, { label: "Recently Viewed Items", name: "recentlyviewed" }, { label: "Write A Review", name: "writereview" }].map((Product_Section_Display_Obj, index) => {
                return <div className="relative w-full pr-2" key={index}>
                    <button
                        onClick={() => setshowInnerElem((prevData) => ({ isVisible: (prevData.whichRow === index) ? !prevData.isVisible : true, whichRow: index }))}
                        type="button"
                        className="flex w-full flex-wrap justify-between items-center text-sm px-3 py-4 bg-white border-0 font-medium">
                        <span className="ml-1">{`${Product_Section_Display_Obj.label}`}</span>
                        <span className="material-icons-outlined">{(showInnerElem.isVisible && showInnerElem.whichRow === index) ? 'expand_less' : 'expand_more'}</span>
                    </button>
                    <Transition
                        className="bg-white border-y border-b-0 border-neutral-200 overflow-visible"
                        show={(showInnerElem.isVisible && showInnerElem.whichRow === index) ? true : false}
                        tag="div"
                        enter="transition ease-out duration-200 transform"
                        enterStart="opacity-0 -translate-y-2"
                        enterEnd="opacity-100 translate-y-0"
                        leave="transition ease-out duration-200"
                        leaveStart="opacity-100"
                        leaveEnd="opacity-0"
                    >
                        <div className="text-sm m-1" >
                            {
                                showInnerElem.isVisible && showInnerElem.whichRow === index && <div className="bg-white py-4 px-3">

                                    {/* Left Side Promotianal Text */}
                                    <div className='mt-2'>
                                        <label className="text-sm mb-1 flex flex-wrap "><span>Display Position</span></label>

                                        <Dropdown
                                            defaultValue={(values?.sectionDisplay && values?.sectionDisplay[Product_Section_Display_Obj.name] && values?.sectionDisplay[Product_Section_Display_Obj.name].value) ? values?.sectionDisplay[Product_Section_Display_Obj.name].value : index + 1}
                                            name={`sectionDisplay.[${Product_Section_Display_Obj.name}].value`}
                                            options={productSectionDisplayOption}
                                            onChange={(value) => handleSequenceChange(value, Product_Section_Display_Obj.name, values.sectionDisplay)}
                                        />
                                    </div>

                                </div>
                            }

                        </div>
                    </Transition>
                    <div className="text-center flex justify-between items-center absolute top-4 right-0">
                        <button
                            type='button'
                            className="inline-block leading-none w-6 h-6"
                            onClick={() => {
                                setFieldValue(`sectionDisplay.[${Product_Section_Display_Obj.name}].isVisible`, values?.sectionDisplay ? !values?.sectionDisplay[Product_Section_Display_Obj.name]?.isVisible : true)
                            }}
                        >
                            <span className="material-icons-outlined text-base">{values?.sectionDisplay && values?.sectionDisplay[Product_Section_Display_Obj.name]?.isVisible ? 'visibility' : 'visibility_off'}</span>
                        </button>
                    </div>
                </div>
            })
            }
        </>
    );
};

export default ProductSectionDisplayComponent;
