import { signOut } from 'firebase/auth';
import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase_init';

const Header = () => {
    const [user] = useAuthState(auth);
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Container>
                    <Navbar.Brand as={Link} to="/">Ali Express</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto fs-6">
                            <Nav.Link as={Link} to="/home"> Home </Nav.Link>
                        </Nav>
                        <Nav>
                            {
                                user?  
                                        <> 
                                            <Nav.Link as={Link} to="/product-add"> Product Add </Nav.Link>
                                            <Button 
                                                    onClick={()=> signOut(auth) }
                                                    variant='outline-danger'> 
                                                    Sign Out
                                            </Button> 
                                        </>

                                    : <Nav.Link as={Link} to="/login"> Login </Nav.Link>
                                    
                            }
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;