import { API } from "helpers/API";

class ProductService {
  lowInventory(lowInventoryObj) {
    return API.post(
      `/Reports/GetLowInventoryStatusReport.json`,
      lowInventoryObj
    );
  }
  exportLowInventory(Obj) {
    return API.post(`/Reports/exportlowinventoryproduct.json`, Obj);
  }
  productSummary(storeID) {
    return API.get(`/Reports/GetPorductSummaryStatusList/${storeID}.json`);
  }
  exportProductSummary(storeID) {
    return API.post(`/Reports/exportproductsummary.json?storeId=${storeID}`);
  }
  getTop100SellingProducts(Obj) {
    return API.post(`/Reports/gettophundredsellinglistproduct.json`, Obj);
  }
  exportTop100SellingProducts(Obj) {
    return API.post(`/Reports/ExportTopHundrdedSellingProduct.json`, Obj);
  }

  ProductStatusReport(Obj) {
    return API.post(`/Reports/productstatusreport.json`, Obj);
  }

  ExportWeeklyReport(Obj) {
    return API.post(`/Reports/getproductavailabilitycsv.json`, Obj);
  }
}

const ProductServiceCls = new ProductService();

export default ProductServiceCls;
