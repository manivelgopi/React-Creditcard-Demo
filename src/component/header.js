import React from 'react'
import {Navbar, Nav, Form, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function Header() {
    return (
        <>
           <Navbar transition="false" bg="primary" variant="dark" expand="lg">
            <Navbar.Brand as={Link} to="/">Y CODE</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse transition="false" id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link as={Link} to="/home">Home</Nav.Link>
                <Nav.Link as={Link} to="/status">Status</Nav.Link>
                <Nav.Link as={Link} to="/help">help</Nav.Link>
                </Nav>
                <Form inline>
                    <Button as={Link} to="/apply" variant="outline-light">Apply Credit Card</Button>
                </Form>
            </Navbar.Collapse>
            </Navbar>     
            
        </>
    )
}
