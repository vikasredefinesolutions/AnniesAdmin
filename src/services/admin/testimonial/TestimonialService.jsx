import { API } from "helpers/API";

class TestimonialServices {
    getTestimonials(params) {
        return API.post(`/Testimonial/list.json`, params)
    }

    createTestimonial(testimonialObj) {
        return API.post(`/Testimonial/create.json`, testimonialObj)
    }

    updateTestimonial(testimonialObj) {
        return API.post(`/Testimonial/update.json`, testimonialObj)
    }

    getTestimonialDetails(id) {
        return API.get(`Testimonial/gettestimoniallistbyid/${id}.json`);
    }

    updateStatus(testimonialObj) {
        return API.post(`/Testimonial/updatestatus.json`, testimonialObj);
    }

    updateMultipleStatus(testimonialObj) {
        return API.post(`/Testimonial/multipleupdatestatus.json`, testimonialObj);
    }
}

const TestimonialServicesCls = new TestimonialServices();

export default TestimonialServicesCls;