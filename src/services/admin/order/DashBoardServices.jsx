import { API } from "helpers/API";

class DashBoardService {
    getOrderCountListData(storeId, Filter) {
        return API.post(`/OrderDashBoard/ordercountlist/${storeId}/${Filter}.json`);
    }

    getOrderTotalData(storeId, Filter) {
        return API.post(`/OrderDashBoard/getordertotaldata/${storeId}/${Filter}.json`);
    }

    getOrderTotalDetails(Obj) {
        return API.post(`/OrderDashBoard/getcountbystoreid.json`, Obj);
    }

    // last few days report
    getOrdersFewDaysReport(Obj) {
        return API.post(`/OrderDashBoard/getlastfewdaysorderlist.json`, Obj)
    }

    getStoreOrderByMarketPlaceData(Obj) {
        return API.post(`/Dashboard/gettopfivestoreorderbymarketplace.json`, Obj)
    }

    getOrderByCountSpeedometer(Obj) {
        return API.post(`/OrderDashBoard/getorderbycountspeedometer.json`, Obj)
    }

    getSyncOrderStatus(storeId, filter) {
        return API.post(`/OrderDashBoard/getsyncorderstatus/${storeId}/${filter}.json`)
    }

    getOrderTotalSales(Obj) {
        return API.post(`/Dashboard/getordersalesamountforchart.json`, Obj)
    }

    getOrderCountByStore(Obj) {
        return API.post(`/Dashboard/getordercountforchart.json`, Obj)
    }

    getTop5OrderedProduct(Obj) {
        return API.post(`/Dashboard/gettop5productforchart.json`, Obj)
    }
    getOrderDataByStore(Storeid, filter) {
        return API.post(`/OrderDashBoard/getordertotaldatabystore/${Storeid}/${filter}.json`)
    }

    getThisMonthDataByStore(id) {
        return API.post(`/OrderDashBoard/getthismonthssaletotaldatabystore/${id}.json`)
    }

    getProductDetailsByStore(id) {
        return API.post(`/Dashboard/GetProductDetailsTotalDataByStore/${id}.json`)
    }

    getUncapturedOrderData(Obj) {
        return API.post(`/OrderDashBoard/getuncapturedorder.json`, Obj)
    }
    getOrderByCustomerData(CustomerObj) {
        return API.post(`/OrderDashBoard/getregistercustomerorderdata.json`, CustomerObj)
    }
}

const DashBoardServiceCls = new DashBoardService();

export default DashBoardServiceCls;
