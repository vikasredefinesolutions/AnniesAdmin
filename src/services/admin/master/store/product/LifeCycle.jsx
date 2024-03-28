import { API } from "helpers/API";

class LifeCycleService {

    getLifecycleData(LifeCycleObj) {
        return API.post(`/StoreProduct/getstoreproductlifecyclelist.json`, LifeCycleObj);
    }
}

const LifeCycleServiceCls = new LifeCycleService();

export default LifeCycleServiceCls;
