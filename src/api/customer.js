import client from './client';

const customerList = () => client.get('/admin/customerList')
const changeCustomerListStatus = (id, status) => client.patch(`/admin/customerListStatus/${id}/${status}`, {})

export {
    customerList,
    changeCustomerListStatus
}

// /customerListStatus