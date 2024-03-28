import React, { useState, useEffect, useCallback } from "react";
import ProductService from "services/admin/reports/product/productServices";
import { useDispatch } from "react-redux";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import Messages from "components/common/alerts/messages/Index";
import { RandomColors, anniesAnnualData } from "global/Enum";
import { NavLink } from "react-router-dom";
import CircleChart from "../Chart/CircleChart";
import { Tooltip } from "recharts";

const ProductSummary = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [total, setTotal] = useState("");

  const getProductSummaryReport = useCallback(() => {
    dispatch(setAddLoading(true));
    ProductService.productSummary(anniesAnnualData.storeId).then((res) => {
      if (res.data.success) {
        let data = res?.data?.data;
        setTotal(data?.total);
        const updatedProductSummaryArray = data?.dropDownViewModel.map(
          (order, index) => {
            order["color"] = RandomColors[index];
            order["name"] = order.label;
            order["value"] = Number(order.value);
            return order;
          }
        );
        setData(updatedProductSummaryArray);
      }
      dispatch(setAddLoading(false));
    });
  }, []);

  useEffect(() => {
    getProductSummaryReport();
  }, []);

  return (
    <>
      <title>Product Summary</title>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto">
        <div className="flex justify-between mb-8">
          <div className="flex items-center">
            <NavLink
              className="btn border-neutral-200 hover:border-neutral-400 text-gray-500 hover:text-gray-700 flex items-center mr-2"
              to={"/admin/reports"}
            >
              <span className="material-icons-outlined">west </span>
            </NavLink>
            <h1 className="text-2xl md:text-3xl text-gray-800 font-bold">
              Product Summary
            </h1>
          </div>
        </div>
        <Messages />
        <CircleChart
          title={"Product Summary"}
          data={data}
          lableValue={total}
          labelText={"Total Product"}
        >
          <Tooltip />
        </CircleChart>
      </div>
    </>
  );
};

export default ProductSummary;
