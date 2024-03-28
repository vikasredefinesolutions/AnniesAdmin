import { API } from "helpers/API";

class WidgetModuleServices {
  getWidgetList(widgetObj) {
    return API.post(`/Widget/getwidgetlist.json`, widgetObj);
  }
  createWidgetServices(widgetObj) {
    return API.post(`/Widget/createwidgetmodulelink.json`, widgetObj);
  }
  getWidgetById(id) {
    return API.post(`/Widget/getwidgetbyid.json`, id);
  }

  deleteWidgetServices(widgetObj) {
    return API.post(`/Widget/updatestatusbyid.json`, widgetObj);
  }
}

const WidgetModuleServicesCls = new WidgetModuleServices();

export default WidgetModuleServicesCls
