import { API } from "helpers/API";

class ProductReadinessService {
  getShippingWeightAndUnitsDetailsList(PRObj) {
    return API.post(`/ShippingRatesPlantsWeightDetails/list.json`, PRObj);
  }

  createShippingWeightAndUnitsDetails(PRObj) {
    return API.post(`/ShippingRatesPlantsWeightDetails/create.json`, PRObj);
  }

  getShippingWeightAndUnitsDetailsById(id) {
    return API.get(`/ShippingRatesPlantsWeightDetails/getshippingratesplantsweightdetailsbyid/${id}.json`);
  }

  getShippingWeightAndUnitsDetailsListById(id) {
    return API.get(`/ShippingRatesPlantsWeightDetails/getlist/${id}.json`);
  }

  updateShippingWeightAndUnitsDetails(PRObj) {
    return API.post(`/ShippingRatesPlantsWeightDetails/update.json`, PRObj);
  }

  updateStatus(PRObj) {
    return API.post(`/ShippingRatesPlantsWeightDetails/updatestatus.json`, PRObj);
  }

  updateMultipleStatus(PRObj) {
    return API.post(`/ShippingRatesPlantsWeightDetails/multipleupdatestatus.json`, PRObj);
  }
}

const ProductReadinessServiceCls = new ProductReadinessService();

export default ProductReadinessServiceCls;
