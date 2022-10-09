import React, {useState} from "react";
// import LoginIcon from "@mui/icons-material/Login";
// import Button from '@mui/material/Button';
import { Form, Button } from "react-bootstrap";
import axios from "axios";

// onSubmit={handleSubmit}
function Register() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [credential, setCredential] = useState({
    email: "",
    password: "",
    confPassword: ""
  })
  const [message, setMessage] = useState("");
  const [register, setRegister] = useState(false);

  function handleChange(event) {
    const {name, value} = event.target;
    setCredential((preValue) => {
      return({
        ...preValue,
        [name]: value
      })
    })
  }
  function handleClick(event) {
    event.preventDefault();
    // set configurations
    const configuration = {
      method: "post",
      url: "http://localhost:5000/register",
      data: {
        email: credential.email,
        password: credential.password,
        confPassword: credential.confPassword,
      },
    };
    
    
    axios(configuration)
    .then((result) => {
      // if(result.data.code === 1){
      //   setMessage(result.data.message);
      //   console.log(message);
      // } else if(result.data.code === 2) {
      //   console.log(result.data.message);
      //   window.location.href = "/keeper"
      // } else {
      //   console.log(result);
      //   setMessage(result.data);
      // }
      console.log(result);
      setRegister(true);
      
      
    })
    .catch((error) => {
      error = new Error();
    });
  }
  return (
    <>
      <h2>Register</h2>
      <Form>
        {/* email */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" value={credential.email} onChange={handleChange} />
        </Form.Group>

        {/* password */}
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" value={credential.password} onChange={handleChange} />
        </Form.Group>

        {/* confirm password */}
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="confPassword" value={credential.confPassword} onChange={handleChange} />
        </Form.Group>

        <p>
        {
          register && message
        }
        </p>

        {/* submit button */}
        <Button variant="primary" type="submit" onClick={handleClick}>
          Submit
        </Button>
        
      </Form>
    </>
  );
}

export default Register;
