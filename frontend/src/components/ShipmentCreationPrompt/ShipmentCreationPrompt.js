import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const ShipmentCreationPrompt = ({ show, handleClose, onNewShipment }) => {
  const [carrier, setShipmentCarrier] = useState("");
  const [expectedArrival, setExpectedArrival] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [loadingState, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);

  const handleStatusChange = (e) => {
    setShipmentCarrier(e.target.value);
  };

  const handleExpectedArrivalChange = (e) => {
    setExpectedArrival(e.target.value);
  };

  const handleAddressChange = (e) => {
    setTrackingNumber(e.target.value);
  };

  // const handleDateChange = (e) => {
  //   setDate(e.target.value);
  // }

  const resetStates = () => {
    setShipmentCarrier("");
    setExpectedArrival("");
    setTrackingNumber("");
    // setDate("");
    setMessage(null);
    setLoading(false);
  };

  // POSTS the new shipment to the backend
  const handleConfirmClick = async () => {
    if (carrier !== "") {
      try {
        const userInfo = JSON.parse(localStorage.getShipment("userInfo"));
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.post(
          "http://localhost:5001/api/shipments/create",
          { carrier: carrier, expectedArrival: expectedArrival, trackingNumber: trackingNumber },
          config
        );

        onNewShipment(data); // Callback function, adds new order to orders state in MyOrders.js
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
          <Form.Group controlId="carrier">
            <Form.Label>Shipment Carrier</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter shipment carrier"
              value={carrier}
              onChange={handleStatusChange}
            />
          </Form.Group>
          <Form.Group controlId="exectedArrival">
            <Form.Label>Expected Arrival</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter products"
              value={expectedArrival}
              onChange={handleExpectedArrivalChange}
            />
          </Form.Group>
          <Form.Group controlId="trackingNumber">
            <Form.Label>Tracking Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter tracking number"
              value={trackingNumber}
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

export default ShipmentCreationPrompt;