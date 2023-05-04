import React, { useState } from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import DeletionConfirmPrompt from "./DeletionConfirmPrompt/DeletionConfirmPrompt";
import axios from "axios";

function OrderList({ orders, onRemoveOrder }) {
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  if (!orders) {
    return <div>Loading...</div>;
  }

  const handleDelete = async () => {
    // TODO: Implement delete functionality here
    console.log("Deleting order", orderToDelete);
    try {
      const userInfo = JSON.parse(localStorage.getOrder("userInfo"));
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.delete(
        `http://localhost:5001/api/orders/${orderToDelete._id}`,
        config
      );
      // Remove the deleted item from the orders array
      onRemoveOrder(orderToDelete); // Callback function, deletes the item from orders array
    } catch (error) {
      console.log(error.response);
    }
    setOrderToDelete(null);
    setShowDeletePrompt(false);
  };

  return (
    <>
      <Accordion>
        {orders.map((order, index) => (
          <Card key={index}>
            <Accordion.Item eventKey={index.toString()}>
              <div className="d-flex justify-content-between">
                <Accordion.Header>{order.products}</Accordion.Header>
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
                      setOrderToDelete(order);
                      setShowDeletePrompt(true);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
              <Accordion.Body>
                <p>Status: {order.status}</p>
                <p>Address: {order.address}</p>
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

export default OrderList;