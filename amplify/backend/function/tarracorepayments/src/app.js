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
const base64url = require("base64url");
const Crypto = require("crypto-js");
const calculateOrderAmount = require("./calculateOrderAmount");
const updateInventory = require("./updateInventory");
const updateOrdersTable = require("./updateOrders");
const { emailReceipt, emailTickets } = require("./sendEmails");

// This is your real test secret API key.
// const stripe = require("stripe")(
//   "sk_test_51IRN3MAefCJ43eZzLPuk3jzB44GV3B6gfaiq5kIC8qlFEJ2fFmL7LaJ4eAgt718UkLorwC8QiPYNFnP1ImUVL92a00kmtpfbSc"
// );

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

app.post("/paymentinit", async (req, res) => {
  console.log("req.body", req.body);
  const { items, orderId, details } = req.body;
  let amount = 0;

  try {
    amount = await calculateOrderAmount(items);
  } catch (error) {
    res.send({
      error,
    });
  }

  try {
    const now = new Date();
    const utcMilllisecondsSinceEpoch =
      now.getTime() + now.getTimezoneOffset() * 60 * 1000;
    const utcSecondsSinceEpoch = Math.round(utcMilllisecondsSinceEpoch / 1000);
    const header = { alg: "HS256", typ: "JWT" };
    const payload = {
      payload: {
        accounttypedescription: "ECOM",
        currencyiso3a: "EUR",
        mainamount: amount,
        orderreference: orderId,
        sitereference: "test_tarracorelimited88769",
        requesttypedescriptions: ["THREEDQUERY", "AUTH"],
        billingfirstname: details.firstname,
        billinglastname: details.surname,
        billingstreet: details.street,
        billingtown: details.city,
        billingpostcode: details.postal_code,
        billingcounty: details.state,
        billingcountryiso2a: details.countryIso,
        billingemail: details.email,
        billingtelephone: details.number,
      },
      iat: utcSecondsSinceEpoch,
      iss: "jwt@tarracorelimited.com",
    };
    const secret =
      "57-8a27c10068cc0c5949817fddb6b5598f4b3fb7d06b85ba69241ed778aebc66b5";

    const message =
      base64url(JSON.stringify(header)) +
      "." +
      base64url(JSON.stringify(payload));
    const hash = Crypto.HmacSHA256(message, secret);
    const hashInBase64 = Crypto.enc.Base64.stringify(hash);
    const jwt = message + "." + base64url.fromBase64(hashInBase64);

    res.send({
      jwt,
      amount,
    });
  } catch (ex) {
    res.send({ ex });
  }
});

app.post("/paymentcomplete", async (req, res) => {
  console.log("req.body", req.body);
  const { order } = req.body;
  let updateReponse = null;
  try {
    // Update Current Inventory
    updateReponse = await updateInventory(order);
  } catch (error) {
    res.send({
      error,
    });
  }

  try {
    await emailReceipt(order.email, order.cart);
  } catch (ex) {
    res.send({ ex });
  }

  try {
    /*
     *   Need to re-think ticket email strategy
     */

    // order.isAnswerCorrect = updateReponse.isAnswerCorrect;
    // order.tickets = [...updateReponse.tickets];
    // order.cart.items[0].tickets = order.tickets.join(", ");

    // // Update Orders table
    // await updateOrdersTable(order);

    // if (order.isAnswerCorrect) {
    //   await emailTickets(order.email, order.cart);
    // }

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
