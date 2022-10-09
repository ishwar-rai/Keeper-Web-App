import React from "react";
import Login from "./Login";
import Register from "./Register";
import Header from "./Header";
import { Container, Col, Row } from "react-bootstrap";

function Home() {
  return (
    <>
      <Header show={false} />

      <Container>
        <Row>
          <Col xs={12} sm={12} md={6} lg={6}>
            <Login />
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <Register />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
