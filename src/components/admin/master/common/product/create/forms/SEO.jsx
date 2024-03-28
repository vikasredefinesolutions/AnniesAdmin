import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";

import { ValidationMsgs } from "global/ValidationMessages";
import { ToolTipsMessages } from "global/ToolTipsMessages";
import { blobFolder, SEOH1toH6ColorCheck } from "global/Enum";

import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";

import { serverError } from "services/common/helper/Helper";
import StoreProductService from "services/admin/master/store/product/SEOService";

import Input from "components/common/formComponent/Input";
import Textarea from "components/common/formComponent/Textarea";
import RadioButton from "components/common/formComponent/RadioButton";
import SEOSocial from "components/common/others/admin/SEO/SEOSocial";
import ToolTipComponent from "components/common/ToolTips";
import ImageFile from "components/common/formComponent/ImageFile";

import UnsavedFormHandler from "./UnsavedFormHandler";

const SEO = ({
  displayFieldElement,
  fetchFieldProperty,
  fields,
  values,
  setFormSubmit,
  activeTab,
  index,
  requiredFields,
  checkProductStatus,
  productstatusVal,
  readOnly,
  productId,
  moduleName,
  getSEOReadinessData,
  setsaveUnSavedFields,
  clearCacheForBrandCategory,
  store
}) => {
  const dispatch = useDispatch();
  const formRef = useRef();

  const location = useSelector((store) => store?.location);
  const CompanyId = useSelector((store) => store?.CompanyConfiguration.id)
  const [H1toH6TagData, setH1toH6TagData] = useState([]);
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const FolderPath = `/${blobFolder.temp}/${CompanyId}/${blobFolder[moduleName]}${!productId ? "/0" : `/${productId}`}/${blobFolder.seo}`
  const regexCode = /(<([^>]+)>)/gi;

  const getSEOById = useCallback(() => {
    let unmounted = false;
    dispatch(setAddLoading(true));
    setLoading(true);
    StoreProductService.getSEOById(productId)
      .then((stores) => {
        if (stores?.data?.success && !unmounted) {
          setData(stores?.data?.data);
        }
        dispatch(setAddLoading(false));
        setLoading(false);
      })
      .catch((error) => {
        dispatch(setAddLoading(false));
        setLoading(false);
      });
  }, [productId]);

  const getH1ToH6ById = useCallback(() => {
    let unmounted = false;
    dispatch(setAddLoading(true));
    setLoading(true);
    StoreProductService.getSeOh1toh6TagsDetailsById(productId)
      .then((stores) => {
        if (stores?.data?.success && !unmounted && stores?.data?.data) {
          setH1toH6TagData(stores?.data?.data);
        }
        dispatch(setAddLoading(false));
        setLoading(false);
      })
      .catch((error) => {
        dispatch(setAddLoading(false));
        setLoading(false);
      });
  }, [productId]);

  const validationSchema = Yup.object({
    [fetchFieldProperty("dbfield", "seName")]:
      displayFieldElement(fields, "seName") &&
        requiredFields.indexOf("seName") > -1
        ? Yup.string().required(
          ValidationMsgs.masterCatalog.seo.seNameRequired
        )
        : null,
    [fetchFieldProperty("dbfield", "pageTitle")]:
      displayFieldElement(fields, "pageTitle") &&
        requiredFields.indexOf("pageTitle") > -1
        ? Yup.string().required(
          ValidationMsgs.masterCatalog.seo.pagetitleRequired
        )
        : null,
    [fetchFieldProperty("dbfield", "metaDescription")]:
      displayFieldElement(fields, "metaDescription") &&
        requiredFields.indexOf("metaDescription") > -1
        ? Yup.string().required(
          ValidationMsgs.masterCatalog.seo.metadescriptionRequired
        )
        : null,
    [fetchFieldProperty("dbfield", "metaKeywords")]:
      displayFieldElement(fields, "metaKeywords") &&
        requiredFields.indexOf("metaKeywords") > -1
        ? Yup.string().required(
          ValidationMsgs.masterCatalog.seo.metaKeywordsRequired
        )
        : null,
  });

  const submitHandler = (fields, { resetForm }) => {
    dispatch(setAddLoading(true))
    if (fields.id === 0) {
      StoreProductService.createSEO({
        productSeoModel: { ...fields, ...location },
      }).then((response) => {
        if (response.data.success) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.masterCatalog.seo.created,
            })
          );
          resetForm({});
          getSEOById();
          getSEOReadinessData();
          clearCacheForBrandCategory();
        } else {
          dispatch(
            setAlertMessage({ type: "danger", message: serverError(response) })
          );
        }
        dispatch(setAddLoading(false))
      }).catch((errors) => {
        dispatch(
          setAlertMessage({
            type: "danger",
            message: ValidationMsgs.masterCatalog.seo.notCreated,
          })
        );
        dispatch(setAddLoading(false))

      });
    } else {
      StoreProductService.updateSEO({ productSeoModel: { ...fields, ...location } })
        .then((response) => {
          if (response?.data?.success) {
            dispatch(
              setAlertMessage({
                type: "success",
                message: ValidationMsgs.masterCatalog.seo.updated,
              })
            );
            getSEOById();
            getSEOReadinessData();
            clearCacheForBrandCategory();
          } else {
            dispatch(
              setAlertMessage({ type: "danger", message: serverError(response) })
            );
          }
          dispatch(setAddLoading(false))
        }).catch((errors) => {
          dispatch(
            setAlertMessage({
              type: "danger",
              message: ValidationMsgs.masterCatalog.seo.notUpdated,
            })
          );
          dispatch(setAddLoading(false))

        });
    }
  }

  const InitialData = {
    id: Data?.id || 0,
    preViewAs: values.preViewAs || "D",
    pageUrl: Data?.pageUrl || '',
    seName: Data?.seName || '',
    pageTitle: Data?.pageTitle || '',
    metaDescription: Data?.metaDescription || '',
    metaKeywords: Data?.metaKeywords || '',
    roiKeywords: Data?.roiKeywords || '',
    targetedKeywords: Data?.targetedKeywords || '',
    productId: productId,

    h1: H1toH6TagData?.h1Tags || "",
    h2: H1toH6TagData?.h2Tags || "",
    h3: H1toH6TagData?.h3Tags || "",
    h4: H1toH6TagData?.h4Tags || "",
    h5: H1toH6TagData?.h5Tags || "",
    h6: H1toH6TagData?.h6Tags || "",

    openGraphImagePath: Data?.openGraphImagePath || '',
    openGraphTitle: Data?.openGraphTitle ? Data?.openGraphTitle : Data?.pageTitle && Data?.pageTitle.length && Data?.pageTitle || '',
    openGraphDescription: Data?.openGraphDescription ? Data?.openGraphDescription : Data?.metaDescription && Data?.metaDescription.length && Data?.metaDescription || '',
    facebookImagePath: Data?.facebookImagePath || '',
    facebookOpenGraphTitle: Data?.facebookOpenGraphTitle || '',
    facebookOpenGraphDescription: Data?.facebookOpenGraphDescription || '',
    twitterImagePath: Data?.twitterImagePath || '',
    twitterOpenGraphTitle: Data?.twitterOpenGraphTitle || '',
    twitterOpenGraphDescription: Data?.twitterOpenGraphDescription || '',
    linkedinImagePath: Data?.linkedinImagePath || '',
    linkedinOpenGraphTitle: Data?.linkedinOpenGraphTitle || '',
    linkedinOpenGraphDescription: Data?.linkedinOpenGraphDescription || '',
    pinterestImagePath: Data?.pinterestImagePath || '',
    pinterestOpenGraphTitle: Data?.pinterestOpenGraphTitle || '',
    pinterestOpenGraphDescription: Data?.pinterestOpenGraphDescription || '',
    recStatus: Data?.recStatus || productstatusVal,
    rowversion: Data?.rowVersion || null,

  }

  const getseNameColor = (title = '', defaultSeName) => {
    let finalTitleCount = defaultSeName ? defaultSeName?.length + 6 : 6
    if ((title.length) <= 0) {
      return 'bg-rose-500';
    } else {
      if ((title.length + finalTitleCount) >= 161) {
        return 'bg-rose-500';
      } else if ((title.length + finalTitleCount) >= 0 && (title.length + finalTitleCount) <= 100) {
        return 'bg-green-500';
      } else if ((title.length + finalTitleCount) >= 101 && (title.length + finalTitleCount) <= 160) {
        return 'bg-yellow-500';
      } else {
        return 'bg-gray-300';
      }
    }
  }

  const getPageTitleColor = (title = '') => {
    if (title.length === 0) {
      return 'bg-rose-500';
    } else {
      if (title.length >= 61 && title.length <= 72) {
        return 'bg-yellow-500';
      } else if (title.length >= 31 && title.length <= 60) {
        return 'bg-green-500';
      } else if (title.length >= 1 && title.length <= 30) {
        return 'bg-green-500';
      } else {
        return 'bg-gray-300';
      }
    }
  }

  const getMetaDescriptionColor = (title = '') => {
    if (title.length === 0) {
      return 'bg-rose-500';
    } else {
      if (title.length >= 160) {
        return 'bg-yellow-500';
      } else if (title.length >= "" && title.length <= 100) {
        return 'bg-yellow-500';
      } else if (title.length >= 101 && title.length <= 155) {
        return 'bg-green-500';
      } else {
        return 'bg-yellow-500';
      }
    }
  }

  const getMetaKeywordsColor = (title = '') => {
    if (title.length === 0) {
      return 'bg-rose-500';
    } else {
      if (!title || title.split(",").length <= 0) {
        return 'bg-rose-500';
      } else if (title.split(",").length >= 1 && title.split(",").length <= 3) {
        return 'bg-yellow-500';
      } else if (title.split(",").length >= 4 && title.split(",").length <= 7) {
        return 'bg-green-500';
      }
      else if (title.split(",").length >= 8) {
        return 'bg-yellow-500';
      }
      else {
        return 'bg-gray-300';
      }
    }
  }

  const getRoiKeywordsColor = (title = '') => {
    if (title.length === 0) {
      return 'bg-rose-500';
    } else {
      if (title.split(",").length <= 3) {
        return 'bg-green-500';
      } else if (title.split(",").length >= 4) {
        return 'bg-yellow-500';
      } else {
        return 'bg-gray-300';
      }
    }
  }

  const getTargetedKeywordsColor = (title = '') => {
    if (title.length === 0) {
      return 'bg-rose-500';
    } else {
      if (title.split(",").length <= 3) {
        return 'bg-green-500';
      } else if (title.split(",").length >= 4) {
        return 'bg-yellow-500';
      } else {
        return 'bg-gray-300';
      }
    }
  }

  const getH1TagColor = (FlagColorCode) => {
    if (SEOH1toH6ColorCheck.Red === FlagColorCode) {
      return 'bg-rose-500';
    } else if (SEOH1toH6ColorCheck.Yellow === FlagColorCode) {
      return 'bg-yellow-500';
    } else if (SEOH1toH6ColorCheck.Green === FlagColorCode) {
      return 'bg-green-500';
    } else {
      return 'bg-gray-300';
    }
  }

  const CheckTagSequence = (FlagColorCode) => {
    if (SEOH1toH6ColorCheck.Red === FlagColorCode) {
      return 'bg-rose-500';
    } else if (SEOH1toH6ColorCheck.Yellow === FlagColorCode) {
      return 'bg-yellow-500';
    } else if (SEOH1toH6ColorCheck.Green === FlagColorCode) {
      return 'bg-green-500';
    } else {
      return 'bg-gray-300';
    }
  }

  const OpenGraphTitle = (title = '') => {
    if (title.length === 0) {
      return 'bg-rose-500';
    } else {
      if (title.length >= 1 && title.length <= 60) {
        return 'bg-green-500';
      } else {
        return 'bg-gray-300';
      }
    }
  }

  const OpenGraphDescription = (title = '') => {
    if (title.length === 0) {
      return 'bg-rose-500';
    } else {
      if (title.length >= 1 && title.length <= 120) {
        return 'bg-yellow-500';
      } else if (title.length >= 120 && title.length <= 155) {
        return 'bg-green-500';
      } else {
        return 'bg-gray-300';
      }
    }
  }

  const handleCommaSepWord = (e, commaLength, setFieldValue, name) => {
    const currentWordLength = e.target.value.split(',')
    if (currentWordLength.length > commaLength) {
      if (e.keyCode !== 188) return;
    }
    setFieldValue(name, e.target.value);
  }

  const handleShowTextLength = (userTypedSeName, defaultSeName) => {
    if (userTypedSeName.length > (defaultSeName?.length + 6)) {
      return ((defaultSeName?.length + 6) + userTypedSeName.length)
    } else {
      return userTypedSeName.length + (defaultSeName?.length + 6)
    }
  }

  const maxLengthForPageUrl = () => {
    return 255 - (store?.url?.length + 6)
  }

  useEffect(() => {
    if (activeTab === index) {
      setFormSubmit(formRef.current);
    }
  }, [formRef, setFormSubmit, activeTab]);

  useEffect(() => {
    getSEOById();
  }, [getSEOById]);

  useEffect(() => {
    getH1ToH6ById();
  }, [getH1ToH6ById]);

  return (
    <>
      <div className='p-6'>
        <div className="w-full">
          <div>
            <div className="flex items-center justify-between w-full group mb-1">
              <div className="text-lg text-gray-800 font-bold">Meta Data</div>
            </div>
          </div >
          <Formik
            innerRef={formRef}
            enableReinitialize={true}
            initialValues={InitialData}
            onSubmit={submitHandler}
            validationSchema={validationSchema}
            validateOnMount={true}
          >
            {({ errors, touched, setFieldValue, values }) => {
              checkProductStatus(errors);
              return (
                <FormikForm>
                  <UnsavedFormHandler values={values} setsaveUnSavedFields={setsaveUnSavedFields} InitialData={InitialData} />

                  <div>
                    <div className="mt-6">
                      <div className="w-full">
                        <div className="mb-6 w-full">
                          {displayFieldElement(fields, "previewType") && (
                            <div className="flex mb-6">
                              <div className="form-check form-check-inline md:mr-5">
                                <RadioButton
                                  type="radio"
                                  name="previewType"
                                  value="D"
                                  disabled={readOnly}
                                  label={'Desktop Result'}
                                  id={'D'}
                                  onChange={(e) => {
                                    setFieldValue('preViewAs', e.target.value);
                                  }}
                                  checked={values.preViewAs === 'D' ? true : false}
                                />
                              </div>
                              <div className="form-check form-check-inline md:ml-5">
                                <RadioButton
                                  type="radio"
                                  name="previewType"
                                  value="M"
                                  id={'M'}
                                  disabled={readOnly}
                                  label={'Mobile Result'}
                                  onChange={(e) => { setFieldValue('preViewAs', e.target.value); }}
                                  checked={values.preViewAs === 'M' ? true : false}

                                />
                              </div>
                            </div>)}
                          <div className="mb-6">
                            <div className={`mb-3 text-base bg-white py-4 rounded ${values.preViewAs === 'D' ? 'w-full' : ' w-2/4'}`}>
                              <div className="text-sm leading-4 text-[#202124] flex py-1 font-arial">
                                <a href={`${store ? store?.url : ''}/${values.pageUrl}`} target="_blank" className="cursor-pointer" title={`${store ? store?.url : ''}/${values.pageUrl}`}>{store ? store?.url : ''}/{Data ? Data?.pageUrl : ""} <span className="material-icons-outlined text-[15px]">more_vert</span></a>
                              </div>
                              <div className="text-[20px] text-[#1a0dab] font-arial leading-6 py-1"><span className="cursor-pointer" title="">{values?.pageTitle}</span></div>
                              <div className="text-sm text-black leading-6 mb-2">
                                <div className="text-[14px] leading-[22px] text-[#4d5156] mb-2 mr-2 inline-block font-arial">
                                  <span className="font-bold">{values.pageTitle}</span> gives its customers exclusive, direct access to custom branded clothing and accessories from iconic premium sports and lifestyle brands.
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {displayFieldElement(fields, "seName") && (
                          <div className="mb-6">
                            <div className="flex items-center justify-between">
                              <label className="tracking-wide text-gray-700 text-sm font-bold mb-2 flex items-center">
                                Page URL <span className="text-rose-500 text-2xl leading-none">*</span>
                                <ToolTipComponent
                                  id="SEOPageURL"
                                  message={ToolTipsMessages.SEOTooltips.SEOPageURL}
                                />
                              </label>
                              <span className="text-xs"><span x-html="count">{handleShowTextLength(values.seName, store?.url)}</span> / <span>160</span> Character (Prefer Max 255 Characters)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="md:mr-2">{store ? store?.url + "/" : ''}</div>
                              <div className="grow">
                                <Input name={'seName'}
                                  type="text"
                                  placeholder="SE Name"
                                  className={"bg-slate-200"}
                                  disabled={true}
                                  maxLength={maxLengthForPageUrl()}
                                  onChange={(e) => {
                                    setFieldValue("seName", e.target.value);
                                    setFieldValue("pageUrl", "/" + e.target.value + ".html");
                                  }}
                                />
                              </div>
                              <div className="pr-2">{".html"}</div>
                              <div className="flex items-center justify-between gap-1">
                                <div className={`w-4 h-4 rounded-full overflow-hidden ${getseNameColor(values.seName, store?.url)}`}></div>
                                <div className={`w-4 h-4 rounded-full overflow-hidden ${getseNameColor(values.seName, store?.url)}`}></div>
                                <div className={`w-4 h-4 rounded-full overflow-hidden ${getseNameColor(values.seName, store?.url)}`}></div>
                              </div>
                            </div>
                          </div>)}
                        {displayFieldElement(fields, "pageTitle") && (
                          <div className="mb-6">
                            <div className="flex items-center justify-between">
                              <label className="tracking-wide text-gray-700 text-sm font-bold mb-2 flex items-center">
                                Page Title <span className="text-rose-500 text-2xl leading-none">*</span>
                                <ToolTipComponent
                                  id="SEOPageTitle"
                                  message={ToolTipsMessages.SEOTooltips.SEOPageTitle}
                                />
                              </label>
                              <span className="text-xs"><span x-html="count">{values.pageTitle.length}</span> / <span>60</span> Characters (Prefer Max 72 Characters) </span>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                              <div className="grow">
                                <Input name={'pageTitle'} type="text" placeholder="" maxLength={Infinity} className="appearance-none block w-full text-gray-700 border border-gray-200 rounded p-4 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                  disabled={readOnly}
                                  onChange={(e) => {
                                    setFieldValue('pageTitle', e.target.value.replace(regexCode, ""));
                                    if (e.target.value.length) {
                                      setFieldValue('openGraphTitle', e.target.value.replace(regexCode, ""));
                                    }
                                  }}
                                />
                              </div>
                              <div className="flex items-center justify-between gap-1">
                                <div className={`w-4 h-4 rounded-full overflow-hidden ${getPageTitleColor(values.pageTitle)}`}></div>
                                <div className={`w-4 h-4 rounded-full overflow-hidden ${getPageTitleColor(values.pageTitle)}`}></div>
                                <div className={`w-4 h-4 rounded-full overflow-hidden ${getPageTitleColor(values.pageTitle)}`}></div>
                              </div>
                            </div>
                          </div>)}
                        {displayFieldElement(fields, "metaDescription") && (<div className="mb-6">
                          <div className="flex items-center justify-between">
                            <label className="tracking-wide text-gray-700 text-sm font-bold mb-2 flex items-center">
                              Meta Description <span className="text-rose-500 text-2xl leading-none">*</span>
                              <ToolTipComponent
                                id="SEOMetaDesc"
                                message={ToolTipsMessages.SEOTooltips.SEOMetaDesc}
                              />
                            </label>
                            <span className="text-xs"><span x-html="count">{values.metaDescription.length}</span> / <span>155</span> Characters (Prefer Max 190 Characters)</span>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <div className="grow">
                              <Textarea name={'metaDescription'}
                                type="text" placeholder="" maxLength="190" className="appearance-none block w-full text-gray-700 border border-gray-200 rounded p-4 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" disabled={readOnly}
                                onChange={(e) => {
                                  setFieldValue('metaDescription', e.target.value);

                                  if (e.target.value.length <= 190) {
                                    setFieldValue('openGraphDescription', e.target.value);
                                  }
                                }} />
                            </div>
                            <div className="flex items-center justify-between gap-1">
                              <div className={`w-4 h-4 rounded-full overflow-hidden ${getMetaDescriptionColor(values.metaDescription)}`}></div>
                              <div className={`w-4 h-4 rounded-full overflow-hidden ${getMetaDescriptionColor(values.metaDescription)}`}></div>
                              <div className={`w-4 h-4 rounded-full overflow-hidden ${getMetaDescriptionColor(values.metaDescription)}`}></div>
                            </div>
                          </div>
                        </div>)}
                        {displayFieldElement(fields, "metaKeywords") && (<div className="mb-6">
                          <div className="flex items-center justify-between">
                            <label className="tracking-wide text-gray-700 text-sm font-bold mb-2 flex items-center">
                              Meta Keywords <span className="text-rose-500 text-2xl leading-none">*</span>
                              <ToolTipComponent
                                id="SEOMetaKeyWord"
                                message={ToolTipsMessages.SEOTooltips.SEOMetaKeyWord}
                              />
                            </label>
                            <span className="text-xs"><span x-html="count">{values.metaKeywords ? values.metaKeywords.split(",").length : 0}</span> / <span>7</span> Words (Prefer Max 9 Words)</span>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <div className="grow">
                              <Textarea name={'metaKeywords'} onChange={(e) => handleCommaSepWord(e, 9, setFieldValue, "metaKeywords")} type="text" placeholder="" /* maxLength="255" */ className="appearance-none block w-full text-gray-700 border border-gray-200 rounded p-4 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" disabled={readOnly}
                              />
                            </div>
                            <div className="flex items-center justify-between gap-1">
                              <div className={`w-4 h-4 rounded-full overflow-hidden ${getMetaKeywordsColor(values.metaKeywords)}`}></div>
                              <div className={`w-4 h-4 rounded-full overflow-hidden ${getMetaKeywordsColor(values.metaKeywords)}`}></div>
                              <div className={`w-4 h-4 rounded-full overflow-hidden ${getMetaKeywordsColor(values.metaKeywords)}`}></div>
                            </div>
                          </div>
                        </div>)}
                        {displayFieldElement(fields, "roiKeywords") && (<div className="mb-6">
                          <div className="flex items-center justify-between">
                            <label className="tracking-wide text-gray-700 text-sm font-bold mb-2 flex items-center">
                              ROI Keywords
                              <ToolTipComponent
                                id="roiKeywords"
                                message={ToolTipsMessages.SEOTooltips.RoiKeywords}
                              />
                            </label>
                            <span className="text-xs"><span x-html="count">{values.roiKeywords ? values.roiKeywords.split(",").length : 0}</span> / <span>3</span> Words (Prefer Max 7 Words)</span>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <Input name={'roiKeywords'} onChange={(e) => handleCommaSepWord(e, 7, setFieldValue, "roiKeywords")} type="text" placeholder="" /* maxLength="255" */ className="appearance-none block w-full text-gray-700 border border-gray-200 rounded p-4 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" disabled={readOnly} />
                            <div className="flex items-center justify-between gap-1">
                              <div className={`w-4 h-4 rounded-full overflow-hidden ${getRoiKeywordsColor(values.roiKeywords)}`}></div>
                              <div className={`w-4 h-4 rounded-full overflow-hidden ${getRoiKeywordsColor(values.roiKeywords)}`}></div>
                              <div className={`w-4 h-4 rounded-full overflow-hidden ${getRoiKeywordsColor(values.roiKeywords)}`}></div>
                            </div>
                          </div>
                        </div>)}
                        {displayFieldElement(fields, "targetedKeywords") && (<div className="mb-6">
                          <div className="flex items-center justify-between">
                            <label className="tracking-wide text-gray-700 text-sm font-bold mb-2 flex items-center">
                              Targeted Keywords
                              <ToolTipComponent
                                id="targetedKeywords"
                                message={ToolTipsMessages.SEOTooltips.TargetedKeywords}
                              />
                            </label>
                            <span className="text-xs"><span x-html="count">{values.targetedKeywords ? values.targetedKeywords.split(",").length : 0}</span> / <span>3</span> Words (Prefer Max 7 Words)</span>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <Input name={'targetedKeywords'} type="text" onChange={(e) => handleCommaSepWord(e, 7, setFieldValue, "targetedKeywords")} placeholder=""/*  maxLength="255" */ className="appearance-none block w-full text-gray-700 border border-gray-200 rounded p-4 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" disabled={readOnly} />
                            <div className="flex items-center justify-between gap-1">
                              <div className={`w-4 h-4 rounded-full overflow-hidden ${getTargetedKeywordsColor(values.targetedKeywords)}`}></div>
                              <div className={`w-4 h-4 rounded-full overflow-hidden ${getTargetedKeywordsColor(values.targetedKeywords)}`}></div>
                              <div className={`w-4 h-4 rounded-full overflow-hidden ${getTargetedKeywordsColor(values.targetedKeywords)}`}></div>
                            </div>
                          </div>
                        </div>)}
                        <div className="mb-6">
                          <label className="tracking-wide text-gray-700 text-sm font-bold mb-2 flex items-center"> Header Tags
                            <ToolTipComponent
                              id="HeaderTags"
                              message={ToolTipsMessages.SEOTooltips.HeaderTags}
                            />
                          </label>
                          {displayFieldElement(fields, "h1") && (<div className="flex items-center mb-4 gap-2">
                            <label className="w-full md:w-1/4">H1</label>
                            <Input name={'h1'} className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded p-4 py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="" disabled={true} />
                            <div className="flex items-center justify-between gap-1">
                              <span className="mr-4">({H1toH6TagData.h1TagsCount})</span>
                              <div className={`w-4 h-4 rounded-full overflow-hidden ${getH1TagColor(H1toH6TagData.h1ColorCode)}`}></div>
                              <div className={`w-4 h-4 rounded-full overflow-hidden ${H1toH6TagData.h1ColorCode ? getH1TagColor(H1toH6TagData.h1ColorCode) : 'bg-gray-300'}`}></div>
                              <div className={`w-4 h-4 rounded-full overflow-hidden ${H1toH6TagData.h1ColorCode ? getH1TagColor(H1toH6TagData.h1ColorCode) : 'bg-gray-300'}`}></div>
                            </div>
                          </div>)}
                          {displayFieldElement(fields, "h2") && (<div className="flex items-center mb-4 gap-2">
                            <label className="w-full md:w-1/4">H2</label>
                            <Input name={'h2'} className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded p-4 py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="" disabled={true} />
                            <div className="flex items-center justify-between gap-1">
                              <span className="mr-4">({H1toH6TagData.h2TagsCount})</span>
                              <div className={`w-4 h-4 rounded-full overflow-hidden ${CheckTagSequence(H1toH6TagData.h2ColorCode)}`}></div>
                              <div className={`w-4 h-4 rounded-full overflow-hidden ${H1toH6TagData.h2ColorCode ? CheckTagSequence(H1toH6TagData.h2ColorCode) : 'bg-gray-300'}`}></div>
                              <div className={`w-4 h-4 rounded-full overflow-hidden ${H1toH6TagData.h2ColorCode ? CheckTagSequence(H1toH6TagData.h2ColorCode) : 'bg-gray-300'}`}></div>
                            </div>
                          </div>)}
                          {displayFieldElement(fields, "h3") && (<div className="flex items-center mb-4 gap-2">
                            <label className="w-full md:w-1/4">H3</label>
                            <Input name={'h3'} className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded p-4 py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="" disabled={true} />
                            <div className="flex items-center justify-between gap-1">
                              <span className="mr-4">({H1toH6TagData.h3TagsCount})</span>
                              <div className={`w-4 h-4 rounded-full overflow-hidden ${CheckTagSequence(H1toH6TagData.h3ColorCode)}`}></div>
                              <div className={`w-4 h-4 rounded-full overflow-hidden ${H1toH6TagData.h3ColorCode ? CheckTagSequence(H1toH6TagData.h3ColorCode) : 'bg-gray-300'}`}></div>
                              <div className={`w-4 h-4 rounded-full overflow-hidden ${H1toH6TagData.h3ColorCode ? CheckTagSequence(H1toH6TagData.h3ColorCode) : 'bg-gray-300'}`}></div>
                            </div>
                          </div>)}
                          {displayFieldElement(fields, "h4") && (<div className="flex items-center mb-4 gap-2">
                            <label className="w-full md:w-1/4">H4</label>
                            <Input name={'h4'} className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded p-4 py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="" disabled={true} />
                            <div className="flex items-center justify-between gap-1">
                              <span className="mr-4">({H1toH6TagData.h4TagsCount})</span>
                              <div className={`w-4 h-4 rounded-full overflow-hidden ${CheckTagSequence(H1toH6TagData.h4ColorCode)}`}></div>
                              <div className={`w-4 h-4 rounded-full overflow-hidden ${H1toH6TagData.h4ColorCode ? CheckTagSequence(H1toH6TagData.h4ColorCode) : 'bg-gray-300'}`}></div>
                              <div className={`w-4 h-4 rounded-full overflow-hidden ${H1toH6TagData.h4ColorCode ? CheckTagSequence(H1toH6TagData.h4ColorCode) : 'bg-gray-300'}`}></div>
                            </div>
                          </div>)}
                          {displayFieldElement(fields, "h5") && (<div className="flex items-center mb-4 gap-2">
                            <label className="w-full md:w-1/4">H5</label>
                            <Input name={'h5'} className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded p-4 py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="" disabled={true} />
                            <div className="flex items-center justify-between gap-1">
                              <span className="mr-4">({H1toH6TagData.h5TagsCount})</span>
                              <div className={`w-4 h-4 rounded-full overflow-hidden ${CheckTagSequence(H1toH6TagData.h5ColorCode)}`}></div>
                              <div className={`w-4 h-4 rounded-full overflow-hidden ${H1toH6TagData.h5ColorCode ? CheckTagSequence(H1toH6TagData.h5ColorCode) : 'bg-gray-300'}`}></div>
                              <div className={`w-4 h-4 rounded-full overflow-hidden ${H1toH6TagData.h5ColorCode ? CheckTagSequence(H1toH6TagData.h5ColorCode) : 'bg-gray-300'}`}></div>
                            </div>
                          </div>)}
                          {displayFieldElement(fields, "h6") && (<div className="flex items-center mb-4 gap-2">
                            <label className="w-full md:w-1/4">H6</label>
                            <Input name={'h6'} className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded p-4 py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="" disabled={true} />
                            <div className="flex items-center justify-between gap-1">
                              <span className="mr-4">({H1toH6TagData.h6TagsCount})</span>
                              <div className={`w-4 h-4 rounded-full overflow-hidden ${CheckTagSequence(H1toH6TagData.h6ColorCode)}`}></div>
                              <div className={`w-4 h-4 rounded-full overflow-hidden ${H1toH6TagData.h6ColorCode ? CheckTagSequence(H1toH6TagData.h6ColorCode) : 'bg-gray-300'}`}></div>
                              <div className={`w-4 h-4 rounded-full overflow-hidden ${H1toH6TagData.h6ColorCode ? CheckTagSequence(H1toH6TagData.h6ColorCode) : 'bg-gray-300'}`}></div>
                            </div>
                          </div>)}
                        </div>
                        <div className="mt-10 mb-10"> <hr className="border-neutral-300" /> </div>
                        <div className="mt-6">
                          <div className="flex flex-wrap -mx-4 -mb-4 md:mb-0">
                            {displayFieldElement(fields, "openGraphImagePath") && (<div className="w-full md:w-1/2 px-4 mb-4">
                              <ImageFile
                                type="file"
                                className="sr-only"
                                name="openGraphImagePath"
                                id="openGraphImagePath"
                                buttonName="Add"
                                disabled={readOnly}
                                folderpath={`${FolderPath}`}
                                onChange={(value) => {
                                  if ((!values.facebookImagePath && values.facebookImagePath === '') || values.openGraphImagePath === values.facebookImagePath) {
                                    setFieldValue("facebookImagePath", value);
                                  }
                                  if ((!values.twitterImagePath && values.twitterImagePath === '') || values.openGraphImagePath === values.twitterImagePath) {
                                    setFieldValue("twitterImagePath", value);
                                  }
                                  if ((!values.linkedinImagePath && values.linkedinImagePath === '') || values.openGraphImagePath === values.linkedinImagePath) {
                                    setFieldValue("linkedinImagePath", value);
                                  }
                                  setFieldValue("openGraphImagePath", value);
                                }}
                                url={values.openGraphImagePath}
                              />

                            </div>)}
                            <div className="w-full md:w-1/2 px-4 mb-4">
                              {displayFieldElement(fields, "previewType") && (<div >
                                <div className="flex items-center justify-between">
                                  <label className="tracking-wide text-gray-700 text-sm font-bold mb-2 flex items-center">
                                    Open Graph Title
                                    <ToolTipComponent
                                      id="SeoOpenGraphTitle"
                                      message={ToolTipsMessages.SEOConfiguratorTooltips.SeoOpenGraphTitle}
                                    />
                                  </label>
                                  <div className="flex">
                                    <span className="text-xs"><span x-html="count">{values.openGraphTitle.length}</span> / <span>60</span> Characters (Prefer Max 60 Characters)</span>
                                    <div className="flex items-center justify-between gap-1 ml-2">
                                      <div className={`w-4 h-4 rounded-full overflow-hidden ${OpenGraphTitle(values.openGraphTitle)}`}></div>
                                      <div className={`w-4 h-4 rounded-full overflow-hidden ${OpenGraphTitle(values.openGraphTitle)}`}></div>
                                      <div className={`w-4 h-4 rounded-full overflow-hidden ${OpenGraphTitle(values.openGraphTitle)}`}></div>
                                    </div>
                                  </div>
                                </div>
                                <Input
                                  name={'openGraphTitle'}
                                  defaultValue={values.openGraphTitle}
                                  className="appearance-none block w-full text-gray-700 border border-gray-200 rounded p-4 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                  type="text"
                                  placeholder=""
                                  maxLength={Infinity}
                                  disabled={readOnly}
                                />
                              </div>)}
                              {displayFieldElement(fields, "previewType") && (<div className="mb-6" x-data="{ count: 0 }">
                                <div className="flex items-center justify-between">
                                  <label className="tracking-wide text-gray-700 text-sm font-bold mb-2 flex items-center">
                                    Open Graph Description
                                    <ToolTipComponent
                                      id="SeoOpenGraphDesc"
                                      message={ToolTipsMessages.SEOConfiguratorTooltips.SeoOpenGraphDesc}
                                    />
                                  </label>

                                  <div className="flex">
                                    <span className="text-xs"><span x-html="count">{values.openGraphDescription.length}</span> / <span>155</span> Characters (Prefer Max 155 Characters) </span>
                                    <div className="flex items-center justify-between gap-1 ml-2">
                                      <div className={`w-4 h-4 rounded-full overflow-hidden ${OpenGraphDescription(values.openGraphDescription)}`}></div>
                                      <div className={`w-4 h-4 rounded-full overflow-hidden ${OpenGraphDescription(values.openGraphDescription)}`}></div>
                                      <div className={`w-4 h-4 rounded-full overflow-hidden ${OpenGraphDescription(values.openGraphDescription)}`}></div>
                                    </div>
                                  </div>
                                </div>
                                <Textarea maxLength={155} name="openGraphDescription" id="openGraphDescription" className="appearance-none block w-full text-gray-700 border border-gray-200 rounded p-4 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" disabled={readOnly}
                                  defaultValue={values.openGraphDescription === "" ? values.metaDescription : values.openGraphDescription}
                                />
                              </div>)}
                            </div>
                          </div>
                        </div>
                        <SEOSocial values={values} setFieldValue={setFieldValue} displayFieldElement={displayFieldElement} readOnly={readOnly} fields={fields} id={productId} moduleName={moduleName} ShowProduct={false} />
                      </div>

                    </div >
                  </div >
                </FormikForm >
              )
            }}
          </Formik >
        </div >
      </div >
    </>
  );
};

export default SEO;

