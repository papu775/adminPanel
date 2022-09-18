import React from 'react'
// import StatusCard from 'components/StatusCard';
import SettingsForm from 'components/SettingsForm';
// import ProfileCard from 'components/ProfileCard';
// import { checkLoginStatus } from '../utils/services/index';
// import { useLocation } from 'react-router-dom';
// import CheckLogin from 'components/CheckLogin';

export default function Dashboard({ setIsProfileUpdated }) {
    // const [isLoggedIn, setIsLoggedIn] = useState(false)
    // const [startCheck, setStartCheck] = useState(false);
    // const location = useLocation()

    // useEffect(() => {
    //     checkLoginStatus(setIsLoggedIn, setStartCheck)
    // }, [location])

    return (
        <>
            {/* {startCheck && <CheckLogin isLoggedIn={isLoggedIn} />} */}
            <div className="bg-white px-3 md:px-8 h-40" />
            <div className="px-3 md:px-8 h-auto -mt-24">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 xl:grid-cols-6">
                        <div className="xl:col-start-1 xl:col-end-7 px-4 mb-16">
                            <SettingsForm setIsProfileUpdated={setIsProfileUpdated} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
