import client from './client';

const getAllItem = ()=> client.get('/admin/getAllItem');
const searchItemByCategoryName = (data)=> client.post(`/admin/searchItemByCategoryName`,data);

const changeItemStatus = (id, status) => client.patch(`/admin/changeItemStatus/${id}/${status}`, {})
const getItemById = (id) =>client.get(`/admin/getItemById/${id}`)
// /changeItemStatus/:id/:isActive
// /getItemById
export {
    getAllItem,
    searchItemByCategoryName,
    changeItemStatus,
    getItemById
}