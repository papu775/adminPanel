import React,{useState,useEffect} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Footer from 'components/Footer';
// import ManageAboutUs from 'pages/ManageAboutUs';
// import ManagePrivacyPolicy from 'pages/ManagePrivacyPolicy';
// import ManageTermsAndConditions from 'pages/ManageTermsAndConditions';
import 'assets/styles/tailwind.css';
import "@material-tailwind/react/tailwind.css";
import 'assets/styles/custom.css';
import Login from 'pages/Login';
import Dashboard from 'pages/Dashboard';
import Sidebar from 'components/Sidebar';
import Settings from 'pages/ManageProfile';
import ManageAboutUs from 'pages/ManageAboutUs';
import ManageCoupon from 'pages/ManageCoupon';
import ManagePrivacyPolicy from 'pages/ManagePrivacyPolicy';
import ManageTermsAndConditions from 'pages/ManageTermsAndConditions';
// import SpinnerComponent from 'components/Spinner';
import ManageSupport from 'pages/ManageSupport';
import ManageBannerImage from 'pages/ManageBannerImage';
import ManageFaq from 'pages/ManageFaq';
import AddCoupon from 'pages/AddCoupon';
import EditCoupon from 'pages/EditCoupon';
import ManageCommission from 'pages/ManageCommission';
import ManageCategory from 'pages/ManageCategory';
import AddCategory from 'pages/AddCategory';
import EditCategory from 'pages/EditCategory';
import ManageRoyalty from 'pages/ManageRoyalty';
import ManageContributor from 'pages/ManageContributor';
import ManageCustomer from 'pages/ManageCustomer';
import ManageUsers from 'pages/ManageUsers';
import ManageContactInfo from 'pages/ManageContactInfo';
import ManageSubscription from 'pages/ManageSubscription';
import AddSubscription from 'pages/AddSubscription';
import ManageHeaderEnd from 'pages/ManageHeaderEnd';
import ManageFooterStart from 'pages/ManageFooterStart';
import ManageSocalMedia from 'pages/ManageSocalMedia';
import ViewImage from 'pages/ViewImage';
import ShowUserById from 'pages/ShowUserById';
import ItemDetails from 'pages/ItemDetails';
// import ForgotPassword from 'pages/forgotPassword';
// import ManageSupport from 'pages/ManageSupport';

// import ManageFaq from 'pages/ManageFaq';
// import ManageBannerImage from 'pages/ManageBannerImage';
// import ManageCategory from 'pages/ManageCategory';
// import ManageCoupon from 'pages/ManageCoupon';
// import LicenseInformation from 'pages/LicenseInformation';
// import ManageSubscription from 'pages/ManageSubscription';

// import AddCoupon from 'pages/AddCoupon';
// import EditCoupon from 'pages/EditCoupon';



function App() {
    const [admin, setAdmin] = useState({});
    const [isProfileUpdated, setIsProfileUpdated] = useState(false);
    
    const getAdmin = () => {
        try {
            const adminData = localStorage.getItem('lethustock-admin-data')
            if (!adminData) return setAdmin({});
            setAdmin(JSON.parse(adminData));
            setIsProfileUpdated(false);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getAdmin();
    }, [isProfileUpdated])
    // const [isProfileUpdated, setIsProfileUpdated] = useState(false);
    // const getAdmin = async () => {
    //     try {
    //         const adminData = await localStorage.getItem('lethustock-admin-data')
    //         if (!adminData) return setAdmin({});
    //         setAdmin(JSON.parse(adminData));
    //         // setIsProfileUpdated(false);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }
    return (
        // md:ml-64 overlay
        <>
            <div className="md:ml-64">
                <Switch>
                    <Route exact path="/">
                        <Login setAdmin={setAdmin} />
                    </Route>
                    <Route exact path="/dashboard">
                        <Sidebar admin={admin} />
                        <Dashboard />
                    </Route>
                    <Route exact path="/manage-profile">
                        <Sidebar admin={admin} />
                        <Settings setIsProfileUpdated={setIsProfileUpdated} />
                    </Route>
                    <Route exact path="/manage-aboutus">
                        <Sidebar admin={admin} />
                        <ManageAboutUs />
                    </Route>
                    <Route exact path="/manage-privacypolicy">
                        <Sidebar admin={admin} />
                        <ManagePrivacyPolicy />
                    </Route>
                    <Route exact path="/manage-termsandconditions">
                        <Sidebar admin={admin} />
                        <ManageTermsAndConditions />
                    </Route>
                    <Route exact path="/manage-bannerimage">
                        <Sidebar admin={admin} />
                        <ManageBannerImage />
                    </Route>
                    <Route exact path="/manage-faq">
                        <Sidebar admin={admin} />
                        <ManageFaq />
                    </Route>
                    <Route exact path="/manage-coupon">
                        <Sidebar admin={admin} />
                        <ManageCoupon />
                    </Route>
                    <Route exact path="/edit-coupon/:id">
                        <Sidebar admin={admin}/>
                        <EditCoupon />
                    </Route>
                    <Route exact path="/manage-contributor">
                        <Sidebar admin={admin} />
                        <ManageContributor />
                    </Route>
                    <Route exact path="/manage-customer">
                        <Sidebar admin={admin} />
                        <ManageCustomer />
                    </Route>
                    <Route exact path="/manage-users">
                        <Sidebar admin={admin} />
                        <ManageUsers />
                    </Route>
                    <Route exact path="/add-coupon">
                        <Sidebar admin={admin} />
                        <AddCoupon />
                    </Route>
                    <Route exact path="/manage-commission">
                        <Sidebar admin={admin} />
                        <ManageCommission />
                    </Route>
                    <Route exact path="/manage-category">
                        <Sidebar admin={admin} />
                        <ManageCategory />
                    </Route>
                    <Route exact path="/add-category">
                        <Sidebar admin={admin} />
                        <AddCategory />
                    </Route>
                    <Route exact path="/edit-category/:id">
                        <Sidebar admin={admin} />
                        <EditCategory />
                    </Route>
                    <Route exact path="/view-user/:id">
                        <Sidebar admin={admin} />
                        <ShowUserById />
                    </Route>
                    <Route exact path="/manage-royalty">
                        <Sidebar admin={admin} />
                        <ManageRoyalty />
                    </Route>
                    <Route exact path="/manage-contactus">
                        <Sidebar admin={admin} />
                        <ManageSupport />
                    </Route>
                    <Route exact path="/manage-contactinfo">
                        <Sidebar admin={admin} />
                        <ManageContactInfo />
                    </Route>
                    <Route exact path="/add-subscription">
                        <Sidebar admin={admin} />
                        <AddSubscription />
                    </Route>
                    <Route exact path="/manage-subscription">
                        <Sidebar admin={admin} />
                        <ManageSubscription />
                    </Route>
                    <Route exact path="/manage-headerend">
                        <Sidebar admin={admin} />
                        <ManageHeaderEnd />
                    </Route>
                    <Route exact path="/manage-footerstart">
                        <Sidebar admin={admin} />
                        <ManageFooterStart />
                    </Route>
                    <Route exact path="/manage-socalmedia">
                        <Sidebar admin={admin} />
                        <ManageSocalMedia />
                    </Route>
                    <Route exact path="/view-item">
                        <Sidebar admin={admin} />
                        <ViewImage />
                    </Route>
                    <Route exact path="/item-details/:id">
                        <Sidebar admin={admin} />
                        <ItemDetails />
                    </Route>
                    <Redirect from="*" to="/" />
                </Switch>
                <Footer />
            </div>
            
        </>
    );
}

export default App;
