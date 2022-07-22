import React, { useState } from 'react';
import {Form, Button} from 'react-bootstrap';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase_init';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import Loading from '../Shared/Loading';
import SocialLogin from './SocialLogin';
import axios from 'axios';
import axiosPrivate from '../../api/axiosPrivate';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);

    if(loading){
        return <Loading />
    }

    if(user){
        // navigate(from, {replace : true});
    };



    const handleFormLogin = async(e) =>{

        e.preventDefault();
       await signInWithEmailAndPassword(email, password);

        const {data} = await axiosPrivate.post('https://protected-dawn-66498.herokuapp.com/login', {email});
        localStorage.setItem('accessToken', data.accessToken);
        navigate(from, {replace : true});
        e.target.reset();
    };



    return (
        <>
            <div className="w-75 mx-auto mt-5 py-5 shadow px-5">
                <h5 className='text-center text-primary'> Please Login </h5>
                    <Form onSubmit={handleFormLogin}>
            
                        <Form.Group className="mb-3" >
                            <Form.Control onBlur={(e)=> setEmail(e.target.value)} type="text" placeholder="Enter Email" required />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Control onBlur={(e)=> setPassword(e.target.value)} type="password" placeholder="Enter Password" required />
                        </Form.Group>

                    <p className='text-danger'> {error?.message} </p>

                        <Button className='w-100' variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>

                <p className='mt-2'> You don't have an account ? 
                    <Link className='text-decoration-none' to='/register'> 
                        Please register 
                    </Link> 
                </p>

                <SocialLogin> </SocialLogin>
           </div>
        </>
    );
};

export default Login;