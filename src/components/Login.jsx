import axios from "axios";
import React, { useState } from "react";
// import LoginIcon from "@mui/icons-material/Login";
// import Button from '@mui/material/Button';
import { Form, Button } from "react-bootstrap";
// onSubmit={handleSubmit}
function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [credential, setCredential] = useState({
    email: "",
    password: ""
  })

  function handleChange (event) {
    

    const {name, value} = event.target;
    setCredential((preValue) => {
      return {
        ...preValue, [name] : value
      }
    })
  }

  function handleClick(event) {
    event.preventDefault();
    const configuration = {
      method: "post",
      url : "http://localhost:5000/login",
      data : {
        email: credential.email,
        password: credential.password
      }
    }

    axios(configuration)
    .then((result) => {
      console.log(result);
      setIsLoggedIn(true);
      setMessage(result.data);
      // if(result.data){
      //   window.location.href = "/keeper";
      // }
      
    })
    .catch((error) => {
      error = new Error();
      console.log(error);
    })
  }
  return (
    <>
    <h2>Login</h2>
      <Form noValidate>
        {/* email */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control required type="email" placeholder="Enter email" name="email" value={credential.email} onChange = {handleChange} />
        </Form.Group>

        {/* password */}
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control required type="password" placeholder="Password" name="password" value={credential.password} onChange = {handleChange} />
        </Form.Group>

        <p>{
          isLoggedIn && message
        }</p>

        {/* submit button */}
        <Button variant="primary" type="submit" onClick={handleClick}>
          Submit
        </Button>
      </Form>
    
      </>
  );
}

export default Login;
