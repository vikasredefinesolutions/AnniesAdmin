import React, { useState, useEffect, useCallback } from "react";
import BarCharts from "../Chart/BarCharts";
import Dashboard from "services/admin/reports/dashboard/dashboardService";
import { Bar, Cell, Tooltip, YAxis } from "recharts";

const ProductReadyScore = ({ store }) => {
  const [productReadyScore, setProductReadyScore] = useState([]);

  const getProductReadyScore = useCallback(() => {
    Dashboard.getProductReadyScoreReport(store ? store : 0).then((res) => {
      const updatedProductReadyScoreArray = res.data.data.map((score) => {
        score["name"] = score.label;
        score["value"] = Number(score.value);
        delete score["label"];
        return score;
      });
      setProductReadyScore(updatedProductReadyScoreArray);
    });
  }, [store]);

  useEffect(() => {
    getProductReadyScore();
  }, [getProductReadyScore, store]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip min-w-[40px]">
          <p className="label bg-white rounded border border-y-stone-700 text-black">Products: {`${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };
  return (
    <>
      <BarCharts title={"Product Ready Score"} data={productReadyScore}>
        <Bar dataKey="value" fill="#86EFAC" barSize={40} />
        <YAxis
          label={{
            value: "# of Products",
            angle: -90,
            position: "insideLeft",
          }}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
      </BarCharts>
    </>
  );
};

export default ProductReadyScore;
