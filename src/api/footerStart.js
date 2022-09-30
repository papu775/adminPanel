import client from './client';

const editFooterStart = (data) => client.post('/admin/editFooterStart', data);
const getFooterStart = ()=> client.get('/admin/getFooterStart');

export {
    editFooterStart,
    getFooterStart
}