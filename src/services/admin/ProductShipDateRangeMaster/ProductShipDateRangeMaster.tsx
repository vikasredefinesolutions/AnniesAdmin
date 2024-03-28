import { API } from "helpers/API";

class ProductShipDateRangeMaster {

  getProductShipDateRangeMaster() {
    return API.get(`ProductShipDateRangeMaster/get.json`);
  }
  getProductShipDateRangeDetails(payload) {
    return API.post(`ProductShipDateRangeDetails/getlist.json`, {
      productShipDateRangeDetailsModel: {
        "productShipDateRangeMasterId": payload.productShipDateRangeMasterId,
        "search": payload.search || ""
      }
    });
  };

  createProductShipDateRangeMaster(payload) {
    return API.post(`ProductShipDateRangeMaster/create.json`, {
      productShipDateRangeModel: payload
    });
  };

  updateProductShipDateRangeMaster(payload) {
    return API.post(`ProductShipDateRangeMaster/update.json`, {
      productShipDateRangeModel: payload
    });
  }

  updateProductShipDateRangeDetails(payload) {
    return API.post(`ProductShipDateRangeDetails/update.json`, payload);
  }

  exportItemCountMaximum(exportObj){
    return API.post(`ProductShipDateRangeDetails/exportproductshipdaterangedetails.json`, exportObj)
  }

}

const ProductShipDateRangeMasterCls = new ProductShipDateRangeMaster();

export default ProductShipDateRangeMasterCls;
