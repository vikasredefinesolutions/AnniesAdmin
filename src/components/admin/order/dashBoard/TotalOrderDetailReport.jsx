/*Component Name: TotalOrderDetailReport
Component Functional Details: User can create or update TotalOrderDetailReport master details from here.
Created By: Shrey Patel
Created Date: Currunt Date
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import React, { useCallback, useState, useEffect } from "react";
import CircleChart from "components/admin/reports/reports/Chart/CircleChart";
import { RandomColors, anniesAnnualData } from "global/Enum";
import DashBoardServices from "services/admin/order/DashBoardServices";
import { Tooltip } from "recharts";
import { useSelector } from "react-redux";

const TotalOrderDetailReport = ({
  title,
  Data,
  store,
  DropDownData,
  DataFromDate,
}) => {
  const reduxData = useSelector((store) => store);
  const [OrderData, setOrderData] = useState([]);
  const [orderTotal, setOrderTotal] = useState("");

  const getOrderDetails = useCallback(() => {
    DashBoardServices.getOrderTotalDetails({
      filter: DropDownData,
      storeid: [anniesAnnualData.storeId],
      userId: reduxData?.user?.id,
      companyConfigurationId: reduxData?.CompanyConfiguration?.id,
      startDate: null,
      endDate: null
    }).then(
      (response) => {
        if (response?.data?.success && response?.data?.data) {
          let data = response?.data?.data;
          setOrderTotal(data?.total);
          const getOrderDetails = data?.dropDownViewModel.map(
            (order, index) => {
              order["color"] = RandomColors[index];
              order["name"] = order.label;
              order["value"] = Number(order.value);
              return order;
            }
          );
          setOrderData(getOrderDetails);
        }
      }
    );
  }, [DropDownData]);

  useEffect(() => {
    getOrderDetails();
  }, [getOrderDetails, DropDownData]);

  return (
    <>
      <CircleChart
        title={"Order Details"}
        data={OrderData}
        SubDataClassName={"text-sm text-orange-600"}
        lableValue={orderTotal}
        labelText={"Order Total"}
        label={true}
        DataFromDate={DataFromDate}
      >
        <Tooltip />
      </CircleChart>
    </>
  );
};

export default TotalOrderDetailReport;
