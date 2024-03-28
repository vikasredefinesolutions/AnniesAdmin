import { API } from "helpers/API";
class StoreBuilderService {
  getStoreBuilderList(paramObj) {
    return API.post(`/StoreInformation/GetStoreList.json`, paramObj);
  }

  getStoreBuilderTrashedList(paramObj) {
    return API.post(`/StoreInformation/GetTrashedStoreList.json`, paramObj);
  }

  getPaymentDeliveryOptions() {
    return API.get(`/StorePayBusinessMethod/GetPayBusinessMethod.json`);
  }

  getDomains() {
    return API.get(``);
  }

  createOrganization(storeObj) {
    return API.post(`/Organization/create.json`, storeObj);
  }

  createSports(storeObj) {
    return API.post(`/SbCategory/CreateSbCategory.json`, storeObj);
  }

  getSalesPerson(StoreId) {
    return API.get(`/SalesPerson/getlistofsalesperson/${StoreId}.json`);
  }

  getSalesPersonWithMultipleStore(StoreIdObj) {
    return API.post(`/SalesPerson/getlistofsalespersonbystoreids.json`, StoreIdObj)
  }

  createStore(storeObj) {
    return API.post(
      `/StoreInformation/CreateMasterStoreInformation.json`,
      storeObj
    );
  }

  updateMasterStoreSetup(storeObj) {
    return API.post(`/StoreInformation/UpdateMasterStoreSetup.json`, storeObj);
  }

  udpateStoreGeneral(storeObj) {
    return API.post(
      `/StoreInformation/UpdateMasterStoreInformation.json`,
      storeObj
    );
  }

  deleteStore(storeObj) {
    return API.post(
      `/StoreInformation/multipleupdatestatusbyids.json`,
      storeObj
    );
  }

  getByStoreID(StoreId) {
    return API.get(`/StoreInformation/geteditstore/${StoreId}.json`);
  }

  getPaymentAccount() {
    return API.get(`/StorePaymentGateway/GetList.json`);
  }

  getPaymentInfo(storeId) {
    return API.get(
      `/StorePaymentInformation/GetPaymentInformationByStore/${storeId}.json`
    );
  }

  createPaymentInfo(paymentObj) {
    return API.post(
      `/StorePaymentInformation/CreateStorePaymentInformation.json`,
      paymentObj
    );
  }

  updatePaymentInfo(storeObj) {
    return API.post(
      `/StorePaymentInformation/UpdateStorePaymentInformation.json`,
      storeObj
    );
  }

  getMessages(storeId) {
    return API.get(
      `/SbStoreMessages/GetSbStoreMessagesByStore/${storeId}.json`
    );
  }

  createMessages(storeObj) {
    return API.post(`/SbStoreMessages/CreateSbStoreMessages.json`, storeObj);
  }

  updateMessages(storeObj) {
    return API.post(`/SbStoreMessages/UpdateSbStoreMessages.json`, storeObj);
  }

  getStoreCustomFieldById(id) {
    return API.get(`/StoreCustomField/get/${id}.json`);
  }
  createStoreCustomField(storeObj) {
    return API.post(`/StoreCustomField/create.json`, storeObj);
  }
  deleteStoreCustomField(storeObj) {
    return API.post(
      `/StoreCustomField/deletestorecustomfieldbyid.json`,
      storeObj
    );
  }

  getTierInfo(storeId) {
    return API.get(
      `/SbShippingMethods/GetSbShippingMethodsByStore/${storeId}.json`
    );
  }
  deleteTierShippingInfo(storeObj) {
    return API.post(
      `/SbShippingMethods/DeleteSbShippingMethodsById.json`,
      storeObj
    );
  }
  createStoreTierInfo(storeObj) {
    return API.post(
      `/SbShippingMethods/CreateSbShippingMethods.json`,
      storeObj
    );
  }

  createFeesInfo(storeObj) {
    return API.post(`/StoreFees/create.json`, storeObj);
  }
  getFeesInfo(storeId) {
    return API.get(`/StoreFees/get/${storeId}.json`);
  }
  updateFeesInfo(storeObj) {
    return API.post(`/StoreFees/updatefeesbyid.json`, storeObj);
  }
  getCouponInfo(storeId) {
    return API.get(
      `/SbCouponRebates/GetSbCouponRebatesByStore/${storeId}.json`
    );
  }

