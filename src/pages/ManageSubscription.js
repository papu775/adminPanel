import { useEffect, useState } from "react";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import Switch from "react-switch";
// import Input from "@material-tailwind/react/Input";
// import Textarea from "@material-tailwind/react/Textarea";

// import Image from "@material-tailwind/react/Image";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { uploadCmsPageDetails, getCmsPage } from "../api/cms";
// import { useHistory, useParams } from "react-router-dom";
// import Checkbox from "@material-tailwind/react/Checkbox";
// import Radio from "@material-tailwind/react/radio";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import BasicCms from "../components/BasicCms";
// import AddCouponModal from "components/AddCouponModal";
import { getAllSubscriptions, deleteSubscription,changeSubscriptionStatus } from "../api/subscription";
// import AddSubscriptionModal from "components/AddSubscriptionModal";
import swal from "sweetalert";
import { NavLink } from "react-router-dom";

toast.configure();

const ManageSubscription = () => {
  // const [showModal, setShowModal] = useState(false);
  // const [selectedData, setSelectedData] = useState({});
  const [subscriptionData, setSubscriptionData] = useState([]);
  const FETCH_LIST = async () => {
    let res = await getAllSubscriptions();
    console.log(res.data.data);
    setSubscriptionData(res.data.data);
  };
  useEffect(() => {
    FETCH_LIST();
  }, []);
  // const OPEN_MODAL = async (e) => {
  //   try {
  //     e.preventDefault();
  //     setShowModal(true);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // const onClose = () => {
  //   setShowModal(false);
  //   // document.getElementById('message-textarea').value = '';
  // };
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
          // setIsLoading(true);
          if (!id) return console.log("Query Id Is Required!");
          const res = await deleteSubscription(id);
          if (!res.ok) {
            // setIsLoading(false);
            return toast.error(res.data.msg);
          }
          toast.success(res.data.msg);
          FETCH_LIST();
          // setIsLoading(false);
        } else {
          swal("Your imaginary file is safe!");
        }
      });
    } catch (err) {
      console.log(err);
      // setIsLoading(false);
    }
  };
  const TOGGLE_STATUS = async (e, id, isActive) => {
    try {
        const res = await changeSubscriptionStatus(id, isActive === true ? true : false);
        console.log(isActive);
        if (!res.ok) return toast.error(res.data.msg);
        toast.success(res.data.msg);
        FETCH_LIST();
    } catch (err) {
        console.error(err);
    }
  }
  return (
    <>
      <div className="bg-white px-3 md:px-8 h-40" />
      <div className="px-3 md:px-8 h-auto -mt-24">
        <Card className='mx-200'>
          <CardHeader color="orange" contentPosition="none" className="bg-blue">
            <div className="w-full flex items-center justify-between">
              <h2 className="text-white text-2xl">Manage Subscription</h2>
            </div>
          </CardHeader>
          <CardBody>
            <div className="overflow-x-auto text-right addcupon-rit">
              <NavLink to="/add-subscription" className="btn blue-btn">
                Add Subscription
              </NavLink>
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                      No
                    </th>
                    <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                      Category
                    </th>
                    <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                      Title
                    </th>
                    {/* <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                      Type
                    </th> */}
                    <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200  py-3 text-sm whitespace-nowrap font-light text-left w-120">
                    Subscription Upper Text
                    </th>
                    {/* <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200  py-3 text-sm whitespace-nowrap font-light text-left w-120">
                    Subscription Validity
                    </th> */}
                    <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200  py-3 text-sm whitespace-nowrap font-light text-left w-120">
                    Subscription Bottom Text
                    </th>
                    {/* <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200  py-3 text-sm whitespace-nowrap font-light text-left w-120">
                      Cost(USD)
                    </th> */}
                    <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200  py-3 text-sm whitespace-nowrap font-light text-center w-20">
                      Status
                    </th>
                    <th className="min-w px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-center w-60">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptionData.length > 0 &&
                    subscriptionData.map((ele, i) => {
                      return (
                        <tr key={i}>
                          <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                            {i + 1}
                          </td>
                          <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                            {ele.category}
                          </td>
                          <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                            {ele.title}
                          </td>
                          {/* <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                            {ele.type}
                          </td> */}
                          <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                            {ele.upperText}
                          </td>
                          {/* <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                            {ele.validitys.map((ele,i)=>{
                                return <div key={i}>
                                {ele}
                                <br></br>
                                </div>
                            })}
                          </td> */}
                          <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                            {ele.bottomText}
                          </td>
                          {/* <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                            {ele.cost}
                          </td> */}
                          {/* <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                            {ele.status}
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
            {/* <AddSubscriptionModal
              showModal={showModal}
              setShowModal={setShowModal}
              selectedData={selectedData}
              onChangeForm={onChangeForm}
              onClose={onClose}
              SUBMIT={e => SEND_EMAIL(e, item._id, emailData, selectedData)}
            /> */}
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default ManageSubscription;


