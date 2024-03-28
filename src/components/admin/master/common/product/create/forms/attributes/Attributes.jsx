/*Component Name: Attributes
Component Functional Details: User can create or update Attributes master details from here.
Created By: <Your Name>
Created Date: <Creation Date>
Modified By: chandan
Modified Date: 16/12/2022  */

import React, { useState, useCallback, useEffect, useRef, Fragment } from "react";
import { Formik, Form as FormikForm, FieldArray } from "formik";
import * as Yup from "yup";
import { ProductAttributeTypeValues, RecStatusValuebyName } from "global/Enum";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { useDispatch, useSelector } from "react-redux";
import { serverError } from "services/common/helper/Helper";
import AttributeImages from "./AttributeImages";
import AttributeDetails from "./AttributeDetails";
import MasterAttributesService from "services/admin/master/master/products/attribute/AttributesService";
import GrandMasterAttributesService from "services/admin/master/grandMaster/products/attribute/AttributesService";
import StoreAttributesService from "services/admin/master/store/product/attribute/AttributesService";
import StoreSyncModal from "./StoreSync/StoreSyncModal";
import { productType } from "dummy/Dummy";
import MasterAttributeImageService from "services/admin/master/master/products/attribute/AttributeImageService";
import GrandMasterAttributeImageService from "services/admin/master/grandMaster/products/attribute/AttributeImageService";
import StoreAttributeImageService from "services/admin/master/store/product/attribute/AttributeImageService";
import MasterAttributeCombinationService from "services/admin/master/master/products/attribute/AttributeCombinationService";
import GrandMasterAttributeCombinationService from "services/admin/master/grandMaster/products/attribute/AttributeCombinationService";
import StoreAttributeCombinationService from "services/admin/master/store/product/attribute/AttributeCombinationService";
import AttributeCombination from "./AttributeCombination";
import { ValidationMsgs } from "global/ValidationMessages";
import ReactTooltip from "react-tooltip";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import UnsavedFormHandler from "../UnsavedFormHandler";
import ErrorHandler from "../ErrorHandler";

