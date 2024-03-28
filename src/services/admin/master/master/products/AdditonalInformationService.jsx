import { API } from "helpers/API";

class AdditionalInformationService {
  getStoreProductFilterCustomFields(productId, storeId) {
    return API.get(
      `/StoreProduct/GetStoreProductFilterCustomFields/${productId}/${storeId}.json`
    );
  }

  createUpdateStoreProductFilterCustomFields(obj) {
    return API.post(
      `/StoreProductFilterCustomFieldsMapping/createupdate.json`,
      obj
    );
  }
}

const AdditionalInformationServiceCls = new AdditionalInformationService();

export default AdditionalInformationServiceCls;
