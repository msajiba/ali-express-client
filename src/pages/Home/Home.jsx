import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import { toast } from 'react-toastify';
import useCart from '../../hooks/useCart';
import Cart from '../Shared/Cart';
import ProductShow from './ProductShow';
import {useNavigate} from 'react-router-dom';
import auth from '../../firebase_init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { fetchSignInMethodsForEmail } from 'firebase/auth';
import './Home.css';
import axiosPrivate from '../../api/axiosPrivate';

const Home = () => {

    const [user] = useAuthState(auth);
    const navigate =  useNavigate();

    const [products, setProducts] = useState([]);
    const [cartItem, setCartItem] = useState({});
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);



    //PRODUCTS GET
    useEffect(()=>{
        const getProducts = async() => {
            const url = `https://protected-dawn-66498.herokuapp.com/products?page=${page}&size=${size}`
            const {data} = await axiosPrivate.get(url)
            setProducts(data);
        }
        getProducts();
    }, [page, size]);


    //PRODUCT COUNT 
    useEffect(()=>{
        const getProductCount = async() => {
            const url = 'https://protected-dawn-66498.herokuapp.com/productCount';
            const {data} = await axiosPrivate.get(url);
            const {count} = data;
            const pages = Math.ceil(count/6);
            setPageCount(pages);
        };
        getProductCount();
    }, []);


  

    const addProductHandler = async(id) => {
        const selectedItem = products.find(p => p._id === id);
        const email = user?.email;
    
        const product = Object.assign(selectedItem,{email});

        if(user){
            const url = 'https://protected-dawn-66498.herokuapp.com/selectitem';
            const res = await axiosPrivate.post(url, product);
            toast.success('Product add successful');
            setCartItem(selectedItem);
        }
        else{
          return  navigate('/login');
        }
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

                <Row>
                    <Col md='9' className='text-center my-5'>
                     
                        {
                            [...Array(pageCount).keys()]
                            .map(number => <button
                                                key={number}
                                                className={page === number ? 'bg-danger text-white' : 'mx-2'}
                                                onClick={()=>setPage(number)}
                                                > {number +1} 
                                            </button>)
                        } 
                       
                        <select onChange={(e)=> setSize(e.target.value)} className='mx-2' >
                            <option value="5" selected>5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                        

                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Home;