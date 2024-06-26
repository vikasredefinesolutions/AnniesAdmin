import React, { useState, useEffect, useCallback, Fragment } from "react";
import Transition from "utils/Transition";

const CheckboxGroup = ({
  options,
  name,
  type,
  mainFilter,
  setMainFilter,
  columnName = name.toLowerCase().replaceAll(' ', "_"),
  conditionalSearch = false,
  setmainColumnFilter,
  openDropdown,
  setShow,
  applyMoreFilter,
  ...rest
}) => {
  const [checkboxButtonValue, setCheckboxButtonValue] = useState([]);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  useEffect(() => {
    setCheckboxButtonValue(() => {
      var temp = mainFilter.filter((value) => {
        return value.field === columnName
      });
      if (temp.length > 0) {
        return temp[0].value.split(',');
      } else {
        return [];
      }
    });
  }, [mainFilter, columnName]);
  useEffect(() => {
    setDropdownOptions(options);
  }, [options])

  const checkboxHandler = useCallback((e) => {
    if (e.target.checked) {
      setmainColumnFilter({
        field: columnName,
        operator: 1,
        value: [...checkboxButtonValue, e.target.value].join(','),
      });
    } else {
      var checkboxValues = [...checkboxButtonValue]
      const index = checkboxValues.indexOf(e.target.value);
      if (index > -1) {
        checkboxValues.splice(index, 1);
      }
      setmainColumnFilter({
        field: columnName,
        operator: 1,
        value: checkboxValues.join(','),
      });
    }
  }, [checkboxButtonValue, columnName, setmainColumnFilter]);

  const searchDropdown = useCallback((e) => {
    setDropdownOptions(() => {
      return options.filter((option, index) => {
        return e.target.value === "" || option?.label?.toLowerCase().includes(e.target?.value.toLowerCase());
      });
    });
  }, [options]);
  const clearCurrentFilter = () => {
    applyMoreFilter(columnName);
  }
  return (
    <Transition
      className={`bg-white border-y border-b-0 border-neutral-200 max-h-96 overflow-y-auto`}
      show={openDropdown}
      enter="transition ease-out duration-200 transform"
      enterStart="opacity-0 -translate-y-2"
      enterEnd="opacity-100 translate-y-0"
      leave="transition ease-out duration-200"
      leaveStart="opacity-100"
      leaveEnd="opacity-0"
    >
      <ul>
        {((!conditionalSearch || conditionalSearch) && options.length > 5) && (
          <li className="py-1 px-3 sticky top-0 bg-white border-b border-neutral-200">
            <div className="relative w-full">
              <div className="absolute h-10 mt-0 left-0 top-0 flex items-center">
                <svg
                  className="h-4 pl-4 fill-current text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
                </svg>
              </div>
              <input
                onKeyUp={searchDropdown}
                type="search"
                placeholder="Search"
                className="block w-full bg-[#f7f7fa] border-neutral-200 hover:border-neutral-300 focus:border-neutral-100 focus:ring-neutral-300 focus:shadow-lg pl-10 pr-2 py-2 rounded-md"
              />
            </div>
          </li>
        )}
        {dropdownOptions?.map((option, index) => {
          var optionName = (columnName + '_' + (option.label ? option?.label?.toLowerCase().replaceAll(" ", "_") : '') + '_' + option.value);
          return (
            <Fragment key={index}>
              <li className="py-1 px-3" key={index}>
                <label className="flex items-center">
                  <input
                    onChange={checkboxHandler}
                    type={"checkbox"}
                    name={optionName}
                    id={optionName}
                    className={`form-checkbox`}
                    value={option.value}
                    checked={checkboxButtonValue.includes(option.value.toString())}
                  />
                  <span className="text-sm font-medium ml-2">
                    {option?.label}
                  </span>
                </label>
              </li>
            </Fragment>
          );
        })}

        {dropdownOptions.length === 0 ? <li className="text-center">No record found.</li> : <li className="py-1 px-3 sticky bottom-0 bg-white mt-px">
          <button className="text-gray-500 hover:text-gray-700" type="button" onClick={clearCurrentFilter}>Clear</button>
        </li>}
      </ul>
    </Transition>
  );
};

export default CheckboxGroup;
