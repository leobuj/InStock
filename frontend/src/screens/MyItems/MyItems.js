import React, { useState, useEffect } from "react";
import MainScreen from "../../components/MainScreen/MainScreen";
import ItemList from "../../components/ItemsList";

import { Button } from "react-bootstrap";

const MyItems = () => {
  const [items, setItems] = useState([]);

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

  return (
    <MainScreen title="My Items">
      <Button style={{ marginLeft: 10, marginBottom: 6 }}>Add New Item</Button>
      <ItemList items={items} />
    </MainScreen>
  );
};

export default MyItems;
