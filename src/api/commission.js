import client from './client';

const getAllUserCommissionByUser = () => client.get(`/admin/getAllUserCommissionByUser`)
const contributorList = () => client.get('/admin/contributorList')
const editAllcommission = (data) => client.post('/admin/editAllCommission', data)

export {
    getAllUserCommissionByUser,
    contributorList,
    editAllcommission
}