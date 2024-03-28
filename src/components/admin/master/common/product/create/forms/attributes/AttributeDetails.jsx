/*Component Name: AttributeDetails
Component Functional Details: User can create or update AttributeDetails master details from here.
Created By: Happy
Created Date: <Creation Date>
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import React, { useState, useEffect, Fragment } from "react";
import Input from "components/common/formComponent/Input";
import { FieldArray, useFormikContext } from "formik";
import Checkbox from "components/common/formComponent/Checkbox";
import Dropdown from "components/common/formComponent/Dropdown";
import DropdownService from "services/common/dropdown/DropdownService"
import SizeDetailsService from "services/admin/sizeDetails/SizeDetailsService";
import OptionConfirmationModal from "./OptionConfirmationModal";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { useDispatch } from "react-redux";
import { ValidationMsgs } from "global/ValidationMessages";
import { useSelector } from "react-redux";
import ToolTipComponent from "components/common/ToolTips";
import { ToolTipsMessages } from "global/ToolTipsMessages";
import InputNumber from "components/common/formComponent/InputNumber";
import Status from "components/common/displayStatus/Status";
import { RecStatusValuebyName, anniesAnnualData } from "global/Enum";

const AttributeDetails = ({
    readOnly,
    type,
    attribute,
    values,
    index,
    handleAttribute,
    setStoreSync,
    errors,
    setIsEditDisable,
    IsEditDisable,
    setSyncModalObject,
    resetForm,
    validateForm,
    setFieldValue,
    setAttributesOption,
    AttributesOption,
    setAttrOptionCount,
    getAttributeData,
    // getValidationForAllFilledFieldsFunc
}) => {
    // readOnly = ([productType.EcommerceStore, productType.CorporateStore, productType.StoreBuilder, productType.FormBuilder].includes(type)) ? true : false;

    const permission = useSelector(store => store.permission);
    const dispatch = useDispatch();
    const [FirstAttribute, setFirstAttribute] = useState()
    const [FirstAttrReady, setFirstAttrReady] = useState(false)
    const [SecondAttribute, setSecondAttribute] = useState()
    const [showEditOrDone, setShowEditOrDone] = useState(false);

    const [DefaultAttribute, setDefaultAttribute] = useState(null);
    const [basicModalInfo, setModalInfo] = useState({});
    const [OpenConfirmationModal, setOpenConfirmationModal] = useState(false);
    const [productTypeOptions, setProductTypeOptions] = useState([])
    const [ProductSizeOption, setProductSizeOption] = useState([]);
    let templateName = ""
    let sizeProdTypeId = attribute.productType
    let AttributeId = attribute.atributeId
    const [selectedAttrOption, setSelectedAttrOption] = useState([]);
    let Validate = []
    useEffect(() => {

        sizeProdTypeId = attribute.productType
        let selectedAttributeOption = [];
        values?.productAttributeModel?.map((option, index) => {
            if (option.atributeId.toString() !== attribute.atributeId.toString()) {
                selectedAttributeOption = [...selectedAttributeOption, option.atributeId.toString()];
            }
        });
        if (AttributesOption && AttributesOption !== undefined) {
            setSelectedAttrOption(() => {
                return AttributesOption?.filter((item, i) => {
                    return !selectedAttributeOption.includes(item.value.toString());
                })
            })
        }

        DropdownService.getDropdownValues("attributes").then((response) => {
            if (response.data && response.data.data !== null) {
                setAttributesOption(() => {
                    return response.data.data;
                });
                if (response.data.data[0] !== undefined && index === 0) {
                    setFirstAttribute(response.data.data[0]);
                    setDefaultAttribute(response.data.data[0]);
                }
                else if (index === 1) {
                    setSecondAttribute(response.data.data[1]);
                    setDefaultAttribute(response.data.data[1]);
                    templateName = response.data.data[1].label
                    DropdownService.getDropdownValues(templateName).then((response) => {
                        setProductTypeOptions(() => {
                            return response.data.data;
                        });
                    });
                }
            }
        });
    }, [values?.productAttributeModel, attribute, FirstAttrReady])

    useEffect(() => {
        if (FirstAttribute && FirstAttribute !== undefined) {
            setFirstAttrReady(true)
        }
        let temp = [];
        if (sizeProdTypeId && sizeProdTypeId !== "") {
            SizeDetailsService.getProductSizeById(sizeProdTypeId)
                .then((response) => {
                    let options = []
                    const res = response.data.data;
                    if (res && res.length > 0) {
                        res.map((data, index) => {
                            options = [...options, { label: data.size, value: data.size }]
                        })
                    }
                    setProductSizeOption(options);
                    temp = [
                        {
                            id: 0,
                            rowVersion: null,
                            productAtributeId: 0,
                            value: "",
                            suffix: "",
                            seasonalSku: "",
                            storeIdList: [],
                            productName: "",
                            isDiscontinueOption: false,
                        }
                    ];
                    return attribute.productAttributeOptionsList = temp;
                })
            setShowEditOrDone(true)

            Validate.length > 0 && setOpenConfirmationModal(true)
        }
    }, [sizeProdTypeId, FirstAttribute]);

    const handleVariantOption = (data) => {
        let temp = [];
        if (SecondAttribute !== "") {
            if ((sizeProdTypeId && sizeProdTypeId !== "") && (ProductSizeOption && ProductSizeOption.length !== 0)) {
                temp = [
                    {
                        id: 0,
                        rowVersion: null,
                        productAtributeId: 0,
                        value: "",
                        suffix: "",
                        seasonalSku: "",
                        storeIdList: [],
                        productName: "",
                        isDiscontinueOption: false,
                    }
                ];
                setOpenConfirmationModal(false)
                return attribute.productAttributeOptionsList = temp;
            }
        }
    }

    useEffect(() => {
        if (selectedAttrOption.length === 1) {
            setAttrOptionCount(0)
        } else {
            setAttrOptionCount(selectedAttrOption.length)
        }
    }, [selectedAttrOption])

    return (
        <>
            <div className="sm:flex sm:items-center sm:justify-between border-b border-neutral-200 py-4 option-item" key={index}>
                <div className="sm:grow flex">
                    {attribute.productAttributeOptionsList && attribute.productAttributeOptionsList?.length > 0 && (
                        <div className={`mx-2 grow  ${showEditOrDone ? "hidden" : ""}`}>
                            {AttributesOption?.map((attropt, index1) => {
                                return (
                                    <Fragment key={index1}>
                                        {attropt.value == AttributeId ? attropt.label : ""}
                                    </Fragment>
                                )
                            })
                            }
                            <ul className="flex-wrap items-center whitespace-nowrap flex">
                                {attribute.productAttributeOptionsList.map((attrValue, index2) => {
                                    if (attrValue.recstatus !== RecStatusValuebyName.Archived) {
                                        return (
                                            <Fragment key={index2}>
                                                <li className="m-1.5 ml-0 flex items-center" key={index2}>
                                                    <div className={`inline-flex font-medium border border-neutral-200 bg-slate-200 text-gray-500 rounded-full text-center px-2.5 py-1`}>
                                                        {attrValue.value}
                                                    </div>
                                                </li>
                                            </Fragment>
                                        );
                                    }
                                })}
                            </ul>
                        </div>
                    )}
                    <div
                        className={`mx-2 grow ${showEditOrDone || attribute.productAttributeOptionsList.length === 0
                            ? ""
                            : "hidden"
                            } `}
                    >
                        <div className="option-title font-medium text-gray-800">
                            <div className="mb-1">Attribute name </div>
                            <Dropdown
                                label={`Attribute name`}
                                name={`productAttributeModel.[${index}].atributeId`}
                                options={selectedAttrOption}
                                // defaultValue={!readOnly ? (FirstAttribute ? FirstAttribute.value : SecondAttribute ? SecondAttribute.value : attribute.atributeId) : attribute.atributeId}
                                // defaultValue={!readOnly ? (attribute.atributeId ? attribute.atributeId : (FirstAttribute ? FirstAttribute.value : (SecondAttribute ? SecondAttribute.value : ''))) : ''}
                                defaultValue={!readOnly ? (attribute.atributeId !== 0 ? attribute.atributeId : (DefaultAttribute ? DefaultAttribute.value : '')) : ''}
                                className="focus:ring-neutral-300 focus:shadow-lg py-1 max-w-xs w-full"
                                onChange={(data) => {
                                    if (data) {
                                        setFieldValue(
                                            `productAttributeModel.[${index}].atributeId`,
                                            parseInt(data.value)
                                        );
                                    } else {
                                        setFieldValue(`productAttributeModel.[${index}].atributeId`, "");
                                    }
                                }}

                                isDisabled={(readOnly || [0, 1].includes(index))}
                            />
                        </div>
                        {// (SecondAttribute && SecondAttribute !== "")
                            (DefaultAttribute && index === 1) &&
                            <div className="option-title font-medium text-gray-800">
                                <div className="mb-1">Variant Name</div>
                                <Dropdown
                                    label={`Variant Name`}
                                    name={`productAttributeModel.[${index}].productType`}
                                    options={productTypeOptions}
                                    defaultValue={attribute.productType}
                                    className="focus:ring-neutral-300 focus:shadow-lg py-1 max-w-xs "
                                    onChange={(data) => {
                                        if (data) {
                                            setFieldValue(
                                                `productAttributeModel.[${index}].productType`,
                                                data.value
                                            )
                                        } else {
                                            setFieldValue(`productAttributeModel.[${index}].productType`, "");
                                        }
                                    }}
                                    isDisabled={readOnly}
                                />
                            </div>
                        }

                        <div className="swatch-option"></div>
                        <div className="my-2 control_type">
                            <div className="mb-4">
                                <Checkbox
                                    name={`productAttributeModel.[${index}].attributeFlag`}
                                    label={'Attribute Required'}
                                    id={'attribute_required'}
                                    checked={attribute.attributeRequired}
                                    // defalutValue={attribute.attributeRequired}
                                    className={"table-item form-checkbox"}
                                    onChange={(e) => {
                                        setFieldValue(
                                            `productAttributeModel.[${index}].attributeFlag`,
                                            e.target.checked
                                        );
                                    }}
                                    disabled={readOnly}
                                />
                            </div>
                        </div>
                        <div className="mt-4 font-medium text-gray-800">Attribute Options</div>
                        <div className="flex-wrap items-center whitespace-nowrap">
                            <FieldArray
                                name={`productAttributeModel.[${index}].productAttributeOptionsList`}
                                render={(fieldArrayProps) => {
                                    const { form } = fieldArrayProps;
                                    return (
                                        <Fragment key={index}>
                                            {form.values.productAttributeModel[index].productAttributeOptionsList.length > 0 ?
                                                form.values.productAttributeModel[index].productAttributeOptionsList.map(
                                                    (value, i) => {
                                                        if (value.recstatus !== RecStatusValuebyName.Archived) {
                                                            return (
                                                                <div
                                                                    className="m-1.5 ml-0 flex items-center"
                                                                    key={i}
                                                                >
                                                                    {ProductSizeOption && ProductSizeOption.length > 0 ?

                                                                        <SizeAttributeValues setStoreSync={setStoreSync} setSyncModalObject={setSyncModalObject} variation={value} attribute={attribute} fieldArrayProps={fieldArrayProps} i={i} index={index} setFieldValue={setFieldValue} readOnly={readOnly} ProductSizeOption={ProductSizeOption} />

                                                                        :
                                                                        <div className="flex flex-wrap gap-y-1 w-full">
                                                                            <div className="w-96">
                                                                                <Input
                                                                                    type="text"
                                                                                    className={`focus:ring-neutral-300 focus:shadow-lg px-2 py-1 w-full`}
                                                                                    name={`productAttributeModel.[${index}].productAttributeOptionsList.[${i}].value`}
                                                                                    placeholder="value"
                                                                                />
                                                                            </div>
                                                                            <div className="ml-6">
                                                                                <Input
                                                                                    type="text"
                                                                                    className={`focus:ring-neutral-300 focus:shadow-lg px-2 py-1 w-full`}
                                                                                    name={`productAttributeModel.[${index}].productAttributeOptionsList.[${i}].suffix`}
                                                                                    placeholder="Suffix"
                                                                                />
                                                                            </div>
                                                                            {/* {form.values.productAttributeModel[index].parentId === 0 &&
                                                                                <div className="ml-6">
                                                                                    <Input
                                                                                        type="text"
                                                                                        className={`focus:ring-neutral-300 focus:shadow-lg px-2 py-1 w-full ${(value.isSeasonalSkuDisable || readOnly) && "bg-slate-200"}`}
                                                                                        defaultValue={form.values.productAttributeModel[index].productAttributeOptionsList[i].seasonalSku}
                                                                                        name={`productAttributeModel.[${index}].productAttributeOptionsList.[${i}].seasonalSku`}
                                                                                        placeholder="Seasonal SKU"
                                                                                        disabled={value.isSeasonalSkuDisable || readOnly}
                                                                                        onChange={(e) => {
                                                                                            if (/^\s/.test(e.target.value)) {
                                                                                                setFieldValue(`productAttributeModel.[${index}].productAttributeOptionsList.[${i}].seasonalSku`, "")
                                                                                            } else {
                                                                                                setFieldValue(`productAttributeModel.[${index}].productAttributeOptionsList.[${i}].seasonalSku`, e ? e.target.value : "")
                                                                                            }
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                            } */}
                                                                            <div className="ml-6 w-32">
                                                                                <Input
                                                                                    type="text"
                                                                                    className={`focus:ring-neutral-300 focus:shadow-lg px-2 py-1 w-full`}
                                                                                    name={`productAttributeModel.[${index}].productAttributeOptionsList.[${i}].displayOrder`}
                                                                                    placeholder="Display Order"
                                                                                    onKeyPress={(event) => {
                                                                                        if (!/^\d*$/.test(event.key)) {
                                                                                            event.preventDefault();
                                                                                        }
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                            {value.readyForSync &&
                                                                                <div className="add-new ml-6 flex h-8 justify-center">
                                                                                    <button
                                                                                        type="button"
                                                                                        onClick={() => {
                                                                                            setStoreSync(value.readyForSync);
                                                                                            setSyncModalObject(
                                                                                                {
                                                                                                    attributeId: attribute.id,
                                                                                                    attributeOptions: value.id,
                                                                                                    storeList: value.storeIdList
                                                                                                }
                                                                                            );
                                                                                        }}
                                                                                        disabled={(value.recstatus === RecStatusValuebyName.Inactive && value.readyForSync === true) ? true : false}
                                                                                        className={`${(value.recstatus === RecStatusValuebyName.Inactive && value.readyForSync === true) ? "btn border-indigo-200 hover:border-indigo-200 text-indigo-300" : "btn border-indigo-300 hover:border-indigo-400 text-indigo-500"}`}>
                                                                                        Sync
                                                                                    </button>
                                                                                </div>
                                                                            }
                                                                            {form.values.productAttributeModel[index].parentId === 0 &&
                                                                                <div className="ml-6 flex items-center justify-center">
                                                                                    <Checkbox
                                                                                        name={`productAttributeModel.[${index}].productAttributeOptionsList.[${i}].isDiscontinueOption`}
                                                                                        id={`productAttributeModel.[${index}].productAttributeOptionsList.[${i}].isDiscontinueOption`}
                                                                                        label={"Discontinue"}
                                                                                        checked={form.values.productAttributeModel[index].productAttributeOptionsList[i].isDiscontinueOption}
                                                                                        onChange={(e) => {
                                                                                            setFieldValue(`productAttributeModel.[${index}].productAttributeOptionsList.[${i}].isDiscontinueOption`, e.target.checked)
                                                                                        }}
                                                                                        disabled={readOnly === true ? true : false}
                                                                                    />
                                                                                </div>
                                                                            }
                                                                            <div className="add-new ml-6 flex h-8 items-center justify-center">
                                                                                <Status type={value?.recstatus} />
                                                                            </div>
                                                                            <div className="ml-6">
                                                                                <button
                                                                                    type="button"
                                                                                    // onClick={fieldArrayProps.remove.bind(
                                                                                    //     null,
                                                                                    //     i
                                                                                    // )}
                                                                                    onClick={
                                                                                        (form.values.productAttributeModel[index].productAttributeOptionsList[i].value === "" &&
                                                                                            form.values.productAttributeModel[index].productAttributeOptionsList[i].displayOrder === "" &&
                                                                                            form.values.productAttributeModel[index].productAttributeOptionsList[i].suffix === "" &&
                                                                                            form.values.productAttributeModel[index].productAttributeOptionsList[i].id === 0) ?
                                                                                            fieldArrayProps.remove.bind(
                                                                                                null,
                                                                                                i
                                                                                            )
                                                                                            :
                                                                                            () => {
                                                                                                setFieldValue(`productAttributeModel.[${index}].productAttributeOptionsList.[${i}].recstatus`, RecStatusValuebyName.Archived)
                                                                                            }
                                                                                    }
                                                                                >
                                                                                    <span className="delete material-icons-outlined text-rose-500 mt-1">
                                                                                        remove_circle
                                                                                    </span>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            );
                                                        } else {
                                                            return <Fragment key={i}></Fragment>
                                                        }
                                                    }
                                                ) : <h1 className="text-red-500">Please Select Variant Name</h1>}
                                            {!readOnly &&
                                                <div className="add-new">
                                                    <button
                                                        type="button"
                                                        className={`btn border-indigo-300 hover:border-indigo-400 text-indigo-500 ${readOnly ? "hidden" : ""}`}
                                                        onClick={() => {
                                                            fieldArrayProps.push({
                                                                id: 0,
                                                                rowVersion: null,
                                                                productAtributeId: attribute?.id || 0,
                                                                value: "",
                                                                storeIdList: [],
                                                                suffix: "",
                                                                seasonalSku: "",
                                                                displayOrder: "",
                                                                productName: "",
                                                                recstatus: RecStatusValuebyName.Active,
                                                                isDiscontinueOption: false,
                                                            });
                                                            setShowEditOrDone(true);
                                                        }}
                                                    >
                                                        Add New
                                                    </button>
                                                </div>
                                            }
                                        </Fragment>
                                    );
                                }}
                            />
                        </div>
                    </div>
                    <div className="my-2 ml-3 flex max-h-10">
                        {((index !== 0 && showEditOrDone) || showEditOrDone || (attribute.productAttributeOptionsList.length === 0 && index !== 0)) &&
                            <button
                                type="button"
                                onClick={() => {
                                    resetForm(true);
                                    setShowEditOrDone(false);
                                    setIsEditDisable(false);
                                    getAttributeData();
                                    // if (Object.keys(errors?.productAttributeModel?.[index] ? errors.productAttributeModel[index] : []).length === 0) {
                                    //     Validate = attribute.productAttributeOptionsList.filter((value) => {
                                    //         return (value.value === "" || value.suffix === "")
                                    //     })
                                    //     if (Validate.length <= 0) {
                                    //         resetForm(true);
                                    //         setShowEditOrDone(false);
                                    //         setIsEditDisable(false)
                                    //     }
                                    //     else {
                                    //         validateForm().then(() =>
                                    //             dispatch(
                                    //                 setAlertMessage({
                                    //                     type: "danger",
                                    //                     message: "Attribute name, option value, suffix and display order must not be empty.",
                                    //                 })

                                    //             ));
                                    //     }
                                    // }
                                    // else {
                                    //     validateForm().then(() =>
                                    //         dispatch(
                                    //             setAlertMessage({
                                    //                 type: "danger",
                                    //                 message: "Attribute name, option value, suffix and display order must not be empty.",
                                    //             })
                                    //         ));
                                    // }
                                }}
                                className={`btn border-indigo-300 hover:border-indigo-400 text-indigo-500 mr-2`}
                            >
                                Cancel
                            </button>
                        }

                        {attribute.productAttributeOptionsList.length > 0 && showEditOrDone && (
                            <>
                                <button
                                    type="button"
                                    className={`btn px-6 bg-indigo-500 hover:bg-indigo-600 text-white`}
                                    onClick={() => {
                                        if (Object.keys(errors?.productAttributeModel?.[index] ? errors.productAttributeModel[index] : []).length === 0) {
                                            Validate = attribute.productAttributeOptionsList.filter((value) => {
                                                return (value.value === "" || value.suffix === "")
                                            })
                                            if (Validate.length <= 0) {
                                                handleAttribute(
                                                    { ...attribute, atributeId: FirstAttribute ? parseInt(FirstAttribute.value) : SecondAttribute ? parseInt(SecondAttribute.value) : attribute.atributeId }, resetForm)
                                                setShowEditOrDone(false);
                                                setIsEditDisable(false);
                                            } else {
                                                validateForm().then(() =>
                                                    dispatch(
                                                        setAlertMessage({
                                                            type: "danger",
                                                            message: "Attribute name, option value, suffix and display order must not be empty.",
                                                        })
                                                    ));
                                            }
                                        } else {
                                            validateForm().then(() =>
                                                dispatch(
                                                    setAlertMessage({
                                                        type: "danger",
                                                        message: "Attribute name, option value, suffix and display order must not be empty.",
                                                    })
                                                ));
                                        }
                                    }} >
                                    Save
                                </button>
                            </>
                        )}
                    </div>
                    {(permission?.isEdit || permission?.isDelete) && attribute.productAttributeOptionsList.length > 0 && !showEditOrDone && (
                        <>
                            <div className="my-2 ml-3">
                                <button
                                    type="button"
                                    className={`btn border-indigo-300 hover:border-indigo-400 text-indigo-500`}
                                    onClick={() => { setShowEditOrDone(true); setIsEditDisable(true) }}
                                    disabled={IsEditDisable}
                                >
                                    {IsEditDisable &&
                                        <>
                                            <ToolTipComponent
                                                id="attributeEditTip"
                                                className=" mr-2 ml-0 text-sm "
                                                message={ToolTipsMessages.AttributeTooltips.editFabric}
                                            />
                                        </>
                                    }
                                    Edit
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {OptionConfirmationModal &&
                <OptionConfirmationModal
                    handleConfirmation={handleVariantOption}
                    setOpenModal={setOpenConfirmationModal}
                    openModal={OpenConfirmationModal}
                    message={ProductSizeOption.length > 0 ? ValidationMsgs.masterCatalog.attributes.attributeDetailsMsg : ValidationMsgs.masterCatalog.attributes.elseAttributeDetailMsg}
                    displayOkButton={ProductSizeOption.length > 0 ? true : false}
                    {...basicModalInfo}
                />
            }
        </>
    );
};

