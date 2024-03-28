import { API, PublicAPI } from "helpers/API";

class FontService {
  getFont(fontObj) {
    return API.post(`Font/list.json`, fontObj);
  }

  getFontById(id) {
    return PublicAPI.get(`Font/get/${id}.json`);
  }
}

const FontServiceCls = new FontService();

export default FontServiceCls;
