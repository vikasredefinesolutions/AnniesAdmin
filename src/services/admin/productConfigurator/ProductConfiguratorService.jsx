import { API } from "helpers/API";

class categoryConfiguratorservices {
    getCategoryConfigList(Obj) {
        return API.post(`MasterFilterFacetField/list.json`, Obj);
    }
    createCategoryConfig(Obj) {
        return API.post(`MasterFilterFacetField/create.json`, {
            masterFilterFacetFieldModel: Obj,
        });
    }

    getProductConfigByID(id) {
        return API.get(`MasterFilterFacetField/get/${id}.json`);
    }

    updateProductConfig(Obj) {
        return API.post(`MasterFilterFacetField/update.json`, {
            masterFilterFacetFieldModel: Obj,
        });
    }

    updateStatus(Obj) {
        return API.post(`/MasterFilterFacetField/updatestatusbyid.json`, Obj);
    }

    updateMultipleStatus(Obj) {
        return API.post(
            `/MasterFilterFacetField/multipleupdatestatusbyids.json`,
            Obj
        );
    }
}

const categoryConfiguratorservicesCls = new categoryConfiguratorservices();

export default categoryConfiguratorservicesCls;