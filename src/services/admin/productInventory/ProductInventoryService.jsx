import { API } from "helpers/API";

class ProductInventoryService {
  listInventory(listObj) {
    return API.post(`/StoreProduct/liststoreproductinventory.json`, listObj);
  }

  updateProductInventory(updateObj) {
    return API.post(
      `/StoreProductFutureInventory/updateinventorylistdata.json`,
      updateObj
    );
  }

  liststoreproductinventoryexport(Obj) {
    return API.post(`/StoreProduct/liststoreproductinventoryexport.json`, Obj);
  }

  productinventoryimport(obj) {
    return API.post(`StoreProduct/productinventoryimport.json`,obj);
  }
}

const ProductInventoryServiceCls = new ProductInventoryService();

export default ProductInventoryServiceCls;
