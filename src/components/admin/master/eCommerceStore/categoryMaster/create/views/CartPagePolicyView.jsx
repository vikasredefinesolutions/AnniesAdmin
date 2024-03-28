import React from 'react'
import { scrollTop } from "services/common/helper/Helper";

const CartPagePolicyView = ({ values, tab, setactiveTab, index, }) => {
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
                        with CheckBox :
                    </label>
                    <div className="col-span-2" >{values?.isCheckBoxForCartPolicy === true ? "Yes" : "No"}</div>
                </div>
                <div className="mb-6 last:mb-0 grid grid-cols-3 gap-4 items-center">
                    <label className="col-span-1 text-xs font-semibold text-gray-500 uppercase">
                        Message :
                    </label>
                    <div className="col-span-2">{values?.cartPolicyMessage}</div>
                </div>
            </div>
        </>
    )
}

export default CartPagePolicyView