import React, { useEffect, useRef } from "react";
import Input from "components/common/formComponent/Input";
import { Formik, Form as FormikForm } from "formik";
import { RecStatusValuebyName, UpdateMessage } from "global/Enum";
import { useDispatch, useSelector } from "react-redux";
import CategoryService from "services/admin/master/store/categoryMaster/CategoryMasterService";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { ValidationMsgs } from "global/ValidationMessages";
import { UpdateJsonDetails, serverError } from "services/common/helper/Helper";
import * as Yup from "yup";
import CategoryServiceCls from "services/admin/category/CategoryService";
import TopicsDetailsServicesCls from "services/admin/topics/TopicsDetailsServices";
import { anniesAnnualData } from "global/Enum";

const CategorySEO = ({
  values,
  activeTab,
  index,
  setFormSubmit,
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

  const validationSchema = Yup.object({
    seTitle: Yup.string().required(ValidationMsgs.category.seTitle),
    seKeywords: Yup.string().required(ValidationMsgs.category.seKeywords),
    seDescription: Yup.string().required(ValidationMsgs.category.seDescription),
  });

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
          UpdateJsonDetails(dispatch,UpdateMessage.seoUpdated.message)
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
            message: ValidationMsgs.category.seoNotUpdated,
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
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        innerRef={formRef}
      >
        {({ values }) => {
          return (
            <FormikForm className="space-y-6">
              <div className="w-full p-6">
                <div className="w-full">
                  <div className="w-full mb-6 last:mb-0">
                    <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                      Title
                      <span className="text-rose-500 text-lg leading-none">
                        *
                      </span>
                    </label>
                    <Input id="seTitle" name={`seTitle`} type="text" />
                  </div>
                  <div className="w-full mb-6 last:mb-0">
                    <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                      Keywords
                      <span className="text-rose-500 text-lg leading-none">
                        *
                      </span>
                    </label>
                    <Input id="seKeywords" name={`seKeywords`} type="text" />
                  </div>
                  <div className="w-full mb-6 last:mb-0">
                    <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                      Description
                      <span className="text-rose-500 text-lg leading-none">
                        *
                      </span>
                    </label>
                    <Input
                      id="seDescription"
                      name={`seDescription`}
                      type="text"
                    />
                  </div>
                  <div className="w-full mb-6 last:mb-0">
                    <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                      H1 Tag:
                    </label>
                    <Input id="categoryH1" name={`categoryH1`} type="text" />
                  </div>
                  <div className="w-full mb-6 last:mb-0">
                    <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                      H2 Tag:
                    </label>
                    <Input id="categoryH2" name={`categoryH2`} type="text" />
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

export default CategorySEO;
