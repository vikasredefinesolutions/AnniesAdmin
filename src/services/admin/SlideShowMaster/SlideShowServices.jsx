import { API } from "helpers/API";

class SlideShowService {
    listSlideShow(param) {
        return API.post(`/SlideShowMaster/list.json`, param);
    }
    listSlideShowById(id) {
        return API.get(`/SlideShowMaster/getslideshowmasterlistbyid/${id}.json`);
    }
    createSlideShow(param) {
        return API.post(`/SlideShowMaster/create.json`, param);
    }
    updateSlideShow(param) {
        return API.post(`/SlideShowMaster/update.json`, param);
    }
    updateSlideShowStatus(param) {
        return API.post(`/SlideShowMaster/updatestatus.json`, param);
    }

    // api end point for Slides
    getAllSlidesDetails(param) {
        return API.post(`/SlideShowDetails/list.json`, param);
    }
    createSlides(param) {
        return API.post(`/SlideShowDetails/create.json`, param);
    }
    updateSlides(param) {
        return API.post(`/SlideShowDetails/update.json`, param);
    }
    getSlidesById(id) {
        return API.get(`/SlideShowDetails/get/${id}.json`);
    }
    updateSlideDetailStatus(param) {
        return API.post(`/SlideShowDetails/updatestatusbyid.json`, param);
    }
}

const SlideShowServiceCls = new SlideShowService();

export default SlideShowServiceCls;
