/*Component Name: Top5Products
Component Functional Details: User can create or update Top5Products master details from here.
Created By: Shrey Patel
Created Date: Currunt Date
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import CircleChart from "components/admin/reports/reports/Chart/CircleChart";
import { CurrencySymbolByCode, RandomColors, anniesAnnualData } from "global/Enum";
import React, { useCallback, useEffect, useState } from "react";
import DashBoardServices from "services/admin/order/DashBoardServices";
import { Tooltip } from "recharts";
import { useSelector } from "react-redux";

const Top5Products = ({
  DropDownData,
  DataFromDate,
  showInMainDashboard = false,
  extraDropDownData,
  extraDataFromDate,
  store,
}) => {
  const reduxData = useSelector((store) => store);
  const [Top5OrderedProducts, setTop5OrderedProducts] = useState([]);

  const getTop5OrderedProduct = useCallback(() => {
    DashBoardServices.getTop5OrderedProduct({
      filter: showInMainDashboard === true ? extraDropDownData : DropDownData,
      storeid: [anniesAnnualData.storeId],
      userId: reduxData?.user?.id,
      companyConfigurationId: reduxData?.CompanyConfiguration?.id,
      startDate: null,
      endDate: null
    }).then((response) => {
      if (response?.data?.success && response?.data?.data) {
        const getTop5OrderedProduct = response.data.data.map(
          (order, index) => {
            order["color"] = RandomColors[index];
            order["name"] = order.productName;
            order["value"] = Number(order.totalOrderCount);
            return order;
          }
        );
        setTop5OrderedProducts(getTop5OrderedProduct);
      }
    });
  }, [DropDownData, extraDropDownData]);

  useEffect(() => {
    getTop5OrderedProduct();
  }, [getTop5OrderedProduct]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-white border rounded-md mt-2 mb-2">
          <div className="flex">
            <p className="text-indigo-400 ml-2">{`Product Name : `}</p>
            <p className="text-black ml-1 mr-2">{` ${payload[0].payload.productName}`}</p>
          </div>
          <div className="flex">
            <p className="text-indigo-400 ml-2">{`Store Name : `}</p>
            <p className="text-black ml-1 mr-2">{` ${payload[0].payload.storeName}`}</p>
          </div>
          <div className="flex">
            <p className="text-indigo-400 ml-2">{`Store Type : `}</p>
            <p className="text-black ml-1 mr-2">{` ${payload[0].payload.storeType}`}</p>
          </div>
          <div className="flex">
            <p className="text-indigo-400 ml-2">{`Total Orders : `}</p>
            <p className="text-black ml-1 mr-2">{` ${payload[0].payload.totalOrderCount}`}</p>
          </div>
          <div className="flex">
            <p className="text-indigo-400 ml-2">{`Revenue : `}</p>
            <p className="text-black ml-1 mr-2">{` ${CurrencySymbolByCode.USD
              } ${payload[0].payload.revenue.toFixed(2)}`}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <CircleChart
        title={"Top 5 Ordered Products"}
        data={Top5OrderedProducts}
        label={true}
        SubDataClassName={"text-sm text-orange-600"}
        DataFromDate={
          showInMainDashboard === true ? extraDataFromDate : DataFromDate
        }
        StoreNameLabel={false}
        StoreName={store?.label}
      >
        <Tooltip cursor={{ fill: "transparent" }} content={<CustomTooltip />} />
      </CircleChart>
    </>
  );
};

export default Top5Products;
