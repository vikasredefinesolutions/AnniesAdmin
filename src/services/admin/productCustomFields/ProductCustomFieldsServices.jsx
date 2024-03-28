import { API } from "helpers/API";

class ProductCustomFieldsServices {
  getProductCustomFieldsList(listObj) {
    return API.post(`/MasterFilterCustomFields/list.json`, listObj);
  }

  updateStatus(statusObj) {
    return API.post(
      `/MasterFilterCustomFields/updatestatusbyid.json`,
      statusObj
    );
  }

  updateMultipleStatus(statusObj) {
    return API.post(
      `/MasterFilterCustomFields/multipleupdatestatusbyids.json`,
      statusObj
    );
  }

  createProductCustomFields(createObj) {
    return API.post(`/MasterFilterCustomFields/create.json`, createObj);
  }
  updateProductCustomFields(updateObj) {
    return API.post(`/MasterFilterCustomFields/update.json`, updateObj);
  }

  getProductCustomFieldsById(id) {
    return API.get(`/MasterFilterCustomFields/get/${id}.json`);
  }

  getCustomFieldList(id) {
    return API.get(`/MasterFilterCustomFieldsValue/getmasterfiltercustomfieldsvaluebymasterfiltercustomfieldsid/${id}.json`);
  }

  createCustomFieldsValue(createCustom) {
    return API.post(`/MasterFilterCustomFieldsValue/create.json`, createCustom);
  }

  getCustomFieldValueById(id) {
    return API.get(`/MasterFilterCustomFieldsValue/get/${id}.json`);
  }

  updateustomFieldsValue(updateObj) {
    return API.post(`/MasterFilterCustomFieldsValue/update.json`, updateObj);
  }

  deleteMasterFilterCustomFieldsValue(deleteObj) {
    return API.post(
      `/MasterFilterCustomFieldsValue/updatestatusbyid.json`,
      deleteObj
    );
  }
}

const ProductCustomFieldsServicesCls = new ProductCustomFieldsServices();

export default ProductCustomFieldsServicesCls;
