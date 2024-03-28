import React, { useState, useEffect, useRef } from "react";
import { Formik, Form as FormikForm } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import CategoryInfo from "./CategoryInfo";
import { RecStatusValuebyName, UpdateMessage, anniesAnnualData } from "global/Enum";
import CategoryService from "services/admin/master/store/categoryMaster/CategoryMasterService";
import { ValidationMsgs } from "global/ValidationMessages";
import { useDispatch, useSelector } from "react-redux";
import { UpdateJsonDetails, serverError, updateStoreDetails } from "services/common/helper/Helper";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import CategoryServiceCls from "services/admin/category/CategoryService";
import TopicsDetailsServicesCls from "services/admin/topics/TopicsDetailsServices";

const Create = ({
  isAddMode,
  setFormSubmit,
  index,
  activeTab,
  values,
  storeId,
  getCategoryData,
  mainCategoryId,
  mainStoreData
}) => {
  const dispatch = useDispatch();
  const formRef = useRef();
  const [initialParentId, setInitialParentId] = useState([]);
  const location = useSelector((store) => store?.location);
  const navigate = useNavigate();
  const submitHandler = (fields, { resetForm }) => {
    if (isAddMode) {
      createCategory(fields, resetForm);
    } else {
      updateCategory(fields);
    }
  };

  const createCategory = (values, resetForm) => {
    dispatch(setAddLoading(true));
    CategoryService.createCategory({
      categoryModel: { ...values, ...location },
    })
      .then((response) => {
        if (response.data.success) {
          // store parents
          let parents = [];
          if (values.parentId.length > 0) {
            parents = values.parentId.map((value, i) => {
              return {
                id: value,
                status: RecStatusValuebyName.Active,
                rowVersion: "",
              };
            });
          } else {
            parents.push({
              id: 0,
              status: RecStatusValuebyName.Active,
              rowVersion: "",
            });
          }
          CategoryService.updateCategoryParent({
            id: response.data.data.id,
            ...location,
            storeId: storeId,
            parentCategoryId: parents,
          }).then((response) => {
            if (response.data.success) {
              UpdateJsonDetails(dispatch,UpdateMessage.categoryUpdated.message)
              resetForm({});
              getCategoryData();
            } else {
              dispatch(
                setAlertMessage({
                  type: "danger",
                  message: serverError(response),
                }),
              );
            }
          });

          dispatch(setAddLoading(false));
          // getCategoryData();
          navigate(
            `/admin/master/Configuration/CategoryMaster/edit/${response.data.data.id}`,
          );
        } else {
          dispatch(
            setAlertMessage({ type: "danger", message: serverError(response) }),
          );
          dispatch(setAddLoading(false));
        }
      })
      .catch((errors) => {
        dispatch(
          setAlertMessage({
            view: true,
            type: "danger",
            message: ValidationMsgs.category.categoryNotCreated,
          }),
        );
        dispatch(setAddLoading(false));
      });
  };

  const updateCategory = (values) => {
    let categories = [...initialParentId];
    const categoryIDs = values.parentId.map((categoryParentId) => {
      const existCategory = initialParentId.find(
        (value) => value.toString() === categoryParentId.toString(),
      );
      if (!existCategory) {
        categories = [...categories, categoryParentId];
      }
      return categoryParentId.toString();
    });

    categories = categories
      .map((value) => {
        if (categoryIDs.includes(value.toString())) {
          return { id: value, status: "A" };
        } else {
          return { id: value, status: "R" };
        }
      })
      .filter((value) => value.id !== 0);

    if (values.parentId && values.parentId.length === 0) {
      values["parentId"] = [0];
    }

    dispatch(setAddLoading(true));
    CategoryService.updateCategory({
      categoryModel: { ...values, ...location },
    })
      .then((response) => {
        if (response.data.success) {
          dispatch(setAddLoading(true));
          CategoryService.updateCategoryParent({
            id: mainCategoryId,
            ...location,
            storeId: storeId,
            parentCategoryId:
              categories.length <= 0
                ? [
                    {
                      id: 0,
                      rowVersion: "",
                      status: "A",
                    },
                  ]
                : categories,
          })
            .then(async (response) => {
              if (response.data.success) {
                // UpdateJsonDetails(dispatch,UpdateMessage.categoryUpdated.message)
                if (mainStoreData?.url) {
                  const uploadStoreDetail = await updateStoreDetails(
                    mainStoreData?.url
                  );
                  if (
                    uploadStoreDetail?.data &&
                    uploadStoreDetail?.data?.message
                  ) {
                    dispatch(
                      setAlertMessage({
                        type: "success",
                        message: ValidationMsgs.category.categoryUpdated,
                      })
                    );
                  } else {
                    dispatch(
                      setAlertMessage({
                        type: "success",
                        message: ValidationMsgs.category.categoryUpdated,
                      })
                    );
                  }
                }
                getCategoryData();
              } else {
                dispatch(
                  setAlertMessage({
                    type: "danger",
                    message: serverError(response),
                  }),
                );
              }
              dispatch(setAddLoading(false));
            })
            .catch((errors) => {
              dispatch(
                setAlertMessage({
                  view: true,
                  type: "danger",
                  message: ValidationMsgs.category.categoryNotUpdated,
                }),
              );
              dispatch(setAddLoading(false));
            });
        } else {
          dispatch(
            setAlertMessage({
              type: "danger",
              message: serverError(response),
            }),
          );
        }
        dispatch(setAddLoading(false));
      })
      .catch((errors) => {
        dispatch(
          setAlertMessage({
            type: "danger",
            message: ValidationMsgs.category.categoryNotUpdated,
          }),
        );
        dispatch(setAddLoading(false));
      });
  };

  useEffect(() => {
    if (activeTab == index) {
      setFormSubmit(formRef.current);
    }
  }, [formRef, setFormSubmit, activeTab]);

  const schema = Yup.object({
    name: Yup.string().trim().required(ValidationMsgs.category.nameRequired),
    recStatus: Yup.string().required(ValidationMsgs.common.recStatusRequired),
    displayOrder: Yup.number().required(ValidationMsgs.category.displayOrder),
  });

  return (
    <>
      <title>{isAddMode ? "Create" : "Edit"} Category</title>
      <Formik
        enableReinitialize={true}
        initialValues={{
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
          isFeatured: values?.isFeatured,
          isPopular: values?.isPopular,
          isnew: values?.isnew,
          isUses: values?.isUses,
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
        }}
        onSubmit={submitHandler}
        validationSchema={schema}
        innerRef={formRef}
      >
        {({ setFieldValue, values }) => {
          return (
            <FormikForm>
              <CategoryInfo
                setFieldValue={setFieldValue}
                values={values}
                storeId={storeId}
                isAddMode={isAddMode}
              />
            </FormikForm>
          );
        }}
      </Formik>
    </>
  );
};

export default Create;