  updateCouponInfo(storeObj) {
    return API.post(`/SbCouponRebates/CreateSbCouponRebates.json`, storeObj);
  }
  updateCouponRebatesInfo(storeObj) {
    return API.post(`/SbCouponRebates/UpdateSbCouponRebates.json`, storeObj);
  }
  deleteCouponInfo(storeObj) {
    return API.post(
      `/SbCouponRebates/DeleteSbCouponRebatesById.json`,
      storeObj
    );
  }

  // Fees Services

  deleteFeesInfo(storeObj) {
    return API.post(`/StoreFees/deletefeesbyid.json`, storeObj);
  }
  getTaxesInfo(storeId) {
    return API.get(`/StoreFees/gettax/${storeId}.json`);
  }

  createTaxesInfo(storeObj) {
    return API.post(`/StoreFees/createfeestax.json`, storeObj);
  }
  updateTaxesInfo(storeObj) {
    return API.post(`/StoreFees/updatefeestaxbyid.json`, storeObj);
  }

  // store Clone Services

  createStoreClone(Obj) {
    return API.post(`StoreInformation/CloneStore.json`, Obj);
  }

  //Reports

  getStoreReports(storeId) {
    return API.get(`/SbOrderReports/getsborderreportbystore/${storeId}.json`);
  }
  getOrderReportList(storeObj) {
    return API.post(`/SbOrderReports/getsborderrreportlist.json`, storeObj);
  }
  // getProductReportList(storeObj) {
  //   return API.post(`/SbOrderReports/ProductReportbyStore.json`, storeObj);
  // }
  getProductReportList(storeObj) {
    return API.post(`/SbOrderReports/productreportbystoreid.json`, storeObj);
  }
  getProductReportExcelByStore(storeObj) {
    return API.post(`/SbOrderReports/ProductReportExcelByStore.json`, storeObj);
  }
  getFundRaisingList(storeObj) {
    return API.post(`/SbOrderReports/FundRaisingReportbyStore.json`, storeObj);
  }

  getExportSbOrderReportList(storeObj) {
    return API.post(`/SbOrderReports/exportsborderreportlist.json`, storeObj);
  }

  getExportSbOrderDetails(storeObj) {
    return API.post(`/SbOrderReports/exportgetsborder.json`, storeObj);
  }

  getContactOrderDetails(storeId) {
    return API.get(`/SbOrderContactFlyerForm/sbgetorderdatabystoreid/${storeId}.json`);
  }
  generateOrderReceipt(storeObj) {
    return API.post(`/SbOrderContactFlyerForm/GenerateOrderReceipt.json`, storeObj);
  }

  // ExportOrderReport(storeObj) {
  //   return API.post(
  //     `/SbOrderReports/exportorderreportbystore/4.json`,
  //     storeObj
  //   );
  // }

  getCustomerReport(storeObj) {
    return API.post(`/SbOrderReports/getcustomerorderreport.json`, storeObj);
  }

  CustomerReportExcel(storeObj) {
    return API.post(`/SbOrderReports/exportcustomerorderreport.json`, storeObj);
  }

  CreateSbOrderContactFlyerForm(storeObj) {
    return API.post(`/SbOrderContactFlyerForm/CreateSbOrderContactFlyerForm.json`, storeObj);
  }

  OrderDetailsReport(storeId) {
    return API.post(`/SbOrderReports/orderdetailreportbystoreid.json`, storeId);
  }

  OrderDetailsDownloadPDF(orderObj) {
    return API.post(`SbOrderReports/exportorderdetailreportbystoreid.json`, orderObj);
  }


  //ProductAdditionalPrice

