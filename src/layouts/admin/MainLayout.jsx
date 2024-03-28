import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, useNavigate } from "react-router-dom";

import Routes from "routes/Routes";
import { logout } from "redux/auth/AuthAction";

import { scrollTop } from "services/common/helper/Helper";

// import DashBoardWidget from "components/admin/dashboardWidget/DashBoardWidget";
// import GoogleAnalytics from "components/admin/googleAnalytics/GoogleAnalytics";
import MasterCatalog from "components/admin/master/Routes";
import Configurator from "components/admin/configurator/Routes";
import IdleTimerContainer from "components/common/IdleTimer";
import Dashboard from "components/admin/dashbord/Dashboard";
import Promotions from "components/admin/promotions/Routes";
import StoresRoute from "components/admin/stores/Routes";
import Customer from "components/admin/customer/Routes";
import Settings from "components/admin/settings/Routes";
import Content from "components/admin/content/Routes";
import Order from "components/admin/order/Routes";
import ReportsRoutes from "components/admin/reports/Routes";

import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const company = useSelector((store) => store?.CompanyConfiguration);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logoutHandler = useCallback(() => {
    dispatch(logout());
    return navigate("/login", { replace: true });
  }, [dispatch, navigate]);

  useEffect(() => {
    scrollTop();
  }, [navigate]);

  return (
    <>
      <div className="flex h-screen overflow-hidden pk">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}

        />
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}

        />
        <div
          id="contentbody"
          className="relative w-full max-h-[calc(100%-4rem)] flex flex-col flex-1 overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-300 language-html top-16"
        >
          {company?.logoutTime &&
            localStorage.getItem("rememberMe") === "false" && (
              <IdleTimerContainer
                timeout={company?.logoutTime || 15}
                logout={logoutHandler}
              />
            )}
          <main>
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              {/* <Route path="analytics" element={<GoogleAnalytics />} /> */}
              <Route path="Settings/*" element={<Settings />} />
              <Route exact path="Customer/*" element={<Customer />} />
              <Route exact path="promotions/*" element={<Promotions />} />
              <Route exact path="Content/*" element={<Content />} />
              <Route exact path="master/*" element={<MasterCatalog />} />
              <Route exact path="configurator/*" element={<Configurator />} />
              <Route exact path="Order/*" element={<Order />} />
              <Route exact path="/stores/*" element={<StoresRoute />} />
              {/* <Route path="/eCommerceStore/dashboard" element={<DashBoard />} />
                <Route path="/corporateStore/dashboard" element={<CorporateDashboard />} /> */}

              <Route exact path="/store-setup/*" element={<Content />} />
              <Route exact path="/reports/*" element={<ReportsRoutes />} />
              {/* <Route exact path="/config/dashboardWidget" element={<DashBoardWidget />} /> */}
              {/* </Route> */}
            </Routes>
          </main>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
};
export default MainLayout;

