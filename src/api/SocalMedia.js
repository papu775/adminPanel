import client from './client';

const editSocalMedia = (data) => client.post('/admin/editSocalMedia', data);
const getSocalMedia = ()=> client.get('/admin/getSocalMedia');

export {
    editSocalMedia,
    getSocalMedia
}