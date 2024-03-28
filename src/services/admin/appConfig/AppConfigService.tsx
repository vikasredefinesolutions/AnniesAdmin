import { API } from "helpers/API";

import { __DefaultListSchema } from "typeDefination/services/servicesCommon/defaultType"
import { __AppConfigUpdateStatusById, __AppConfigModel } from "typeDefination/services/appConfigType"


class AppConfigService {
    getAppConfig(obj: __DefaultListSchema) {
        return API.post(`/AppConfig/list.json`, obj);
    }
    updateStatus(obj: __AppConfigUpdateStatusById) {
        return API.post(`/AppConfig/updatestatusbyid.json`, obj);
    }
    createUpdateAppConfig(obj: __AppConfigModel) {
        if (obj?.id) {
            return API.post(`/AppConfig/update.json`, { appConfigModel: obj });
        }
        return API.post(`/AppConfig/create.json`, { appConfigModel: obj });
    }
    getAppConfigById(id: number) {
        return API.post(`/AppConfig/get.json?id=${id}`);
    }
}

const AppConfigServiceCls = new AppConfigService();

export default AppConfigServiceCls;