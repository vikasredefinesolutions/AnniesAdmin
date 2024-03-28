import { API } from "helpers/API";

class ThirdPartyInventorySyncService {

    getSyncProductInventoryList(ThirdPartyInventoryObj) {
        return API.post(`/MasterProductThirdPartyInventorySync/getsyncproductinventorylist.json`, ThirdPartyInventoryObj);
    }

    getInventorySyncStatus(InventoryTypeId) {
        return API.get(`/MasterProductThirdPartyInventorySync/getsyncstatus/${InventoryTypeId}.json`);
    }

    exportProductInventory(ThirdPartyInventoryObj) {
        return API.post(`/MasterProductThirdPartyInventorySync/exportdatathirdpartyinventory.json`, ThirdPartyInventoryObj);
    }

    getInventoryBrandList(InventoryTypeId) {
        return API.get(`/MasterProductThirdPartyInventorySync/getbrandsexportdropdown/${InventoryTypeId}.json`);
    }

    importInventory(importInventoryObj) {
        return API.post(`/MasterProductThirdPartyInventorySync/ImportMaster.json`, importInventoryObj);
    }

    getVendorByBrandInventoryTypeId(brandId, inventoryTypeId) {
        return API.get(`/MasterProductThirdPartyInventorySync/getvendorbybrandidformasterbybrandids/${brandId}/${inventoryTypeId}.json`)
    }

}

const ThirdPartyInventorySyncServiceCls = new ThirdPartyInventorySyncService();

export default ThirdPartyInventorySyncServiceCls;
