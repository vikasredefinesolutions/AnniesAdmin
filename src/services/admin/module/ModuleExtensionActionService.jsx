import { API } from "helpers/API";

class ModuleExtensionActionService {
  createExtensionAction(extensionActionObj) {
    return API.post(`/ModuleExtensionAction/create.json`, extensionActionObj);
  }

  getExtensionActionById(id) {
    return API.post(`/ModuleExtensionAction/list/${id}.json`);
  }

  updateExtensionAction(extensionActionObj) {
    return API.post(`/ModuleExtensionAction/update.json`, extensionActionObj);
  }
  updateStatus(extensionActionObj) {
    return API.post(
      `ModuleExtensionAction/updatestatusbyid.json`,
      extensionActionObj
    );
  }
}

const ModuleExtensionActionServiceCls = new ModuleExtensionActionService();

export default ModuleExtensionActionServiceCls;
