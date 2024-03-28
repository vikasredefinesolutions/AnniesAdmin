/*Component Name: Edit
Component Functional Details: User can create or update Edit master details from here.
Created By: Happy
Created Date: <Creation Date>
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import Tabs from 'components/common/Tabs';
import { customerEditTabs } from 'global/Enum';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { NavLink, useParams, useNavigate, useSearchParams } from 'react-router-dom';
import CustomerService from 'services/admin/customer/CustomerService';
import Actions from './Actions';
import Emails from './Emails';
import LifeCycle from './LifeCycle';
import Notes from './Notes';
import Orders from './Orders';
import CreditInfo from './CreditInfo';
import PersonalDetails from './personalDetails/PersonalDetails';
import Products from './product/Products';
import SideBar from './sidebar/SideBar';
import AbandonedShoppingCart from "./AbandonedShoppingCartList";
import Messages from "components/common/alerts/messages/Index";
import { setAlertMessage } from 'redux/alertMessage/AlertMessageReducers';
import EditModal from './personalDetails/EditModal';
import { ValidationMsgs } from "global/ValidationMessages";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { TitleNameHelper } from "services/common/helper/Helper";

import { serverError } from 'services/common/helper/Helper';
import { useSelector, useDispatch } from 'react-redux';
import { fillSerchQuery } from "redux/searchQueryForMGS/SearchQueryAction";
import { addActiveTab } from "redux/searchQueryForMGS/SearchQueryAction"
import StoreService from 'services/admin/store/StoreService';
import BiometricALAnalysis from './BiometricALAnalysis';

const Edit = ({ OrderStatusList }) => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { id } = useParams();

    const searchQuery = useSelector((store) => store?.SearchQueryReducers?.searchQuery);
    const { toFill, currentTab } = useSelector((store) => store?.SearchQueryReducers);
    const location = useSelector((store) => store.location);
    const [StoreData, setStoreData] = useState({});
    const [CustomerTabData] = useState(customerEditTabs);
    const [activeTab, setActiveTab] = useState(toFill ? currentTab : 0);
    const [data, setData] = useState({});
    const [showEdit, setShowEdit] = useState(false);

    const onTabClick = (e, index) => {
        e.preventDefault();
        setActiveTab(index);
        dispatch(addActiveTab(index));
    };

    const components = {
        PersonalDetails: PersonalDetails,
        Actions: Actions,
        Emails: Emails,
        // PaymentOption: PaymentOption,
        Orders: Orders,
        Products: Products,
        Notes: Notes,
        // CustomLogo: CustomLogo,
        CreditInfo: CreditInfo,
        AbandonedShoppingCart: AbandonedShoppingCart,
        // ConsultationRequest: ConsultationRequest,
        LifeCycle: LifeCycle,
        BiometricALAnalysis: BiometricALAnalysis,
    };

    const getCustomerData = useCallback(() => {
        dispatch(setAddLoading(true))
        CustomerService.getCustomerById(id).then((response) => {
            if (response.data.data) {
                setData(response.data.data);
            } else {
                dispatch(
                    setAlertMessage({
                        message: ValidationMsgs.customer.customerNotFound,
                        type: "danger",
                    })
                );
                return navigate("/admin/Customer/customer");
            }
            dispatch(setAddLoading(false))
        }).catch((error) => {
            dispatch(setAddLoading(false))
        })
    }, [id]);

    const onSubmit = (values) => {
        dispatch(setAddLoading(true))
        CustomerService.updateCustomer({ customerModel: { ...values, recStatus: (values?.recStatus ? 'A' : 'I'), ...location } }).then((response) => {
            if (response.data.success && response.data.data) {
                dispatch(
                    setAlertMessage({
                        type: "success",
                        message: ValidationMsgs.customer.personalDetailUpdate,
                    })
                );
                getCustomerData();
            } else {
                dispatch(
                    setAlertMessage({ type: "danger", message: serverError(response) })
                );
            }
            dispatch(setAddLoading(false))
        }).catch((errors) => {
            dispatch(
                setAlertMessage({ type: "danger", message: ValidationMsgs.customer.personalDetailNotUpdate })
            );
            dispatch(setAddLoading(false))

        });
        setShowEdit(false);
    }

    useEffect(() => {
        setActiveTab(() => {
            let tab = parseInt(searchParams.get('tab'));
            return (!isNaN(tab)) ? tab : 0;
        });
    }, []);

    useEffect(() => {
        getCustomerData();
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
                }).catch((err) => {
                    dispatch(setAddLoading(false))
                });
        }
    }, [data])

    return (
        <>
            <title>Edit {TitleNameHelper({ defaultTitleName: "Customer" })} {(data.firstname ? "| " + data.firstname + " " + data.lastName : "")}</title>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto pb-0">
                {/* Page header */}
                <div className="flex mb-8 justify-between">
                    <div className="flex items-center">
                        <div onClick={() => {
                            searchQuery && dispatch(fillSerchQuery(true))
                        }}>
                            <NavLink
                                to={'/admin/Customer/customer'}
                                className="btn border-neutral-200 hover:border-neutral-400 text-gray-500 hover:text-gray-700 flex items-center mr-2"
                            >
                                <span className="material-icons-outlined">west</span>
                            </NavLink>
                        </div>
                        <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
                            {TitleNameHelper({ defaultTitleName: "Customer" })} ({data.firstname ? data.firstname + " " + data.lastName : "Edit"})
                        </h1>
                    </div>
                </div>
                <Messages />
                {/* Form Part */}
                <div className="grid grid-cols-12 gap-6">
                    {/* Information Part */}
                    <div className="col-span-full xl:col-span-9 relative">
                        <div className="w-full bg-white shadow-xxl rounded-md mb-8 pt-8">
                            <Tabs
                                options={CustomerTabData}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                                onTabClick={onTabClick}
                                cClassName={`flex justify-center items-center`}
                            />
                            {CustomerTabData.map((value, index) => {
                                let Component = components[value.componentname];
                                if (activeTab === value.id) {
                                    return (
                                        <div key={index} className="px-5">
                                            <Component
                                                customerInfo={data}
                                                getCustomerData={getCustomerData}
                                                setShowEdit={setShowEdit}
                                                onSubmit={onSubmit}
                                                StoreData={StoreData}
                                                OrderStatusList={OrderStatusList}
                                                isEditCustomerShow={true}
                                                storeIdFromCustomerEdit={data?.storeId}
                                            />
                                        </div>
                                    );
                                }
                            })
                            }
                        </div >
                    </div >
                    <SideBar customerInfo={data} getCustomerData={getCustomerData} setShowEdit={setShowEdit} StoreData={StoreData} />
                </div >
            </div >
            {showEdit &&
                <EditModal showEdit={showEdit} setShowEdit={setShowEdit} customerInfo={data} getCustomerData={getCustomerData} onSubmit={onSubmit} StoreData={StoreData} />
            }
        </>
    );
};

export default Edit;
