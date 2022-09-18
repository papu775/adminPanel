import client from './client';

const getCmsPage = (slug) => client.get(`/admin/cms/page/${slug}`)

const deleteCmsPage = (id) => client.delete(`/admin/cms/page/${id}`)

const getAllCmsPages = () => client.get(`/admin/cms/pages`)

const uploadCmsPageDetails = (data) => client.post(`/admin/cms/page`, data)

const updateCmsPage = (id, data) => client.patch(`/admin/cms/page/${id}`, data)

const changeCmsPageStatus = (id, status) => client.patch(`/admin/cms/pageStatus/${id}/${status}`, {})

export {
    getCmsPage,
    deleteCmsPage,
    getAllCmsPages,
    uploadCmsPageDetails,
    updateCmsPage,
    changeCmsPageStatus
}