const Attributes = ({ setFormSubmit, values, activeTab, index, readOnly, type, user, isAddMode, productId, moduleName, getProductReadinessData, getValidationForAllFilledFieldsFunc, checkProductStatus,
    setsaveUnSavedFields, setWishedToChangeTab, clearCacheForBrandCategory, setProductAttributeLength }) => {
    const permission = useSelector(store => store.permission);
    const valueByID = values;
    const formRef = useRef();
    const [checkerror, setCheckError] = useState(false);
    const [OpenStoreModal, setOpenStoreModal] = useState(false);
    const [ImageData, setImageData] = useState([]);
    const [CombinationData, setCombinationData] = useState([]);
    const [initialValues, setInitialValues] = useState([]);
    const [StoreSync, setStoreSync] = useState(false);
    const [IsEditDisable, setIsEditDisable] = useState(false);
    const dispatch = useDispatch();
    const location = useSelector((store) => store?.location);
    const [AttrOptionCount, setAttrOptionCount] = useState([]);

    const [AttributesOption, setAttributesOption] = useState();
    const [SyncModalObject, setSyncModalObject] = useState(
        {
            attributeId: 0,
            attributeOptions: 0,
            storeList: []
        }
    );
    const API = (type === productType.MC ? MasterAttributesService : type === productType.GMC ? GrandMasterAttributesService : StoreAttributesService)
    const ImageAPI = (type === productType.MC ? MasterAttributeImageService : type === productType.GMC ? GrandMasterAttributeImageService : StoreAttributeImageService)
    const CombinationAPI = (type === productType.MC ? MasterAttributeCombinationService : type === productType.GMC ? GrandMasterAttributeCombinationService : StoreAttributeCombinationService)

    useEffect(() => {
        if (activeTab === index) {
            setFormSubmit(formRef.current);
        }
    }, [formRef, setFormSubmit, activeTab]);

    const getAttributeData = useCallback(() => {
        let temp = [];

        API.getAttributesByID(productId)
            .then((res) => {
                var response = res.data;
                if (response.success && response.data.length > 0) {
                    setProductAttributeLength((res?.data?.data?.length > 0 || res?.data?.data?.[0]?.productAttributeOptionsList?.length > 0) ? true : false)
                    response.data.map((data, index) => {
                        temp = [...temp, { id: data.id, atributeId: data.atributeId, attributeFlag: data.attributeFlag, productId: data.productId, parentId: data.parentId, productName: data.productName, recStatus: data.recStatus, rowVersion: data.rowVersion, productAttributeOptionsList: data.productAttributeOptionsList }];
                    });
                } else {
                    temp = [...temp, { id: 0, atributeId: 0, attributeFlag: false, productId: productId, productName: "", parentId: parentID, recStatus: RecStatusValuebyName.Active, rowVersion: null, productAttributeOptionsList: [] }]
                }
                setInitialValues(temp);
            }).catch((err) => { });
    }, [productId, activeTab]);

    useEffect(() => {
        getAttributeData();
    }, [productId, activeTab]);

    useEffect(() => {
        if (SyncModalObject?.storeList?.length > 0 && SyncModalObject.storeList !== null && StoreSync) {
            handleStoreSyncModal()
        }
    }, [SyncModalObject]);

    const validationSchema = Yup.object().shape({
        productAttributeModel: Yup.array().of(
            Yup.object().shape({
                atributeId: Yup.number().required(ValidationMsgs.masterCatalog.attributes.optionNameRequired),
                productAttributeOptionsList: Yup.array().of(
                    Yup.object().shape({
                        value: Yup.string().trim().required(ValidationMsgs.masterCatalog.attributes.optionValueRequired),
                        suffix: Yup.string().trim().required(ValidationMsgs.masterCatalog.attributes.suffixRequired),
                        displayOrder: Yup.string().trim().required(ValidationMsgs.masterCatalog.attributes.displayOrderRequired),
                    })
                ).min(1, "Please create product variation."),
            })
        ).min(1, "Please create product variation."),
    });
    let parentID = 0;

    const handleAttribute = (fields, resetForm) => {

        const RemoveDeleted = fields.productAttributeOptionsList.filter((ActiveInactive) => ActiveInactive.recstatus !== "R")
        dispatch(setAddLoading(true))

        if (initialValues && initialValues !== undefined) {
            parentID = initialValues?.slice(-1)[0].id || 0;
        }

        if (fields?.id === 0) {
            API.createAttributes({
                productAttributeModel:
                    { ...fields, parentId: parentID, productAttributeOptionsList: RemoveDeleted, ...location }
            }).then((response) => {
                if (response.data.success) {
                    dispatch(
                        setAlertMessage({
                            type: "success",
                            message: ValidationMsgs.attributes.attributeCreated,
                        })
                    );
                    getAttributeData();
                    getCombinationData();
                    getProductReadinessData();
                    clearCacheForBrandCategory();
                } else {
                    dispatch(setAlertMessage({ type: "danger", message: serverError(response) }));
                    getCombinationData();
                }
                dispatch(setAddLoading(false))
                // getValidationForAllFilledFieldsFunc()
            }).catch((errors) => {
                dispatch(
                    setAlertMessage({
                        type: "danger",
                        message: ValidationMsgs.attributes.attributeNotCreated,
                    })
                );
                getCombinationData();
                dispatch(setAddLoading(false))

            });
        }
        else {
            const RemoveDeletedBlank = fields.productAttributeOptionsList.filter((ActiveInactive) => ActiveInactive.recstatus !== "R")
            const DeletedData = fields.productAttributeOptionsList.filter((ActiveInactive) => ActiveInactive.recstatus === "R" && ActiveInactive.id !== 0)

            let data = [];
            data.push(...RemoveDeletedBlank, ...DeletedData)

            let SubmitData = data.map((seasonalSkuData) => {
                if (seasonalSkuData.seasonalSku === null) {
                    seasonalSkuData.seasonalSku = ""
                }
                return seasonalSkuData
            })

            API.updateAttributes({
                productAttributeModel:
                    { ...fields, productAttributeOptionsList: SubmitData, ...location }
            }).then((response) => {
                if (response.data.success) {
                    dispatch(
                        setAlertMessage({
                            type: "success",
                            message: ValidationMsgs.attributes.attributeUpdated,
                        })
                    );
                    getAttributeData()
                    getCombinationData()
                    getProductReadinessData();
                    clearCacheForBrandCategory();
                } else {
                    dispatch(setAlertMessage({ type: "danger", message: serverError(response) }));
                    getCombinationData();
                    resetForm();
                }
                // getValidationForAllFilledFieldsFunc()
                dispatch(setAddLoading(false))
            }).catch((errors) => {
                dispatch(
                    setAlertMessage({
                        type: "danger",
                        message: ValidationMsgs.attributes.attributeNotUpdated,
                    })
                );
                getCombinationData();
                dispatch(setAddLoading(false))
            });
        }
    }
    useEffect(() => {
        getCombinationData()
    }, [activeTab])

    const getCombinationData = useCallback(() => {
        dispatch(setAddLoading(true))
        ImageAPI.getAttributeImagesByID({
            productTypeValues: ProductAttributeTypeValues.WithAttribute,
            productId: productId
        }).then((response) => {
            if (response.data.success) {
                setImageData(response.data.data)
            }
        }).catch((errors) => {
            dispatch(setAddLoading(false))
        });

        CombinationAPI.getAttributeCombinationByID(productId).then((response) => {
            if (response.data.success) {
                setCombinationData(response.data.data)
            }
            dispatch(setAddLoading(false))
        }).catch((errors) => {
            dispatch(setAddLoading(false))
        });
    }, [])
    const handleStoreSyncModal = () => {
        setOpenStoreModal(true)

    }
    if (initialValues.length <= 0) {
        return '';
    }
    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={{ productAttributeModel: initialValues }}
                validationSchema={validationSchema}
                onSubmit={handleAttribute}
            // innerRef={formRef}

            >
                {({ setFieldValue, errors, resetForm, values, setTouched, validateForm }) => {
                    // if (values?.productAttributeModel?.length >= 0 && values?.productAttributeModel[0]?.productAttributeOptionsList?.length <= 0) {
                    //     // dispatch(setAlertMessage({
                    //     //     type: 'danger',
                    //     //     message: "Please create product variation."
                    //     // }))
                    // }
                    return (
                        <FormikForm>
                            <UnsavedFormHandler values={values} setsaveUnSavedFields={setsaveUnSavedFields} InitialData={{ productAttributeModel: initialValues }} />
                            {type !== productType.Bundle &&
                            <div className="p-6">
                                <FieldArray
                                    name={`productAttributeModel`}
                                    render={(fieldArrayProps) => {
                                        const { form } = fieldArrayProps;

                                        return (
                                            <>
                                                    <div className="option-list" key={index}>
                                                        <div className="option-items">
                                                            {form.values.productAttributeModel?.map((attribute, index) => {
                                                                return (
                                                                    <Fragment key={index}>
                                                                        <AttributeDetails
                                                                            attribute={attribute}
                                                                            index={index}
                                                                            key={index}
                                                                            values={values}
                                                                            parentID={parentID}
                                                                            type={type}
                                                                            setAttributesOption={setAttributesOption}
                                                                            AttributesOption={AttributesOption}
                                                                            handleAttribute={handleAttribute}
                                                                            handleStoreSyncModal={handleStoreSyncModal}
                                                                            resetForm={resetForm}
                                                                            setFieldValue={setFieldValue}
                                                                            readOnly={readOnly}
                                                                            setStoreSync={setStoreSync}
                                                                            setSyncModalObject={setSyncModalObject}
                                                                            errors={errors}
                                                                            setIsEditDisable={setIsEditDisable}
                                                                            IsEditDisable={IsEditDisable}
                                                                            validateForm={validateForm}
                                                                            setAttrOptionCount={setAttrOptionCount}
                                                                            getAttributeData={getAttributeData}
                                                                        />
                                                                    </Fragment>
                                                                );
                                                            })}
                                                        </div>
                                                        {/* form.values.length <= 2 && */ (!valueByID.isCloned && (permission?.isEdit || permission?.isDelete)) &&
                                                            <>
                                                                {(AttrOptionCount > 0 && values.productAttributeModel.length >= 1 && values.productAttributeModel[0].id !== 0) &&
                                                                    <>
                                                                        <div className="mt-3 flex items-center justify-end gap-2">
                                                                            <button type="button" className={`btn border-indigo-300 hover:border-indigo-400 text-indigo-500`} onClick={() => {
                                                                                fieldArrayProps.push({
                                                                                    id: 0,
                                                                                    atributeId: 0,
                                                                                    productId: productId,
                                                                                    productType: "",
                                                                                    attributeFlag: false,
                                                                                    productAttributeOptionsList: [],
                                                                                    recStatus: RecStatusValuebyName.Active,
                                                                                    rowVersion: null,
                                                                                });
                                                                            }}
                                                                                disabled={IsEditDisable || form.dirty}
                                                                            >
                                                                                {(IsEditDisable || form.dirty || (values?.productAttributeModel?.length > 0 && values?.productAttributeModel[0]?.productAttributeOptionsList?.length <= 0)) &&
                                                                                    <>
                                                                                        <span data-tip data-for='page-url-tip' className="material-icons-outlined mr-2 text-sm">info</span>
                                                                                        <ReactTooltip id='page-url-tip' type='dark' effect="solid">
                                                                                            <span>Save pending changes to add other attribute.</span>
                                                                                        </ReactTooltip>
                                                                                    </>
                                                                                }
                                                                                {"Add Attribute"}
                                                                            </button>
                                                                        </div>
                                                                    </>
                                                                }
                                                            </>
                                                        }
                                                    </div>
                                            </>
                                        );
                                    }}
                                />
                                </div>
                            }
                        </FormikForm>
                    );
                }}
            </Formik>

            <AttributeImages clearCacheForBrandCategory={clearCacheForBrandCategory} user={user} CombinationData={ImageData} getCombinationData={getCombinationData} valueByID={valueByID} readOnly={readOnly} ImageAPI={ImageAPI} productId={productId} type={type} moduleName={moduleName} getProductReadinessData={getProductReadinessData} setsaveUnSavedFields={setsaveUnSavedFields} checkProductStatus={checkProductStatus} setWishedToChangeTab={setWishedToChangeTab} />

            {type !== productType.Bundle &&
                <>
                    <AttributeCombination clearCacheForBrandCategory={clearCacheForBrandCategory} AttributesOption={AttributesOption} CombinationData={CombinationData} getCombinationData={getCombinationData} getAttributeData={getAttributeData} readOnly={readOnly} CombinationAPI={CombinationAPI} productId={productId} type={type} getProductReadinessData={getProductReadinessData} setsaveUnSavedFields={setsaveUnSavedFields} checkProductStatus={checkProductStatus} setWishedToChangeTab={setWishedToChangeTab} />

                    {OpenStoreModal &&
                        <StoreSyncModal setOpenStoreModal={setOpenStoreModal} OpenStoreModal={OpenStoreModal} SyncModalObject={SyncModalObject} getAttributeData={getAttributeData} />
                    }
                </>
            }
        </>
    );
};

export default Attributes;



