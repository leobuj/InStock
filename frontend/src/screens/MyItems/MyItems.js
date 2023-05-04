import React, { useState, useEffect } from "react";
import MainScreen from "../../components/MainScreen/MainScreen";
import ItemList from "../../components/ItemsList";
import ItemCreationPrompt from "../../components/ItemCreationPrompt/ItemCreationPrompt";

import { Button } from "react-bootstrap";

const MyItems = () => {
  const [items, setItems] = useState([]);
  const [showPrompt, setShowPrompt] = useState(false);

  const handleAddItemClick = () => {
    setShowPrompt(true);
  };

  const handlePromptClose = () => {
    setShowPrompt(false);
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

  const handleNewItemClick = (newItem) => {
    console.log("NEW ITEM WAS ADDED");
    setItems([...items, newItem]);
  };

  const handleDeleteItem = (oldItem) => {
    console.log(`ITEM WAS DELETED\nold_item._id=${oldItem._id}`);
    setItems(items.filter((item) => item._id !== oldItem._id));
  };

  return (
    <MainScreen title="My Items">
      <Button
        style={{ marginLeft: 10, marginBottom: 6 }}
        onClick={handleAddItemClick}
      >
        Add New Item
      </Button>
      <ItemList items={items} onRemoveItem={handleDeleteItem} />
      <ItemCreationPrompt
        show={showPrompt}
        handleClose={handlePromptClose}
        onNewItem={handleNewItemClick}
      />
    </MainScreen>
  );
};

export default MyItems;
