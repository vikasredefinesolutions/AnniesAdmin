/*Component Name: CirecleAndBarChart
Component Functional Details: User can create or update CirecleAndBarChart master details from here.
Created By: chandan
Created Date: <Creation Date>
Modified By: chandan
Modified Date: <Modified Date> */

import React, { useState, useEffect, useCallback } from 'react';
import DashboardWidgetServices from 'services/admin/dashboardWidget/DashboardWidgetServices';
import { RandomColors, anniesAnnualData } from 'global/Enum';
import CircleChart from '../reports/reports/Chart/CircleChart';
import { Tooltip } from "recharts";

const CirecleAndBarChart = ({ title, name, store, DataFromDate, DropDownData }) => {

    const [PageTitleReport, setPageTitleReport] = useState([]);
    const [MetaKeywordsReport, setMetaKeywordsReport] = useState([]);
    const [MetaDescriptionReport, setMetaDescriptionReport] = useState([]);
    const [PageTitleReportTotal, sePageTitleReportTotal] = useState("");
    const [MetaKeywordsReportTotal, setMetaKeywordsReportTotal] = useState("");
    const [MetaDescriptionReportTotal, setMetaDescriptionReportTotal] = useState("");

    const getPageTitleReport = () => {
        DashboardWidgetServices.getPageTitleReport({ storeId: [anniesAnnualData.storeId] }).then(
            (res) => {
                if (res.data.success && res?.data?.data) {
                    let data = res?.data?.data;
                    sePageTitleReportTotal(data?.total);
                    const updatedPageTitleArray = data?.dropDownViewModel.map(
                        (order, index) => {
                            order["color"] = RandomColors[index];
                            order["name"] = order.label;
                            order["value"] = Number(order.value);
                            return order;
                        }
                    );
                    setPageTitleReport(updatedPageTitleArray);
                }
            }
        );
    }

    const getMetaKeywordsReport = () => {
        DashboardWidgetServices.getMetaKeywordsReport({ storeId: [anniesAnnualData.storeId] }).then(
            (res) => {
                if (res.data.success && res?.data?.data) {
                    let data = res?.data?.data;
                    setMetaKeywordsReportTotal(data?.total);
                    const updatedMetaKeywordsArray = data?.dropDownViewModel.map(
                        (order, index) => {
                            order["color"] = RandomColors[index];
                            order["name"] = order.label;
                            order["value"] = Number(order.value);
                            return order;
                        }
                    );
                    setMetaKeywordsReport(updatedMetaKeywordsArray);
                }
            }
        );
    }

    const getMetaDescriptionReport = () => {
        DashboardWidgetServices.getMetaDescriptionReport({ storeId: [anniesAnnualData.storeId] }).then(
            (res) => {
                if (res.data.success && res?.data?.data) {
                    let data = res?.data?.data;
                    setMetaDescriptionReportTotal(data?.total);
                    const updatedMetaDescriptionArray = data?.dropDownViewModel.map(
                        (order, index) => {
                            order["color"] = RandomColors[index];
                            order["name"] = order.label;
                            order["value"] = Number(order.value);
                            return order;
                        }
                    );
                    setMetaDescriptionReport(updatedMetaDescriptionArray);
                }
            }
        );
    }

    useEffect(() => {
        getMetaKeywordsReport();
        getPageTitleReport();
        getMetaDescriptionReport();
    }, [])

    return (
        <>
            <div className="col-span-full lg:col-span-5 xl:col-span-4 flex h-full">
                <CircleChart
                    title={title}
                    data={name === "pageTitle" ? PageTitleReport : name === "metaKeywords" ? MetaKeywordsReport : name === "metaDescriptionReport" && MetaDescriptionReport}
                    lableValue={name === "pageTitle" ? PageTitleReportTotal : name === "metaKeywords" ? MetaKeywordsReportTotal : name === "metaDescriptionReport" && MetaDescriptionReportTotal}
                    labelText={"Total"}
                    DataFromDate={DataFromDate}
                    label={false}
                    SubDataClassName={"text-sm text-orange-600"}
                >
                    <Tooltip />
                </CircleChart>
            </div>
        </>
    );
};

export default CirecleAndBarChart;
