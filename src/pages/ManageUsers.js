import React, { useEffect, useState } from 'react'
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import { NavLink } from 'react-router-dom';
import Input from "@material-tailwind/react/Input"
import { useLocation, Redirect } from 'react-router-dom';
import CheckLogin from 'components/CheckLogin';
import { checkLoginStatus } from '../utils/services/index';
import { getUsers, changeAccountActiveStatus } from '../api/user'

import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserList from '../components/UserList';

toast.configure()

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [isFetchUsers, setIsFetchUsers] = useState(false);
    const history = useHistory();

    const FETCH_USERS = async () => {
        try {
            const res = await getUsers();
            if (!res.ok) alert(res.data.msg);
            console.log('fetching users', res.data.data)
            setUsers(res.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        FETCH_USERS()
    }, [isFetchUsers])

    const moveToDetailsPage = (e, user) => {
        e.preventDefault();
        history.push({
            pathname: '/UserDetails',
            state: {
                user
            }
        })
    }

    const ACTIVATE_DEACTIVATE_ACCOUNT = async (e, id) => {
        e.preventDefault();
        let status;
        console.log(e.target.checked)
        if (e.target.checked) {
            status = 'Activated';
        } else {
            status = 'Deactivated';
        }
        const res = await changeAccountActiveStatus(id, status)
        toast(res.data.msg);
        setUsers([])
        setIsFetchUsers(!isFetchUsers)
    }

    return (
        <>

            <div className="bg-white px-3 md:px-8 h-40" />
            <div className="px-3 md:px-8 h-auto -mt-24">
                <Card>
                    <CardHeader color="green" contentPosition="none">
                        <div className="w-full flex items-center justify-between">
                            <h2 className="text-white text-2xl">All Users</h2>
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
                                        <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                            Name
                                        </th>
                                        <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                            Phone No
                                        </th>
                                        <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                            Email Id
                                        </th>
                                        <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                            Subscribed User
                                        </th>
                                        <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                            Shop User
                                        </th>
                                        <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                            Status
                                        </th>
                                        <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-center w-20">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.length > 0
                                        &&
                                        <UserList
                                            users={users}
                                            ACTIVATE_DEACTIVATE_ACCOUNT={ACTIVATE_DEACTIVATE_ACCOUNT}
                                            moveToDetailsPage={moveToDetailsPage}
                                        />
                                    }
                                </tbody>
                            </table>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}
export default ManageUsers;