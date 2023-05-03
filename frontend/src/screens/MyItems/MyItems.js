import React from "react";
import MainScreen from "../../components/MainScreen/MainScreen";
import ItemList from "../../components/ItemsList";

import { Button } from "react-bootstrap";

const items = [
  {
    name: "Item 1",
    quantity: "1",
    description: "bruhb uhr",
  },
  {
    name: "Item 2",
    quantity: "1",
    description: "bruhb uhr",
  },
  {
    name: "Item 3",
    quantity: "1",
    description: "bruhb uhr",
  },
];

const MyItems = () => {
  return (
    <MainScreen title="My Items">
      <Button style={{ marginLeft: 10, marginBottom: 6 }}>Add New Item</Button>
      <ItemList items={items} />
    </MainScreen>
  );
};

export default MyItems;
