import React from 'react'
import { scrollTop } from "services/common/helper/Helper";

const CategorySEOView = ({ index, setactiveTab, values, tab }) => {

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
                                setactiveTab(index);
                                scrollTop();
                            }}
                        >
                            Edit
                        </span>
                    </div>
                </div>

                <div className="mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center">
                    <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
                        Title
                        <span className="text-rose-500 text-2xl leading-none">*</span>
                        :
                    </label>
                    <div className="col-span-2">{values?.seTitle}</div>
                </div>

                <div className="mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center">
                    <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
                        Keywords
                        <span className="text-rose-500 text-2xl leading-none">*</span>
                        :
                    </label>
                    <div className="col-span-2">{values?.seKeywords}</div>
                </div>

                <div className="mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center">
                    <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
                        Description
                        <span className="text-rose-500 text-2xl leading-none">*</span>
                        :
                    </label>
                    <div className="col-span-2">{values?.seDescription}</div>
                </div>

                <div className="mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center">
                    <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
                        H1 Tag: :
                    </label>
                    <div className="col-span-2">{values?.categoryH1}</div>
                </div>
                <div className="mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center">
                    <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
                        H2 Tag: :
                    </label>
                    <div className="col-span-2">{values?.categoryH2}</div>
                </div>
            </div>
        </>
    )
}

export default CategorySEOView;
