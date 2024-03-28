import React, { useState, useEffect, useCallback } from "react";
import Dashboard from "services/admin/reports/dashboard/dashboardService";
import BarCharts from "../Chart/BarCharts";
import { Bar, Cell, Tooltip, YAxis } from "recharts";
const TopTenBrand = ({ store }) => {
  const [startDate, setstartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());
  const [topTenBrand, setTopTenBrand] = useState([]);

  const getTopTenBrand = useCallback(() => {
    Dashboard.getTopTenBrand({
      storeId: store?.value ? store?.value : 0,
      startDate: startDate,
      endDate: endDate,
    }).then((res) => {
      const updatedTopTenBrandStatusArray = res.data.data.map((brand) => {
        brand["name"] = brand.label;
        brand["value"] = Number(brand.value);
        delete brand["label"];
        return brand;
      });
      setTopTenBrand(updatedTopTenBrandStatusArray);
    });
  }, [store?.value, endDate, startDate]);

  useEffect(() => {
    if (startDate && endDate) {
      getTopTenBrand();
    }
  }, [startDate, endDate]);

  useEffect(() => {
    getTopTenBrand();
  }, [getTopTenBrand, store?.value]);

  const TopTenBrandTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip min-w-[40px]">
          <p className="label bg-white rounded border border-y-stone-700">{`${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };
  return (
    <>
      <BarCharts
        title={"Top 10 Brands"}
        dateFilter={true}
        data={topTenBrand}
        width={700}
        height={300}
        startDate={startDate}
        setstartDate={setstartDate}
        endDate={endDate}
        setendDate={setendDate}
        StoreNameLabel={true}
        StoreName={store?.label}
        SubDataClassName={"text-sm text-orange-600"}
      >
        <Bar dataKey="value" fill="#86EFAC" barSize={40} />
        <YAxis
          label={{
            value: "# of Products",
            angle: -90,
            position: "insideLeft",
          }}
        />
        <Tooltip
          cursor={{ fill: "transparent" }}
          content={<TopTenBrandTooltip />}
        />
      </BarCharts>
    </>
  );
};

export default TopTenBrand;
