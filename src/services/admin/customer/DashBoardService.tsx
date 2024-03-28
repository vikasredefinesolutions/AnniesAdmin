import { API } from "helpers/API";

class DashBoardService {
  // Customer APIs
  getCustomerReportData() {
    return API.get(`/CustomerDashboardReport/getcustomerreportdata.json`);
  }

  getStoreTypeCustomerData() {
    return API.get(`/CustomerDashboardReport/getstoretypecustomer.json`);
  }

  getLast24HoursStoreTypeOrder(CustomerApproveObj) {
    return API.post(
      `/CustomerDashboardReport/getlast24hoursstoretypeorder.json`,
      CustomerApproveObj
    );
  }

  getCustomerOrderRevenueByFilter(id) {
    return API.get(
      `/CustomerDashboardReport/getcustomerorderrevenuebyfilter/${id}.json`
    );
  }

  getFrequentlyBuyCustomerList(CustomerApproveObj) {
    return API.post(
      `/CustomerDashboardReport/FrequentlyBuyCustomerList.json`,
      CustomerApproveObj
    );
  }

  getCustomerReviewTotal(ReviewObj) {
    return API.post(`/CustomerDashboardReport/getreviewtotals.json`, ReviewObj);
  }

  getCustomerReviewListData(CustomerApproveObj) {
    return API.post(
      `/CustomerDashboardReport/getlatestreviewlist.json`,
      CustomerApproveObj
    );
  }

  getTopCustomerByProfitability(Obj) {
    return API.post(`Dashboard/gettop10customersbyprofit.json`, Obj);
  }

  getCustomerDetailTotalDataByStore(Storeid, filter) {
    return API.get(
      `/CustomerDashboardReport/getcustomerdetailtotaldatabystore/${Storeid}/${filter}.json`
    );
  }

  getCustomerCountByState(Obj) {
    return API.post(`CustomerDashboardReport/getlistcustomerbystate.json`, Obj);
  }

  // Company APIs

  getCompanyReportData(storeid, Filter) {
    return API.get(
      `/companydashboardreport/getcompanyreportdata/${storeid}/${Filter}.json`
    );
  }
}

const DashBoardServiceCls = new DashBoardService();

export default DashBoardServiceCls;
