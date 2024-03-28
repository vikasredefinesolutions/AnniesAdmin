/*Component Name: CommonFields
Component Functional Details: User can create or update CommonFields from here.
Created By: Happy
Created Date: 08/08/2022
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import Dropdown from 'components/common/formComponent/Dropdown';
import Input from 'components/common/formComponent/Input';
import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import CountryService from 'services/admin/country/CountryService';
import StateService from 'services/admin/state/StateService';

const CommonFields = ({ index }) => {
    const { values, setFieldValue } = useFormikContext();

    const [country, setCountry] = useState([]);
    const [state, setState] = useState([]);
    const getCountry = () => {
        CountryService.getCountryWithCode().then((response) => {
            if (response?.data?.success && response?.data?.data) {
                setCountry(() => {
                    return response?.data?.data?.map(value => {
                        return {
                            ...value,
                            label: value.name,
                            value: value.name,
                            countryCode: value.countryCode,
                        }
                    })
                });
            }
        }).catch(() => { });
    }

    const getState = (countryName) => {
        if (countryName) {
            StateService.getStateByCountryName(countryName).then((response) => {
                if (response?.data?.success && response?.data?.data) {
                    let StateData = response?.data?.data?.map(value => {
                        return {
                            label: value.label,
                            value: value.label,
                        }
                    })
                    setState([{
                        label: "Other",
                        value: "Other",
                    }, ...StateData]);
                }
            }).catch(() => { });
        } else {
            setState([]);
        }
    }

    useEffect(() => {
        getCountry();
    }, []);

    useEffect(() => {
        if (values?.customerAddress[index].postalCode) {
            StateService.getLocationDataBasedOnZipCode(values?.customerAddress[index].postalCode)
                .then((response) => {
                    if (response?.data?.success && response?.data?.data) {
                        const { cityName, countryId, countryName, stateName } = response?.data?.data;
                        getState(countryName);
                        if (cityName) {
                            setFieldValue(`customerAddress[${index}].city`, cityName)
                        }
                        if (countryName) {
                            setFieldValue(`customerAddress[${index}].countryName`, countryName)
                        }
                        if (countryName) {
                            setFieldValue(`customerAddress[${index}].state`, stateName)
                        }
                    }
                })
                .catch(() => { });
        }
    }, [values?.customerAddress[index].postalCode]);

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div >
                    {"First Name"}
                    <span className="text-rose-500 text-2xl leading-none">
                        *
                    </span>
                    <Input type="text" name={`customerAddress[${index}].firstname`} />
                </div>
                <div >
                    {"Last Name"}
                    <span className="text-rose-500 text-2xl leading-none">
                        *
                    </span>
                    <Input type="text" name={`customerAddress[${index}].lastName`} />
                </div>
                <div >
                    {"Email"}
                    <span className="text-rose-500 text-2xl leading-none">
                        *
                    </span>
                    <Input type="text" name={`customerAddress[${index}].email`} />
                </div>
                <div >
                    {"Address 1"}
                    <span className="text-rose-500 text-2xl leading-none">
                        *
                    </span>
                    <Input type="text" name={`customerAddress[${index}].address1`} />
                </div>
                <div >
                    {"Address 2"}
                    <Input type="text" name={`customerAddress[${index}].address2`} />
                </div>
                <div >
                    {"Apt/Suite#"}
                    <Input type="text" name={`customerAddress[${index}].suite`} />
                </div>
                <div >
                    {"City"}
                    <span className="text-rose-500 text-2xl leading-none">
                        *
                    </span>
                    <Input type="text" name={`customerAddress[${index}].city`} />
                </div>
                <div >
                    {"Country"}
                    <span className="text-rose-500 text-2xl leading-none">
                        *
                    </span>
                    {/* <Input type="text" name={`customerAddress[${index}].countryName`} /> */}
                    <Dropdown
                        options={country}
                        defaultValue={values.customerAddress[index].countryName || ''}
                        name={`customerAddress[${index}].countryName`}
                        onChange={(e) => {
                            setFieldValue(`customerAddress[${index}].countryName`, (e ? e.value : ''));
                            getState(e?.value);
                            setFieldValue(`customerAddress[${index}].state`, '');
                        }}
                    />
                </div>
                <div >
                    {"State"}
                    <span className="text-rose-500 text-2xl leading-none">
                        *
                    </span>
                    {/* <Input type="text" name={`customerAddress[${index}].state`} /> */}
                    <Dropdown
                        options={state}
                        defaultValue={values.customerAddress[index].state || ''}
                        name={`customerAddress[${index}].state`}
                        onChange={(e) => {
                            setFieldValue(`OtherStateCheck`, false);
                            setFieldValue(`customerAddress[${index}].state`, (e ? e.value : ''));
                        }}
                    />
                </div>
                <div >
                    {values.customerAddress[index].state === "Other" &&
                        <div >
                            {"Other State"}
                            <span className="text-rose-500 text-2xl leading-none">
                                *
                            </span>
                            <Input type="text" name={`customerAddress[${index}].OtherState`} maxLength={200}
                                onChange={(e) => {
                                    setFieldValue(`OtherStateCheck`, true);
                                    setFieldValue(`customerAddress[${index}].OtherState`, (e ? e.target.value : ''));
                                }}
                            />
                        </div>
                    }
                </div>
                <div >
                    {"Country Code "}
                    <Input type="text" name={`customerAddress[${index}].countryCode`} maxLength={3} />
                </div>

                <div >
                    {"Postal Code "}
                    <span className="text-rose-500 text-2xl leading-none">
                        *
                    </span>
                    <Input type="text" name={`customerAddress[${index}].postalCode`} maxLength={6} />
                </div>
                <div >
                    {"Phone"}
                    <span className="text-rose-500 text-2xl leading-none">
                        *
                    </span>
                    <Input type="text" name={`customerAddress[${index}].phone`} maxLength={15} />
                </div>
                <div >
                    Fax
                    <Input name={'fax'} type="text" placeholder="000-000-0000" />
                </div>
            </div>
        </>
    );
};

export default CommonFields;
