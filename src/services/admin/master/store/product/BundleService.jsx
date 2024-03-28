import { API } from "helpers/API";

class BundleStoreService {

    getBundleProducts(productId) {
        return API.get(`/StoreProduct/getbundledetailsnew/${productId}.json`);
    }

}

const BundleStoreServiceCls = new BundleStoreService();

export default BundleStoreServiceCls;