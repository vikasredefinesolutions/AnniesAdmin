/*Component Name: Stories Category
Component Functional Details: User can create or update Stories Category master details from here.
Created By: Bhargav
Created Date: 03/02/2023
Modified By: <Modified By>
Modified Date: <Modified Date> */

import { API } from "helpers/API";

class StoriesCategory {
  getStoriesCategory(Obj) {
    return API.post(`/CmsStoriesCategory/list.json`, Obj);
  }
  getStoriesCategoryDropdown() {
    return API.get(`/CmsStoriesCategory/getstoriescategoryfordropdown.json`);
  }
  createStoriesCategory(Obj) {
    return API.post(`/CmsStoriesCategory/create.json`, Obj);
  }
  updateStoriesCategory(Obj) {
    return API.post(`/CmsStoriesCategory/update.json`, Obj);
  }
  getStoriesCategoryById(id) {
    return API.get(`/CmsStoriesCategory/getstoriescategorybyid/${id}.json`);
  }
  updateStatus(Obj) {
    return API.post(`/CmsStoriesCategory/updatestatusbyid.json`, Obj);
  }
}

const StoriesCategoryCls = new StoriesCategory();

export default StoriesCategoryCls;
