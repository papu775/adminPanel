import client from './client';

const addContactInfo = (data) => client.post(`/admin/addcontactinfo`, data)
const getContactInfo = () =>client.get(`/admin/getcontactinfo`)
const editContactInfo = (data) => client.put(`/admin/editcontactinfo`, data);
export {
    getContactInfo,
    addContactInfo,
    editContactInfo
}