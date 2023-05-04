import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const OrderCreationPrompt = ({ show, handleClose, onNewOrder }) => {
  const [orderStatus, setOrderStatus] = useState("");
  const [products, setProducts] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [loadingState, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);

  const handleStatusChange = (e) => {
    setOrderStatus(e.target.value);
  };

  const handleProductsChange = (e) => {
    setProducts(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  // const handleDateChange = (e) => {
  //   setDate(e.target.value);
  // }

  const resetStates = () => {
    setOrderStatus("");
    setProducts("");
    setAddress("");
    setDate("");
    setMessage(null);
    setLoading(false);
  };

  // POSTS the new order to the backend
  const handleConfirmClick = async () => {
    if (orderStatus !== "") {
      try {
        const userInfo = JSON.parse(localStorage.getOrder("userInfo"));
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.post(
          "http://localhost:5001/api/orders/create",
          { status: orderStatus, products: products, address: address, date: date },
          config
        );

        onNewOrder(data); // Callback function, adds new order to orders state in MyOrders.js
        handleClose();
        resetStates();
      } catch (error) {
        console.log(error.response);
        setError(error.response.data.message);
        handleClose();
        setLoading(false);
      }
    } else {
      setMessage("All fields are required");
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
              onChange={handleStatusChange}
            />
          </Form.Group>
          <Form.Group controlId="products">
            <Form.Label>Products</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter products"
              value={products}
              onChange={handleProductsChange}
            />
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              value={address}
              onChange={handleAddressChange}
            />
          </Form.Group>
          {/* <Form.Group controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter date"
              value={date}
              onChange={handleDateChange}
            />
          </Form.Group> */}
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
