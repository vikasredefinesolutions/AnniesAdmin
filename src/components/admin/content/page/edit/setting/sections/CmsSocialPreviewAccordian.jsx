import React, { useState } from 'react'
import { useFormikContext } from "formik";

import SEOSocial from "components/common/others/admin/SEO/SEOSocial";

const BreadCrumbShow = () => {
    const { setFieldValue, values } = useFormikContext();
    const [show, setShow] = useState(false);

    return (
        <div className="px-5 py-4 bg-white mb-6">
            <button className="flex items-center justify-between w-full group mb-1" type='button' onClick={() => setShow(!show)}>
                <div className="text-lg text-gray-800 font-bold">Social Share</div>
                <svg className={`w-8 h-8 shrink-0 fill-current text-gray-400 group-hover:text-gray-500 ml-3 ${show ? "rotate-180" : ""}`} viewBox="0 0 32 32">
                    <path d="M16 20l-5.4-5.4 1.4-1.4 4 4 4-4 1.4 1.4z"></path>
                </svg>
            </button>
            <div className={`${show ? "" : "hidden"}`}>
                <SEOSocial
                    values={values}
                    setFieldValue={setFieldValue}
                    displayFieldElement={() => true}
                    readOnly={false}
                    fields={[]}
                    moduleName={"content"}
                />
            </div>
        </div>
    )
}

export default BreadCrumbShow