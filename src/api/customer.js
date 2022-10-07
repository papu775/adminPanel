import client from './client';

const customerList = () => client.get('/admin/customerList')
const changeCustomerListStatus = (id, status) => client.patch(`/admin/customerListStatus/${id}/${status}`, {})
const reasonOfBlock = (data) => client.post(`/admin/reasonOfBlock`, data)


export {
    customerList,
    changeCustomerListStatus,
    reasonOfBlock
}

// /customerListStatus