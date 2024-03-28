import React, { useState, useEffect, useCallback } from "react";
import CircleChart from "../Chart/CircleChart";
import Dashboard from "services/admin/reports/dashboard/dashboardService";
import { RandomColors } from "global/Enum";
import { Tooltip } from "recharts";

const ProductNavSyncStatusReport = ({ store }) => {
  const [productNavSyncStatusReport, setProductNavSyncStatusReport] = useState(
    []
  );
  const [total, setTotal] = useState("");

  const getProductNavSyncStatusReport = useCallback(() => {
    Dashboard.getProductNavSyncStatusReport(
      store?.value ? store?.value : 0
    ).then((res) => {
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
        setProductNavSyncStatusReport(updatedProductStatusArray);
      }
    });
  }, [store]);

  useEffect(() => {
    getProductNavSyncStatusReport();
  }, [getProductNavSyncStatusReport, store?.value]);

  return (
    <>
      <CircleChart
        title={"Product NAV Sync Status Report"}
        data={productNavSyncStatusReport}
        lableValue={total}
        labelText={"Total Product"}
        StoreNameLabel={true}
        StoreName={store?.label}
        SubDataClassName={"text-sm text-orange-600"}
      >
        <Tooltip />
      </CircleChart>
    </>
  );
};

export default ProductNavSyncStatusReport;
