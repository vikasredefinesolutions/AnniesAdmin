/*Component Name: FilterForm
Component Functional Details:  FilterForm .
Created By: PK Kher
Created Date: <Creation Date>
Modified By: PK Kher
Modified Date: <Modified Date> */

import React, { useState, useEffect } from 'react';
import { useFormikContext } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from 'components/common/formComponent/Dropdown';
import { RecStatusValueForForm } from "global/Enum"
import ImportExportService from 'services/admin/master/master/products/ImportExportService';
import { productType } from "dummy/Dummy";
import { useParams } from "react-router-dom";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import BrandService from "services/admin/brand/BrandService";
import VendorService from "services/admin/vendor/VendorService";
import StoreBrandService from "services/admin/master/store/brand/BrandService"

const FilterForm = ({ type, setAllExpData, getExportdbFields, setParentExportType, SelectedExportType }) => {
    const permission = useSelector((store) => store.permission);
    const { values, setFieldValue } = useFormikContext();
    const [brands, setBrands] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [exportType, setExportType] = useState([]);
    const [recStatusDropDownValues, setRecStatusDropDownValues] = useState([]);
    const { storeId, storeID } = useParams();

    const finalStoreId = storeId ? storeId : storeID;

    const dispatch = useDispatch();
    const getBrandOptions = (vendorId = [0]) => {
        if (![productType.EcommerceStore, productType.CorporateStore, productType.StoreBuilderStoreType].includes(type) && !finalStoreId) {
            BrandService.getMultipleVendorsWiseBrandForMaster({ vendorIds: vendorId }).then((res) => {
                if (res?.data?.success && res?.data?.data) {
                    setBrands(res?.data?.data);
                }
            }).catch(() => { });
        }
        else if (finalStoreId) {
            StoreBrandService.getBrandsByVendors({ storeId: finalStoreId, vendorIds: vendorId }).then((res) => {
                if (res.data.success) {
                    setBrands(res.data.data);
                }
            });
        }
    }
    const getVendorsOptions = (brandIds = [], selectedVendorOptions = [], setFieldValue) => {
        let API = ![productType.EcommerceStore, productType.CorporateStore, productType.StoreBuilderStoreType].includes(type) ? VendorService.getMultipleVendorsBrandWiseForMaster : VendorService.getMultipleVendorsBrandWiseForStore;

        if (brandIds.length > 0) {
            dispatch(setAddLoading(true));
            API({ storeId: (finalStoreId || 0), brandIds: brandIds })
                .then((res) => {
                    if (res?.data?.success && res?.data?.data) {
                        setVendors(res.data.data);
                        //to remove vendor that not associate with brands
                        if (selectedVendorOptions.length > 0 && setFieldValue instanceof Function) {
                            let optionsValues = res?.data?.data?.map((value) => value?.value);
                            setFieldValue('vendor', selectedVendorOptions.filter(value => optionsValues.includes(value)));
                        }
                    }
                    dispatch(setAddLoading(false));
                }).catch(() => {
                    dispatch(setAddLoading(false));
                });
        } else {
            setVendors([]);
        }
    }
    useEffect(() => {
        const eCommerceExportTypeCheck = [productType.CorporateStore, productType.StoreBuilderStoreType, productType.StoreBuilder, productType.FormBuilder, productType.Bundle].includes(type);

        getBrandOptions();
        getVendorsOptions();

        if (type !== undefined) {
            ImportExportService.getExportTypes(type, true).then((response) => {
                let options = []
                const res = response.data.data;
                if (res && res.length > 0) {
                    res.map((data, index) => {
                        options = [...options, { label: data.tableName, value: data.id }]
                    })
                }
                setAllExpData(res)
                setExportType(options);
                if (eCommerceExportTypeCheck === true) {
                    /* This two export type (StoreProductSeo,StoreAlterImageTag) show only Ecommerce Store , another store remove*/
                    const exportStatusCheck = options.filter((data) => (!["StoreProductSeo", "StoreAlterImageTag"].includes(data.label)));
                    setExportType(exportStatusCheck);
                }
                setParentExportType(() => {
                    return res.map((value) => value.tableName);
                });
            }).catch(() => { })
        }
    }, [type]);

    useEffect(() => {
        const statusCheck = ["GrandMasterProduct", "Product", "OptionProduct", "StoreProduct", "StoreOptionProduct"].includes(SelectedExportType);
        if (statusCheck === true) {
            setRecStatusDropDownValues([...RecStatusValueForForm, { label: "Draft", value: "D" }])
        } else {
            if (values && values?.recStatus === "D") {
                setFieldValue("recStatus", "");
            }
            setRecStatusDropDownValues(RecStatusValueForForm);
        }
    }, [SelectedExportType])

    return (
        <>
            <div>
                <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Brand Name </div>
                <Dropdown options={brands} name={'brand'} isMulti={true} defaultValue={values.brand} onChange={(e) => {
                    let data = e.map(value => value.value);
                    setFieldValue('brand', data);
                    getVendorsOptions(data, values?.vendor, setFieldValue);
                }}
                    placeholder='All Brands'
                    isDisabledOnly={(permission?.isView || permission?.isEdit || permission?.isDelete)}
                />
            </div>
            <div>
                <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Vendor Name  </div>
                <Dropdown options={vendors} name={'vendor'} isMulti={true} defaultValue={values.vendor} onChange={(e) => {
                    let data = e.map(value => value.value);
                    setFieldValue('vendor', data);

                }}
                    placeholder='All Vendors'
                    isDisabledOnly={(permission?.isView || permission?.isEdit || permission?.isDelete)}
                />
            </div>
            <div>
                <div className="text-xs font-semibold text-gray-500 uppercase mb-2" >Export Type <span className="text-rose-500 text-2xl leading-none">*</span></div>
                <Dropdown options={exportType} name={'exporttype'} defaultValue={values.exporttype} isClearable={false}
                    isDisabledOnly={(permission?.isView || permission?.isEdit || permission?.isDelete)}
                    onChange={(data) => {
                        if (data) {
                            setFieldValue(`exporttype`, data.value);
                            if (getExportdbFields instanceof Function) {
                                getExportdbFields(data.value, setFieldValue)
                            }
                        } else {
                            setFieldValue(`exporttype`, 0);
                        }
                    }} />
            </div>
            <div>
                <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Status  <span className="text-rose-500 text-2xl leading-none"></span></div>
                <Dropdown options={recStatusDropDownValues} name={'recStatus'} defaultValue={values.recStatus} placeholder="All"
                    isDisabledOnly={(permission?.isView || permission?.isEdit || permission?.isDelete)}
                />
            </div>

        </>
    );
};

export default FilterForm;
