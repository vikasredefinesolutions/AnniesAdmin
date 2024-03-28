import { API } from "helpers/API";

class StateService {
    getStateByCountryId(countryId) {
        return API.get(`/StateMaster/getstatebycountryid/${countryId}.json`);
    }
    getStateByCountryName(countryName) {
        return API.get(`/StateMaster/getstatebycountryname/${countryName}.json`);
    }
    getState() {
        return API.get(`/StateMaster/getstatelistall.json`);
    }
    getStateWithStateCode() {
        return API.get(`/StateMaster/getstatesdropdownwithstatecode.json`);
    }
    getLocationDataBasedOnZipCode(zipCode) {
        return API.get(`/CityStateCountry/getcitystatecountrybyzipCode/${zipCode}.json`);
    }
}

const StateServiceCls = new StateService();

export default StateServiceCls;
