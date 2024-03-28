import { API } from "helpers/API";

class UserService {
  getUsers(userObj) {
    return API.post(`AdminUser/list.json`, userObj);
  }
  createUsers(userObj) {
    return API.post(`AdminUser/create.json`, userObj);
  }
  createUsersWithDifferentRole(userObj) {
    return API.post(`AdminUser/createwithdifferentrole.json`, userObj);
  }
  inviteUsers(userObj) {
    // return API.post(`AdminUser/invite.json`, userObj);
    return API.post(`AdminUser/inviteusingconfiguration.json`, userObj);
  }
  inviteUsersWithDifferentRole(userObj) {
    // return API.post(`AdminUser/invite.json`, userObj);
    return API.post(`AdminUser/inviteusingconfigurationwithdifferentrole.json`, userObj);
  }
  getUserById(id) {
    return API.get(`/AdminUser/get/${id}.json`);
  }
  updateUser(userObj) {
    return API.post(`/AdminUser/update.json`, userObj);
  }
  cloneUser(cloneObj) {
    return API.post(`/AdminUser/cloneadminuser.json`, cloneObj);
  }
  changePassword(userObj) {
    // return API.post(`/AdminUser/UserpasswordChange.json`, userObj);
    return API.post(`/AdminUser/UserpasswordChangeUsingConfiguration.json`, userObj);
  }
  accountActivity(userObj) {
    return API.post(`/login/accountactivitylog.json`, userObj);
  }

  downloadAccountActivity(userObj) {
    return API.post(`/login/exportaccountactivity.json`, userObj);
  }

  updateMultipleStatus(userObj) {
    return API.post(`/AdminUser/MultipleUserupdatestatusbyids.json`, userObj);
  }
  getMenuList(userObj) {
    return API.post('/AdminUserRolePermission/GetMenuListByUserRolePermission.json', userObj);
  }
  getAdminUserRolePermission(userId) {
    return API.post(`AdminUserRolePermission/list.json`, userId)
  }
  updateAdminUserRolePermission(AdminUserRolePermissionObj) {
    return API.post(`AdminUserRolePermission/update.json`, AdminUserRolePermissionObj)
  }
}
const UserServiceCls = new UserService();
export default UserServiceCls;
