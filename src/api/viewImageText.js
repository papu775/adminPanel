import client from './client';

const editViewImageText = (data) => client.post(`/admin/editViewImageText`, data)
const getViewImageText = ()=>client.get(`/admin/getViewImageText`);
export {
    editViewImageText,
    getViewImageText
}