import { useEffect, useState } from "react";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getallcoupon, deletecoupon } from "../api/coupon";
import swal from "sweetalert";

toast.configure();

const ManageCoupon = () => {
  const [couponData, setCouponData] = useState([]);
  const history = useHistory();

  const FETCH_LIST = async () => {
    let res = await getallcoupon();
    console.log(res.data.data);
    setCouponData(res.data.data);
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
          // setIsLoading(true);
          if (!id) return console.log("Query Id Is Required!");
          const res = await deletecoupon(id);
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

  useEffect (()=>{
    FETCH_LIST();
  },[])

  const EDIT_COUPON = async (e, id) => {
    e.preventDefault();
    history.push(`/edit-coupon/${id}`);
  };
  return (
    <>
      <div className="bg-white px-3 md:px-8 h-40" />
      <div className="px-3 md:px-8 h-auto -mt-24">
        <Card>
          <CardHeader color="orange" contentPosition="none" className="bg-blue">
            <div className="w-full flex items-center justify-between">
              <h2 className="text-white text-2xl">Manage Coupon</h2>
            </div>
          </CardHeader>
          <CardBody>
            <div className="overflow-x-auto text-right addcupon-rit">
              <NavLink to="/add-coupon" className="btn blue-btn">
                Add Couoon
              </NavLink>
              {/* <Button onClick={OPEN_MODAL} >Add Couoon</Button> */}
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                      No
                    </th>
                    <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200  py-3 text-sm whitespace-nowrap font-light text-left w-120">
                      coupon Name
                    </th>
                    <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200  py-3 text-sm whitespace-nowrap font-light text-left w-120">
                      Coupon Code
                    </th>
                    <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200  py-3 text-sm whitespace-nowrap font-light text-center w-20">
                      No Of Coupon
                    </th>
                    <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200  py-3 text-sm whitespace-nowrap font-light text-center w-20">
                      Max Use/Person
                    </th>
                    <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200  py-3 text-sm whitespace-nowrap font-light text-center w-20">
                      Discount Type
                    </th>
                    <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200  py-3 text-sm whitespace-nowrap font-light text-center w-20">
                      Discount
                    </th>
                    <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                      Start Date
                    </th>
                    <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                      End Date
                    </th>
                    <th className="min-w px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-center w-60">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {couponData.length > 0 &&
                    couponData.map((ele, i) => {
                      return (
                        <tr key={i}>
                          <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                            {i + 1}
                          </td>
                          <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                            {ele.couponName}
                          </td>
                          <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                            {ele.couponCode}
                          </td>
                          <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                            {ele.noOfCoupon}
                          </td>
                          <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                            {ele.everyPersonUsed}
                          </td>
                          <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                            {ele.discountType}
                          </td>
                          <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                            {ele.discountAmount}
                          </td>
                          <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                            {ele.startDate.split("T")[0]}
                          </td>
                          <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                            {ele.endDate.split("T")[0]}
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
                              className="mr-2 float-left"
                              style={{ cursor: "pointer" }}
                              onClick={(e) => EDIT_COUPON(e, ele._id)}
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
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default ManageCoupon;
