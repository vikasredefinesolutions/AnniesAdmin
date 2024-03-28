/*Component Name: Dashboard
Component Functional Details: User can create or update Dashboard master details from here.
Created By: Shrey Patel
Created Date: 05/22/2023
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import React, { useState } from 'react';
import Cards from 'components/admin/dashboardWidget/Cards';
import { TitleNameHelper } from 'services/common/helper/Helper';
import { DurationFilter } from 'global/Enum';
import Select from 'components/common/formComponent/Select';
import TopUpdatedPages from "./../../dashboardWidget/TopUpdatedPages";
import TopVisitedPages from "./../../dashboardWidget/TopVisitedPages";
import CirecleAndBarChart from "./../../dashboardWidget/CirecleAndBarChart";

const Dashboard = () => {
    const [DropDownData, setDropDownData] = useState("1");
    const [DataFromDate, setDataFromDate] = useState("Last 24 Hours");

    return (
        <>
            <title>
                {TitleNameHelper({ defaultTitleName: "Dashboard Widget" })}{" "}
            </title>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto">
                <div className="flex flex-wrap justify-end mb-6 gap-2 sticky top-0 z-20 pb-2 pt-2 bg-slate-100 ">
                    <div className="flex flex-wrap items-center gap-2">
                        <Select
                            className="w-[250px] font-semibold"
                            options={DurationFilter}
                            onChange={(e) => {
                                setDropDownData(e.value);
                                setDataFromDate(e.label);
                            }}
                            name="recStatus"
                            defaultValue={DropDownData}
                            isClearable={false}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-6 mb-6">
                    <Cards
                        DropDownData={DropDownData}
                        DataFromDate={DataFromDate}
                    />
                </div>
                <div className="grid grid-cols-12 gap-6 mb-6">
                    <TopUpdatedPages
                        DropDownData={DropDownData}
                        DataFromDate={DataFromDate}
                    />

                    <TopVisitedPages
                        DropDownData={DropDownData}
                        DataFromDate={DataFromDate}
                    />
                </div>
                <div className="grid grid-cols-12 gap-6 mb-6">
                    <CirecleAndBarChart
                        title={"Page Title"}
                        name={"pageTitle"}
                        DropDownData={DropDownData}
                        DataFromDate={DataFromDate}
                    />
                    <CirecleAndBarChart
                        title={"Meta Keywords"}
                        name={"metaKeywords"}
                        DropDownData={DropDownData}
                        DataFromDate={DataFromDate}
                    />
                    <CirecleAndBarChart
                        title={"Meta Description"}
                        name={"metaDescriptionReport"}
                        DropDownData={DropDownData}
                        DataFromDate={DataFromDate}
                    />
                </div>
            </div>
        </>
    );
};

export default Dashboard;
