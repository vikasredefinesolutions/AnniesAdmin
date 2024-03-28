import { API } from "helpers/API";

class CustomerAccountCreationApprovalService {
    getCustomerApproveList(CustomerApproveObj) {
        return API.post(`/CustomerApprove/list.json`, CustomerApproveObj);
    }

    getCustomerApprovalById(id) {
        return API.get(`/CustomerApprove/get/${id}.json`);
    }

    UpdateCustomerApproval(CustomerApproveObj) {
        return API.post(`/CustomerApprove/update.json`, CustomerApproveObj);
    }

    exportCustomerApplicationList(exportObj) {
        return API.post(`/CustomerApprove/exportlist.json`, exportObj);
    }
}

const CustomerAccountCreationApprovalServiceCls = new CustomerAccountCreationApprovalService();

export default CustomerAccountCreationApprovalServiceCls;
