import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const ItemCreationPrompt = ({ show, handleClose, onNewItem }) => {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [loadingState, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);

  const handleNameChange = (e) => {
    setItemName(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const resetStates = () => {
    setItemName("");
    setQuantity("");
    setDescription("");
    setMessage(null);
    setLoading(false);
  };

  // POSTS the new item to the backend
  const handleConfirmClick = async () => {
    if (itemName !== "" && quantity !== "") {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.post(
          "http://localhost:5001/api/items/create",
          { name: itemName, quantity: quantity, description: description },
          config
        );

        onNewItem(data); // Callback function, adds new item to items state in MyItems.js
        handleClose();
        resetStates();
      } catch (error) {
        console.log(error.response);
        setError(error.response.data.message);
        handleClose();
        setLoading(false);
      }
    } else {
      setMessage("Name and Description required");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
      {loadingState && <Loading></Loading>}
      <Modal.Header closeButton>
        <Modal.Title>Add New Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="itemName">
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter item name"
              value={itemName}
              onChange={handleNameChange}
            />
          </Form.Group>
          <Form.Group controlId="quantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter quantity"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              value={description}
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

export default ItemCreationPrompt;
