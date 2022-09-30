import { useEffect, useState } from "react";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Image from '@material-tailwind/react/Image';
import ReactPlayer from 'react-player';
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
import {getItemById} from "../api/item"

const ItemDetails = () => {
    const [itemData,setItemData] = useState({});
    const [itemSrc,setItemSrc]= useState('');
    const [categoryTitle,setCategoryTitle] = useState('');
    const [itemContributor,setItemContributor] = useState('');
    const { id } = useParams();
    useEffect(async ()=>{
      const res = await getItemById(id);
      console.log(res);
    //   setUserType(res.data.data.userType)
      setItemSrc(res.data.data.itemFile.uri);
      setCategoryTitle(res.data.data.itemCategoryType.categoryTitle);
      setItemContributor(res.data.data.itemContributor.fullName);
      setItemData(res.data.data);
    },[])
  return (
    <>
    <div className="bg-white px-3 md:px-8 h-40" />
    <div className="px-3 md:px-8 h-auto -mt-24">
      <Card>
        <CardHeader color="orange" contentPosition="none" className="bg-blue">
          <div className="w-full flex items-center justify-between">
            <h2 className="text-white text-2xl">Show Item Details</h2>
          </div>
        </CardHeader>
        <CardBody>
        <div className="w-full lg:w-12/12 pr-4 mb-10 font-light ">
                    <div className="overflow-x-auto  text-right addcupon-rit w-full">
                     </div>
                     <p className='text-2xl font-bold'>Item</p>
                     {/* <p className='text-xl'>{userData.profilePicture.size}</p> */}
                     <div style={{ width: '100%', display: 'flex' }}>
                        <div className='admin-images flex-wrap font-light' style={{ flexBasis: '100%' }}>
                            <div className="w-48">
                                {
                                    itemSrc
                                    &&
                                    itemSrc.slice((Math.max(0, itemSrc.lastIndexOf(".")) || Infinity) + 1)==='mp4'?<ReactPlayer controls url={itemSrc} width='200px' height='200px' />:<Image src={itemSrc} />
                                }
                            </div>
                        </div>
                    </div>
                     {/* {userData.profilePicture.size} */}
                     <hr />
                     <p className='text-2xl font-bold'>Title</p>
                     <p className='text-xl'>{itemData.itemTitle}</p>
                     <hr />
                     <p className='text-2xl font-bold'>Description</p>
                     <p className='text-xl'>{itemData.itemDescription}</p>
                     <hr />
                     <p className='text-2xl font-bold'>Price Type</p>
                     <p className='text-xl'>{itemData.itemPriceType}</p>
                     <hr />
                     <p className='text-2xl font-bold'>Item Price</p>
                     <p className='text-xl'>{itemData.itemPrice}</p>
                     <hr />
                     <p className='text-2xl font-bold'>Licence Fee</p>
                     <p className='text-xl'>{itemData.itemLicenceFee}</p>
                     <hr />
                     <p className='text-2xl font-bold'>Number Of Stock</p>
                     <p className='text-xl'>{itemData.numberOfStock}</p>
                     <hr />
                     <p className='text-2xl font-bold'>Category Type</p>
                     <p className='text-xl'>{categoryTitle}</p>
                     <hr />
                     <p className='text-2xl font-bold'>Contributor</p>
                     <p className='text-xl'>{itemContributor}</p>
                     <hr />
                     <p className='text-2xl font-bold'>Is Active</p>
                     <p className='text-xl'>{itemData.isActive?"Yes":"No"}</p>
                     <hr />                 
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

export default ItemDetails