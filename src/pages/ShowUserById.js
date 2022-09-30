import { useEffect, useState } from "react";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Image from '@material-tailwind/react/Image';
// import Button from "@material-tailwind/react/Button";
// import Icon from "@material-tailwind/react/Icon";
// import { NavLink } from "react-router-dom";
// import Input from "@material-tailwind/react/Input";
// import Textarea from "@material-tailwind/react/Textarea";

// import Image from "@material-tailwind/react/Image";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { uploadCmsPageDetails, getCmsPage } from "../api/cms";
import {  useParams } from "react-router-dom";
// import Checkbox from "@material-tailwind/react/Checkbox";
// import Radio from "@material-tailwind/react/radio";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import BasicCms from "../components/BasicCms";
// import AddCouponModal from "components/AddCouponModal";
import { getuser } from "../api/user";
// import swal from "sweetalert";

const ShowUserById = () => {
    const [userData,setUserData] = useState({});
    const [profileImg,setProfileImg]= useState('');
    const { id } = useParams();
    useEffect(async ()=>{
      const res = await getuser(id);
      console.log(res);
    //   setUserType(res.data.data.userType)
      setProfileImg(res.data.data.profilePicture.uri)
      setUserData(res.data.data);
    },[])
  return (
    <>
    <div className="bg-white px-3 md:px-8 h-40" />
    <div className="px-3 md:px-8 h-auto -mt-24">
      <Card>
        <CardHeader color="orange" contentPosition="none" className="bg-blue">
          <div className="w-full flex items-center justify-between">
            <h2 className="text-white text-2xl">Show {userData.userType}</h2>
          </div>
        </CardHeader>
        <CardBody>
        <div className="w-full lg:w-12/12 pr-4 mb-10 font-light ">
                    <div className="overflow-x-auto  text-right addcupon-rit w-full">
                     </div>
                     <p className='text-2xl font-bold'>Profile Picture</p>
                     {/* <p className='text-xl'>{userData.profilePicture.size}</p> */}
                     <div style={{ width: '100%', display: 'flex' }}>
                        <div className='admin-images flex-wrap font-light' style={{ flexBasis: '100%' }}>
                            <div className="w-48">
                                {
                                    profileImg
                                    &&
                                    <Image src={profileImg} />
                                }
                            </div>
                        </div>
                    </div>
                     {/* {userData.profilePicture.size} */}
                     <hr />
                     <p className='text-2xl font-bold'>Full Name</p>
                     <p className='text-xl'>{userData.fullName}</p>
                     <hr />
                     <p className='text-2xl font-bold'>Email</p>
                     <p className='text-xl'>{userData.email}</p>
                     <hr />
                     <p className='text-2xl font-bold'>Phone Number</p>
                     <p className='text-xl'>{userData.phoneNumber}</p>
                     <hr />
                     <p className='text-2xl font-bold'>Is Login</p>
                     <p className='text-xl'>{userData.isLoggedIn?"YES":"NO"}</p>
                     <hr />
                     <p className='text-2xl font-bold'>Is Verified</p>
                     <p className='text-xl'>{userData.isVerified?"YES":"NO"}</p>
                     <hr />
                     <p className='text-2xl font-bold'>Is Active</p>
                     <p className='text-xl'>{userData.isActive?"YES":"NO"}</p>
                     <hr />
                     <p className='text-2xl font-bold'>Is Active</p>
                     <p className='text-xl'>{userData.isActive?"YES":"NO"}</p>
                     <hr />
                     {/* <p className='text-2xl font-bold'>Date Of Joining</p>
                     <p className='text-xl'>{userData.createdAt.split("T")[0]}</p>
                     <hr /> */}
                     
                     {/* <hr />
                     <p className='text-2xl font-bold'>Email</p>
                     <p className='text-xl'>{contactInfoData.email}</p>
                     <hr />
                     <p className='text-2xl font-bold'>Address</p>
                     <p className='text-xl'>{contactInfoData.address}</p>
                     <hr /> */}
                </div>
        </CardBody>
      </Card>
    </div>
    </>
  )
}

export default ShowUserById