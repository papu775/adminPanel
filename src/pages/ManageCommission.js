import { useEffect, useState } from 'react';
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
// import Input from '@material-tailwind/react/Input';
// import Textarea from '@material-tailwind/react/Textarea';

// import Image from '@material-tailwind/react/Image';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { uploadCmsPageDetails, getCmsPage } from '../api/cms';
// import { useHistory, useParams } from 'react-router-dom';
// import Checkbox from "@material-tailwind/react/Checkbox"
// import Radio from "@material-tailwind/react/radio"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import BasicCms from '../components/BasicCms';
// import { Pagination } from 'react-bootstrap';
import { getAllUserCommissionByUser,editAllcommission } from "../api/commission";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
// import { Data } from '@react-google-maps/api';
// import MultiselectCheckbox from "react-multiselect-checkbox";

const ManageCommission = () => {
  const [showModal, setShowModal] = useState(false);
  const [commissionData, setCommissionData] = useState([]);
  const [commissionAmount,setCommissionAmount] = useState(0);
  // const [allChecked,setAllChecked] = useState(false);
  // const [checkedData,setCheckedData] = useState();
  const FETCH_LIST = async () => {
    let res = await getAllUserCommissionByUser();
    console.log(res.data.data);
    setCommissionData(res.data.data);
  };

  useEffect(()=>{
    FETCH_LIST();
  },[])

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

  // const SELECT_COMMISSION_ID = (e,data)=>{
  //   e.preventDefault();
  //   try {
  //       alert(data);
  //   } catch (error) {
      
  //   }
  // }

  const EDIT_COMMISSION = async (e) => {
    e.preventDefault();
    // alert(discountAmount)
    try {
        // const res = await addCoupon({startDate,endDate,couponName,couponCode,noOfCoupon,maxUsageCoupon,discountType,discountAmount});
        // console.log(res);
        const res = await editAllcommission({ commissionAmount,commissionData});
        // if(res.data.status === 200){
        //   toast.success(res.data.msg);
        //   setShowModal(false);
        // }else{
        //   toast.error(res.data.msg);
        // }
        if (res.status === 200) {
            FETCH_LIST();
            // setCommissionAmount(0);
            setShowModal(false);

            toast.success(res.data.msg);
        }else{
          toast.error(res.data.msg);
        }
    } catch (error) {
        console.log(error);
    }
}

const handelChange = (e)=>{
  // alert(e.target.name);
    const {name,checked} = e.target;
    if(name === "allSelect"){
       let tempCommission = commissionData.map(ele=>{
        return {...ele,isChecked:checked};
       });
      //  setCheckedData(commissionData);
       setCommissionData(tempCommission);
    }else{
      let tempCommission = commissionData.map(ele=> ele._id === name ? {...ele,isChecked:checked}:ele)
      // setCheckedData(tempCommission);
      setCommissionData(tempCommission);
    }

}

  return (
    <>
    <div className="bg-white px-3 md:px-8 h-40" />
    <div className="px-3 md:px-8 h-auto -mt-24">
        <Card>
            <CardHeader color="orange" contentPosition="none" className="bg-blue">
                <div className="w-full flex items-center justify-between">
                    <h2 className="text-white text-2xl">Manage Commission</h2>
                </div>
            </CardHeader>
            <CardBody>
               <div className="overflow-x-auto text-right">
               <Button className="btn blue-btn" onClick={OPEN_MODAL}>Edit Commission</Button>
                            <table className="items-center w-full bg-transparent border-collapse">
                                <thead>
                                    <tr>
                                        <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                           <input 
                                           type="checkbox" 
                                           name="allSelect"
                                           checked={commissionData.filter(ele=>ele?.isChecked !==true).length<1} 
                                           onChange={handelChange}
                                           />
                                        </th>
                                        <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                            No
                                        </th>
                                        <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                          Contributor Name
                                        </th>
                                        <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                          Contributor Email
                                        </th>
                                        <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                           Commission Amount
                                        </th>
                                        <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                          Last Update
                                        </th>
                                        <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                          Current Update
                                        </th>
                                        <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                          Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                {commissionData.length > 0 &&
                    commissionData.map((ele, i) => {
                      return (
                        <tr key={i}>
                          <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                          <input 
                          type="checkbox" 
                          name={ele._id} 
                          checked={ele?.isChecked || false}
                          onChange={handelChange} 
                          />
                          </td>
                          <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                            {i + 1}
                          </td>
                          <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                            {ele.fullName}
                          </td>
                          <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                            {ele.email}
                          </td>
                          <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                            {ele.CommissionDetails?ele.CommissionDetails.commissionAmount:'-'}
                          </td>
                          <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                            {
                            ele.CommissionDetails?
                            `${new Date(ele.CommissionDetails.lastTime).getDay().toString()}/${new Date(ele.CommissionDetails.lastTime).getMonth().toString()}`
                            
                            :'-'}
                          </td>
                          <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                            {ele.CommissionDetails?ele.CommissionDetails.currentTime.split("T")[0]:'-'}
                          </td>
                                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left flex">
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
                  // onClick={(e) => VIEW_USER(e, ele._id)}
                >
                  <Icon name="visibility" size="2xl" />
                </Button>
              </td>
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

    <Modal size="lg" active={showModal} toggler={() => setShowModal(false)}>
                <ModalHeader toggler={() => setShowModal(false)}>
                    Edit All Commission
                </ModalHeader>
                <ModalBody>
                    <div className="from-group mb-3">
                        <label className="text-base leading-relaxed text-gray-600 font-normal">
                          Commission Amount
                        </label>
                        <input  onChange = {e=>setCommissionAmount(e.target.value)}  type="number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="red"
                        buttonType="link"
                        onClick={onClose}
                        ripple="dark"
                    >
                        Close
                    </Button>

                    <Button
                        color="green"
                        onClick={(e) => {
                            EDIT_COMMISSION(e)
                            
                        }}
                        ripple="light"
                    >
                        Save
                    </Button>

                </ModalFooter>
       </Modal>
    </>
  )
}

export default ManageCommission