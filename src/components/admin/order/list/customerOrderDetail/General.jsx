/*Component Name: General
Component Functional Details: User can create or update General master details from here.
Created By: Happy
Created Date: 11/10/22
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import { useState, useMemo, useEffect } from 'react';
import { useDispatch } from "react-redux";

import { ValidationMsgs } from "global/ValidationMessages";
import { OrderCustomerTabs } from 'global/Enum';

import StoreCustomerService from "services/front/StoreCustomerService";

import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";

import EditCustomLogoComp from "components/common/others/admin/CustomerCompany/customLogo/EditCustomLogo"
import Messages from "components/common/alerts/messages/Index";
import Tabs from 'components/common/Tabs';

import PersonalInformation from './PersonalInformation';
import PaymentOption from './PaymentOption';
import CustomerLogo from './CustomerLogo';
import CompanyInfo from './CompanyInfo';
import Order from './Order';

const General = ({ setCustomerOrderModal, CustomerOrderModal, orderDetails, from, customerId, setOpenBasicModal, customerData }) => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState(CustomerOrderModal.currenttab);

    const [CustomLogoId, setCustomLogoId] = useState(0)
    const [AllCustomLogoIData, setAllCustomLogoIData] = useState(0)

    const onTabClick = (e, index) => {
        e.preventDefault();
        setActiveTab(index);
    };

    const componentsForm = {
        CompanyInfo: CompanyInfo,
        PersonalInformation: PersonalInformation,
        PaymentOption: PaymentOption,
        Order: Order,
        CustomerLogo: CustomerLogo,
    };
    const displayTabs = useMemo(() => {
        return (from && CustomerOrderModal.fromWhereItIsClicked !== "userName") ? OrderCustomerTabs.filter((element) => element.componentname === "CustomerLogo") : OrderCustomerTabs
    }, [OrderCustomerTabs]);

    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!CustomerOrderModal || keyCode !== 27) return;
            setCustomerOrderModal({
                state: false,
                fromWhereItIsClicked: "",
                currenttab: 0
            });
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });

    const handleUserInfoFromNav = (email, setterOne, setterTwo) => {
        if (email) {
            dispatch(setAddLoading(true));
            StoreCustomerService.getCustomerNavDataFromNav(email).then((response) => {
                if (response.data.data) {
                    const { navCustomerId, navFirstname, navLastname, navAddress1, navAddress_2, navCity, navContact, navPostCode, navCountryRegionCode, navShiptoCode, navEmail } = response.data.data

                        (typeof setterOne === "function") && setterOne((prevData) => ({
                            ...prevData,
                            firstname: navFirstname,
                            lastName: navLastname,
                            navCustomerId: navCustomerId
                        }));
                    (typeof setterTwo === "function") && setterTwo((prevData) => ({
                        ...prevData,
                        billing: {
                            // ...prevData.billing,
                            firstName: navFirstname,
                            lastName: navLastname,
                            name: `${navFirstname} ${navLastname}`,
                            email: navEmail,
                            address1: navAddress1,
                            address2: navAddress_2,
                            city: navCity,
                            zipCode: navPostCode,
                            phone: navContact,
                            countryCode: navCountryRegionCode,
                            stateCode: navShiptoCode,
                        }
                    }))
                }
                dispatch(setAddLoading(false));
            }).catch(() => {
                dispatch(setAddLoading(false));
            })
        } else {
            dispatch(setAlertMessage({ message: ValidationMsgs.common.emailRequired, type: 'danger' }));
        }
    }

    return (
        <>
            <div className="fixed inset-0 bg-slate-900 bg-opacity-30 z-30 transition-opacity"
                onClick={() => setCustomerOrderModal({
                    state: false,
                    fromWhereItIsClicked: "",
                    currenttab: 0
                })}
            />
            <div className="fixed inset-0 z-30 overflow-hidden flex items-center my-4 justify-center transform px-4 sm:px-6 " >
                <div className="relative bg-white rounded shadow-lg overflow-auto max-w-[72vw] w-full max-h-full z-30" >
                    <div className="flex justify-between items-start p-5 rounded-t border-b sticky top-0 left-0 bg-white z-40">
                        <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl"> Orders: #{orderDetails?.orderNumber} </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="customerModal"
                            onClick={() => setCustomerOrderModal({
                                state: false,
                                fromWhereItIsClicked: "",
                                currenttab: 0
                            })}>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path className="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                            </svg>
                        </button>
                    </div>

                    <div className="col-span-full xl:col-span-9">

                        {
                            CustomLogoId ?
                                <div className='pt-6'>
                                    <EditCustomLogoComp setEditCustomLogo={setCustomLogoId} CustomLogoId={CustomLogoId} Data={AllCustomLogoIData} customerInfo={customerData} customerId={customerId} />
                                </div> : <div className="w-full bg-white rounded-md mb-6">
                                    <div className='sticky top-[68px] bg-white z-10'>
                                        <Tabs
                                            options={displayTabs}
                                            activeTab={activeTab}
                                            setActiveTab={setActiveTab}
                                            onTabClick={onTabClick}
                                        />
                                    </div>
                                    <Messages />
                                    <div className="w-full">
                                        <>

                                            {displayTabs.map((tab, index) => {
                                                const Component = componentsForm[tab.componentname];
                                                return (
                                                    <div
                                                        className={`${activeTab !== (CustomerOrderModal.fromWhereItIsClicked !== "userName" ? (index + 1) : index) && "hidden"
                                                            } w-full rounded-md mb-8 tab-content text-sm`}
                                                        key={index}
                                                    >
                                                        <Component
                                                            activeTab={activeTab}
                                                            index={index}
                                                            setActiveTab={setActiveTab}
                                                            setCustomerOrderModal={setCustomerOrderModal}
                                                            CustomerOrderModal={CustomerOrderModal}
                                                            orderDetails={orderDetails}
                                                            customerData={customerData}
                                                            CustomLogoId={CustomLogoId}
                                                            setCustomLogoId={setCustomLogoId}
                                                            setAllCustomLogoIData={setAllCustomLogoIData}
                                                            setOpenBasicModal={setOpenBasicModal}
                                                            handleUserInfoFromNav={handleUserInfoFromNav}
                                                            {...tab}
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </>
                                    </div>
                                </div>
                        }
                    </div>
                </div >
            </div>
        </>
    );
};

export default General;
