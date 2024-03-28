import { API } from "helpers/API";

class CategoryconfigDetailsService {
    getCategoryByParentId(sizemasterid) {
        return API.get(
            `/MasterFilterCustomFieldsValueCategory/GetMasterFilterCustomFieldsValueCategoryByMasterFilterCustomFieldsCategoryId/${sizemasterid}.json`
        );
    }
    getCategoryConfigDetailsList(sizedetailsObj) {
        return API.post(`/MasterFilterCustomFieldsValueCategory/list.json`, sizedetailsObj);
    }

    createCategoryConfigDetails(sizedetailsObj) {
        return API.post(`/MasterFilterCustomFieldsValueCategory/create.json`, {
            masterFilterCustomFieldsValueCategoryModel: sizedetailsObj,
        });
    }
    getCategoryConfiguratorDetailsByID(id) {
        return API.get(`MasterFilterCustomFieldsValueCategory/get/${id}.json`);
    }

    updateCategoryConfigDetails(sizedetailsObj) {
        return API.post(`/MasterFilterCustomFieldsValueCategory/update.json`, {
            masterFilterCustomFieldsValueCategoryModel: sizedetailsObj,
        });
    }

    updateMultipleStatus(catalogObj) {
        return API.post(
            `/MasterFilterCustomFieldsValueCategory/multipleupdatestatusbyids.json`,
            {
                args: catalogObj,
            }
        );
    }
}

const CategoryconfigDetailsServiceCls = new CategoryconfigDetailsService();

export default CategoryconfigDetailsServiceCls;