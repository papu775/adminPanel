import { forwardRef, useEffect, useState } from 'react';
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
import Input from '@material-tailwind/react/Input';
import Textarea from '@material-tailwind/react/Textarea';

import Image from '@material-tailwind/react/Image';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { uploadCmsPageDetails, getCmsPage } from '../api/cms';
import { useHistory, useParams } from 'react-router-dom';
import Checkbox from "@material-tailwind/react/Checkbox"
import Radio from "@material-tailwind/react/radio"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BasicCms from '../components/BasicCms';
import BannerImage from 'components/BannerImage';
import AddBannerImageModal from 'components/AddBannerImageModal';
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";

import {getContactInfo,editContactInfo} from '../api/contactInfo';

const ManageContactInfo = () => {
const [showModal, setShowModal] = useState(false);
const [contactInfoData,setContactInfoData]= useState({});
// const [selectedData, setSelectedData] = useState({});
const [phone,setPhone] = useState(0);
const [email,setEmail] = useState("");
const [address,setAddress] = useState("");
const [id,setId] = useState("");
const OPEN_MODAL = async (e) => {
  e.preventDefault();
        try {
          setShowModal(true);
        } catch (err) {
          console.log(err);
        }
};
const onClose = () => {
    setShowModal(false);
};

const FETCH_DATA = async ()=>{
  const res = await getContactInfo();
  console.log(res.data.data);
  setId(res.data.data._id)
  setPhone(res.data.data.phone);
  setEmail(res.data.data.email);
  setAddress(res.data.data.address);
  setContactInfoData(res.data.data);
  
}

const EDIT_CONTACT_INFO = async (e)=>{
   e.preventDefault();
   const res = await editContactInfo({id,phone,email,address});
   if(res.ok){
    FETCH_DATA();
    toast.success(res.data.msg);
    setShowModal(false);
   }else{
    toast.error(res.data.msg);
   }
}

    useEffect(()=>{
        FETCH_DATA();
    },[])
  return (
    <>
    <div className="bg-white px-3 md:px-8 h-40" />
    <div className="px-3 md:px-8 h-auto -mt-24">
        <Card>
            <CardHeader color="orange" contentPosition="none" className="bg-blue">
                <div className="w-full flex items-center justify-between">
                    <h2 className="text-white text-2xl">Manage Contact Info</h2>
                </div>
            </CardHeader>
            <CardBody>
                
                <div className="w-full lg:w-12/12 pr-4 mb-10 font-light ">
                    <div className="overflow-x-auto  text-right addcupon-rit w-full">
                        <Button onClick={OPEN_MODAL}>EDIT CONTACT INFO</Button>
                     </div>
                     {
                        
                     }
                     <p className='text-2xl font-bold'>Call us</p>
                     <p className='text-xl'>{contactInfoData.phone}</p>
                     <hr />
                     <p className='text-2xl font-bold'>Email</p>
                     <p className='text-xl'>{contactInfoData.email}</p>
                     <hr />
                     <p className='text-2xl font-bold'>Address</p>
                     <p className='text-xl'>{contactInfoData.address}</p>
                     <hr />
                </div>
                {/* <AddBannerImageModal
              showModal={showModal}
              setShowModal={setShowModal}
              selectedData={selectedData}
              Get_Banner_Details = {Get_Banner_Details}
              onClose={onClose}
            /> */}
               <Modal size="lg" active={showModal} toggler={() => setShowModal(false)}>
      <form id="edit-contactinfo-form" onSubmit={EDIT_CONTACT_INFO}>
        <ModalHeader toggler={() => setShowModal(false)}>
          Edit Contact Info
        </ModalHeader>
        <ModalBody>
          <input type="hidden" value={id}  />
          <div>
            <p className="text-base leading-relaxed text-gray-600 font-normal">
              Phone
            </p>
            <input
              type="text"
              name="bannerImageTitle"
              placeholder='Enter Phone'
              onChange={e=>setPhone(e.target.value)}
              value={phone}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <p className="text-base leading-relaxed text-gray-600 font-normal">
              Email
            </p>
            <input
              type="text"
              name="bannerImageTitle"
              placeholder='Enter Email'
              onChange={e=>setEmail(e.target.value)}
              value={email}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <p className="text-base leading-relaxed text-gray-600 font-normal">
              Address
            </p>
            <input
              type="text"
              name="bannerImageTitle"
              placeholder='Enter Address'
              onChange={e=>setAddress(e.target.value)}
              value={address}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div> 
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="red" buttonType="link" onClick={onClose} ripple="dark">
            Close
          </Button>

          <Button
            color="green"
            type="submit"
            ripple="light"
            onClick={e=>
              EDIT_CONTACT_INFO(e)
            }
          >
            Edit
          </Button>
        </ModalFooter>
        </form>
      </Modal>
            </CardBody>
        </Card>
    </div>
    </>
  )
}

export default ManageContactInfo