import React, { useState } from 'react';
import {Form, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import auth from '../../firebase_init';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import Loading from '../Shared/Loading';
import {toast} from 'react-toastify';

const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);

    const handleFormSubmit = e => {
        e.preventDefault();

        createUserWithEmailAndPassword(email, password);
        toast("Create an Account");
    };


    if(loading){
        return <Loading> </Loading>
    };

    

    return (
        <>
            <div className="w-75 mx-auto mt-5 py-5 shadow px-5">
                <h5 className='text-center text-primary'> Please Register </h5>
                    <Form onSubmit={handleFormSubmit}>
            
                        <Form.Group className="mb-3" >
                            <Form.Control onBlur={(e)=> setEmail(e.target.value)} type="text" placeholder="Enter Email" required />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Control onBlur={(e)=> setPassword(e.target.value)} type="password" placeholder="Enter Password" required />
                        </Form.Group>

                    <p className='text-danger'> {error?.message} </p>

                        <Button variant="primary" type="submit">
                            Register
                        </Button>
                    </Form>

                <p className='mt-2'> You have already account ? 
                    <Link className='text-decoration-none' to='/login'> 
                        Please Login 
                    </Link> 
                </p>
           </div>
        </>
    );
};

export default Register;