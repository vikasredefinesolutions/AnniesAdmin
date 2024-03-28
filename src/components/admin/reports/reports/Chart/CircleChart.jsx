import React, { useState, useMemo, useEffect } from "react";
import { Fragment } from "react";
import { PieChart, Pie, Cell, Label } from "recharts";
import Select from "components/common/formComponent/Select";

const CircleChart = ({
  data,
  title,
  DataFromDate,
  SubDataClassName,
  dropdownOptions,
  setStore,
  defaultValue,
  dropdownShow = false,
  label = false,
  StoreNameLabel = false,
  StoreName,
  lableValue,
  labelText,
  ...rest
}) => {
  const [circleData, setCircleData] = useState(data);

  useEffect(() => {
    setCircleData(data);
  }, [data]);

  const [tempCircleData, settempCircleData] = useState([]);
  let newButtonObject = useMemo(() => data, [circleData]);

  const circleButtonHandle = (buttonData, e) => {
    const currentButton = e.currentTarget.name;

    if (
      tempCircleData.length === 0 ||
      !tempCircleData.includes(currentButton)
    ) {
      settempCircleData((prevData) => {
        setCircleData(
          (prevButtonObj) => {
            return prevButtonObj.filter(
              (btnObj) => btnObj.name !== currentButton
            );
          },
          [currentButton]
        );
        return [...prevData, currentButton];
      });
    } else {
      const newTempCircleData = [...tempCircleData];

      const newTemp = newTempCircleData.filter((element) => {
        return element !== currentButton;
      });

      const newTempCirc = newButtonObject.filter((element) => {
        return element.name === currentButton;
      });

      setCircleData((prevButtonObj) => {
        return [...prevButtonObj, newTempCirc[0]];
      });

      settempCircleData(() => {
        return newTemp;
      });
    }
  };

  const CustomLabel = ({ viewBox, labelText, value }) => {
    const { cx, cy } = viewBox;
    return (
      <g>
        <text
          x={cx}
          y={cy}
          className="recharts-text recharts-label"
          textAnchor="middle"
          dominantBaseline="central"
          alignmentBaseline="middle"
          fontSize="12"
        >
          {labelText}
        </text>
        <text
          x={cx}
          y={cy + 20}
          className="recharts-text recharts-label"
          textAnchor="middle"
          dominantBaseline="central"
          alignmentBaseline="middle"
          // fill="#0088FE"
          fontSize="22"
          fontWeight="600"
        >
          {value}
        </text>
      </g>
    );
  };

  let checkDataFoundOrNot = Array.isArray(data)
    ? data.some((value) => {
      return value.value > 0;
    })
    : false;

  return (
    <>
      <div className="w-full bg-white shadow-lg rounded-md h-full">
        <div className=" text-base lg:text-xl text-gray-700 px-5 py-4 border-b-2 border-neutral-200">
          <div className="sm:flex sm:justify-between sm:items-center">
            <div className="font-semibold">{title}</div>
            <div>
              {dropdownShow && (
                <Select
                  onChange={(e) => {
                    if (e) {
                      setStore((prevState) => ({
                        ...prevState,
                        label: e.label,
                        value: e.value,
                      }));
                    } else {
                      setStore({});
                    }
                  }}
                  isClearable={false}
                  defaultValue={defaultValue}
                  className={"w-[250px]"}
                  options={dropdownOptions}
                  isMulti={false}
                />
              )}
            </div>
          </div>
          <div>
            {StoreNameLabel &&
              <>
                <span className="text-sm">Store : </span>
                <span className={SubDataClassName}>{StoreName}</span>
              </>
            }
            {label &&
              <span className={"ml-1 text-sm text-cyan-600"}>( {DataFromDate} )</span>
            }
          </div>
        </div>

        {Array.isArray(data) && data.length && checkDataFoundOrNot ? (
          <>
            <div className="flex flex-wrap p-3 justify-center item-center text-center">
              <div className="inline-block">
                <PieChart
                  width={400}
                  height={300}
                  style={{ width: "100% !important" }}
                >
                  <Pie
                    dataKey="value"
                    data={circleData}
                    cx={190}
                    cy={150}
                    innerRadius={82}
                    outerRadius={120}
                    label={label}
                  >
                    {circleData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    <Label
                      content={
                        <CustomLabel labelText={labelText} value={lableValue} />
                      }
                      position="center"
                    />
                  </Pie>
                  {/* <Tooltip /> */}
                  {rest.children}
                </PieChart>
              </div>
            </div>
            <div className="px-3 pt-2 pb-3">
              <ul className="flex flex-wrap justify-center">
                {data?.map((button, index) => {
                  return (
                    <Fragment key={index}>
                      <li className="margin: 0.25rem">
                        <button
                          className={`btn-xs bg-white border-y-neutral-900 border-x-slate-900 shadow-neutral-900 mr-2 ${tempCircleData.some(
                            (allButton) => allButton === button.name
                          ) && "opacity-20"
                            }`}
                          // key={index}
                          type="button"
                          name={button.name}
                          onClick={(e) => circleButtonHandle(button, e)}
                        >
                          <span
                            className={`block w-2 h-2 bg-gray-300 rounded-sm mr-2`}
                            style={{
                              backgroundColor: button.color,
                            }}
                          ></span>

                          <span className={`flex items-center`}>
                            {button.name}
                          </span>
                        </button>
                      </li>
                    </Fragment>
                  );
                })}
              </ul>
            </div>
          </>
        ) : (
          <div className="flex flex-wrap p-6 justify-center item-center text-center text-black">
            No data found as of now
          </div>
        )}
      </div>
    </>
  );
};

export default CircleChart;
