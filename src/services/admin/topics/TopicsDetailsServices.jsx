import axios from "axios";
import { API, FrontAPI } from "helpers/API";

class TopicsDetailsServices {
  getTopics(id = 0, topicObj) {
    if (topicObj === "") return API.get(`CmsTopics/list/${id}.json`);
    else return API.get(`CmsTopics/list/${id}/${topicObj}.json`);
  }

  getTopicsListWithFilter(filterObj) {
    return API.post(`CmsTopics/listwithfilter.json`, filterObj);
  }

  getTopicDetails(id = 0) {
    return API.get(`CmsTopics/get/${id}.json`);
  }

  getPublishTopics(storeId) {
    return API.get(`CmsTopicPublish/GetTopic/${storeId}.json`);
  }

  updateTopic(topicObj) {
    return API.post(`CmsTopics/update.json`, {
      cmsUpdateTopicsModel: topicObj,
    });
  }

  getTopicComponent(id) {
    return API.get(`CmsTopicComponentsController/gettopicomponents/${id}.json`);
  }

  updateTopicComponent(topicObj, id) {
    return API.post(`CmsTopicComponentsController/create.json`, {
      topicComponentsModel:
        topicObj.length > 0
          ? topicObj
          : [
              {
                component_Id: 0,
                page_Id: id,
                selected_Values: "",
                visibility: "on",
              },
            ],
    });
  }

  // Get Store Details from Store_id
  getStoreDetails(store_Id) {
    return API.get(`Store/get/${store_Id}.json`);
  }

  // Component json data to API
  async updateStoreDetails(slug, jsonData, storeUrl) {
    await axios.post(`${storeUrl}/api/json-upload`, jsonData, {
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        filename: `${slug}.html.json`,
        foldername: "cmsData",
      },
    });
  }

  // Component json data to API (Store Configuration)
  async updateStoreConfigDetails( jsonData, storeUrl) {
    await axios.post(`${storeUrl}/api/json-upload/updateStoreDetails`, jsonData, {
      headers: {
        accept: "*/*",
        "Content-Type": "application/json"
      },
    });
  }

  updateSingleTopicComponent(topicObj, id) {
    return API.post(`CmsTopicComponentsController/update.json`, {
      topicComponentsModel: topicObj,
    });
  }

  getPublishTopicComponent(id, type = "preview") {
    return FrontAPI.post(`CmsComponents/getpagecomponents.json`, {
      pageId: id,
      type: type,
    });
  }

  createTopic(topicObj) {
    return API.post(`CmsTopics/create.json`, {
      cmsCreateTopicsModel: topicObj,
    });
  }

  publishPage(topicObj) {
    return API.post(`CmsTopicPublish/Create.json`, {
      cmsTopicsPublishModel: topicObj,
    });
  }

  updatePublishPage(topicObj) {
    return API.post(`CmsTopicPublish/Update.json`, {
      cmsTopicsPublishModel: topicObj,
    });
  }

  publishTopicComponents(topicObj) {
    return API.post(`CmsTopicComponentsPublishController/create.json`, {
      componentsPublishModel: topicObj,
    });
  }

  cloneTopic(topicObj) {
    return API.post(`CmsTopics/clonetopic.json`, topicObj);
  }

  CloneStoreList(Obj) {
    return API.post(`CmsTopics/getstorebycmstopicid.json`, Obj);
  }
}

const TopicsDetailsServicesCls = new TopicsDetailsServices();

export default TopicsDetailsServicesCls;
