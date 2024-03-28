/*Component Name: StoreTypeTotalOrders
Component Functional Details: User can create or update StoreTypeTotalOrders master details from here.
Created By: Shrey Patel
Created Date: Currunt Date
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import React, { useCallback, useEffect, useState } from "react";
import CircleChart from "components/admin/reports/reports/Chart/CircleChart";
import { RandomColors } from "global/Enum";
import DashBoardServices from "services/admin/order/DashBoardServices";
import { Tooltip } from "recharts";

const StoreTypeTotalOrders = ({
  DropDownData,
  DataFromDate,
  showInMainDashboard = false,
  extraDropDownData,
  extraDataFromDate
}) => {
  const [OrderSyncData, setOrderSyncData] = useState([]);
  const [total, setTotal] = useState("");
  // const [DateMonthYear, setDateMonthYear] = useState({
  //   label: "",
  //   value: "",
  // });

  // useEffect(() => {
  //   setDateMonthYear(DurationFilter[0]);
  // }, [DurationFilter]);

  const getOrderSyncDetails = useCallback(() => {
    DashBoardServices.getOrderCountByStore({
      filter: showInMainDashboard === true ? extraDropDownData : DropDownData,
    }).then((response) => {
      if (response?.data?.success && response?.data?.data) {
        let data = response?.data?.data;
        setTotal(data?.totalOrderCount);
        const getOrderSyncDetails = data?.dashboardChartOrderCountViewModel.map(
          (order, index) => {
            order["color"] = RandomColors[index];
            order["name"] = order.name;
            order["value"] = Number(order.count);
            return order;
          }
        );
        setOrderSyncData(getOrderSyncDetails);
      }
    });
  }, [DropDownData, extraDropDownData]);

  useEffect(() => {
    getOrderSyncDetails();
  }, [getOrderSyncDetails]);

  return (
    <>
      <CircleChart
        title={"Store Type Total Order"}
        data={OrderSyncData}
        label={true}
        SubDataClassName={"text-sm text-orange-600"}
        lableValue={total}
        labelText={"Total Order"}
        DataFromDate={showInMainDashboard === true ? extraDataFromDate : DataFromDate}
      // dropdownShow={false}
      // dropdownOptions={DurationFilter}
      // defaultValue={DateMonthYear?.value}
      // setStore={setDateMonthYear}
      >
        <Tooltip />
      </CircleChart>
    </>
  );
};

export default StoreTypeTotalOrders;
