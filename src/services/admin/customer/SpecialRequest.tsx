import { API } from "helpers/API";

class SpecialRequest {
  getSpecialRequest(Obj) {
    return API.post(`Customer/getallproductrequestlist.json`, Obj);
  }
}

const SpecialRequestCls = new SpecialRequest();

export default SpecialRequestCls;
