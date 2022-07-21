import React, { useEffect, useState } from 'react';
import Cart from '../Shared/Cart';
import {Container, Row, Col, Button} from 'react-bootstrap';
import useCart from '../../hooks/useCart';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import OrderShow from './OrderShow';
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom';

const Order = () => {

    const navigate = useNavigate()

    const [orderItem, setOrderItem] = useState([]);


    useEffect(()=>{

        const getProducts = async() => {
            const url = 'http://localhost:5000/selectitem'
            const {data} = await axios.get(url)
            setOrderItem(data);
        }
        getProducts();

    }, []);


    const productDeleteHandler = async(id) =>{
       
        const proceed = window.confirm('Are you sure Delete Product');

        if(proceed){
            const url = `http://localhost:5000/selectitem/${id}`
            const res = await axios.delete(url);
            const remaining = orderItem.filter(item=> item._id !== id);
            setOrderItem(remaining);
            toast.success("Product Delete Successful");
        }

    }

    

    return (
        <>
            <Container>
                <Row> 
                    <Col md='9'>
                       <Row>

                       <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th> Product </th>
                                <th> Product Name </th>
                                <th> Price </th> 
                                <th> Action </th> 
                            </tr>
                        </thead>
                        <tbody>
                            {
                                    orderItem.map(item=> <OrderShow 
                                                                key={item._id}
                                                                item={item}
                                                                productDeleteHandler={productDeleteHandler}> 
                                                            </OrderShow> )
                            }
                            
                        </tbody>
                        </Table>

                            
                       </Row>
                    </Col>
                    <Col md='3'> 
                        <Cart orderItem={orderItem}> 
                            <Button onClick={()=> navigate('/checkout')} className='mt-3' variant='outline-success'> Proceed to checkout</Button>
                        </Cart> 
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Order;