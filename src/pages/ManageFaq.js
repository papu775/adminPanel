import { useEffect, useState } from "react";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllFaqs, deleteFaqs, changeFaqStatus } from "../api/faq";

import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import { createFaq } from "../api/faq";
import Switch from "react-switch";
import { useForm } from "react-hook-form";

toast.configure();

const ManageFaq = () => {
  const [showModal, setShowModal] = useState(false);
  const [getAllFaq, setGetAllFaq] = useState([]);
  // const [question, setQuestion] = useState("");
  // const [answer, setAnswer] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const FETCH_FAQ = async () => {
    const res = await getAllFaqs();
    setGetAllFaq(res.data.data);
    console.log(res.data.data);
  };

  useEffect(() => {
    FETCH_FAQ();
  }, []);
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
  const DELETE_ITEM = async (e, id) => {
    try {
      e.preventDefault();
      // setIsLoading(true);
      if (!id) return console.log("Query Id Is Required!");
      const res = await deleteFaqs(id);
      if (res.ok) {
        // setIsLoading(false);
        const res = await getAllFaqs();
        setGetAllFaq(res.data.data);
        console.log(res.data.data);
        toast.success(res.data.msg);
      } else {
        toast.error(res.data.msg);
      }

      // FETCH_LIST()
      // setIsLoading(false);
    } catch (err) {
      console.log(err);
      // setIsLoading(false);
    }
  };
  const TOGGLE_STATUS = async (e, id, isActive) => {
    try {
      const res = await changeFaqStatus(id, isActive === true ? true : false);
      console.log(res.data.data);
      if (!res.ok) return toast.error(res.data.msg);
      toast.success(res.data.msg);
      FETCH_FAQ();
    } catch (err) {
      console.error(err);
    }
  };
  const ADD_FAQ = async (data) => { 
    try {
      const res = await createFaq(data);
      if (res.status === 200) {
        FETCH_FAQ();
        reset();
        setShowModal(false);
        toast.success("Faq added successfully..");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const EDIT_FAQ = async (e, id) => {
  //   e.preventDefault();
  //   history.push(`/edit-faq/${id}`);
  // };
  return (
    <>
      <div className="bg-white px-3 md:px-8 h-40" />
      <div className="px-3 md:px-8 h-auto -mt-24">
        <Card>
          <CardHeader color="orange" contentPosition="none" className="bg-blue">
            <div className="w-full flex items-center justify-between">
              <h2 className="text-white text-2xl">Manage FAQ</h2>
            </div>
          </CardHeader>
          <CardBody>
            <div className="overflow-x-auto text-right addcupon-rit">
              <Button className="btn-blue bg-blue" onClick={OPEN_MODAL}>
                Add FAQ
              </Button>
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                      No
                    </th>
                    <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                      Question
                    </th>
                    <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                      Answer
                    </th>
                    <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200  py-3 text-sm whitespace-nowrap font-light text-left">
                      Status
                    </th>
                    <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200  py-3 text-sm whitespace-nowrap font-light text-left ">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getAllFaq.length > 0 &&
                    getAllFaq.map((ele, i) => (
                      <tr id={`row-${ele._id}`} key={i}>
                        <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                          {i + 1}
                        </td>
                        <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                          {ele.question}
                        </td>
                        <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                          {ele.answer}
                        </td>
                        {/* <td
                className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left"
                id={`${ele._id}`}
              >
                <div className="status_details">
                </div>
                <label
                  htmlFor="checked-toggle"
                  className="inline-flex relative items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={ele.isActive === true ? true:false}
                    className="sr-only peer"
                    checked={ele.isActive === true ? true:false}
                    
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" onClick={e => TOGGLE_STATUS(e, ele._id, ele.isActive === true ? false:true)}></div>
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
                        <td className="flex items-center space-x-2 border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-center">
                          <Button
                            color="green"
                            buttonType="outline"
                            size="small"
                            rounded={false}
                            block={false}
                            iconOnly={false}
                            ripple="dark"
                            className=""
                            style={{ cursor: "pointer" }}
                            // onClick={(e) => EDIT_FAQ(e, item._id)}
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
                            className=""
                            style={{ cursor: "pointer" }}
                            onClick={(e) => DELETE_ITEM(e, ele._id)}
                          >
                            <Icon name="delete" size="2xl" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </div>
      {/* <AddFaq
        showModal={showModal}
        setShowModal={setShowModal}
        selectedData=""
        onClose={onClose}
      /> */}
      <Modal size="lg" active={showModal} toggler={() => setShowModal(false)}>
        <form onSubmit={handleSubmit(ADD_FAQ)}>
          <ModalHeader toggler={() => setShowModal(false)}>Add Faq</ModalHeader>
          <ModalBody>
            <div className="from-group mb-3">
              <label className="text-base leading-relaxed text-gray-600 font-normal">
                Question
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("question", { required: "Question is Required!" })}
                onKeyUp={() => {
                  trigger("question");
                }}
              />
              {errors.question && (
                <small className="text-red-600">
                  {errors.question.message}
                </small>
              )}
            </div>
            <div className="from-group mb-3">
              <label className="text-base leading-relaxed text-gray-600 font-normal">
                Answer{" "}
              </label>
              <textarea
                rows="6"
                // value={answer}
                // onChange={(e) => setAnswer(e.target.value)}
                {...register("answer", { required: "Auestion is Required!" })}
                onKeyUp={() => {
                  trigger("answer");
                }}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                {" "}
              </textarea>
              {errors.answer && (
                <small className="text-red-600">
                  {errors.answer.message}
                </small>
              )}
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
              type="submit"
              // onClick={(e) => {
              //   ADD_FAQ(e);
              //   setShowModal(false);
              // }}
              ripple="light"
            >
              Save
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
};

export default ManageFaq;
