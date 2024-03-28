/*Component Name: Edit
Component Functional Details: User can create or update Edit master details from here.
Created By: Happy
Created Date: <Creation Date>
Modified By: Chandan
Modified Date: <Modified Date> */

import React, { useState, useCallback, useEffect } from "react";
import Tabs from "components/common/Tabs";
import { companyEditTabs } from "global/Enum";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import Messages from "components/common/alerts/messages/Index";
import CompanyDetails from "./tabsPages/CompanyDetails";
import Orders from "./tabsPages/Orders";
import Products from "../../company/edit/product/Products";
import Notes from "./tabsPages/Notes";
import CustomLogo from "./tabsPages/CustomLogo";
import Users from "./tabsPages/Users";
import LifeCycle from "./tabsPages/LifeCycle";
import { ValidationMsgs } from "global/ValidationMessages";
import CompanyService from "services/admin/companyInformation/CompanyInformationServices";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { TitleNameHelper } from "services/common/helper/Helper";
import AboundandCart from "./tabsPages/AbandonedShoppingCartList";
import ConsultationRequest from "./tabsPages/ConsultationRequest";
import { fillSerchQuery } from "redux/searchQueryForMGS/SearchQueryAction";
import { addActiveTab } from "redux/searchQueryForMGS/SearchQueryAction"
import StoreService from "services/admin/store/StoreService";

const Edit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const searchQuery = useSelector((store) => store?.SearchQueryReducers?.searchQuery);
    const { toFill, currentTab } = useSelector((store) => store?.SearchQueryReducers);

    const [activeTab, setActiveTab] = useState(toFill ? currentTab : 0);
    const [data, setData] = useState({});
    const [StoreData, setStoreData] = useState({});
    const [CompanyTabData, setCompanyTabData] = useState([]);

    const onTabClick = (e, index) => {
        e.preventDefault();
        setActiveTab(index);
        dispatch(addActiveTab(index));
    };

    const components = {
        Messages: Messages,
        CompanyDetails: CompanyDetails,
        Orders: Orders,
        Products: Products,
        Notes: Notes,
        CustomLogo: CustomLogo,
        Users: Users,
        AbandonedShoppingCart: AboundandCart,
        ConsultationRequest: ConsultationRequest,
        LifeCycle: LifeCycle,
    };

    const getCompanyData = useCallback(() => {
        dispatch(setAddLoading(true));

        CompanyService.getCompanyById(id)
            .then((response) => {
                if (response.data.data) {
                    setData(response.data.data);
                } else {
                    dispatch(
                        setAlertMessage({
                            message: ValidationMsgs.company.companyNotFound,
                            type: "danger",
                        })
                    );
                    return navigate("/admin/Customer/company");
                }
                dispatch(setAddLoading(false));
            })
            .catch((error) => {
                dispatch(setAddLoading(false));
            });
    }, [id]);

    useEffect(() => {
        getCompanyData();
    }, [id]);

    useEffect(() => {
        if (!toFill) {
            setActiveTab(0);
        }
    }, []);

    useEffect(() => {
        if (data?.storeId !== undefined) {
            StoreService.getStoreById(data?.storeId)
                .then((res) => {
                    var response = res.data;
                    if (response.success && response.data) {
                        setStoreData(response?.data);
                    }
                })
                .catch((err) => {
                    dispatch(setAddLoading(false));
                });
        }
    }, [data]);

    useEffect(() => {
        if (!StoreData?.isLogoCustomization) {
            let CustomLogoOBj = companyEditTabs.find((CustomLogoComp) => CustomLogoComp.componentName === "CustomLogo")

            let TabData = companyEditTabs.filter((Company) => Company.componentName !== "CustomLogo").map((myObj, index) => {
                if (CustomLogoOBj.id <= index) {
                    return { ...myObj, id: myObj.id - 1 }
                } else {
                    return myObj
                }
            })
            setCompanyTabData(TabData)
        } else {
            setCompanyTabData(companyEditTabs)
        }
    }, [StoreData])

    return (
        <>
            <title>{TitleNameHelper({ defaultTitleName: "Edit Company" })} </title>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full">
                {/* Page header */}
                <div className="sm:flex sm:justify-between sm:items-center mb-8">
                    <div className="flex items-center text-2xl md:text-3xl text-gray-800 font-bold">
                        <div onClick={() => {
                            searchQuery && dispatch(fillSerchQuery(true))
                        }}>
                            <NavLink
                                to={"/admin/Customer/company"}
                                className="btn border-neutral-200 hover:border-neutral-400 text-gray-500 hover:text-gray-700 flex items-center mr-2"
                            >
                                <span className="material-icons-outlined">west</span>
                            </NavLink>
                        </div>
                        <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
                            {TitleNameHelper({ defaultTitleName: "Edit Company" })}
                        </h1>
                    </div>
                </div>
                <Messages />
                {/* Form Part */}
                <div className="grid grid-cols-12 gap-6">
                    {/* Information Part */}
                    <div className="bg-white shadow-xxl rounded-md pt-6 mb-6 col-span-12">
                        {/* Tabs Row */}
                        <div className="flex flex-nowrap border-b border-gray-200 w-full">
                            <Tabs
                                options={CompanyTabData}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                                onTabClick={onTabClick}
                                pClassName={`flex flex-wrap`}
                                cClassName={`mr-0.5 md:mr-0 md:mb-0.5`}
                            />
                        </div>

                        {CompanyTabData.map((value, index) => {
                            let Component = components[value.componentName];
                            if (activeTab === value.id) {
                                return (
                                    <div key={index} className="px-5">
                                        <Component
                                            CompanyInfo={data}
                                            getCompanyData={getCompanyData}
                                            PageName={value.label}
                                            StoreData={StoreData}
                                        />
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Edit;
