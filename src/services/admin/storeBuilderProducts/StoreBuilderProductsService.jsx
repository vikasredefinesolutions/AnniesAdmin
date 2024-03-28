import { API } from "helpers/API";

class StoreBuilderProductsService {
  getBrandsByStore(storeID) {
    return API.get(`/StoreProductBrand/getbranddetailsbystoreid/${storeID}.json`, {});
  }

  createTier(tierObj) {
    return API.post(`/TierMaster/create.json`, {
      tierMasterModel: tierObj,
    });
  }

  getTiersByStoreID(storeId, tierObj) {
    return API.get(`/TierMaster/gettierbystorename/${storeId}.json`, {
      tierMasterModel: tierObj,
    });

  }

  getTiersByCustomerID(customerId) {
    return API.get(`/TierMaster/gettierbycustomerstoreid/${customerId}.json`, {
    });
  }

  updateTier(tierObj) {
    // return API.post(`/TierMaster/update.json`, tierObj);
    return API.post(`/TierMaster/update.json`, {
      tierMasterModel: tierObj,
    });
  }

  updateTierById(args) {
    return API.post(`/TierMaster/updatestatusbyid.json`, {
      args,
    });
  }
}

const StoreBuilderProductsServiceCls = new StoreBuilderProductsService();

export default StoreBuilderProductsServiceCls;
