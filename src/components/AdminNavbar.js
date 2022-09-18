import React,{useEffect} from "react";
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
import Image from '@material-tailwind/react/Image';
import Dropdown from '@material-tailwind/react/Dropdown';
import DropdownItem from '@material-tailwind/react/DropdownItem';
import { logout } from '../api/auth';

toast.configure()

export default function AdminNavbar({ showSidebar, setShowSidebar, admin }) {
    const history = useHistory();
    useEffect(() => {
        const adminData = localStorage.getItem("lethustock-admin-data");
        if(!adminData){
            history.push("/");
        }
  },[history]);

    const _LOGOUT = async () => {
        try {
            const res = await logout()
            if (!res.ok) return alert(res.data.msg || res.data.message)
            localStorage.clear();
            history.push('/');
            toast.success(res.data.msg)
        } catch (err) {
            console.log('logout error', err)
        }
    }

    return (
        <nav className="bg-white md:ml-0 py-6 px-3">
            <div className="container max-w-full mx-auto flex items-center justify-between md:pr-8 md:pl-10">
                <div className="md:hidden">
                    <Button
                        color="transparent"
                        buttonType="link"
                        size="lg"
                        iconOnly
                        rounded
                        ripple="light"
                        onClick={() => setShowSidebar('left-0')}
                    >
                        <Icon name="menu" size="2xl" color="black" />
                    </Button>
                    <div
                        className={`absolute top-2 md:hidden ${showSidebar = 'left-0' ? 'left-64' : '-left-64'
                            } z-50 transition-all duration-300`}
                    >
                        <Button
                            color="transparent"
                            buttonType="link"
                            size="lg"
                            iconOnly
                            rounded
                            ripple="light"
                            onClick={() => setShowSidebar('-left-64')}
                        >
                            <Icon name="close" size="2xl" color="white" />
                        </Button>
                    </div>
                </div>

                <div className="flex justify-between items-center w-full">
                    <h4 className="uppercase text-gray text-sm tracking-wider mt-1">
                    </h4>

                    <div className="flex">
                        <div className="-mr-4 ml-6">
                            <Dropdown
                                color="transparent"
                                buttonText={
                                    <div className="w-12">
                                        <Image src={admin.profileImage ? admin.profileImage.uri : ''} rounded />
                                    </div>
                                }
                                rounded
                                style={{
                                    padding: 0,
                                    color: 'transparent',
                                }}
                            >
                                <DropdownItem color="lightBlue"
                                    onClick={() => _LOGOUT()}
                                >
                                    Logout
                                </DropdownItem>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
