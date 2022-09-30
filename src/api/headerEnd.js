import client from './client';

const editHeaderEnd = (data) => client.post('/admin/editHeaderEnd', data);
const getHeaderEnd = ()=> client.get('/admin/getHeaderEnd');

export {
    editHeaderEnd,
    getHeaderEnd
}