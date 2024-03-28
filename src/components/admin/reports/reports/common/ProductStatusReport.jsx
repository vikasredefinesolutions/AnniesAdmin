import React, { useState, useEffect, useCallback } from "react";
import CircleChart from "../Chart/CircleChart";
import Dashboard from "services/admin/reports/dashboard/dashboardService";
import { RandomColors, anniesAnnualData } from "global/Enum";
import { Tooltip } from "recharts";

const ProductStatusReport = ({ store }) => {
  const [productStatusReport, setProductStatusReport] = useState([]);
  const [total, setTotal] = useState("");

  const getProductStatusReport = useCallback(() => {
    Dashboard.getProductStatusReport(anniesAnnualData.storeId).then((res) => {
      if (res?.data?.success && res?.data?.data) {
        let data = res?.data?.data;
        setTotal(data?.total);
        const updatedProductStatusArray = data?.dropDownViewModel.map(
          (order, index) => {
            order["color"] = RandomColors[index];
            order["name"] = order.label;
            order["value"] = Number(order.value);
            return order;
          }
        );
        setProductStatusReport(updatedProductStatusArray);
      }
    });
  }, [store]);

  useEffect(() => {
    getProductStatusReport();
  }, [getProductStatusReport, store]);
  return (
    <>
      <CircleChart
        title={"Product Status Report"}
        data={productStatusReport}
        lableValue={total}
        labelText={"Total Product"}
      >
        <Tooltip />
      </CircleChart>
    </>
  );
};

export default ProductStatusReport;
