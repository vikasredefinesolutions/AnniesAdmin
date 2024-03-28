/*Component Name: OrderSyncDetailReport
Component Functional Details: User can create or update OrderSyncDetailReport master details from here.
Created By: Shrey Patel
Created Date: Currunt Date
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import React, { useCallback, useState, useEffect } from "react";
import CircleChart from "components/admin/reports/reports/Chart/CircleChart";
import DashBoardServices from "services/admin/order/DashBoardServices";
import { RandomColors } from "global/Enum";
import { Tooltip } from "recharts";

const OrderSyncDetailReport = ({ store, DataFromDate, DropDownData }) => {
  const [OrderSyncData, setOrderSyncData] = useState([]);

  const getOrderSyncDetails = useCallback(() => {
    if (store?.value) {
      DashBoardServices.getSyncOrderStatus(store?.value, DropDownData).then(
        (response) => {
          if (response?.data?.success && response?.data?.data) {
            const getOrderSyncDetails = response.data.data.map(
              (order, index) => {
                order["color"] = RandomColors[index];
                order["value"] = Number(order.count);
                return order;
              }
            );
            setOrderSyncData(getOrderSyncDetails);
          }
        }
      );
    }
  }, [store?.value, DropDownData]);

  useEffect(() => {
    getOrderSyncDetails();
  }, [getOrderSyncDetails]);

  return (
    <>
      <CircleChart
        title={"Order Synced Details"}
        data={OrderSyncData}
        DataFromDate={DataFromDate}
        label={true}
        SubDataClassName={"text-sm text-orange-600"}
        StoreNameLabel={true}
        StoreName={store?.label}
      >
        <Tooltip />
      </CircleChart>
    </>
  );
};

export default OrderSyncDetailReport;
