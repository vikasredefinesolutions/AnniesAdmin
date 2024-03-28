/*Component Name: BannerRow
Component Functional Details: User can create or update BannerRow master details from here.
Created By: chandan
Created Date: <Creation Date>
Modified By: chandan
Modified Date: <Modified Date> */

import Dropdown from "components/common/formComponent/Dropdown";
import Input from "components/common/formComponent/Input";
import React from "react";
import { useSelector } from "react-redux";
import { BannerLinkUrlTypeOptions } from "global/Enum"

const BannerRow = ({
    fieldArrayProps,
    index,
    value,
    values,
}) => {
    const permission = useSelector((store) => store.permission);
    // console.log("values values", values, value);
    const arrLength = values.bannerLinksArray.length;

    return (
        <>
            <td className="px-2 py-4">
                <Input
                    label="id"
                    name={`bannerLinksArray[${index}].name`}
                    defaultValue={value.name}
                />
            </td>

            <td className="px-2 py-3">
                <Input
                    label="id"
                    name={`bannerLinksArray[${index}].url`}
                    defaultValue={value.url}
                />
            </td>

            <td className="px-2 py-3">
                <Dropdown
                    label="id"
                    isMulti={false}
                    name={`bannerLinksArray[${index}].urlType`}
                    options={BannerLinkUrlTypeOptions}
                    defaultValue={value.urlType}
                />
            </td>

            {(permission?.isEdit || permission?.isDelete) && <td className="px-2 first:pl-5 py-3">
                <div className="gap-2 text-right">
                    {(index === arrLength - 1) && <button
                        type="button"
                        className={"w-6 h-6 text-indigo-500"}
                        onClick={() => {
                            {
                                fieldArrayProps.push({
                                    name: "",
                                    url: "",
                                    urlType: "",
                                });
                            }
                        }}
                    >
                        <span className="material-icons-outlined">add</span>
                    </button>}

                    <>
                        {permission?.isDelete && <button
                            type="button"
                            className={"w-6 h-6 text-rose-500"}
                            onClick={fieldArrayProps.remove.bind(null, index)}
                        // onLoad={setTotalFieldData(values.bannerLinksArray)}
                        >
                            <span className="material-icons-outlined cursor-pointer">
                                delete
                            </span>
                        </button>}

                    </>
                </div>
            </td>}
        </>
    );
};

export default BannerRow;

