
/*Component Name: OrderHistoryView.jsx
Component Functional Details: Basic Information tab field display
Created By: Vikas Patel
Created Date: 11-May-2022
Modified By: Viks Patel
Modified Date: June/02/2022 */

import React from 'react';
import { scrollTop } from 'services/common/helper/Helper';
import OrderHistory from '../forms/OrderHistory';


const OrderHistoryView = ({ values, tab, setActiveTab, index, productId }) => {

  return (
    <>
      <div className="px-6 py-12 border-b-4 border-neutral-200 last:border-b-0">
        <div className='flex items-center justify-between'>
          <div className='block uppercase tracking-wide text-gray-500 text-base font-bold mb-2'>
            {tab.label}
          </div>
          <div >
            <span className="text-indigo-500 cursor-pointer" onClick={() => { setActiveTab(index); scrollTop(); }}>Edit</span>
          </div>
        </div>
        <OrderHistory values={values} productId={productId} />
      </div>
    </>
  );
};

export default OrderHistoryView;
