import React, { useState, useEffect } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { paginateArray } from "services/common/helper/Helper"

const ReactSelectPaginate = ({ defaultValue, options, name, isMulti = false, onChange, isSearchable = false, values }) => {

    const [defaultValueObj, setdefaultValueObj] = useState([])
    const [FilteredOption, setFilteredOption] = useState([])

    useEffect(() => {
        // console.log("options options ", options);
        setFilteredOption([])
        if (options && options.length) {

            const allFoundObj = []

            if (defaultValue && defaultValue.length && (typeof defaultValue[0] == "number" || typeof defaultValue[0] == "string")) {
                defaultValue.map((value) => {
                    const myresult = options.find((currentObj) => {
                        return currentObj.value == value
                    })

                    if (myresult) {
                        allFoundObj.push(myresult)
                    }
                })
                setdefaultValueObj(allFoundObj)
            } else {
                setdefaultValueObj(defaultValue)
            }


            const filteredOption = options.filter((obj) => obj.label.trim())

            // if (FilteredOption.length !== filteredOption.length) {
            setFilteredOption(filteredOption)
            // }

            // const OptionWithLimitedVal = paginateArray(filteredOption, 2, 1)
            // setAllOptions(OptionWithLimitedVal)
        }
    }, [options, values?.storeId, defaultValue])

    const LoadMoreFunc = (searchQuery, loadedOptions, { page }) => {

        if (searchQuery) {
            const myFoundObj = FilteredOption.filter((singleCusObj) => singleCusObj.label.toLowerCase().includes(searchQuery.toLowerCase()))

            // setAllOptions(myFoundObj)

            return {
                options: myFoundObj,
                hasMore: false,
                additional: {
                    page: 1,
                }
            }
        } else {
            const OptionWithLimitedVal = paginateArray(FilteredOption, 2 * page, page)

            return {
                options: OptionWithLimitedVal,
                hasMore: (loadedOptions.length < FilteredOption.length) ? true : false,
                additional: {
                    page: page + 1,
                }
            }
        }
    }

    return (
        <div>
            {(FilteredOption && FilteredOption.length) ? <AsyncPaginate
                id={name}
                loadOptions={LoadMoreFunc}
                value={defaultValueObj}
                getOptionValue={(option) => option.value}
                getOptionLabel={(option) => option.label}
                onChange={onChange}
                additional={{ page: 1 }}
                isSearchable={isSearchable}
                isMulti={isMulti}
                placeholder="Select an option"
                debounceTimeout={1000}
            /> : <p className="flex justify-start items-center p-5 rounded-t border-b sticky top-0 left-0 text-red-600 bg-white">No customer found inside this store.</p>}

        </div>
    );
};

export default ReactSelectPaginate;
