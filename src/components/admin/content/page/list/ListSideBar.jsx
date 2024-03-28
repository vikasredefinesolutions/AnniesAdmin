import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { Formik } from "formik";

import { contentTabs } from 'global/Enum';

import StoreService from 'services/admin/store/StoreService';
import Dropdown from "components/common/formComponent/Dropdown";

const ListSideBar = ({ activeTab, setDomainId, setAllStoreId }) => {
    const user = useSelector((state) => state.user);
    const company = useSelector((state) => state.CompanyConfiguration);
    const [dropDownOption, setdropDownOption] = useState([]);
    const [storeData, setStoreData] = useState([]);
    const [moreTools, setMoreTools] = useState(false);;

    const moreToolsRef = useRef(null);

    const initialValues = {
        domain: "0",
    };

    const getStoreDropdownData = useCallback(() => {
        if (user?.id && company?.id) {
            StoreService.getStoreByUserId({
                userid: user?.id,
                companyConfigurationId: company?.id,
                isSuperUser: user?.isSuperUser,
            })
                .then((response) => {
                    if (response?.data?.data) {
                        setStoreData(() => {
                            return response.data.data;
                        });
                    }
                })
                .catch((error) => { });
        }
    }, []);

    useEffect(() => {
        getStoreDropdownData();
    }, [getStoreDropdownData]);

    const onSubmit = (fields, { resetForm }) => { };

    useEffect(() => {
        let optionDefaultValue = contentTabs[activeTab]?.extra?.storeDefaultOption;
        let optionValue = [{ value: "0", label: optionDefaultValue }];
        let AllId = [];
        storeData?.map((value, key) => {
            optionValue = [...optionValue, { value: value.value, label: value.label }];
            AllId.push(value.value)
        });
        setdropDownOption(optionValue);
        setAllStoreId([...AllId])
    }, [activeTab, storeData]);

    useEffect(() => {
        setDomainId(95)
    }, [])

    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!moreToolsRef.current) return;
            if (!moreTools || moreToolsRef.current.contains(target))
                return;
            setMoreTools(false);
        }

        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler)
    })

    return (
        <div className="flex flex-nowrap md:block px-3 py-6 border-b md:border-b-0 md:border-r border-neutral-200 min-w-80 md:space-y-3" x-data="{ show: false}">


            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
            >
                {
                    ({ setFieldValue, errors, values }) => {
                        return (
                            <>
                                {/* <div>
                                    <div className="text-xs font-semibold text-gray-500 uppercase mb-3">Domain</div>
                                    <Dropdown
                                        label="Domain"
                                        isMulti={false}
                                        isClearable={false}
                                        defaultValue={values.domain}
                                        name="domain"
                                        className={`w-full`}
                                        options={dropDownOption}
                                        onChange={(val) => {
                                            setDomainId(val.value)
                                            setFieldValue("domain", val.value)
                                        }}
                                    />
                                </div> */}
                                <div>
                                    <ul className="flex flex-nowrap md:block mr-3 md:mr-0">
                                        <li className="mr-0.5 md:mr-0 md:mb-0.5">
                                            <a className="flex items-center px-2.5 py-2 rounded whitespace-nowrap bg-indigo-50">
                                                <span className="text-sm font-medium text-indigo-500">{dropDownOption.length > 0 ? dropDownOption[0].label : ''}</span>
                                            </a>
                                            <ul className="px-2 pl-5 py-2 mt-1">
                                                <li className="mb-3 last:mb-0">
                                                    <a className="block text-gray-500 hover:text-gray-600 transition duration-150 truncate">
                                                        <span className="bg-yellow-300 text-white rounded-full text-center w-2 h-2 items-center inline-flex mr-1">&nbsp;</span>
                                                        <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Draft</span>
                                                    </a>
                                                </li>
                                                <li className="mb-3 last:mb-0">
                                                    <a className="block text-gray-500 hover:text-gray-600 transition duration-150 truncate">
                                                        <span className="bg-slate-300 text-white rounded-full text-center w-2 h-2 items-center inline-flex mr-1">&nbsp;</span>
                                                        <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Scheduled</span>
                                                    </a>
                                                </li>
                                                <li className="mb-3 last:mb-0">
                                                    <a className="block text-gray-500 hover:text-gray-600 transition duration-150 truncate">
                                                        <span className="bg-green-500 text-white rounded-full text-center w-2 h-2 items-center inline-flex mr-1">&nbsp;</span>
                                                        <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Published</span>
                                                    </a>
                                                </li>
                                                <li className="mb-3 last:mb-0">
                                                    <a className="block text-gray-500 hover:text-gray-600 transition duration-150 truncate">
                                                        <span className="border border-neutral-300 bg-white rounded-full w-2 h-2 items-center inline-flex mr-1">&nbsp;</span>
                                                        <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Archived</span>
                                                    </a>
                                                </li>
                                                {activeTab === 1 &&
                                                    <li className="mb-3 last:mb-0">
                                                        <a className="block text-gray-500 hover:text-gray-600 transition duration-150 truncate">
                                                            <span className="border border-slate-500 bg-slate-800 rounded-full w-2 h-2 items-center inline-flex mr-1">&nbsp;</span>
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">A / B Testing</span>
                                                        </a>
                                                    </li>
                                                }
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                {activeTab !== 2 &&
                                    <div className='w-full mt-5 border-t border-neutral-300 pt-4'>
                                        <ul className='flex flex-nowrap md:block mr-3 md:mr-0'>
                                            <li className='mr-0.5 md:mr-0 md:mb-0.5 relative'>
                                                <a className='flex items-center px-2.5 py-2 rounded whitespace-nowrap'>
                                                    <span className='text-sm font-medium text-gray-500 flex items-center cursor-pointer'
                                                        ref={moreToolsRef}
                                                        onClick={() => setMoreTools((prev) => !prev)}
                                                    >
                                                        More tools
                                                        <span className='material-icons-outlined'>
                                                            expand_more
                                                        </span>
                                                    </span>
                                                </a>
                                                {moreTools === true &&
                                                    <div className='bg-white shadow border border-neutral-300 absolute top-full left-0 min-w-72 z-10'>
                                                        <ul className='p-2'>
                                                            <li className='p-2'>
                                                                <div className='text-indigo-500'>Export all pages & blog posts (HTML)</div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                }
                                            </li>
                                        </ul>
                                    </div>
                                }
                                {/* {
                                    values.domain &&
                                        values.domain !== 0 ? (
                                        <div className="w-full mt-5 border-t border-neutral-200 pt-4" x-show="show">
                                            <ul className="flex flex-nowrap md:block mr-3 md:mr-0">
                                                <li className="mr-0.5 md:mr-0 md:mb-0.5">
                                                    <Link
                                                        to={"/admin/Content/Template"}
                                                        className="flex items-center px-2.5 py-2 rounded whitespace-nowrap"
                                                    >
                                                        <span className="text-sm font-medium text-gray-500">Template</span>
                                                    </Link>
                                                </li>
                                                <li className="mr-0.5 md:mr-0 md:mb-0.5">
                                                    <Link
                                                        to={`/admin/configurator/storeconfiguration/configuration/Theme/${values.domain}`}
                                                        className="flex items-center px-2.5 py-2 rounded whitespace-nowrap"
                                                    >
                                                        <span className="text-sm font-medium text-gray-500">Edit theme configuration</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    ) : ('')
                                } */}
                            </>
                        );
                    }
                }
            </Formik>
        </div>
    )
}

export default ListSideBar