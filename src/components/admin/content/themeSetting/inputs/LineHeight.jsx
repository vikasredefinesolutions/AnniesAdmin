import React from 'react'
import { useFormikContext } from "formik";
import { themeLineHeight } from 'dummy/Dummy'
import Dropdown from 'components/common/formComponent/Dropdown';

const LineHeight = ({ name, value, ...rest }) => {
    const { setFieldValue, values } = useFormikContext();
    return (
        <>
            <div>
                <label className="text-sm mb-1 flex flex-wrap">
                    <span> Line Height </span>
                </label>
                <div >
                    <Dropdown
                        label={''}
                        name={name && name}
                        options={themeLineHeight}
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

export default LineHeight