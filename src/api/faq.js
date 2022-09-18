import client from './client';

const createFaq = (data) => client.post(`/admin/cms/addFaq`, data)

const updateFaq = (id, data) => client.put(`/admin/faq/${id}`, data)

const getAllFaqs = () => client.get(`/admin/cms/getFaq`)

const deleteFaqs = (id) =>client.delete(`/admin/cms/deleteFaq/${id}`)

const getFaq = (id) =>client.get(`/admin/cms/getfaq/${id}`)
const editFaq = (id, data) => client.post(`/admin/cms/editFaq/${id}`, data);

const changeFaqStatus = (id, status) => client.patch(`/admin/cms/changeFaqStatus/${id}/${status}`, {})


export {
    createFaq,
    updateFaq,
    getAllFaqs,
    deleteFaqs,
    getFaq,
    editFaq,
    changeFaqStatus
}