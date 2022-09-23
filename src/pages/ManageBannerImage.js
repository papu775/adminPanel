import { useEffect, useState } from 'react';
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
import Image from '@material-tailwind/react/Image';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddBannerImageModal from 'components/AddBannerImageModal';
import Switch from "react-switch";
import swal from "sweetalert";

import {
  getBannerDetails,
  changeBannerImageStatus,
  deleteBannerImage,
} from "../api/bannerImage";


toast.configure()


const style = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 60,
  },
  inputs: {
    display: "flex",
    flexDirection: "column",
    gap: 7,
    width: "100%",
  },
  placeInput: {
    display: "flex",
    flexDirection: "column",
    gap: 7,
    width: "100%",
    padding: 15,
  },
  labels: {
    fontWeight: "bold",
  },
  flexRow: {
    display: "flex",
  },
};

const ManageBannerImage = () => {
const [showModal, setShowModal] = useState(false);
// const [selectedData, setSelectedData] = useState({});
const selectedData = {};
const OPEN_MODAL = async (e) => {
        try {
          e.preventDefault();
          setShowModal(true);
        } catch (err) {
          console.log(err);
        }
};
const onClose = () => {
    setShowModal(false);
};

  const [bannerImageList, setBannerImageList] = useState([]);
  const Get_Banner_Details = async () => {
    let res = await getBannerDetails();
    console.log(res.data.data);

    setBannerImageList(res.data.data);
  };

  const DELETE_ITEM = (e, id) => {
    try {
      e.preventDefault();
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          if (!id) return console.log("Query Id Is Required!");
          const res = await deleteBannerImage(id);
          if (!res.ok) {
            return toast.error(res.data.msg);
          }
          toast.success(res.data.msg);
          Get_Banner_Details();
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(()=>{
    Get_Banner_Details();
  },[])

  const TOGGLE_STATUS = async (e, id, isActive) => {
    try {
        const res = await changeBannerImageStatus(id, isActive === true ? true : false);
        console.log(res.data.data);
        if (!res.ok) return toast.error(res.data.msg);
        toast.success(res.data.msg);
        Get_Banner_Details();
    } catch (err) {
        console.error(err);
    }
  }
  return (
    <>
    <div className="bg-white px-3 md:px-8 h-40" />
    <div className="px-3 md:px-8 h-auto -mt-24">
        <Card>
            <CardHeader color="orange" contentPosition="none" className="bg-blue">
                <div className="w-full flex items-center justify-between">
                    <h2 className="text-white text-2xl">Manage Banner Image</h2>
                </div>
            </CardHeader>
            <CardBody>
                
                <div className="w-full lg:w-12/12 pr-4 mb-10 font-light ">
                    
                    <div className="overflow-x-auto  text-right addcupon-rit w-full">
                    <Button onClick={OPEN_MODAL} className="bg-blue">Add Banner Image</Button>
                            <table className="items-center w-full bg-transparent border-collapse">
                                <thead>
                                    <tr>
                                        <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                            No
                                        </th>
                                        <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                            Image Title
                                        </th>
                                        <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                            Image
                                        </th>
                                        <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200  py-3 text-sm whitespace-nowrap font-light text-left w-20">
                                            Status
                                        </th>
                                        <th className="min-w px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-center w-60">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                {/* <BannerImage /> */}
                                {bannerImageList.length > 0 &&
                                  bannerImageList.map((ele, i) => {
          return (
            <tr key={i}>
              <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                {i + 1}
              </td>
              <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                {ele.bannerImageTitle}
              </td>
              <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                <div style={style.inputs}>
                  <div className="w-40">
                    <Image src={ele.bannerImage} />
                  </div>
                </div>
              </td>
              {/* <td
                className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left"
                id={`${ele._id}`}
              >
                <div className="status_details">

                </div>
                <label
                  htmlFor="checked-toggle"
                  className="inline-flex relative items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={ele.isActive === true ? true:false}
                    className="sr-only peer"
                    checked={ele.isActive === true ? true:false}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" onClick={e => TOGGLE_STATUS(e, ele._id, ele.isActive === true ? false:true)}></div>
                </label>
              </td> */}
{/* <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left"
                id={`${ele._id}`}>
                  <div class="flex justify-center">
  <div class="form-check form-switch">
    <input class="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm pointer-events-none filter-none opacity-50" type="checkbox" role="switch" id="flexSwitchCheckDisabled" disabled />
  </div>
</div>
<div class="flex justify-center">
  <div class="form-check form-switch">
    <input value={ele.isActive === true ? true:false} checked={ele.isActive === true ? true:false} onClick={e => TOGGLE_STATUS(e, ele._id, ele.isActive === true ? false:true)} class="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
  </div>
</div>
</td> */}


            <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left"
                id={`${ele._id}`}>
<Switch onChange={e => TOGGLE_STATUS(e, ele._id, ele.isActive === true ? false:true)} checked={ele.isActive === true ? true:false} />
            </td>
              
              <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                <Button
                  color="green"
                  buttonType="outline"
                  size="small"
                  rounded={false}
                  block={false}
                  iconOnly={false}
                  ripple="dark"
                  className="mr-2 float-right"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => DELETE_ITEM(e, ele._id)}
                >
                  <Icon name="edit" size="2xl" />
                </Button>
                <Button
                  color="red"
                  buttonType="outline"
                  size="small"
                  rounded={false}
                  block={false}
                  iconOnly={false}
                  ripple="dark"
                  className="mr-2 float-right"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => DELETE_ITEM(e, ele._id)}
                >
                  <Icon name="delete" size="2xl" />
                </Button>
              </td>
            </tr>
          );
                                 })}
                                </tbody>
                            </table>
                     </div>
                </div>
                <AddBannerImageModal
              showModal={showModal}
              setShowModal={setShowModal}
              selectedData={selectedData}
              Get_Banner_Details = {Get_Banner_Details}
              onClose={onClose}
            />
            </CardBody>
        </Card>
    </div>
    </>
  )
}

export default ManageBannerImage