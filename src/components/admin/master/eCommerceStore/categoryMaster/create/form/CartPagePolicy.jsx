import React, { useRef, useEffect } from "react";
import { Form as FormikForm, Formik } from "formik";
import Textarea from "components/common/formComponent/Textarea";
import { RecStatusValuebyName, UpdateMessage } from "global/Enum";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { ValidationMsgs } from "global/ValidationMessages";
import { useDispatch, useSelector } from "react-redux";
import { UpdateJsonDetails, serverError } from "services/common/helper/Helper";
import CategoryService from "services/admin/master/store/categoryMaster/CategoryMasterService";
import Checkbox from "components/common/formComponent/Checkbox";
import CategoryServiceCls from "services/admin/category/CategoryService";
import TopicsDetailsServicesCls from "services/admin/topics/TopicsDetailsServices";
import { anniesAnnualData } from "global/Enum";

const CartPagePolicy = ({
  setFormSubmit,
  index,
  activeTab,
  values,
  storeId,
  getCategoryData,
}) => {
  const formRef = useRef();
  const dispatch = useDispatch();
  const location = useSelector((store) => store?.location);

  const initialValues = {
    id: values?.id || 0,
    name: values?.name || "",
    bannerImagePath: values?.bannerImagePath || "",
    description: values?.description || "",
    parentId: values?.parentId || [],
    storeID: storeId,
    seTitle: values?.seTitle || "",
    seKeywords: values?.seKeywords || "",
    seDescription: values?.seDescription || "",
    collectionImageURl: values?.collectionImageURl || "",
    seName: values?.seName || "",
    categoryH1: values?.categoryH1 || "",
    categoryH2: values?.categoryH2 || "",
    recStatus: values?.recStatus || RecStatusValuebyName.Active,
    rowVersion: values?.rowVersion || null,
    displayOrder: values?.displayOrder || 0,
    isCheckBoxForCartPolicy: values?.isCheckBoxForCartPolicy || false,
    cartPolicyMessage: values?.cartPolicyMessage || "",
    landingPage: values?.landingPage || "",
    customCollectionUrl: values?.customCollectionUrl || "",
    isFeatured: values?.isFeatured || false,
    isPopular: values?.isPopular || false,
    isnew: values?.isnew || false,
    isUses: values?.isUses || false,
    facetFilterUrl: values?.facetFilterUrl || "",
    isSearchPage: values?.isSearchPage || false,
  };

  const onSubmit = (fields) => {
    updateCategory(fields);
  };

  const updateCategory = (fields) => {
    dispatch(setAddLoading(true));
    CategoryService.updateCategory({
      categoryModel: { ...fields, ...location },
    })
      .then((response) => {
        if (response.data.success && response.data.data) {
          UpdateJsonDetails(dispatch,UpdateMessage.cartPagePolicyUpdated.message)
          getCategoryData();
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
            message: ValidationMsgs.category.cartPagePolicyNotUpdated,
          })
        );
        dispatch(setAddLoading(false));
      });
  };

  useEffect(() => {
    if (activeTab == index) {
      setFormSubmit(formRef.current);
    }
  }, [formRef]);

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={onSubmit}
        innerRef={formRef}
        validateOnChange={true}
        validateOnBlur={false}
      >
        {({ setFieldValue, values }) => {
          return (
            <FormikForm>
              <div className="w-full p-6">
                <div className="pt-[10px]">
                  <div className="w-full">
                    <div className="w-full mb-6 last:mb-0">
                      <Checkbox
                        type="checkbox"
                        className="form-checkbox"
                        name={"isCheckBoxForCartPolicy"}
                        checked={values.isCheckBoxForCartPolicy}
                        onChange={(e) => {
                          setFieldValue(
                            "isCheckBoxForCartPolicy",
                            e.target.checked
                          );
                        }}
                      />
                      <span className="text-sm font-medium ml-2">
                        With Checkbox
                      </span>
                    </div>
                    <div className="w-full mb-6 last:mb-0">
                      <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                        Message:
                      </label>
                      <Textarea
                        name={"cartPolicyMessage"}
                        type="text"
                        placeholder=""
                        className="text-gray-700 border-gray-200 rounded focus:outline-none focus:bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </FormikForm>
          );
        }}
      </Formik>
    </>
  );
};

export default CartPagePolicy;
