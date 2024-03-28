/*Component Name: Export
Component Functional Details:  Export .
Created By: PK Kher
Created Date: 7-19-2022
Modified By: Happy Patel
Modified Date: 12/21/2022 */

import * as Yup from "yup";
import History from './History';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from 'components/common/Tabs';
import { Formik, Form as FormikForm } from "formik";
import { ValidationMsgs } from 'global/ValidationMessages';
import { displayColumnSelection, serverError } from 'services/common/helper/Helper';
import Checkbox from 'components/common/formComponent/Checkbox';
import Dropdown from 'components/common/formComponent/Dropdown';
import Messages from "components/common/alerts/messages/Index";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { exportTabs, RecStatusValuebyName, RecStatusValueForForm } from "global/Enum"
import React, { useState, useMemo, Fragment, useCallback, useEffect } from 'react';
import ImportExportService from 'services/admin/master/master/products/ImportExportService';
import DropdownService from "services/common/dropdown/DropdownService";
import { productType } from "dummy/Dummy";
import { useParams } from "react-router-dom";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import FilterForm from "./FilterForm";
import CheckBox from "components/common/table/CheckBox";

const Export = ({ type }) => {

    const [activeTab, setActiveTab] = useState(0);
    const [showColumns, setShowColumns] = useState(false);
    const [tableColumns, setTableColumns] = useState([]);

    const [SelectedExportType, setSelectedExportType] = useState("");
    const [AllExpData, setAllExpData] = useState([]);
    const [toggleCheckbox, setToggleCheckbox] = useState(true);
    const [exportType, setExportType] = useState([]);
    const [productTypeDropdownValue, setProductTypeStatusDropdownValue] = useState([])
    const location = useSelector((store) => store?.location);
    const dispatch = useDispatch();
    const { storeId, storeID } = useParams();

    const finalStoreId = storeId ? storeId : storeID;

    const getExportdbFields = useCallback((exType, setFieldValue) => {
        let tableName = AllExpData.filter((value, i) => {
            return value.id === exType;
        })
        setSelectedExportType(tableName[0]?.tableName)
        if (exType && displayColumnSelection(tableName[0]?.tableName)) {
            dispatch(setAddLoading(true));
            ImportExportService.getExportdbFields(type, exType).then((response) => {
                let columns = response.data.data
                setFieldValue("fieldsname", columns);
                setTableColumns(columns);
                dispatch(setAddLoading(false));
            }).catch(() => {
                dispatch(setAddLoading(false));
            });
        } else {
            setTableColumns([]);
        }
    }, [AllExpData])

    const onTabClick = (e, index) => {
        e.preventDefault();
        setActiveTab(index);
    };

    const validationSchema = Yup.object({
        // recStatus: Yup.string().trim().required(ValidationMsgs.common.recStatusRequired),
        exporttype: Yup.string().trim().required(ValidationMsgs.product.export.exporttypeRequired),
    });

    const submitHandler = (fields, { resetForm }) => {
        const statusCheck = ["GrandMasterProduct", "Product", "OptionProduct", "StoreProduct", "StoreOptionProduct"].includes(SelectedExportType) === true ? [RecStatusValuebyName.Active, RecStatusValuebyName.Inactive, RecStatusValuebyName.Draft].join(",") : [RecStatusValuebyName.Active, RecStatusValuebyName.Inactive].join(",");
        const optionProductStatusCheck = ["OptionProduct", "StoreOptionProduct", "Inventory"].includes(SelectedExportType) ? (fields?.recstatusoptionproducts || [RecStatusValuebyName.Active, RecStatusValuebyName.Inactive].join(",")) : "";
        const productTypeStatusCheck = ["StoreProduct", "StoreOptionProduct", "Inventory"].includes(SelectedExportType) ? (fields?.producttypeid || 0) : 0;
        const discontinueStatusCheck = ["Product", "OptionProduct", "Inventory"].includes(SelectedExportType) ? (fields?.isDiscontinue || "false") : "false";
        
        if ((tableColumns?.length > 0 && (SelectedExportType === "Product" || SelectedExportType === "OptionProduct" || SelectedExportType === "ProductColor" || SelectedExportType === "StoreOptionProduct" || SelectedExportType === "StoreProduct") && fields?.fieldsname?.length <= 0)) {
            dispatch(setAlertMessage({
                type: 'danger',
                message: 'Please select at least one field to export.'
            }));
            return;
        }
        let filteringOptions = [{
            field: "recStatus",
            operator: 1,
            value: fields?.recStatus || statusCheck
        },
        {
            field: "brandId",
            operator: 1,
            value: ((fields?.brand && fields?.brand?.length > 0) ? fields?.brand?.join(",") : "0")
        },
        {
            field: "vendorId",
            operator: 1,
            value: ((fields?.vendor && fields?.vendor?.length > 0) ? fields?.vendor?.join(",") : "0")
        },
        {
            field: "isdiscontinue",
            operator: 1,
            value: discontinueStatusCheck /* fields?.isDiscontinue */
        },
        {
            field: "recstatusoptionproducts",
            operator: 1,
            value: optionProductStatusCheck
        },
        {
            field: "producttypeid",
            operator: 1,
            value: productTypeStatusCheck
        },]

        const object = ({
            exporttype: parseInt(fields.exporttype),
            fieldsname: fields.fieldsname/*  && fields.fieldsname.length > 0 ? fields.fieldsname : [] */,
            sourceId: type,
            storeId: [productType.EcommerceStore].includes(type) ? parseInt(finalStoreId) : 0,
            newargs: {
                pageIndex: 0,
                pageSize: 0,
                pagingStrategy: 0,
                sortingOptions: [],
                filteringOptions: filteringOptions
            },
            exportotherdetailmodel: location

        });
        if (object.exporttype !== 0) {
            dispatch(setAddLoading(true))
            ImportExportService.exportData(object).then((response) => {
                if (response?.data?.success && response?.data?.data) {
                    window.location.href = response.data.data;
                    dispatch(
                        setAlertMessage({
                            type: "success",
                            message: ValidationMsgs.product.export.exportSuccess,
                        })
                    );
                } else {
                    dispatch(setAlertMessage({ type: "danger", message: serverError(response) }));
                }
                dispatch(setAddLoading(false))
            }).catch(err => {
                dispatch(
                    setAlertMessage({
                        type: "danger",
                        message: ValidationMsgs.product.export.exportFailed,
                    })
                );
                dispatch(setAddLoading(false))
            });
        } else {
            dispatch(
                setAlertMessage({
                    type: "danger",
                    message: ValidationMsgs.product.import.ExportTypeError,
                })
            );
        }
    }

    const toggleModulesAllCheckbox = (e, setFieldValue) => {
        setToggleCheckbox((prev) => !prev);
        let checkAll = [];
        if (e.target.checked) {
            setFieldValue("fieldsname", tableColumns);
        } else {
            setFieldValue("fieldsname", checkAll)
        }
    };

    useEffect(() => {
        DropdownService.getDropdownValues("producttype", false, 0).then(
            (response) => {
                if (response?.data?.success && response.data.data) {
                    setProductTypeStatusDropdownValue(response.data.data);
                }
            }).catch(() => { });
    }, [])

    useEffect(() => {
        /* Select Export type Inventory after remove two product sub type (Gift Card , Decorated) */
        if (SelectedExportType === "Inventory") {
            const temp = productTypeDropdownValue.filter((data) => (!["Gift Card", "Decorated"].includes(data.label)));
            setProductTypeStatusDropdownValue(temp);
        }
    }, [SelectedExportType])

    return (
        <>
            <title>Export</title>
            <div >
                <div className="bg-white shadow-xxl rounded-md mb-8">
                    <div className="w-full bg-white shadow-xxl rounded-md mb-8 pt-8">
                        <div className='p-4'>
                            <Tabs
                                options={useMemo(() =>
                                    exportTabs.map((value) => {
                                        return {
                                            id: value.id,
                                            label: value.typeName,
                                            value: value.typeName,
                                        };
                                    })
                                )}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                                onTabClick={onTabClick}
                            />
                        </div>
                        <Messages />
                        {activeTab === 0 && <div className={''}>
                            <Formik
                                enableReinitialize={true}
                                initialValues={{
                                    brand: [],
                                    vendor: [],
                                    recStatus: '',
                                    fieldsname: [],
                                    exporttype: "",
                                    optProductStatus: 'A',
                                    isDiscontinue: 'false',
                                    recstatusoptionproducts: '',
                                    producttypeid: '',
                                }}
                                validationSchema={validationSchema}
                                onSubmit={submitHandler}
                            >
                                {({ errors, setFieldValue, values }) => {
                                    return (
                                        <FormikForm>
                                            <div className="import-step import-step-1">
                                                <div className='p-6 grid grid-cols-1 lg:grid-cols-2 gap-6'>
                                                    <FilterForm type={type} setAllExpData={setAllExpData} getExportdbFields={getExportdbFields} setParentExportType={setExportType} SelectedExportType={SelectedExportType} />
                                                    {(SelectedExportType === "OptionProduct" || SelectedExportType === "StoreOptionProduct" || SelectedExportType === "Inventory") &&
                                                        <div>
                                                            <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Option Product Status <span className="text-rose-500 text-2xl leading-none"></span></div>
                                                            <Dropdown options={RecStatusValueForForm} placeholder="All" name={"recstatusoptionproducts"} defaultValue={values.recstatusoptionproducts} />
                                                        </div>
                                                    }
                                                    {(SelectedExportType === "Product" || SelectedExportType === "OptionProduct" || SelectedExportType === "Inventory") &&
                                                        <div>
                                                            <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Discontinue <span className="text-rose-500 text-2xl leading-none">*</span></div>
                                                            <Dropdown isClearable={false} options={[{ label: "Yes", value: 'true', }, { label: "No", value: 'false' }]} name={'isDiscontinue'} defaultValue={values.isDiscontinue} />
                                                        </div>
                                                    }
                                                    {(SelectedExportType === "StoreProduct" || SelectedExportType === "StoreOptionProduct" || SelectedExportType === "Inventory") &&
                                                        <div>
                                                            <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Product Sub Type <span className="text-rose-500 text-2xl leading-none"></span></div>
                                                            <Dropdown options={productTypeDropdownValue} placeholder={"All"} name={"producttypeid"} defaultValue={values.producttypeid} />
                                                        </div>
                                                    }

                                                </div>
                                                {(tableColumns?.length > 0 && displayColumnSelection(SelectedExportType)) &&
                                                    <div className="p-6 pt-0 flex items-center space-x-2">
                                                        <span className="btn px-6 bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer" onClick={() => setShowColumns((prev) => !prev)}>Select Fields</span>
                                                    </div>
                                                }
                                            </div>

                                            <div className={`import-step import-step-2`}>
                                                {(tableColumns?.length > 0 && displayColumnSelection(SelectedExportType)) &&

                                                    <div className={`p-6 pt-0 ${showColumns ? 'hidden' : 'visible'}`}>
                                                        <div className="mb-6 last:mb-0">
                                                            <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"> Select Column <span className="text-rose-500 text-2xl leading-none">*</span></label>
                                                            {tableColumns?.length > 0 &&
                                                                <div className='mb-5'>
                                                                    <CheckBox indeterminate={values?.fieldsname?.length > 0 && values.fieldsname?.length < tableColumns?.length} name="toggleCheckbox" id={'toggleCheckbox'} label={"checkAll"} checked={values?.fieldsname?.length === tableColumns.length} onChange={(e) => { toggleModulesAllCheckbox(e, setFieldValue) }} />
                                                                    <label className="ml-2 inline-block" htmlFor={'toggleCheckbox'}>Check All</label>
                                                                </div>
                                                            }
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                                                {tableColumns && tableColumns.map((tableValue, index) => {
                                                                    return (
                                                                        <Fragment key={index}>
                                                                            <div>
                                                                                <Checkbox label={tableValue} id={`fieldsname[${index}]`} value={tableValue} name={`fieldsname[${index}]`}
                                                                                    onChange={(e) => {
                                                                                        if (e.target.checked) {
                                                                                            setFieldValue('fieldsname', [...values.fieldsname, e.target.value])
                                                                                        } else {
                                                                                            let tempColumns = values.fieldsname.filter(value => e.target.value !== value);
                                                                                            setFieldValue('fieldsname', tempColumns);
                                                                                        }
                                                                                    }} checked={values.fieldsname.includes(tableValue)} />
                                                                            </div>
                                                                        </Fragment>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                                <div className="p-4 flex items-center justify-end space-x-2 border-t-2 border-neutral-200">
                                                    <button type='submit' className="btn px-6 bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer">Download Data</button>
                                                </div>
                                            </div>
                                        </FormikForm>
                                    )
                                }}
                            </Formik>

                        </div>}
                        {activeTab === 1 && <div className={''}>
                            <History exportType={exportType} type={type} />
                        </div>}

                    </div>
                </div>
            </div>
        </>
    );
};

export default Export;
