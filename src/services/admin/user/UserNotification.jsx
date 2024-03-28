import { API } from "helpers/API";

class UserNotificationService {
    getUserNotificationsById(id) {
        return API.get(`/AdminUserNotification/get/${id}.json`);
    }
    createUsersNotifications(userObj) {
        return API.post(`AdminUserNotification/create.json`, userObj);
    }
    updateUserNotifications(userObj) {
        return API.post(`/AdminUserNotification/update.json`, userObj);
    }
    getUserAdminNotificationsById(userId) {
        return API.get(`/AdminUserNotification/getadminusernotification/${userId}.json`);
    }
}

const UserNotificationServiceCls = new UserNotificationService();
export default UserNotificationServiceCls;
