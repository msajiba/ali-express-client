import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import { toast } from 'react-toastify';
import useCart from '../../hooks/useCart';
import Cart from '../Shared/Cart';
import ProductShow from './ProductShow';
import {useNavigate} from 'react-router-dom';

const Home = () => {

    const [products, setProducts] = useState([]);
    const [cartItem, setCartItem] = useState({});
    const navigate =  useNavigate();


    useEffect(()=>{
        const getProducts = async() => {
            const url = 'http://localhost:5000/products'
            const {data} = await axios.get(url)
            setProducts(data);
        }
        getProducts();
    }, []);

    const addProductHandler = async(id) => {
        const selectedItem = products.find(product => product._id === id);
        const url = 'http://localhost:5000/selectitem'
        const res = await axios.post(url, selectedItem);
        toast.success('Product add successful');
        setCartItem(selectedItem);
    };


    return (
        <>
            <Container>
                <Row>
                    <Col md='9'>
                        <Row>
                            {
                                products.map(product => 
                                                <Col md='4' key={product._id}> 
                                                        <ProductShow 
                                                                addProductHandler={addProductHandler}
                                                                product={product} > 
                                                        </ProductShow>
                                                </Col>)
                            }
                        </Row>
                    </Col>
                    <Col md='3'> 
                            <Cart cartItem={cartItem}>
                                 <button 
                                        onClick={()=> navigate('/order')}
                                        className='btn btn-outline-success w-100'>
                                             Order Now
                                 </button> 
                            </Cart>
                     </Col>
                </Row>
            </Container>
        </>
    );
};

export default Home;