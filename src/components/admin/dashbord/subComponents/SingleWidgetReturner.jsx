/*Component Name: SingleWidgetReturner
Component Functional Details: User can create or update SingleWidgetReturner master details from here.
Created By: chandan
Created Date: <Creation Date>
Modified By: chandan
Modified Date: <Modified Date> */

import React, { useCallback } from 'react';

import ProductNavSyncStatusReport from 'components/admin/reports/reports/common/ProductNavSyncStatusReport';
import OrderReport from 'components/admin/reports/reports/common/OrderReport';
import CustomerOrderReport from 'components/admin/reports/reports/common/CustomerOrderReport';
import ProductStatusReport from 'components/admin/reports/reports/common/ProductStatusReport';
import ModuleWiseUserReport from 'components/admin/settings/dashboard/ModuleWiseUserReport';
import TotalOrderDetailReport from 'components/admin/order/dashBoard/TotalOrderDetailReport';
import OrderSyncDetailReport from "components/admin/order/dashBoard/OrderSyncDetailReport";
import CustomerReviewReport from "components/admin/customer/dashBoard/CustomerReviewsReport";
import ProductReadyScore from "components/admin/reports/reports/common/ProductReadyScore";
import TopTenBrand from 'components/admin/reports/reports/common/TopTenBrand';
import StoretypetTotalOrder from 'components/admin/order/dashBoard/StoreTypeTotalOrders';
import Top5orderedProducts from 'components/admin/order/dashBoard/Top5Products';
import TotalSales from 'components/admin/order/dashBoard/TotalSales'

import TopCustomerApplicationRequest from "../../dashboardWidget/TopCustomerApplicationRequest";
import TopOrderByMarketPlace from "../../order/dashBoard/TopOrderByMarketPlace";
import TopItemsLowInventory from '../../dashboardWidget/TopItemsInventory';
import TopTenItemsBySales from "../../dashboardWidget/TopTenItemsBySales";
import CirecleAndBarChart from "../../dashboardWidget/CirecleAndBarChart";
import CustomerByState from "./../../customer/dashBoard/CustomerByState";
import TopTenVisitedPages from '../../dashboardWidget/TopVisitedPages';
import TopTenUpdatedPages from '../../dashboardWidget/TopUpdatedPages';
import UncapuredOrders from "./../../order/dashBoard/UncapuredOrders";
import TopTenCustomers from "../../dashboardWidget/TopTenCustomers";
import PublishedPages from "./PublishedPages";
import OrdersByStore from "../OrdersByStore";
import LastTenOrders from "../LastTenOrders";
import OrderByState from "../OrderByState";
import SecurePages from "./SecurePages";
import DraftPages from "./DraftPages";
import TotalPages from "./TotalPages";
import TopStore from "../TopStore";

