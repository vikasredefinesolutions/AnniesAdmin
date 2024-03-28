import { API } from "helpers/API";
class DropdownService {
  getDropdownValues(tableName, isFetchAll = false, storeId = 0) {
    return API.post(`/dropdown/table.json`, { table: tableName, isFetchAll, storeId });
  }
  getProductsBrands(productObj) {
    return API.post(`/StoreProductBrand/list.json`, productObj)
  }
  getProductsCategory(productObj) {
    return API.post(`/StoreProductCategory/list.json`, productObj)
  }
}

const DropdownServiceCls = new DropdownService();

export default DropdownServiceCls
