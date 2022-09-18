import React from "react";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import { uploadBannerData } from "../api/bannerImage";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddBannerImageModal = ({ showModal, setShowModal, onClose,Get_Banner_Details }) => {

  // const [imageSrc, setImageSrc] = useState('');
  
  // const [isValid,setIsValid] = useState(false);
  // const [errMsg,setErrMsg] = useState({
  //   requ:""
  // });
  // useEffect(()=>{
  //      if(bannerImageTitle){
  //       setErrMsg("Banner Image Title Is Required");
  //      }
  // },[bannerImageTitle])
  const _SAVE_BANNER_FROM = async (e) => {
    e.preventDefault();
    try {
      const form = document.getElementById('save-banner-form')
      const formData = new FormData(form)
      const res = await uploadBannerData(formData);
      console.log(res);
      if(res.ok){
        setShowModal(false);
        Get_Banner_Details();
        // setImageSrc('');
        formData.delete('bannerImageTitle');
        toast.success(res.data.msg);
      }else{
        toast.error(res.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal size="lg" active={showModal} toggler={() => setShowModal(false)}>
      <form id="save-banner-form" onSubmit={(e) => _SAVE_BANNER_FROM(e)}>
        <ModalHeader toggler={() => setShowModal(false)}>
          Add Banner Image
        </ModalHeader>
        <ModalBody>
          <div>
            <p className="text-base leading-relaxed text-gray-600 font-normal">
              Image Title
            </p>
            <input
              type="text"
              name="bannerImageTitle"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              // onChange={e=>setBannerImageTitle(e.target.value)}
            />
            {/* <p className="text-red-600">{errMsg}</p> */}
          </div>
          <div>
            <p className="text-base leading-relaxed text-gray-600 font-normal">
              Image
            </p>
            <input
              type="file"
              accept="image/*"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="image"
              onChange={e => {
                e.preventDefault();
                // setImageSrc(URL.createObjectURL(e.target.files[0]))
            }}
            />
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
          >
            Save
          </Button>
        </ModalFooter>
        </form>
      </Modal>
    </>
  );
};

export default AddBannerImageModal;
