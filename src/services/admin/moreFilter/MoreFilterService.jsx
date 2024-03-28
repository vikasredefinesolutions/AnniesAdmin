import { API } from "helpers/API";
class MoreFilterService {
    saveMoreFilter(moreFilterObject) {
        return API.post(`/PageviewTemplate/create.json`, moreFilterObject);
    }
    getMoreFilter(moreFilterObject) {
        return API.post(`/PageviewTemplate/get.json`, moreFilterObject);
    }
}

const MoreFilterServiceCls = new MoreFilterService();

export default MoreFilterServiceCls;