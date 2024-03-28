import { API } from "helpers/API";

class BundleService {

    getBundleProducts(bundleObj) {
        return API.post(`MasterProduct/getbundleproductsbyid.json`, bundleObj);
    }

}

const BundleServiceCls = new BundleService();

export default BundleServiceCls;