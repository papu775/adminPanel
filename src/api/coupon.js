import client from './client';

const addCoupon = (data) => client.post(`/admin/createcoupon`, data)
const getallcoupon = () => client.get('/admin/getallcoupon')
const deletecoupon = (id) =>client.delete(`/admin/deletecoupon/${id}`)
const getcoupon = (id) =>client.get(`/admin/getcoupon/${id}`)
const editCoupon = (id, data) => client.post(`/admin/editcoupon/${id}`, data);
export {
    editCoupon,
    addCoupon,
    getallcoupon,
    deletecoupon,
    getcoupon
}