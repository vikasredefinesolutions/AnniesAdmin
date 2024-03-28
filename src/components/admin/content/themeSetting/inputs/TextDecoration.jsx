import React from 'react'
import { useFormikContext } from "formik";
import {  themeTextDecorations } from 'dummy/Dummy';
import Dropdown from 'components/common/formComponent/Dropdown';

const TextDecoration = ({ name, value, ...rest }) => {
    const { setFieldValue, values } = useFormikContext();
    return (
        <>
            <div>
                <label className="text-sm mb-1 flex flex-wrap">
                    <span> Text Decoration </span>
                </label>
                <div className=''>
                    <Dropdown
                        label={''}
                        name={name && name}
                        options={themeTextDecorations}
                        defaultValue={values[name]}
                        isSearchable={false}

                        onChange={(e) => {
                            if (e) {
                                setFieldValue(
                                    name,
                                    e.value
                                );
                            } else {
                                setFieldValue(name, "");
                            }
                        }}
                    />
                </div>
            </div>
        </>
    )
}

export default TextDecoration