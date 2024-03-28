import { API } from "helpers/API";

class BundleProductsService {
  getBundleProducts(productId) {
      return API.get(`/StoreProductBundle/getbundleproducts/${productId}.json`);
  }
    
  createProduct(BundleProductObj) {
    return API.post(`StoreProductBundle/createupdatebundleproducts.json`,BundleProductObj);
  }

  updateStatus(BundleProductObj) {
    return API.post(`/StoreProductBundle/updatestatusbundleproductbyid.json`,BundleProductObj);
  }

  updateProductQuantity(Id, BundleObj) {
    return API.patch(`/StoreProductBundle/updatebundleproductspatch/${Id}.json`,BundleObj);
  }

  updateProductDisplayOrder(BundleObj) {
    return API.post(`/StoreProductBundle/updatebundlexproductdisplayorder.json`, BundleObj);
  }
}

const BundleProductsServiceCls = new BundleProductsService();

export default BundleProductsServiceCls;