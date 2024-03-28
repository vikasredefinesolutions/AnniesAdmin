import React, {
  useCallback,
  useRef,
  useEffect,
  useState,
  Fragment,
} from "react";
import { Formik, Form as FormikForm, FieldArray } from "formik";
import { RecStatusValuebyName } from "global/Enum";
import AdditonalInformationService from "services/admin/master/master/products/AdditonalInformationService";
import { useDispatch, useSelector } from "react-redux";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { serverError } from "services/common/helper/Helper";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { SingleInputElementReturner } from "./SingleInputElementReturnerHelper";
import { ValidationMsgs } from "global/ValidationMessages";

const AdditionalInformation = ({
  isAddMode,
  productId,
  storeIdFinal,
  setFormSubmit,
  activeTab,
  index,
}) => {
  const location = useSelector((store) => store?.location);
  const dispatch = useDispatch();
  const formRef = useRef();
  const [fieldsData, setFieldsData] = useState([]);

  const InitialData = {
    customFilterFieldsValue: fieldsData,
  };

  const getProductCustomeFilterFields = useCallback(() => {
    if (productId && storeIdFinal) {
      dispatch(setAddLoading(true));
      AdditonalInformationService.getStoreProductFilterCustomFields(
        productId,
        storeIdFinal
      )
        .then((response) => {
          if (response.data.success && response.data.data) {
            const currentValue = [];
            response.data.data.forEach((childElem) => {
              if (childElem.fieldvalues.length > 1) {
                const childInnerElem = childElem.fieldvalues.filter(
                  (check) => check.isInProduct === true
                );

                childElem["exactValue"] = childInnerElem;
              } else {
                childElem["exactValue"] = childElem.fieldvalues;
              }

              currentValue.push(childElem);
            });
            setFieldsData(response.data.data);
          }
          dispatch(setAddLoading(false));
        })
        .catch((error) => {
          dispatch(setAddLoading(false));
        });
    }
  }, [productId, storeIdFinal]);

  const submitHandler = (fields) => {
    const payload = [];

    fields.customFilterFieldsValue.forEach((parent) => {
      const tempForParent = {
        ...location,
        storeProductFilterCustomFieldsValueMappingModels: [],
      };

      tempForParent["masterFilterCustomFieldsId"] = parent.id;

      parent.exactValue.forEach((multiChild)=> {
        if(multiChild?.customFieldsValue){
          tempForParent.storeProductFilterCustomFieldsValueMappingModels.push({
            masterFilterCustomFieldsValueId: multiChild?.id,
            customFieldsValues: multiChild?.customFieldsValue,
            recStatus: RecStatusValuebyName.Active,
            rowVersion: "",
          });
        }
      })

      if (tempForParent.storeProductFilterCustomFieldsValueMappingModels.find((obj) => obj.customFieldsValues)) {
        payload.push(tempForParent);
      }
    });
    
    if (payload && payload.length > 0) {
      dispatch(setAddLoading(true));
      AdditonalInformationService.createUpdateStoreProductFilterCustomFields({
        storeId: storeIdFinal,
        productId: productId,
        storeProductFilterCustomFieldsMappingModel: payload,
      })
        .then((response) => {
          if (response.data.success && response.data.data) {
            dispatch(
              setAlertMessage({
                type: "success",
                message:
                  ValidationMsgs.masterCatalog.additionalInformation.updated,
              })
            );
            getProductCustomeFilterFields();
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
              message:
                ValidationMsgs.masterCatalog.additionalInformation.notUpdated,
            })
          );
          dispatch(setAddLoading(false));
        });
    }
  };

  useEffect(() => {
    getProductCustomeFilterFields();
  }, [productId, storeIdFinal]);

  useEffect(() => {
    if (activeTab === index) {
      setFormSubmit(formRef.current);
    }
  }, [formRef, setFormSubmit, activeTab]);
  return (
    <>
      <Formik
        enableReinitialize={!isAddMode}
        initialValues={InitialData}
        onSubmit={submitHandler}
        innerRef={formRef}
      >
        {({ setFieldValue, values }) => {
          return (
            <>
              <FormikForm>
                <FieldArray
                  name="customFilterFieldsValue"
                  render={(FormikFieldsArr) => {
                    const { customFilterFieldsValue } =
                      FormikFieldsArr.form.values;

                    return (
                      <div className="min-h-[80vh] panel-32 tab-content p-6">
                        <div className="flex flex-wrap mx-[-15px]">
                          {customFilterFieldsValue.length
                            ? customFilterFieldsValue.map((fields, pIndex) => {
                              const childNameHavingChild = `customFilterFieldsValue[${pIndex}].exactValue[0]`;
                              const childNameHavingMultiChild = `customFilterFieldsValue[${pIndex}].exactValue`;

                              if (
                                (fields?.customFieldType.toLowerCase() === "dropdown" || fields?.customFieldType.toLowerCase() === "multidropdown") &&
                                Array.isArray(fields?.fieldvalues)
                              ) {
                                const dropdownOption =
                                  fields?.fieldvalues.map((dropdown) => ({
                                    label: dropdown.customFieldsValue,
                                    value: dropdown.customFieldsValue,
                                    id: dropdown.id,
                                  }));

                                fields["childOption"] = dropdownOption;
                              } else {
                                fields["childOption"] = [];
                              }

                              return (
                                <Fragment key={pIndex}>
                                  <div className="w-full lg:w-1/2 mb-6 px-[15px]">
                                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">
                                      {fields?.customFieldName + ":"}
                                    </label>
                                    {SingleInputElementReturner({
                                      elementName: fields?.customFieldType,
                                      options: fields?.childOption,
                                      name: `${childNameHavingChild}.customFieldsValue`,
                                      defaultValue:
                                        values["customFilterFieldsValue"][
                                        pIndex
                                        ]["exactValue"],
                                      setFieldValue,
                                      childId: fields?.fieldvalues[0].id,
                                      elemNameForFormik: childNameHavingChild,
                                      childNameHavingMultiChild: childNameHavingMultiChild,
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
              </FormikForm>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default AdditionalInformation;
