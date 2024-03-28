import { API } from "helpers/API";

class NewsLetterArchiveServices {
    getNewsLetterArchive(params) {
        return API.post(`/NewsLetterArchive/list.json`, params)
    }

    createNewsLetterArchive(NewsLetterArchiveObj) {
        return API.post(`/NewsLetterArchive/create.json`, NewsLetterArchiveObj)
    }

    updateNewsLetterArchive(NewsLetterArchiveObj) {
        return API.post(`/NewsLetterArchive/update.json`, NewsLetterArchiveObj)
    }

    getNewsLetterArchiveDetails(id) {
        return API.get(`NewsLetterArchive/get/${id}.json`);
    }

    updateStatus(NewsLetterArchiveObj) {
        return API.post(`/NewsLetterArchive/updatestatusbyid.json`, NewsLetterArchiveObj);
    }

    updateMultipleStatus(NewsLetterArchiveObj) {
        return API.post(`/NewsLetterArchive/multipleupdatestatusbyids.json`, NewsLetterArchiveObj);
    }
}

const NewsLetterArchiveServicesCls = new NewsLetterArchiveServices();

export default NewsLetterArchiveServicesCls;