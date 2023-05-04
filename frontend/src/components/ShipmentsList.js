import React, { useState } from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import DeletionConfirmPrompt from "./DeletionConfirmPrompt/DeletionConfirmPrompt";
import axios from "axios";

function ShipmentList({ shipments, onRemoveShipment }) {
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [shipmentToDelete, setShipmentToDelete] = useState(null);
  const [itemsInShipment, setItemsInShipment] = useState("");

  if (!shipments) {
    return <div>Loading...</div>;
  }

  const handleDelete = async () => {
    // TODO: Implement delete functionality here
    console.log("Deleting shipment", shipmentToDelete);
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.delete(
        `http://localhost:5001/api/shipments/${shipmentToDelete._id}`,
        config
      );
      // Remove the deleted item from the shipments array
      onRemoveShipment(shipmentToDelete); // Callback function, deletes the item from shipments array
    } catch (error) {
      console.log(error.response);
    }
    setShipmentToDelete(null);
    setShowDeletePrompt(false);
  };

  return (
    <>
      <Accordion>
        {shipments.map((shipment, index) => (
          <Card key={index}>
            <Accordion.Item eventKey={index.toString()}>
              <div className="d-flex justify-content-between">
                <Accordion.Header>{shipment.carrier}</Accordion.Header>
                <div>
                  <Button
                    variant="primary"
                    onClick={() => console.log("Edit button clicked")}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setShipmentToDelete(shipment);
                      setShowDeletePrompt(true);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
              <Accordion.Body>
                <p>carrier: {shipment.carrier}</p>
                <p>Tracking Number: {shipment.trackingNumber}</p>
                <p>Expected Arriaval: {shipment.expectedArrival}</p>
                <p>Items:</p>
                <ul>
                  {shipment.itemsContained.map((item) => (
                    <li key={item._id}>
                      {item.item.name} ({item.quantity})
                    </li>
                  ))}
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Card>
        ))}
      </Accordion>

      <DeletionConfirmPrompt
        show={showDeletePrompt}
        onHide={() => setShowDeletePrompt(false)}
        onDelete={handleDelete}
      />
    </>
  );
}

export default ShipmentList;
