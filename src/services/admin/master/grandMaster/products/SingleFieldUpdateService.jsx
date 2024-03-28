import { API } from "helpers/API";

class SingleFieldUpdateService {

    updateSingleField(productId, statusObj) {
        return API.patch(`/GrandMasterProduct/update/${productId}.json`, statusObj);
    }

}

const SingleFieldUpdateServiceCls = new SingleFieldUpdateService();

export default SingleFieldUpdateServiceCls;
