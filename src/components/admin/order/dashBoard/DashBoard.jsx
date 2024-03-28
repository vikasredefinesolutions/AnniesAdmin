/*Component Name: DashBoard
Component Functional Details: User can create or update DashBoard master details from here.
Created By: Shrey Patel
Created Date: 04/03/2023
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import { CurrencySymbolByCode, RandomColors } from "global/Enum";
import DashBoardServices from "services/admin/order/DashBoardServices";
import OrderSales from "./OrderSales";
import TotalOrderDetailReport from "./TotalOrderDetailReport";
import LastFewDaysReport from "./LastFewDaysReport";
import TopOrderByMarketPlace from "./TopOrderByMarketPlace";
import OrderSyncDetailsReport from "./OrderSyncDetailReport";
import TotalSales from "./TotalSales";
import StoreTypeTotalOrders from "./StoreTypeTotalOrders";
import Top5Products from "./Top5Products";
import { TitleNameHelper } from "services/common/helper/Helper";
import Select from "components/common/formComponent/Select";
import { DurationFilter } from "global/Enum";
import StoreService from "services/admin/store/StoreService";
import UncapuredOrders from "./UncapuredOrders";
import OrderByCustomer from "./OrderByCustomer";
import OrderByState from "components/admin/dashbord/OrderByState";

const DashBoard = () => {
  const dispatch = useDispatch();

  // const [OrderTotalDetails, setOrderTotalDetails] = useState([]);
  const [OrderSyncDetails, setOrderSyncDetails] = useState([]);
  const [OrderRevenueData, setOrderRevenueData] = useState([]);
  const [DropDownData, setDropDownData] = useState("1");
  const [DataFromDate, setDataFromDate] = useState("Last 24 Hours");
  const [OrderData, setOrderData] = useState([]);
  const [ProductDetailsData, setProductDetailsData] = useState([]);

  const user = useSelector((store) => store?.user);
  const company = useSelector((store) => store?.CompanyConfiguration);
  const [storeData, setStoreData] = useState([]);

  const [store, setStore] = useState({ label: "", value: "" });
  const [AllStore, setAllStore] = useState([]);

  const [PayingCustomerNonPayingCustomer, setPayingCustomerNonPayingCustomer] =
    useState({});
  const [Orders, setTotalOrders] = useState({});
  const [CouPons, setTopCouPons] = useState({});

  const [PayingNonPayingCustomerData, setPayingNonPayingCustomerData] =
    useState([]);
  const [OrdersData, setOrdersData] = useState([]);
  const [CouPonsData, setCouPonsData] = useState([]);
  const [ThisMonthData, setThisMonthData] = useState([]);

  const getPageTitleReport = useCallback(() => {
    return
    if (store?.value) {
      dispatch(setAddLoading(true));
      DashBoardServices.getOrderTotalData(store?.value, DropDownData)
        .then((res) => {
          if (res?.data?.success && res?.data?.data) {
            const PayingCustomerVsNonPayingCustomer = res.data.data.filter(
              (order) => order.name === "Paying Customer Vs Non-Paying Customer"
            );
            const TotalOrders = res.data.data.filter(
              (order) => order.name === "Total Orders"
            );
            const TopCouPons = res.data.data.filter(
              (order) => order.name === "Top CouPons"
            );

            setPayingCustomerNonPayingCustomer(
              ...PayingCustomerVsNonPayingCustomer
            );
            setTotalOrders(...TotalOrders);
            setTopCouPons(...TopCouPons);
          }
          dispatch(setAddLoading(false));
        })
        .catch(() => {
          dispatch(setAddLoading(false));
        });
    }
  }, [store?.value, DropDownData]);

  const updatedPayingCustomerVsNonPayingCustomerArray = useCallback(() => {
    const updatedPayingCustomerVsNonPayingCustomerArray =
      PayingCustomerNonPayingCustomer?.child &&
      PayingCustomerNonPayingCustomer?.child.map((order, index) => {
        order["color"] = RandomColors[index];
        order["name"] = order.name;
        order["value"] = Number(order.count);
        return order;
      });
    setPayingNonPayingCustomerData(
      updatedPayingCustomerVsNonPayingCustomerArray
    );
  }, [DropDownData, PayingCustomerNonPayingCustomer]);

  useEffect(() => {
    updatedPayingCustomerVsNonPayingCustomerArray();
  }, [updatedPayingCustomerVsNonPayingCustomerArray]);

  const updatedTotalOrdersArray = useCallback(() => {
    const updatedTotalOrdersArray =
      Orders?.child &&
      Orders?.child.map((order, index) => {
        order["color"] = RandomColors[index];
        order["name"] = order.name;
        order["value"] = Number(order.count);
        return order;
      });
    setOrdersData(updatedTotalOrdersArray);
  }, [DropDownData, Orders]);

  useEffect(() => {
    updatedTotalOrdersArray();
  }, [updatedTotalOrdersArray]);

  const updatedTopCouPonsArray = useCallback(() => {
    const updatedTopCouPonsArray =
      CouPons?.child &&
      CouPons?.child.map((order, index) => {
        order["color"] = RandomColors[index];
        order["name"] = order.name;
        order["value"] = Number(order.count);
        return order;
      });
    setCouPonsData(updatedTopCouPonsArray);
  }, [DropDownData, CouPons]);

  useEffect(() => {
    updatedTopCouPonsArray();
  }, [updatedTopCouPonsArray]);

  useEffect(() => {
    getPageTitleReport();
  }, [DropDownData, store?.value]);

  useEffect(() => {
    // DashBoardServices.getOrderTotalDetails()
    //   .then((OrderDetails) => {
    //     if (OrderDetails?.data?.success) {
    //       setOrderTotalDetails(OrderDetails?.data?.data?.dropDownViewModel);
    //     }
    //   })
    //   .catch((error) => { });

    if (store?.value) {
      DashBoardServices.getSyncOrderStatus(store?.value, DropDownData)
        .then((OrderDetails) => {
          if (OrderDetails?.data?.success) {
            setOrderSyncDetails(OrderDetails?.data?.data);
          }
        })
        .catch((error) => { });
    }

    if (store.value) {
      DashBoardServices.getOrderCountListData(store?.value, DropDownData)
        .then((OrderCountData) => {
          if (OrderCountData.data.success) {
            setOrderRevenueData(OrderCountData.data.data);
          }
        })
        .catch((error) => { });
    }

    if (store?.value) {
      DashBoardServices.getOrderDataByStore(store?.value, DropDownData)
        .then((OrderDataDetail) => {
          if (OrderDataDetail?.data?.success && OrderDataDetail?.data?.data) {
            setOrderData(OrderDataDetail.data.data);
          }
        })
        .catch((error) => { });

      DashBoardServices.getThisMonthDataByStore(store?.value)
        .then((ThisMonthsDataDetail) => {
          if (
            ThisMonthsDataDetail?.data?.success &&
            ThisMonthsDataDetail?.data?.data
          ) {
            setThisMonthData(ThisMonthsDataDetail.data.data);
          }
        })
        .catch((error) => { });

      DashBoardServices.getProductDetailsByStore(store?.value)
        .then((ProductDetailsData) => {
          if (
            ProductDetailsData?.data?.success &&
            ProductDetailsData?.data?.data
          ) {
            setProductDetailsData(ProductDetailsData.data.data);
          }
        })
        .catch((error) => { });
    }
  }, [store?.value, DataFromDate]);

  useEffect(() => {
    if (store?.value === "0" && storeData.length) {
      let AllStoreIds = [];
      let AllStoreData = storeData.map((stores) => Number(stores.value));

      AllStoreIds.push(...AllStoreData);
      setAllStore([...AllStoreIds]);
    } else {
      if (store?.value !== "") {
        setAllStore([Number(store?.value)]);
      }
    }
  }, [storeData, store]);

  const getStoreDropdownData = useCallback(() => {
    if (user?.id && company?.id) {
      StoreService.getStoreByUserId({
        userid: user?.id,
        companyConfigurationId: company?.id,
        isSuperUser: user?.isSuperUser,
      })
        .then((response) => {
          if (response?.data?.data) {
            setStoreData([
              { label: "All Stores", value: "0" },
              ...response?.data?.data,
            ]);
          }
        })
        .catch((error) => { });
    }
  }, []);

  useEffect(() => {
    if (storeData.length > 0) {
      setStore(storeData[0]);
    }
  }, [storeData]);

  useEffect(() => {
    getStoreDropdownData();
  }, [getStoreDropdownData]);

  return (
    <>
      {/* <title>Order Dashboard</title> */}
      <title>{TitleNameHelper({ defaultTitleName: "Order Dashboard" })}</title>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto">
        {/* <div className="grid grid-cols-12 gap-6 max-w-3xl mx-auto mb-6">
          <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-6 bg-white shadow-lg rounded-md">
            <div className="text-center item-center block">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full max-w-full text-center">
                  <div className="p-3 font-semibold text-xl text-gray-700 border-b-2 border-neutral-200">
                    {TitleNameHelper({ defaultTitleName: "Orders" })}
                  </div>
                  {OrderTotalDetails?.map((TotalOrdersDetail, index) => {
                    return (
                      <div
                        key={index}
                        className="p-3 text-gray-700 uppercase  text-xs flex justify-between border-b border-neutral-200 last:border-b-0"
                      >
                        <Link to={"/admin/Order/orders"}>
                          <div>{TotalOrdersDetail.label}</div>
                        </Link>
                        <div>{TotalOrdersDetail.value}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* <div className="border border-t-2"></div> */}
        {/* Dropdown */}
        <div className="sm:flex sm:justify-between sm:items-center mb-4 sticky top-0 z-20 p-1 rounded-md bg-slate-100">
          <div className="col-span-full w-full flex flex-wrap justify-between items-center"></div>
          <div className="flex flex-wrap items-center gap-2">
            <Select
              className="w-[250px] bg-white font-semibold"
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
              defaultValue={store?.value}
              classNames={"w-[250px]"}
              options={storeData}
              isMulti={false}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2 ml-2">
            <Select
              className="w-[250px] bg-white font-semibold"
              options={DurationFilter}
              onChange={(e) => {
                setDropDownData(e.value);
                setDataFromDate(e.label);
              }}
              name="Duration Filter"
              defaultValue={DropDownData}
              isClearable={false}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 max-w-[1480px] mx-auto mb-6">
          {/* Synced Orders */}
          <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-3 bg-white shadow-lg rounded-md">
            <div className="text-center item-center block">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full max-w-full text-center">
                  {/* <Link to="/admin/Order/orders"> */}
                  <div className="p-3 font-semibold text-xl text-gray-700 border-b-2 border-neutral-200">
                    Orders Sync Details
                    <div className="text-sm">
                      Store :
                      <span className={"ml-1 text-sm text-orange-600"}>
                        {store?.label}
                      </span>
                      <span className={"ml-1 text-sm text-cyan-600"}>
                        ( {DataFromDate} )
                      </span>
                    </div>
                  </div>
                  {/* </Link> */}
                  {OrderSyncDetails?.map((TotalOrdersSyncDetail, index) => {
                    return (
                      <div
                        key={index}
                        className="p-3 text-gray-700 uppercase  text-xs flex justify-between border-b border-neutral-200 last:border-b-0"
                      >
                        <Link to={"/admin/Order/orders"}>
                          <div>{TotalOrdersSyncDetail.name}</div>
                        </Link>
                        <div>{TotalOrdersSyncDetail.count}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          {/* Orders Details */}
          {OrderData?.map((OrderDataDetail, index) => {
            return (
              <div
                className="flex flex-col col-span-full sm:col-span-6 xl:col-span-3 bg-white shadow-lg rounded-md"
                key={index}
              >
                <div className="text-center item-center block">
                  <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full text-center">
                      {/* <Link to="/admin/Order/orders"> */}
                      <div className="p-3 font-semibold text-xl text-gray-700 border-b-2 border-neutral-200">
                        {OrderDataDetail.name}
                        <div className="text-sm">
                          Store :
                          <span className={"ml-1 text-sm text-orange-600"}>
                            {store?.label}
                          </span>
                          <span className={"ml-1 text-sm text-cyan-600"}>
                            ( {DataFromDate} )
                          </span>
                        </div>
                      </div>
                      {/* </Link> */}
                      {OrderDataDetail.child?.map((childData, index) => {
                        return (
                          <div
                            key={index}
                            className="p-3 text-gray-700 uppercase  text-xs flex justify-between border-b border-neutral-200 last:border-b-0"
                          >
                            <Link to={"/admin/Order/orders"}>
                              <div>{childData.name}</div>
                            </Link>
                            <div>{childData.count}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {/*  This Month's sale Orders */}
          {ThisMonthData?.map((ThisMonthsDataDetail, index) => {
            return (
              <div
                className="flex flex-col col-span-full sm:col-span-6 xl:col-span-3 bg-white shadow-lg rounded-md"
                key={index}
              >
                <div className="text-center item-center block">
                  <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full text-center">
                      <div className="p-3 font-semibold text-xl text-gray-700 border-b-2 border-neutral-200">
                        {/* {ThisMonthsDataDetail.name} */}
                        Monthly Sales Details
                        <div className="text-sm text-orange-500">
                          {store.label}
                        </div>
                      </div>
                      {ThisMonthsDataDetail.child?.map(
                        (childMonthData, index) => {
                          return (
                            <div
                              key={index}
                              className="p-3 text-gray-700 uppercase  text-xs flex justify-between border-b border-neutral-200 last:border-b-0"
                            >
                              <Link to={"/admin/Order/orders"}>
                                <div>{childMonthData.name}</div>
                              </Link>
                              <div>
                                {childMonthData.name !== "Total Orders"
                                  ? CurrencySymbolByCode.USD
                                  : ""}
                                {childMonthData.count}
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {/*  Product Detail */}
          {ProductDetailsData?.map((ProductData, index) => {
            return (
              <div
                className="fflex flex-col col-span-full sm:col-span-6 xl:col-span-3 bg-white shadow-lg rounded-md"
                key={index}
              >
                <div className="text-center item-center block">
                  <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full text-center">
                      <div className="p-3 font-semibold text-xl text-gray-700 border-b-2 border-neutral-200">
                        {ProductData.name}
                        <div className="text-sm text-orange-500">
                          {store.label}
                        </div>
                      </div>
                      {ProductData.child?.map((childProductData, index) => {
                        return (
                          <div
                            key={index}
                            className="p-3 text-gray-700 uppercase  text-xs flex justify-between border-b border-neutral-200 last:border-b-0"
                          >
                            <Link to={"/admin/Order/orders"}>
                              <div>{childProductData.name}</div>
                            </Link>
                            <div>{childProductData.count}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-12 gap-6 max-w-full mx-auto mb-6">
          {/* Order Details */}
          <OrderSales
            PayingNonPayingCustomerData={PayingNonPayingCustomerData}
            Orders={Orders}
            CouPons={CouPons}
            PayingCustomerNonPayingCustomer={PayingCustomerNonPayingCustomer}
            OrderRevenueData={OrderRevenueData}
            OrdersData={OrdersData}
            CouPonsData={CouPonsData}
            setDataFromDate={setDataFromDate}
            DataFromDate={DataFromDate}
            setDropDownData={setDropDownData}
            DropDownData={DropDownData}
            store={store}
          />
        </div>

        <div className="grid grid-cols-12 gap-6 max-w-full mx-auto mb-6">
          <div className="flex flex-col col-span-full sm:col-span-3 xl:col-span-6 rounded-md">
            <OrderByState />
          </div>
          <div className="flex flex-col col-span-full sm:col-span-3 xl:col-span-6 rounded-md">
            <TotalSales
              DropDownData={DropDownData}
              DataFromDate={DataFromDate}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 max-w-full mx-auto mb-6">
          <div className="flex flex-col col-span-full sm:col-span-3 xl:col-span-4 rounded-md">
            <TopOrderByMarketPlace
              DataFromDate={DataFromDate}
              DropDownData={DropDownData}
            />
          </div>
          <div className="flex flex-col col-span-full sm:col-span-3 xl:col-span-8 rounded-md">
            <LastFewDaysReport
              title={"Customer Orders By Last 15 Days"}
              store={store}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 max-w-full mx-auto mb-6">
          <div className="flex flex-col col-span-full sm:col-span-3 xl:col-span-3 rounded-md">
            <TotalOrderDetailReport
              store={store}
              DataFromDate={DataFromDate}
              DropDownData={DropDownData}
            />
          </div>
          <div className="flex flex-col col-span-full sm:col-span-3 xl:col-span-3 rounded-md">
            <OrderSyncDetailsReport
              store={store}
              DataFromDate={DataFromDate}
              DropDownData={DropDownData}
            />
          </div>
          <div className="flex flex-col col-span-full sm:col-span-3 xl:col-span-3 rounded-md">
            <StoreTypeTotalOrders
              DropDownData={DropDownData}
              DataFromDate={DataFromDate}
            />
          </div>
          <div className="flex flex-col col-span-full sm:col-span-3 xl:col-span-3 rounded-md">
            <Top5Products
              user={user}
              company={company}
              store={store}
              AllStore={AllStore}
              DropDownData={DropDownData}
              DataFromDate={DataFromDate}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 max-w-full mx-auto mb-6">
          <div className="flex flex-col col-span-full sm:col-span-3 xl:col-span-12 rounded-md">
            <UncapuredOrders
              title={"Uncaptured Orders"}
              store={store}
              DataFromDate={DataFromDate}
              DropDownData={DropDownData}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 max-w-full mx-auto mb-6">
          <div className="flex flex-col col-span-full sm:col-span-3 xl:col-span-12 rounded-md">
            <OrderByCustomer
              title={"Order By Customer and Employee"}
              store={store}
              DropDownData={DropDownData}
              DataFromDate={DataFromDate}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
