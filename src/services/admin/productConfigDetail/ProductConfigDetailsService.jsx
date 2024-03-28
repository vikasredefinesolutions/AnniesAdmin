import { API } from "helpers/API";

class CategoryconfigDetailsService {
    getCategoryByParentId(parentId) {
        return API.get(
            `/MasterFilterFacetFieldValues/GetMasterFilterFacetFieldValuesByFilterFacetFieldId/${parentId}.json`
        );
    }
    getCategoryConfigDetailsList(Obj) {
        return API.post(`/MasterFilterFacetFieldValues/list.json`, Obj);
    }

    createCategoryConfigDetails(Obj) {
        return API.post(`/MasterFilterFacetFieldValues/create.json`, {
            masterFilterFacetFieldValuesModel: Obj,
        });
    }
    getConfigDetailsByID(id) {
        return API.get(`MasterFilterFacetFieldValues/get/${id}.json`);
    }

    updateCategoryConfigDetails(Obj) {
        return API.post(`/MasterFilterFacetFieldValues/update.json`, {
            masterFilterFacetFieldValuesModel: Obj,
        });
    }

    updateMultipleStatus(catalogObj) {
        return API.post(
            `/MasterFilterFacetFieldValues/multipleupdatestatusbyids.json`,
            {
                args: catalogObj,
            }
        );
    }
}

const CategoryconfigDetailsServiceCls = new CategoryconfigDetailsService();

export default CategoryconfigDetailsServiceCls;