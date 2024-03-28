import { API } from "helpers/API";

class SettingDashboardServices {
  getSettingDashboardUser(SetObj) {
    return API.get(`/SettingDashboardReport/getuserdata.json`, SetObj);
  }
  getsettingDashboardroles(SetObj) {
    return API.get(`/SettingDashboardReport/getuserroledata.json`, SetObj);
  }
  getsettingDashboarmodules(UserId) {
    return API.get(`/SettingDashboardReport/getmodulewiseuser/${UserId}.json`);
  }
}

const SettingDashboardServicesCls = new SettingDashboardServices();

export default SettingDashboardServicesCls;
