import { API } from "helpers/API";

class UserSecurityService {
    getSecurityByCompanyId(securityConfigObj) {
        return API.post('UserSecuritySetting/getbycompanyconfigurationid.json', securityConfigObj)
    }

    updateSecurityConfiguration(securityConfigObj) {
        return API.post('UserSecuritySetting/update.json', securityConfigObj)
    }

    getDomains(configObj) {
        return API.post('UserSecurityDomainAllow/list.json', configObj)
    }
    createDomain(domainObj) {
        return API.post('UserSecurityDomainAllow/create.json', domainObj)
    }

    deleteDomain(domainObj) {
        return API.post('UserSecurityDomainAllow/delete.json', domainObj)
    }
}

const UserSecurityServiceCls = new UserSecurityService();

export default UserSecurityServiceCls;