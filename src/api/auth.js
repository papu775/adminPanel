import client from './client';

const login = (data) => client.post('/admin/login', data)

const logout = () => client.get('/admin/logout')

const forgotPassword = (emailId) => client.get(`/admin/forgotPassword/${emailId}`)

export {
    login,
    logout,
    forgotPassword,
}