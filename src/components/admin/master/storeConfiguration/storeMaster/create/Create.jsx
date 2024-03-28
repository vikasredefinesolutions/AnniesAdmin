
import React, { useEffect, useState, Fragment, useCallback } from "react";
import { Form as FormikForm, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";

import { anniesAnnualData, blobFolder, RecStatusValuebyName, UpdateMessage } from "global/Enum";
import { ToolTipsMessages } from "global/ToolTipsMessages";
import { ValidationMsgs } from "global/ValidationMessages";
import { productType } from "dummy/Dummy";

import { TitleNameHelper, UpdateJsonDetails, serverError, updateStoreDetails } from "services/common/helper/Helper";
import StoreService from "services/admin/store/StoreService";
import DropdownService from "services/common/dropdown/DropdownService";

import Input from "components/common/formComponent/Input";
import ImageFile from "components/common/formComponent/ImageFile";
import Messages from "components/common/alerts/messages/Index";
import ToggleButton from "components/common/formComponent/ToggleButton";
import Dropdown from "components/common/formComponent/Dropdown";
import InputNumber from "components/common/formComponent/InputNumber";
import CreateFileHeader from "components/common/CreateFileHeader";
import RadioButton from "components/common/formComponent/RadioButton";
import CKEditor from "components/common/formComponent/CKEditor";
import Checkbox from "components/common/formComponent/Checkbox";
import ToolTipComponent from "components/common/ToolTips";
import CategoryServiceCls from "services/admin/category/CategoryService";
import TopicsDetailsServicesCls from "services/admin/topics/TopicsDetailsServices";

function Create() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useSelector((store) => store?.location);
  const CompanyId = useSelector((store) => store?.CompanyConfiguration.id)

  // const [attributesOptions, setAttributesOptions] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentOptions, setPaymentOptions] = useState([]);
  // const [ShippingChargesData, setShippingChargesData] = useState([]);

  const [storeTypeOptions, setStoreTypeOptions] = useState([]);
  const [BrandOptions, setBrandOptions] = useState([]);
  const [StoreOptions, setStoreOptions] = useState([]);
  const [initialPayOptions, setInitialPayOptions] = useState([]);
  const [paymentOptionForCheckbox, setpaymentOptionForCheckbox] = useState({});
  const [payBy, setPayBy] = useState([]);
  const [data, setData] = useState({});
  const [StoreTypeId, setStoreTypeId] = useState(data?.storeTypeId);
  const [ParentStoreId, setParentStoreId] = useState(data?.parentstoreid);
  const [initialBrands, setInitialBrand] = useState([]);
  const [ChildStoreBrands, setChildStoreBrands] = useState([]);
  const [ShippingServicesOptions, setShippingServicesOptions] = useState([]);
  const [ShippingMethodTypes, setShippingMethodTypes] = useState([]);
  const [ShippingServiceId, setShippingServiceId] = useState([]);
  const [initialShippingMethod, setInitialShippingMethod] = useState([]);

  const FolderPath = `/${blobFolder.temp}/${CompanyId}/${blobFolder.store}`
  const isAddMode = !id;

  const getStoreData = useCallback(() => {
    if (id) {
      dispatch(setAddLoading(true))
      StoreService.getPaymentOptions().then((res) => {
        var PaymentResponse = res.data;
        if (PaymentResponse?.success) {
          setPayBy(res?.data?.data);

          StoreService.getStoreById(id).then((res) => {
            var response = res.data;

            if (response?.data?.storeType?.id === 1 || response?.data?.storeType?.id === 2) {
              setShowPayment(true)
            } else {
              setShowPayment(false)
            }

            if (response.success && response.data) {
              setData(response?.data);
              setInitialBrand(response?.data?.storeParentBrandList);
              setChildStoreBrands(response?.data?.childStoreParentBrandViewModels);
              if (response.data.shippingMethod.length > 0) {
                setInitialShippingMethod(response.data.shippingMethod);
              }
              // this setter function helps to prefill payment option
              if ((response?.data?.storeType?.id === 1 || response?.data?.storeType?.id === 2) && res.data.data.storeXPaymetnOptionListViewModels.length > 0) {
                PaymentResponse.data.map((ourPayBy) => {
                  res.data.data.storeXPaymetnOptionListViewModels.map((PaymentOption) => {
                    if (PaymentOption?.paymentOptionId) {
                      setpaymentOptionForCheckbox((prevVal) => ({
                        ...prevVal,
                        [ourPayBy.name]: { valBool: false, value: ourPayBy.id }
                      }))
                    }
                  })
                  res.data.data.storeXPaymetnOptionListViewModels.map((PaymentOption) => {
                    if (PaymentOption?.paymentOptionId === ourPayBy.id) {
                      setpaymentOptionForCheckbox((prevVal) => ({
                        ...prevVal,
                        [ourPayBy.name]: { valBool: true, value: PaymentOption.paymentOptionId }
                      }))
                    }
                  })
                })
              }
              setInitialPayOptions(res?.data?.data?.storeXPaymetnOptionListViewModels);

              // StoreService.getShippingChargesById(id).then((res) => {
              //   var response = res?.data;
              //   if (response.success && response.data) {
              //     setShippingChargesData(res?.data?.data);
              //   } else {
              //     dispatch(
              //       setAlertMessage({
              //         type: "danger",
              //         message: "Shipping Data Not Found",
              //       })
              //     );
              //   }
              // })
              //   .catch((err) => {
              //   });
              dispatch(setAddLoading(false))
            } else {
              dispatch(
                setAlertMessage({
                  type: "danger",
                  message: "Store Not Found",
                })
              );
              dispatch(setAddLoading(false))
              navigate("/admin/master/Store")
            }
          })
        }
      }).catch((err) => {
        dispatch(setAddLoading(false))
      });
    }
  }, [id])

  const getStoreListByStoreTypeId = () => {
    dispatch(setAddLoading(true))

    StoreService.getStoreListByStoreTypeId(0, StoreTypeId)
      .then((res) => {
        var response = res?.data;
        if (response.success && response.data) {
          const arr = res?.data?.data;
          arr.forEach(object => {
            if (object.label === data.name) {
              object.isDisabled = true;
            }
          });
          setStoreOptions(arr);
        }
        dispatch(setAddLoading(false))
      })
      .catch((err) => {
        dispatch(setAddLoading(false))
      });
  }

  const initialState = {
    id: data?.id || 0,
    name: data?.name || "",
    code: data?.code || "",
    parentstoreid: data?.parentstoreid || 0,
    brandId: data?.storeParentBrandList?.map((brands) => brands.brandId) || [],
    storeTypeId: data?.storeTypeId || "",
    shippingServiceId: data?.shippingServices || [],
    shippingMethodId: initialShippingMethod.map((shippingId) => shippingId.shippingMethodId) || [],
    url: data?.url || "",
    navCode: data?.navCode || "",
    prefix: data?.prefix || "",
    paymentOptionId: data?.paymentOptionId || "",
    recStatus: data?.recStatus || RecStatusValuebyName.Active,
    logoUrl: data?.logoUrl || "",
    emailLogo: data?.emailLogo || "",
    isLandingPage: data?.isLandingPage || false,
    isBlogPage: data?.isBlogPage || false,
    isReviewMaster: data?.isReviewMaster || false,
    isSeoMarketing: data?.isSeoMarketing || false,
    isAttributeSaparateProduct: data?.isAttributeSaparateProduct || false,
    isLinepersonalization: data?.isLinepersonalization || false,
    firstLineCharges: data?.firstLineCharges || 0,
    secondLineCharges: data?.secondLineCharges || 0,
    isSmallRun: data?.isSmallRun || false,
    smallRunLimit: data?.smallRunLimit || 0,
    smallRunFeesCharges: data?.smallRunFeesCharges || 0,
    isLogoSetupCharges: data?.isLogoSetupCharges || false,
    logoSetupCharges: data?.logoSetupCharges || 0,
    isProductReadinessAllow: data?.isProductReadinessAllow || false,
    isSeoReadinessAllow: data?.isSeoReadinessAllow || false,
    isQuantityDiscount: data?.isQuantityDiscount || false,
    isFirstLogoFree: typeof data?.isFirstLogoFree === "boolean" ? data?.isFirstLogoFree : true,
    attributeid: data?.attributeid || 2,
    rowVersion: data?.rowVersion || "",
    paymentOption: paymentOptionForCheckbox,
    isShippingCharge: data.isShippingCharge || false,
    isFreeShipping: data.isFreeShipping || false,
    isGeneral: data?.isGeneral || data?.isFreeShipping === true ? false : true,
    generalAmount: data.isFreeShipping ? data?.generalAmount : 0 || 0,
    checkOutRequiredThirdPartyLogin: data?.checkOutRequiredThirdPartyLogin || false,
    generalLogin: data?.generalLogin || (data?.thirdPartyLogin || data?.bothLogin || data?.onlyGuestLogin === true ? false : true),
    thirdPartyLogin: data?.thirdPartyLogin || false,
    bothLogin: data?.bothLogin || false,
    onlyGuestLogin: data?.onlyGuestLogin || false,
    domainBasedLogin: data?.domainBasedLogin || false,
    domainBasedLoginDesc: data?.domainBasedLoginDesc || "",
    punchoutMessage: data?.punchoutMessage || "",
    billToCustomer: data?.billToCustomer || "",
    favicon: data?.favicon || "",
    shippingChargeType: data?.shippingChargeType || 0,
    isCustomerRegistrationApprovalRequired: data?.isCustomerRegistrationApprovalRequired || false,
    isAllowToReuseApprovedLogo: data?.isAllowToReuseApprovedLogo || false,
    isSewOutEnable: data?.isSewOutEnable || false,
    isOrganizationName: data?.isOrganizationName || false,
    IsGA4: data?.isGA4 || false,
    isPriceSync: data?.isPriceSync || false,
    IsAddToCartRequiredForStore: data?.isAddToCartRequiredForStore || false,
    IsLoginRequiredForStore: data?.isLoginRequiredForStore || false,
    sewOutCharges: data?.sewOutCharges || 0,
    isAllowEmployeeLogin: data?.isAllowEmployeeLogin || false,
    isBrandDiscount: data?.isBrandDiscount || false,
    firstLogoCharge: data?.firstLogoCharge || 0,
    secondLogoCharge: data?.secondLogoCharge || 0,
    isLogoCustomization: data?.isLogoCustomization || false,
    isGiftCardValidatebyEmail: data?.isGiftCardValidatebyEmail || false,
  }

  const validationSchema = Yup.object({
    name: Yup.string().trim().required(ValidationMsgs.store.nameRequired).matches(/[^\s*].*[^\s*]/g, ValidationMsgs.common.FieldSpaceCheck),
    storeTypeId: Yup.number().integer().min(1).required(ValidationMsgs.store.storeTypeIdRequired),
    prefix: Yup.string().trim().required(ValidationMsgs.store.prefixRequired),
    navCode: Yup.string().trim().required(ValidationMsgs.store.navCodeRequired),
    // attributeid: Yup.string().trim().when('isAttributeSaparateProduct', {
    //   is: true,
    //   then: Yup.string().trim().required(ValidationMsgs.store.attributeidRequired),
    // }),
    firstLineCharges: Yup.string().trim().when('isLinepersonalization', {
      is: true,
      then: Yup.string().trim().required(ValidationMsgs.store.firstLineCharges),
    }),
    secondLineCharges: Yup.string().trim().when('isLinepersonalization', {
      is: true,
      then: Yup.string().trim().required(ValidationMsgs.store.secondLineCharges),
    }),
    smallRunLimit: Yup.string().trim().when('isSmallRun', {
      is: true,
      then: Yup.string().trim().required(ValidationMsgs.store.smallRunLimit),
    }),
    smallRunFeesCharges: Yup.string().trim().when('isSmallRun', {
      is: true,
      then: Yup.string().trim().required(ValidationMsgs.store.smallRunFeesCharges),
    }),
    logoSetupCharges: Yup.string().trim().when('isLogoSetupCharges', {
      is: true,
      then: Yup.string().trim().required(ValidationMsgs.store.logoSetupCharges),
    }),
    // brandId: Yup.array().min(ParentStoreId !== 0, "Brand is Required"),
    brandId: Yup.array().when('parentstoreid', {
      is: (parentstoreid) =>
        parentstoreid !== 0,
      then: Yup.array().min(1, ValidationMsgs.common.brandIdRequired).required(ValidationMsgs.common.brandIdRequired),
      otherwise: Yup.array().nullable(),
    }),
    url: Yup.string().trim()
      .matches(
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
        ValidationMsgs.common.validURL
      ).required(ValidationMsgs.seoConfig.urlRequired),
    generalAmount: Yup.number().when("isFreeShipping", {
      is: (isFreeShipping) => isFreeShipping === true,
      then: Yup.number().required(ValidationMsgs.store.generalAmount),
    }),
    shippingServiceId: Yup.array().when("shippingChargeType", {
      is: (shippingChargeType) => shippingChargeType === 3,
      then: Yup.array().min(1, ValidationMsgs.store.shippingServiceId).required(ValidationMsgs.store.shippingServiceId)
    }),
    shippingMethodId: Yup.array().when("shippingChargeType", {
      is: (shippingChargeType) => shippingChargeType === 3,
      then: Yup.array().min(1, ValidationMsgs.store.shippingMethodId).required(ValidationMsgs.store.shippingMethodId),
    }),
    sewOutCharges: Yup.string().trim().when("isSewOutEnable", {
      is: true,
      then: Yup.string().trim().required(ValidationMsgs.store.sewOutCharges),
    }),
    firstLogoCharge: Yup.number().when("isFirstLogoFree", {
      is: true,
      then: Yup.number().required(ValidationMsgs.store.firstLogoCharges)
    }),
    secondLogoCharge: Yup.number().required(ValidationMsgs.store.secondLogoCharges)
  })

  const CreateUpdateChildStore = (fields, resetForm) => {
    let brands = [...initialBrands];
    const brand = fields.brandId.map((brandIdData) => {
      const existBrand = initialBrands.find((value) => value.brandId.toString() === brandIdData.toString());
      if (!existBrand) {
        brands.push({
          id: 0,
          rowVersion: "",
          storeId: id,
          brandId: brandIdData,
          recStatus: RecStatusValuebyName.Active,
        })
      }
      return brandIdData.toString();
    })

    brands = brands.map((brandValue) => {
      brandValue["location"] = location.location;
      brandValue["ipAddress"] = location.ipAddress;
      brandValue["macAddress"] = location.macAddress;
      brandValue["storeId"] = id;
      delete brandValue["brandName"]
      if (brand.includes(brandValue.brandId.toString())) {
        return { ...brandValue, recStatus: RecStatusValuebyName.Active };
      } else {
        return { ...brandValue, recStatus: RecStatusValuebyName.Archived };
      }
    });
    if (brands?.length > 0) {
      StoreService.CreateUpdateChildStore({ storeParentBrandModel: brands }).then((response) => {
        if (response.data.success) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.store.storeUpdated
            })
          );
        } else {
          dispatch(setAlertMessage({ type: "danger", message: serverError(response) }));
        }
      }).catch((errors) => {
        dispatch(setAlertMessage({ type: "danger", message: "Brand not Updated" }));
      });
    }
  }

  const CreateUpdateShippingMethod = (values) => {
    let ShippingMethodDataUpdate = [...initialShippingMethod];

    const shippingMethodId = values.shippingMethodId.map((shippingData) => {
      const existShippingId = initialShippingMethod.find((value) => value.shippingMethodId.toString() === shippingData.toString());
      if (!existShippingId) {
        ShippingMethodDataUpdate = [...ShippingMethodDataUpdate, { shippingMethodId: shippingData, rowVersion: "", status: RecStatusValuebyName.Active }]
      }
      return shippingData.toString();
    })

    ShippingMethodDataUpdate = ShippingMethodDataUpdate.map((shipMethodData) => {
      if (shippingMethodId.includes(shipMethodData.shippingMethodId.toString())) {
        return { ...shipMethodData, rowVersion: shipMethodData.rowVersion, status: RecStatusValuebyName.Active };
      } else {
        return { ...shipMethodData, rowVersion: shipMethodData.rowVersion, status: RecStatusValuebyName.Archived };
      }
    });

    StoreService.CreateUpdateStoreShippingMethod({
      storeXShippingModel: {
        id: 0,
        ...location,
        storeXShippingLists: ShippingMethodDataUpdate,
        storeId: id,
      }
    })
    //   .then((response) => {
    //   if (response.data.data) {
    //     dispatch(
    //       setAlertMessage({
    //         view: true,
    //         type: "success",
    //         message: "Vivek3",
    //         // message: ValidationMsgs.store.storeUpdated,
    //       })
    //     );
    //   } else {
    //     dispatch(
    //       setAlertMessage({
    //         view: true,
    //         type: "danger",
    //         message: serverError(response),
    //       })
    //     );
    //   }
    // })
      .catch((errors) => {
      if (errors.response.data.Errors.Error) {
        dispatch(
          setAlertMessage({
            message: errors.response.data.Errors.Error,
            type: "danger",
          })
        );
      } else {
        dispatch(
          setAlertMessage({ message: ValidationMsgs.shippingMethod.shippingMethodNotUpdated, type: "danger" })
        );
      }
    });
  }

  // const createStore = (fields, resetForm) => {
  //   dispatch(setAddLoading(true))
  //   StoreService.createStore({
  //     storeModel: {
  //       ...fields,
  //       attributeid: (fields.attributeid && fields.attributeid !== '' ? fields.attributeid : 0),
  //       ...location
  //     },
  //   }).then((response) => {
  //     if (response.data.success) {
  //       dispatch(
  //         setAlertMessage({
  //           type: "success",
  //           message: "",
  //         })
  //       );

  //       // Shipping Method API
  //       if (fields.shippingMethodId) {
  //         const ShippingMethod = fields.shippingMethodId.map((value, i) => {
  //           return {
  //             shippingMethodId: value,
  //             rowVersion: "",
  //             status: RecStatusValuebyName.Active
  //           }
  //         })
  //         if (ShippingMethod?.length > 0) {
  //           StoreService.CreateUpdateStoreShippingMethod({
  //             storeXShippingModel: {
  //               id: 0,
  //               ...location,
  //               storeXShippingLists: ShippingMethod,
  //               storeId: response.data.data.id,
  //             }
  //           }).then((response) => {
  //             if (response.data.data) {
  //               dispatch(
  //                 setAlertMessage({
  //                   view: true,
  //                   type: "success",
  //                   message: '',
  //                 })
  //               );
  //               getStoreData();
  //             } else {
  //               dispatch(
  //                 setAlertMessage({
  //                   view: true,
  //                   type: "danger",
  //                   message: serverError(response),
  //                 })
  //               );
  //             }

  //           }).catch((errors) => {
  //             if (errors.response.data.Errors.Error) {
  //               dispatch(
  //                 setAlertMessage({
  //                   message: errors.response.data.Errors.Error,
  //                   type: "danger",
  //                 })
  //               );
  //             } else {
  //               dispatch(
  //                 setAlertMessage({ message: ValidationMsgs.shippingMethod.shippingMethodNotCreated, type: "danger" })
  //               );
  //             }
  //           });
  //         }
  //       }

  //       //Child Store API
  //       if (fields?.brandId.length > 0) {
  //         const brand = fields.brandId.map((value, i) => {
  //           return {
  //             id: 0,
  //             rowVersion: "",
  //             storeId: response?.data?.data?.id,
  //             brandId: value,
  //             recStatus: "A",
  //             ...location
  //           }
  //         })

  //         StoreService.CreateUpdateChildStore({ storeParentBrandModel: brand }).then((response) => {
  //           if (response.data.success) {
  //             dispatch(
  //               setAlertMessage({
  //                 type: "success",
  //                 message: ValidationMsgs.store.storeCreated
  //               })
  //             );
  //           } else {
  //             dispatch(setAlertMessage({ type: "Warning", message: serverError(response) }));
  //           }
  //         }).catch((errors) => {
  //           dispatch(setAlertMessage({ type: "danger", message: "Brand not added successfully" }));
  //         });
  //       }

  //       // Payment API
  //       if (showPayment) {

  //         let ourSelectedPaymentOption = [];

  //         Object.values(paymentOptions).map((payOptionData) => {
  //           if (payOptionData.valBool) {
  //             ourSelectedPaymentOption.push(
  //               {
  //                 paymentOptionId: payOptionData.value,
  //                 rowVersion: "",
  //                 status: RecStatusValuebyName.Active,
  //               }
  //             )
  //           }
  //         })

  //         StoreService.CreateAndUpdateStorePaymentOption({
  //           storeXPaymentOptionModel: {
  //             id: response.data.data.id,
  //             ...location,
  //             storexpaymentoptionlist: ourSelectedPaymentOption,
  //           },
  //         })
  //           .then((response) => {
  //             if (response.data.success) {
  //               dispatch(
  //                 setAlertMessage({
  //                   type: "success",
  //                   message: ValidationMsgs.store.storeCreated,
  //                 })
  //               );
  //               resetForm({});
  //             } else {
  //               dispatch(
  //                 setAlertMessage({
  //                   type: "danger",
  //                   message: serverError(response),
  //                 })
  //               );
  //             }
  //           }).catch((errors) => {
  //             dispatch(
  //               setAlertMessage({
  //                 type: "danger",
  //                 message: ValidationMsgs.store.storeNotCreated,
  //               })
  //             );
  //           });
  //       }
  //       dispatch(setAddLoading(false))
  //       navigate(`/admin/configurator/storeconfiguration/edit/${response?.data?.data?.id}`)
  //       resetForm({});
  //     } else {
  //       dispatch(
  //         setAlertMessage({
  //           type: "danger",
  //           message: serverError(response),
  //         })
  //       );
  //       dispatch(setAddLoading(false))
  //     }
  //   }).catch((errors) => {
  //     dispatch(
  //       setAlertMessage({
  //         type: "danger",
  //         message: ValidationMsgs.store.storeNotCreated,
  //       })
  //     );
  //     dispatch(setAddLoading(false))
  //   });
  // }

  const updateStore = (fields) => {
    dispatch(setAddLoading(true))
    StoreService.updateStore({
      storeModel: {
        ...fields,
        attributeid: (fields.attributeid && fields.attributeid !== '' ? fields.attributeid : 0),
        ...location
      },
    }).then(async (response) => {
      localStorage.setItem('FrontApiURL', response.data.data?.frontApiUrl);
      localStorage.setItem('StoreURL', response.data.data?.url);
      if (response.data.success) {
        if (response && response?.data?.data?.url) {
          const updateStoreDetail = await updateStoreDetails(fields?.url);
          if (updateStoreDetail?.data && updateStoreDetail?.data?.message) {
            dispatch(
              setAlertMessage({
                type: "success",
                message: "",
              })
            );
          }
        }

        // Shipping Charges API
        if (fields?.shippingMethodId) {
          CreateUpdateShippingMethod(fields, id);
        }

        //Child Store API
        if (fields?.brandId) {
          CreateUpdateChildStore(fields)
        }

        // Payment API
        if (showPayment) {
          const previouslyAddedPayOptionsFromDb = [...initialPayOptions];
          const finallySelectedPaymentOptionForDb = []

          // initialPayOptions data is from our API (from where we are getting our previously added payment options )
          Object.entries(paymentOptions).map((paymentMethodData) => {
            if (paymentMethodData[1].valBool === true) {
              const existPayId = previouslyAddedPayOptionsFromDb.find((value) => value.paymentOptionId === paymentMethodData[1].value);

              if (existPayId) {
                finallySelectedPaymentOptionForDb.push({ ...existPayId, paymentOptionId: paymentMethodData[1].value, rowVersion: paymentMethodData.rowVersion || "", status: 'A' })
              }
              else {
                finallySelectedPaymentOptionForDb.push({ paymentOptionId: paymentMethodData[1].value, rowVersion: paymentMethodData.rowVersion || "", status: 'A' })
              }
            }
          })

          previouslyAddedPayOptionsFromDb.map((oldPromotionData) => {
            const foundSameApplyIdAsNewArrayContain = finallySelectedPaymentOptionForDb.some((newPromotionApplyId) => (newPromotionApplyId.paymentOptionId === oldPromotionData.paymentOptionId));

            if (!foundSameApplyIdAsNewArrayContain) {
              finallySelectedPaymentOptionForDb.push({
                paymentOptionId: oldPromotionData.paymentOptionId,
                rowVersion: oldPromotionData.rowVersion,
                status: RecStatusValuebyName?.Archived,
              })
            }
          });

          StoreService.CreateAndUpdateStorePaymentOption({
            storeXPaymentOptionModel: {
              id: id,
              ...location,
              storexpaymentoptionlist: finallySelectedPaymentOptionForDb,
            },
          })
            // .then((response) => {
            // if (response.data.success) {
            //   console.log("message",ValidationMsgs.store.storeUpdated)
            //   dispatch(
            //     setAlertMessage({
            //       type: "success",
            //       message: ValidationMsgs.store.storeUpdated,
            //     })
            //   );

            // } else {
            //   dispatch(
            //     setAlertMessage({
            //       type: "danger",
            //       message: serverError(response),
            //     })
            //   );
            // }
            // })
            .catch((errors) => {
            dispatch(
              setAlertMessage({
                type: "danger",
                message: ValidationMsgs.store.storeNotUpdated,
              })
            );
          });
        }
        setTimeout(() => {
          getStoreData();
        }, 0);
      } else {
        dispatch(
          setAlertMessage({
            type: "danger",
            message: serverError(response),
          })
        );
      }
      dispatch(setAddLoading(false))
    }).catch((errors) => {
      dispatch(
        setAlertMessage({
          type: "danger",
          message: ValidationMsgs.store.storeNotUpdated,
        })
      );
      dispatch(setAddLoading(false))
    });
  }

  const onSubmit =  (fields, { resetForm }) => {
    // if (isAddMode) {
    //   createStore(fields, resetForm);
    // } else {
    updateStore(fields, resetForm);
    // }
  }

  const handleChange = (e, setFieldValue, name) => {
    if (e.value === "1" || e.value === "2") {
      setShowPayment(true)
    } else {
      setShowPayment(false)
    }

    setFieldValue(name, (e ? e.value : ''))
    if (name === "parentstoreid") {
      setParentStoreId(e.value);
    }
    if (name === "storeTypeId") {
      setStoreTypeId(e.value)
      if (StoreTypeId !== e.value) {
        setFieldValue("brandId", [])
        setFieldValue("parentstoreid", 0)
      }
    }
  };

  const handleChangePaymentOption = (e, setFieldValue, values, paybydata) => {
    const checkOtherPayOptions = e.target.name.substring(
      e.target.name.indexOf("[") + 1,
      e.target.name.lastIndexOf("]")
    );

    const CurrentPaymentVal = (values.paymentOption && values.paymentOption[checkOtherPayOptions]) ? { valBool: !values.paymentOption[checkOtherPayOptions]["valBool"], value: paybydata.id } : { valBool: true, value: paybydata.id };

    setFieldValue(`${e.target.name}`, CurrentPaymentVal);

    if (!paybydata.isMultipleSelect) {
      let MultiPaymentWithFalse = payBy.filter((paybydata) => !paybydata.isMultipleSelect)
      MultiPaymentWithFalse.map((SingleMultiPaymentWithFalse) => {
        if (SingleMultiPaymentWithFalse.name !== checkOtherPayOptions) {
          setFieldValue(`paymentOption[${SingleMultiPaymentWithFalse.name}]`, { valBool: false, value: SingleMultiPaymentWithFalse.id });
        }
      })
    }
    if (checkOtherPayOptions === "None") {
      payBy.map((SingleMultiPaymentWithFalse) => {
        if (SingleMultiPaymentWithFalse.name !== "None") {
          setFieldValue(`paymentOption[${SingleMultiPaymentWithFalse.name}]`, { valBool: false, value: SingleMultiPaymentWithFalse.id });
        }
      })
    } else if (paybydata.isMultipleSelect) {
      let GetNoneId = payBy.find((PayOptName) => PayOptName.name === "None")
      setFieldValue(`paymentOption["None"]`, {
        valBool: false, value: GetNoneId.id
      });
    }

  };

  const handleShippingChargeType = (e, setFieldValue) => {
    setFieldValue("shippingChargeType", e.target.value);
  }

  useEffect(() => {
    DropdownService.getDropdownValues("storetype").then((res) => {
      if (res.data.success) {
        setStoreTypeOptions(() => {
          return res.data.data;
        });
      }
    });
    // DropdownService.getDropdownValues("attributes").then((res) => {
    //   if (res.data.success) {
    //     setAttributesOptions(() => {
    //       return res.data.data;
    //     });
    //   }
    // });
    setStoreTypeId(data.storeTypeId);
  }, [data.storeTypeId]);

  useEffect(() => {
    DropdownService.getDropdownValues("storebrand", false, ParentStoreId || data?.parentstoreid).then((res) => {
      if (res.data.success) {
        setBrandOptions(() => {
          return res.data.data;
        });
      }
    });
  }, [ParentStoreId, data?.parentstoreid]);

  useEffect(() => {
    if (!isAddMode) {
      getStoreData();
    }
  }, [id]);

  useEffect(() => {
    StoreService.getPaymentOptions()
      .then((res) => {
        var PaymentResponse = res.data;
        if (PaymentResponse.success) {
          setPayBy(res.data.data);
        }
      })
  }, []);

  useEffect(() => {
    getStoreListByStoreTypeId()
  }, [StoreTypeId])

  useEffect(() => {
    DropdownService.getDropdownValues("shippingServices").then((res) => {
      if (res.data.success) {
        setShippingServicesOptions(() => {
          return res.data.data;
        });
      }
    });
  }, [])

  useEffect(() => {
    if (ShippingServiceId.length > 0) {
      StoreService.getShippingMethodByShippingServiceId({
        shippingServiceId: ShippingServiceId,
        storeId: id || 0
      }).then((res) => {
        var response = res?.data;
        // var UpdatedDropDownData = response?.data.map((UpdateDropData) => ({ value: UpdateDropData.id, label: UpdateDropData.name }))
        if (response.success) {
          setShippingMethodTypes(response.data);
        }
      }).catch((err) => { });
    }
  }, [ShippingServiceId, id])

  // this is for prefilled payment option
  useEffect(() => {
    if (initialPayOptions.length > 0) {
      payBy.map((ourPayBy) => {
        Object.values(paymentOptionForCheckbox).map((PaymentOption) => {
          if (PaymentOption.paymentOptionId === ourPayBy.id) {
            setpaymentOptionForCheckbox((prevVal) => ({
              ...prevVal,
              [ourPayBy.name]: { valBool: true, value: PaymentOption.paymentOptionId }
            }))
          }
        })
      })
    }
  }, [initialPayOptions, payBy])

  return (
    <>
      <title>{isAddMode === true ? "Add " : "Edit "}{TitleNameHelper({ defaultTitleName: `Store` })}</title>
      <Formik
        enableReinitialize={true}
        initialValues={initialState}
        validationSchema={validationSchema}
        validateOnMount={true}
        validateOnBlur={true}
        onSubmit={onSubmit}
      >
        {({ setFieldValue, errors, values, setValues, validateForm, setFieldError }) => {
          if (Object.keys(values.paymentOption).length > 0) {
            setPaymentOptions(values.paymentOption)
          }
          setShippingServiceId(values.shippingServiceId || data?.shippingServices)
          if (values.parentstoreid === "") {
            setFieldValue("parentstoreid", 0)
            setParentStoreId(0)
            if (values.parentstoreid === 0) {
              setFieldValue("brandId", [])
            }
          }
          if (values.parentstoreid === 0) {
            setParentStoreId(0)
          }
          return (
            <FormikForm>
              <div className="px-4 sm:px-6 lg:px-8 py-8 w-full">

                <CreateFileHeader url="/admin/configurator/storeconfiguration" module={isAddMode === true ? `Add ${TitleNameHelper({ defaultTitleName: `Store` })}` : `Edit ${TitleNameHelper({ defaultTitleName: `Store` })}`} errors={errors} validateForm={validateForm} />
                <Messages />
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-full">
                    <div className="bg-white shadow-lg rounded-md border border-neutral-200 p-6 mb-6">
                      <div className="block uppercase tracking-wide text-gray-500 text-lg font-bold mb-6"> Store Information </div>

                      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="w-full">
                          <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                            Store Type
                            <span className="text-rose-500 text-2xl leading-none">*</span>
                          </label>
                          <Dropdown
                            label="Store Type"
                            name="storeTypeId"
                            options={storeTypeOptions}
                            defaultValue={values.storeTypeId}
                            isDisabled={id ? true : false}
                            onChange={(e) => handleChange(e, setFieldValue, "storeTypeId")}
                          >
                            <option value={0} disabled >Select Store Type</option>
                          </Dropdown>
                        </div>
                        <div className="w-full">
                          <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                            Store Name
                            <span className="text-rose-500 text-2xl leading-none">*</span>
                          </label>
                          <Input type={"text"} name="name" maxLength={60} />
                        </div>
                        <div className="w-full">
                          <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">Store Code
                            <span className="text-rose-500 text-2xl leading-none"></span>
                          </label>
                          <Input type={"text"} name="code" maxLength={30} />
                        </div>

                        <div className="w-full">
                          <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">Store URL
                            <span className="text-rose-500 text-2xl leading-none">*</span>
                          </label>
                          <Input type={"text"} name="url" maxLength={255} />
                        </div>

                        <div className="w-full">
                          <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">Store NAV Code
                            <span className="text-rose-500 text-2xl leading-none">*</span>
                          </label>
                          <Input value={values.navCode} onChange={(e) => { setFieldValue('navCode', e.target.value) }} type={"text"} name="navCode" displayError={true} maxLength={30} />
                        </div>
                        <div className="w-full">
                          <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">Store Prefix
                            <span className="text-rose-500 text-2xl leading-none">*</span>
                          </label>
                          <Input type={"text"} name="prefix" value={values.prefix} onChange={(e) => { setFieldValue('prefix', e.target.value) }} displayError={true} maxLength={30} />
                        </div>
                        <div className="w-full">
                          {(values.storeTypeId === productType.CorporateStore || values.storeTypeId === productType.StoreBuilder || values.storeTypeId === productType.FormBuilder) ? "" :
                            <>
                              <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">Parent Store</label>
                              <Dropdown
                                label="parentstoreid"
                                name="parentstoreid"
                                options={StoreOptions}
                                defaultValue={values.parentstoreid}
                                onChange={(e) => handleChange(e, setFieldValue, "parentstoreid")}
                                isDisabled={!isAddMode ? true : false}
                              />
                            </>
                          }
                        </div>
                        {(values.storeTypeId === productType.StoreBuilder || values.storeTypeId === productType.FormBuilder) ? <div className="w-full"></div> :
                          <>
                            <div className="w-full">
                              <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">Bill To Customer
                                {/* <span className="text-rose-500 text-2xl leading-none">*</span> */}
                              </label>
                              <Input type={"text"} name="billToCustomer" value={values.billToCustomer} onChange={(e) => { setFieldValue('billToCustomer', e.target.value) }} displayError={true} maxLength={10} />
                            </div>
                          </>
                        }
                        <div className="w-full">
                          {(values.storeTypeId === productType.CorporateStore || values.storeTypeId === productType.StoreBuilder || values.storeTypeId === productType.FormBuilder) ? "" :
                            <>
                              <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">Brand</label>
                              <Dropdown
                                isMulti={true}
                                hidecheckbox={false}
                                defaultValue={values.brandId}
                                name={"brandId"}
                                options={BrandOptions}
                                isDisabled={values.parentstoreid === 0 ? true : false}
                              />
                            </>
                          }
                        </div>
                        <div className="w-full"></div>
                        <div className="w-full">
                          <div className="flex">
                            <label className="flex uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">Store Logo</label>
                            {data?.storeTypeId === productType.CorporateStore && <span><ToolTipComponent
                              id="SEOPageURL"
                              message={ToolTipsMessages.logoDimention}
                            /></span>}
                          </div>

                          <ImageFile
                            type="file"
                            className="sr-only w-1/2 h-40"
                            name="logoUrl"
                            id="logoUrl"
                            uprdivclassName="w-1/2"
                            buttonName="Add"
                            onChange={(value) => {
                              setFieldValue("logoUrl", value);
                            }}
                            folderpath={FolderPath}
                            url={values.logoUrl}
                            svgImage={true}
                            checkImageDimensions={data?.storeTypeId === productType.CorporateStore}
                            width={226}
                            height={160}
                          />
                        </div>
                        <div className="w-full">
                          <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">Fav Icon</label>
                          <ImageFile
                            type="file"
                            className="sr-only w-1/2 h-40"
                            name="favicon"
                            id="favicon"
                            uprdivclassName="w-1/2"
                            buttonName="Add"
                            onChange={(value) => {
                              setFieldValue("favicon", value);
                            }}
                            folderpath={FolderPath + "/favicon"}
                            url={values.favicon}
                          />
                        </div>

                        <div className="w-full">
                          <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">Email Logo</label>
                          <ImageFile
                            type="file"
                            className="sr-only w-1/2 h-40"
                            name="emailLogo"
                            id="emailLogo"
                            uprdivclassName="w-1/2"
                            buttonName="Add"
                            onChange={(value) => {
                              setFieldValue("emailLogo", value);
                            }}
                            folderpath={FolderPath}
                            url={values.emailLogo}
                            svgImage={true}
                          />
                        </div>

                        {(values.storeTypeId === productType.StoreBuilder || values.storeTypeId === productType.FormBuilder) ? "" : <>
                          <div className="col-span-2 w-full grid grid-cols-1 xl:grid-cols-12 gap-4">
                            <div className="xl:col-span-1 col-span-1 w-full gap-4">
                              <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold"> Login Type: </label>
                            </div>
                            <div className="flex flex-wrap items-center col-span-1 xl:col-span-11 gap-4">
                              {/* General Login */}
                              <div className="relative">
                                <RadioButton
                                  type="radio"
                                  name="generalLogin"
                                  value="generalLogin"
                                  id={'generalLogin'}
                                  onChange={(e) => {
                                    setValues((prev) => {
                                      return { ...prev, generalLogin: e.target.checked, thirdPartyLogin: false, bothLogin: false, onlyGuestLogin: false }
                                    });
                                  }}
                                  checked={values.generalLogin}
                                  label={'General'}
                                />
                              </div>

                              {/* Third Party */}
                              <div className="relative">
                                <RadioButton
                                  type="radio"
                                  name="thirdPartyLogin"
                                  value="thirdPartyLogin"
                                  id={'thirdPartyLogin'}
                                  onChange={(e) => {
                                    setValues((prev) => {
                                      return { ...prev, generalLogin: false, thirdPartyLogin: e.target.checked, bothLogin: false, onlyGuestLogin: false }
                                    });
                                  }}
                                  checked={values.thirdPartyLogin}
                                  label={'3rd Party'}
                                />
                              </div>

                              {/* Both */}
                              <div className="relative">
                                <RadioButton
                                  type="radio"
                                  name="bothLogin"
                                  value="bothLogin"
                                  id={'bothLogin'}
                                  onChange={(e) => {
                                    setValues((prev) => {
                                      return { ...prev, generalLogin: false, thirdPartyLogin: false, bothLogin: e.target.checked, onlyGuestLogin: false }
                                    });
                                  }}
                                  checked={values.bothLogin}
                                  label={'Both'}
                                />
                              </div>

                              {/* Only Guest */}
                              <div className="relative">
                                <RadioButton
                                  type="radio"
                                  name="onlyGuestLogin"
                                  value="onlyGuestLogin"
                                  id={'onlyGuestLogin'}
                                  onChange={(e) => {
                                    setValues((prev) => {
                                      return { ...prev, generalLogin: false, thirdPartyLogin: false, bothLogin: false, onlyGuestLogin: e.target.checked }
                                    });
                                  }}
                                  checked={values.onlyGuestLogin}
                                  label={'Only Guest'}
                                />
                              </div>
                            </div>
                          </div>
                        </>}
                      </div>
                      {(values.storeTypeId === productType.StoreBuilder || values.storeTypeId === productType.FormBuilder) ? "" :
                        <>
                          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-4 mt-4 items-start">
                            <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-x-20 gap-y-4 col">
                              {/* Landing Page */}
                              <div className="flex items-center">
                                <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold w-3/5"> Landing Page</label>
                                <div className="flex items-center">
                                  <div className="relative">
                                    <ToggleButton name="isLandingPage" id="isLandingPage" size="m" on="Active" off="Inactive" onChange={(e) => setFieldValue("isLandingPage", e.target.checked)} defaultValue={values.isLandingPage} />
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center">
                                {values?.storeTypeId === 2 && (
                                  <>
                                    <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold w-3/5"> SEO / Marketing </label>
                                    <div className="flex items-center">
                                      <div className="relative">
                                        <ToggleButton name="isSeoMarketing" id="isSeoMarketing" size="m" on="Active" off="Inactive" onChange={(e) => setFieldValue("isSeoMarketing", e.target.checked)} defaultValue={values.isSeoMarketing} />
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                              {/* Blog Page */}
                              <div className="flex items-center">
                                <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold w-3/5"> Blog Page</label>
                                <div className="flex items-center">
                                  <div className="relative">
                                    <ToggleButton name="isBlogPage" id="isBlogPage" size="m" on="Active" off="Inactive" onChange={(e) => setFieldValue("isBlogPage", e.target.checked)} defaultValue={values.isBlogPage} />
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold w-3/5"> Attribute as Separate Product ?</label>
                                <div className="flex items-center">
                                  <div className="relative">
                                    <ToggleButton name="isAttributeSaparateProduct" id="isAttributeSaparateProduct" size="m" on="Active" off="Inactive" onChange={(e) => setFieldValue("isAttributeSaparateProduct", e.target.checked)}
                                      defaultValue={values.isAttributeSaparateProduct}
                                      disabled={data?.ofProducts > 0 ? true : false}
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* <div className={`flex items-center justify-between`}>
                                <div className="w-full">
                                  {values?.isAttributeSaparateProduct && (
                                    <Dropdown label="attributeid" name="attributeid" options={attributesOptions} defaultValue={values.attributeid}
                                    // onChange={(e) => handleChange(e, setFieldValue, "attributeid")} 
                                    />
                                  )}
                                </div >
                              </div > */}

                              <div className="flex items-center">
                                <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold w-3/5"> Quantity Discount</label>
                                <div className="flex items-center">
                                  <div className="relative">
                                    <ToggleButton name="isQuantityDiscount" id="isQuantityDiscount" size="m" on="Active" off="Inactive" onChange={(e) => setFieldValue("isQuantityDiscount", e.target.checked)} defaultValue={values.isQuantityDiscount} />
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center">
                                <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold w-3/5"> Allow to Reuse Custom Logo</label>
                                <div className="flex items-center">
                                  <div className=" relative">
                                    <ToggleButton name="isAllowToReuseApprovedLogo" id="isAllowToReuseApprovedLogo" size="m" on="Active" off="Inactive" onChange={(e) => setFieldValue("isAllowToReuseApprovedLogo", e.target.checked)} defaultValue={values.isAllowToReuseApprovedLogo} />
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center">
                                <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold w-3/5"> Allow Product Readiness </label>
                                <div className="flex items-center">
                                  <div className="relative">
                                    <ToggleButton name="isProductReadinessAllow " id="isProductReadinessAllow" size="m" on="Active" off="Inactive" onChange={(e) => { setFieldValue("isProductReadinessAllow", e.target.checked); }} defaultValue={values.isProductReadinessAllow} />
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center">
                                {(values?.storeTypeId === 2 && values?.isSeoMarketing) && (
                                  <>
                                    <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold w-3/5"> Allow SEO Readiness </label>
                                    <div className="flex items-center">
                                      <div className="relative">
                                        <ToggleButton name="isSeoReadinessAllow " id="isSeoReadinessAllow" size="m" on="Active" off="Inactive" onChange={(e) => { setFieldValue("isSeoReadinessAllow", e.target.checked); }} defaultValue={values.isSeoReadinessAllow} />
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                              <div className="flex items-center">
                                <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold w-3/5"> Required Login For CheckOut</label>
                                <div className="flex items-center">
                                  <div className="relative">
                                    <ToggleButton name="checkOutRequiredThirdPartyLogin" id="checkOutRequiredThirdPartyLogin" size="m" on="Active" off="Inactive" onChange={(e) => setFieldValue("checkOutRequiredThirdPartyLogin", e.target.checked)} defaultValue={values.checkOutRequiredThirdPartyLogin} />
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center">
                                <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold w-3/5"> Customer Registration Approval</label>
                                <div className="flex items-center">
                                  <div className="relative">
                                    <ToggleButton name="isCustomerRegistrationApprovalRequired" id="isCustomerRegistrationApprovalRequired" size="m" on="Active" off="Inactive" onChange={(e) => setFieldValue("isCustomerRegistrationApprovalRequired", e.target.checked)} defaultValue={values.isCustomerRegistrationApprovalRequired} />
                                  </div>
                                </div>
                              </div>


                              <div className="flex items-center">
                                <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold w-3/5"> Review Master</label>
                                <div className="flex items-center">
                                  <div className="relative">
                                    <ToggleButton name="isReviewMaster" id="isReviewMaster" size="m" on="Active" off="Inactive" onChange={(e) => setFieldValue("isReviewMaster", e.target.checked)} defaultValue={values.isReviewMaster} />
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center">
                                <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold w-3/5"> Organization Name</label>
                                <div className="flex items-center">
                                  <div className="relative">
                                    <ToggleButton name="isOrganizationName" id="isOrganizationName" size="m" on="Active" off="Inactive" onChange={(e) => setFieldValue("isOrganizationName", e.target.checked)} defaultValue={values.isOrganizationName} />
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center">
                                <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold w-3/5"> Google Analytics 4</label>
                                <div className="flex items-center">
                                  <div className="relative">
                                    <ToggleButton name="IsGA4" id="IsGA4" size="m" on="Active" off="Inactive" onChange={(e) => setFieldValue("IsGA4", e.target.checked)} defaultValue={values.IsGA4} />
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center">
                                <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold w-3/5"> Allow Price Sync </label>
                                <div className="flex items-center">
                                  <div className="relative">
                                    <ToggleButton name="isPriceSync" id="isPriceSync" size="m" on="Active" off="Inactive" onChange={(e) => setFieldValue("isPriceSync", e.target.checked)} defaultValue={values.isPriceSync} />
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center">
                                <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold w-3/5"> Required Login For Add to Cart </label>
                                <div className="flex items-center">
                                  <div className="relative">
                                    <ToggleButton name="IsAddToCartRequiredForStore" id="IsAddToCartRequiredForStore" size="m" on="Active" off="Inactive" onChange={(e) => setFieldValue("IsAddToCartRequiredForStore", e.target.checked)} defaultValue={values.IsAddToCartRequiredForStore} />
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center">
                                <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold w-3/5"> Required Login For Store </label>
                                <div className="flex items-center">
                                  <div className="relative">
                                    <ToggleButton name="IsLoginRequiredForStore" id="IsLoginRequiredForStore" size="m" on="Active" off="Inactive" onChange={(e) => setFieldValue("IsLoginRequiredForStore", e.target.checked)} defaultValue={values.IsLoginRequiredForStore} />
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center">
                                <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold w-3/5"> Allow Employee Login </label>
                                <div className="flex items-center">
                                  <div className="relative">
                                    <ToggleButton name="isAllowEmployeeLogin" id="isAllowEmployeeLogin" size="m" on="Active" off="Inactive" onChange={(e) => setFieldValue("isAllowEmployeeLogin", e.target.checked)} defaultValue={values.isAllowEmployeeLogin} />
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center">
                                <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold w-3/5"> Allow Brand Discount </label>
                                <div className="flex items-center">
                                  <div className="relative">
                                    <ToggleButton name="isBrandDiscount" id="isBrandDiscount" size="m" on="Active" off="Inactive" onChange={(e) => setFieldValue("isBrandDiscount", e.target.checked)} defaultValue={values.isBrandDiscount} />
                                  </div>
                                </div>
                              </div>

                              {/* <div className="flex items-center">
                                <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold w-3/5"> Manage Custom Logo </label>
                                <div className="flex items-center">
                                  <div className="relative">
                                    <ToggleButton name="isLogoCustomization" id="isLogoCustomization" size="m" on="Active" off="Inactive" onChange={(e) => setFieldValue("isLogoCustomization", e.target.checked)} defaultValue={values.isLogoCustomization} />
                                  </div>
                                </div>
                              </div> */}

                              <div className="flex items-center">
                                <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold w-3/5"> Gift Card Email Verification </label>
                                <div className="flex items-center">
                                  <div className="relative">
                                    <ToggleButton name="isGiftCardValidatebyEmail" id="isGiftCardValidatebyEmail" size="m" on="Active" off="Inactive" onChange={(e) => setFieldValue("isGiftCardValidatebyEmail", e.target.checked)} defaultValue={values.isGiftCardValidatebyEmail} />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="w-full grid grid-cols-1 xl:grid-cols-1 gap-x-8 gap-y-4">
                           {/*    <div className="flex items-center">
                                <div className="w-1/4">
                                  <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold"> First Logo Free ?</label>
                                </div>
                                <div className="flex items-center gap-6 w-3/4">
                                  <div className="flex items-center">
                                    <div className="relative">
                                      <ToggleButton name="isFirstLogoFree " id="isFirstLogoFree" size="m" on="Active" off="Inactive"
                                        onChange={(e) => {
                                          setFieldValue("isFirstLogoFree", e.target.checked);
                                          if (e.target.checked === false) {
                                            setFieldValue("firstLogoCharge", 0)
                                          }
                                        }} defaultValue={values.isFirstLogoFree}
                                      />
                                    </div>
                                  </div>
                                  <div className={`flex grow items-center justify-start grid-cols-1 xl:grid-cols-2 gap-4`}>
                                    {values.isFirstLogoFree === false && (
                                      <div className="w-1/2 relative">
                                        <>
                                          <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold"> First Logo Charges
                                            <span className="text-rose-500 text-2xl leading-none">*</span>
                                          </label>
                                          <div className="absolute w-10 h-10 mt-8 left-0 top-1 flex items-center justify-center">
                                            <span className="material-icons-outlined">
                                              attach_money
                                            </span>
                                          </div>
                                          <Input
                                            className="appearance-none block w-full text-gray-700 border border-gray-200 rounded p-4 py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white pl-8"
                                            label="firstLogoCharge" name="firstLogoCharge" defaultValue={values.firstLogoCharge} displayError={true}
                                            onChange={(e) => setFieldValue(e.target.name, e.target.value)} />
                                        </>
                                      </div >
                                    )}
                                    <div className="w-1/2 relative">
                                      <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold"> Second Logo Charge
                                        <span className="text-rose-500 text-2xl leading-none">*</span>
                                      </label>
                                      <div className="relative">
                                        <div className="absolute w-10 h-10 left-0 top-1 flex items-center justify-center">
                                          <span className="material-icons-outlined">
                                            attach_money
                                          </span>
                                        </div>
                                      </div>
                                      <Input
                                        className="appearance-none block w-full text-gray-700 border border-gray-200 rounded p-4 py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white pl-8"
                                        label="secondLogoCharge" name="secondLogoCharge" defaultValue={values.secondLogoCharge} displayError={true}
                                        onChange={(e) => setFieldValue(e.target.name, e.target.value)} />
                                    </div >
                                  </div></div>
                              </div> */}

                              {/* <div className="flex items-center justify-between"></div> */}
                              <div className="flex items-center">
                                <div className="w-1/4">
                                  <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold"> Domain Based Login </label>
                                </div>
                                <div className="flex items-center gap-6 w-3/4">
                                  <div className="flex items-center">
                                    <div className=" relative">
                                      <ToggleButton name="domainBasedLogin" id="domainBasedLogin " size="m" on="Active" off="Inactive" onChange={(e) => setFieldValue("domainBasedLogin", e.target.checked)} defaultValue={values.domainBasedLogin} />
                                    </div>
                                  </div>
                                  <div className={`flex grow items-center justify-start grid-cols-1 xl:grid-cols-2 gap-4`}>
                                    {values.domainBasedLogin && (
                                      <div className="w-1/2 relative">
                                        <>
                                          {/* <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold"> Logo Set-Up Charges
                                    <span className="text-rose-500 text-2xl leading-none">*</span>
                                  </label> */}
                                          <Input
                                            className="appearance-none block w-full text-gray-700 border border-gray-200 rounded p-4 py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white pl-4" placeholder="ex. @gmail.com,@yahoo.com"
                                            label="domainBasedLoginDesc" name="domainBasedLoginDesc" defaultValue={values.domainBasedLoginDesc} displayError={true} onChange={(e) => setFieldValue(e.target.name, e.target.value)} />
                                        </>
                                      </div >
                                    )}
                                  </div ></div>
                              </div>

                              {/* <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-4"> */}
                              {/* <div className="flex items-center">
                                <div className="w-1/4">
                                  <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold"> Allow Sew-Out </label>
                                </div>
                                <div className="flex items-center gap-6 w-3/4">
                                  <div className="flex items-center">
                                    <div className=" relative">
                                      <ToggleButton name="isSewOutEnable" id="isSewOutEnable " size="m" on="Active" off="Inactive" onChange={(e) => {
                                        if (e.target.checked) {
                                          setFieldValue("isSewOutEnable", e.target.checked);
                                        } else {
                                          setFieldValue("isSewOutEnable", false);
                                          setFieldValue("sewOutCharges", 0)
                                        }
                                      }}
                                        defaultValue={values.isSewOutEnable} />
                                    </div>
                                  </div>
                                  <div className={`flex grow items-center justify-start grid-cols-1 xl:grid-cols-2 gap-4`}>
                                    <div className="w-1/2 relative">
                                      {values.isSewOutEnable && (
                                        <>
                                          <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold"> Sew-Out Charges
                                            <span className="text-rose-500 text-2xl leading-none">*</span>
                                          </label>
                                          <div className="absolute w-10 h-10 mt-7 left-0 top-0 flex items-center justify-center">
                                            <span className="material-icons-outlined">
                                              attach_money
                                            </span>
                                          </div>
                                          <InputNumber
                                            className="appearance-none block w-full text-gray-700 border border-gray-200 rounded p-4 py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white pl-8"
                                            label="sewOutCharges" name="sewOutCharges" defaultValue={values.sewOutCharges} displayError={true} onChange={(e) => setFieldValue(e.target.name, e.target.value)} />
                                        </>
                                      )}
                                    </div >
                                  </div ></div>
                              </div> */}
                              {/* </div> */}

                              {/* <div className="flex items-center">
                                <div className="w-1/4">
                                  <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold"> Apply Logo Set-Up Charges </label>
                                </div>
                                <div className="flex items-center gap-6 w-3/4">
                                  <div className="flex items-center">
                                    <div className=" relative">
                                      <ToggleButton name="isLogoSetupCharges" id="isLogoSetupCharges " size="m" on="Active" off="Inactive" onChange={(e) => {
                                        if (e.target.checked) {
                                          setFieldValue("isLogoSetupCharges", e.target.checked);
                                        } else {
                                          setFieldValue("isLogoSetupCharges", false);
                                          setFieldValue("logoSetupCharges", 0)
                                        }
                                      }} defaultValue={values.isLogoSetupCharges} />
                                    </div>
                                  </div>
                                  <div className={`flex grow items-center justify-start grid-cols-1 xl:grid-cols-2 gap-4`}>
                                    {values.isLogoSetupCharges && (
                                      <div className="w-1/2 relative">
                                        <>
                                          <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold"> Logo Set-Up Charges
                                            <span className="text-rose-500 text-2xl leading-none">*</span>
                                          </label>
                                          <div className="absolute w-10 h-10 mt-7 left-0 top-0 flex items-center justify-center">
                                            <span className="material-icons-outlined">
                                              attach_money
                                            </span>
                                          </div>
                                          <InputNumber
                                            className="appearance-none block w-full text-gray-700 border border-gray-200 rounded p-4 py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white pl-8"
                                            label="logoSetupCharges" name="logoSetupCharges" defaultValue={values.logoSetupCharges} displayError={true} onChange={(e) => setFieldValue(e.target.name, e.target.value)} />
                                        </>
                                      </div >
                                    )}
                                  </div ></div>
                              </div> */}

                              {/* <div className="flex items-center">
                                <div className="w-1/4">
                                  <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold"> Line Personalization </label>
                                </div>
                                <div className="flex items-center gap-6 w-3/4">
                                  <div className="flex items-center">
                                    <div className=" relative">
                                      <ToggleButton name="isLinepersonalization " id="isLinepersonalization " size="m" on="Active" off="Inactive" onChange={(e) => {
                                        if (e.target.checked) {
                                          setFieldValue("isLinepersonalization", e.target.checked);
                                        } else {
                                          setFieldValue("isLinepersonalization", false);
                                          setFieldValue("firstLineCharges", 0)
                                          setFieldValue("secondLineCharges", 0)
                                        }
                                      }}
                                        defaultValue={values?.isLinepersonalization} />
                                    </div>
                                  </div>
                                  <div className={`flex grow items-center justify-start grid-cols-1 xl:grid-cols-2 gap-4`}>
                                    {values && values?.isLinepersonalization && (
                                      <>
                                        <div className="w-1/2 relative grow">
                                          <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold"> First Line Charges
                                            <span className="text-rose-500 text-2xl leading-none">*</span>
                                          </label>
                                          <div className="absolute w-10 h-10 mt-7 left-0 top-0 flex items-center justify-center">
                                            <span className="material-icons-outlined">
                                              attach_money
                                            </span>
                                          </div>
                                          <InputNumber
                                            className="appearance-none block w-full text-gray-700 border border-gray-200 rounded p-4 py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white pl-8"
                                            label="firstLineCharges" name={"firstLineCharges"} defaultValue={values?.firstLineCharges} displayError={true} onChange={(e) => setFieldValue(e.target.name, e.target.value)} />
                                        </div >
                                        <div className="w-1/2 relative grow">
                                          <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold"> Second Line Charges
                                            <span className="text-rose-500 text-2xl leading-none">*</span>
                                          </label>
                                          <div className="absolute w-10 h-10 mt-7 left-0 top-0 flex items-center justify-center">
                                            <span className="material-icons-outlined">
                                              attach_money
                                            </span>
                                          </div>
                                          <InputNumber
                                            className="appearance-none block w-full text-gray-700 border border-gray-200 rounded p-4 py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white pl-8"
                                            label="secondLineCharges" name={"secondLineCharges"} defaultValue={values?.secondLineCharges} displayError={true} onChange={(e) => setFieldValue(e.target.name, e.target.value)} />
                                        </div >
                                      </>
                                    )}
                                  </div ></div>
                              </div> */}

                              {/* <div className="flex items-center">
                                <div className="w-1/4">
                                  <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold"> Small RUN </label>
                                </div>
                                <div className="flex items-center gap-6 w-3/4">
                                  <div className="flex items-center">
                                    <div className=" relative">
                                      <ToggleButton name="isSmallRun " id="isSmallRun " size="m" on="Active" off="Inactive" onChange={(e) => {
                                        if (e.target.checked) {
                                          setFieldValue("isSmallRun", e.target.checked);
                                        } else {
                                          setFieldValue("isSmallRun", false);
                                          setFieldValue("smallRunLimit", 0)
                                          setFieldValue("smallRunFeesCharges", 0)
                                        }
                                      }}
                                        defaultValue={values?.isSmallRun} />
                                    </div>
                                  </div>
                                  <div className={`flex grow items-center justify-start grid-cols-1 xl:grid-cols-2 gap-4`}>
                                    {values?.isSmallRun && (
                                      <>
                                        <div className="w-1/2 relative grow">
                                          <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold"> Small Run Quantity Limit
                                            <span className="text-rose-500 text-2xl leading-none">*</span>
                                          </label>
                                          <InputNumber
                                            className="appearance-none block w-full text-gray-700 border border-gray-200 rounded p-4 py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                                            label="smallRunLimit" name={"smallRunLimit"} defaultValue={values?.smallRunLimit} displayError={true} onChange={(e) => setFieldValue(e.target.name, e.target.value)} maxLength={10} onKeyPress={(event) => {
                                              if (!/^\d*$/.test(event.key)) {
                                                event.preventDefault();
                                              }
                                            }}
                                            allowNegative={false} />
                                        </div>
                                        <div className="w-1/2 relative grow">
                                          <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold"> Small Run Fees Charges
                                            <span className="text-rose-500 text-2xl leading-none">*</span>
                                          </label>
                                          <div className="relative">
                                            <div className="absolute w-10 h-10 left-0 top-0 flex items-center justify-center">
                                              <span className="material-icons-outlined">
                                                attach_money
                                              </span>
                                            </div>
                                          </div>
                                          <InputNumber
                                            className="appearance-none block w-full text-gray-700 border border-gray-200 rounded p-4 py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white pl-8"
                                            label="smallRunFeesCharges" name={"smallRunFeesCharges"} defaultValue={values?.smallRunFeesCharges} displayError={true} onChange={(e) => setFieldValue(e.target.name, e.target.value)} />
                                        </div >
                                      </>
                                    )}
                                  </div ></div>
                              </div> */}
                            </div>
                          </div>
                        </>
                      }
                    </div >

                    {/* Shipping Charges */}
                    {(values.storeTypeId === productType.StoreBuilder || values.storeTypeId === productType.FormBuilder) ? "" :
                      <>
                        <div className="w-full bg-white shadow-lg rounded-md border border-neutral-200 p-6 mb-6">
                          <div className="block uppercase tracking-wide text-gray-500 text-lg font-bold mb-6">Shipping Charges Type</div>
                          <div className={`flex items-center justify-between gap-4`}>
                            <div className="w-full last:mb-0 mb-4 ">
                              <div className="md:grid md:grid-cols-2 grid-cols-1 md:gap-6">
                                <div className="mb-2">
                                  <div className="w-full mb-1">
                                    <RadioButton
                                      type="radio"
                                      name="shippingChargeType"
                                      value="0"
                                      id={'0'}
                                      onClick={(e) => {
                                        handleShippingChargeType(e, setFieldValue)
                                      }}
                                      checked={Number(values?.shippingChargeType) === 0}
                                      label={'None'}
                                    />
                                  </div>
                                  <div className="w-full mb-1">
                                    <RadioButton
                                      type="radio"
                                      name="shippingChargeType"
                                      value="1"
                                      id={'1'}
                                      onClick={(e) => {
                                        handleShippingChargeType(e, setFieldValue)
                                      }}
                                      checked={Number(values?.shippingChargeType) === 1}
                                      label={'Range'}
                                    />
                                  </div>
                                  <div className="w-full mb-1">
                                    <RadioButton
                                      type="radio"
                                      name="shippingChargeType"
                                      value="2"
                                      id={'2'}
                                      onClick={(e) => {
                                        handleShippingChargeType(e, setFieldValue)
                                      }}
                                      checked={Number(values?.shippingChargeType) === 2}
                                      label={'Fix Charges'}
                                    />
                                  </div>
                                  <div className="w-full mb-1">
                                    <RadioButton
                                      type="radio"
                                      name="shippingChargeType"
                                      value="3"
                                      id={'3'}
                                      onClick={(e) => {
                                        handleShippingChargeType(e, setFieldValue)
                                      }}
                                      checked={Number(values?.shippingChargeType) === 3}
                                      label={'Runtime Charges'}
                                    />
                                  </div>
                                  {Number(values?.shippingChargeType) === 3 &&
                                    <>
                                      <div className="flex flex-wrap -mx-3">
                                        <div className="lg:w-1/2 w-full mt-4 px-3">
                                          <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">Shipping Services
                                            <span className="text-rose-500 text-2xl leading-none">*</span>
                                          </label>
                                          <Dropdown
                                            isMulti={true}
                                            hidecheckbox={false}
                                            defaultValue={values.shippingServiceId}
                                            name={"shippingServiceId"}
                                            options={ShippingServicesOptions}
                                          />
                                        </div>
                                        <div className="lg:w-1/2 w-full mt-4 px-3">
                                          <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">Shipping Method Type
                                            <span className="text-rose-500 text-2xl leading-none">*</span>
                                          </label>
                                          <Dropdown
                                            isMulti={true}
                                            hidecheckbox={false}
                                            defaultValue={values.shippingMethodId}
                                            name={"shippingMethodId"}
                                            options={ShippingMethodTypes}
                                          // onChange={(ShippingObj) => handleShippingMethodChange(ShippingObj, setFieldValue, values)}
                                          />
                                        </div>
                                      </div>
                                    </>
                                  }
                                </div>
                                <div className="w-full">
                                  <div className="flex">
                                    <Checkbox
                                      className="mt-1"
                                      name="isFreeShipping"
                                      id="isFreeShipping"
                                      checked={values?.isFreeShipping}
                                      onChange={(e) => {
                                        setFieldValue(
                                          "isFreeShipping",
                                          e ? e.target.checked : 0
                                        )
                                        if (e.target.checked === false) {
                                          setFieldValue("generalAmount", "0")
                                        }
                                      }
                                      }
                                    />
                                    <label className="items-center leading-none mt-1">
                                      <span className="ml-1">Free Shipping</span>
                                    </label>
                                  </div>

                                  {values.isFreeShipping ?
                                    <div className={`flex items-center justify-between grid-cols-1 xl:grid-cols-2 gap-4 mt-4`}>
                                      <div className="w-full relative grow">
                                        <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">Free Shipping Minimum Amount
                                          <span className="text-rose-500 text-2xl leading-none">*</span>
                                        </label>
                                        <div className="absolute w-10 h-10 mt-7 left-0 top-2 flex items-center justify-center">
                                          <span className="material-icons-outlined">
                                            attach_money
                                          </span>
                                        </div>
                                        <InputNumber
                                          className="appearance-none block lg:w-1/2 w-full text-gray-700 border border-gray-200 rounded p-4 py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white pl-8"
                                          label="generalAmount" name={"generalAmount"} defaultValue={values?.generalAmount} displayError={true} onChange={(e) => {
                                            if (values.isFreeShipping === false) {
                                              setFieldValue(e.target.name, 0)
                                            } else {
                                              setFieldValue(e.target.name, e.target.value)
                                            }
                                          }} maxLength={10}
                                          allowNegative={false} />
                                      </div>
                                    </div>
                                    : ""
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    }

                    {/* Payment Options */}
                    {(values.storeTypeId === productType.StoreBuilder || values.storeTypeId === productType.FormBuilder) ? "" :
                      <>
                        <div id="payby">
                          <div className="w-full bg-white shadow-lg rounded-md border border-neutral-200 mb-6 p-6">
                            <div className="block uppercase tracking-wide text-gray-500 text-lg font-bold mb-6">Pay By</div>
                            <div>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {payBy.map((paybydata, index) => {
                                  return (
                                    <Fragment key={index}>
                                      <Input className="sr-only peer" type={`${"checkbox"}`} name={`paymentOption[${paybydata.name}]`}
                                        id={`paymentOption[${paybydata.name}]`}
                                        onChange={(e) => handleChangePaymentOption(e, setFieldValue, values, paybydata)}
                                        defaultValue={initialPayOptions && initialPayOptions[paybydata.id] && initialPayOptions[paybydata.id]}
                                      />
                                      <label htmlFor={`paymentOption[${paybydata.name}]`} className={` cursor-pointer block bg-white shadow-lg rounded-md border border-neutral-200 p-6 ${values?.paymentOption && values?.paymentOption[paybydata.name] && values?.paymentOption[paybydata.name]["valBool"] && "peer-checked:border-green-500"}`}>
                                        <div>
                                          <div className="font-semibold">{paybydata.name}</div>
                                        </div>
                                      </label>
                                    </Fragment>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    }

                    {/* Child Store */}
                    {(values.storeTypeId === productType.StoreBuilder || values.storeTypeId === productType.FormBuilder) ? "" :
                      <>
                        {(ChildStoreBrands?.length > 0 && !isAddMode) &&
                          <div className="w-full bg-white shadow-lg rounded-md border border-neutral-200 p-6 mb-6">
                            <div className="block uppercase tracking-wide text-gray-500 text-lg font-bold mb-6">Child Store Brands</div>
                            <div className={`flex items-center justify-between gap-4`}>
                              <div className="w-full last:mb-0 mb-4 ">
                                <div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {ChildStoreBrands?.length > 0 && ChildStoreBrands.map((StoreData, index) => {
                                      return (
                                        <label htmlFor={`${StoreData?.storeName}`} className={`block bg-white shadow-lg rounded-md border border-neutral-200 p-6`}>
                                          <div>
                                            <div className="font-semibold">Store Name : {StoreData?.storeName}</div>
                                            Brand Name :
                                            {StoreData?.storeParentBrandViewModel?.length > 0 && StoreData?.storeParentBrandViewModel.map((BrandsData, index) => {
                                              return (
                                                <label htmlFor={`${BrandsData?.brandName}`} className={`block bg-white shadow-lg rounded-md border border-neutral-200 p-2 `}>
                                                  <div>
                                                    <div className="font-semibold">{BrandsData?.brandName}</div>
                                                  </div>
                                                </label>
                                              );
                                            })}
                                          </div>
                                        </label>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        }
                      </>
                    }

                    {/* Punchout Message */}
                    {/* {(values.storeTypeId === productType.StoreBuilder || values.storeTypeId === productType.FormBuilder) ? "" :
                      <>
                        <div id="punchoutMessage">
                          <div className="w-full bg-white shadow-lg rounded-md border border-neutral-200 p-6 mb-6">
                            <div className="w-full mb-6 last:mb-0">
                              <label className="block uppercase tracking-wide text-gray-500 text-lg font-bold mb-6">
                                Punchout Message
                              </label>
                              <CKEditor
                                name={"punchoutMessage"}
                                id="punchoutMessage"
                                maxLength={350}
                                defaultValue={values.punchoutMessage}
                                loading={data.punchoutMessage}
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    } */}
                  </div >
                </div >
              </div >
            </FormikForm >
          );
        }}
      </Formik >
    </>
  );
}

export default Create;