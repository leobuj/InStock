const express = require("express");
const app = express();
const axios = require("axios");

// converts JSON object returned to string
var getString = (o) => {
  if (o !== null) {
    if (typeof o === "string") {
      return o;
    } else {
      return JSON.stringify(o);
    }
  } else {
    return null;
  }
};

const TEST_USER_EMAIL = "JEST_TEST_USER@gmail.com";
const TEST_USER_USERNAME = "JEST_TEST_USER";
const TEST_USER_PASS = "jest_test_passsword";

var getJWT = async () => {
  // Must first login to obtain JWT necessary for item creation
  let login_payload = { email: TEST_USER_EMAIL, password: TEST_USER_PASS };
  let res_login = await axios.post(
    "http://localhost:5001/api/users/login",
    login_payload
  );
  var data = getString(res_login.data);
  const JWT = data.split('"').slice(15, 16).join('"');
};

test("Shipment Creation Works", async () => {
  // Must first login to obtain JWT necessary for item creation
  let login_payload = { email: TEST_USER_EMAIL, password: TEST_USER_PASS };
  let res_login = await axios.post(
    "http://localhost:5001/api/users/login",
    login_payload
  );
  var data = getString(res_login.data);
  const JWT = data.split('"').slice(15, 16).join('"');

  // Bearer token now jas JWT
  const config = { headers: { Authorization: `Bearer ${JWT}` } };

  const carrier = "FAKE_CARRIER_DELETE_LATER";
  const expectedArrival = "2023-07-01T12:00:00Z";
  const trackingNumber = (Math.random() + 1).toString(36).substring(2);
  const item1 = "6450bb9b21198cd9c0af9ead";
  const item2 = "6450bba021198cd9c0af9eb2";
  const itemsContained = [item1, item2];

  const shipment_payload = {
    carrier: carrier,
    expectedArrival: expectedArrival,
    trackingNumber: trackingNumber,
    itemsContained: [
      { item: item1, quantity: 1 },
      { item: item2, quantity: 1 },
    ],
  };

  let res_shipment_creation = await axios.post(
    "http://localhost:5001/api/shipments/create",
    shipment_payload,
    config
  );

  var shipment_data = getString(res_shipment_creation.data);
  const result = shipment_data.split(",").slice(2, 5).join(",");
  const expectedResponse = `"trackingNumber":"${trackingNumber}","itemsContained":[{"item":"${item1}","quantity":1`;

  expect(expectedResponse).toBe(result);
});

test("Shipment lookup via ID works", async () => {
  // Must first login to obtain JWT necessary for item creation
  let login_payload = { email: TEST_USER_EMAIL, password: TEST_USER_PASS };
  let res_login = await axios.post(
    "http://localhost:5001/api/users/login",
    login_payload
  );
  var data = getString(res_login.data);
  const JWT = data.split('"').slice(15, 16).join('"');

  // Bearer token now jas JWT
  const config = { headers: { Authorization: `Bearer ${JWT}` } };

  const trackingNumber = "6lkhmcxood";
  const item1 = "6450bb9b21198cd9c0af9ead";
  const item2 = "6450bba021198cd9c0af9eb2";
  const shipment_id = "6453bf1ff149546fd8287575";

  let res_shipment_creation = await axios.get(
    `http://localhost:5001/api/shipments/${shipment_id}`,
    config
  );
  var shipment_data = getString(res_shipment_creation.data);

  const result = shipment_data.split(",").slice(3, 6).join(",");
  const expectedResponse = `"trackingNumber":"${trackingNumber}","itemsContained":[{"item":"${item1}","quantity":1`;

  expect(result).toBe(expectedResponse);
});
