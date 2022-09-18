import React, { useState, useEffect } from "react";
import Image from "@material-tailwind/react/Image";
import {
  getBannerDetails,
  changeBannerImageStatus,
  deleteBannerImage,
} from "../api/bannerImage";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";
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
const BannerImage = () => {
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
      const res = await changeBannerImageStatus(id, isActive = true ? true : false);
      console.log(isActive);
      if (!res.ok) return toast.error(res.data.msg);
      toast.success(res.data.msg);
      Get_Banner_Details();
  } catch (err) {
      console.error(err);
  }
}
  return (
    <>
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
              <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                {ele.bannerImageBottomText}
              </td>
              <td
                className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left"
                id={`${ele._id}`}
              >
                <div className="status_details">

                </div>
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
                    value={ele.isActive = true ? true:false}
                    class="sr-only peer"
                    checked={ele.isActive = true ? true:false}
                    
                  />
                  <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" onClick={e => TOGGLE_STATUS(e, ele._id, ele.isActive = true ? false:true)}></div>
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
              </td>
            </tr>
          );
        })}
    </>
  );
};

export default BannerImage;
