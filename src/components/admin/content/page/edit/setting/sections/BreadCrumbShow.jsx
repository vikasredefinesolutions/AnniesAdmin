import React, { useCallback, useState } from 'react'
import { useFormikContext } from "formik";

import { MenuType } from 'dummy/Dummy';

import Checkbox from 'components/common/formComponent/Checkbox';
import Dropdown from 'components/common/formComponent/Dropdown';

const BreadCrumbShow = () => {
    const { setFieldValue, values } = useFormikContext();
    const [show, setShow] = useState(false);

    const handleOnChange = useCallback((currentValue) => {
        setFieldValue("menuType", currentValue.value);
    }, [values]);

    return (
        <div className="px-5 py-4 bg-white mb-6">
            <button className="flex items-center justify-between w-full group mb-1" type='button' onClick={() => setShow(!show)}>
                <div className="text-lg text-gray-800 font-bold">Bread Crumb Show</div>
                <svg className={`w-8 h-8 shrink-0 fill-current text-gray-400 group-hover:text-gray-500 ml-3 ${show ? "rotate-180" : ""}`} viewBox="0 0 32 32">
                    <path d="M16 20l-5.4-5.4 1.4-1.4 4 4 4-4 1.4 1.4z"></path>
                </svg>
            </button>
            <div className={`${show ? "" : "hidden"}`}>
                <div className="mt-6 mb-6">
                    <label className="text-gray-500 inline-flex items-center">
                        <Checkbox
                            name="isbreadcrumbShow"
                            label="Is Bread Crumb Show"
                            id="isbreadcrumbShow"
                            checked={values?.isbreadcrumbShow === 'Y' ? true : false}
                            onChange={(e) => {
                                setFieldValue("isbreadcrumbShow", e.target.checked ? 'Y' : 'N');
                            }}
                        />
                    </label>
                </div>
                <div className="mb-2 text-md font-bold">Menu Type</div>

                <div className="flex mb-6">
                    <div className="w-1/2 md:mr-2">
                        <Dropdown
                            isMulti={false}
                            isClearable={false}
                            defaultValue={values.menuType}
                            name="menuType"
                            className={`w-full`}
                            options={MenuType}
                            onChange={(e) => handleOnChange(e)}
                        />
                    </div>
                    <div className="w-1/2 md:mr-2"></div>
                </div>
            </div>
        </div>
    )
}

export default BreadCrumbShow