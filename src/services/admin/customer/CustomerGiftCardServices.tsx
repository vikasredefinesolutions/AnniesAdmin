import { API } from "helpers/API";

class CustomerGiftCardService {
  getCustomerGiftCard(CustomerObj) {
    return API.post("/GiftCardCustomer/list.json", CustomerObj);
  }
  getByIdCustomerGiftCard(id) {
    return API.get(`/GiftCardCustomer/getbyid/${id}.json`);
  }
  updateCustomerGiftCard(CustomerObj) {
    return API.post(`/GiftCardCustomer/update.json`, CustomerObj);
  }
  createCustomerGiftCard(CustomerObj) {
    return API.post(`/GiftCardCustomer/create.json`, CustomerObj);
  }
  updateCustomerGiftCardStatus(CustomerObj) {
    return API.post(`/GiftCardCustomer/updatestatus.json`, CustomerObj);
  }
}

const CustomerGiftCardServiceCls = new CustomerGiftCardService();

export default CustomerGiftCardServiceCls;
