import { forwardRef, useEffect, useState } from "react";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import Input from "@material-tailwind/react/Input";
import Textarea from "@material-tailwind/react/Textarea";

import Image from "@material-tailwind/react/Image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddBannerImageModal from "components/AddBannerImageModal";
import { useForm } from "react-hook-form";

import {
  getBannerDetails,
  changeBannerImageStatus,
  deleteBannerImage,
  editBannertext
} from "../api/bannerImage";
import swal from "sweetalert";

toast.configure();

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
  const [selectedData, setSelectedData] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();
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

  useEffect(() => {
    Get_Banner_Details();
  }, []);

  const Edit_Banner_Text = async ()=>{
    try {
      // const form = document.getElementById("upper-text");
      // const formData = new FormData(form);
      // console.log(formData);
      const res = await editBannertext();
      console.log(res);
      if(res.ok){
        toast.success(res.data.msg);
      }else{
        toast.error(res.data.msg)
      }
      // addCategory
      // const res = await addCategory(data);
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  const TOGGLE_STATUS = async (e, id, isActive) => {
    try {
      const res = await changeBannerImageStatus(
        id,
        isActive == true ? true : false
      );
      console.log(res.data.data);
      if (!res.ok) return toast.error(res.data.msg);
      toast.success(res.data.msg);
      Get_Banner_Details();
    } catch (err) {
      console.error(err);
    }
  };
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
            <div className="flex flex-wrap -mx-3 mb-1">
          <form class="w-full lg:w-6/12 pr-4 mb-10" id='upper-text' onSubmit={handleSubmit(Edit_Banner_Text)}>
                  <div class="flex items-center border-b border-teal-500 py-2">
                    <input
                      class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                      type="text"
                      placeholder="Enter Upper Text"
                      aria-label="Full name"
                      // {...register("upperText")}
                      // value={upperText}
                      // onChange={e=>setUpperText(e.target.value)}
                    />
                    <button
                      class="flex-shrink-0 bg-blue hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
          </form>
          <form class="w-full lg:w-6/12 pr-4 mb-10">
                  <div class="flex items-center border-b border-teal-500 py-2">
                    <input
                      class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                      type="text"
                      placeholder="Enter Bottom Text"
                      aria-label="Full name"
                      // {...register("bottomText")}
                      // value={bottomText}
                      // onChange={e=>setBottomText(e.target.value)}
                    />
                    <button
                      class="flex-shrink-0 bg-blue hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                      type="submit"
                    >
                       Submit
                    </button>
                  </div>
          </form>
          </div>
            <div className="w-full lg:w-12/12 pr-4 mb-10 font-light ">
              <div className="overflow-x-auto  text-right addcupon-rit w-full">
                <Button onClick={OPEN_MODAL} className="bg-blue">
                  Add Banner Image
                </Button>
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
                          <tr>
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
                            <td
                              className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left"
                              id={`${ele._id}`}
                            >
                              <div className="status_details"></div>
                              {/* <select
                  defaultValue={ele.status}
                  className="dropdown font-light"
                  onChange={(e) => CHANGE_STATUS(ele._id, e.target.value)}
                >
                  <option value={true}>Active</option>
                  <option
                    value={false}
                    selected={ele.isActive ? "" : "selected"}
                  >
                    Inactive
                  </option>
                </select> */}
                              <label
                                for="checked-toggle"
                                class="inline-flex relative items-center cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  value={ele.isActive == true ? true : false}
                                  class="sr-only peer"
                                  checked={ele.isActive == true ? true : false}
                                />
                                <div
                                  class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                                  onClick={(e) =>
                                    TOGGLE_STATUS(
                                      e,
                                      ele._id,
                                      ele.isActive == true ? false : true
                                    )
                                  }
                                ></div>
                              </label>
                            </td>
                            <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
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
              Get_Banner_Details={Get_Banner_Details}
              onClose={onClose}
            />
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default ManageBannerImage;
