import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "./FormContainer";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address);
  const [city, setCity] = useState(shippingAddress?.city);
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode);
  const [country, setCountry] = useState(shippingAddress?.country);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address" className="m-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your adress"
            value={address}
            required
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city" className="m-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your city"
            value={city}
            required
            onChange={(e) => {
              setCity(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postalCode" className="m-3">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your postal code"
            value={postalCode}
            required
            onChange={(e) => {
              setPostalCode(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="Country" className="m-3">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your Country"
            value={country}
            required
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
