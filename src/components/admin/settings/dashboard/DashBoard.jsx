import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAddLoading } from "redux/globalLoader/GlobalLoaderAction";
import SettingDashboardServices from "services/admin/settingDasboard/SettingDashboardServices";
import ModuleWiseUserReport from "./ModuleWiseUserReport";
import { TitleNameHelper } from "services/common/helper/Helper";

const DashBoard = () => {
  const User = useSelector((Store) => Store?.user?.id);

  const dispatch = useDispatch();

  const [UserData, setUserData] = useState({});
  const [RolesData, setRolesData] = useState({});
  const [ModulesData, setModulesData] = useState(null);

  const getMasterProductData = useCallback((pageIndex) => {
    dispatch(setAddLoading(true));

    SettingDashboardServices.getSettingDashboardUser({})
      .then((UserData) => {
        if (UserData.data.success) {
          setUserData(UserData?.data?.data);
        }

        dispatch(setAddLoading(false));
      })
      .catch((error) => {
        dispatch(setAddLoading(false));
      });
  }, []);

  useEffect(() => {
    getMasterProductData();
    SettingDashboardServices.getsettingDashboardroles({})
      .then((RolesData) => {
        if (RolesData?.data?.success) {
          setRolesData(RolesData.data.data);
        }
      })
      .catch((error) => { });
  }, []);

  useEffect(() => {
    SettingDashboardServices.getsettingDashboarmodules(User)
      .then((ModulesData) => {
        if (ModulesData?.data?.success && ModulesData?.data?.data) {
          setModulesData(ModulesData.data.data.dropDownViewModel);
        }
      })
      .catch((error) => { });
  }, [User]);

  useEffect(() => {
    getMasterProductData();
  }, []);

  return (
    <>
      <title>{TitleNameHelper({ defaultTitleName: "Settings Dashboard" })}</title>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto">
        <div className="grid grid-cols-12 gap-6 max-w-3xl mx-auto mb-6">
          {/* Users */}
          <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-6 bg-white shadow-lg rounded-md">
            <div className="text-center item-center block">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full max-w-full text-center">
                  <Link to="/admin/Settings/user">
                    <div className="p-3 font-semibold text-xl text-gray-700 border-b-2 border-neutral-200">
                      Users
                    </div>
                  </Link>
                  <div className="p-3 text-gray-700 uppercase text-xs flex justify-between border-b border-neutral-200 last:border-b-0">
                    <Link to="/admin/Settings/user">
                      <div>Active</div>
                    </Link>
                    <div>{UserData?.activeUser?.count}</div>
                  </div>
                  <div className="p-3 text-gray-700 uppercase text-xs flex justify-between border-b border-neutral-200 last:border-b-0">
                    <Link to="/admin/Settings/user">
                      <div>InActive</div>
                    </Link>
                    <div>{UserData?.inActiveUser?.count}</div>
                  </div>
                  <div className="p-3 text-gray-700 uppercase text-xs flex justify-between border-b border-neutral-200 last:border-b-0">
                    <Link to="/admin/Settings/user">
                      <div>Total</div>
                    </Link>
                    <div>{UserData?.totalUser?.count}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Roles */}
          <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-6 bg-white shadow-lg rounded-md">
            <div className="text-center item-center block">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full max-w-full text-center">
                  <Link to="/admin/Settings/roles">
                    <div className="p-3 font-semibold text-xl text-gray-700 border-b-2 border-neutral-200">
                      Roles
                    </div>
                  </Link>
                  <div className="p-3 text-gray-700 uppercase text-xs flex justify-between border-b border-neutral-200 last:border-b-0">
                    <Link to="/admin/Settings/roles">
                      <div>Active</div>
                    </Link>
                    <div>{RolesData?.activeRole?.count}</div>
                  </div>
                  <div className="p-3 text-gray-700 uppercase text-xs flex justify-between border-b border-neutral-200 last:border-b-0">
                    <Link to="/admin/Settings/roles">
                      <div>InActive</div>
                    </Link>
                    <div>{RolesData?.inActiveRole?.count}</div>
                  </div>
                  <div className="p-3 text-gray-700 uppercase text-xs flex justify-between border-b border-neutral-200 last:border-b-0">
                    <Link to="/admin/Settings/roles">
                      <div>Total</div>
                    </Link>
                    <div>{RolesData?.totalRole?.count}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 max-w-full mx-auto mb-6">
          {/*User Wise Modules*/}
          <div className="flex flex-col col-span-full xl:col-span-2"></div>
          <div className="flex flex-col col-span-full xl:col-span-4 bg-white shadow-lg rounded-md">
            <div className="text-center item-center block">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full max-w-full text-center">
                  <div className="p-3 font-semibold text-xl text-gray-700 border-b-2 border-neutral-200">
                    <div>Modules Wise User </div>
                  </div>
                  <div className="p-3 text-gray-700 uppercase font-bold text-xs flex justify-between border-b border-neutral-200 last:border-b-0">
                    <div className="text-gray-400"> Module Name</div>
                    <div className="text-gray-400"> Users </div>
                  </div>
                  {ModulesData?.map((value, index) => (
                    <div
                      className="p-3 text-gray-700 uppercase text-xs flex justify-between border-b border-neutral-200 last:border-b-0"
                      index={index}
                    >
                      <div> {value?.label}</div>
                      <div> {value?.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col col-span-full xl:col-span-4">
            <ModuleWiseUserReport />
          </div>
          <div className="flex flex-col col-span-full xl:col-span-2"></div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
