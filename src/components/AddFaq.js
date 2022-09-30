import React, { useState } from "react";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import { createFaq } from '../api/faq';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllFaqs } from '../api/faq';

const AddFaq = ({ showModal, setShowModal, onClose }) => {
    // const [startDate,setStartDate] = useState(new Date());
    // const [endDate,setEndDate] = useState(new Date());
    // const [couponName,setCouponName] = useState("");
    // const [couponCode,setCouponCode] = useState("");
    // const [noOfCoupon,setNoOfCoupon] = useState(0);
    // const [maxUsageCoupon,setMaxUsageCoupon] = useState(0);
    // const [discountType,setDiscountType] = useState("Flat");
    // const [discountAmount,setDiscountAmount] = useState(0);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const ADD_FAQ = async (e) => {
        e.preventDefault();
        // alert(discountAmount)
        try {
            // const res = await addCoupon({startDate,endDate,couponName,couponCode,noOfCoupon,maxUsageCoupon,discountType,discountAmount});
            // console.log(res);
            const res = await createFaq({ question, answer });
            console.log("------------", res.status)
            if (res.status === 200) {
                getAllFaqs();
                toast.success("Faq added successfully..")
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Modal size="lg" active={showModal} toggler={() => setShowModal(false)}>
                <ModalHeader toggler={() => setShowModal(false)}>
                    Add Faq
                </ModalHeader>
                <ModalBody>

                    <div className="from-group mb-3">
                        <label className="text-base leading-relaxed text-gray-600 font-normal">
                            Question
                        </label>
                        <input type="text" onChange={e => setQuestion(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="from-group mb-3">
                        <label className="text-base leading-relaxed text-gray-600 font-normal">
                            Answer          </label>
                        {/* <textarea rows="6" onChange={e => setAnswer(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" >    </textarea> */}
                        <textarea
      className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
      onChange={e=>setAnswer(e.target.value)}
      id="headerEndButtonText"
      rows="3"
      placeholder="Your message"
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

                    <Button
                        color="green"
                        onClick={(e) => {
                            ADD_FAQ(e)
                            setShowModal(false)
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

export default AddFaq