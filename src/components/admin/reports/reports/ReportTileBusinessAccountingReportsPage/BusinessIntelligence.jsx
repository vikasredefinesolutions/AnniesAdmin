import React, { useState, useEffect, useCallback } from "react";
import BarCharts from "../Chart/BarCharts";
import LineCharts from "../Chart/LineCharts";
import CircleChart from "../Chart/CircleChart";
import ScatterCharts from "../Chart/ScatterCharts";
import BusinessIntelligenceServices from "services/admin/reports/businessAccountingReports/BusinessIntelligenceServices";
import { Bar, XAxis, YAxis, Tooltip, Line } from "recharts";
import { serverError } from "services/common/helper/Helper";
import { RandomColors, anniesAnnualData } from "global/Enum";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAlertMessage } from "redux/alertMessage/AlertMessageReducers";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { ValidationMsgs } from "global/ValidationMessages";
import Messages from "components/common/alerts/messages/Index";

const BusinessIntelligence = () => {
  const dispatch = useDispatch();
  const [allTimeRevenue, setAllTimeRevenue] = useState([]);
  const [allTimeNumberOfOrders, setAllTimeNumberOfOrders] = useState([]);
  const [allTimeCustomer, setAllTimeCustomer] = useState([]);
  const [allTimeAverageRevenue, setAllTimeAverageRevenue] = useState([]);
  const [allTimeAverageOrders, setAllTimeAverageOrders] = useState([]);
  const [allTimeAverageCustomers, setAllTimeAverageCustomers] = useState([]);
  const [top10SellingDaysByRevenueDate, setTop10SellingDaysByRevenueDate] =
    useState([]);
  const [
    totalTop10SellingDaysByRevenueDate,
    setTotalTop10SellingDaysByRevenueDate,
  ] = useState("");
  const [top10SellingDaysByRevenueTime, setTop10SellingDaysByRevenueTime] =
    useState([]);
  const [
    totalTop10SellingDaysByRevenueTimePeriod,
    setTotalTop10SellingDaysByRevenueTimePeriod,
  ] = useState("");
  const [top10SellingDaysByOrdersDate, setTop10SellingDaysByOrdersDate] =
    useState([]);
  const [
    totalTop10SellingDaysByOrderDate,
    setTotalTop10SellingDaysByOrderDate,
  ] = useState("");
  const [top10SellingDaysByOrdersTime, setTop10SellingDaysByOrdersTime] =
    useState([]);
  const [
    totalTop10SellingDaysByOrdersTimePeriod,
    setTotalTop10SellingDaysByOrdersTimePeriod,
  ] = useState("");
  const [top3SellingMonthByRevenue, setTop3SellingMonthByRevenue] = useState(
    []
  );
  const [top3SellingMonthByOrder, setTop3SellingMonthByOrder] = useState([]);

  const store = anniesAnnualData.storeId;

  const getAllTimeRevenue = useCallback(() => {
    BusinessIntelligenceServices.getAllTimeRevenue(store ? store : 0).then(
      (res) => {
        const updatedTopAllTimeRevenueArray = res.data.data.map((revenue) => {
          revenue["name"] = revenue.label;
          revenue["value"] = Number(revenue.value);
          delete revenue["label"];
          return revenue;
        });
        setAllTimeRevenue(updatedTopAllTimeRevenueArray);
      }
    );
  }, [store]);

  const getAllTimeNumberOfOrdersReport = useCallback(() => {
    BusinessIntelligenceServices.AllTimeNumberOfOrdersReport(
      store ? store : 0
    ).then((res) => {
      const updatedAllTimeNumberOfOrdersArray = res.data.data.map((orders) => {
        orders["name"] = orders.label;
        orders["value"] = Number(orders.value);
        delete orders["label"];
        return orders;
      });
      setAllTimeNumberOfOrders(updatedAllTimeNumberOfOrdersArray);
    });
  }, [store]);

  const getAllTimeCustomer = useCallback(() => {
    BusinessIntelligenceServices.AllTimeCustomer(store ? store : 0).then(
      (res) => {
        const updatedAllTimeCustomerArray = res.data.data.map((customer) => {
          customer["name"] = customer.label;
          customer["value"] = Number(customer.value);
          delete customer["label"];
          return customer;
        });
        setAllTimeCustomer(updatedAllTimeCustomerArray);
      }
    );
  }, [store]);

  const getAllTimeAverageRevenue = useCallback(() => {
    BusinessIntelligenceServices.AllTimeAverageRevenue(store ? store : 0).then(
      (res) => {
        const updatedAllTimeAverageRevenueArray = res.data.data.map(
          (revenue) => {
            let revanueValue = Number(revenue).toFixed(2);
            revenue["name"] = revenue.label;
            revenue["value"] = Number(revanueValue);
            delete revenue["label"];
            return revenue;
          }
        );
        setAllTimeAverageRevenue(updatedAllTimeAverageRevenueArray);
      }
    );
  }, [store]);

  const getAllTimeAverageOrders = useCallback(() => {
    BusinessIntelligenceServices.AllTimeAverageOrders(store ? store : 0).then(
      (res) => {
        const updatedAllTimeAverageOrdersArray = res.data.data.map((orders) => {
          let orderValue = Number(orders).toFixed(2);
          orders["name"] = orders.label;
          orders["value"] = Number(orderValue);
          delete orders["label"];
          return orders;
        });
        setAllTimeAverageOrders(updatedAllTimeAverageOrdersArray);
      }
    );
  }, [store]);

  const getAllTimeAverageCustomers = useCallback(() => {
    BusinessIntelligenceServices.AllTimeAverageCustomers(
      store ? store : 0
    ).then((res) => {
      const updatedAllTimeAverageCustomersArray = res.data.data.map(
        (customer) => {
          let customerValue = Number(customer.value).toFixed(2);
          customer["name"] = customer.label;
          customer["value"] = Number(customerValue);
          delete customer["label"];
          return customer;
        }
      );
      setAllTimeAverageCustomers(updatedAllTimeAverageCustomersArray);
    });
  }, [store]);

  const getTop10SellingDaysByRevenueDate = useCallback(() => {
    BusinessIntelligenceServices.Top10SellingDaysByRevenueDate(
      store ? store : 0
    ).then((res) => {
      if (res?.data?.success && res?.data?.data) {
        let data = res?.data?.data;
        setTotalTop10SellingDaysByRevenueDate(data?.total);
        const updatedTop10SellingDaysByRevenueDateArray =
          data?.dropDownViewModel.map((revenue, index) => {
            revenue["color"] = RandomColors[index];
            revenue["name"] = revenue.label;
            revenue["value"] = Number(revenue.value);
            return revenue;
          });
        setTop10SellingDaysByRevenueDate(
          updatedTop10SellingDaysByRevenueDateArray
        );
      }
    });
  }, [store]);

  const getTop10SellingDaysByRevenueTimePeriod = useCallback(() => {
    BusinessIntelligenceServices.Top10SellingDaysByRevenueTime(
      store ? store : 0
    ).then((res) => {
      if (res?.data?.success && res?.data?.data) {
        let data = res?.data?.data;
        setTotalTop10SellingDaysByRevenueTimePeriod(data?.total);
        const updatedTop10SellingDaysByRevenueTimeArray =
          data?.dropDownViewModel.map((revenue, index) => {
            revenue["color"] = RandomColors[index];
            revenue["name"] = revenue.label;
            revenue["value"] = Number(revenue.value);
            return revenue;
          });
        setTop10SellingDaysByRevenueTime(
          updatedTop10SellingDaysByRevenueTimeArray
        );
      }
    });
  }, [store]);

  const getTop10SellingDaysByOrderDate = useCallback(() => {
    BusinessIntelligenceServices.Top10SellingDaysByOrderDate(
      store ? store : 0
    ).then((res) => {
      if (res?.data?.success && res?.data?.data) {
        let data = res?.data?.data;
        setTotalTop10SellingDaysByOrderDate(data?.total);
        const updatedTop10SellingDaysByOrderDate = data?.dropDownViewModel?.map(
          (orders, index) => {
            orders["color"] = RandomColors[index];
            orders["name"] = orders.label;
            orders["value"] = Number(orders.value);
            return orders;
          }
        );
        setTop10SellingDaysByOrdersDate(updatedTop10SellingDaysByOrderDate);
      }
    });
  }, [store]);

  const getTop10SellingDaysByOrdersTimePeriod = useCallback(() => {
    BusinessIntelligenceServices.Top10SellingDaysByOrderTime(
      store ? store : 0
    ).then((res) => {
      if (res?.data?.success && res.data.data) {
        let data = res?.data?.data;
        setTotalTop10SellingDaysByOrdersTimePeriod(data?.total);
        const updatedTop10SellingDaysByOrdersTimePeriod =
          data?.dropDownViewModel?.map((orders, index) => {
            orders["color"] = RandomColors[index];
            orders["name"] = orders.label;
            orders["value"] = Number(orders.value);
            return orders;
          });
        setTop10SellingDaysByOrdersTime(
          updatedTop10SellingDaysByOrdersTimePeriod
        );
      }
    });
  }, [store]);

  const getTop3SellingMonthByRevenue = useCallback(() => {
    BusinessIntelligenceServices.Top3SellingMonthByRevenue(
      store ? store : 0
    ).then((res) => {
      if (res.data.success) {
        const updatedTop3SellingMonthByRevenue = res.data.data.map(
          (revenue, index) => {
            revenue["color"] = RandomColors[index];
            revenue["x"] = Number(revenue.x);
            revenue["y"] = Number(revenue.y);
            return revenue;
          }
        );
        setTop3SellingMonthByRevenue(updatedTop3SellingMonthByRevenue);
      }
    });
  }, [store]);

  const getTop3SellingMonthByOrder = useCallback(() => {
    BusinessIntelligenceServices.Top3SellingMonthByOrder(
      store ? store : 0
    ).then((res) => {
      if (res.data.success) {
        const updatedTop3SellingMonthByOrder = res.data.data.map(
          (revenue, index) => {
            revenue["color"] = RandomColors[index];
            revenue["x"] = Number(revenue.x);
            revenue["y"] = Number(revenue.y);
            return revenue;
          }
        );
        setTop3SellingMonthByOrder(updatedTop3SellingMonthByOrder);
      }
    });
  }, [store]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip min-w-[40px]">
          <p className="label bg-white rounded border border-y-stone-700 text-black">{`${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    getAllTimeRevenue();
    getAllTimeNumberOfOrdersReport();
    getAllTimeCustomer();
    getAllTimeAverageRevenue();
    getAllTimeAverageOrders();
    getAllTimeAverageCustomers();
    getTop10SellingDaysByRevenueDate();
    getTop10SellingDaysByRevenueTimePeriod();
    getTop10SellingDaysByOrdersTimePeriod();
    getTop3SellingMonthByRevenue();
    getTop3SellingMonthByOrder();
    getTop10SellingDaysByOrderDate();
  }, [
    getAllTimeRevenue,
    getAllTimeNumberOfOrdersReport,
    getAllTimeCustomer,
    getAllTimeAverageRevenue,
    getAllTimeAverageOrders,
    getAllTimeAverageCustomers,
    getTop10SellingDaysByRevenueDate,
    getTop10SellingDaysByRevenueTimePeriod,
    getTop10SellingDaysByOrdersTimePeriod,
    getTop3SellingMonthByRevenue,
    getTop3SellingMonthByOrder,
    getTop10SellingDaysByOrderDate,
    store,
  ]);

  const Export = () => {
    dispatch(setAddLoading(true));
    BusinessIntelligenceServices.ExportBusinessIntelligence(store ? store : 0)
      .then((response) => {
        if (response.data.success) {
          dispatch(
            setAlertMessage({
              type: "success",
              message: ValidationMsgs.commonExport.success,
            })
          );
          window.location.href = response.data.data;
        } else {
          dispatch(
            setAlertMessage({
              type: "danger",
              message: serverError(response),
            })
          );
        }
        dispatch(setAddLoading(false));
      })
      .catch((error) => {
        dispatch(
          setAlertMessage({
            type: "danger",
            message: ValidationMsgs.commonExport.failed,
          })
        );
        dispatch(setAddLoading(false));
      });
  };

  const Top3SellingMonthByRevenueCustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-white border rounded">
          <p className="label  text-black">{`${payload[0].payload.date} : Total Revenue: ${payload[0].value} / Total Order : ${payload[1].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <title>Business Intelligence</title>
      <div className="py-4">
        <div className="px-4 sm:px-6 lg:px-8 w-full items-center flex justify-between sticky top-0 z-20 py-2 bg-slate-100">
          <div className="flex items-center">
            <NavLink
              className="btn border-neutral-200 hover:border-neutral-400 text-gray-500 hover:text-gray-700 flex items-center mr-2"
              to={"/admin/reports"}
            >
              <span className="material-icons-outlined">west </span>
            </NavLink>
            <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
              Business Intelligence
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" className="text-indigo-500" onClick={Export}>
              Export
            </button>
          </div>
        </div>
        <div className="px-4 sm:px-6 lg:px-8 w-full pt-5">
          <Messages />
          <div className="flex flex-wrap -mx-3 -mt-6">
            <div className="w-full md:w-1/2 xl:w-1/3 px-3 pt-6 flex">
              <BarCharts
                title={"All Time Revenue"}
                data={allTimeRevenue}
                StoreNameLabel={true}
                StoreName={store?.label}
                SubDataClassName={"text-sm text-orange-600"}
              >
                <Bar dataKey="value" fill="#86EFAC" barSize={40} />
                <YAxis
                  label={{
                    value: "Order Revenue",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  content={<CustomTooltip />}
                />
              </BarCharts>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 px-3 pt-6 flex">
              <BarCharts
                title={"All Time Number of Orders"}
                StoreNameLabel={true}
                StoreName={store?.label}
                SubDataClassName={"text-sm text-orange-600"}
                data={allTimeNumberOfOrders}
              >
                <Bar dataKey="value" fill="#86EFAC" barSize={40} />
                <YAxis
                  label={{
                    value: "Total Order",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  content={<CustomTooltip />}
                />
              </BarCharts>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 px-3 pt-6 flex">
              <BarCharts
                title={"All Time Customers"}
                data={allTimeCustomer}
                StoreNameLabel={true}
                StoreName={store?.label}
                SubDataClassName={"text-sm text-orange-600"}
              >
                <Bar dataKey="value" fill="#86EFAC" barSize={40} />
                <YAxis
                  label={{
                    value: "Total Customer",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  content={<CustomTooltip />}
                />
              </BarCharts>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 px-3 pt-6 flex">
              <LineCharts
                title={"All Time Average Revenue"}
                data={allTimeAverageRevenue}
                StoreNameLabel={true}
                StoreName={store?.label}
                SubDataClassName={"text-sm text-orange-600"}
              >
                <YAxis
                  label={{
                    value: "Total Customer",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Line
                  connectNulls
                  type="monotone"
                  dataKey="value"
                  stroke="#E5E5E5"
                  fill="#86EFAC"
                  activeDot={{ r: 8 }}
                />
                <Tooltip content={<CustomTooltip />} />
              </LineCharts>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 px-3 pt-6 flex">
              <LineCharts
                title={"All Time Average Orders"}
                data={allTimeAverageOrders}
                StoreNameLabel={true}
                StoreName={store?.label}
                SubDataClassName={"text-sm text-orange-600"}
              >
                <YAxis
                  label={{
                    value: "Total Order",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Line
                  connectNulls
                  type="monotone"
                  dataKey="value"
                  stroke="#E5E5E5"
                  fill="#86EFAC"
                  activeDot={{ r: 8 }}
                />
                <Tooltip content={<CustomTooltip />} />
              </LineCharts>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 px-3 pt-6 flex">
              <LineCharts
                title={"All Time Average Customers"}
                data={allTimeAverageCustomers}
                StoreNameLabel={true}
                StoreName={store?.label}
                SubDataClassName={"text-sm text-orange-600"}
              >
                <YAxis
                  label={{
                    value: "Total Order",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Line
                  connectNulls
                  type="monotone"
                  dataKey="value"
                  stroke="#E5E5E5"
                  fill="#86EFAC"
                  activeDot={{ r: 8 }}
                />
                <Tooltip content={<CustomTooltip />} />
              </LineCharts>
            </div>
            {/* <div className="w-full md:w-1/2 xl:w-1/3 px-3 pt-6 flex">
              <CircleChart
                title={"Top 10 Category by Quantity"}
                data={top10CategoryByQuantity}
                lableValue={totalTop10CategoryByQuantity}
                StoreNameLabel={true}
                StoreName={store?.label}
                SubDataClassName={"text-sm text-orange-600"}
                labelText={"Total Category"}
              >
                <Tooltip />
              </CircleChart>
            </div> */}
            {/* <div className="w-full md:w-1/2 xl:w-1/3 px-3 pt-6 flex">
              <CircleChart
                title={"Top 10 Brands by Quantity"}
                data={top10BrandsByQuantity}
                lableValue={totalTop10BrandsByQuantity}
                StoreNameLabel={true}
                StoreName={store?.label}
                SubDataClassName={"text-sm text-orange-600"}
                labelText={"Total Quantity"}
              >
                <Tooltip />
              </CircleChart>
            </div> */}
            {/* <div className="w-full md:w-1/2 xl:w-1/3 px-3 pt-6 flex">
              <CircleChart
                title={"Top 10 Products by Quantity"}
                data={top10ProductsByQuantity}
                lableValue={totalTop10ProductsByQuantity}
                labelText={"Total Product"}
                StoreNameLabel={true}
                StoreName={store?.label}
                SubDataClassName={"text-sm text-orange-600"}
              >
                <Tooltip />
              </CircleChart>
            </div> */}
            <div className="w-full md:w-1/2 xl:w-1/3 px-3 pt-6 flex">
              <ScatterCharts
                title={"Top 3 Selling Month by Revenue"}
                data={top3SellingMonthByRevenue}
                StoreNameLabel={true}
                StoreName={store?.label}
                SubDataClassName={"text-sm text-orange-600"}
              >
                <Tooltip content={<Top3SellingMonthByRevenueCustomTooltip />} />
                <XAxis
                  type="number"
                  dataKey="x"
                  name="Total Revenue"
                  label={{
                    value: "Total Revenue",
                    angle: 0,
                    position: "bottom",
                  }}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  name="Total Order"
                  label={{
                    value: "Total Order",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
              </ScatterCharts>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 px-3 pt-6 flex">
              <CircleChart
                title={"Top 10 Selling Days by Revenue"}
                data={top10SellingDaysByRevenueDate}
                lableValue={totalTop10SellingDaysByRevenueDate}
                labelText={"Revenue"}
                StoreNameLabel={true}
                StoreName={store?.label}
                SubDataClassName={"text-sm text-orange-600"}
              >
                <Tooltip />
              </CircleChart>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 px-3 pt-6 flex">
              <CircleChart
                title={"Top 10 Selling Days by Revenue"}
                data={top10SellingDaysByRevenueTime}
                lableValue={totalTop10SellingDaysByRevenueTimePeriod}
                labelText={"Revenue"}
                StoreNameLabel={true}
                StoreName={store?.label}
                SubDataClassName={"text-sm text-orange-600"}
              >
                <Tooltip />
              </CircleChart>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 px-3 pt-6 flex">
              <ScatterCharts
                title={"Top 3 Selling Month by Order"}
                data={top3SellingMonthByOrder}
                StoreNameLabel={true}
                StoreName={store?.label}
                SubDataClassName={"text-sm text-orange-600"}
              >
                <Tooltip content={<Top3SellingMonthByRevenueCustomTooltip />} />
                <XAxis
                  type="number"
                  dataKey="x"
                  name="Total Revenue"
                  label={{
                    value: "Total Revenue",
                    angle: 0,
                    position: "bottom",
                  }}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  name="Total Order"
                  label={{
                    value: "Total Order",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
              </ScatterCharts>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 px-3 pt-6 flex">
              <CircleChart
                title={"Top 10 Selling Days by Order"}
                data={top10SellingDaysByOrdersDate}
                lableValue={totalTop10SellingDaysByOrderDate}
                labelText={"Total Order"}
                StoreNameLabel={true}
                StoreName={store?.label}
                SubDataClassName={"text-sm text-orange-600"}
              >
                <Tooltip />
              </CircleChart>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 px-3 pt-6 flex">
              <CircleChart
                title={"Top 10 Selling Days by Order"}
                data={top10SellingDaysByOrdersTime}
                lableValue={totalTop10SellingDaysByOrdersTimePeriod}
                labelText={"Total Order"}
                StoreNameLabel={true}
                StoreName={store?.label}
                SubDataClassName={"text-sm text-orange-600"}
              >
                <Tooltip />
              </CircleChart>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessIntelligence;
