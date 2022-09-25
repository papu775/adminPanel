import client from './client';

const contributorList = () => client.get('/admin/contributorList')
const changeContributorListStatus = (id, status) => client.patch(`/admin/contributorListStatus/${id}/${status}`, {})

export {
    contributorList,
    changeContributorListStatus
}


