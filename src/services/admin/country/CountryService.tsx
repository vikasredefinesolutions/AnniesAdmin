import { API } from "helpers/API";

class CountryService {
    getCountry() {
        return API.post(`/CountryMaster/getcountrylist.json`);
    }
    getCountryWithCode() {
        return API.post(`/CountryMaster/getcountrylistwithcode.json`);
    }
}

const CountryServiceCls = new CountryService();

export default CountryServiceCls;
