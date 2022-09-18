import { create } from 'apisauce'
import baseURL from 'config/baseUrl';

const api = create({
    baseURL
})

api.addRequestTransform(request => {
    let token = localStorage.getItem('lethustock-admin-token');
    request.headers['x-access-token'] = token;
})

export default api;