/*Component Name: TotalSales
Component Functional Details: User can create or update TotalSales master details from here.
Created By: Shrey Patel
Created Date: Currunt Date
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import React, { useCallback, useState, useEffect } from "react";
import BarCharts from "../../reports/reports/Chart/BarCharts";
import { Bar, YAxis, Tooltip } from "recharts";
import { CurrencySymbolByCode, DurationFilter } from "global/Enum";
import DashBoardServices from "services/admin/order/DashBoardServices";
const TotalSales = ({ DropDownData, DataFromDate, showInMainDashboard = false, extraDropDownData, extraDataFromDate }) => {
  const [AllTimeNumberOfOrders, setAllTimeNumberOfOrders] = useState([]);
  // const [DateMonthYear, setDateMonthYear] = useState({
  //   label: "",
  //   value: "",
  // });

  // useEffect(() => {
  //   setDateMonthYear(DurationFilter[0]);
  // }, [DurationFilter]);

  const getAllTimeNumberOfOrdersReport = useCallback(() => {
    DashBoardServices.getOrderTotalSales({
      filter: showInMainDashboard === true ? extraDropDownData : DropDownData,
    }).then((res) => { 
      if (res?.data?.data?.length > 0) {
        const updatedAllTimeNumberOfOrdersArray = res?.data?.data?.map((orders) => {
          orders["name"] = orders.name;
          orders["value"] = Number(orders.totalRevenue);
          delete orders["label"];
          return orders;
        });
        setAllTimeNumberOfOrders(updatedAllTimeNumberOfOrdersArray);
      }
    });
  }, [DropDownData, extraDropDownData]);

  useEffect(() => {
    getAllTimeNumberOfOrdersReport();
  }, [getAllTimeNumberOfOrdersReport]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <>
          {/* <div className="custom-tooltip min-w-[40px]">
                        <p className="label bg-white rounded border border-y-stone-700">{`${CurrencySymbolByCode.USD} ${payload[0].value.toFixed(2)}`}</p>
                    </div> */}
          <div className="custom-tooltip bg-white border rounded-md mt-2 mb-2">
            <p className="text-black">{`${payload[0].payload.name}`}</p>
            <div className="flex">
              <p className="text-indigo-400 ml-2">{`Total Revenue : `}</p>
              <p className="text-black ml-1 mr-2">{` ${CurrencySymbolByCode.USD
                }${payload[0].payload.value.toFixed(2)}`}</p>
            </div>
            <div className="flex">
              <p className="text-indigo-400 ml-2">{`Total Orders : `}</p>
              <p className="text-black ml-1 mr-2">{` ${payload[0].payload.totalOrderCount}`}</p>
            </div>
          </div>
        </>
      );
    }
    return null;
  };

  return (
    <>
      {/* <div className="w-full md:w-1/2 xl:w-1/3 px-3 pt-6 flex"> */}
      <BarCharts
        title={"Total Sales By Revenue"}
        data={AllTimeNumberOfOrders}
        DataFromDate={showInMainDashboard === false ? DataFromDate : extraDataFromDate}
        label={true}
        SubDataClassName={"text-sm text-orange-600"}
      // dropdownShow={true}
      // dropdownOptions={DurationFilter}
      // defaultValue={DateMonthYear?.value}
      // setStore={setDateMonthYear}
      >
        <Bar dataKey="value" fill="#86EFAC" barSize={40} />
        <YAxis
          // label={{
          //   value: "Total Revenue",
          //   angle: -90,
          //   position: "insideLeft",
          // }}
          tickFormatter={(value) => {
            let val = value;
            return `${CurrencySymbolByCode.USD}${new Intl.NumberFormat(
              "en"
            ).format(val.toFixed(2))}`;
          }}
        />
        <Tooltip
          cursor={{ fill: "transparent" }}
          content={<CustomTooltip />}
        />
      </BarCharts>
      {/* </div> */}
    </>
  );
};

export default TotalSales;
