import React from "react";
import ReportTiles from "./ReportTiles";
import ProductStatusReoprt from "./common/ProductStatusReport";
import ProductReadyScore from "./common/ProductReadyScore";
import OrderReport from "./common/OrderReport";
import CustomerOrderReport from "./common/CustomerOrderReport";
import { TitleNameHelper } from "services/common/helper/Helper";
import { anniesAnnualData } from "global/Enum";

const Reports = () => {
  const store = anniesAnnualData.storeId;

  return (
    <>
      <title>{TitleNameHelper({ defaultTitleName: `Product Report` })}</title>
      <div className="py-4">
        <div className="px-4 sm:px-6 lg:px-8 w-full items-center flex justify-between sticky top-0 z-20 py-2 bg-slate-100">
          <div className="col-span-full w-full flex flex-wrap justify-between items-center">
            <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
              {TitleNameHelper({ defaultTitleName: `Product Report` })}
            </h1>
          </div>
        </div>
        {/* Circle Chart AND Bar Chart */}
        <div className="px-4 sm:px-6 lg:px-8 w-full pt-7">
          <div className="grid grid-cols-12 gap-6 mb-6">
            <div className="col-span-full lg:col-span-5 xl:col-span-4 flex">
              <ProductStatusReoprt store={store} />
            </div>
            <div className="col-span-full lg:col-span-5 xl:col-span-4 flex">
              <OrderReport store={store} />
            </div>
            <div className="col-span-full lg:col-span-5 xl:col-span-4 flex">
              <CustomerOrderReport store={store} />
            </div>
            <div className="col-span-full lg:col-span-5 xl:col-span-12 flex">
              <ProductReadyScore store={store} />
            </div>
          </div>

          {/* Tiles */}
          <div className="grid grid-cols-12 gap-6">
            <ReportTiles />
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;
