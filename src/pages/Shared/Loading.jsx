import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
    return (
        <>
            <div style={{height:'100vh'}} className="d-flex justify-content-center align-items-center">
                 <Spinner animation="border" variant="secondary" />
            </div>
        </>
    );
};

export default Loading;