import React,{useState} from "react";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import { uploadBannerData } from "../api/bannerImage";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";

const AddBannerImageModal = ({ showModal, setShowModal, onClose,Get_Banner_Details }) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const [imageSrc, setImageSrc] = useState('');

  function handleChange(e) {
    console.log(e.target.files);
    setImageSrc(URL.createObjectURL(e.target.files[0]));
  }
  
  // const [isValid,setIsValid] = useState(false);
  // const [errMsg,setErrMsg] = useState({
  //   requ:""
  // });
  // useEffect(()=>{
  //      if(bannerImageTitle){
  //       setErrMsg("Banner Image Title Is Required");
  //      }
  // },[bannerImageTitle])
  const _SAVE_BANNER_FROM = async () => {
    try {
      const form = document.getElementById('save-banner-form')
      const formData = new FormData(form)
      const res = await uploadBannerData(formData);
      console.log(res);
      if(res.ok){
        setShowModal(false);
        Get_Banner_Details();
        reset();
        setImageSrc('');
        // setImageSrc('');
        // formData.delete('bannerImageTitle');
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
        <ModalHeader toggler={() => setShowModal(false)}>
          Add Banner Image
        </ModalHeader>
        <form id="save-banner-form" onSubmit={ handleSubmit(_SAVE_BANNER_FROM)}>
        <ModalBody>
          <div>
            <p className="text-base leading-relaxed text-gray-600 font-normal">
              Image Title
            </p>
            <input
              type="text"
              // name="bannerImageTitle"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              // onChange={e=>setBannerImageTitle(e.target.value)}
              {...register("bannerImageTitle", {
                required: "Banner Image Title Is Required! ",
              })}
              onKeyUp={() => {
                trigger("categoryTitle");
              }}
            />
                   {errors.bannerImageTitle && (
                    <p className="text-red-600">{errors.bannerImageTitle.message}</p>
                  )}
            {/* <p className="text-red-600">{errMsg}</p> */}
          </div>
          {/* <div>
            <p className="text-base leading-relaxed text-gray-600 font-normal">
              Image
            </p>
            <input
              type="file"
              accept="image/*"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              // name="image"
              {...register("image", { required: "Image Is Required! "})}
              onChange={() => {
                trigger("image");
              }}
            //   onChange={e => {
            //     e.preventDefault();
            //     // setImageSrc(URL.createObjectURL(e.target.files[0]))
            // }}
            />
               {errors.image && (
                <small className="text-red-600">{errors.image.message}</small>
              )}
          </div> */}
           <div className="w-full lg:w-12/12 pr-4 mb-10 font-light">
           <p className="text-base leading-relaxed text-gray-600 font-normal">
              Image 
            </p>
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col justify-center items-center pt-5 pb-6">
                      {imageSrc && <img src={imageSrc} className="mb-3 w-10 h-10" alt='...' />}
                      <svg
                        aria-hidden="true"
                        className="mb-3 w-10 h-10 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          // stroke-linecap="round"
                          // stroke-linejoin="round"
                          // stroke-width="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or
                        drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      {...register("image", {
                        required: "Image Is Required! ",
                      })}
                      onKeyUp={() => {
                        trigger("image");
                      }}
                      onChange={handleChange}
                    />
                  </label>
                  {errors.image && (
                    <p className="text-red-600">{errors.image.message}</p>
                  )}
            </div>
        </ModalBody>
        <ModalFooter>
          <Button color="red" buttonType="link" onClick={onClose} ripple="dark" type='button'>
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
