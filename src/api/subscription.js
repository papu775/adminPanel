import client from './client';

// const createSubscription = (data) => client.post(`/admin/subscriptions/`, data)

// const getSubscription = (id) => client.get(`/admin/subscriptions/${id}`)

// const getAllSubscriptions = () => client.get(`/admin/subscriptions`)

// const updateSubscription = (id, data) => client.put(`/admin/subscriptions/${id}`, data)

// const deleteSubscription = (id) => client.delete(`/admin/subscriptions/${id}`)

// export {
//     createSubscription,
//     getSubscription,
//     getAllSubscriptions,
//     updateSubscription,
//     deleteSubscription
// }

const createSubscription = (data)=>client.post('/admin/createsubscription',data);
const getAllSubscriptions = () => client.get(`/admin/getallsubscription`);
const deleteSubscription = (id) => client.delete(`/admin/deletesubscription/${id}`);
const changeSubscriptionStatus = (id, status) => client.patch(`/admin/subscriptionStatus/${id}/${status}`, {})

export{
    createSubscription,
    getAllSubscriptions,
    deleteSubscription,
    changeSubscriptionStatus
}