/*Component Name: AddToCartButtonOption
Component Functional Details: User can create or update AddToCartButtonOption master details from here.
Created By: chandan
Created Date: <Creation Date>
Modified By: chandan
Modified Date: <Modified Date> */

import React from 'react';
import { useFormikContext } from 'formik';

import Dropdown from 'components/common/formComponent/Dropdown';
import { buttonClasses } from "components/admin/content/helper/ThemeVariables";
import Input from '../inputs/Input';

const AddToCartButtonOption = ({ ...rest }) => {
    const { setFieldValue, values } = useFormikContext();

    return (
        <>
            <div className="flex flex-wrap justify-between items-center -mb-6" >
                <label className="mt-4 block text-sm font-bold">Select Button Style</label>
                <div className="w-full">
                    <Dropdown
                        defaultValue={values?.addToCart?.class || ""}
                        name={`addToCart.class`}
                        options={buttonClasses}
                    />
                </div>

                <label className="mt-2 block text-sm font-bold">Button Name</label>
                <div className="w-full ">
                    <Input {...rest} />
                </div>
            </div >
        </>
    );
};

export default AddToCartButtonOption;
