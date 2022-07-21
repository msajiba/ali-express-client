import React from 'react';
import {Form, Button} from 'react-bootstrap';

const Checkout = () => {
    return (
        <>
           <div className="w-75 mx-auto mt-5 py-5">
            <Form >
            
                    <Form.Group className="mb-3" >
                        <Form.Control type="text" placeholder="Your Name" required />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Control type="text" placeholder="Your Email" required />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Control type="text" placeholder="Address" required />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Order Confirm
                    </Button>
                </Form>
            
           </div>
        </>
    );
};

export default Checkout;