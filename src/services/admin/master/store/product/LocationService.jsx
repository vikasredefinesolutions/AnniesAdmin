import { API } from "helpers/API";

class LocationService {

    getLogoLocations(logoLocationObj) {
        return API.post(`/StoreProductlocation/list.json`, logoLocationObj);
    }
    create(logoLocationObj) {
        return API.post(`/StoreProductlocation/create.json`, logoLocationObj);
    }
    update(logoLocationObj) {
        return API.post(`/StoreProductlocation/create.json`, logoLocationObj);
    }

}

const LocationServiceCls = new LocationService();

export default LocationServiceCls;
