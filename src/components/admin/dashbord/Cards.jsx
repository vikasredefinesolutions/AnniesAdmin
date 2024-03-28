import React, { Fragment } from "react";
import { useSelector } from "react-redux";

import { DasshboardData } from "global/Enum";
import { MenuNameReturner } from "services/common/helper/Helper";

import Tiles from "../../common/Tiles";

const Cards = ({ tilesVisible }) => {
  const MenuListByUserRoleReducers = useSelector((store) => store?.MenuListByUserRoleReducers);
  return (
    <>
      {/* <!-- Cards --> */}
      {DasshboardData.map((data, index) => {
        if (tilesVisible(data?.url)) {
          return (
            <Fragment key={index}>
              <Tiles
                key={index}
                colspan={"sm:col-span-2 xl:col-span-2"}
                title={MenuNameReturner(MenuListByUserRoleReducers, "codeName", data.codeName)[0]?.name}
                subTitle={data.subTitle}
                url={data.url}
                hoverTitle={data.title}
                Icon={() => (
                  <span className="material-icons-outlined text-gray-700 text-4xl">
                    {data.Icon}
                  </span>
                )}
              />
            </Fragment>
          );
        } else {
          <Fragment key={index}></Fragment>
        }
      })}
    </>
  );
};
export default Cards;
