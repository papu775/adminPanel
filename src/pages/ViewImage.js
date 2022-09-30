import { useEffect, useState } from "react";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import {getViewImageText,editViewImageText} from '../api/viewImageText';
import { getAllItem,searchItemByCategoryName,changeItemStatus } from '../api/item';
import Image from "@material-tailwind/react/Image";
import ReactPlayer from 'react-player'
import Switch from "react-switch";
import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
import {useHistory} from 'react-router-dom';

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

const ViewImage = () => {
  const history = useHistory();
  const [allItem,setAllItem] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    reset
    // formState: { errors },
    // trigger,
  } = useForm();

//   const Edit_HEADING = async (data)=>{
//     try {
//        alert(data.headingText)
//     } catch (err) {
//       console.log(err);
//     }
// }

const Edit_HEADING_Bottom_Text = async (data)=>{
     try {
         const res = await editViewImageText(data);
         if(res.ok){
           toast.success(res.data.msg);
         }else{
          toast.error(res.data.data);
         }
     } catch (err) {
      console.log(err);
     }
}

const Fetch_Text = async  ()=>{
    const res = await getViewImageText();
    setValue('headingText',res.data.data.headingText);
    setValue('headingBottomText',res.data.data.headingBottomText);
}

const Fetch_Item = async ()=>{
  try {
    const res = await getAllItem();
    setAllItem(res.data.data);
  } catch (err) {
    console.log(err);
  }
}

const SEARCH_ITEM = async (data)=>{
  // searchItemByCategoryName
  if(data.categoryTitle){
      const res = await searchItemByCategoryName(data);
      if(res.ok){
        setAllItem(res.data.data);
        reset();
      }else{
        setAllItem(res.data.data);
        reset();
      }
  }else{
     const res = await getAllItem();
     setAllItem(res.data.data);
  }
}

const ON_CHANGE_SEARCH_ITEM = async (data)=>{
  console.log(data);
  const res = await searchItemByCategoryName({categoryTitle:data});
  console.log(res);
  if(res.ok){
    setAllItem(res.data.data);
  }
}

const TOGGLE_STATUS = async (e, id, isActive) => {
  try {
    
      const res = await changeItemStatus(id, isActive === true ? true : false);
      console.log(isActive);
      if (!res.ok) return toast.error(res.data.msg);
      toast.success(res.data.msg);
      Fetch_Item();
  } catch (err) {
      console.error(err);
  }
}

const VIEW_ITEM = async (e, id) => {
  e.preventDefault();
  history.push(`/item-details/${id}`);
};

