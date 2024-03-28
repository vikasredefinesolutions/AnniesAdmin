import React, { useState, useEffect } from "react";
import { widgetPageType } from "global/Enum"

import DashboardWidgetServices from "services/admin/dashboardWidget/DashboardWidgetServices";

import Tiles from "components/common/Tiles";

const DraftPages = ({ DataFromDate }) => {
  const [CardsData, setCardsData] = useState({});

  useEffect(() => {
    DashboardWidgetServices.getDashboardCountPageReport().then((response) => {
      let MyData = response.data.data.filter(
        (data) => data.name === widgetPageType["draftPages"]
      );
      setCardsData(...MyData);
    });
  }, []);

  return (
    <>
      <Tiles
        title={CardsData?.count}
        subTitle={CardsData?.name}
        hoverTitle={CardsData?.name}
        url={CardsData?.link}
        className={"shadow-lg rounded-md border-none"}
        Icon={() => (
          <span className="material-icons-outlined text-gray-700 text-4xl">
            {CardsData?.menuIcon}
          </span>
        )}
        // showFilterName={true}
        DurationFilterName={DataFromDate}
      />
    </>
  );
};
export default DraftPages;
