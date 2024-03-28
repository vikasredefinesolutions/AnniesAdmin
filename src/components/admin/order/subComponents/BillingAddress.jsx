/*Component Name: BillingAddress
Component Functional Details: User can create or update BillingAddress master details from here.
Created By: chandan
Created Date: <Creation Date>
Modified By: chandan
Modified Date: <Modified Date> */

import React from 'react';
import AddressModal from "./AddressModel"

const BillingAddress = ({ orderDetail, getOrderDetails, setDisplayMessage }) => {
    return (
        <>
            <div className="w-full justify-between bg-white rounded-md shadow-lg">
                <div className="w-full flex mb-4 last:mb-0 border-b border-neatural-200">
                    <div className="w-1/2 text-left pl-3"><div className="text-md font-bold text-gray-500 text-left px-2 leading-10">Billing Address</div></div>
                    <AddressModal title={'Billing Address'} address={orderDetail?.billingAddress} type="b" getOrderDetails={getOrderDetails} orderDetail={orderDetail} setDisplayMessage={setDisplayMessage} />
                </div>
                <div className="w-full flex px-3 mb-4 last:mb-0">
                    <div className="w-2/2 text-left">
                        <div className="text-md font-medium text-gray-500 text-left px-2 leading-6">
                            {orderDetail?.billingAddress?.name}{orderDetail?.billingAddress?.name ? <><br /></> : ""}
                            {orderDetail?.billingAddress?.email} {orderDetail?.billingAddress?.email ? <><br /></> : ""}
                            {orderDetail?.billingAddress?.company ? <><span className='font-bold'>Company :</span> {orderDetail?.billingAddress?.company}<br /></> : ''}
                            {orderDetail?.billingAddress?.address1 !== " " && orderDetail?.billingAddress?.address1 !== "" && orderDetail?.billingAddress?.address1 !== undefined ? <>{orderDetail?.billingAddress?.address1 + ","}<br /></> : ""}
                            {orderDetail?.billingAddress?.address2 !== " " && orderDetail?.billingAddress?.address2 !== "" && orderDetail?.billingAddress?.address2 !== undefined ? <>{orderDetail?.billingAddress?.address2 + ","}<br /></> : ""}
                            {orderDetail?.billingAddress?.city ? orderDetail?.billingAddress?.city + "," : ""}
                            {orderDetail?.billingAddress?.state ? orderDetail?.billingAddress?.state + "," : ""}
                            {orderDetail?.billingAddress?.zipCode ? <>{orderDetail?.billingAddress?.zipCode + ","}<br /></> : ""}
                            {orderDetail?.billingAddress?.country ? <>{orderDetail?.billingAddress?.country + ","}<br /></> : ""}
                            {orderDetail?.billingAddress?.phone}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BillingAddress;
