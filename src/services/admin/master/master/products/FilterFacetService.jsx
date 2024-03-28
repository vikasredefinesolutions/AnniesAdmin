import { API } from "helpers/API";

class FilterFacetService {
  getProductfilterfacetfields(productId, storeId) {
    return API.get(
      `/StoreProduct/GetProductfilterfacetfields/${productId}/${storeId}.json`
    );
  }

  createUpdateProductFilterFacetField(filterFieldObj) {
    return API.post(
      `/StoreProductFilterFacetFields/createupdate.json`,
      filterFieldObj
    );
  }
}

const FilterFacetServiceCls = new FilterFacetService();

export default FilterFacetServiceCls;
