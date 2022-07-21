import React from 'react';
import { useAuthState, useSendEmailVerification } from 'react-firebase-hooks/auth';
import auth from '../../firebase_init';
import {useLocation, useNavigate, Navigate} from 'react-router-dom';
import {toast} from 'react-toastify';


const RequireAuth = ({children}) => {

    const [sendEmailVerification, sending, error] = useSendEmailVerification(
        auth
      );

    const [user] = useAuthState(auth);
    const location = useLocation();


    if(!user){
        return <Navigate to='/login' state={{ from: location}} replace />
    };


    if(!user?.emailVerified){
        return <>
            <div style={{height:'100vh'}} className="d-flex justify-content-center align-items-center ">
                <div>
                    <h6> Your account not verified !</h6>
                    <h6> Please verified you account</h6>
                    <button
                        className='btn btn-outline-info'
                        onClick={async () => {
                        await sendEmailVerification();
                        toast.info('Send verification code your email')
                        }}>
                        Verify email
                    </button>
                </div>
            </div>
        </>
    }

    return children;
};

export default RequireAuth;