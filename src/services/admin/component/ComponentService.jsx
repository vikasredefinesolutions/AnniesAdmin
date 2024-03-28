import { API } from "helpers/API";

class ComponentService {
    getComponents() {
        return API.post(`/CmsComponents/list`)
    }
    createComponent(payload) {
        return API.post(`CmsComponents/create.json`, payload)
    }
}

const ComponentServiceCls = new ComponentService();

export default ComponentServiceCls;