import React from "react";
import { Card, Accordion } from "react-bootstrap";
import { useEffect, useState } from "react";
import ItemList from "../../components/ItemsList";
import OrderList from "../../components/OrdersList";
import MainScreen from "../../components/MainScreen/MainScreen";
import ShipmentList from "../../components/ShipmentsList";

const DashboardPage = () => {
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [shipments, setShipments] = useState([]);

  // Fetches the user's items from the backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const itemsResponse = await fetch("http://localhost:5001/api/items", {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        const ordersResponse = await fetch("http://localhost:5001/api/orders", {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        const shipmentsResponse = await fetch(
          "http://localhost:5001/api/shipments",
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        const itemsData = await itemsResponse.json();
        const ordersData = await ordersResponse.json();
        const shipmentsData = await shipmentsResponse.json();
        setItems(itemsData);
        setOrders(ordersData);
        setShipments(shipmentsData);
      } catch (error) {
        console.error(`ERROR OCCURED: ${error}`);
      }
    };

    fetchItems();
  }, []);

  const handleDeleteItem = (oldItem) => {
    console.log(`ITEM WAS DELETED\nold_item._id=${oldItem._id}`);
    setItems(items.filter((item) => item._id !== oldItem._id));
  };

  return (
    <MainScreen title="Dashboard">
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <h2>Items</h2>
            <ItemList items={items} onRemoveItem={handleDeleteItem} />
          </div>
          <div className="col-md-6" style={{ paddingTop: "150px" }}>
            <h2>Incoming Shipments</h2>
            <ShipmentList shipments={shipments} />
          </div>
          <div className="col-md-6">
            <h2>Outgoing Orders</h2>
            <OrderList orders={orders} />
          </div>
        </div>
      </div>
    </MainScreen>
  );
};

export default DashboardPage;
