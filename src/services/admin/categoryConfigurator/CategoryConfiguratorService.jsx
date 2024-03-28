import { API } from "helpers/API";

class categoryConfiguratorservices {
    getCategoryConfigList(Obj) {
        return API.post(`MasterFilterCustomFieldsCategory/list.json`, Obj);
    }
    createCategoryConfig(Obj) {
        return API.post(`MasterFilterCustomFieldsCategory/create.json`, {
            masterFilterCustomFieldsCategoryModel: Obj,
        });
    }

    getCategoryConfigByID(id) {
        return API.get(`MasterFilterCustomFieldsCategory/get/${id}.json`);
    }

    updateCategoryConfig(Obj) {
        return API.post(`MasterFilterCustomFieldsCategory/update.json`, {
            masterFilterCustomFieldsCategoryModel: Obj,
        });
    }

    updateStatus(Obj) {
        return API.post(`/MasterFilterCustomFieldsCategory/updatestatusbyid.json`, Obj);
    }

    deleteSizeMaster(id) {
        return API.post(`MasterFilterCustomFieldsCategory/deletesizemasterbyid.json`, id);
    }

    updateMultipleStatus(Obj) {
        return API.post(
            `MasterFilterCustomFieldsCategory/multipleupdatestatusbyids.json`,
            Obj
        );
    }
}

const categoryConfiguratorservicesCls = new categoryConfiguratorservices();


export default categoryConfiguratorservicesCls;