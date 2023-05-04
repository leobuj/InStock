import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const OrderCreationPrompt = ({ show, handleClose, onNewOrder }) => {
  const [orderStatus, setOrderStatus] = useState("");
  const [products, setProducts] = useState("");
  const [address, setAddress] = useState("");
  const [loadingState, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);

  const handleNameChange = (e) => {
    setOrderStatus(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setProducts(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setAddress(e.target.value);
  };

  const resetStates = () => {
    setOrderStatus("");
    setProducts("");
    setAddress("");
    setMessage(null);
    setLoading(false);
  };

  // POSTS the new item to the backend
  const handleConfirmClick = async () => {
    if (orderStatus !== "" && products !== "") {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.post(
          "http://localhost:5001/api/orders/create",
          { status: orderStatus, products: products, address: address },
          config
        );

        onNewOrder(data); // Callback function, adds new item to items state in MyItems.js
        handleClose();
        resetStates();
      } catch (error) {
        console.log(error.response);
        setError(error.response.data.message);
        handleClose();
        setLoading(false);
      }
    } else {
      setMessage("Please fill out all fields");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
      {loadingState && <Loading></Loading>}
      <Modal.Header closeButton>
        <Modal.Title>Add New Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="orderStatus">
            <Form.Label>Order Status</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter order status"
              value={orderStatus}
              onChange={handleNameChange}
            />
          </Form.Group>
          <Form.Group controlId="produccts">
            <Form.Label>Products</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter products"
              value={products}
              onChange={handleQuantityChange}
            />
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the address"
              value={address}
              onChange={handleDescriptionChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleConfirmClick}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderCreationPrompt;
