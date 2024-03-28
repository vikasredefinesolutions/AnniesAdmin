/*Component Name: ShippingAddress
Component Functional Details: User can create or update ShippingAddress master details from here.
Created By: chandan
Created Date: <Creation Date>
Modified By: chandan
Modified Date: <Modified Date> */

import React from 'react';
import AddressModal from "./AddressModel"

const ShippingAddress = ({ orderDetail, getOrderDetails, setDisplayMessage }) => {
    return (
        <>
            <div className="w-full justify-between bg-white rounded-md shadow-lg">
                <div className="w-full flex mb-4 last:mb-0 border-b border-neatural-200">
                    <div className="w-1/2 text-left pl-3"><div className="text-md font-bold text-gray-500 text-left px-2 leading-10">Shipping Address</div></div>
                    <AddressModal title={'Shipping Address'} address={orderDetail?.shippingAddress} type="s" getOrderDetails={getOrderDetails} orderDetail={orderDetail} setDisplayMessage={setDisplayMessage} />
                </div>
                <div className="w-full flex px-3 mb-4 last:mb-0">
                    <div className="w-2/2 text-left">
                        <div className="text-md font-medium text-gray-500 text-left px-2 leading-6">
                            {orderDetail?.shippingAddress?.name}{orderDetail?.shippingAddress?.name ? <><br /></> : ""}
                            {orderDetail?.shippingAddress?.email ? <>{orderDetail?.shippingAddress?.email}<br /></> : ''}
                            {orderDetail?.shippingAddress?.company ? <><span className='font-bold'>Company :</span> {orderDetail?.shippingAddress?.company}<br /></> : ''}
                            {orderDetail?.shippingAddress?.address1 !== " " && orderDetail?.shippingAddress?.address1 !== "" && orderDetail?.shippingAddress?.address1 !== undefined ? <>{orderDetail?.shippingAddress?.address1 + ","}<br /></> : ""}
                            {orderDetail?.shippingAddress?.address2 !== " " && orderDetail?.shippingAddress?.address2 !== "" && orderDetail?.shippingAddress?.address2 !== undefined ? <>{orderDetail?.shippingAddress?.address2 + ","}<br /></> : ""}
                            {orderDetail?.shippingAddress?.city ? orderDetail?.shippingAddress?.city + "," : ""}
                            {orderDetail?.shippingAddress?.state ? orderDetail?.shippingAddress?.state + "," : ""}
                            {orderDetail?.shippingAddress?.zipCode ? <>{orderDetail?.shippingAddress?.zipCode + ","}<br /></> : ""}
                            {orderDetail?.shippingAddress?.country ? <>{orderDetail?.shippingAddress?.country + ","}<br /></> : ""}
                            {orderDetail?.shippingAddress?.phone}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShippingAddress;
