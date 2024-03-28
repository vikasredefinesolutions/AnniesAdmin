import React from "react";
import { useFormikContext } from "formik";
import ColorPicker from "components/common/formComponent/ColorPicker";

const BackgroundColor = ({ name, value, ...rest }) => {
    const { setFieldValue, values } = useFormikContext();
    return (
        <>
            <div className="">
                <label className=" text-sm mb-1 flex flex-wrap">
                    <span> Color </span>
                </label>
                <ColorPicker
                    name={name && name}
                    value={values[name] ? values[name] : ""}
                    onChange={(color) => {
                        setFieldValue(name, color);
                    }}
                    transformCss={`-translate-y-[350px] -translate-x-[20px]`}
                />
            </div>
        </>
    );
};

export default BackgroundColor;
