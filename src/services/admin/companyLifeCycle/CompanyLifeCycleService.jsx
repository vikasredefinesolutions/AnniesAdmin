import { API } from "helpers/API";

class CompanyLifeCycleService {
    getCompanyLifecycleMonthWise(companyObj) {
        return API.post("/CompanyInformation/getlifecyclemonthwiselistbycompanyid.json", companyObj);
    }

    getCompanyLifecycleDateWise(companyObj) {
        return API.post(`/CompanyInformation/getlifecycledatewiselistbycompanyid.json`, companyObj);
    }
}


const CompanyLifeCycleServiceCls = new CompanyLifeCycleService();

export default CompanyLifeCycleServiceCls;