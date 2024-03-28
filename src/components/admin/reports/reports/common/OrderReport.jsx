import React, { useState, useEffect, useCallback } from "react";
import CircleChart from "../Chart/CircleChart";
import Dashboard from "services/admin/reports/dashboard/dashboardService";
import { RandomColors, anniesAnnualData } from "global/Enum";
import { Tooltip } from "recharts";

const OrderReport = ({ store }) => {
  const [orderReport, setOrderReport] = useState([]);
  const [orderTotal, setOrderTotal] = useState("");

  const getOrderReport = useCallback(() => {
    Dashboard.getOrderReport(anniesAnnualData.storeId).then((res) => {
      if (res?.data?.success && res?.data?.data) {
        let data = res?.data?.data;
        setOrderTotal(data?.total);
        const updatedOrderArray = data?.dropDownViewModel.map(
          (order, index) => {
            order["color"] = RandomColors[index];
            order["name"] = order.label;
            order["value"] = Number(order.value);
            return order;
          }
        );
        setOrderReport(updatedOrderArray);
      }
    });
  }, [store]);

  useEffect(() => {
    getOrderReport();
  }, [getOrderReport, store]);

  return (
    <>
      <CircleChart
        title={"Order Report"}
        data={orderReport}
        lableValue={orderTotal}
        labelText={"Total Order"}
      >
        <Tooltip />
      </CircleChart>
    </>
  );
};

export default OrderReport;
