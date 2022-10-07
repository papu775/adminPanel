import client from './client';


const getLicenseInformation = ()=> client.get('/admin/showLicenseInformation');

export {
    getLicenseInformation
}