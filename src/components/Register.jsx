import axios from "axios";
import { useState } from "react";
import { Button, Card, CardBody, CardHeader, Form, FormGroup, Input, Label } from "reactstrap";

const initialValues= {
    email:"",
    password:"",
    terms: false,
}
const initialErrors = {
  email: 'Please enter a valid email',
  password: 'Please enter a valid password ',
  terms: "Please agree User Agreement",
};

export default function Register() {

    const [form, setForm] = useState(initialValues);
    const [errors, setErrors] = useState(initialErrors);
    const [isValid, setIsValid] = useState(false);
    
    const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

    const handleChange = () => {
        const { name, value, type, checked } = event.target;
        value= type === "checkbox" ? checked : value;
        setForm({...form, [name]: value});
    }

    const handleSubmit = () => {
        axios.get('https://6540a96145bedb25bfc247b4.mockapi.io/api/login')
        .then((res)=> {
            const user = res.data.find(
                (item) => item.password = form.password && item.email === form.email
            );
        })
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
                        >
                        </Input>
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
                        >
                        </Input>
                    </FormGroup>
                    <FormGroup check>
                        
                        <Input 
                        type="checkbox"
                        id="terms"
                        name="terms"
                        onChange={handleChange}
                        value={form.terms}
                        />
                        <Label htmlFor="terms" check>
                            User Agreement
                        </Label>
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