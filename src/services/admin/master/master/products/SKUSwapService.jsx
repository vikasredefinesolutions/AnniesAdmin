import { API } from "helpers/API";

class SKUServices {

    getOurSKUList(productid) {
        return API.get(`MasterProduct/getlistoursku/${productid}.json`);
    }

}

const SKUServicesCls = new SKUServices();

export default SKUServicesCls;
