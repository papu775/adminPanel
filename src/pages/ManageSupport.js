import React, { useEffect, useState } from 'react'
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
// import { NavLink } from 'react-router-dom';
import {
    getSupportList,
    deleteSupport,
    sendEmail
} from '../api/support';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
import Modal from '../components/Modal'
import Pagination from '../components/Pagination';
import SpinnerComponent from 'components/Spinner';
import swal from "sweetalert";

toast.configure()

const ManageSupport = () => {
    const [queries, setQueries] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [selectedData, setSelectedData] = useState({});
    const [emailData, setEmailData] = useState({})

    //Pagination
    const itemsLimit = 10;
    // const [itemsLimit, setItemsLimit] = useState(10);
    const [pageIndex, setPageIndex] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pointer, setPointer] = useState(1);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handlePageClick = ({ pageIndex, isSetPointer = true }) => {
        if (isSetPointer) setPointer(pageIndex);
        setPageIndex(pageIndex);
        let startSliceIndex = (pageIndex - 1) * itemsLimit
        let endSliceIndex = startSliceIndex + itemsLimit;
        setItems(queries.slice(startSliceIndex, endSliceIndex));
    };

    useEffect(() => {
        if (!queries.length) return;
        setItems(queries.slice(0, itemsLimit))
        setTotalPages(Math.ceil(queries.length / itemsLimit))
    }, [queries])

    // MODAL

    const OPEN_MODAL = async (e, data) => {
        try {
            e.preventDefault()
            setSelectedData(data)
            setShowModal(true)
        } catch (err) {
            console.log(err)
        }
    }

    const FETCH_LIST = async () => {
        try {
            const res = await getSupportList()

            if (!res.ok) return setIsLoading(false);

            let list = res.data.data;

            if (!list.length) return setIsLoading(false);

            list = list.sort((a, b) => (new Date(b.createdAt)).getTime() - (new Date(a.createdAt)).getTime())

            setQueries(list);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        FETCH_LIST()
    },[])

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
                if (!id) return console.log('Query Id Is Required!')
                const res = await deleteSupport(id)
                if (!res.ok) {
                    return toast.error(res.data.msg);
                }
                toast.success(res.data.msg);
                FETCH_LIST()
                }
              });
        } catch (err) {
            console.log(err)
        }
    }

    const onChangeForm = (e) => {
        let form = {
            ...emailData,
            [e.target.name]: e.target.value
        }
        setEmailData(form)
    }

    const SEND_EMAIL = async (e, id, emailData, selectedData) => {
        try {
            e.preventDefault()
            let a = localStorage.getItem('lethustock-admin-data');
            console.log(JSON.parse(a));
            setIsLoading(true);
            const res = await sendEmail({
                id:selectedData._id,
                name:selectedData.name,
                email: selectedData.email,
                phone:selectedData.phone,
                subject: emailData.subject || 'Lethustock Contact Us',
                message: emailData.message
            })
            console.log(res);
            if (!res.ok) {
                setIsLoading(false);
                return toast.error('Error Sending Email!')
            }
            setIsLoading(false);
            FETCH_LIST();
            toast.success(res.data.msg);
            setSelectedData({});
        } catch (err) {
            console.log(err)
            setIsLoading(false);
        }
    }

    const onClose = () => {
        setShowModal(false);
        setSelectedData({});
        document.getElementById('message-textarea').value = '';
    }

    // const CHANGE_STATUS = async (id, status) => {
    //     try {
    //         setIsLoading(true);
    //         const res = await changeSupportStatus(id, status);
    //         if (!res.ok) {
    //             setIsLoading(false);
    //             return toast.error(res.data.msg)
    //         }
    //         setIsLoading(false)
    //         toast.success(res.data.msg)
    //         FETCH_LIST();
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }
    // md:ml-64 overlay
    return (
        <>
        {isLoading && <SpinnerComponent isLoading={isLoading} />}
            <div className="bg-white px-3 md:px-8 h-40" />
            <div className="px-3 md:px-8 h-auto -mt-24">
                <Card>
                    <CardHeader color="orange" contentPosition="none" className="bg-blue">
                        <div className="w-full flex items-center justify-between">
                            <h2 className="text-white text-2xl">Manage Contact Us</h2>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div className="overflow-x-auto">
                            <table className="items-center w-full bg-transparent border-collapse">
                                <thead>
                                    <tr>
                                        <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                            No
                                        </th>
                                        {/* <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                            Support Id
                                        </th> */}
                                        <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                            Name
                                        </th>
                                        <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                            Email
                                        </th>
                                        <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200  py-3 text-sm whitespace-nowrap font-light text-left w-120">
                                            Phone
                                        </th>
                                        <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200  py-3 text-sm whitespace-nowrap font-light text-left w-120">
                                            Message
                                        </th>
                                        <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200  py-3 text-sm whitespace-nowrap font-light text-center w-20">
                                            Status
                                        </th>
                                        <th className="min-w px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-center w-60">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        items.length > 0
                                        &&
                                        items.map((item, i) => (
                                            <tr id={`row-${item._id}`} key={i}>
                                                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    {(i + 1) + ((pageIndex - 1) * itemsLimit)}
                                                </th>
                                                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    {item.name}
                                                </td>
                                                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    {
                                                        item.email
                                                        &&
                                                        item.email.substring(0, 20)
                                                    }
                                                    <br />
                                                    {
                                                        item.email
                                                        &&
                                                        item.email.substring(20, item.email.length)
                                                    }
                                                </td>
                                                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    <p>{item.phone || '-'}</p>
                                                </td>
                                                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left"
                                                    id={`message-${item._id}`}
                                                >
                                                    <p>{item.message.substring(0, 20)}</p>
                                                    <p>{item.message.substring(20, 40)}...</p>
                                                </td>
                                                {/* <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left"
                                                    id={`message-${item._id}`}
                                                >
                                                    <select defaultValue={item.status} className='dropdown font-light' onChange={e => CHANGE_STATUS(item._id, e.target.value)}>
                                                        <option value='Open'>Open</option>
                                                        <option value='Processing'>Processing</option>
                                                        <option value='Closed'>Closed</option>
                                                    </select>
                                                </td> */}
                                                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                    {item.status}
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
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={e => DELETE_ITEM(e, item._id)}
                                                    >
                                                        <Icon name="delete" size="2xl" />
                                                    </Button>
                                                    <Button
                                                        color={item.message.length <= 150 ? 'gray' : 'blue'}
                                                        buttonType="outline"
                                                        size="small"
                                                        rounded={false}
                                                        // block={false}
                                                        iconOnly={false}
                                                        ripple="dark"
                                                        style={{ cursor: 'pointer' }}
                                                        className="mr-2 float-right"
                                                        onClick={(e) => OPEN_MODAL(e, item)}
                                                    >
                                                        <Icon name="reply" size="2xl" color={'blue'} />
                                                    </Button>
                                                </td>
                                                <Modal
                                                    showModal={showModal}
                                                    setShowModal={setShowModal}
                                                    selectedData={selectedData}
                                                    onChangeForm={onChangeForm}
                                                    onClose={onClose}
                                                    SUBMIT={e => SEND_EMAIL(e, item._id, emailData, selectedData)}
                                                />
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>

                            <br />
                            <br />
                            <Pagination
                                totalPages={totalPages}
                                handlePageClick={handlePageClick}
                                pageIndex={pageIndex}
                                setPointer={setPointer}
                                pointer={pointer}
                            />

                        </div>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}
export default ManageSupport;