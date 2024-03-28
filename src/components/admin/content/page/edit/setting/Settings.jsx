import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form as FormikForm } from "formik";
import { useParams, useLocation } from "react-router-dom";
import * as Yup from "yup";

import { ValidationMsgs } from "global/ValidationMessages";

// import ProductService from "services/admin/master/store/product/ProductService";
import TopicsDetailsServices from "services/admin/topics/TopicsDetailsServices";
import StoreService from "services/admin/store/StoreService";
import TemplateService from "services/admin/template/TemplateService";
import { serverError } from "services/common/helper/Helper";

import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";

import Messages from "components/common/alerts/messages/Index";

import CmsSocialPreviewAccordian from "./sections/CmsSocialPreviewAccordian";
import AddProductSection from "./sections/AddProductSection";
import DiscriptionField from "./sections/DiscriptionField";
import BreadCrumbShow from "./sections/BreadCrumbShow";
import PageEditMainHeader from "../PageEditMainHeader";
import AdvanceOptions from "./sections/AdvanceOptions";
import PageEditTabHeader from "../PageEditTabHeader";
import StoriesImage from "./sections/StoriesImage";
import BannerLinks from "./sections/BannerLinks";
import MetaData from "./sections/MetaData";
import Template from "./sections/Template";
import General from "./sections/General";
import { StoreURL } from "redux/storeUrl/storeUrlActions";

