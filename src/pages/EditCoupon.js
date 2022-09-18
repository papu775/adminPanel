import React, { useState,useEffect } from 'react'
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Input from "@material-tailwind/react/Input"
import { useParams } from 'react-router-dom';
// import CheckLogin from 'components/CheckLogin';
// import { checkLoginStatus } from '../utils/services/index';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { DateRangePicker } from 'rsuite';
import { editCoupon, getcoupon } from '../api/coupon';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

toast.configure()

// const style = {
//     container: {
//         display: 'flex',
//         flexDirection: 'column',
//         gap: 60,
//     },
//     inputs: {
//         display: 'flex',
//         flexDirection: 'column',
//         gap: 7,
//     },
//     labels: {
//         fontWeight: 'bold',
//     }
// }

const EditCoupon = () => {
    const { id } = useParams();
    // const [isLoggedIn, setIsLoggedIn] = useState(false)
    // const [startCheck, setStartCheck] = useState(false);
    // const location = useLocation()
    const history = useHistory()
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [couponName, setCouponName] = useState("");
    const [couponCode, setCouponCode] = useState("");
    const [noOfCoupon, setNoOfCoupon] = useState(0);
    const [everyPersonUsed, setEveryPersonUsed] = useState(0);
    const [discountType, setDiscountType] = useState();
    const [discountAmount, setDiscountAmount] = useState(0);
    const EDIT_COUPON = async (e) => {
        e.preventDefault();
        try {
            const res = await editCoupon(id, { startDate, endDate, couponName, couponCode, noOfCoupon, discountType, discountAmount, everyPersonUsed });
            if (res.ok) {
                console.log("-----------", res)
                history.push('/manage-coupon');
                toast.success(res.data.msg);
            } else {
                // alert(res.data);
                // console.log(res.data.msg);
                toast.error(res.data.msg);
            }

        } catch (error) {
            console.log(error);
        }
    }
    const FETCH_COUPON = async () => {
        try {
            const res = await getcoupon(id);
            console.log(res.data.data);
            setCouponName(res.data.data.couponName);
            setDiscountType(res.data.data.discountType)
            setCouponCode(res.data.data.couponCode);
            setNoOfCoupon(res.data.data.noOfCoupon);
            setEveryPersonUsed(res.data.data.everyPersonUsed);
            setDiscountAmount(res.data.data.discountAmount);
            setStartDate(new Date(res.data.data.startDate));
            setEndDate(new Date(res.data.data.endDate));
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        FETCH_COUPON();
        // alert("");
        console.log(new Date("2022-09-09T08:52:15.720Z"));
    }, [])
    return (
        <>
            {/* {startCheck && <CheckLogin isLoggedIn={isLoggedIn} />} */}
            <div className="bg-white px-3 md:px-8 h-40" />
            <div className="px-3 md:px-8 h-auto -mt-24">
                <Card>

                    <CardHeader contentPosition="none" className="bg-blue">
                        <div className="w-full flex items-center justify-between">
                            <h2 className="text-white text-2xl">Edit Coupon</h2>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <form id="edit-profile-form" onSubmit={EDIT_COUPON}>
                            <div className='row reset-margin-padding'>
                                <div className="profile-details reset-margin-padding flex flex-wrap mt-10 mr-25">
                                    <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                        <Input
                                            type="text"
                                            color="purple"
                                            placeholder={"Coupon Title"}
                                            name='name'
                                            onChange={e => setCouponName(e.target.value)}
                                            value={couponName}
                                        />
                                    </div>
                                    <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                                        <Input
                                            type="text"
                                            color="purple"
                                            placeholder={"Coupon Code"}
                                            onChange={e => setCouponCode(e.target.value)}
                                            value={couponCode}
                                        />
                                    </div>
                                    <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                        <Input
                                            type="number"
                                            color="purple"
                                            placeholder={"No Of Coupon"}
                                            onChange={e => setNoOfCoupon(e.target.value)}
                                            value={noOfCoupon}
                                        />
                                    </div>
                                    <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                                        <Input
                                            type="number"
                                            color="purple"
                                            placeholder={"Every Person Maxed Use"}
                                            onChange={e => setEveryPersonUsed(e.target.value)}
                                            value={everyPersonUsed}
                                        />
                                    </div>
                                    <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                        <select
                                            className='w-full h-full text-gray-800 leading-normal shadow-none outline-none focus:outline-none focus:ring-0 focus:text-gray-800 px-0 false mt-input-purple-500 mt-input bg-transparent border-none undefined undefined border-1'
                                            onChange={e => setDiscountType(e.target.value)}
                                        >
                                            <option>Discount Type</option>
                                            <option value="Flat" selected={discountType==="Flat"?true:false}>Flat</option>
                                            <option value="Percentage" selected={discountType==="Percentage"?true:false}>Percentage</option>
                                        </select>
                                    </div>
                                    <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                                        <Input
                                            type="number"
                                            color="purple"
                                            placeholder={"Discount"}
                                            onChange={e => setDiscountAmount(e.target.value)}
                                            value={discountAmount}
                                        />
                                    </div>
                                    <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                                    </div>
                                    <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                                          <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                                    </div>
                                </div>
                                <div className='flex justify-center'>
                                    <div className="w-full lg:w-4/12 pl-4 mb-10 font-light forsubmit">
                                        <Input
                                            type="submit"
                                            value='submit'
                                            style={{
                                                height: 40,
                                                padding: 10,
                                                borderRadius: 5,
                                                backgroundColor: 'orange',
                                                color: '#000',
                                                cursor: 'pointer',
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                        {/* <div className="from-group mb-3">
                <label className="text-base leading-relaxed text-gray-600 font-normal">
                    Start Date
                </label>
                <input type="date" onChange={e=>setStartDate(e.target.value)} value={selectedData.startDate} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>    
                </div>
                <div className="from-group mb-3">
                <label className="text-base leading-relaxed text-gray-600 font-normal">
                    End Date
                </label>
                <input type="date" onChange={e=>setEndDate(e.target.value)} name="end-date" value={selectedData.endDate} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>    
                </div>
                <div className="from-group mb-3">
                    <label>Coupon Name</label>
                    <input type="text" onChange={e=>setCouponName(e.target.value)} placeholder="Enter Coupon Name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div className="from-group mb-3">
                    <label>Coupon Code</label>
                    <input type="text" name="coupon-code" onChange={e=>setCouponCode(e.target.value)} placeholder="Enter Coupon Code" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div className="from-group mb-3">
                    <label>No Of Coupon</label>
                    <input type="number" onChange={e=>setNoOfCoupon(e.target.value)} name="number-of-coupon" placeholder="Enter No Of Coupon" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div className="from-group mb-3">
                    <label>Discount Type</label>
                    <select onChange={e=>setDiscountType(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option value="Flat">Flat</option>
                        <option value="Percentage">Percentage</option>
                    </select>
                </div>
                <div className="from-group mb-3">
                    <label>Discount Amount</label>
                    <input type="number" onChange={e=>setDiscountAmount(e.target.value)} name="max-usage-coupon" placeholder="Discount Amount" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div> */}
                    </CardBody>
                </Card>
            </div>
        </>
    )
}

export default EditCoupon