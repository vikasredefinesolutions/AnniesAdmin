import React from "react";
import { NavLink } from "react-router-dom";
import Table from "./Table";
import { TitleNameHelper } from "services/common/helper/Helper";
import { useSelector } from "react-redux";

const List = () => {
  const permission = useSelector(store => store.permission);
  return (
    <>
      {/* <title>Account Activity</title> */}
      <title>{TitleNameHelper({ defaultTitleName: `Account Activity` })}</title>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto">
        <div className="grid grid-cols-12 mb-10">
          <div className="col-span-full w-full flex justify-between mb-8">
            <h1 className="flex">
            {permission && permission.allPermission["/admin/settings/user"] ?
              <NavLink
                to="/admin/Settings/user"
                className="btn border-neutral-200 hover:border-neutral-400 text-gray-500 hover:text-gray-700 flex items-center mr-2"
              >
                <span className="material-icons-outlined">west</span>
              </NavLink> : ""}
              {/* <span className="text-2xl md:text-3xl text-gray-800 font-bold">
                Account Activity
              </span> */}
              <span className="text-2xl md:text-3xl text-gray-800 font-bold">
                {TitleNameHelper({ defaultTitleName: `Account Activity` })}

              </span>
            </h1>
          </div>
          <div className="col-span-full w-full bg-white shadow-xxl rounded-md mb-8 relative">
            <Table />
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
