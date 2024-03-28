import { API } from "helpers/API";

class FormBuilderService {
  getFormBuilderList(paramObj) {
    return API.post(`FormBuilder/list.json`, paramObj);
  }
  getFormDataById(id) {
    return API.post(`FormBuilder/GetListById.json`, { id });
  }
  getFormFieldsList(paramObj) {
    return API.post(`FormFields/list.json`, paramObj);
  }
  getFormFieldsDataByFormId(formsId) {
    return API.post(`FormBuilderFields/GetListByFormsId.json`, { formsId });
  }
  createForm(paramObj) {
    return API.post(`FormBuilder/create.json`, paramObj);
  }
  updateForm(paramObj) {
    return API.post(`FormBuilder/update.json`, paramObj);
  }
  createFormFields(paramObj) {
    return API.post(`FormBuilderFields/create.json`, paramObj);
  }
  updateFormFields(paramObj) {
    return API.post(`FormBuilderFields/update.json`, paramObj);
  }
  updateFormBuilderById(args) {
    return API.post(`/FormBuilder/updatestatusbyid.json`, {
      args,
    });
  }

  addThemeConfigField(args) {
    return API.post('FormBuilderThemeConfigsController/create.json', args)
  }

  updateThemeConfigField(args) {
    return API.post('FormBuilderThemeConfigsController/update.json', args)
  }

  // formbuilder
  createProductCloneForFormBuilder(productObj) {
    return API.post(
      `/FormBuilderProduct/cloneproductformtostore.json`,
      productObj
    );
  }
  getformBuilderAddedProduct(productObj) {
    return API.post(`/FormBuilderProduct/listforformbuilder.json`, productObj);
  }
  getStoreProductsForFormBuilder(productObj) {
    return API.post("/StoreProduct/listforstorebuilder.json", productObj);
  }
  getBrandsByStore(storeID) {
    return API.get(
      `/StoreProductBrand/getbranddetailsbystoreid/${storeID}.json`,
      {}
    );
  }
  UpdateFormProduct(params) {
    return API.post(`/FormBuilderProduct/UpdateFormProduct.json`, params);
  }
  UpdateStatusOfFormProduct(params) {
    return API.post(`/FormBuilderProduct/updatestatusbyid.json`, params);
  }
  CloneFormBuilder(params) {
    return API.post(`/FormBuilder/Clone.json`, params);
  }

  getBannerDetails(args) {
    return API.post("/FormBuilderBannerImage/GetListByFormsId.json", args);
  }

  createBanner(args) {
    return API.post("FormBuilderBannerImage/create.json", args);
  }

  updateBanner(args) {
    return API.post("FormBuilderBannerImage/update.json", args);
  }
  getThemeConfigurations(args) {
    return API.post('FormBuilderThemeConfigsController/GetListByFormsId.json', args)
  }
  getThemeConfigValue(args) {
    return API.post('FormBuilderThemeConfigs/GetListByFormsId.json', args)
  }
  CreateFormBuilderThemeConfigs(args) {
    return API.post('FormBuilderThemeConfigs/create.json', args)
  }
  updateThemeConfigValue(args) {
    return API.post('FormBuilderThemeConfigs/update.json', args)
  }

  getFormBuilderDashboardListByStore(paramObj) {
    return API.post(`/SbDashBoard/formbuilderdashboardlistbystore.json`, paramObj);
  }

  publishFormBuilder(paramObj) {
    return API.post(`/FormBuilder/Publish.json`, paramObj);
  }

  getFilledForms(paramObj) {
    return API.post(`/FormBuilderFilledForms/GetListFormBuilderFilledForms.json`, paramObj);
  }


}

const FormBuilderServiceCls = new FormBuilderService();

export default FormBuilderServiceCls;
