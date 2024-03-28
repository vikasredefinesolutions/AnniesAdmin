/*Component Name: ConsultationRequestService
Component Functional Details: User can create or update ConsultationRequestService master details from here.
Created By: Shrey Patel
Created Date: 01/06/22
Modified By: Shrey Patel
Modified Date: 12/23/2022 */

import { API } from "helpers/API";

class ConsultationRequestService {
  getConsultationAndProof(ConsultationObj) {
    return API.post(`/consultationandproof/list.json`, ConsultationObj);
  }

  ConsultationAndProofExport(ConsultationObj) {
    return API.post(
      `/consultationandproof/exportconsultation.json`,
      ConsultationObj
    );
  }
  updateStatusConsultationRequest(statusObject) {
    return API.post(
      `/Customer/updatestatuscustomerconsultationandproof.json`,
      statusObject
    );
  }
}

const ConsultationRequestServiceCls = new ConsultationRequestService();

export default ConsultationRequestServiceCls;
