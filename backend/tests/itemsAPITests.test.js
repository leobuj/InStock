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

test("Item Creation Works", async () => {
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

  // Random dummy data for random item to be created
  const random_item_name = (Math.random() + 1).toString(36).substring(7);
  const random_item_quantity = Math.floor(Math.random() * 10);
  const random_item_description = "CREATED_VIA_JEST_TESTS";
  const item_payload = {
    name: random_item_name,
    quantity: `${random_item_quantity}`,
    description: random_item_description,
  };

  let res_item_creation = await axios.post(
    "http://localhost:5001/api/items/create",
    item_payload,
    config
  );

  var item_data = getString(res_item_creation.data);
  const result = item_data.split(",").slice(0, 3).join(",");
  const expectedResponse = `{"name":"${random_item_name}","quantity":${random_item_quantity},"description":"${random_item_description}"`;

  expect(result).toBe(expectedResponse);
});

test("Item Lookup via ID Works", async () => {
  let res_itemlookup = await axios.get(
    "http://localhost:5001/api/items/642be4f6d671913e85a23cc2"
  );

  // Details of item already known. Test verifies endpoint to retrieve details works.
  const item_id = "642be4f6d671913e85a23cc2";
  const item_name = "JEST_ITEM_ID_LOOKUP_ITEM";
  const item_quantity = 5;
  const description = "item used to test item lookup endpoint";

  const expectedResponse = `{"_id":"${item_id}","name":"${item_name}","quantity":${item_quantity},"description":"${description}"`;
  var item_data = getString(res_itemlookup.data);
  const result = item_data.split(",").slice(0, 4).join(",");

  expect(result).toBe(expectedResponse);
});
