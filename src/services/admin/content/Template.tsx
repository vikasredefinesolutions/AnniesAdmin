import { API } from "helpers/API";

class TemplateService {
  getComponents(categoryObj: any) {
    return API.post(`/Category/list.json`, categoryObj);
  }
}

const TemplateServiceCls = new TemplateService();

export default TemplateServiceCls;
