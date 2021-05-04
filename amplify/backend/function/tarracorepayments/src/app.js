/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

/* Amplify Params - DO NOT EDIT
	API_TARRACOREAPI_GRAPHQLAPIENDPOINTOUTPUT
	API_TARRACOREAPI_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const express = require("express");
const app = express();
const getProductInfo = require("./getProducts");
const updateProductInfo = require("./updateProducts");
const updateOrdersTable = require("./updateOrders");

// This is your real test secret API key.
const stripe = require("stripe")(
  "sk_test_51IRN3MAefCJ43eZzLPuk3jzB44GV3B6gfaiq5kIC8qlFEJ2fFmL7LaJ4eAgt718UkLorwC8QiPYNFnP1ImUVL92a00kmtpfbSc"
);

app.use(express.static("."));
app.use(express.json());

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const updateInventory = async (order) => {
  let productInfo;
  let newCurrentInventory;

  if (!order) {
    throw "No Order! " + JSON.stringify(order);
  }

  try {
    productInfo = await getProductInfo(order.orderProductId);
    newCurrentInventory = productInfo.currentInventory - order.quantity;
  } catch (ex) {
    console.log("*** EXCEPTION [Getting Product Info] ***");
    console.log(JSON.stringify(ex));
    throw "Error updating order info.";
  }

  try {
    await updateProductInfo(order.orderProductId, newCurrentInventory);
  } catch (ex) {
    console.log("*** EXCEPTION [Updating Product Inventory] ***");
    console.log(JSON.stringify(ex));
    throw "Error updating order info.";
  }

  return productInfo.answer;
};

const calculateOrderAmount = async (items) => {
  let amount = 0;
  let productInfo;

  if (!items || !items.length) {
    throw "No items! " + JSON.stringify(items);
  } else if (items && items.length > 1) throw "Too many items in cart";

  try {
    productInfo = await getProductInfo(items[0].id);

    amount = productInfo.price * items[0].quantity;
  } catch (ex) {
    console.log("*** EXCEPTION [Getting Product Info] ***");
    console.log(JSON.stringify(ex));
    throw "Error calculating price. Please try again.";
  }

  if (productInfo && productInfo.currentInventory < items[0].quantity) {
    console.log("*** EXCEPTION [Stock too low] ***");
    console.log(`Current stock: ${productInfo.currentInventory}`);
    console.log(`Requested stock: ${items[0].quantity}`);
    throw `Stock levels too low. Only ${productInfo.currentInventory} available.`;
  }

  console.log("*** Amount Response ***");
  console.log("amount", Math.round(amount * 100));

  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return Math.round(amount * 100);
};

app.post("/paymentinit", async (req, res) => {
  console.log("req.body", req.body);
  const { items } = req.body;
  let amount = 0;

  try {
    amount = await calculateOrderAmount(items);
  } catch (error) {
    res.send({
      error,
    });
  }

  try {
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "eur",
      metadata: { integration_check: "accept_a_payment" },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
      amount,
    });
  } catch (ex) {
    res.send({ ex });
  }
});

app.post("/paymentcomplete", async (req, res) => {
  console.log("req.body", req.body);
  const { order } = req.body;
  let answer = null;
  try {
    // Update Current Inventory
    answer = await updateInventory(order);
  } catch (error) {
    res.send({
      error,
    });
  }

  try {
    order.isAnswerCorrect = answer === order.answer;
    // Update Orders table
    await updateOrdersTable(order);
    res.send({
      status: "ORDER_COMPLETE",
    });
  } catch (ex) {
    res.send({ ex });
  }
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
