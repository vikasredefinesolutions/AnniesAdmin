import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form as FormikForm } from "formik";

import { ValidationMsgs } from "global/ValidationMessages";

import TopicsDetailsServices from 'services/admin/topics/TopicsDetailsServices';
import CacheService from 'services/admin/cache/CacheService';
import StoreService from 'services/admin/store/StoreService';
import { serverError } from "services/common/helper/Helper";

import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";

import RadioButtonGroup from 'components/common/formComponent/RadioButtonGroup';
import DatePicker from "components/common/formComponent/DatePicker";
import Input from 'components/common/formComponent/Input';
import Checkbox from 'components/common/formComponent/Checkbox';
import Messages from "components/common/alerts/messages/Index";

import PageEditMainHeader from '../PageEditMainHeader';
import PageEditTabHeader from '../PageEditTabHeader';

const PublishOptions = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const permission = useSelector(store => store.permission);
    const GlobalLoading = useSelector((store) => store?.GlobalLoaderReducer?.toLoad);
    const currentStoreData = useSelector(store => store?.TempDataReducer.currentStoreData);

    const { id } = useParams();
    const [data, setData] = useState([]);
    const [showWebOnIfram, setshowWebOnIfram] = useState(false);
    const [ClearCatchURL, setClearCatchURL] = useState("");
    const date = new Date();

    // const schema = Yup.object().shape({
    //     name: Yup.string().trim().required(ValidationMsgs.pageEditSetting.general.name),
    // });

    const radioOption = [
        { label: "Publish now", value: "N" },
        { label: "Unpublish It", value: "D" },
        { label: "Change publish date", value: "C" },
    ];

    const getTopicPublishOptionsData = useCallback(() => {
        TopicsDetailsServices.getTopicDetails(id)
            .then((res) => {
                setData(res?.data?.data);
                StoreService.getStoreById(res?.data?.data?.storeId)
                    .then((res) => {
                        var response = res.data;
                        if (response.success) {
                            if (response?.data?.id === 5) {
                                setClearCatchURL(response?.data?.url + "/api/revalidate");
                            }
                            else {
                                setClearCatchURL(response?.data?.url + "/clearCache/category_id=0");
                            }
                        }
                    })
                    .catch((err) => { });
            })
            .catch((err) => {
                //console.log(err);
            });
    }, [location.pathname, id])

    useEffect(() => {
        getTopicPublishOptionsData();
    }, [location.pathname, id]);

    const clearCacheForPage = () => {
        setshowWebOnIfram("clearCache")
        setTimeout(() => {
            setshowWebOnIfram(false)
        }, 180000);
    }

    const publishPage = async (fields) => {
        dispatch(setAddLoading(true))

        let topicObj = {
            "id": id,
            "title": data?.title || "",
            "pageType": data?.pageType || "",
            "passRequired": data?.passRequired || "",
            "password": data?.password || "",
            "pass_expiry_period": data?.pass_expiry_period || "",
            "author": data?.author || "",
            "preview_As": data?.preview_As || "",
            "store_Id": data.storeId,
            "slug": data?.slug || "",
            "topic_Title": data?.topic_Title || "",
            "meta_Description": data?.meta_Description || "",
            "meta_Keywords": data?.meta_Keywords || "",
            "template_Id": 0,
            "head_Html": data?.head_Html || "",
            "footer_Html": data?.footer_Html || "",
            "canonical_Url": data?.canonical_Url || "",
            "publish_Duration": fields.publishDuration || data?.publishDuration || "",
            "publish_Date": fields.publishDate || data?.publishDate || "",
            "publish_Time": fields.publishTime || data?.publishTime || "",
            "unpublish_Date": fields.unpublishDate || data?.unpublishDate || "",
            "unpublish_Time": fields.unpublishTime || data?.unpublishTime || "",
            "schedule_Unpublish": fields.scheduleUnpublish || data?.scheduleUnpublish || "",
            "redirect_Page_Id": data?.redirect_Page_Id || "",
            "created_By": data?.created_By || "",
            "updated_By": data?.updated_By || "",
            "status": data?.status || "",
            "created_At": data?.created_At || "",
            "updated_At": data?.updated_At || "",
            "isHomePage": data?.isHomePage || "",
            "page_Id": id,
            "menu_Type": data?.menu_Type || "",
            "storiesImage": data?.storiesImage || "",
            "description": data?.description || "",
            "categoryId": data?.categoryId || "",
            "displaySideBar": data?.displaySideBar || "",
            "parentId": data.parentId,
            "openGraphImagePath": data?.openGraphImagePath || "",
            "openGraphTitle": data?.openGraphTitle || "",
            "openGraphDescription": data?.openGraphDescription || "",
            "facebookImagePath": data?.facebookImagePath || "",
            "facebookOpenGraphTitle": data?.facebookOpenGraphTitle || "",
            "facebookOpenGraphDescription": data?.facebookOpenGraphDescription || "",
            "twitterImagePath": data?.twitterImagePath || "",
            "twitterOpenGraphTitle": data?.twitterOpenGraphTitle || "",
            "twitterOpenGraphDescription": data?.twitterOpenGraphDescription || "",
            "linkedinImagePath": data?.linkedinImagePath || "",
            "linkedinOpenGraphTitle": data?.linkedinOpenGraphTitle || "",
            "linkedinOpenGraphDescription": data?.linkedinOpenGraphDescription || "",
            "pinterestImagePath": data?.pinterestImagePath || "",
            "pinterestOpenGraphTitle": data?.pinterestOpenGraphTitle || "",
            "pinterestOpenGraphDescription": data?.apinterestOpenGraphDescription || "",
        };

        try {
            const res = await TopicsDetailsServices[data?.id ? "updatePublishPage" : "publishPage"](topicObj);
            if (res.data.success) {
                const cacheResponse = await CacheService.clearHomeCache(
                    data.storeId
                );
                if (cacheResponse.data.success) {
                    dispatch(
                        setAlertMessage({
                            type: "success",
                            message: ValidationMsgs.topic.publishSuccess,
                        })
                    );
                    dispatch(setAddLoading(false));
                    clearCacheForPage()
                } else {
                    dispatch(
                        setAlertMessage({
                            type: "danger",
                            message: ValidationMsgs.topic.publishError,
                        })
                    );
                    dispatch(setAddLoading(false));
                }
            } else {
                dispatch(
                    setAlertMessage({
                        type: "danger",
                        message: ValidationMsgs.topic.publishError,
                    })
                );
                dispatch(setAddLoading(false));
            }
        } catch (e) {
            dispatch(
                setAlertMessage({
                    type: "danger",
                    message: ValidationMsgs.topic.publishError,
                })
            );
            dispatch(setAddLoading(false));
        }
    }

    const handleSubmitHandler = (fields, resetForm) => {
        dispatch(setAddLoading(true))

        const topicObj = {
            ...fields
        }

        topicObj["id"] = id;
        topicObj["pageType"] = data.pageType;
        topicObj["passRequired"] = data.passRequired;
        topicObj["password"] = data.password;
        topicObj["passwordExpiryPeriod"] = data.passwordExpiryPeriod;
        topicObj["tag"] = data.tag;
        topicObj["author"] = data.author;
        topicObj["previewAs"] = data.previewAs;
        topicObj["storeId"] = data.storeId;
        topicObj["slug"] = data.slug;
        topicObj["topicTitle"] = data.topicTitle;
        topicObj["metaDescription"] = data.metaDescription;
        topicObj["metaKeywords"] = data.metaKeywords;
        topicObj["templateId"] = data.templateId;
        topicObj["headHtml"] = data.headHtml;
        topicObj["footerhtml"] = data.footerhtml;
        topicObj["canonicalurl"] = data.canonicalurl;
        topicObj["redirectPageId"] = data.redirectPageId;
        topicObj["createdBy"] = data.createdBy;
        topicObj["updatedBy"] = data.updatedBy;
        topicObj["status"] = "P";
        topicObj["createdAt"] = data.createdAt;
        topicObj["updatedAT"] = data.updatedAT;
        topicObj["isHomePage"] = data.isHomePage;
        topicObj["publish_status"] = data.publish_status;
        topicObj["menuType"] = data.menuType;
        topicObj["oldId"] = data.oldId;
        topicObj["storiesImage"] = data.storiesImage;
        topicObj["description"] = data.description;
        topicObj["productSku"] = data.productSku;
        topicObj["categoryId"] = data.categoryId;
        topicObj["displaySideBar"] = data.displaySideBar;
        topicObj["isbreadcrumbShow"] = data.isbreadcrumbShow;
        topicObj["parentId"] = data.parentId;
        topicObj["openGraphTitle"] = data?.openGraphTitle || "";
        topicObj["openGraphDescription"] = data?.openGraphDescription || "";
        topicObj["openGraphImagePath"] = data?.openGraphImagePath || "";
        topicObj["facebookImagePath"] = data?.facebookImagePath || "";
        topicObj["facebookOpenGraphTitle"] = data?.facebookOpenGraphTitle || "";
        topicObj["facebookOpenGraphDescription"] = data?.facebookOpenGraphDescription || "";
        topicObj["twitterImagePath"] = data?.twitterImagePath || "";
        topicObj["twitterOpenGraphTitle"] = data?.twitterOpenGraphTitle || "";
        topicObj["twitterOpenGraphDescription"] = data?.twitterOpenGraphDescription || "";
        topicObj["linkedinImagePath"] = data?.linkedinImagePath || "";
        topicObj["linkedinOpenGraphTitle"] = data?.linkedinOpenGraphTitle || "";
        topicObj["linkedinOpenGraphDescription"] = data?.linkedinOpenGraphDescription || "";
        topicObj["pinterestImagePath"] = data?.pinterestImagePath || "";
        topicObj["pinterestOpenGraphTitle"] = data?.pinterestOpenGraphTitle || "";
        topicObj["pinterestOpenGraphDescription"] = data?.pinterestOpenGraphDescription || ""


        TopicsDetailsServices.updateTopic({ ...topicObj }).then((response) => {
            getTopicPublishOptionsData()
            if (response.data.success && response.data.data) {
                dispatch(
                    setAlertMessage({
                        type: "success",
                        message: ValidationMsgs.pageEditSetting.topic.topicUpdated,
                    })
                );
            } else {
                dispatch(
                    setAlertMessage({ type: "danger", message: serverError(response) })
                );
            }
            dispatch(setAddLoading(false))
        }).catch((err) => {
            //console.log(err, "Update Response");
            dispatch(setAlertMessage({ type: "danger", message: ValidationMsgs.pageEditSetting.topic.topicNotUpdated }));
            dispatch(setAddLoading(false))
        });

        if (fields.publishDuration === "N") {
            publishPage(fields);
        }
    }

    return (
        <div className="bg-white h-screen">
            <Formik
                enableReinitialize={true}
                initialValues={{
                    publishDuration: data?.publishDuration || "N",
                    publishDate: data?.publishDate || "",
                    publishTime: data?.publishTime || "",
                    scheduleUnpublish: data?.scheduleUnpublish || "",
                    unpublishDate: data?.unpublishDate || "",
                    unpublishTime: data?.unpublishTime || "",
                    store_id: data?.store_id || "",
                    title: data?.title || "",
                }}
                // validationSchema={schema}
                onSubmit={handleSubmitHandler}
            >
                {
                    ({ values, setFieldValue }) => {
                        return (
                            <FormikForm>
                                <PageEditMainHeader activeTab={4} ClearCatchURL={ClearCatchURL} loading={GlobalLoading} permission={permission} />
                                <PageEditTabHeader activeTab={4} permission={permission} />

                                <div className="bg-gray-100 tab-content p-4">
                                    <div className="md:w-3/6 mx-auto">
                                        <div className="w-full hidden">
                                            {
                                                (showWebOnIfram && currentStoreData && currentStoreData["url"]) && <iframe src={`${currentStoreData["url"]}/clearCache/category_id=0`} height="300" width="100%"></iframe>
                                            }
                                        </div>
                                        <div className="w-full">
                                            <Messages />
                                            <div className="mb-7 flex flex-wrap justify-start items-center">
                                                <div className="text-2xl text-gray-800 font-bold">
                                                    Publishing Options
                                                    {data?.status === 'P'
                                                        ?
                                                        <div className="text-xs inline-flex font-medium border border-green-300 bg-green-100 text-green-600 rounded-full text-center px-4 py-1 ml-3">
                                                            Published
                                                        </div> : ""
                                                    }

                                                </div>
                                            </div>
                                            <div className="mb-6 w-full">
                                                <div className="mb-6">
                                                    <RadioButtonGroup
                                                        name="publishDuration"
                                                        align="horizontal"
                                                        options={radioOption}
                                                    />
                                                </div>

                                                <div className={`mb-6 ${values.publishDuration === 'N' ? '' : 'hidden'}`}>Your landing page will be updated immediately. </div>
                                                <div className={`mb-6 ${values.publishDuration === 'C' ? '' : 'hidden'}`}>
                                                    <div className="mb-6">
                                                        You can change the publish date after publishing only if it is set to a date in the past. To set it in the future, first unpublish this landing page.
                                                    </div>
                                                    <div className="mb-2 text-xl font-bold">When would you like to release your page?</div>
                                                    <div className="grid grid-cols-2 mb-6 gap-2">
                                                        <div >
                                                            <div className="w-full md:mr-2">
                                                                <DatePicker className={"mr-2"} name={"publishDate"} defaultValue={values.publishDate} placeholder="Select Date" />
                                                            </div>
                                                        </div>
                                                        <div >
                                                            <div className="w-full md:mr-2">
                                                                <Input type="time" name={"publishTime"} defaultValue={values.publishTime} placeholder="Select Time" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mb-6">
                                                <div className="mb-2 text-xl font-bold">Scheduled unpublish</div>
                                                <div className="mb-6">
                                                    <label className="flex items-center font-medium text-sm">
                                                        <Checkbox
                                                            name="scheduleUnpublish"

                                                            label="Unpublish page on a specific date"
                                                            checked={(values?.scheduleUnpublish === 'Y') ? true : false}
                                                            onChange={(e) => {
                                                                if (e.target.checked) {
                                                                    setFieldValue("scheduleUnpublish", 'Y');
                                                                } else {
                                                                    setFieldValue("scheduleUnpublish", 'N');
                                                                }
                                                            }}
                                                        />
                                                    </label>
                                                </div>
                                                <div className={`grid grid-cols-2 mb-6 gap-2 ${values.scheduleUnpublish === 'Y' ? '' : 'hidden'}`}>
                                                    <div className="w-full">
                                                        <label className="tracking-wide text-gray-700 text-sm font-bold mb-2 flex items-center"> Unpublish date </label>
                                                        <DatePicker className={"mr-2"} name={"unpublishDate"} defaultValue={values.unpublishDate} placeholder="Select Date" />
                                                    </div>
                                                    <div className="w-full">
                                                        <label className="tracking-wide text-gray-700 text-sm font-bold mb-2 flex items-center"> Unpublish Time </label>
                                                        <Input type="time" name={"unpublishTime"} defaultValue={values.unpublishTime} placeholder="Select Time" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </FormikForm>
                        )
                    }
                }
            </Formik>
        </div>
    )
}

export default PublishOptions