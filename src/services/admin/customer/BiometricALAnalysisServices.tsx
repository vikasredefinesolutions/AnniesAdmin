import { API } from "helpers/API";

class BiometricALAnalysisService {
  getgetBiometricALAnalysis(customerId) {
    return API.get(`/SKIndexImage/getreportlist/${customerId}.json`);
  }

  getSurveyDetails(customerId) {
    return API.get(`/SKIndexImage/getsurveydetails/${customerId}.json`);
  }

  createImagesDetails(customerId) {
    return API.get(`/SKIndexImage/createimagedetails/${customerId}.json`);
  }

  getConsulationLink(userId, userEmail, customerId, customerEmail) {
    return API.get(
      `/SKIndexImage/getconsultionlink/${userId}/${userEmail}/${customerId}/${customerEmail}.json`
    );
  }
}

const BiometricALAnalysisServiceCls = new BiometricALAnalysisService();

export default BiometricALAnalysisServiceCls;
