import { API } from "helpers/API";

class CategoryMasterService {
  getCategories(categoryObj) {
    return API.post(`/StoreProductCategory/list.json`, categoryObj);
  }

  getCategoriesWithTreeview(categoryObj) {
    return API.post(
      `/StoreProductCategory/getcategorytreeviewlist.json`,
      categoryObj
    );
  }

  getCategoryById(id) {
    return API.get(`/StoreProductCategory/get/${id}.json`);
  }

  createCategory(categoryObj) {
    return API.post(`/StoreProductCategory/create.json`, categoryObj);
  }

  updateCategory(categoryObj) {
    return API.post(`/StoreProductCategory/update.json`, categoryObj);
  }

  updateStatus(categoryObj) {
    return API.post(`/StoreProductCategory/updatestatusbyid.json`, categoryObj);
  }

  updateMultipleStatus(categoryObj) {
    return API.post(
      `/StoreProductCategory/multipleupdatestatuscategorybyids.json`,
      categoryObj
    );
  }

  updateCategoryParent(categoryObj) {
    return API.post(
      "/StoreProductCategory/updatecategoryparentcategoryrequest.json",
      { categoryParentCategoryModel: categoryObj }
    );
  }

  getCategoryDropdownOptions(CategoryId, storeId) {
    return API.get(
      `/StoreProductCategory/getcategory/${CategoryId}/${storeId}.json`
    );
  }

  getCategoryForProductOrder(CategoryId, storeId){
    return API.get(`/StoreProductCategory/getcategorywithfilter/${CategoryId}/${storeId}.json`)
  } 

  getCategoryByBrandDropdownOptions(brandId, storeId) {
    return API.get(
      `/StoreProductCategory/getcategorybybrandid/${brandId}/${storeId}.json`
    );
  }

  getCategoryByOptionsForStoreBuilder(brandId, storeId) {
    return API.get(
      `/StoreProductCategory/getcategorybyproduct/${brandId}/${storeId}.json`
    );
  }

  CategoriesDragAndDrop(categoryObj) {
    return API.post(`/StoreProductCategory/changesequence.json`, categoryObj);
  }

  updateCategorySingleField(categoryId, statusObj) {
    return API.patch(
      `/StoreProductCategory/update/${categoryId}.json`,
      statusObj
    );
  }

  getCategoryFilterCustomFields(categoryId, storeId) {
    return API.get(
      `/StoreProductCategory/GetStoreProductFilterCustomFieldsCategory/${categoryId}/${storeId}.json`
    );
  }

  createUpdateCategoryFilterCustomFields(Obj) {
    return API.post(
      `/StoreProductFilterCustomFieldsMappingCategory/createupdate.json`,
      Obj
    );
  }

  imagesList(categoryObj) {
    return API.post(
      `/multiplecategoryimages/getmultiplecategoryimagesbycategoryid.json`,
      categoryObj
    );
  }

  getImageById(id) {
    return API.get(
      `/multiplecategoryimages/getmultiplecategoryimagesbyid/${id}.json`
    );
  }

  createMultipleImages(createObj) {
    return API.post(`/multiplecategoryimages/create.json`, createObj);
  }

  updateMultipleImages(updateObj) {
    return API.post(`/multiplecategoryimages/update.json`, updateObj);
  }

  deleteImage(deleteObj) {
    return API.post(`/multiplecategoryimages/updatestatusbyid.json`, deleteObj);
  }

  createShopByGardenProducts(productsObj) {
    return API.post(
      `/StoreProduct/createshopbygardenproducts.json`,
      productsObj
    );
  }

  getShopGardenProducts(productsObj) {
    return API.post(
      `/StoreProduct/getcategoryproductsbycategoryid.json`,
      productsObj
    );
  }

  deleteShopGardenProducts(deleteObj) {
    return API.post(
      `/StoreProduct/deleteshopbygardensproductbymainid.json`,
      deleteObj
    );
  }
}

const CategoryMasterServiceCls = new CategoryMasterService();

export default CategoryMasterServiceCls;
