import client from './client';

// const getAllUserCommissionByUser = () => client.get(`/admin/getAllUserCommissionByUser`)
// const contributorList = () => client.get('/admin/contributorList')
// const editAllcommission = (data) => client.post('/admin/editAllCommission', data)
// const editRoyalty = ()
const addRoyalty = (data) => client.post(`/admin/addRoyalty`,data);
const editRoyalty = (id, data) => client.put(`/admin/editRoyalty/${id}`, data); 
const getRoyalty = ()=> client.get('/admin/getRoyalty');


export {
    addRoyalty,
    editRoyalty,
    getRoyalty
    // getAllUserCommissionByUser,
    // contributorList,
    // editAllcommission
}