import { API } from "helpers/API";

class ProductService {

    getStoreProducts(BundleObj) {
        return API.post('/StoreProductBundle/list.json', BundleObj)
    }

    getBundleProductById(productId) {
        return API.get(`/StoreProductBundle/get/${productId}.json`);
    }

    createProduct(BundleObj) {
        return API.post(`/StoreProductBundle/create.json`, BundleObj);
    }

    // updateBundleProduct(BundleObj) {
    //     return API.post(`/Bundle/updatebasicinfo.json`, BundleObj);
    // }

    updateStoreProductPricing(BundleObj) {
        return API.post(`/StoreProductBundle/updatepricing.json`, BundleObj);
    }

    updateProductOtherFields(Id, BundleObj) {
        return API.patch(`StoreProductBundle/update/${Id}.json`, BundleObj);
    }

    // getSKUList(productId) {
    //     return API.get(`/Bundle/getlistoursku/${productId}.json`);
    // }

    updateProduct(BundleObj) {
        return API.post(`/StoreProductBundle/updatebasicinfo.json`, BundleObj);
    }

    updateProductPricing(BundleObj) {
        return API.post(`/StoreProductBundle/updatepricing.json`, BundleObj);
    }

    updateStatus(brandObj) {
        return API.post(`/StoreProductBundle/updatestatusbyid.json`, brandObj);
    }
}

const ProductServiceCls = new ProductService();

export default ProductServiceCls;
