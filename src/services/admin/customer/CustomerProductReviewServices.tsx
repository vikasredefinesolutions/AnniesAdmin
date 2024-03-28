import { API } from "helpers/API";

class CustomerReview {
  getCustomerReview(Obj) {
    return API.post(`/Customer/getcustomerreviewlist.json`, Obj);
  }
}

const SpecialRequestCls = new CustomerReview();

export default SpecialRequestCls;