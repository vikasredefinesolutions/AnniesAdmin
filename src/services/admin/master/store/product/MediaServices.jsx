import { API } from "helpers/API";

class MediaVideoServices {

    getMediaVideoData(productId) {
        return API.get(`/StoreProductAttributeVideos/getstoreproductattributevideosbyproductid/${productId}.json`);
    }

    getMediaVideoDataById(id) {
        return API.get(`/StoreProductAttributeVideos/getstoreproductattributevideosbyid/${id}.json`);
    }

    createMediaVideo(Obj) {
        return API.post(`/StoreProductAttributeVideos/create.json`, Obj)
    }

    updateMediaVideo(Obj) {
        return API.post(`/StoreProductAttributeVideos/update.json`, Obj)
    }

    MediaVideoDeleteById(Obj) {
        return API.post(`/StoreProductAttributeVideos/updatestatus.json`, Obj)
    }
}

const MediaVideoServicesCls = new MediaVideoServices();

export default MediaVideoServicesCls;
