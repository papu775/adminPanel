import { Redirect } from 'react-router-dom';

const CheckLogin = ({ isLoggedIn }) => {
    return (
        !isLoggedIn
            ?
            <>
                <Redirect
                    to={{
                        pathname: '/'
                    }}
                />
            </>
            :
            <></>
    );
}

export default CheckLogin;
