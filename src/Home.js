import React from 'react';
import {Carousel, Container, Row, Col, Card, Button, } from 'react-bootstrap' ;
import {Link} from 'react-router-dom';
import bannerImage from './images/banner.jpg';
import cardImage from './images/card.jpg';

export default function Home() {
    return (
        <div>
           <Carousel transition="false">
        <Carousel.Item transition="false">
            <img
            className="d-block w-100"
            src={bannerImage}
            alt="First slide"
            />
            <Carousel.Caption transition="false">
            <h3>Money Back Card</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
        </Carousel.Item>
        </Carousel>
        <br/>
        {/* Card */}
        <Container>
            <Row className="justify-content-xs-center">
                <Col>
                   <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" 
                    src={cardImage}  />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                        </Card.Text>
                        <Link 
                        className="btn btn-primary" role="button" to="/apply"> 
                        Apply Now
                        </Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" 
                    src={cardImage} />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                        </Card.Text>
                        <Link 
                        className="btn btn-primary" role="button" to="/apply"> 
                        Apply Now
                        </Link>
                    </Card.Body>
                    </Card>
                </Col>
                <Col>
                <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" 
                src={cardImage} />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Link 
                    className="btn btn-primary"
                    role="button"
                    to="/apply"
                    > 
                    Apply Now
                    </Link>
                   
                </Card.Body>
                </Card>

                </Col>
            </Row>
        </Container>
        
        </div>
    )
}
