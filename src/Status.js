import React, {useState,useEffect} from 'react';
import {Table, Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import DOMPurify from 'dompurify';

export default function Status() {
    const percentage = 55;

    const state = useSelector(state => state);
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);

    //const handleShow = () => setShow(true);

    const [userData, setUserData]= useState({});
    const [response, setResponse] = useState([]);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(false);

    const handleClear = ()=>{}

    

    const [validated, setValidated] = useState(false);

    const [ok, setOk] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        
       // console.log(form.checkValidity());
        if (form.checkValidity() === false) {
            setOk(false);
            setShow(false);
            event.stopPropagation();
        }else{
            //console.log("validated");
            setValidated(true);
            setOk(true);
        }
        //setOk(true)
        
    };

  useEffect(() => {
    const formSubmit = () => {
        //e.preventDefault();
        
        setloading(true);
        //console.log(userData);
       
        axios.get('http://localhost:8000/status?id='+userData.applicationNumber)
            .then((res) => {
                setResponse(res.data);
                console.log("response",res);
                setShow(true);
            })
            .catch((err) => {
                setError(err);
                setShow(false);
            })
            .finally(() => {
                setloading(false);
            });
    }
    
    if(ok){formSubmit();}

  }, [ok]);

  useEffect(() => {
    if(state.applicationNumber)
    setUserData(state);

  }, [state]);

    return (
        <main data-testid="appStatus">
        <Container>
        <Row>
            <Col md={12}>
            <Card className="mx-auto my-3">
                <Card.Body>
                    <Card.Title className="text-primary">Credit card Application Status</Card.Title><hr/>
                    
                    <Row>
                        <Col className="mx-auto" md={6}>
                        <Form data-testid="statusForm" noValidate validated={validated} onSubmit={handleSubmit} >
                        <Form.Group className="mb-3" controlId="applicationNumber">
                            <Form.Label>Application Number</Form.Label>
                            <Form.Control 
                             data-testid="userApplicationNumber"
                             maxLength="10"
                             minLength="10"
                             onChange={(e) => { 
                                setOk(false); 
                                setShow(false); 
                                dispatch({type:"APPNUMBER", 
                                payload: DOMPurify.sanitize(e.target.value)})
                            }}
                             required type="text"
                             placeholder="Application number" />
                            <Form.Text className="text-muted">
                             Please enter valid application number.
                            </Form.Text>
                        </Form.Group>
                        <Row >
                            <Col className="d-grid mx-2">
                            <Button data-testid="checkStatusBtn" className="mr-3" variant="primary" type="submit">
                                Check Status
                            </Button>
                            </Col>
                            <Col>
                            <Button onClick={handleClear} variant="secondary" type="button">
                                clear
                            </Button>
                            </Col>
                        </Row>
                        </Form>
                     </Col>
                    </Row><br/>

                    { show &&
                    <Row >
                        <Col>
                        <Card className="my-3">
                            <Card.Body>
                            <Card.Header className="text-primary">
                                Application Status
                            </Card.Header>
                                <Row>
                                    <Col md={6}>
                                    <Table hover variant="light">
                                        {/* <thead>
                                            <tr>
                                            <th>#</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Username</th>
                                            </tr>
                                        </thead> */}
                                        <tbody>
                                            <tr>
                                            <td>Name</td>
                                            <td>:</td>
                                            <td>Kumar</td>
                                            </tr>
                                            <tr>
                                            <td>PAN</td>
                                            <td>:</td>
                                            <td>XXXXMP</td>
                                            </tr>
                                            <tr>
                                            <td>Status</td>
                                            <td>:</td>
                                            <td><strong>{response.status}</strong></td>
                                            </tr>
                                        </tbody>
                                        </Table>
                                    </Col>
                                    <Col className="mx-auto my-2" >
                                        <div className="mx-auto" style={{ width: 150, height: 150 }}>
                                            <CircularProgressbar value={percentage} text={`${percentage}%`} />
                                        </div>
                                        
                                    </Col>
                                </Row>

                            </Card.Body>
                        </Card>
                        </Col>
                    </Row>
                    }
                </Card.Body>
            </Card>
            </Col>
        </Row>
        </Container>

        </main>
    
    )
}
