import React from "react";
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Legend,
  Tooltip,
} from "recharts";

const RadialBarCharts = ({ title }) => {
  const data = [
    {
      name: "18-24",
      uv: 31.47,
      pv: 2400,
      fill: "#8884d8",
    },
  ];
  return (
    <>
      <div className="col-span-full lg:col-span-full xl:col-span-4 w-full">
        <div className="w-full bg-white shadow-lg rounded-md">
          <div className="font-semibold text-base lg:text-xl text-gray-700 px-5 py-4 border-b-2 border-neutral-200">
            <div className="grow font-semibold text-base lg:text-xl text-gray-700">
              {title}
            </div>
          </div>
          <div className="text-center p-3">
            <ResponsiveContainer width="100%" height={300}>
              <RadialBarChart
                width={500}
                height={300}
                innerRadius={100}
                outerRadius={140}
                barSize={25}
                startAngle={180}
                endAngle={0}
                data={data}
                align="center"
              >
                <RadialBar
                  minAngle={15}
                  label={{ fill: "#666", position: "insideStart" }}
                  background
                  clockWise={true}
                  dataKey="uv"
                />
                <Legend
                  iconSize={10}
                  width={120}
                  height={140}
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                />
                <Tooltip />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default RadialBarCharts;
