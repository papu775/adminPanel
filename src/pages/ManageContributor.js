import {  useEffect, useState } from 'react';
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import AddFaq from 'components/AddFaq';
import {useHistory} from 'react-router-dom';
import { contributorList,changeContributorListStatus } from '../api/contributor';
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

const ManageContributor = () => {
  const history = useHistory();
  const [contributorAllList,setContributorAllList] = useState([]);

  const FETCH_LIST = async () => {
    let res = await contributorList();
    console.log(res.data.data[1].profilePicture.uri);
    setContributorAllList(res.data.data);
  };

  const TOGGLE_STATUS = async (e, id, isActive) => {
    try {
        const res = await changeContributorListStatus(id, isActive === true ? true : false);
        console.log(isActive);
        if (!res.ok) return toast.error(res.data.msg);
        toast.success(res.data.msg);
        FETCH_LIST();
    } catch (err) {
        console.error(err);
    }
  }

  useEffect(()=>{
    FETCH_LIST();
  },[])

  const VIEW_USER = async (e, id) => {
    e.preventDefault();
    history.push(`/view-user/${id}`);
  };

  return (
    <>
    <div className="bg-white px-3 md:px-8 h-40" />
    <div className="px-3 md:px-8 h-auto -mt-24">
      <Card>
        <CardHeader color="orange" contentPosition="none" className="bg-blue">
          <div className="w-full flex items-center justify-between">
            <h2 className="text-white text-2xl">Manage Contributor</h2>
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
              {contributorAllList.length > 0 &&
                                  contributorAllList.map((ele, i) => {
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
                    <Image src={ele.profilePicture?ele.profilePicture.uri:""} alt="..." />
                  </div>
                </div>
              </td>
              <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                {ele.createdAt.split("T")[0]}
              </td>
              {/* <td
                className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left"
                id={`${ele._id}`}
              >
                <div className="status_details">
                </div>
                <label
                  for="checked-toggle"
                  class="inline-flex relative items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={ele.isActive === true ? true:false}
                    class="sr-only peer"
                    checked={ele.isActive === true ? true:false}
                    
                  />
                  <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" onClick={e => TOGGLE_STATUS(e, ele._id, ele.isActive === true ? false:true)}></div>
                </label>
              </td> */}
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
  </>
  )
}

export default ManageContributor