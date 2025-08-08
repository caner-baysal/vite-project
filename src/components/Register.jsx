import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { useNavigate } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';


const initialValues= {
    email:"",
    password:"",
    terms: false,
};

const initialErrors = {
    email: false,
    password: false,
    terms: false,
}

const errorMessages = {
  email: 'Please enter a valid email',
  password: 'Please enter a valid password ',
  terms: "Please agree User Agreement",
};

export default function Register() {

    const [form, setForm] = useState(initialValues);
    const [errors, setErrors] = useState(initialErrors);
    const [isValid, setIsValid] = useState(false);

    const navigate = useNavigate();
    
    const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

    useEffect(()=>{
        if(validateEmail(form.email) && regex.test(form.password) && form.terms) {
            setIsValid(true);
        } else {
            setIsValid(true);
        }
    }, [form])

    const handleChange = (event) => {
        let { name, value, type, checked } = event.target;
        value= type === "checkbox" ? checked : value;
        setForm({...form, [name]: value});

        if(name === "email") {
            if(validateEmail(value)){
                setErrors({...errors, [name]: false});
            } else {
                setErrors({...errors, [name]: true});
            }
        }
        if(name === "password") {
            if(regex.test(value)){
                setErrors({...errors, [name]: false});
            } else {
                setErrors({...errors, [name]: true});
            }
        }
        if(name === "terms") {
            if(value){
                setErrors({...errors, [name]: false});
            } else {
                setErrors({...errors, [name]: true});
            }
        }
    }

    const handleSubmit = () => {
        event.preventDefault();

        if (isValid) return;

        axios
        .get('https://6540a96145bedb25bfc247b4.mockapi.io/api/login')
        .then((res)=> {
            const user = res.data.find(
                (item) => item.password === form.password && item.email === form.email
            );
            if(user){
                setForm(initialValues);
                    navigate.push("./success")
                } else {
                    navigate.push("/error")
                };
            });
    }

    return(
        <Card>
            <CardHeader>Login Page</CardHeader>
            <CardBody>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="exampleEmail">Email:</Label>
                        <Input 
                        type="email"
                        name="email"
                        id="exampleEmail"
                        placeholder="Type your email"
                        onChange={handleChange}
                        value={form.email}
                        invalid={errors.email}
                        />
                        {errors.email && <FormFeedback>{errorMessages.email}</FormFeedback>}
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password:</Label>
                        <Input 
                        type="password"
                        name="password"
                        id="examplePassword"
                        placeholder="Type your password"
                        onChange={handleChange}
                        value={form.password}
                        invalid={errors.password}
                        />
                        {errors.password && <FormFeedback>{errorMessages.password}</FormFeedback>}
                    </FormGroup>
                    <FormGroup check>
                        
                        <Input 
                        type="checkbox"
                        id="terms"
                        name="terms"
                        onChange={handleChange}
                        value={form.terms}
                        invalid={errors.terms}
                        />
                    
                        <Label htmlFor="terms" check>
                            User Agreement
                        </Label>
                        {errors.terms && <FormFeedback>{errorMessages.terms}</FormFeedback>}
                    </FormGroup>
                    <FormGroup className="text-center p-4">
                        <Button disabled={!isValid}>
                            Sign In
                        </Button>
                    </FormGroup>
                </Form>
            </CardBody>
        </Card>
    )
}