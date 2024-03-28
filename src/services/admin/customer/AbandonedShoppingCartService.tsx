/*Component Name: AbandonedShoppingCartService
Component Functional Details: User can create or update AbandonedShoppingCartService master details from here.
Created By: Shrey Patel
Created Date: 03/14/2023
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import { API } from "helpers/API";

class AbandonedShoppingCartService {
    getAbandonedShoppingCartList(AbandonedCartObj) {
        return API.post(`/OrderedShoppingCartItems/getabandonedshoppingcartlist.json`, AbandonedCartObj);
    }

    sendAbandonedShoppingCartMail(CustomerId, IsSendEmail) {
        return API.post(`/OrderedShoppingCartItems/sendabandonedshoppingcartmail/${CustomerId}/${IsSendEmail}.json`);
    }

    getAbandonedShoppingCartProducts(CustomerId) {
        return API.get(`/OrderedShoppingCartItems/GetShoppingCartDetail/${CustomerId}.json`);
    }
}

const AbandonedShoppingCartServiceCls = new AbandonedShoppingCartService();

export default AbandonedShoppingCartServiceCls;