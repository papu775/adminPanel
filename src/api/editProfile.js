import client from './client';

const editProfile = (data) => client.post('/admin/updateDetails', data)

export {
    editProfile
}