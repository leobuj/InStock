import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import axios from "axios";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const ShipmentCreationPrompt = ({ show, handleClose, onNewShipment }) => {
  const [carrier, setShipmentCarrier] = useState("");
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [expectedArrival, setExpectedArrival] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [loadingState, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);

  const handleItemsChange = (e) => {
    setSelectedItems([...selectedItems, e.target.value]);
    console.log(`selectedItems array: ${selectedItems}`);
    console.log(`e.target.value: ${e.target.value}`);
    console.log(`e.target.value: ${e.target.value}`);
  };

  const handleShipmentCarrierChange = (e) => {
    setShipmentCarrier(e.target.value);
  };

  const handleExpectedArrivalChange = (date) => {
    setExpectedArrival(new Date(date));
  };

  const handleTrackingNumberChange = (e) => {
    setTrackingNumber(e.target.value);
  };

  // Fetches the user's items from the backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const response = await fetch("http://localhost:5001/api/items", {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error(`ERROR OCCURED: ${error}`);
      }
    };

    fetchItems();
  }, []);

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
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.post(
          "http://localhost:5001/api/shipments/create",
          {
            carrier: carrier,
            expectedArrival: expectedArrival,
            trackingNumber: trackingNumber,
            itemsContained: selectedItems.map((item) => ({
              item: item,
              quantity: 1,
            })),
          },
          config
        );

        //onNewShipment(data); // Callback function, adds new order to orders state in MyOrders.js
        handleClose();
        resetStates();
      } catch (error) {
        console.log(error);
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
              onChange={handleShipmentCarrierChange}
            />
          </Form.Group>
          <Form.Group controlId="trackingNumber">
            <Form.Label>Tracking Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter tracking number"
              value={trackingNumber}
              onChange={handleTrackingNumberChange}
            />
          </Form.Group>
          <Form.Group
            controlId="itemsContained"
            style={{ maxHeight: "200px", overflowY: "scroll" }}
          >
            <Form.Label>Items Contained</Form.Label>
            {items.slice(0, 10).map((item, index) => (
              <div
                key={index}
                className="d-flex align-items-center justify-content-start mb-3"
              >
                <Form.Switch
                  id={`item-${index}`}
                  value={item._id}
                  label={item.name}
                  onChange={handleItemsChange}
                />
                <Form.Control
                  type="number"
                  placeholder="Quantity"
                  min={1}
                  defaultValue={1}
                  style={{ width: "80px" }}
                  className="ml-3"
                />
              </div>
            ))}
          </Form.Group>

          <Form.Group controlId="formDate">
            <Form.Label>Date</Form.Label>
            <DatePicker
              dateFormat="MM-dd-yyyy"
              selected={expectedArrival}
              onChange={handleExpectedArrivalChange}
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

export default ShipmentCreationPrompt;
