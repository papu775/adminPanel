import client from './client';

const uploadBannerData = (data) => client.post('/admin/uploadBannerImage', data)

const getBannerDetails = () => client.get(`/admin/showBannerImageList`)
const changeBannerImageStatus = (id, status) => client.patch(`/admin/bannerImageStatus/${id}/${status}`, {})

// const updateBannerVideo = (data) => client.patch('/admin/banner/video', data)

// const updateBannerCoverPic = (data) => client.patch('/admin/banner/coverPic', data)

const deleteBannerImage = (id) => client.delete(`/admin/deleteBannerImage/${id}`)

// const deleteBannerCoverPic = (index) => client.delete(`/admin/banner/coverPic/${index}`)
const editBannertext = (data) => client.post(`/admin/editBannertext`, data)
export {
    uploadBannerData,
    // uploadBannerVideo,
    getBannerDetails,
    changeBannerImageStatus,
    // updateBannerVideo,
    // updateBannerCoverPic,
    deleteBannerImage,
    // deleteBannerCoverPic
    editBannertext
}