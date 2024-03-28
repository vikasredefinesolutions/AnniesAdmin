import { API } from "helpers/API";

class ProductReadinessService {
  getShippingWeightAndUnitsList(PRObj) {
    return API.post(`/ShippingRatesPlantsWeightMaster/list.json`, PRObj);
  }

  createShippingWeightAndUnits(PRObj) {
    return API.post(`/ShippingRatesPlantsWeightMaster/create.json`, PRObj);
  }

  getShippingWeightAndUnitsById(id) {
    return API.get(`/ShippingRatesPlantsWeightMaster/getshippingratesplantsweightmasterbyid/${id}.json`);
  }

  updateShippingWeightAndUnits(PRObj) {
    return API.post(`/ShippingRatesPlantsWeightMaster/update.json`, PRObj);
  }

  updateStatus(PRObj) {
    return API.post(`ShippingRatesPlantsWeightMaster/updatestatus.json`, PRObj);
  }

  updateMultipleStatus(PRObj) {
    return API.post(`/ShippingRatesPlantsWeightMaster/multipleupdatestatus.json`, PRObj);
  }
}

const ProductReadinessServiceCls = new ProductReadinessService();

export default ProductReadinessServiceCls;
