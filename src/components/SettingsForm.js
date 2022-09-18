import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Input from '@material-tailwind/react/Input';
import Image from '@material-tailwind/react/Image';
import { editProfile } from '../api/editProfile';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputIcon from "@material-tailwind/react/InputIcon";

toast.configure()

export default function SettingsForm({ setIsProfileUpdated }) {
    const [profile, setProfile] = useState({})
    const [profileImageSrc, setProfileImageSrc] = useState('');
    const [logoImageSrc, setLogoImageSrc] = useState('');
    const [renderImage, setRenderImage] = useState(false);

    useEffect(() => {
        let admin = localStorage.getItem('lethustock-admin-data')
        if (!admin) {
            setRenderImage(true);
            return;
        };
        admin = JSON.parse(admin);
        setProfile(admin);
        setLogoImageSrc(admin.logo ? admin.logo.uri : '');
        setProfileImageSrc(admin.profileImage ? admin.profileImage.uri : '');
        setRenderImage(true);
    }, [])

    const _EDIT_PROFILE = async (e) => {
        try {
            e.preventDefault()
            const form = document.getElementById('edit-profile-form')
            const formData = new FormData(form)
            const phone = formData.get('contactNumber')
            if (phone) {
                if (phone.length > 11) {
                    return toast('Phone Number Cannot Exceed Max Of 11 Digits!')
                }
            }
            
            const res = await editProfile(formData)
            if (!res.ok) {
                console.log(res.data)
                return toast.error(res.data.error_msg)
            }
            toast.success(res.data.success_msg)
            let admin = res.data.data;
            localStorage.setItem('lethustock-admin-data', JSON.stringify(admin))
            setProfile(admin);
            setProfileImageSrc(admin.profileImage ? admin.profileImage.uri : '')
            setLogoImageSrc(admin.logo ? admin.logo.uri : '')
            setIsProfileUpdated(true)
        } catch (err) {
            console.log('error updating profile', err)
        }
    }

    return (
        <Card>
            <CardHeader color="orange" contentPosition="none" className="bg-blue">
                <div className="w-full flex items-center justify-between">
                    <h2 className="text-white text-2xl">Manage Profile</h2>
                </div>
            </CardHeader>
            <CardBody>
                <form id="edit-profile-form" onSubmit={(e) => _EDIT_PROFILE(e)}>
                    <div style={{ width: '100%', display: 'flex' }}>
                        <div className='admin-images flex-wrap mt-10 font-light' style={{ flexBasis: '100%' }}>
                            <span className='label'>
                                Logo
                            </span>
                            <div className="w-48">
                                {
                                    renderImage
                                    &&
                                    <Image src={logoImageSrc} />
                                }
                            </div>
                            <br />
                            <div className="lg:w-4/12 pl-0 mb-10 font-light pr-pc-btn">
                                <input
                                    type="file"
                                    name='logo'
                                    style={{
                                        padding: 16,
                                        backgroundColor: '#eee',
                                        color: '#000',
                                        cursor: 'pointer'
                                    }}
                                    onChange={e => {
                                        e.preventDefault();
                                        setLogoImageSrc(URL.createObjectURL(e.target.files[0]))
                                    }}
                                />
                            </div>
                        </div>
                        <div className='admin-images flex-wrap mt-10 font-light' style={{ flexBasis: '100%' }}>
                            <span className='label'>
                                Profile Picture
                            </span>
                            <div className="w-48">
                                {
                                    renderImage
                                    &&
                                    <Image src={profileImageSrc} />
                                }
                            </div>
                            <br />
                            <div className="lg:w-4/12 pl-0 mb-10 font-light pr-pc-btn">
                                <input
                                    type="file"
                                    name='profileImage'
                                    style={{
                                        padding: 16,
                                        backgroundColor: '#eee',
                                        color: '#000',
                                        cursor: 'pointer'
                                    }}
                                    onChange={e => {
                                        e.preventDefault();
                                        setProfileImageSrc(URL.createObjectURL(e.target.files[0]))
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div className='row reset-margin-padding'>
                        <div className="profile-details reset-margin-padding flex flex-wrap mt-10 mr-25">
                            <div className="w-full lg:w-4/12 pr-4 mb-10 font-light">
                                <label className='label'>Name</label>
                                <Input
                                    type="text"
                                    color="purple"
                                    placeholder={""}
                                    name='name'
                                    defaultValue={profile.name}
                                />
                            </div>
                            <div className="w-full lg:w-4/12 pl-4 mb-10 font-light">
                                <label className='label'>Email (non-editable)</label>
                                <Input
                                    type="email"
                                    color="purple"
                                    placeholder={""}
                                    defaultValue={profile.email}
                                    disabled={true}
                                />
                            </div>
                            <div className="w-full lg:w-4/12 pl-4 mb-10 font-light">
                                <label className='label'>Contact Email</label>
                                <Input
                                    type="email"
                                    color="purple"
                                    placeholder={""}
                                    name='contactEmail'
                                    defaultValue={profile.contactEmail || ''}
                                />
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className='row reset-margin-padding'>
                        <div className="profile-details reset-margin-padding flex flex-wrap mt-10 mr-25">
                            <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                                <label className='label'>Contact</label>
                                <Input
                                    type="tel"
                                    color="purple"
                                    placeholder={""}
                                    name='contactNumber'
                                    defaultValue={profile.phone}
                                />
                            </div>
                            <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                                <label className='label'>Address</label>
                                <Input
                                    type="text"
                                    color="purple"
                                    placeholder={""}
                                    name='address'
                                    defaultValue={profile.address}
                                />
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                    <h6 className="text-orange-500 text-sm mt-3 mb-3 font-light uppercase label">
                        Change Password
                    </h6>
                    <div className='flex flex-wrap mt-10'>
                        <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                            <label className='label'>Old Password</label>
                            <InputIcon
                                type="password"
                                color="green-500"
                                size="regular"
                                outline={true}
                                placeholder="password"
                                iconFamily="material-icons"
                                iconName="person"
                                name='oldPassword'
                            />
                        </div>
                        <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                            <label className='label'>New Password</label>
                            <InputIcon
                                type="password"
                                color="green-500"
                                size="regular"
                                outline={true}
                                placeholder="password"
                                iconFamily="material-icons"
                                iconName="person"
                                name='newPassword'
                            />
                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div className='flex justify-center'>
                        <div className="w-full lg:w-4/12 pl-4 mb-10 font-light forsubmit">
                            <Input
                                type="submit"
                                value='submit'
                                placeholder={''}
                                style={{
                                    height: 40,
                                    padding: 10,
                                    borderRadius: 5,
                                    backgroundColor: 'blue',
                                    color: '#000',
                                    cursor: 'pointer',
                                }}
                            />
                        </div>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
}
