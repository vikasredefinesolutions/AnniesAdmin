import { API, PublicAPI } from "helpers/API";

import { __TokenUsingConfiguration, __Logout, __CreatePassword, __CreateAndUpdatePassExpUsingConfiguration, __CheckPasswordLinkExpired } from "typeDefination/services/loginType"

class AuthService {
  login(userObj: __TokenUsingConfiguration) {
    // return PublicAPI.post("/login/token.json", userObj);
    return PublicAPI.post("/login/tokenusingconfiguration.json", userObj);
  }
  samllogin() {
    return PublicAPI.get("/login/smallogin");
  }
  logout(userObj: __Logout) {
    return API.post("/login/logout.json", userObj);
  }
  getOtpTimeout(userId: number) {
    return PublicAPI.get(`/login/SendAuthToken/${userId}.json`);
  }
  verifyOtp(otp: number, userId: number) {
    return PublicAPI.get(`/login/CheckAuthToken/${otp}/${userId}.json`)
  }
  sendResetPasswordLink(userEmail: string) {
    return PublicAPI.get(`/AdminUser/SendResetPasswordLink/${userEmail}.json`);
  }
  resetPassword(userObj: __CreatePassword) {
    return PublicAPI.post(`/AdminUser/CreatePassword.json`, userObj);
  }
  changeExpirePassword(userObj: __CreateAndUpdatePassExpUsingConfiguration) {
    // return PublicAPI.post("/AdminUser/CheckAndUpdatePasswordExpired.json", userObj);
    return PublicAPI.post("/AdminUser/CheckAndUpdatePasswordExpiredUsingConfiguration.json", userObj);
  }
  checkExpirePassword(userId: number) {
    // return PublicAPI.get(`/AdminUser/CheckUserPasswordExpired/${userId}.json`);
    return PublicAPI.get(`/AdminUser/CheckUserPasswordExpiredUsingConfiguration/${userId}.json`);
  }
  checkPaswordLinkExpired(userObj: __CheckPasswordLinkExpired) {
    return PublicAPI.post(`/AdminUser/CheckPasswordLinkExpired.json`, userObj)
  }
}

const AuthServiceCls = new AuthService();

export default AuthServiceCls;
