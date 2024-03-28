/*Component Name: SocialMediaLinks
Component Functional Details: User can create or update SocialMediaLinks master details from here.
Created By: chandan
Created Date: <Creation Date>
Modified By: chandan
Modified Date: <Modified Date> */

import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Form as FormikForm, Formik } from "formik";
import * as Yup from "yup";

import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import CMSConfiguration from "services/admin/cmsConfiguration/CMSConfiguration";
import React, { useEffect, useRef, useState, Fragment, useCallback } from "react";
import Textarea from "components/common/formComponent/Textarea";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { ValidationMsgs } from "global/ValidationMessages";
import CategoryServiceCls from "services/admin/category/CategoryService";
import TopicsDetailsServicesCls from "services/admin/topics/TopicsDetailsServices";

import { UpdateMessage, anniesAnnualData } from "global/Enum";
import { UpdateJsonDetails, updateStoreDetails } from "services/common/helper/Helper";

const SocialMediaLinks = ({ activeTab, setFormSubmit, store }) => {
    const formRef = useRef();
    const { storeId } = useParams();
    const [data, setData] = useState({});
    const dispatch = useDispatch()

    const initialValues = {
        facebook_link: data?.facebook_link || "",
        twitter_link: data?.twitter_link || "",
        pinterest_link: data?.pinterest_link || "",
        instagram_link: data?.instagram_link || "",
        linkedin_link: data?.linkedin_link || "",
        youtube_link: data?.youtube_link || "",
    }

    const [socialMediaLinks, setsocialMediaLinks] = useState([
        { id: 0, title: "Facebook Link", config_Name: "facebook_link" },
        { id: 0, title: "Twitter Link", config_Name: "twitter_link" },
        { id: 0, title: "Pinterest Link", config_Name: "pinterest_link" },
        { id: 0, title: "Instagram Link", config_Name: "instagram_link" },
        { id: 0, title: "LinkedIn Link", config_Name: "linkedin_link" },
        { id: 0, title: "YouTube Link", config_Name: "youtube_link" }
    ])

    const validationSchema = Yup.object({
        facebook_link: Yup.string().trim().required("facebook_link is required"),
        twitter_link: Yup.string().trim().required("twitter_link is required"),
        pinterest_link: Yup.string().trim().required("pinterest_link is required"),
        instagram_link: Yup.string().trim().required("instagram_link is required"),
        linkedin_link: Yup.string().trim().required("linkedin_link is required"),
        youtube_link: Yup.string().trim().required("youtube_link is required"),
    });


    useEffect(() => {
        setFormSubmit(formRef.current);
    }, [formRef, setFormSubmit]);


    const HandleSubmit = (fields) => {
        setData({})
        handleUploadStoreDetails();
        updateConfiguration(fields)
    }

    const handleUploadStoreDetails = async () => {
        if (store?.url) {
            await updateStoreDetails(store?.url);
        }
    };

    const getConfiguration = () => {
        dispatch(setAddLoading(true));

        let oldInitialValues = {}
        let oldSocialMediaLinks = [...socialMediaLinks]

        Promise.all(socialMediaLinks.map(async (singleSocialMediaLinks, index) => {
            return CMSConfiguration.getConfiguration(storeId, singleSocialMediaLinks.config_Name).then((response) => {
                if (response.data.success && response?.data?.data) {
                    oldInitialValues[singleSocialMediaLinks.config_Name] = response.data.data.config_value || ""

                    const currentIndex = socialMediaLinks.findIndex((tempSocialMediaObj) => tempSocialMediaObj.config_Name === response.data.data.config_name)
                    if (!isNaN(currentIndex)) {
                        oldSocialMediaLinks[currentIndex].id = response.data.data.id
                    }
                    return response?.data?.data
                }
            })
        })
        ).then((result) => {
            setsocialMediaLinks(oldSocialMediaLinks)
            setData(oldInitialValues);

            dispatch(setAddLoading(false));
        }).catch(() => {
            dispatch(setAddLoading(false));
        });
    }

    const updateConfiguration = useCallback((fields) => {
        dispatch(setAddLoading(true));

        Promise.all(socialMediaLinks.map(async (singleObjOfSocialMediaLinks, SoMeindex) => {
            let menuConfigObj = {
                id: singleObjOfSocialMediaLinks.id,
                store_id: storeId,
                config_name: singleObjOfSocialMediaLinks.config_Name,
                config_value: fields[singleObjOfSocialMediaLinks.config_Name],
                status: "Y",
            };

            return CMSConfiguration.updateConfiguration(menuConfigObj).then((response) => {
                if (response.data.success) {
                    UpdateJsonDetails(dispatch,UpdateMessage.storeConfiguration.message)
                    }
                    dispatch(setAddLoading(false));
                return response
            })
        })
        ).then((result) => {
            getConfiguration()
            dispatch(setAlertMessage({ view: true, type: "success", message: ValidationMsgs.store.socialMediaLink.linkUpdated }));
            dispatch(setAddLoading(false));
        }).catch(() => {
            dispatch(setAlertMessage({ view: true, type: "danger", message: ValidationMsgs.store.socialMediaLink.linkNotupdated }));
            dispatch(setAddLoading(false));
        });
    }, []);

    useEffect(() => {
        getConfiguration()
    }, [])

    return (
        <>
            <Formik
                enableReinitialize={true}
                innerRef={formRef}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={HandleSubmit}
                validateOnChange={true}
            >
                {({ values, setFieldValue, errors }) => {
                    return (
                        <FormikForm>
                            <div className="p-6 sm:px-6 lg:px-8 w-full">
                                <div className="overflow-x-auto max-h-screen">
                                    <div className="flex-wrap items-center whitespace-nowrap">
                                        <Fragment>
                                            <div className="m-1.5 ml-0 flex items-center">
                                                <div className="w-1/6 ml-2 ">
                                                    <label className=" text-sm lg:opacity-0 lg:sidebar-expanded:opacity-100 duration-200 font-semibold">{`Facebook Link`}</label>
                                                </div>
                                                <div className="w-full">
                                                    <Textarea defaultValue={values.facebook_link} name={'facebook_link'} type="text" placeholder="" maxLength="160" className="text-gray-700 border-gray-200 rounded focus:outline-none focus:bg-white" rows={1} />
                                                </div>
                                            </div>
                                            <div className="m-1.5 ml-0 flex items-center">
                                                <div className="w-1/6 ml-2 ">
                                                    <label className=" text-sm lg:opacity-0 lg:sidebar-expanded:opacity-100 duration-200 font-semibold">{`Twitter Link`}</label>
                                                </div>
                                                <div className="w-full">
                                                    <Textarea defaultValue={values.twitter_link} name={'twitter_link'} type="text" placeholder="" maxLength="160" className="text-gray-700 border-gray-200 rounded focus:outline-none focus:bg-white" rows={1} />
                                                </div>
                                            </div>
                                            <div className="m-1.5 ml-0 flex items-center">
                                                <div className="w-1/6 ml-2 ">
                                                    <label className=" text-sm lg:opacity-0 lg:sidebar-expanded:opacity-100 duration-200 font-semibold">{`Pinterest Link`}</label>
                                                </div>
                                                <div className="w-full">
                                                    <Textarea defaultValue={values.pinterest_link} name={'pinterest_link'} type="text" placeholder="" maxLength="160" className="text-gray-700 border-gray-200 rounded focus:outline-none focus:bg-white" rows={1} />
                                                </div>
                                            </div>
                                            <div className="m-1.5 ml-0 flex items-center">
                                                <div className="w-1/6 ml-2 ">
                                                    <label className=" text-sm lg:opacity-0 lg:sidebar-expanded:opacity-100 duration-200 font-semibold">{`Instagram Link`}</label>
                                                </div>
                                                <div className="w-full">
                                                    <Textarea defaultValue={values.instagram_link} name={'instagram_link'} type="text" placeholder="" maxLength="160" className="text-gray-700 border-gray-200 rounded focus:outline-none focus:bg-white" rows={1} />
                                                </div>
                                            </div>
                                            <div className="m-1.5 ml-0 flex items-center">
                                                <div className="w-1/6 ml-2 ">
                                                    <label className=" text-sm lg:opacity-0 lg:sidebar-expanded:opacity-100 duration-200 font-semibold">{`Linkedin Link`}</label>
                                                </div>
                                                <div className="w-full">
                                                    <Textarea defaultValue={values.linkedin_link} name={'linkedin_link'} type="text" placeholder="" maxLength="160" className="text-gray-700 border-gray-200 rounded focus:outline-none focus:bg-white" rows={1} />
                                                </div>
                                            </div>
                                            <div className="m-1.5 ml-0 flex items-center">
                                                <div className="w-1/6 ml-2 ">
                                                    <label className=" text-sm lg:opacity-0 lg:sidebar-expanded:opacity-100 duration-200 font-semibold">{`Youtube Link`}</label>
                                                </div>
                                                <div className="w-full">
                                                    <Textarea defaultValue={values.youtube_link} name={'youtube_link'} type="text" placeholder="" maxLength="160" className="text-gray-700 border-gray-200 rounded focus:outline-none focus:bg-white" rows={1} />
                                                </div>
                                            </div>

                                        </Fragment>
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
export default SocialMediaLinks;