const SingleWidgetReturner = ({ item, provided, DashBoardWidgets, store, AllStore, extraDataFromDate, extraDropDownData }) => {

    const ourComponent = useCallback({
        "ordersbystore": () => <OrdersByStore store={store} DataFromDate={extraDataFromDate} DropDownData={extraDropDownData} />,
        "ordersbystate": OrderByState,
        "top5stores": TopStore,
        "draftpages": () => <DraftPages DataFromDate={extraDataFromDate} DropDownData={extraDropDownData} />,
        "totalpages": () => <TotalPages DataFromDate={extraDataFromDate} DropDownData={extraDropDownData} />,
        "publishedpages": () => <PublishedPages DataFromDate={extraDataFromDate} DropDownData={extraDropDownData} />,
        "securepages": () => <SecurePages DataFromDate={extraDataFromDate} DropDownData={extraDropDownData} />,
        "last10orders": () => <LastTenOrders store={store} DataFromDate={extraDataFromDate} DropDownData={extraDropDownData} />,
        "top10customer": () => <TopTenCustomers store={store} DataFromDate={extraDataFromDate} DropDownData={extraDropDownData} />,
        "top10customerapplicationrequest": () => <TopCustomerApplicationRequest store={store} DataFromDate={extraDataFromDate} DropDownData={extraDropDownData} />,
        "top10itemsbysales": () => <TopTenItemsBySales store={store} AllStore={AllStore} DataFromDate={extraDataFromDate} DropDownData={extraDropDownData} />,
        "pagetile": () => <CirecleAndBarChart title={"Page Title"} name={"pageTitle"} DashBoardWidgets={DashBoardWidgets} store={store} DataFromDate={extraDataFromDate} DropDownData={extraDropDownData} />,
        "metakeywords": () => <CirecleAndBarChart title={"Meta Keywords"} name={"metaKeywords"} DashBoardWidgets={DashBoardWidgets} store={store} DataFromDate={extraDataFromDate} DropDownData={extraDropDownData} />,
        "metadescription": () => <CirecleAndBarChart title={"Meta Description"} name={"metaDescriptionReport"} DashBoardWidgets={DashBoardWidgets} store={store} DataFromDate={extraDataFromDate} DropDownData={extraDropDownData} />,
        "toporderbymarketplace": () => <TopOrderByMarketPlace stickyShow={true} DropDownData={extraDropDownData} DataFromDate={extraDataFromDate} />,
        "top10visitedpages": () => <TopTenVisitedPages store={store} DropDownData={extraDropDownData} DataFromDate={extraDataFromDate} />,
        "last10updatedpages": () => <TopTenUpdatedPages store={store} DropDownData={extraDropDownData} DataFromDate={extraDataFromDate} />,
        // "top10itemssearched": TopItemsSearched,
        "top10itemslowinventory": () => <TopItemsLowInventory DropDownData={extraDropDownData} DataFromDate={extraDataFromDate} />,
        "productnavsyncstatusreport": () => <ProductNavSyncStatusReport store={store} />,
        "orderreport": () => <OrderReport store={store} />,
        "customerorderreport": () => <CustomerOrderReport store={store} />,
        "productstatusreport": () => <ProductStatusReport store={store} />,
        "modulewiseuserreport": ModuleWiseUserReport,
        "orderdetails": () => <TotalOrderDetailReport store={store} DataFromDate={extraDataFromDate} DropDownData={extraDropDownData} />,
        "ordersynceddetails": () => < OrderSyncDetailReport showInMainDashboard={true} store={store} DataFromDate={extraDataFromDate} DropDownData={extraDropDownData} />,
        "latestreviews": () => <CustomerReviewReport showInMainDashboard={true} store={store} extraDataFromDate={extraDataFromDate} extraDropDownData={extraDropDownData} />,
        "productreadyscore": () => <ProductReadyScore store={store} />,
        "toptenbrands": () => <TopTenBrand store={store} />,
        "storetypetotalorder": () => <StoretypetTotalOrder showInMainDashboard={true} extraDataFromDate={extraDataFromDate} extraDropDownData={extraDropDownData} />,
        "top5orderedproducts": () => <Top5orderedProducts showInMainDashboard={true} store={store} AllStore={AllStore} extraDataFromDate={extraDataFromDate} extraDropDownData={extraDropDownData} />,
        "totalsales": () => <TotalSales showInMainDashboard={true} extraDataFromDate={extraDataFromDate} extraDropDownData={extraDropDownData} />,
        "uncapturedorders": () => <UncapuredOrders title={"Uncaptured Orders"} showInMainDashboard={true} store={store} DataFromDate={extraDataFromDate} DropDownData={extraDropDownData} />,
        "customerbystate": () => <CustomerByState showInMainDashboard={true} />
    }, [store, AllStore, extraDataFromDate, extraDropDownData])

    let Component = ourComponent[`${item.codeName}`]

    if (!Component) {
        Component = OurTempComponet(`${item.codeName}`, `*we are still working on this`);
    }

    return (
        <>
            <div className="item w-full max-h-[500px] min-h-[160px] overflow-scroll overflow-x-hidden scrollbar-thin shadow-lg rounded-none h-full"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
                {
                    Component && <Component />
                }
            </div>
        </>
    );
};


const OurTempComponet = (name, status) => {
    return () => <>
        <h1 className="p-4 break-all w-full">{name}</h1>
        <h2 className='p-2 break-all w-full text-red-200'>{status}</h2>
    </>
}


export default SingleWidgetReturner;


