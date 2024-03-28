import React, { useState, useEffect, Fragment } from "react";
import Tiles from "../../common/Tiles";
import DashboardWidgetServices from "services/admin/dashboardWidget/DashboardWidgetServices";

const Cards = ({ tilesVisible, DataFromDate, DropDownData }) => {
    const [CardsData, setCardsData] = useState([]);

    useEffect(() => {
        DashboardWidgetServices.getDashboardCountPageReport(DropDownData).then(
            (response) => {
                setCardsData(response.data.data);
            }
        );
    }, []);

    return (
        <>
            {/* <!-- Cards --> */}
            {CardsData.map((data, index) => {
                // if (tilesVisible("/admin/Content/Page")) {
                return (
                    <Fragment key={index}>
                        <Tiles
                            key={index}
                            title={data.count}
                            subTitle={data.name}
                            hoverTitle={data.name}
                            url={data.link}
                            Icon={() => (
                                <span className="material-icons-outlined text-gray-700 text-4xl">
                                    {data.menuIcon}
                                </span>
                            )}
                            // showFilterName={true}
                            DurationFilterName={DataFromDate}
                        />
                    </Fragment>
                );
                // }
            })}
        </>
    );
};
export default Cards;
