import React, {
    useCallback,
    useRef,
    useEffect,
    useState,
    Fragment,
} from "react";
import { Formik, Form as FormikForm, FieldArray } from "formik";
import { RecStatusValuebyName, UpdateMessage, anniesAnnualData } from "global/Enum";
import CategoryService from "services/admin/master/store/categoryMaster/CategoryMasterService";
import { useDispatch, useSelector } from "react-redux";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { UpdateJsonDetails, serverError } from "services/common/helper/Helper";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { ValidationMsgs } from "global/ValidationMessages";
import { SingleInputElementReturner } from "./SingleInputElementReturnerHelper";
import CategoryServiceCls from "services/admin/category/CategoryService";
import TopicsDetailsServicesCls from "services/admin/topics/TopicsDetailsServices";

const AdditionalInformation = ({
    setFormSubmit,
    index,
    activeTab,
    values,
}) => {
    const location = useSelector((store) => store?.location);
    const CompanyId = useSelector((store) => store?.CompanyConfiguration.id);
    const dispatch = useDispatch();
    const formRef = useRef();
    const storeId = anniesAnnualData.storeId;

    const [categoryFieldsData, setCategoryFieldsData] = useState([]);

    const initialValues = {
        categoryFilterFieldsValue: categoryFieldsData,
    };

    const getCategoryFieldsData = useCallback(() => {
        if (storeId && values.id) {
            dispatch(setAddLoading(true));
            CategoryService.getCategoryFilterCustomFields(values.id, storeId)
                .then((response) => {
                    if (response.data.success && response.data.data) {
                        const currentValue = [];
                        response.data.data.forEach((childElem) => {
                            if (childElem.fieldvalues.length > 0) {
                                const childInnerElem = childElem.fieldvalues.filter(
                                    (check) => check.isInProduct === true
                                );

                                childElem["exactValue"] = childInnerElem;
                            } else {
                                childElem["exactValue"] = childElem.fieldvalues;
                            }

                            currentValue.push(childElem);
                        });
                        setCategoryFieldsData(response.data.data);
                    }
                    dispatch(setAddLoading(false));
                })
                .catch((error) => {
                    dispatch(setAddLoading(false));
                });
        }
    }, [storeId, values.id]);

    const onSubmitHandler = (fields) => {
        const payload = [];

        fields.categoryFilterFieldsValue.forEach((parent) => {
            const tempForParent = {
                ...location,
                storeProductFilterCustomFieldsMappingValuesCategoryModel: [],
            };

            tempForParent["masterFilterCustomFieldsCategoryId"] = parent.id;

            parent.exactValue.forEach((multiChild)=>{
                if(multiChild?.categoryCustomFieldsValue){
                    tempForParent.storeProductFilterCustomFieldsMappingValuesCategoryModel.push({
                            masterFilterCustomFieldsValueCategoryId: multiChild?.id,
                            categoryCustomFieldsValues: multiChild?.categoryCustomFieldsValue,
                            recStatus: RecStatusValuebyName.Active,
                            rowVersion: "",
                        });
                }
                })

            if (tempForParent.storeProductFilterCustomFieldsMappingValuesCategoryModel.find((obj) => obj.categoryCustomFieldsValues)) {
                payload.push(tempForParent);
            }
        });
        
        if (payload && payload.length > 0) {
            dispatch(setAddLoading(true));
            CategoryService.createUpdateCategoryFilterCustomFields({
                storeId: storeId,
                categoryId: values.id,
                storeProductFilterCustomFieldsMappingCategoryModel: payload,
            })
                .then((response) => {
                    if (response.data.success && response.data.data) {
                        UpdateJsonDetails(dispatch,UpdateMessage.additionalInformation.message)
                        getCategoryFieldsData();
                    } else {
                        dispatch(
                            setAlertMessage({
                                type: "danger",
                                message: serverError(response),
                            })
                        );
                    }
                    dispatch(setAddLoading(false));
                })
                .catch((error) => {
                    dispatch(
                        setAlertMessage({
                            type: "danger",
                            message: "Additional information is not updated.",
                        })
                    );
                    dispatch(setAddLoading(false));
                });
        }
    };

    useEffect(() => {
        if (storeId && values.id) {
            getCategoryFieldsData();
        }
    }, [storeId, values.id]);

    useEffect(() => {
        if (activeTab == index) {
            setFormSubmit(formRef.current);
        }
    }, [formRef, setFormSubmit, activeTab]);

    return (
        <>
            <div className="w-full p-6">
                <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    onSubmit={onSubmitHandler}
                    innerRef={formRef}
                >
                    {({ setFieldValue, values }) => {
                        // console.log(values,"values")
                        return (
                            <FieldArray
                                name="categoryFilterFieldsValue"
                                render={(FormikFieldArr) => {
                                    const { categoryFilterFieldsValue } =
                                        FormikFieldArr.form.values;
                                    return (
                                        <div className="min-h-[80vh] panel-32 tab-content">
                                            <div className="flex flex-wrap mx-[-15px]">
                                                {categoryFilterFieldsValue.length
                                                    ? categoryFilterFieldsValue.map((fields, pIndex) => {

                                                        const childNameHavingChild = `categoryFilterFieldsValue[${pIndex}].exactValue[0]`;
                                                        const childNameHavingMultiChild = `categoryFilterFieldsValue[${pIndex}].exactValue`;

                                                        // console.log(fields,"fields")
                                                        if ((fields?.categoryCustomFieldType.toLowerCase() === "dropdown" || fields?.categoryCustomFieldType.toLowerCase() === "multidropdown") &&
                                                            Array.isArray(fields?.fieldvalues)
                                                        ) {
                                                            const dropdownOption = 
                                                                fields?.fieldvalues.map((dropdown) => ({
                                                                    label: dropdown.categoryCustomFieldsValue,
                                                                    value: dropdown.categoryCustomFieldsValue,
                                                                    id: dropdown.id,
                                                                })
                                                            );
                                                            fields["childOption"] = dropdownOption;
                                                        } else {
                                                            fields["childOption"] = [];
                                                        }

                                                        return (
                                                            <Fragment key={pIndex}>
                                                                <div className="w-full lg:w-1/2 mb-6 px-[15px]">
                                                                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">
                                                                        {fields?.categoryCustomFieldName + ":"}
                                                                    </label>
                                                                    {SingleInputElementReturner({
                                                                        elementName: fields?.categoryCustomFieldType,
                                                                        options: fields?.childOption,
                                                                        name: `${childNameHavingChild}.categoryCustomFieldsValue`,
                                                                        defaultValue:
                                                                            values["categoryFilterFieldsValue"][
                                                                            pIndex
                                                                            ]["exactValue"],
                                                                        setFieldValue,
                                                                        childId: fields?.fieldvalues[0]?.id,
                                                                        elemNameForFormik: childNameHavingChild,
                                                                        childNameHavingMultiChild: childNameHavingMultiChild,
                                                                        categoryId: values.parentId,
                                                                        CompanyId: CompanyId,
                                                                        fields: fields
                                                                    })}
                                                                </div>
                                                            </Fragment>
                                                        );
                                                    })
                                                    : ""}
                                            </div>
                                        </div>
                                    );
                                }}
                            />
                        );
                    }}
                </Formik>
            </div>
        </>
    );
};

export default AdditionalInformation;
