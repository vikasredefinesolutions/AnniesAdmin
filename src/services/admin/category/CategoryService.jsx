import axios from "axios";
import { anniesAnnualData } from "global/Enum";
import { API, FrontAPI } from "helpers/API";

const baseUrl = localStorage.getItem("FrontApiURL")
class CategoryService {
  getCategories(categoryObj) {
    return API.post(`/Category/list.json`, categoryObj);
  }
  getCategoriesWithTreeview(categoryObj) {
    return API.post(`/Category/getcategorytreeviewlist.json`, categoryObj);
  }
  createCategory(categoryObj) {
    return API.post(`/Category/create.json`, categoryObj);
  }
  getCategoryById(id) {
    return API.get(`/Category/get/${id}.json`);
  }
  updateCategory(categoryObj) {
    return API.post(`/Category/update.json`, categoryObj);
  }
  updateStatus(categoryObj) {
    return API.post(`/Category/updatestatusbyid.json`, categoryObj);
  }
  updateMultipleStatus(categoryObj) {
    return API.post(
      `/Category/multipleupdatestatuscategorybyids.json`,
      categoryObj
    );
  }
  updateCategoryParent(categoryObj) {
    return API.post("/Category/updatecategoryparentcategoryrequest.json", { "categoryParentCategoryModel": categoryObj });
  }
  getCategoryDropdownOptions(categoryId, storeId) {
    return API.get(`/Category/getcategory/${categoryId}.json`);
  }
  getStoreCategoryDropdownOptions(categoryId = -1, storeId) {
    return API.get(`/StoreProductCategory/getcategory/${categoryId}/${storeId}.json`);
  }
  getsaleschannelstoresforcategoryId(id) {
    return API.get(`/Category/getsaleschannelstoresforcategory/${id}.json`);
  }
  GetAllCategoryXIdByCategoryId(id) {
    return API.get(`/Category/GetAllCategoryXIdByCategoryId/${id}.json`);
  }
  getAllParentCategory(id) {
    return API.get(`Category/GetAllParentCategory.json`);
  }
  getCategoryComponents(id) {
    return API.get(`CmsCategoryComponents/getcategorycomponentsbycategory/${id}.json`);
  }
  updateCategoryComponent(topicObj, id) {

    return API.post(`CmsCategoryComponents/create.json`, { 'topicComponentsModel': (topicObj.length > 0 ? topicObj : [{ 'component_Id': 0, 'category_Id': id, 'selected_Values': '', 'visibility': 'on' }]) });
  }

  updateSingleCategoryComponent(topicObj, id) {
    return API.post(`CmsTopicComponentsController/update.json`, { 'topicComponentsModel': topicObj });
  }

  getStoreDetailsByUrl(url) {
    return axios.post(`${baseUrl}Store/getstorebydomainmerge.json`, {
      url: url,
    });
  }

  async getClearCategoryCatch() {
    return await axios.get(`${baseUrl}Category/clearcategorycatch/${anniesAnnualData.storeId}/0.json`)
  }

}

const CategoryServiceCls = new CategoryService();

export default CategoryServiceCls;
