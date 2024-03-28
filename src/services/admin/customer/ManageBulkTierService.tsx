import { API } from "helpers/API";

class ManageBulkTierService {
  getManageBulkTier(Obj) {
    return API.post(`/TierLog/list.json`, Obj);
  }
  updateManageBulkTier(Obj) {
    return API.post(`/TierLog/updatetierbatch.json`, Obj);
  }
}

const ManageBulkTierServiceCls = new ManageBulkTierService();

export default ManageBulkTierServiceCls;
