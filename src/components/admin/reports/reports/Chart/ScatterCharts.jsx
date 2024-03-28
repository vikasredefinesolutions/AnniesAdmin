import React from "react";
import {
  ScatterChart,
  Scatter,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
} from "recharts";

const ScatterCharts = ({
  title,
  data,
  StoreNameLabel = false,
  StoreName,
  SubDataClassName,
  ...rest
}) => {
  return (
    <>
      <div className="col-span-full lg:col-span-full xl:col-span-4 w-full">
        <div className="w-full bg-white shadow-lg rounded-md">
          <div className="font-semibold text-base lg:text-xl text-gray-700 px-5 py-4 border-b-2 border-neutral-200">
            <div className="grow font-semibold text-base lg:text-xl text-gray-700">
              {title}
            </div>
            {StoreNameLabel &&
              <>
                <span className="text-sm">Store : </span>
                <span className={SubDataClassName}>{StoreName}</span>
              </>
            }
          </div>
          {Array.isArray(data) && data.length ? (
            <>
              <div className="text-center p-3">
                <ResponsiveContainer width="100%" height={400}>
                  <ScatterChart
                    width={700}
                    height={400}
                    margin={{
                      top: 20,
                      right: 20,
                      bottom: 20,
                      left: 20,
                    }}
                  >
                    <CartesianGrid />
                    <Scatter data={data} fill="#8884d8">
                      {data?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Scatter>
                    {rest.children}
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </>
          ) : (
            <div className="flex flex-wrap p-6 justify-center item-center text-center text-black">
              No data found as of now
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ScatterCharts;
