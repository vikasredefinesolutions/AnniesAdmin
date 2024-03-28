/*Component Name: LayoutSelect
Component Functional Details: User can create or update LayoutSelect master details from here.
Created By: chandan
Created Date: <Creation Date>
Modified By: chandan
Modified Date: <Modified Date> */


import React from 'react';
import { useFormikContext } from 'formik';
import { useSelector } from 'react-redux';

const LayoutSelect = ({ name }) => {
    const permission = useSelector(store => store.permission);
    const { setFieldValue, values } = useFormikContext();

    return (
        <>
            <div className="last:mb-0 flex flex-wrap justify-between items-center pt-4" >
                <label className="mb-3 block text-sm font-bold">Column Select</label>
                <div className="grid grid-cols-2 gap-2 mb-5">
                    <button type='button' disabled={!permission?.isEdit && !permission?.isDelete} className={`border-2 rounded-md overflow-hidden focus:ring-indigo-500 focus:border-indigo-500   ${values[name] === 0 ? 'border-blue-500 activeTab' : 'border-gray-300 cursor-pointer'} `} onClick={() => setFieldValue(name, 0)}  >
                        <img alt="" src={`${process.env.PUBLIC_URL}/images/cms/layout-1.jpg`} />
                    </button>
                    <button type='button' disabled={!permission?.isEdit && !permission?.isDelete} className={`border-2 rounded-md overflow-hidden focus:ring-indigo-500 focus:border-indigo-500   ${values[name] === 1 ? 'border-blue-500 activeTab' : 'border-gray-300 cursor-pointer'} `} onClick={() => setFieldValue(name, 1)} >
                        <img alt="" src={`${process.env.PUBLIC_URL}/images/cms/layout-2.jpg`} />
                    </button>
                </div>
            </div >
        </>
    );
};

export default LayoutSelect;