export default AttributeDetails;

const SizeAttributeValues = ({ attribute, fieldArrayProps, i, index, setFieldValue, readOnly, ProductSizeOption, variation, setSyncModalObject, setStoreSync }) => {
    const [selectedValues, setSelectedValues] = useState([]);
    const { values } = useFormikContext();
    useEffect(() => {
        let selectedAttributeValues = [];
        attribute?.productAttributeOptionsList?.map((option, index) => {
            if (option.value !== variation.value) {
                selectedAttributeValues = [...selectedAttributeValues, option.value];
            }
        });
        setSelectedValues(() => {
            return ProductSizeOption.filter((value, i) => {
                return !selectedAttributeValues.includes(value.value);
            })
        })
    }, [attribute?.productAttributeOptionsList])

    return (
        <div
            className="m-1.5 ml-0 grid grid-cols-12 w-full"
            key={i}
        >
            <div className="col-span-4">
                <Dropdown
                    name={`productAttributeModel.[${index}].productAttributeOptionsList.[${i}].value`}
                    options={selectedValues}
                    defaultValue={attribute.productAttributeOptionsList[i].value}
                    className="focus:ring-neutral-300 focus:shadow-lg w-full"
                    onChange={(data) => {
                        if (data) {
                            setFieldValue(
                                `productAttributeModel.[${index}].productAttributeOptionsList.[${i}].value`,
                                data.value
                            );
                        } else {
                            setFieldValue(`productAttributeModel.[${index}].productAttributeOptionsList.[${i}].value`, "");
                        }
                    }}
                    isDisabled={readOnly}
                />
            </div>
            <div className="ml-6">
                <Input
                    type="text"
                    className={`focus:ring-neutral-300 focus:shadow-lg px-2 ml-1 w-full`}
                    name={`productAttributeModel.[${index}].productAttributeOptionsList.[${i}].suffix`}
                    placeholder="Suffix"
                    disabled={readOnly}
                />
            </div>
            <div className="ml-6">
                <InputNumber name={`productAttributeModel.[${index}].productAttributeOptionsList.[${i}].displayOrder`}
                    allowNegative={false}
                    placeholder="Display Order"
                    value={values?.productAttributeModel?.[index].productAttributeOptionsList[i].displayOrder}
                    displayError={true}
                    onChange={(e) => { setFieldValue(`productAttributeModel.[${index}].productAttributeOptionsList.[${i}].displayOrder`, e.target.value) }}
                />
            </div>
            {variation.readyForSync &&
                <div className="add-new ml-6 flex h-8 justify-center">
                    <button
                        type="button"
                        onClick={() => {
                            setStoreSync(variation.readyForSync);
                            setSyncModalObject(
                                {
                                    attributeId: attribute.id,
                                    attributeOptions: variation.id,
                                    storeList: variation.storeIdList
                                }
                            );
                        }}
                        disabled={(variation.recstatus === RecStatusValuebyName.Inactive && variation.readyForSync === true) ? true : false}
                        className={`${(variation.recstatus === RecStatusValuebyName.Inactive && variation.readyForSync === true) ? "btn border-indigo-200 hover:border-indigo-200 text-indigo-300" : "btn border-indigo-300 hover:border-indigo-400 text-indigo-500"}`}>
                        Sync
                    </button>
                </div>
            }
            <div className="add-new ml-6 flex h-8 items-center justify-center">
                <Status type={variation?.recstatus} />
            </div>
            <div className="ml-6 flex item">
                {!readOnly &&
                    <button
                        type="button"
                        // onClick={fieldArrayProps.remove.bind(
                        //     null,
                        //     i
                        // )}
                        onClick={() => {
                            setFieldValue(`productAttributeModel.[${index}].productAttributeOptionsList.[${i}].recstatus`, RecStatusValuebyName.Archived)
                        }}
                    >
                        <span className="delete material-icons-outlined text-rose-500 ml-1 mt-1">
                            remove_circle
                        </span>
                    </button>
                }
            </div>
        </div>
    )
}
