import { API } from "helpers/API";

import { __DefaultListSchema } from "typeDefination/services/servicesCommon/defaultType"
import { __CreateUpdateBrand, __UpdateBrandStatusById } from "typeDefination/services/brandType"

class BrandService {
  getBrands(brandObj: __DefaultListSchema) {
    return API.post(`/Brand/list.json`, brandObj);
  }
  createBrand(brandObj: __CreateUpdateBrand) {
    return API.post(`/Brand/create.json`, brandObj);
  }
  getBrandById(id: number) {
    return API.get(`/Brand/get/${id}.json`);
  }
  updateBrand(brandObj: __CreateUpdateBrand) {
    return API.post(`/Brand/update.json`, brandObj);
  }
  updateStatus(brandObj: __UpdateBrandStatusById) {
    return API.post(`/Brand/updatestatusbyid.json`, brandObj);
  }
  updateMultipleStatus(brandObj) {
    return API.post(`/Brand/multipleupdatestatusbyids.json`, brandObj);
  }
  createUpdateBrandVendors(brandObj) {
    return API.post(`/Brand/createandupdatevendors.json`, brandObj);
  }
  getactiveinactivecount(id: number) {
    return API.get(`/Brand/getactiveinactivecount/${id}.json`);
  }
  getsaleschannelstoresId(id: number) {
    return API.get(`/Brand/getsaleschannelstores/${id}.json`);
  }

  getMultipleVendorsWiseBrandForMaster(brandObj) {
    return API.post(`Brand/getmulltiplevendorwisebrandformaster.json`, brandObj);
  }
}

const BrandServiceCls = new BrandService();

export default BrandServiceCls;
