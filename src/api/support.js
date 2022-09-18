import api from './client';

const getSupportList = () => api.get('/admin/supportList')

const changeSupportStatus = (id, status) => api.patch(`/admin/supportStatus/${id}/${status}`, {})

const deleteSupport = (id) => api.delete(`/admin/support/${id}`)

const sendEmail = (data) => api.post(`/admin/sendEmail`, data)

export {
    getSupportList,
    changeSupportStatus,
    deleteSupport,
    sendEmail
}