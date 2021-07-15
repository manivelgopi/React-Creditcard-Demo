import React, {useState, useEffect} from 'react';
import {Alert, Container, Row, Col, 
    Card, 
    Form, 
    Button, Modal} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import DOMPurify from 'dompurify';

export default function Newform() {

const initData = {
     userName:'',
     userEmail:'',
     userPan:'',
     userSalary:'',
     userDob:'',
     userMobile:'',
    };
    const dispatch = useDispatch();

    const state = useSelector(state => state);

    const [response, setResponse] = useState([]);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(false);

    const [termsAccept, setTermsAccept] = useState(false);

    const [formData, setformData] = useState(initData);
    const [userData, setUserData] = useState({});
   
    let formInputControl, formInputValue; 
    const handleChange = (e) => {
            e.preventDefault();
            
            formInputControl = e.target.id;
            formInputValue = DOMPurify.sanitize(e.target.value);
            
            setformData(inputs => ({...inputs, [formInputControl]:formInputValue }));
            setOk(false);
    }

    useEffect(() => {
        if(state.cardData)
        setUserData(state);
        else
        setUserData([]);

        return () => {
            setUserData([]);
        }
    }, [state.cardData, state, formData])

    const formSubmit = () => {
        setloading(true);
        dispatch({type:"SUBMIT", payload: formData });
        
        console.log("Updated state", userData);

        axios.get('http://localhost:8000/posts')
            .then((res) => {
                setResponse(res.data);
                console.log("response",res);
                setShow(true);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setloading(false);
            });
        
        
    }
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const [validated, setValidated] = useState(false);
    const [ok, setOk] = useState(false);

    const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    console.log(termsAccept, "-", form.checkValidity());
    
    if(!termsAccept)
      setError("Please accept terms and condition..");
    else{
        if (form.checkValidity() === false) {
            setOk(false);
            setShow(false)
            event.stopPropagation();
        }else
            setOk(true);    
    }//else
      
    setValidated(true);
      
    };// handle submit
  
    useEffect(() => {
      if(ok)
      formSubmit();
  
    }, [ok]);
    
    return(
        <main data-testid="newForm">
        <Container>
        <Row>
            <Col md={11}>
            <Card className="mx-auto my-3">
           
           {error && <Alert variant={"danger"}>
                {error}
            </Alert>
            }
                <Card.Body>
                    <Card.Title className="text-primary">
                        <h1>New Credit card Application</h1></Card.Title><hr/>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                        <Form.Group className="mb-3" controlId="userName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control value={formData.userName} data-testid="userName" required onChange={handleChange} type="text" placeholder="Enter Name" />
                            <Form.Text className="text-muted">
                             Please enter your name.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="userEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control required onChange={handleChange} type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                             Please enter valid email id.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="userDob">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control required onChange={handleChange} type="date" placeholder="Date of birth" />
                            <Form.Text className="text-muted">
                             Please enter your birth date.
                            </Form.Text>
                        </Form.Group>
                        </Col>
                        <Col>
                           
                        <Form.Group className="mb-3" controlId="userPan">
                            <Form.Label>PAN card</Form.Label>
                            <Form.Control required onChange={handleChange} type="text" placeholder="PAN number" />
                            <Form.Text className="text-muted">
                             Please enter your PAN card number.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="userSalary">
                            <Form.Label>Annual Salary</Form.Label>
                            <Form.Control required onChange={handleChange} type="number" placeholder="5,00,000" />
                            <Form.Text className="text-muted">
                             Please enter your annual salary.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="userMobile">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control required onChange={handleChange} type="number" placeholder="Mobile number" />
                            <Form.Text className="text-muted">
                             Please enter valid mobile number.
                            </Form.Text>
                        </Form.Group>

                     </Col>
                    </Row>
                    <hr/>
                    <Form.Group className="mb-3" controlId="userTerms">
                            <Form.Check checked={termsAccept} onChange={()=>{setTermsAccept(!termsAccept); setError(''); } } type="checkbox" label="I agree Terms and conditions" />
                    </Form.Group>
                    <Row >
                            <Col className="d-grid mx-2">
                            <Button data-testid="applyNowBtn" className="mr-4" variant="primary" type="submit">
                                Apply Now
                            </Button>
                            <Button data-testid="clearBtn" variant="secondary" type="button">
                                Clear
                            </Button>
                            </Col>
                            <Col>
                            
                            
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
            </Col>

            {/* <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Success!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Application Number: <strong>{response.data}</strong>. Thank you for your interest our Credit card. We have received your applicaiton successfully.</Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Ok
                </Button>
                </Modal.Footer>
            </Modal> */}
        </Row>
        </Container>
        </main>
    )
};