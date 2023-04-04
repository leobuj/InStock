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

test("Basic User Login Works", async () => {
  const email = "leo@gmail.com";
  const pass = "leo";
  let payload = { email: "leo@gmail.com", password: "leo" };
  let res = await axios.post("http://localhost:5001/api/users/login", payload);

  var data = getString(res.data);
  const result = data.split(",").slice(0, 3).join(",");

  const expectedResponse =
    '{"_id":"642a08ecad225ddc440b6ffc","name":"leo","email":"leo@gmail.com"';

  expect(result).toBe(expectedResponse);
});

test("Basic User Creation", async () => {
  const randomEmail = (Math.random() + 1).toString(36).substring(7);

  const email = `${randomEmail}@gmail.com`;
  const username = "DELETE_LATER";
  const pass = "randomPassword";

  let payload = { name: username, email: email, password: pass };
  let res = await axios.post("http://localhost:5001/api/users", payload);

  var data = getString(res.data);
  const result = data.split(",").slice(1, 3).join(",");

  const expectedResponse = `"name":"DELETE_LATER","email":"${email}"`;

  expect(result).toBe(expectedResponse);
});
