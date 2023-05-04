import React, { useState, useEffect } from "react";
import MainScreen from "../../components/MainScreen/MainScreen";
import OrderList from "../../components/OrdersList";
import OrderCreationPrompt from "../../components/OrderCreationPrompt/OrderCreationPrompt";
import { Button } from "react-bootstrap";
import ShipmentList from "../../components/ShipmentsList";
import axios from "axios";
import ShipmentCreationPrompt from "../../components/ShipmentCreationPrompt/ShipmentCreationPrompt";

const MyShipments = () => {
  const [shipments, setShipments] = useState([]);
  const [showPrompt, setShowPrompt] = useState(false);

  const handleAddOrderClick = () => {
    setShowPrompt(true);
  };

  const handlePromptClose = () => {
    setShowPrompt(false);
  };

  // Fetches the user's orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        // const response = await fetch("http://localhost:5001/api/shipments", {
        //   headers: {
        //     Authorization: `Bearer ${userInfo.token}`,
        //   },
        // });
        const response = await axios.get(
          "http://localhost:5001/api/shipments?populate=itemsContained",
          config
        );
        const data = response.data;
        console.log(data);
        setShipments(data);
      } catch (error) {
        console.error(`ERROR OCCURED: ${error}`);
      }
    };

    fetchOrders();
  }, []);

  const handleNewOrderClick = (newShipment) => {
    console.log("NEW SHIPMENT WAS ADDED");
    setShipments([...shipments, newShipment]);
  };

  const handleDeleteShipment = (oldShipment) => {
    console.log(`SHIPMENT WAS DELETED\old_shipment._id=${oldShipment._id}`);
    setShipments(shipments.filter((order) => order._id !== oldShipment._id));
  };

  return (
    <MainScreen title="My Shipments">
      <Button
        style={{ marginLeft: 10, marginBottom: 6 }}
        onClick={handleAddOrderClick}
      >
        Add New Order
      </Button>
      <ShipmentList
        shipments={shipments}
        onRemoveShipment={handleDeleteShipment}
      />
      <ShipmentCreationPrompt
        show={showPrompt}
        handleClose={handlePromptClose}
        onNewOrder={handleNewOrderClick}
      />
    </MainScreen>
  );
};

export default MyShipments;
