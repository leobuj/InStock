import React, { useState, useEffect } from "react";
import MainScreen from "../../components/MainScreen/MainScreen";
import ShipmentList from "../../components/ShipmentList";
import ShipmentCreationPrompt from "../../components/ShipmentCreationPrompt/ShipmentCreationPrompt";
import { Button } from "react-bootstrap";

const MyShipments = () => {
  const [shipments, setShipments] = useState([]);
  const [showPrompt, setShowPrompt] = useState(false);

  const handleAddShipmentClick = () => {
    setShowPrompt(true);
  };

  const handlePromptClose = () => {
    setShowPrompt(false);
  };

  // Fetches the user's orders from the backend
  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const response = await fetch("http://localhost:5001/api/shipments", {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        const data = await response.json();
        setShipments(data);
      } catch (error) {
        console.error(`ERROR OCCURED: ${error}`);
      }
    };

    fetchShipments();
  }, []);

  const handleNewShipmentClick = (newShipment) => {
    console.log("NEW SHIPMENT WAS ADDED");
    setShipments([...shipments, newShipment]);
  };

  const handleDeleteShipment = (oldShipment) => {
    console.log(`SHIPMENT WAS DELETED\nold_order._id=${oldShipment._id}`);
    setShipments(shipments.filter((shipment) => shipment._id !== oldShipment._id));
  };

  return (
    <MainScreen title="My Shipments">
      <Button
        style={{ marginLeft: 10, marginBottom: 6 }}
        onClick={handleAddShipmentClick}
      >
        Add New Shipment
      </Button>
      <ShipmentList shipments={shipments} onRemoveShipments={handleDeleteShipment} />
      {/* <OrderCreationPrompt
        show={showPrompt}
        handleClose={handlePromptClose}
        onNewOrder={handleNewShipmentClick}
      /> */}
    </MainScreen>
  );
};

export default MyShipments;