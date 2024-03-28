import { API } from "helpers/API";

class CategoryService {
  getCategories(categoryObj) {
    return API.post(`/StoreProductCategory/list.json`, categoryObj);
  }
  getCategoriesWithTreeview(categoryObj) {
    return API.post(
      `/StoreProductCategory/getcategorytreeviewlist.json`,
      categoryObj,
    );
  }
  createCategory(categoryObj) {
    return API.post(`/StoreProductCategory/create.json`, categoryObj);
  }
  getCategoryById(id) {
    return API.get(`/StoreProductCategory/get/${id}.json`);
  }
  updateCategory(categoryObj) {
    console.log("categoryObj", categoryObj);
    return API.post(`/StoreProductCategory/update.json`, categoryObj);
  }
  updateStatus(categoryObj) {
    return API.post(`/StoreProductCategory/updatestatusbyid.json`, categoryObj);
  }
  updateMultipleStatus(categoryObj) {
    return API.post(
      `/StoreProductCategory/multipleupdatestatuscategorybyids.json`,
      categoryObj,
    );
  }
  updateCategoryParent(categoryObj) {
    return API.post(
      "/StoreProductCategory/updatecategoryparentcategoryrequest.json",
      { categoryParentCategoryModel: categoryObj },
    );
  }
  getCategoryDropdownOptions(categoryId, storeId) {
    return API.get(
      `/StoreProductCategory/getcategory/${categoryId}/${storeId}.json`,
    );
  }
}

const CategoryServiceCls = new CategoryService();

export default CategoryServiceCls;
