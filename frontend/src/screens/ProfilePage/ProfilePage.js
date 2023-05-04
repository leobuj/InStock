import React from "react";
import { Card, Accordion } from "react-bootstrap";
import { useEffect, useState } from "react";
import ItemList from "../../components/ItemsList";
import OrderList from "../../components/OrdersList";
import MainScreen from "../../components/MainScreen/MainScreen";
import ShipmentList from "../../components/ShipmentsList";
import axios from "axios";




const ProfilePage = () => {
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [shipments, setShipments] = useState([]);
  const [userInfo, setUserInfo] = useState([]);


  const [userData, setUserData] = useState({});

  useEffect(() => {
    axios.get('/api/user')
      .then(res => {
        setUserData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

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
        const userResponse = await fetch(
            "http://localhost:5001/api/users",
            {
              headers: {
                Authorization: `Bearer ${userInfo.token}`,
              },
            }
        );

        const userData = await userResponse.json()
        const itemsData = await itemsResponse.json();
        const ordersData = await ordersResponse.json();
        const shipmentsData = await shipmentsResponse.json();
        setItems(itemsData);
        setOrders(ordersData);
        setShipments(shipmentsData);
        setUserInfo(userData);
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
    <MainScreen title="My Profile">
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <h2>UserName</h2>
            <h3>{userData.name}</h3>

          </div>
          <div className="col-md-6" style={{ paddingTop: "150px" }}>
          </div>
          <div className="col-md-6">
            <h2>Email</h2>
          </div>
        </div>
      </div>
    </MainScreen>
  );
};
export default ProfilePage;