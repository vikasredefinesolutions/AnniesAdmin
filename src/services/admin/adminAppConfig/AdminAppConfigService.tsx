import { PublicAPI } from "helpers/API";

class AdminAppConfigService {

  getAdminAppConfiguration() {
    return PublicAPI.get(`AdminAppConfig/getadminconfig.json`);
  }
}

const AdminAppConfigServiceCls = new AdminAppConfigService();

export default AdminAppConfigServiceCls;
