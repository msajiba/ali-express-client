import React, { useEffect, useState } from 'react';
import Cart from '../Shared/Cart';
import {Container, Row, Col, Button} from 'react-bootstrap';
import useCart from '../../hooks/useCart';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import OrderShow from './OrderShow';
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import auth from '../../firebase_init';
import { useAuthState } from 'react-firebase-hooks/auth';
import axiosPrivate from '../../api/axiosPrivate';

const Order = () => {

    const navigate = useNavigate()
    const [user] = useAuthState(auth);

    const [orderItem, setOrderItem] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);

    //ORDER LOAD
    useEffect(()=>{

        const getProducts = async() => {
            const email = user?.email;
            const url = `http://localhost:5000/selectitem?email=${email}&page=${page}&size=${size}`;
            const {data} = await axiosPrivate.get(url)
            setOrderItem(data);
        }
        getProducts();

    }, [page, size]);

    //SELECTED COUNT LOAD
    useEffect(()=>{
        const getSelectedCount = async() => {
            const url = 'http://localhost:5000/selectedCount';
            const {data} = await axios.get(url);
            const {count} = data;
            const pages = Math.ceil(count/5);
            setPageCount(pages);
        };
        getSelectedCount();
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


                       <Row>
                            <Col md='9' className='text-center my-5'>
                                {
                                    [...Array(pageCount).keys()].map(number => <button
                                                                                    onClick={()=>setPage(number)}
                                                                                    className={number === page ?'bg-danger text-white' :''}
                                                                                    > 
                                                                                    {number +1} 
                                                                                </button>)
                                }
                                {size}
                                <select onChange={(e)=> setSize(e.target.value)}>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>

                            </Col>
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