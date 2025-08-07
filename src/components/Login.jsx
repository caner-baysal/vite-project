import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Card, CardBody, CardHeader, FormFeedback } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const initialForm = {
  email: '',
  password: '',
  terms: false,
};

const errorMessages = {
  email: 'Please enter a valid email',
  password: 'Please enter a valid password ',
  terms: "Please agree User Agreement",
};

const initialErrors= {
  email: false,
  password: false,
  terms: false,
}

export default function Login() {
  const [form, setForm] = useState(initialForm);
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

  const handleChange = (event) => {
    let { name, value, type, checked } = event.target;
    value = type === 'checkbox' ? checked : value;
    setForm({ ...form, [name]: value });

    if(name==="email") {
      if(validateEmail(value)) {
        setErrors({...errors, [name]: false});
      } else {
        setErrors({...errors, [name]: true});
      }
    }
    if(name==="password") {
      if(regex.test(value)) {
        setErrors({...errors, [name]: false});
      } else {
        setErrors({...errors, [name]: true});
      }
    }
    if(name==="terms") {
      if(value) {
        setErrors({...errors, [name]: false});
      } else {
        setErrors({...errors, [name]: true});
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(isValid) return;

    axios
      .get('https://6540a96145bedb25bfc247b4.mockapi.io/api/login')
      .then((res) => {
        const user = res.data.find(
          (item) => item.password == form.password && item.email == form.email
        );
        if (user) {
          setForm(initialForm);
          history.push('/main');
        } else {
          history.push('/error');
        }
      });
  };

  return (
    <Card>
      <CardHeader>Giriş Yap</CardHeader>
      <CardBody>
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="exampleEmail">Email:</Label>
        <Input
          id="exampleEmail"
          name="email"
          placeholder="Enter your email"
          type="email"
          onChange={handleChange}
          value={form.email}
          invalid={errors.email}
        />
        {errors.email && <FormFeedback>{errorMessages.email}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password:</Label>
        <Input
          id="examplePassword"
          name="password"
          placeholder="Enter your password "
          type="password"
          onChange={handleChange}
          value={form.password}
          invalid={errors.password}
        />
        {errors.password && <FormFeedback>{errorMessages.password}</FormFeedback>}
      </FormGroup>
      {/* reactstrap checkbox ekleyelim*/}
      <FormGroup check>
        <Input
          type="checkbox"
          name="terms"
          id="terms"
          checked={form.terms}
          onChange={handleChange}
          invalid={errors.terms}
        />{' '}
        <Label htmlFor="terms" check>
          I agree to terms of service and privacy policy
        </Label>
        {errors.terms && <FormFeedback>{errorMessages.terms}</FormFeedback>}
      </FormGroup>

      <FormGroup className="text-center p-4">
        <Button color="primary" disabled={!isValid}>
          Sign In
        </Button>
      </FormGroup>
    </Form>
    </CardBody>
    </Card>
  );
}
