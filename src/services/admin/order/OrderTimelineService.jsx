const { API } = require("helpers/API");

class OrderTimelineService {
    getOrderTimeline(OrderObject) {
        return API.post(`/OrderTimeLine/list.json`, OrderObject);
    }
    createOrderTimeline(OrderObject) {
        return API.post(`/OrderTimeLine/create.json`, OrderObject);
    }
    getOrderTimelinesList(OrderObject) {
        return API.post(`/OrderTimeLine/gettimelineslist.json`, OrderObject);
    }
}

const OrderTimelineServiceCls = new OrderTimelineService();

export default OrderTimelineServiceCls;