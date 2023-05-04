import React, { useState, useEffect } from "react";
import MainScreen from "../../components/MainScreen/MainScreen";
import OrderList from "../../components/OrdersList";
import OrderCreationPrompt from "../../components/OrderCreationPrompt/OrderCreationPrompt";
import { Button } from "react-bootstrap";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
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
        const response = await fetch("http://localhost:5001/api/orders", {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error(`ERROR OCCURED: ${error}`);
      }
    };

    fetchOrders();
  }, []);

  const handleNewOrderClick = (newOrder) => {
    console.log("NEW ORDER WAS ADDED");
    setOrders([...orders, newOrder]);
  };

  const handleDeleteOrder = (oldOrder) => {
    setOrders(orders.filter((order) => order._id !== oldOrder._id));
  };

  return (
    <MainScreen title="My Orders">
      <Button
        style={{ marginLeft: 10, marginBottom: 6 }}
        onClick={handleAddOrderClick}
      >
        Add New Order
      </Button>
      <OrderList orders={orders} onRemoveOrder={handleDeleteOrder} />
      <OrderCreationPrompt
        show={showPrompt}
        handleClose={handlePromptClose}
        onNewOrder={handleNewOrderClick}
      />
    </MainScreen>
  );
};

export default MyOrders;
