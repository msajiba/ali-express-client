import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase_init';
import Loading from '../Shared/Loading';
import {Button} from 'react-bootstrap';


const SocialLogin = () => {

    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    if(loading){
        return <Loading> </Loading>
    }
    if(error){
        return <p>{error.message} </p>
    }

    return (
        <div className='w-50 mx-auto'>
            <Button className='w-100 btn-info' onClick={()=> signInWithGoogle()}> Google SingIn </Button>
        </div>
    );
};

export default SocialLogin;