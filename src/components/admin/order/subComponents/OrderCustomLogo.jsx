/*Component Name: OrderCustomLogos
Component Functional Details: User can create or update OrderCustomLogos master details from here.
Created By: chandan
Created Date: <Creation Date>
Modified By: chandan
Modified Date: <Modified Date> */

import React from 'react';

const OrderCustomLogos = ({ setCustomerOrderModal }) => {
    return (
        <>
            <div className={`flex justify-end items-center`}>
                <div className="w-full text-right">
                    <div className="text-lg font-bold text-gray-500">Order Custom Logo</div>
                    <div className='text-black'> <span>To Check Order Custom Logo &nbsp;</span>
                        <button className='btn bg-indigo-500 hover:bg-indigo-600 text-white' onClick={() => setCustomerOrderModal({
                            state: true,
                            fromWhereItIsClicked: "orderCustomLogo",
                            currenttab: 1
                        })}>Click Here</button>
                    </div>
                </div>
                {/* <div className="w-1/2 text-left px-3">
                        <div className="text-lg font-bold text-gray-500 text-right px-2 leading-10"><button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">Print</button></div>
                    </div> */}
            </div>
        </>
    );
};

export default OrderCustomLogos;
