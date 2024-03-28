/*Component Name: DropdownFilter
Component Functional Details:  DropdownFilter .
Created By: PK Kher
Created Date: 6-20-2022
Modified By: PK Kher
Modified Date: 6-20-2022 */

import React, { useState, useEffect } from 'react';
import Select from 'components/common/formComponent/Select';

const DropdownFilter = ({ name, options, setColumnFilteringOptions, defaultValue }) => {
    const [dropdownValue, setDropdownValue] = useState("");

    const dropdownHandleChange = (e) => {
        setDropdownValue(() => {
            return e ? e.value : ''
        });

        if (e) {
            if (e.value !== "-1" && e.value !== "0") {
                setColumnFilteringOptions([{
                    field: e.columnName,
                    operator: 0,
                    value: e.finalValue,
                }]);
            } else {
                setColumnFilteringOptions([{
                    field: e.columnName,
                    operator: 0,
                    value: e.finalValue,
                }]);
            }
        }
    };

    useEffect(() => {
        setDropdownValue(defaultValue ? defaultValue : '');
    }, [defaultValue]);

    return (
        <div>
            <Select
                name={name}
                options={options}
                onChange={dropdownHandleChange}
                defaultValue={dropdownValue}
            />
        </div>
    );
};

export default DropdownFilter;
