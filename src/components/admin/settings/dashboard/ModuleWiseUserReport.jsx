import React, { useState, useEffect, useCallback } from "react";
import CircleChart from "components/admin/reports/reports/Chart/CircleChart";
import SettingDashboardServices from "services/admin/settingDasboard/SettingDashboardServices";
import { RandomColors } from "global/Enum";
import { useSelector } from "react-redux";
import { Tooltip } from "recharts";

const ModuleWiseUserReport = ({ data }) => {
  const User = useSelector((Store) => Store?.user?.id);
  const [ModulesWiseUserReport, setModulesWiseUserReport] = useState(null);
  const [total, setTotal] = useState("");

  const ModulesWiseUserReportData = useCallback(() => {
    SettingDashboardServices.getsettingDashboarmodules(User)
      .then((ModulesData) => {
        if (ModulesData?.data?.success && ModulesData?.data?.data) {
          let data = ModulesData?.data?.data;
          setTotal(data?.total);
          const updatedModulesWiseUserArray = data?.dropDownViewModel.map(
            (order, index) => {
              order["color"] = RandomColors[index];
              order["name"] = order.label;
              order["value"] = Number(order.value);
              return order;
            }
          );
          setModulesWiseUserReport(updatedModulesWiseUserArray);
        }
      })
      .catch((error) => { });
  }, [User]);

  useEffect(() => {
    ModulesWiseUserReportData();
  }, [User]);
  return (
    <>
      <CircleChart
        title={"Module Wise User Report"}
        data={ModulesWiseUserReport}
        lableValue={total}
        labelText={"Total Modules"}
      >
        <Tooltip />
      </CircleChart>
    </>
  );
};

export default ModuleWiseUserReport;
