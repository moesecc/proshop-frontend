import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";

import { login } from "../actions/userActions";
import FormContainer from "./FormContainer";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo, loading, error } = userLogin;

  const redirect = location.pathname ? "/" : location.pathname;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const history = useNavigate();
  useEffect(() => {
    if (userInfo) {
      history(redirect);
    }
  }, [userInfo, redirect]);
  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler} className="p-2">
        <Form.Group controlId="email" className="m-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password" className="m-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="m-3">
          <Button type="submit" variant="primary">
            Sign in
          </Button>
        </Form.Group>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect${redirect}` : "/register"}>
            {" "}
            Register Now
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
