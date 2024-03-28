import { API } from "helpers/API";

class AttributeImageService {

    getAttributeImagesByID(AttributesObj) {
        return API.post(`/GrandMasterAttributeImageProduct/get.json`, AttributesObj);
    }

    createAttributeImages(AttributesObj) {
        return API.post(`/GrandMasterAttributeImageProduct/addupdate.json`, AttributesObj);
    }

    updateAttributeImages(AttributesObj) {
        return API.post(`/GrandMasterAttributeImageProduct/update.json`, AttributesObj);
    }
}

const AttributeImageServiceCls = new AttributeImageService();

export default AttributeImageServiceCls;
