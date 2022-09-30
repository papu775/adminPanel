import client from './client';

// const getAllUserCommissionByUser = () => client.get(`/admin/getAllUserCommissionByUser`)
// const editAllcommission = (data) => client.post('/admin/editAllCommission', data)
const addCategory = (data) => client.post(`/admin/addCategory`, data)
const categoryList = () => client.get('/admin/categoryList')
const categoryStatus = (id, status) => client.patch(`/admin/categoryStatus/${id}/${status}`, {})
const deleteCategory = (id) => client.delete(`/admin/deletecategory/${id}`)
const editCategory = (id, data) => client.put(`/admin/editCategory/${id}`, data);
const getCategoryById = (id) =>client.get(`/admin/getCategoryById/${id}`);
const editCategoryHeading = (data)=>client.post(`/admin/editCategoryHeading`,data);
const getCategoryHeading = ()=>client.get(`/admin/getCategoryHeading`);

export {
    // getAllUserCommissionByUser,
    // contributorList,
    // editAllcommission
    categoryList,
    addCategory,
    categoryStatus,
    deleteCategory,
    editCategory,
    getCategoryById,
    editCategoryHeading,
    getCategoryHeading
}





