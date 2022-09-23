import { useEffect, useState } from "react";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { categoryList, categoryStatus, deleteCategory } from "../api/category";
import Switch from "react-switch";
import { NavLink, useHistory } from "react-router-dom";
import swal from "sweetalert";
import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
import Image from '@material-tailwind/react/Image';

const ManageCategory = () => {
  const history = useHistory();
  const [categoryListData, setCategoryListData] = useState([]);

  const FETCH_LIST = async () => {
    let res = await categoryList();
    console.log(res.data.data);
    setCategoryListData(res.data.data);
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
          const res = await deleteCategory(id);
          if (!res.ok) {
            return toast.error(res.data.msg);
          }
          toast.success(res.data.msg);
          FETCH_LIST();
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    FETCH_LIST();
  }, []);
  const TOGGLE_STATUS = async (e, id, isActive) => {
    try {
      const res = await categoryStatus(id, isActive === true ? true : false);
      console.log(res.data.data);
      if (!res.ok) return toast.error(res.data.msg);
      toast.success(res.data.msg);
      FETCH_LIST();
    } catch (err) {
      console.error(err);
    }
  };
  const EDIT_CATEGORY = async (e, id) => {
    e.preventDefault();
    history.push(`/edit-category/${id}`);
  };

  
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
  return (
    <>
      <div className="bg-white px-3 md:px-8 h-40" />
      <div className="px-3 md:px-8 h-auto -mt-24">
        <Card>
          <CardHeader color="orange" contentPosition="none" className="bg-blue">
            <div className="w-full flex items-center justify-between">
              <h2 className="text-white text-2xl">Manage Category</h2>
            </div>
          </CardHeader>
          <CardBody>
            <div className="overflow-x-auto text-right">
              <NavLink to="/add-category" className="btn blue-btn">
                Add Category
              </NavLink>
              {/* <Button className="btn blue-btn" onClick={OPEN_MODAL}>Edit Commission</Button> */}
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
                      Bottom Text
                    </th>
                    <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                      Image
                    </th>
                    <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                      Status
                    </th>
                    <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categoryListData.length > 0 &&
                    categoryListData.map((ele, i) => {
                      return (
                        <tr key={i}>
                          <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                            {i + 1}
                          </td>
                          <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
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
                  // className="mr-2 float-right"
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

              <br />
              <br />
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default ManageCategory;
