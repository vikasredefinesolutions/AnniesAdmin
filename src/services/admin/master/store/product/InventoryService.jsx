import { API } from "helpers/API";

class InventoryService {

    getInventory(productid, vendorid, ProductAttributeTypeId) {
        return API.get(`/StoreProductFutureInventory/getfutureinventory/${productid}/${vendorid}/${ProductAttributeTypeId}.json`);
    }
    addUpdateInventory(inventoryObj) {
        return API.post(`/StoreProductFutureInventory/addupdatefutureinventory.json`, inventoryObj)
    }
}

const InventoryServiceCls = new InventoryService();

export default InventoryServiceCls;
