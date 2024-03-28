import { API } from "helpers/API";

class AttributeImageService {

    getAttributeImagesByID(AttributesObj) {
        return API.post(`/MasterAttributeImageProduct/get.json`, AttributesObj);
    }

    createAttributeImages(AttributesObj) {
        return API.post(`/MasterAttributeImageProduct/addupdate.json`, AttributesObj);
    }

    /* updateAttributeImages(AttributesObj) {
        return API.post(`/MasterAttributeImageProduct/update.json`, AttributesObj);
    } */
}

const AttributeImageServiceCls = new AttributeImageService();

export default AttributeImageServiceCls;
