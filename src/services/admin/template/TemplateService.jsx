import { API } from "helpers/API";

class TemplateService {
    getTemplates(params) {
        return API.post(`/CmsTemplateController/list.json`, params)
    }
    createTemplates(TemplateObj) {
        return API.post(`/CmsTemplateController/create.json`, TemplateObj)
    }
    // updateTemplates(TemplateObj) {
    //     return API.post(`/CmsTemplateController/update.json`, TemplateObj)
    // }
    updateTemplateComponents(TemplateObj) {
        return API.post(`/CmsTemplateComponentsController/create.json`, { templateComponentsModel: TemplateObj })
    }
    getTemplateComponents(id) {
        return API.get(`/CmsTemplateComponentsController/get/${id}.json`)
    }
    getstoriescategoryfordropdown() {
        return API.get(`/CmsStoriesCategory/getstoriescategoryfordropdown.json`)
    }
    createAndUpdateCmsBannerLinks(param) {
        return API.post(`CmsBannerLinks/createupdate.json`, param)
    }
    getcmsbannerlinksbytopicsid(topicId) {
        return API.get(`CmsBannerLinks/getcmsbannerlinksbytopicsid/${topicId}.json`)
    }
    updateSingleTopicComponent(topicObj, id) {
        return API.post(`CmsTemplateComponentsController/update.json`, { templateComponentsModel: topicObj });
    }
    getTemplateDetails(id = 0) {
        return API.get(`CmsTemplateController/get/${id}.json`);
    }
}

const TemplateServiceCls = new TemplateService();

export default TemplateServiceCls;