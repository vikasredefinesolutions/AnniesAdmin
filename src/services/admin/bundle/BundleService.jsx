import { API } from "helpers/API";

class BundleService {
  getBundles(bundleObj) {
    return API.post(`/StoreProductBundle/listwithoutsubrows.json`, bundleObj);
  }

  getBundleByID(id) {
    return API.get(`StoreProductBundle/get/${id}.json`);
  }

  updateBundles(bundleObj) {
    return API.post(`StoreProductBundle/update.json`, bundleObj);
  }
  updateStatus(bundleObj) {
    return API.post(`/StoreProductBundle/updatestatusbyid.json`, bundleObj);
  }
}

const BundleServiceCls = new BundleService();

export default BundleServiceCls;
