import { API } from "helpers/API";

class SEOService {

    getSEOById(productId) {
        return API.get(`/StoreProductSeo/getseobyproductid/${productId}.json`);
    }

    createSEO(SEOobj) {
        return API.post(`/StoreProductSeo/create.json`, SEOobj);
    }

    updateSEO(SEOobj) {
        return API.post(`/StoreProductSeo/update.json`, SEOobj);
    }

    // getSeOh1toh6TagsDetailsById(productId) {
    //     return API.get(`/StoreProductSeo/getseoh1toh6tagsdetails/${productId}.json`);
    // }

    getSeOh1toh6TagsDetailsById(productId) {
        return API.get(`/StoreProductSeo/getseoh1toh6tagsdetailsvalidations/${productId}.json`);
    }

}

const SEOServiceCls = new SEOService();

export default SEOServiceCls;
