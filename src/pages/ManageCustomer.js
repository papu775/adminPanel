import { useEffect, useState } from 'react';
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";

// import AddFaq from 'components/AddFaq';
import {useHistory} from 'react-router-dom';
import { customerList,changeCustomerListStatus,reasonOfBlock } from '../api/customer';
import { getuser } from "../api/user";

import Switch from "react-switch";
// import Modal from "@material-tailwind/react/Modal";
// import ModalHeader from "@material-tailwind/react/ModalHeader";
// import ModalBody from "@material-tailwind/react/ModalBody";
// import ModalFooter from "@material-tailwind/react/ModalFooter";
import Image from '@material-tailwind/react/Image';

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

const ManageCustomer = () => {
  const [showModal,setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const history = useHistory();
  const [customerAllList,setCustomerAllList] = useState([]);
  const [message,setMessage] = useState("You are blocked !");
  const FETCH_LIST = async () => {
    let res = await customerList();
    setCustomerAllList(res.data.data);
  };

  const TOGGLE_STATUS = async (e, id, isActive) => {
    try {
         
         const resGetUserById = await getuser(id);
        const resSendEmail = await reasonOfBlock({email:resGetUserById.data.data.email,message:message,fullName:resGetUserById.data.data.fullName,phone:resGetUserById.data.data.phoneNumber});
        console.log(resSendEmail);
        const res = await changeCustomerListStatus(id, isActive === true ? true : false);
        if (!res.ok) return toast.error(res.data.msg);
        toast.success(res.data.msg);
        FETCH_LIST();
    } catch (err) {
        console.error(err);
    }
  }

  useEffect(()=>{
    FETCH_LIST();
    // console.log(customerAllList);
  },[])

  const VIEW_USER = async (e, id) => {
    e.preventDefault();
    history.push(`/view-user/${id}`);
  };
//   const onChangeForm = (e) => {
//     let form = {
//         ...emailData,
//         [e.target.name]: e.target.value
//     }
//     setEmailData(form)
// }
  const onClose = () => {
    setShowModal(false);
    setSelectedData({});
    document.getElementById('message-textarea').value = '';
}

  return (
    <>
    <div className="bg-white px-3 md:px-8 h-40" />
    <div className="px-3 md:px-8 h-auto -mt-24">
      <Card>
        <CardHeader color="orange" contentPosition="none" className="bg-blue">
          <div className="w-full flex items-center justify-between">
            <h2 className="text-white text-2xl">Manage Customer</h2>
          </div>
        </CardHeader>
        <CardBody>
          <div className="overflow-x-auto text-right addcupon-rit">
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                    No
                  </th>
                  <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                    Full Name
                  </th>
                  <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                    Email
                  </th>
                  <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                    Phone
                  </th>
                  <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                    Profile Image
                  </th>
                  <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                    Date Of Joining
                  </th>
                  <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200  py-3 text-sm whitespace-nowrap font-light text-left w-120">
                    Status
                  </th>
                  <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200  py-3 text-sm whitespace-nowrap font-light text-center ">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
              {customerAllList.length > 0 &&
                                  customerAllList.map((ele, i) => {
          return (
            <tr key={i}>
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
                {ele.phoneNumber}
              </td>
              <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                <div style={style.inputs}>
                  <div className="w-40">
                    {/* <Image src={`https://nodeserver.mydevfactory.com:8089/1663934367950slider-img-2.jpg`} alt="..." /> */}
                    {/* <Image src={ele.profilePictur} alt="..." /> */}
                    <Image src={ele.profilePicture?ele.profilePicture.uri:""} alt="..." />
                  </div>
                </div>
              </td>
              <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                {ele.createdAt.split("T")[0]}
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
                  onClick={(e) => VIEW_USER(e, ele._id)}
                >
                  <Icon name="visibility" size="2xl" />
                </Button>
              </td>
            </tr>
          );
        })}

              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>

    <Modal size="lg" active={showModal} toggler={() => setShowModal(false)} >
                <ModalHeader toggler={() => setShowModal(false)}>
                    Send Email
                </ModalHeader>
                <ModalBody>
                    <div>
                        <p className="text-base leading-relaxed text-gray-600 font-normal">
                            Reson of block
                        </p>
                        <textarea
                            id='message-textarea'
                            name="message"
                            style={{
                                width: "100%",
                                height: 120,
                                backgroundColor: '#ccc',
                                padding: 5,
                                borderRadius: 5,
                                marginTop: 5,
                                outlineWidth: 2
                            }}
                            onFocus={e => e.target.style.outlineColor = 'green'}
                            onMouseOut={e => e.target.style.outlineColor = 'none'}
                            // onChangeCapture={(e) => onChangeForm(e)}
                        ></textarea>
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

                    {/* <Button
                        color="green"
                        onClick={(e) => {
                            SUBMIT(e)
                            setShowModal(false)
                        }}
                        ripple="light"
                    >
                        Send
                    </Button> */}
                </ModalFooter>
            </Modal>
  </>
  )
}

export default ManageCustomer