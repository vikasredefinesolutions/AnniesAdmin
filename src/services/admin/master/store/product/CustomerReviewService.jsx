import { API } from "helpers/API";

class CustomerReviewService {

    getProductReviewById(productId) {
        return API.get(`/StoreProduct/getproductreviews/${productId}.json`);
    }
    getBundleProducts(storeId) {
        return API.get(`/StoreProduct/getproductreviews/${storeId}.json`);
    }
}

const CustomerReviewServiceCls = new CustomerReviewService();

export default CustomerReviewServiceCls;
