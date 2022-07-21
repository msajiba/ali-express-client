import React from 'react';
import {Button} from 'react-bootstrap';

const OrderShow = ({item, productDeleteHandler}) => {

    const {img, name, price, _id} = item;

    return (
        <>
            <tr>
                <td> <img  className='w-25 rounded-circle' src={img} alt="" /> </td>
                <td> {name} </td>
                <td>{price}</td>
                <td> 
                    <Button 
                        onClick={()=> productDeleteHandler(_id)}
                        variant='outline-danger'> Delete </Button> 
                </td>
             </tr>
        </>
    );
};

export default OrderShow;