useEffect(()=>{
  Fetch_Text();
  Fetch_Item();
},[])
  return (
    <>
    <div className="bg-white px-3 md:px-8 h-40" />
    <div className="px-3 md:px-8 h-auto -mt-24">
      <Card>
        <CardHeader color="orange" contentPosition="none" className="bg-blue">
          <div className="w-full flex items-center justify-between">
            <h2 className="text-white text-2xl">View Item</h2>
          </div>
        </CardHeader>
        <CardBody>
        <div className="flex flex-wrap -mx-3 mb-1">
        <form className="w-full lg:w-6/12 pr-4 mb-5" onSubmit={handleSubmit(Edit_HEADING_Bottom_Text)}>
                <div className="flex items-center border-b border-blue-900 py-2">
                  <input
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    type="text"
                    placeholder="Enter Heading Text"
                    aria-label="Full name"
                    {...register("headingText")}
                    // value={bottomText}
                    // onChange={e=>setBottomText(e.target.value)}
                  />
                  <button
                    className="flex-shrink-0 bg-blue text-sm text-white py-1 px-2 rounded"
                    type="submit"
                  >
                     Submit
                  </button>
                </div>
        </form>
        <form className="w-full lg:w-6/12 pr-4 mb-5" onSubmit={handleSubmit(Edit_HEADING_Bottom_Text)}>
                <div className="flex items-center border-b border-blue-900 py-2">
                  <input
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    type="text"
                    placeholder="Edit Heading Bottom Text"
                    aria-label="Full name"
                    {...register("headingBottomText")}
                    // value={bottomText}
                    // onChange={e=>setBottomText(e.target.value)}
                  />
                  <button
                    className="flex-shrink-0 bg-blue text-sm text-white py-1 px-2 rounded"
                    type="submit"
                  >
                     Submit
                  </button>
                </div>
        </form>
        <form className="w-full lg:w-12/12 pr-4 mb-10" onSubmit={handleSubmit(SEARCH_ITEM)}>
                <div className="flex items-center border-b border-blue-900 py-2">
                  <input
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    type="text"
                    placeholder="Search Category"
                    aria-label="Full name"
                    {...register("categoryTitle")}    
                    onChange = {e=>ON_CHANGE_SEARCH_ITEM(e.target.value)}
                  />
                  <button
                    className="flex-shrink-0 bg-blue text-sm text-white py-1 px-2 rounded"
                    type="submit"
                  >
                     Search
                  </button>
                </div>
        </form>
        </div>
          <div className="overflow-x-auto text-right">
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                    No
                  </th>
                  <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                    Title
                  </th>
                  <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                    Category
                  </th>
                  <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                    Price
                  </th>
                  <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  Licence Fee
                  </th>
                  <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  Upload Date
                  </th>
                  <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                  Contributor Name
                  </th>
                  <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                    Item
                  </th>
                  <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                    Status
                  </th>
                  <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                    Action
                  </th>
                  {/* <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                    Status
                  </th>
                  <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                    Action
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {allItem.length > 0 &&
                  allItem.map((ele, i) => {
                    return (
                      <tr key={i}>
                        <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                          {i + 1}
                        </td>
                        <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                          {ele.itemTitle}
                        </td>
                        <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                          {ele.itemCategoryType.categoryTitle}
                        </td>
                        <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                          {ele.itemPrice}
                        </td>
                        <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                          {ele.itemLicenceFee}
                        </td>
                        <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                          {`${new Date(ele.uploadTime).getDay()}/${new Date(ele.uploadTime).getDate()}/${new Date(ele.uploadTime).getFullYear()}`}
                        </td>
                        <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                          {ele.itemContributor.fullName}
                        </td>
                        <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
              <div style={style.inputs}>
                <div className="w-40">
                  {/* <Image src={ele.itemFile.uri} /> */}
                  {/* <video ref="vidRef" src={ele.itemFile.uri} type="video/mp4"></video> */}
                  {
                    // {}
                  }
                  {
                    ele.itemFile.uri.slice((Math.max(0, ele.itemFile.uri.lastIndexOf(".")) || Infinity) + 1)==='mp4'?<ReactPlayer controls url={ele.itemFile.uri} width='200px' height='200px' />:<Image src={ele.itemFile.uri} />
                  }
                  
                </div>
              </div>
                       </td>
                       <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                       <Switch
                              onChange={(e) =>
                                TOGGLE_STATUS(
                                  e,
                                  ele._id,
                                  ele.isActive === true ? false : true
                                )
                              }
                              checked={ele.isActive === true ? true : false}
                            />
                        </td>
                        <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                <Button
                  color="blue"
                  buttonType="outline"
                  size="small"
                  rounded={false}
                  block={false}
                  iconOnly={false}
                  ripple="dark"
                  className="mr-2 float-right"
                  style={{ cursor: "pointer" }}
                  // onClick={(e) => DELETE_ITEM(e, ele._id)}
                  onClick={(e) => VIEW_ITEM(e, ele._id)}
                >
                  <Icon name="visibility" size="2xl" />
                </Button>
              </td>
                        {/* <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                          {ele.categoryTitle}
                        </td>
                        <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                          {ele.categoryBottomText}
                        </td>
                        <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
              <div style={style.inputs}>
                <div className="w-40">
                  <Image src={ele.image} />
                </div>
              </div>
                       </td>
                        <td
                          className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left"
                          id={`${ele._id}`}
                        >
                          <Switch
                            onChange={(e) =>
                              TOGGLE_STATUS(
                                e,
                                ele._id,
                                ele.isActive === true ? false : true
                              )
                            }
                            checked={ele.isActive === true ? true : false}
                          />
                        </td>
                        <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left flex ">
              <Button
                color="green"
                buttonType="outline"
                size="small"
                rounded={false}
                block={false}
                iconOnly={false}
                ripple="dark"
                className="mr-2 "
                style={{ cursor: "pointer" }}
                onClick={(e) => EDIT_CATEGORY(e, ele._id)}
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
                style={{ cursor: "pointer" }}
                onClick={(e) => DELETE_ITEM(e, ele._id)}
              >
                <Icon name="delete" size="2xl" />
              </Button>
            </td> */}
                      </tr>
                    );
                  })}
              </tbody>
            </table>

            <br />
            <br />
          </div>
        </CardBody>
      </Card>
    </div>
  </>
  )
}

export default ViewImage