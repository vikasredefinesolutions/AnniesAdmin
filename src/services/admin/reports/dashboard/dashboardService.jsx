import { API } from "helpers/API";

class DashboardService {
  getOrderReport(id) {
    return API.get(`/OrderReports/GetOrderReportListByStoreId/${id}.json`);
  }
  getCustomerOrderReport(id) {
    return API.get(`/OrderReports/getcustomerorderreportlistbystoreid/${id}.json`);
  }
  getProductStatusReport(id) {
    return API.get(`/Reports/GetPorductStatusListReport/${id}.json`);
  }
  getProductNavSyncStatusReport(id) {
    return API.post(`/Reports/GetProductNAVSyncStatusReport/${id}`);
  }
  getTopTenBrand(Obj) {
    return API.post(`/Reports/GetTopTenBrandStatusReport`, Obj);
  }
  getProductReadyScoreReport(id) {
    return API.get(`/Reports/GetProductReadyScoreListByStoreId/${id}.json`);
  }
}

const DashboardServiceCls = new DashboardService();

export default DashboardServiceCls;
