import { API } from "helpers/API";

class StatusService {
    getAllStatus(statusObj) {
        return API.post(`/Status/list.json`, statusObj);
    }
}

const StatusServiceCls = new StatusService();

export default StatusServiceCls;