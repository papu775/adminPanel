import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import Icon from '@material-tailwind/react/Icon';
import H6 from '@material-tailwind/react/Heading6';
// import logo from "../../src/assets/img/logo.png"
import Image from '@material-tailwind/react/Image';

const navigationList = [
    {
        id: 'manage-cms',
        text: 'Manage Cms',
        icon: 'expand',
    },
];

const navigationListHome = [
    {
        id: 'manage-home',
        text: 'Manage Home',
        icon: 'home',
    },
];

export default function Sidebar({ admin }) {
    const [showSidebar, setShowSidebar] = useState('-left-64');
    const [isCmsDropDownActive, setIsCmsDropDownActive] = useState(false);
    const [isHomeDropDownActive, setIsHomeDropDownActive] = useState(false);
    // const [navigationList, setNavigationList] = useState([]);

    // const getNavigationList = () => {
    //     // if (admin.role == 'admin') return setNavigationList(defaultNavigationList);

    //     let subadminNavigationList = [];

    //     defaultNavigationList.forEach((item, index) => {
    //         if (admin.permissions.includes(item.id)) {
    //             subadminNavigationList.push(item);
    //         }
    //     })
    //     setNavigationList(subadminNavigationList);
    // }

    // useEffect(() => {
    //     if (!Object.entries(admin).length) return;
    //     getNavigationList();
    // }, [admin]);


    const toggleClass = (activeDropDownClassId) => {
        switch (activeDropDownClassId) {
            case 'manage-cms-dropdown': {
                setIsCmsDropDownActive(!isCmsDropDownActive);
                return;
            }
            default :{}
        }
    };
    const toggleClassHome = (activeDropDownClassId) => {
        switch (activeDropDownClassId) {
            case 'manage-home-dropdown': {
                setIsHomeDropDownActive(!isHomeDropDownActive);
                return;
            }
            default :{}
        }
    };

    return (
        <>
            <AdminNavbar
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
                admin={admin}
            />
            <div
                className={`h-screen fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-orange-700 w-64 z-10 py-4 px-6 transition-all duration-300 bg-orange-500 bg-blue`}
            >
                <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative ">
                    <a
                        href="https://material-tailwind.com?ref=mtd"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 text-center w-full inline-block "
                    >
                        <H6 color="white">
                            <Image src={admin.logo ? admin.logo.uri : ''} className="w-100"/>
                        </H6>
                    </a>
                    <div className="flex flex-col">
                        <hr className="my-4 min-w-full" />

                        <ul className="flex-col min-w-full flex list-none">
                            <li className="rounded-lg mb-4">
                                <NavLink
                                    to="/dashboard"
                                    exact
                                    className="flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-orange-900 text-white shadow-md active"
                                >
                                    <Icon name="dashboard" size="2xl" />
                                    Dashboard
                                </NavLink>
                            </li>
                            <li className="rounded-lg mb-2">
                                <NavLink
                                    to="/manage-profile"
                                    className="flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-orange-900  text-white shadow-md active"
                                >
                                    <Icon name="person" size="2xl" />
                                    Manage Profile
                                </NavLink>
                            </li>
                            {
                                navigationListHome.length > 0
                                &&
                                navigationListHome.map((item, index) => (
                                    <div key={index}>
                                        {
                                            item.id === 'manage-home'
                                                ?
                                                <>
                                                    <li
                                                        onClick={() => toggleClassHome("manage-home-dropdown")}
                                                        className="rounded-lg mb-4 flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg cursor-pointer"
                                                        // className="flex items-center gap-4 text-sm text-white font-light px-4 mb-3 py-3 rounded-lg"
                                                        // activeClassName="bg-orange-900 text-white shadow-md active"
                                                    >
                                                        <Icon name="home" size="2xl" /> Manage HOME
                                                    </li>
                                                    <div
                                                        id="manage-home-dropdown"
                                                        className={
                                                            isHomeDropDownActive ? "pl-3" : "hidden pl-3"
                                                        }
                                                    >
                                                        <li className="rounded-lg mb-2">
                                                            <NavLink
                                                                to="/manage-bannerimage"
                                                                className="flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg"
                                                                activeClassName="bg-org-doc  bg-orange-900 text-white shadow-md active"
                                                            >
                                                                <Icon name="topic" size="2xl" />
                                                                Manage Banner Image
                                                            </NavLink>
                                                        </li>
                                                        <li className="rounded-lg mb-2">
                                                            <NavLink
                                                                to="/manage-category"
                                                                className="flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg"
                                                                activeClassName="bg-org-doc  bg-orange-900 text-white shadow-md active"
                                                            >
                                                                <Icon name="topic" size="2xl" />
                                                                Manage Category
                                                            </NavLink>
                                                        </li>
                                                        <li className="rounded-lg mb-2">
                                                            <NavLink
                                                                to="/manage-royalty"
                                                                className="flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg"
                                                                activeClassName="bg-org-doc  bg-orange-900 text-white shadow-md active"
                                                            >
                                                                <Icon name="topic" size="2xl" />
                                                                Manage Royalty
                                                            </NavLink>
                                                        </li>
                                                    </div>
                                                </>
                                                :
                                                <li className="rounded-lg mb-2">
                                                    <NavLink
                                                        to={`/${item.id}`}
                                                        className="flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg"
                                                        activeClassName="bg-orange-900  text-white shadow-md active"
                                                    >
                                                        <Icon name={item.icon} size="2xl" />
                                                        {item.text}
                                                    </NavLink>
                                                </li>
                                        }
                                    </div>
                                ))
                            }
                            {
                                navigationList.length > 0
                                &&
                                navigationList.map((item, index) => (
                                    <div key={index}>
                                        {
                                            item.id === 'manage-cms'
                                                ?
                                                <>
                                                    <li
                                                        onClick={() => toggleClass("manage-cms-dropdown")}
                                                        className="rounded-lg mb-4 flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg cursor-pointer"
                                                        // className="flex items-center gap-4 text-sm text-white font-light px-4 mb-3 py-3 rounded-lg"
                                                        // activeClassName="bg-orange-900 text-white shadow-md active"
                                                    >
                                                        <Icon name="expand" size="2xl" /> Manage CMS
                                                    </li>
                                                    <div
                                                        id="manage-cms-dropdown"
                                                        className={
                                                            isCmsDropDownActive ? "pl-3" : "hidden pl-3"
                                                        }
                                                    >
                                                        <li className="rounded-lg mb-2">
                                                            <NavLink
                                                                to="/manage-aboutus"
                                                                className="flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg"
                                                                activeClassName="bg-orange-900 text-white shadow-md active"
                                                            >
                                                                <Icon name="topic" size="2xl" />
                                                                Manage About Us
                                                            </NavLink>
                                                        </li>

                                                        <li className="rounded-lg mb-2">
                                                            <NavLink
                                                                to="/manage-termsandconditions"
                                                                className="flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg"
                                                                activeClassName="bg-orange-900 text-white shadow-md active"
                                                            >
                                                                <Icon name="topic" size="2xl" />
                                                                Manage Terms & Conditions
                                                            </NavLink>
                                                        </li>

                                                        <li className="rounded-lg mb-2">
                                                            <NavLink
                                                                to="/manage-privacypolicy"
                                                                className="flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg"
                                                                activeClassName="bg-orange-900 text-white shadow-md active"
                                                            >
                                                                <Icon name="topic" size="2xl" />
                                                                Manage Legal & Privacy Policy
                                                            </NavLink>
                                                        </li>
                                                        <li className="rounded-lg mb-2">
                                                            <NavLink
                                                                to="/manage-faq"
                                                                className="flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg"
                                                                activeClassName="bg-org-doc  bg-orange-900 text-white shadow-md active"
                                                            >
                                                                <Icon name="topic" size="2xl" />
                                                                Manage Faq 
                                                            </NavLink>
                                                        </li>
                                                    </div>
                                                </>
                                                :
                                                <li className="rounded-lg mb-2">
                                                    <NavLink
                                                        to={`/${item.id}`}
                                                        className="flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg"
                                                        activeClassName="bg-orange-900  text-white shadow-md active"
                                                    >
                                                        <Icon name={item.icon} size="2xl" />
                                                        {item.text}
                                                    </NavLink>
                                                </li>
                                        }
                                    </div>
                                ))
                            }
                            <li className="rounded-lg mb-2">
                                <NavLink
                                    to="/manage-contactus"
                                    className="flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-orange-900  text-white shadow-md active"
                                >
                                    <Icon name="email" size="2xl" />
                                    Manage Contact Us
                                </NavLink>
                           </li>
                            <li className="rounded-lg mb-2">
                                <NavLink
                                    to="/manage-contactinfo" 
                                    className="flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-orange-900  text-white shadow-md active"
                                >
                                    <Icon name="phone" size="2xl" />
                                    Manage Contact Info
                                </NavLink>
                           </li>
                           <li className="rounded-lg mb-2">
                                <NavLink
                                    to="/manage-coupon"
                                    className="flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-orange-900  text-white shadow-md active"
                                >
                                    <Icon name="gif" size="2xl" />
                                    Manage Coupon
                                </NavLink>
                           </li>
                           <li className="rounded-lg mb-2">
                                <NavLink
                                    to="/manage-customer"
                                    className="flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-orange-900  text-white shadow-md active"
                                >
                                    <Icon name="person" size="2xl" />
                                    Manage Customer
                                </NavLink>
                           </li>
                           <li className="rounded-lg mb-2">
                                <NavLink
                                    to="/manage-contributor"
                                    className="flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-orange-900  text-white shadow-md active"
                                >
                                    <Icon name="person" size="2xl" />
                                    Manage Contributor 
                                </NavLink>
                           </li>
                           <li className="rounded-lg mb-2">
                                <NavLink
                                    to="/manage-subscription"
                                    className="flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-orange-900  text-white shadow-md active"
                                >
                                    <Icon name="payment" size="2xl" />
                                    Manage Subscription 
                                </NavLink>
                           </li>
                           <li className="rounded-lg mb-2">
                                <NavLink
                                    to="/manage-commission"
                                    className="flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-orange-900  text-white shadow-md active"
                                >
                                    <Icon name="money" size="2xl" />
                                    Manage Commission
                                </NavLink>
                           </li>
                           <li className="rounded-lg mb-2">
                                <NavLink
                                    to="/license-information"
                                    className="flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-orange-900  text-white shadow-md active"
                                >
                                    <Icon name="person" size="2xl" />
                                    License information
                                </NavLink>
                           </li>
                           <li className="rounded-lg mb-2">
                                <NavLink
                                    to="/view-images"
                                    className="flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-orange-900  text-white shadow-md active"
                                >
                                    <Icon name="image" size="2xl" />
                                    View Images
                                </NavLink>
                           </li>
                           <li className="rounded-lg mb-2">
                                <NavLink
                                    to="/manage-order"
                                    className="flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-orange-900  text-white shadow-md active"
                                >
                                    <Icon name="person" size="2xl" />
                                    Manage Order 
                                </NavLink>
                           </li>
                           <li className="rounded-lg mb-2">
                                <NavLink
                                    to="/manage-invoice"
                                    className="flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-orange-900  text-white shadow-md active"
                                >
                                    <Icon name="person" size="2xl" />
                                    Manage Invoice 
                                </NavLink>
                           </li>
                           <li className="rounded-lg mb-2">
                                <NavLink
                                    to="/manage-payment"
                                    className="flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-orange-900  text-white shadow-md active"
                                >
                                    <Icon name="payment" size="2xl" />
                                    Manage Payment  
                                </NavLink>
                           </li>
                           <li className="rounded-lg mb-2">
                                <NavLink
                                    to="/manage-report"
                                    className="flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-orange-900  text-white shadow-md active"
                                >
                                    <Icon name="report" size="2xl" />
                                    Manage Report  
                                </NavLink>
                           </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
