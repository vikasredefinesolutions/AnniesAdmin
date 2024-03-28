import { API } from "helpers/API";

class DashboardWidgetServices {
    getTopCustomers(DashboardWidgetObj) {
        return API.post(`/DashboardWidget/GetTopTenCustomerListReport.json`, DashboardWidgetObj);
    }
    getTopCustomersApplication(DashboardWidgetObj) {
        return API.post(`/DashboardWidget/GetTopTenCustomerApplicationRequestReport.json`, DashboardWidgetObj);
    }
    getTopTenMasterProductLowInventory(DashboardWidgetObj) {
        return API.post(`/DashboardWidget/GetTopTenMasterProductLowInventory.json`, DashboardWidgetObj);
    }
    getPageTitleReport(Obj) {
        return API.post(`/DashboardWidget/GetPageTitleReport.json`, Obj);
    }
    getMetaKeywordsReport(Obj) {
        return API.post(`/DashboardWidget/GetMetaKeywordsReport.json`, Obj);
    }
    getMetaDescriptionReport(Obj) {
        return API.post(`/DashboardWidget/GetMetaDescriptionReport.json`, Obj);
    }
    getDashboardCountPageReport() {
        return API.get(`/DashboardWidget/GetDashboardCountPageReport.json`);
    }
    getTopItemBySales(DashboardWidgetObj) {
        return API.post(`/DashboardWidget/GetTopTenItemsBySales.json`, DashboardWidgetObj);
    }
    getLastTenUpdatedPages(DashboardWidgetObj) {
        return API.post(`/DashboardWidget/GetTopTenUpdatedPages.json`, DashboardWidgetObj);
    }
    getTopTenVisitedPages(DashboardWidgetObj) {
        return API.post(`/DashboardWidget/GetTopTenVisitedPages.json`, DashboardWidgetObj);
    }

    getWidgetListByUserId(DashboardWidgetObj) {
        return API.post(`/Widget/getwidgetlistbyuserid.json`, DashboardWidgetObj);
    }

    createWidgetUserLink(DashboardWidgetObj) {
        return API.post(`/Widget/createwidgetuserlink.json`, DashboardWidgetObj);
    }

    changeSequence(DashboardWidgetObj) {
        return API.post(`/Widget/changesequence.json`, DashboardWidgetObj);
    }

}

const DashboardWidgetServicesCls = new DashboardWidgetServices();

export default DashboardWidgetServicesCls;
