/*Component Name: General
Component Functional Details: User can create or update General master details from here.
Created By: chandan
Created Date: <Creation Date>
Modified By: chandan
Modified Date: 02/11/2022 */

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import BasicModal from "components/common/modals/Basic";
import Tabs from "components/common/Tabs";
import Messages from "components/common/alerts/messages/Index";
import { ValidationMsgs } from "global/ValidationMessages";
import Footer from "./Footer";
import CustomCss from "./CustomCss";
import CustomScript from "./CustomScript";
import SocialMediaLinks from "./SocialMediaLinks";
import ContactInfo from "./ContactInfo";
import { StoreMastertab } from "global/Enum"
import GoogleTags from "./GoogleTags";
import StoreEditHeader from "components/admin/content/page/edit/StoreEditHeader";
import StoreServiceCls from "services/admin/store/StoreService";

const General = () => {
    const { storeId } = useParams();

    const permission = useSelector(store => store.permission);
    const GlobalLoading = useSelector((store) => store?.GlobalLoaderReducer?.toLoad);
    const [store, setStore] = useState({});
    const [ModalInfo, setModalInfo] = useState({});
    const [openBasicModal, setOpenBasicModal] = useState(false);
    const [FormSubmit, setFormSubmit] = useState(null);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0);
    const [isError, setIsError] = useState(false);
    const [data] = useState({});
    const [values] = useState({});
    const [SelectedPages, setSelectedPages] = useState([])
    const [displayTabs, setDisplayTabs] = useState(StoreMastertab)

    useEffect(() => {
        setDisplayTabs(StoreMastertab)
    }, [setActiveTab, activeTab, SelectedPages])

    const onTabClick = (e, index) => {
        e.preventDefault();
        if (!isError) {
            setActiveTab(index);
        } else {
            setModalInfo((prev) => {
                return {
                    ...prev,
                    message: ValidationMsgs.common.tabValidation,
                    module: "Product",
                    title: "Form Error",
                    ButtonName: "Save Changes",
                    displayCancelButton: false,
                };
            });
            setOpenBasicModal((prev) => !prev);
        }
    };

    // useEffect(() => {
        // let getConfigObj = {
        //     store_id: storeId,
        //     config_name: "main_menu",
        // };
        // CMSConfiguration.getConfiguration(getConfigObj).then((response) => {
        //     if (response.data.success) {
        //         setData(response.data.data)
        //         // setDynamicTabs(JSON.parse(response.data.data.config_value))
        //     }
        // })
    // }, [])

    const PreviewPages = {
        Footer: Footer,
        CustomCss: CustomCss,
        CustomScript: CustomScript,
        SocialMediaLinks: SocialMediaLinks,
        ContactInfo: ContactInfo,
        // CustomFooter: CustomFooter,
        GoogleTags: GoogleTags
    }

    const Component = PreviewPages[StoreMastertab[activeTab].componentName];

    useEffect(() => {
        StoreServiceCls.getStoreById(storeId)
            .then((response) => {
                if (response.data.success && response.data.data) {
                    let storeData = response.data.data;
                    setStore(storeData);
                }
            })
            .catch((error) => { });
    }, [storeId]);

    return (
        <>
            <title>Configure General</title>
            <StoreEditHeader activeTab={6} />
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full">
                <div className="flex flex-wrap mb-8 justify-between">
                    <div className="flex items-center">
                        <Link
                            to={-1}
                            className="btn border-neutral-200 hover:border-neutral-400 text-gray-500 hover:text-gray-700 flex items-center mr-2"
                        >
                            <span className="material-icons-outlined">west</span>
                        </Link>

                        <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
                            General
                        </h1>
                    </div>

                    {(FormSubmit && (permission?.isEdit || permission?.isDelete)) && <div className="flex flex-wrap space-x-2">
                        <button type="button" onClick={() => navigate(-1)} className="btn bg-white border-neutral-200 text-gray-500 hover:text-gray-700">
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={GlobalLoading}
                            onClick={() => {
                                FormSubmit.handleSubmit();
                            }}
                            className={`flex justify-center btn px-6 bg-indigo-500 hover:bg-indigo-600 text-white ${(GlobalLoading || values.captcha === '') ? "bg-indigo-200 hover:bg-indigo-200" : "cursor-pointer"}`}
                        >
                            <div className={`w-full flex justify-center align-middle `}>
                                {GlobalLoading && (
                                    <span className="spinner-border spinner-border-sm mr-2"></span>
                                )}
                                Save
                            </div>
                        </button>
                    </div>}

                </div>
                <Messages />
                <div className="bg-white shadow-xxl rounded-md mb-8">
                    <div className="w-full bg-white shadow-xxl rounded-md mb-8 pt-4">
                        <Tabs
                            options={displayTabs}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            onTabClick={onTabClick}
                        />
                        <div className="w-full">
                            <div className={`w-full rounded-md mb-8 tab-content text-sm`}>
                                <Component
                                    data={data}
                                    // index={index}
                                    activeTab={activeTab}
                                    setIsError={setIsError}
                                    displayTabs={displayTabs}
                                    setActiveTab={setActiveTab}
                                    setFormSubmit={setFormSubmit}
                                    SelectedPages={SelectedPages}
                                    setDisplayTabs={setDisplayTabs}
                                    setSelectedPages={setSelectedPages}
                                    store={store}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BasicModal
                openModal={openBasicModal}
                setOpenModal={setOpenBasicModal}
                {...ModalInfo}
            />
        </>
    );
};

export default General;
