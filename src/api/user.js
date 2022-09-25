import client from './client';

const getUsers = () => client.get(`/admin/fetchUsers`)

const changeAccountActiveStatus = (id, status) => client.patch(`/admin/user/changeActiveStatus/${id}/${status}`, {})
const getuser = (id) =>client.get(`/admin/getuser/${id}`)
export {
    getUsers,
    changeAccountActiveStatus,
    getuser
}