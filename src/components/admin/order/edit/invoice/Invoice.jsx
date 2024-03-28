/*Component Name: Invoice
Component Functional Details:  Invoice .
Created By: PK Kher
Created Date: <Creation Date>
Modified By: PK Kher
Modified Date: <Modified Date> */

import React from "react";
import { NavLink } from "react-router-dom";
import Prices from "./Prices";

const Invoice = ({ orderDetail, StoreData }) => {
  return (
    <>
      <div className="w-full bg-white shadow-lg rounded-md px-2 py-2 mb-6">
        <div>
          <Prices orderDetail={orderDetail} StoreData={StoreData} />
        </div>
        <div className="flex overflow-x-auto max-h-screen py-2">
          <div className="w-full justify-between px-3">
            <div className="w-full flex mb-2 last:mb-0">
              <div className="w-full text-right px-2 py-1">
                <NavLink
                  to={`/admin/Order/orders/receipt/${orderDetail?.orderNumber}`}
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-2 first:ml-0"
                >
                  Print Invoice
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoice;
