const { API } = require("helpers/API");

class OrderService {
  getOrders(OrderObject) {
    return API.post("/Order/list.json", OrderObject);
  }
  getOrderDetails(orderObject) {
    return API.post(`/Order/getorderdetails.json`, orderObject);
  }
  updateOrderStatus(orderObject) {
    return API.post(`/Order/updateorderstatus.json`, orderObject);
  }
  updateAddress(OrderObject) {
    return API.post("/Order/updateorderaddress.json", OrderObject);
  }
  updatenote(OrderObject) {
    return API.post("/Order/updatenotes.json", OrderObject);
  }
  getOrderDocument(orderNumber) {
    return API.post(
      `/OrderDocuments/getorderdocumentsbyordernumber/${orderNumber}.json`
    );
  }
  insertOrderDocument(OrderObject) {
    return API.post("/OrderDocuments/create.json", OrderObject);
  }
  updateStatusOrderDocument(OrderObject) {
    return API.post(
      `/OrderDocuments/multipleupdatestatusbyids.json`,
      OrderObject
    );
  }
  orderLogList(OrderObject) {
    return API.post(`/OrderLog/list.json`, OrderObject);
  }
  getOrderDashboardData(OrderObject) {
    return API.post(`/Dashboard/getlasttenorder.json`, OrderObject);
  }
  getOrdersByStoreData(OrderObject) {
    return API.post(`/Dashboard/getorderbystoreid.json`, OrderObject);
  }
  getOrderByStateList(OrderObject) {
    return API.post(`/Dashboard/orderbystatelist.json`, OrderObject);
  }
  OrderedShoppingCartItems(OrderObject) {
    return API.post(`/OrderedShoppingCartItems/list.json`, OrderObject);
  }
  CreateManualShippingForItems(OrderObject) {
    return API.post(`/OrderedShippedItems/CreateUpdate.json`, OrderObject);
  }
  GetOrderedShoppingCartItems(OrderObjectId) {
    return API.get(
      `/OrderedShippedItems/getorderedshippeditems/${OrderObjectId}.json`
    );
  }
  OrderedShoppingCartItemDetails(OrderObject) {
    return API.post(
      `/OrderedShoppingCartItems/getorderedshoppingcartdetail.json`,
      OrderObject
    );
  }
  // createTimelinePost(OrderObject) {
  //     return API.post(`/OrderedShoppingCartItems/list.json`, OrderObject);
  // }
  updateTrackingInfo(OrderObject) {
    return API.post(
      `/Order/updateordershippingtrackingdetails.json`,
      OrderObject
    );
  }
  cancelOrderItem(OrderObject) {
    return API.post(`/Order/cancelorderitems.json`, OrderObject);
  }
  cancelOrder(OrderObject) {
    return API.post(`/Order/updatecancelorderstatus.json`, OrderObject);
  }
  reviewOrder(OrderObject) {
    return API.post(`/Order/revieworderproductlinksend.json`, OrderObject);
  }
  duplicateOrder(OrderObject) {
    return API.post(`/Order/duplicateorder.json`, OrderObject);
  }
  orderSyncWithNav(OrderObject) {
    return API.post(`/Order/ordersyncwithnav.json`, OrderObject);
  }
  orderFraud(OrderObject) {
    return API.post(`/Order/updatefraudorderstatus.json`, OrderObject);
  }
  blockOrderIP(OrderObject) {
    return API.post(`/Order/blockipbyorder.json`, OrderObject);
  }
  getOrderPaymentInfo(orderId) {
    return API.get(`/Order/getpaymentoptioncarddetails/${orderId}.json`);
  }
  getOrderAddress(orderObject) {
    return API.post(`/Order/getorderaddressbyorderid.json`, orderObject);
  }
  getShippingOptionsByStore(orderId) {
    return API.get(`/Order/getordershippingservicesdropdown/${orderId}.json`);
  }
  editOrderItemQuantity(orderObject) {
    return API.post(`/OrderedCartLogoPerson/updatequantity.json`, orderObject);
  }
  getMoreFilterOptions(orderObject) {
    return API.post(`/Order/getmorefilterorderlist.json`, orderObject);
  }
  getCustomerLogoByOrderId(orderObject) {
    return API.post(`/Order/getcustomerlogolistbyorderid.json`, orderObject);
  }
  getOrderItemVariations(orderItemId) {
    return API.post(
      `/OrderedCartLogoPerson/getshoppingcartitemsforedit/${orderItemId}.json`
    );
  }
  getDropdownValuesForLogoLocationPosition(productId) {
    return API.get(
      `/StoreProductlocation/getproductlogolocationdetails/${productId}.json`
    );
  }
  getreusecustomerlogobycustomerid(customerid, storeid, LogoPosition) {
    return API.get(
      `/CustomerLogo/getreusecustomerlogobycustomerid/${customerid}/${storeid}/${
        LogoPosition ? LogoPosition : 0
      }.json`
    );
  }
  updateCustomLogo(customLogoPayload) {
    return API.post(`/CustomerLogo/create.json`, customLogoPayload);
  }
  getBlockedIPListData(Obj) {
    return API.post(`/Order/getblockedipaddresslist.json`, Obj);
  }

  //Order NAV Customer ID Update API

  updateNavCustomer(OrderObject) {
    return API.post(`/Order/navcustomernavidupdate.json`, OrderObject);
  }
  downloadPersonalizationExcle(Obj) {
    return API.post(
      `OrderedShoppingCartItems/getorderedshoppingcartdetailforcsv.json`,
      Obj
    );
  }
  sendMailPaymentPendingInvoice(OrderObject) {
    return API.post(`/Order/SendMailPaymentPendingInvoice.json`, OrderObject);
  }

  sendOrderMailInvoice(OrderObject) {
    return API.post(`/Order/sendinvoicefromadmin.json`, OrderObject);
  }

  updateOrderSubType(SubTypeObj) {
    return API.post(`/Order/updateordersubtype.json`, SubTypeObj);
  }
  updateNavStatus(orderId) {
    return API.post(`/Order/updatenavdetails/${orderId}.json`);
  }

  getshipcarrier(id) {
    return API.get(`/ShipStation/getshipcarrier/${id}.json`);
  }

  importshipstationorder(importObj) {
    return API.post("/ShipStation/importshipstationorder.json", importObj);
  }

  cancelOrder(orderId, shoppingCartItemId) {
    return API.post(
      `/Order/getorderreturnitems/${orderId}/${shoppingCartItemId}.json`
    );
  }

  confirmReturnOrder(obj) {
    return API.post(`/Order/confirmreturn.json`, obj);
  }

  orderTransctionCapture(orderId) {
    return API.get(`/Order/ordertransctioncapture/${orderId}.json`);
  }

  orderTransctionRefund(orderId, refundAmount, isRefundOnly) {
    return API.get(
      `/Order/ordertransctionrefund/${orderId}/${refundAmount}/${isRefundOnly}.json`
    );
  }

  orderTransctionDelete(orderId) {
    return API.get(`/Order/ordertransctiondelete/${orderId}.json`);
  }
}

const OrderServiceCls = new OrderService();

export default OrderServiceCls;
