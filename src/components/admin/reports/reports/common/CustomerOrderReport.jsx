import React, { useState, useEffect, useCallback } from "react";
import CircleChart from "../Chart/CircleChart";
import Dashboard from "services/admin/reports/dashboard/dashboardService";
import { RandomColors, anniesAnnualData } from "global/Enum";
import { Tooltip } from "recharts";

const CustomerOrderReport = ({ store }) => {
  const [customerOrderReport, setCustomerOrderReport] = useState([]);
  const [orderTotal, setOrderTotal] = useState("");

  const getCustomerOrderReport = useCallback(() => {
    Dashboard.getCustomerOrderReport(anniesAnnualData.storeId).then((res) => {
      if (res?.data?.success && res?.data?.data) {
        let data = res?.data?.data;
        setOrderTotal(data?.total);
        const updatedCustomerOrderArray = data?.dropDownViewModel.map(
          (order, index) => {
            order["color"] = RandomColors[index];
            order["name"] = order.label;
            order["value"] = Number(order.value);
            return order;
          }
        );
        setCustomerOrderReport(updatedCustomerOrderArray);
      }
    });
  }, [store]);

  useEffect(() => {
    getCustomerOrderReport();
  }, [getCustomerOrderReport, store]);
  return (
    <>
      <CircleChart
        title={"Customer Order Report"}
        data={customerOrderReport}
        lableValue={orderTotal}
        labelText={"Total Order"}
      >
        <Tooltip />
      </CircleChart>
    </>
  );
};

export default CustomerOrderReport;
