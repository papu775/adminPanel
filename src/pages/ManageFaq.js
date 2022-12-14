import { useEffect, useState } from "react";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllFaqs, deleteFaqs, changeFaqStatus,getFaqById,editFaq} from "../api/faq";

import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import { createFaq } from "../api/faq";
import Switch from "react-switch";
import { useForm } from "react-hook-form";
import swal from "sweetalert";

toast.configure();

const ManageFaq = () => {
  const [showModal, setShowModal] = useState(false);
  const [getAllFaq, setGetAllFaq] = useState([]);
  const [faqOperationOption,setFaqOperationOption] = useState(true);
  const [faqId,setFaqId] = useState("");
  // const [question, setQuestion] = useState("");
  // const [answer, setAnswer] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
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
      setValue('answer','');
      setValue('question','');
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
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
      if (!id) return console.log("Query Id Is Required!");
      const res = await deleteFaqs(id);
      if (res.ok) {
        const res = await getAllFaqs();
        setGetAllFaq(res.data.data);
        console.log(res.data.data);
        toast.success(res.data.msg);
      } else {
        toast.error(res.data.msg);
      }
        }
      });

    } catch (err) {
      console.log(err);
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
  const SHOW_FAQ_BY_ID = async (e, id) => {
    e.preventDefault();
    setShowModal(true);
    setFaqOperationOption(false);
    setFaqId(id);
    const res = await getFaqById(id);
    setValue("question",res.data.data.question);
    setValue("answer",res.data.data.answer);
  };
  const EDIT_FAQ = async (data)=>{
    try {
      console.log(data);
      setFaqOperationOption(true);
      const res = await editFaq(faqId,data);
      if(res.ok){
        setShowModal(false);
        FETCH_FAQ();
        reset();
        toast.success(res.data.msg);
      }else{
        toast.error(res.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  }
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
                            onClick={(e) => SHOW_FAQ_BY_ID(e, ele._id)}
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
          <ModalHeader toggler={() => setShowModal(false)}> Manage Faq</ModalHeader>
          <form onSubmit={handleSubmit(faqOperationOption?ADD_FAQ:EDIT_FAQ)}>
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
                {...register("answer", { required: "Answer is Required!" })}
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
              type="button"
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
