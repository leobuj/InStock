import React, { useState, useEffect } from "react";
import MainScreen from "../../components/MainScreen/MainScreen";
import OrderList from "../../components/OrdersList";
import ItemCreationPrompt from "../../components/ItemCreationPrompt/ItemCreationPrompt";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [showPrompt, setShowPrompt] = useState(false);

//   const handleAddItemClick = () => {
//     setShowPrompt(true);
//   };

  const handlePromptClose = () => {
    setShowPrompt(false);
  };

  // Fetches the user's items from the backend
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

//   const handleNewItemClick = (newOrder) => {
//     console.log("NEW ITEM WAS ADDED");
//     setOrders([...orders, newOrder]);
//   };

  const handleDeleteOrder = (oldOrder) => {
    console.log(`ORDER WAS DELETED\nold_order._id=${oldOrder._id}`);
    setOrders(orders.filter((order) => order._id !== oldOrder._id));
  };

  return (
    <MainScreen title="My Orders">
      {/* <Button
        style={{ marginLeft: 10, marginBottom: 6 }}
        onClick={handleAddItemClick}
      >
        Add New Item
      </Button> */}
      <OrderList orders={orders} onRemoveOrder={handleDeleteOrder} />
      <ItemCreationPrompt
        show={showPrompt}
        handleClose={handlePromptClose}
        // onNewItem={handleNewItemClick}
      />
    </MainScreen>
  );
};

export default MyOrders;
