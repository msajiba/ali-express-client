
import axios from 'axios';
import React, { useState } from 'react';
import {Form, Button} from 'react-bootstrap';
import {toast} from 'react-toastify';



const ProductAdd = () => {

    const [img, setImg]= useState('');
    const [name, setName]= useState('');
    const [price, setPrice]= useState('');


    const addProductSubmit = async(e) => {
        e.preventDefault();

        const product = {img, name, price};

        const url = 'https://protected-dawn-66498.herokuapp.com/product'
        const res = await axios.post(url, product);
        toast.success('Product add successful');
        e.target.reset();
    };


    return (
        <>
           <div className="w-75 mx-auto mt-5 py-5">
           <Form onSubmit={addProductSubmit}>
                <Form.Group className="mb-3" >
                    <Form.Control onBlur={(e)=> setImg(e.target.value)} type="text" placeholder="product img" />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Control onBlur={(e)=> setName(e.target.value)} type="text" placeholder="product Name" />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Control onBlur={(e)=> setPrice(e.target.value)} type="text" placeholder="product price" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Add Product
                </Button>
            </Form>

           </div>
        </>
    );
};

export default ProductAdd;