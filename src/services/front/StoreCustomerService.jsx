import axios from "axios";
import { API } from "helpers/API";

const baseUrl = localStorage.getItem("FrontApiURL")
class StoreCustomerService {
    sendResetPasswordLink(storeId, email) {
        return axios.get(`${baseUrl}StoreCustomer/customersendresetpasswordlink/${storeId}/${email}.json`);
    };

    getCustomerNavDataFromNav(email) {
        return API.get(`Customer/getnavcustomeridfromnav/${email}.json`);
    }
}

const StoreCustomerServiceCls = new StoreCustomerService();

export default StoreCustomerServiceCls