  getProductAdditionalPriceList(Obj) {
    return API.post(
      `/SbStoreProductAdditionPrice/getsbstoreproductadditionpricebystoreid.json`,
      Obj
    );
  }
  createProductAdditionalPrice(storeObj) {
    return API.post(`/SbStoreProductAdditionPrice/Create.json`, storeObj);
  }
  updateProductAdditionalPrice(storeObj) {
    return API.post(`/SbStoreProductAdditionPrice/Update.json`, storeObj);
  }
  deleteProductAdditionalPrice(storeObj) {
    return API.post(
      `/SbStoreProductAdditionalPrice/DeleteSbStoreProductAdditionalPriceById.json`,
      storeObj
    );
  }
  //Share Report

  createShareReport(Obj) {
    return API.post(`/SbAccessByEmail/SendSbAccessByMail.json`, Obj);
  }
  updateShareReport(Obj) {
    return API.post(`/SbAccessByEmail/UpdateSbAccessByMail.json`, Obj);
  }
  unProtectedStoreId(Obj) {
    return API.post(`/SbAccessByEmail/UnprotectStoreId.json`, Obj);
  }

  getShareReport(Obj) {
    return API.post(`/SbAccessByEmail/GetListManageAccessEmailLog.json`, Obj);
  }

  //Share Report Overview Tab
  getOverviewTab(id) {
    return API.post(
      `SbManageAccessByStore/GetSbManageAccessByStore/${id}.json`
    );
  }

  //Share Report Share With Group Tab
  getShareWithGroupTab(id) {
    return API.post(
      `/SbManageAccessByStore/GetStoreWithGroupByStore/${id}.json`
    );
  }

  //Product Custom Fields

  createProductCustomField(storeObj) {
    return API.post(`/StoreProductCustomField/create.json`, storeObj);
  }
  updateProductCustomField(storeObj) {
    return API.post(`/StoreProductCustomField/update.json`, storeObj);
  }
  listProductCustomField(storeObj) {
    return API.post(`/StoreProductCustomField/list.json`, storeObj);
  }
  getProductCustomField(id) {
    return API.post(`StoreProductCustomField/GetById/${id}.json`);
  }

  //share Report Download Flyer Report API
  downloadFlyer(storeId) {
    return API.get(
      `/SbOrderContactFlyerForm/downloadshareflyerformform/${storeId}.json`);
  }
  // end

  //Share Report Orders Tab
  getOrdersTab(id) {
    return API.post(
      `/SbManageAccessByStore/GetSbManageAccessOrdersByStore/${id}.json`
    );
  }

  //sequence Tab API
  getCategoriesWithStoreProducts(Obj) {
    return API.post(`/StoreProduct/getcategorieswithstoreproducts.json`, Obj);
  }
  updateStoreCategoryDisplayOrder(Obj) {
    return API.post(
      `/storeproductcategorydiplayorder/updatestoreproductcategorydisplayorder.json`,
      Obj
    );
  }

  //DashBoard

  getStoreBuilderData(Obj) {
    return API.get(`/SbDashBoard/getactiveinactivecount.json`, Obj);
  }

  getFormBuilderData(Obj) {
    return API.get(`/FormBuilder/getactiveinactivecount.json`, Obj);
  }

  getFormBuilderProductData(Obj) {
    return API.get(`/SbDashBoard/getfrombuildercount.json`, Obj);
  }

  getFormBuilderWithCountData(Obj) {
    return API.post(`/SbDashBoard/getformlistwithcount.json`, Obj);
  }

  storeBuilderDashboardListByStore(Obj) {
    return API.post(`/SbDashBoard/storebuilderdashboardlistbystore.json`, Obj);
  }

  DashboardDropdownListByStore(Obj) {
    return API.post(`/SbDashBoard/getstorelistbytypestore.json`, Obj);
  }

  storeAndFormBuilderDashboardDropdownList(Obj) {
    return API.post(`/Store/getstoredropdownbytypestoreandorderby.json`, Obj);
  }

  getTeamNameDropDownListByStore(storeId) {
    return API.get(
      `/StoreTeam/GetTeamByStore/${storeId}.json`
    );
  }

  getTemplates(Obj) {
    return API.post('/CmsTemplateController/list.json', Obj)
  }
}

const StoreBuilderServiceCls = new StoreBuilderService();

export default StoreBuilderServiceCls;
