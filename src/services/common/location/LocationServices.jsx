import axios from "axios";

class Location {
    getLocation() {
        return axios.get("https://ipapi.co/json/?key=8cLnTPo1ZVxXRHrlgTpxlei9gQCnQkm3n26ZQomhg5HcAiWyIo");
    }

    getLocationData() {
        return axios.get("https://api.ipify.org/?format=json");
    }
}

const locationServices = new Location();

export default locationServices;
