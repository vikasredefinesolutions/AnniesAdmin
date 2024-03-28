import { API } from "helpers/API";

class DashboardService {

    // getDashboardData(dashBoardObj) {
    //     return API.post(`/Store/getstorelistbytype.json`, dashBoardObj);
    // }

    getDashboardData(dashBoardObj) {
        return API.post(`/SbDashBoard/getstorebuilderlistwithcount.json`, dashBoardObj);
    }

    getGrandMasterProductData(dashBoardObj) {
        return API.post(`/GrandMasterProduct/getactiveinactivecount.json`, dashBoardObj);
    }

    getMasterProductData(dashBoardObj) {
        return API.post(`/MasterProduct/masterdashboardlist.json`, dashBoardObj);
    }

    getStoreBuilderData() {
        return API.get(`/SbDashBoard/getactiveinactivecount.json`);
    }

    getECommerceProductData(dashBoardObj) {
        return API.get(`/SbDashBoard/corporateandecomstoredatacount.json`, dashBoardObj);
    }

    getECommerceData(dashBoardObj) {
        return API.get(`/SbDashBoard/corporateandecomstoretotalcount.json`, dashBoardObj);
    }

}

const DashboardServiceCls = new DashboardService();

export default DashboardServiceCls;
