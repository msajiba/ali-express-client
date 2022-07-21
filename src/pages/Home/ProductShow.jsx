import React from 'react';
import {Button} from 'react-bootstrap';

const ProductShow = ({product, addProductHandler}) => {
    const {img, name,  price, _id} = product;
    return (
        <>
            <div className="border shadow my-2 rounded p-2">
                    <img className='w-100' src={img} alt="" />
                    <h5> {name} </h5>
                    <h6> Price : $<small>{price}</small> </h6>
                    <Button onClick={()=> addProductHandler(_id)} className='w-100'> Add to Cart</Button>
            </div>
        </>
    );  
};

export default ProductShow;