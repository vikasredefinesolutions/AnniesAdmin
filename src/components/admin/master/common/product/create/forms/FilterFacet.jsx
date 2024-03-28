import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  Fragment,
} from "react";
import { Formik, Form as FormikForm, FieldArray } from "formik";
import FilterFacetService from "services/admin/master/master/products/FilterFacetService";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { useDispatch, useSelector } from "react-redux";
import { ValidationMsgs } from "global/ValidationMessages";
import Input from "components/common/formComponent/Input";
import { RecStatusValuebyName } from "global/Enum";
import { serverError } from "services/common/helper/Helper";

const FilterFacet = ({
  productId,
  storeIdFinal,
  setFormSubmit,
  activeTab,
  index,
}) => {
  const dispatch = useDispatch();
  const formRef = useRef();
  const location = useSelector((store) => store?.location);
  const [filterFacetFields, setFilterFacetFields] = useState([]);

  const initialValues = {
    filterFacet: filterFacetFields,
  };

  const getProductFilterFieldsData = useCallback(() => {
    if (productId && storeIdFinal) {
      dispatch(setAddLoading(true));
      FilterFacetService.getProductfilterfacetfields(productId, storeIdFinal)
        .then((response) => {
          if (response.data.success && response.data.data) {
            setFilterFacetFields(response.data.data);
          }
          dispatch(setAddLoading(false));
        })
        .catch((error) => {
          dispatch(setAddLoading(false));
        });
    }
  }, [productId, storeIdFinal]);

  const onSubmit = (fields) => {
    const payload = [];

    fields.filterFacet.forEach((value) => {
      const tempForChild = [];
      const tempForParent = {
        ...location,
        lstStoreProductFilterFacetFieldsValue: tempForChild,
      };

      tempForParent["masterFilterFacetFieldId"] = value.id;

      value.fieldvalues.forEach((child) => {
        if (child.isInProduct) {
          tempForChild.push({
            masterFilterFacetFieldValuesId: child.id,
            rowVersion: "",
            recStatus: RecStatusValuebyName.Active,
          });
        }
      });

      if (tempForParent.lstStoreProductFilterFacetFieldsValue.length) {
        payload.push(tempForParent);
      }
    });

    if (payload && payload.length > 0) {
      dispatch(setAddLoading(true));
      FilterFacetService.createUpdateProductFilterFacetField({
        storeId: storeIdFinal,
        productId: productId,
        storeProductFilterFacetFieldsModel: payload,
      })
        .then((response) => {
          if (response.data.success && response.data.data) {
            dispatch(
              setAlertMessage({
                type: "success",
                message: ValidationMsgs.masterCatalog.facet.created,
              })
            );
            getProductFilterFieldsData();
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
        .catch((errors) => {
          dispatch(
            setAlertMessage({
              type: "danger",
              message: ValidationMsgs.masterCatalog.facet.notCreated,
            })
          );
        });
    }
  };

  useEffect(() => {
    if (activeTab === index) {
      setFormSubmit(formRef.current);
    }
  }, [formRef, setFormSubmit, activeTab]);

  useEffect(() => {
    getProductFilterFieldsData();
  }, [productId, storeIdFinal]);

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={onSubmit}
        innerRef={formRef}
      >
        {({ values, setFieldValue, errors }) => {
          return (
            <FormikForm>
              <FieldArray
                name="filterFacet"
                render={(FormikFilterFacetArr) => {
                  const { filterFacet } = FormikFilterFacetArr.form.values;
                  return (
                    <div>
                      {filterFacet.map((fields, pindex) => {
                        return (
                          <Fragment key={pindex}>
                            <div className="border-b-4 last:border-b-0 border-neutral-200 option-list odd:bg-white even:bg-slate-100">
                              <div className="p-6 pb-0 flex items-center justify-between">
                                <div className="block uppercase tracking-wide text-lg font-bold">
                                  {fields.fieldName}
                                </div>
                              </div>
                              <div className="p-6 pt-2">
                                <div className="grid grid-cols-4">
                                  {fields?.fieldvalues?.length
                                    ? fields.fieldvalues.map(
                                      (checkBoxFields, cindex) => {
                                        return (
                                          <div
                                            className="flex items-center pb-[10px]"
                                            key={cindex}
                                          >
                                            <Input
                                              type="checkbox"
                                              name={`filterFacet[${pindex}].fieldvalues[${cindex}].isInProduct`}
                                              className={
                                                "w-4 form-checkbox block cursor-pointer"
                                              }
                                            />
                                            <span className="ml-2">
                                              {checkBoxFields.fieldValue}
                                            </span>
                                          </div>
                                        );
                                      }
                                    )
                                    : ""}
                                </div>
                              </div>
                            </div>
                          </Fragment>
                        );
                      })}
                    </div>
                  );
                }}
              />
            </FormikForm>
          );
        }}
      </Formik>
    </>
  );
};

export default FilterFacet;
