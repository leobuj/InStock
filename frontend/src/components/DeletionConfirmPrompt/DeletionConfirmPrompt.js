import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeletionConfirmPrompt = ({ show, onHide, onDelete }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this item?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeletionConfirmPrompt;