const Settings = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const permission = useSelector((store) => store.permission);
  const user = useSelector((store) => store.user);

  const ref = useRef();
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [storeName, setStoreName] = useState("");
  const [storeUrl, setStoreUrl] = useState("");
  const [dropDownOption, setdropDownOption] = useState([]);
  const [templateDataKeyByID, setTemplateDataKeyByID] = useState([]);
  const [BannerLinksData, setBannerLinksData] = useState([]);
  // const [products, setProducts] = useState([]);
  const [parentData, setParentData] = useState([]);

  const date = new Date();

  const handleSubmitHandler = (fields, { resetForm }) => {
    fields.pageType = data.pageType;
    fields.storeId = data.storeId;
    fields.publishDuration = data.publishDuration;

    fields.publishDate = data.publishDate;
    fields.publishTime = data.publishTime;
    fields.unpublishDate = data.unpublishDate;
    fields.unpublishTime = data.unpublishTime;
    fields.scheduleUnpublish = data.scheduleUnpublish;
    fields.redirectPageId = data.redirectPageId;
    fields.createdBy = data.createdBy;
    fields.updatedBy = user.id;
    fields.modifiedBy = user.id;
    fields.status = data.status;
    fields.createdAt = data.createdAt;
    fields.updatedAT = date;
    fields.publish_status = data.publish_status;
    fields.oldId = data.oldId;

    if (data.pageType === "Blog") ref.current.handleAddBannerlinks();

    updateTopic(fields, resetForm);
  };

  const getTopic = (storeId) => {
    TopicsDetailsServices.getTopics(storeId, "").then((response) => {
      if (response.data.success && response.data.data) {
        setParentData(response.data.data);
      }
    });
  };

  const updateTopic = (values, resetForm) => {
    dispatch(setAddLoading(true));

    TopicsDetailsServices.updateTopic({
      ...values,
      productSku: JSON.stringify(values.productSku),
    })
      .then((response) => {
        if (response.data.success && response.data.data) {
          // setData(response.data);
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.pageEditSetting.topic.topicUpdated,
            }),
          );
        } else {
          dispatch(
            setAlertMessage({ type: "danger", message: serverError(response) }),
          );
        }
        dispatch(setAddLoading(false));
        getTopicSettingData();
      })
      .catch((err) => {
        dispatch(
          setAlertMessage({
            type: "danger",
            message: ValidationMsgs.pageEditSetting.topic.topicNotUpdated,
          }),
        );
        dispatch(setAddLoading(false));
      });
  };

  const schema = Yup.object().shape({
    title: Yup.string()
      .trim()
      .required(ValidationMsgs.pageEditSetting.general.title),
    //passRequired: Yup.string().trim(),

    // password: Yup.string().trim().when("passRequired", (passRequired) => {
    //   if (passRequired === "Y") {
    //     return Yup.string().trim().required(
    //       ValidationMsgs.pageEditSetting.general.password
    //     );
    //   } else {
    //     return Yup.string().trim();
    //   }
    // }),

    // tag: Yup.string().trim().required(ValidationMsgs.pageEditSetting.general.tag),
    // author: Yup.string().trim().required(
    //   ValidationMsgs.pageEditSetting.general.author
    // ),

    slug: Yup.string()
      .trim()
      .required(ValidationMsgs.pageEditSetting.metaData.slug),
    topicTitle: Yup.string()
      .trim()
      .required(ValidationMsgs.pageEditSetting.metaData.topicTitle),
    metaDescription: Yup.string()
      .trim()
      .required(ValidationMsgs.pageEditSetting.metaData.metaDescription),
    // metaKeywords: Yup.string().trim().required(
    //   ValidationMsgs.pageEditSetting.metaData.metaKeywords
    // ),
  });

  const [openGraphInfo, setOpenGraphInfo] = useState({
    image: data.opengraphimage ?? "",
    title: data.opengraphtitle ?? "",
    description: data.opengraphdescription ?? "",
  });
  const [fbOpenGraphInfo, setFBOpenGraphInfo] = useState({
    image: data.fbopengraphimage ?? "",
    title: data.fbopengraphtitle ?? "",
    description: data.fbopengraphdescription ?? "",
    imagediff: false,
    titlediff: false,
    descdiff: false,
  });
  const [lnkOpenGraphInfo, setLnkOpenGraphInfo] = useState({
    image: data.lnkopengraphimage ?? "",
    title: data.lnkopengraphtitle ?? "",
    description: data.lnkopengraphdescription ?? "",
    imagediff: false,
    titlediff: false,
    descdiff: false,
  });
  const [twtOpenGraphInfo, setTwtOpenGraphInfo] = useState({
    image: data.twtopengraphimage ?? "",
    title: data.twtopengraphtitle ?? "",
    description: data.twtopengraphdescription ?? "",
    imagediff: false,
    titlediff: false,
    descdiff: false,
  });
  const [pintOpenGraphInfo, setPintOpenGraphInfo] = useState({
    image: data.pintopengraphimage ?? "",
    title: data.pintopengraphtitle ?? "",
    description: data.pintopengraphdescription ?? "",
    imagediff: false,
    titlediff: false,
    descdiff: false,
  });

  // const loadProducts = (storeId) => {
  //   ProductService.getStoreProductsWithoutSubrows({
  //     args: {
  //       pageSize: 10000,
  //       pageIndex: 0,
  //       sortingOptions: [],
  //       filteringOptions: [],
  //     },
  //     storeId,
  //   })
  //     .then((response) => {
  //       const productResponse = response.data.data;
  //       setProducts(productResponse.items);
  //     })
  //     .catch((err) => {
  //     });
  // };

  const getTopicSettingData = useCallback(() => {
    dispatch(setAddLoading(true));

    TopicsDetailsServices.getTopicDetails(id)
      .then((res) => {
        setData(res.data.data);

        // loadProducts(res.data.data?.storeId || "");
        getTopic(res.data.data.storeId);

        StoreService.getStoreById(res.data.data?.storeId)
          .then((res) => {
            var response = res.data;
            if (response.success) {
              setStoreName(response.data.name);
              setStoreUrl(response.data.url);
              setStoreUrl(response.data.url);
              // dispatch(StoreURL(response.data.url));
            }
          })
          .catch((err) => {});
        dispatch(setAddLoading(false));
      })
      .catch((err) => {
        dispatch(setAddLoading(false));
      });
  }, []);

  const fetchTemplateList = useCallback(() => {
    let TemplateOptionList = [];
    let TemplateListById = {};
    TemplateService.getTemplates({
      args: {
        pageIndex: 0,
        pageSize: 0,
        pagingStrategy: 0,
        sortingOptions: [
          {
            field: "string",
            direction: 0,
            priority: 0,
          },
        ],
        filteringOptions: [
          {
            field: "string",
            operator: 0,
            value: "string",
          },
        ],
      },
    })
      .then((res) => {
        res.data.data.items.map((value, index) => {
          TemplateOptionList = [
            ...TemplateOptionList,
            { value: value.id, label: value.title },
          ];
          TemplateListById = {
            ...TemplateListById,
            [value.id]: { title: value.title, image: value.image_src },
          };
        });
        setdropDownOption(TemplateOptionList);
        setTemplateDataKeyByID(TemplateListById);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    getTopicSettingData();
    fetchTemplateList();
    if (openGraphInfo.image !== "") {
      if (fbOpenGraphInfo.image === "")
        setFBOpenGraphInfo((prev) => ({ ...prev, image: openGraphInfo.image }));
      else {
        if (
          fbOpenGraphInfo.image !== "" &&
          fbOpenGraphInfo.image !== openGraphInfo.image
        ) {
          setFBOpenGraphInfo((prev) => ({ ...prev, imagediff: true }));
        }
      }
      if (twtOpenGraphInfo.image === "")
        setTwtOpenGraphInfo(openGraphInfo.image);
      else {
        if (
          twtOpenGraphInfo.image !== "" &&
          twtOpenGraphInfo.image !== openGraphInfo.image
        ) {
          setTwtOpenGraphInfo((prev) => ({ ...prev, imagediff: true }));
        }
      }
      if (lnkOpenGraphInfo.image === "")
        setLnkOpenGraphInfo(openGraphInfo.image);
      else {
        if (
          lnkOpenGraphInfo.image !== "" &&
          lnkOpenGraphInfo.image !== openGraphInfo.image
        ) {
          setLnkOpenGraphInfo((prev) => ({ ...prev, imagediff: true }));
        }
      }
    }
  }, [location.pathname]);

  const getcmsbannerlinksbytopicsid = useCallback(() => {
    if (id) {
      dispatch(setAddLoading(true));

      TemplateService.getcmsbannerlinksbytopicsid(id)
        .then((res) => {
          if (res) {
            setBannerLinksData(() => {
              return res.data.data;
            });

            dispatch(setAddLoading(false));
          }
        })
        .catch(() => {
          dispatch(setAddLoading(false));
        });
    }
  }, [id]);

  useEffect(() => {
    getcmsbannerlinksbytopicsid();
  }, []);

  const InitialValue = {
    id: id,
    title: data.title || "",
    passRequired: data?.passRequired,
    password: data?.password || "",
    passExpiryPeriod: data?.passExpiryPeriod || "",
    tag: data?.tag || "",
    author: data?.author || "",
    isHomePage: data?.isHomePage || "N",
    previewAs: data?.previewAs || "",
    slug: data?.slug || "",
    topicTitle: data?.topicTitle || "",
    metaDescription: data?.metaDescription || "",
    metaKeywords: data.metaKeywords || "",
    opengraphimage: openGraphInfo?.image,
    opengraphtitle: openGraphInfo?.title,
    opengraphdescription: openGraphInfo?.description,
    fbopengraphimage: fbOpenGraphInfo?.image,
    fbopengraphtitle: fbOpenGraphInfo?.title,
    fbopengraphdescription: fbOpenGraphInfo?.description,
    twtopengraphimage: twtOpenGraphInfo?.image,
    twtopengraphtitle: twtOpenGraphInfo?.title,
    twtopengraphdescription: twtOpenGraphInfo?.description,
    lnkopengraphimage: lnkOpenGraphInfo?.image,
    lnkopengraphtitle: lnkOpenGraphInfo?.title,
    lnkopengraphdescription: lnkOpenGraphInfo?.description,
    pintopengraphimage: pintOpenGraphInfo?.image,
    pintopengraphtitle: pintOpenGraphInfo?.title,
    pintopengraphdescription: pintOpenGraphInfo?.description,
    templateId: data?.templateId || "0",
    storeId: data?.storeId || "",
    headHtml: data?.headHtml || "",
    canonicalurl: data?.canonicalurl || "",
    footerhtml: data?.footerhtml || "",
    template_preview_image: data?.template?.image_src || "",
    storiesImage: data.storiesImage || "",
    categoryId: data.categoryId || 0,
    displaySideBar: data.displaySideBar || 0,
    description: data.description || "",
    productSku: data.productSku ? JSON.parse(data.productSku) : [],
    menuType: data.menuType || "",
    isbreadcrumbShow: data.isbreadcrumbShow || "N",
    parentId: data.parentId || 0,
    bannerLinksArray:
      BannerLinksData.length > 0
        ? BannerLinksData
        : [
            {
              name: "",
              url: "",
              urlType: "",
            },
          ],
    openGraphTitle: data?.openGraphTitle || "",
    openGraphDescription: data?.openGraphDescription || "",
    openGraphImagePath: data?.openGraphImagePath || "",
    facebookImagePath: data?.facebookImagePath || "",
    facebookOpenGraphTitle: data?.facebookOpenGraphTitle || "",
    facebookOpenGraphDescription: data?.facebookOpenGraphDescription || "",
    twitterImagePath: data?.twitterImagePath || "",
    twitterOpenGraphTitle: data?.twitterOpenGraphTitle || "",
    twitterOpenGraphDescription: data?.twitterOpenGraphDescription || "",
    linkedinImagePath: data?.linkedinImagePath || "",
    linkedinOpenGraphTitle: data?.linkedinOpenGraphTitle || "",
    linkedinOpenGraphDescription: data?.linkedinOpenGraphDescription || "",
    pinterestImagePath: data?.pinterestImagePath || "",
    pinterestOpenGraphTitle: data?.pinterestOpenGraphTitle || "",
    pinterestOpenGraphDescription: data?.pinterestOpenGraphDescription || "",
  };

  return (
    <div className='bg-white'>
      <Formik
        enableReinitialize={true}
        initialValues={InitialValue}
        validationSchema={schema}
        onSubmit={handleSubmitHandler}
      >
        {({ values, setFieldValue, errors }) => {
          return (
            <FormikForm>
              <PageEditMainHeader
                storeName={storeName}
                permission={permission}
              />
              <PageEditTabHeader activeTab={2} permission={permission} />
              <div className='bg-gray-100 tab-content p-4'>
                <div className='md:w-3/6 mx-auto'>
                  <div className='mb-4 sm:mb-0'>
                    <h1 className='text-2xl md:text-3xl text-gray-800 font-bold mb-6'>
                      Settings
                    </h1>
                    <Messages />
                    <General parentData={parentData} />

                    {data.pageType === "Blog" && (
                      <>
                        <DiscriptionField />
                        <BannerLinks
                          values={values}
                          BannerLinksData={BannerLinksData}
                          getcmsbannerlinksbytopicsid={
                            getcmsbannerlinksbytopicsid
                          }
                          ref={ref}
                        />
                        <StoriesImage
                          setFieldValue={setFieldValue}
                          values={values}
                        />
                        {/* <ProductListSection products={products} setFieldValue={setFieldValue} isLoadingProducts={isLoadingProducts} /> */}
                        <AddProductSection />
                      </>
                    )}

                    <MetaData storeUrl={storeUrl} storeName={storeName} />
                    {/* <SocialSetting 
                                            setOpenGraphInfo={setOpenGraphInfo}
                                            setFBOpenGraphInfo={setFBOpenGraphInfo}
                                            setLnkOpenGraphInfo={setLnkOpenGraphInfo}
                                            setTwtOpenGraphInfo={setTwtOpenGraphInfo}
                                            setPintOpenGraphInfo={setPintOpenGraphInfo}
                                            openGraphInfo={openGraphInfo}
                                            fbOpenGraphInfo={fbOpenGraphInfo}
                                            twtOpenGraphInfo={twtOpenGraphInfo}
                                            pintOpenGraphInfo={pintOpenGraphInfo}
                                            lnkOpenGraphInfo={lnkOpenGraphInfo}
                                        /> */}

                    <Template
                      dropDownOption={dropDownOption}
                      templateDataKeyByID={templateDataKeyByID}
                    />
                    <AdvanceOptions />
                    <BreadCrumbShow />
                    <CmsSocialPreviewAccordian />
                  </div>
                </div>
              </div>
            </FormikForm>
          );
        }}
      </Formik>
    </div>
  );
};

export default Settings;
