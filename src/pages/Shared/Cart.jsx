import axios from 'axios';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import auth from '../../firebase_init';
import useCart from '../../hooks/useCart';
import './Cart.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import axiosPrivate from '../../api/axiosPrivate';

const Cart = ({children, cartItem,orderItem}) => {

    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const [selectItem, setSelectItem] = useState([]);

 
    useEffect(()=>{

        const getProducts = async() => {
            const email = user?.email;
            const url = `http://localhost:5000/selectitem?email=${email}`;
            
           try{
                const {data} = await axiosPrivate.get(url)
                setSelectItem(data)
           }
           catch(error){
                if(error.response.status === 401 || error.response.status === 403){
                    signOut(auth);
                    navigate('/login');
                }
           }

        };
        getProducts();

    }, [cartItem, orderItem, user]);


    const price = selectItem.reduce((sum, num) => sum + parseInt(num.price) , 0 )
    const tax = price / 10;
    const total = parseInt(price + tax);

    return (
        <div className=' cart-section shadow py-2 bg-info px-5' >

            <h3> This is cart {selectItem.length} </h3>
            <p> Price : {price} </p>
            <p> Tax : {tax} </p>
            <h6> Total : {total} </h6>
            {children}

        </div>
    );
};

export default Cart;