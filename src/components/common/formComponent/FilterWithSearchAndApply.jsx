/*Component Name: FilterWithSearchAndApply
Component Functional Details: User can create or update FilterWithSearchAndApply master details from here.
Created By: chandan
Created Date: <Creation Date>
Modified By: chandan
Modified Date: <Modified Date> */

import React, { useState, Fragment, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery, fillSerchQuery } from "redux/searchQueryForMGS/SearchQueryAction";

const FilterWithSearchAndApply = ({ setBrandFilter, options, columnName, setColumnFilteringOptions, setData }) => {
    const dispatch = useDispatch();
    const searchQuery = useSelector((store) => store?.SearchQueryReducers);

    const brandDropDownRef = useRef(null)

    const [checkBoxState, setcheckBoxState] = useState([])
    const [DropdownOptions, setDropdownOptions] = useState(options)
    const [handleShowBrandDropDown, sethandleShowBrandDropDown] = useState(false)

    useEffect(() => {
        setBrandFilter(checkBoxState)
    }, [checkBoxState]);

    const checkboxHandler = (e) => {
        if (e.target.checked) {
            setcheckBoxState((prevVal) => [
                ...prevVal,
                e.target.value
            ]);
        } else {
            var checkboxValues = [...checkBoxState]
            const index = checkboxValues.indexOf(e.target.value);
            if (index > -1) {
                checkboxValues.splice(index, 1);
            }
            setcheckBoxState(checkboxValues);
        }
    }

    const searchDropdown = useCallback((e) => {
        setDropdownOptions(() => {
            return options.filter((option, index) => {
                return e.target.value === "" || option?.label?.toLowerCase().includes(e.target?.value.toLowerCase());
            });
        });
    }, [options]);

    const applyMoreFilter = () => {
        let tempFilter = ""
        checkBoxState.map((brandId) => {
            tempFilter += `${tempFilter ? "," + brandId : brandId}`
        })

        setColumnFilteringOptions([{ field: "brandId", operator: 1, value: tempFilter }])
        sethandleShowBrandDropDown(false)

        if (searchQuery.searchQuery) {
            dispatch(setSearchQuery(""))
            dispatch(fillSerchQuery(true))

        }
    }

    const clearMainFilter = () => {
        setcheckBoxState([])
        setData([])
        setColumnFilteringOptions([])
        sethandleShowBrandDropDown(false)
    }

    const handleClickOutside = (e) => {
        if (brandDropDownRef.current && !brandDropDownRef.current.contains(e.target)) {
            sethandleShowBrandDropDown(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [brandDropDownRef])

    useEffect(() => {
        setDropdownOptions(options)
    }, [options])

    return <>

        <div className="inline-flex rounded-md shadow-sm" role="group" ref={brandDropDownRef}>
            <div className="relative inline-flex">
                <button className="flex flex-wrap items-center text-sm px-3 py-2 bg-white border border-neutral-200 text-gray-500 hover:text-gray-700 rounded-md handleShowBrandDropDown" onClick={() => sethandleShowBrandDropDown((prev) => !prev)}>
                    <span className={`material-icons-outlined`}>{handleShowBrandDropDown ? "filter_alt_off" : "filter_alt"}</span>
                    <span className="ml-1">Select Brand</span>
                    <span className='pl-1'>{checkBoxState && checkBoxState.length ? `(${checkBoxState.length})` : "(0)"}</span>
                    <wbr />
                </button>

                <div className={`${!handleShowBrandDropDown && "hidden"}`}>

                    <div className="origin-top-left z-30 absolute top-full max-h-96 h-screen overflow-y-auto left-0 min-w-72 bg-white border border-neutral-200 rounded shadow-lg overflow-hidden mt-1">
                        <ul className='relative h-full'>
                            <li className="py-1 px-3 sticky top-0 bg-white border-b border-neutral-200">
                                <div className="relative w-full">
                                    <div className="absolute h-10 mt-0 left-0 top-0 flex items-center">
                                        <svg className="h-4 pl-4 fill-current text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"> <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"> </path>
                                        </svg>
                                    </div>
                                    <input
                                        onKeyUp={searchDropdown}
                                        type="input"
                                        placeholder="Search"
                                        className="block w-full bg-[#f7f7fa] border-neutral-200 hover:border-neutral-300 focus:border-neutral-100 focus:ring-neutral-300 focus:shadow-lg pl-10 pr-2 py-2 rounded-md"
                                    />
                                </div>
                            </li>
                            <li className="py-1 px-3 select-none cursor-pointer min-h-[250px] max-h-[250px] overflow-scroll scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-300" >
                                {DropdownOptions.length > 0 ? DropdownOptions?.map((option, index) => {
                                    var optionName = (columnName + '_' + (option.label ? option?.label?.toLowerCase().replaceAll(" ", "_") : '') + '_' + option.value);
                                    return (
                                        <Fragment key={index}>

                                            <label className="flex items-center cursor-pointer">
                                                <input
                                                    onChange={checkboxHandler}
                                                    type={"checkbox"}
                                                    name={optionName}
                                                    id={optionName}
                                                    className={`form-checkbox cursor-pointer`}
                                                    value={option.value}
                                                    checked={checkBoxState.includes(option.value.toString())}
                                                />
                                                <span className="text-sm font-medium ml-2 cursor-pointer">
                                                    {option?.label}
                                                </span>
                                            </label>

                                        </Fragment>
                                    );
                                }) : <div className='flex items-center justify-center h-2/3'> <div>No Option Found.</div> </div>}
                            </li>
                            <li className=" py-2 px-3 absolute inset-x-0 bottom-0 border-l border-t border-neutral-200 bg-slate-50 ">
                                <div className="flex items-center justify-between">
                                    <button
                                        className="btn bg-white border-neutral-200 text-gray-500 hover:text-gray-700"
                                        onClick={clearMainFilter}
                                    >
                                        Clear
                                    </button>
                                    <button
                                        className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                                        onClick={applyMoreFilter}
                                    >
                                        Apply
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default FilterWithSearchAndApply;
