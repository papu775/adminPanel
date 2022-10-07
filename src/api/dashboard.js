import client from './client';

const countUser = () => client.get('/admin/countNumberOfUser')


export {
    countUser  
}