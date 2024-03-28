import { API } from "helpers/API";

class PageRedirect {
  getPageRedirect(Obj) {
    return API.post(`/PageRedirect/list.json`, Obj);
  }

  createPageRedirect(Obj) {
    return API.post(`/PageRedirect/create.json`, Obj);
  }

  updateStatusById(Obj) {
    return API.post(`/PageRedirect/updatestatusbyid.json`, Obj);
  }
}

export default new PageRedirect();
