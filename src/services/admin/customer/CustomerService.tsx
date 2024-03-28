/*Component Name: CustomerService
Component Functional Details: User can create or update CustomerService master details from here.
Created By: Happy
Created Date: 01/06/22
Modified By: Shrey Patel
Modified Date: 12/23/2022 */

import { API } from "helpers/API";

class CustomerService {
  getCustomers(customerObj) {
    return API.post(`/Customer/list.json`, customerObj);
  }
  getCustomerById(id) {
    return API.get(`/Customer/get/${id}.json`);
  }
  createCustomer(customerObj) {
    return API.post(`/Customer/create.json`, customerObj);
  }
  updateCustomer(customerObj) {
    return API.post(`/Customer/update.json`, customerObj);
  }
  updateCustomerDefaultAddress(customerObj) {
    return API.post(`/Customer/setcustomeraddressdefault.json`, customerObj);
  }
  createAddress(customerObj) {
    return API.post(`/Customer/createaddress.json`, customerObj);
  }
  updateAddress(customerObj) {
    return API.post(`/CustomerAddress/updatecustomeraddress.json`, customerObj);
  }
  UpdatePassword(customerObj) {
    return API.post(`/Customer/updatecustomerpassword.json`, customerObj);
  }
  updateCustomerMainTier(customerObj) {
    return API.post(`/Customer/updatemaincustomrtier.json`, customerObj);
  }
  changeCustomerTaxStatus(customerObj) {
    return API.post(`/Customer/setcustomeristaxable.json`, customerObj);
  }
  updateStatus(customerObj) {
    return API.post(`/Customer/updatestatusbyid.json`, customerObj);
  }
  createPO(poInfo) {
    return API.post(`/Customer/createcustomerponumber.json`, poInfo);
  }
  getCustomerByCompanyId(companyobj) {
    return API.post(`Customer/getcustomerbycompanyid.json`, companyobj);
  }

  getPurchaseProductList(args) {
    return API.post(`/Customer/getpurchasedproductlistbycustomer.json`, args);
  }

  getAddedCartProduct(args) {
    return API.post(`/Customer/getaddedtocartpurchasedproductlistbycustomer.json`, args);
  }

  getViewedList(args) {
    return API.post(`/Customer/getViewedListbycustomerid.json`, args);
  }

  getWishListProduct(args) {
    return API.post(`/Customer/getwishlistpurchasedproductlistbycustomer.json`, args);
  }

  getCustomerLogoById(args) {
    return API.post(`/Customer/getcustomerlogobycustomerid.json`, args);
  }

  getCustomerCreditCardsById(CustomerId, OrderId) {
    return API.get(`/Customer/getcustomerpaymentoption/${CustomerId}/${OrderId}.json`);
  }

  getCustomerActionById(id) {
    return API.get(`/Customer/getcustomeraction/${id}.json`);
  }

  CreateCustomerNotes(customerObj) {
    return API.post(`/CustomerNotes/create.json`, customerObj);
  }

  getCustomerEmailSubscribeById(CustomerId) {
    return API.get(`/Customer/getcustomeremailsubscriber/${CustomerId}.json`);
  }

  delCustomerBillingAndShippingAddress(Obj) {
    return API.post(`/Customer/customeraddressupdatestatusbyids.json`, Obj);
  }

  getAbandonedShoppingCartByCustomerId(AbandonedCartObj) {
    return API.post(`/Customer/customerabandonedshoppingcart.json`, AbandonedCartObj);
  }

  getConsultationRequestByCustomerId(AbandonedCartObj) {
    return API.post(`/Customer/customerconsultationandproof.json`, AbandonedCartObj);
  }
  getDropdownCustomerNavId(storeIdObj) {
    return API.post(`/Customer/getcustomernavid.json`, storeIdObj)
  }

  getCustomerNavIdByMail(emailId) {
    return API.get(`/Customer/getnavcustomeridfromnav/${emailId}.json`)
  }

  changeCustomerPersonalizationStatus(CustomerId, PersonalizationFlag) {
    return API.get(`/Customer/updatecustomerpersonalizationflag/${CustomerId}/${PersonalizationFlag}.json`);
  }

  sendResetPasswordLink(storeId, email) {
    return API.get(`Customer/customersendresetpasswordlink/${storeId}/${email}.json`);
  };
}

const CustomerServiceCls = new CustomerService();

export default CustomerServiceCls;
