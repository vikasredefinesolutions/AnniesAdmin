import React from "react";
import { NavLink } from "react-router-dom";

const ReportTiles = () => {
  return (
    <>
      <div className="col-span-12 md:col-span-6 xl:col-span-3 flex">
        <div className="w-full bg-white shadow-lg rounded-md">
          <div className="font-semibold text-base lg:text-xl text-gray-700 px-5 py-4 border-b-2 border-neutral-200">
            Product
          </div>
          <div className="p-5">
            <ul>
              <li>
                <NavLink className="text-indigo-500" to={"ProductSummary"}>
                  Product Summary
                </NavLink>
              </li>

              <li>
                <NavLink
                  className="text-indigo-500"
                  to={"Top100SellingProducts"}
                >
                  Top 10 selling products
                </NavLink>
              </li>
              <li>
                <NavLink className="text-indigo-500" to={"LowInventory"}>
                  Low inventory
                </NavLink>
              </li>
              <li>
                <NavLink className="text-indigo-500" to={"WeeklyReport"}>
                  Weekly Report
                </NavLink>
              </li>
              <li>
                <NavLink className="text-indigo-500" to={"dailySalesReport"}>
                  Daily Sales Report
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-6 xl:col-span-3 flex">
        <div className="w-full bg-white shadow-lg rounded-md">
          <div className="font-semibold text-base lg:text-xl text-gray-700 px-5 py-4 border-b-2 border-neutral-200">
            Order
          </div>
          <div className="p-5">
            <ul>
              <li>
                <NavLink
                  className="text-indigo-500"
                  to={"OrderBeneficialReport"}
                >
                  Order beneficial report
                </NavLink>
              </li>
              <li>
                <NavLink className="text-indigo-500" to={"OrderStateTaxReport"}>
                  Order state tax report
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="text-indigo-500"
                  to={"OrderNumberSaleTtaxReport"}
                >
                  Order number sales tax report
                </NavLink>
              </li>
              <li>
                <NavLink className="text-indigo-500" to={"OrderStatistics"}>
                  Order statistics
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-6 xl:col-span-3 flex">
        <div className="w-full bg-white shadow-lg rounded-md">
          <div className="font-semibold text-base lg:text-xl text-gray-700 px-5 py-4 border-b-2 border-neutral-200">
            Business Accounting Reports
          </div>
          <div className="p-5">
            <ul>
              <li>
                <NavLink className="text-indigo-500" to={"RevenueSummary"}>
                  Revenue Summary
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  className="text-indigo-500"
                  to={"BusinessIntelligence"}
                >
                  Business Intelligence
                </NavLink>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-6 xl:col-span-3 flex">
        <div className="w-full bg-white shadow-lg rounded-md">
          <div className="font-semibold text-base lg:text-xl text-gray-700 px-5 py-4 border-b-2 border-neutral-200">
            Custom
          </div>
          <div className="p-5">
            <ul>
              <li>
                <NavLink className="text-indigo-500" to={"MailLog"}>
                  Mail Log
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportTiles;
