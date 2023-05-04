import React, { useState } from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import DeletionConfirmPrompt from "./DeletionConfirmPrompt/DeletionConfirmPrompt";
import axios from "axios";

function ItemList({ items, onRemoveItem }) {
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  if (!items) {
    return <div>Loading...</div>;
  }

  const handleDelete = async () => {
    // TODO: Implement delete functionality here
    console.log("Deleting item", itemToDelete);
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.delete(
        `http://localhost:5001/api/items/${itemToDelete._id}`,
        config
      );
      // Remove the deleted item from the items array
      onRemoveItem(itemToDelete); // Callback function, deletes the item from items array
    } catch (error) {
      console.log(error.response);
    }
    setItemToDelete(null);
    setShowDeletePrompt(false);
  };

  return (
    <>
      <Accordion>
        {items.map((item, index) => (
          <Card key={index}>
            <Accordion.Item eventKey={index.toString()}>
              <div className="d-flex justify-content-between">
                <Accordion.Header>{item.name}</Accordion.Header>
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
                      setItemToDelete(item);
                      setShowDeletePrompt(true);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
              <Accordion.Body>
                <p>Quantity: {item.quantity}</p>
                <p>Description: {item.description}</p>
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

export default ItemList;
