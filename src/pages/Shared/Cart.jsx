import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useCart from '../../hooks/useCart';
import './Cart.css';

const Cart = ({children, cartItem,orderItem}) => {


    const [selectItem, setSelectItem] = useState([]);

    useEffect(()=>{

        const getProducts = async() => {
            const url = 'http://localhost:5000/selectitem'
            const {data} = await axios.get(url)
            setSelectItem(data);
        }
        getProducts();

    }, [cartItem, orderItem]);

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