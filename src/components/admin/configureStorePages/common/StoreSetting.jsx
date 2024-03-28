import React from 'react';
import StoreNestedSettingAttributes from './StoreNestedSettingAttributes';
import { useFormikContext, } from "formik";
import { useSelector } from "react-redux";

const Settings = ({ AttributeData, page, initialValues = {}, setInitialValues }) => {
    const permission = useSelector(store => store.permission);
    const { values, setFieldValue } = useFormikContext();
    const GlobalLoading = useSelector((store) => store?.GlobalLoaderReducer?.toLoad);

    return (
        <div className="min-h-[83vh] max-h-[83vh] relative scrollbar-hide scrollbar-thin w-full ">

            <div className="min-h-[75vh] max-h-[75vh] ">
                <StoreNestedSettingAttributes AttributeData={AttributeData} setFieldValue={setFieldValue} initialValues={initialValues} setInitialValues={setInitialValues} />
            </div>

            {(AttributeData.length > 0 && (permission?.isEdit || permission?.isDelete)) && <div className=" min-h-[40px] sticky bottom-0 w-full  bg-white">
                <button className={`btn border-indigo-300 hover:border-indigo-400 text-indigo-500 w-full ${(GlobalLoading)
                    ? "bg-indigo-200 hover:bg-indigo-200"
                    : "cursor-pointer"
                    }`} type='submit'

                    disabled={Object.keys(values).length <= 0 || GlobalLoading}
                >
                    {GlobalLoading && (
                        <span className="spinner-border spinner-border-sm mr-2"></span>
                    )}
                    Apply Theme
                </button>
            </div>}
        </div>
    )
}

export default Settings