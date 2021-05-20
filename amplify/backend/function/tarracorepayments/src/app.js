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
const moment = require("moment");
const calculateOrderAmount = require("./calculateOrderAmount");
const updateTransactionTable = require("./updateTransactions");

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
  const { items, orderId, details, email } = req.body;
  let amount = 0;
  let correctAnswer = "";

  try {
    const calcOrderResponse = await calculateOrderAmount(items);
    amount = calcOrderResponse.amount;
    correctAnswer = calcOrderResponse.answer;
  } catch (error) {
    res.send({
      error,
    });
  }

  try {
    const now = new Date();

    const address =
      details.street +
      ", " +
      details.city +
      ", " +
      details.state +
      ", " +
      details.postal_code +
      ", " +
      details.countryIso;

    const transaction = {
      address,
      county: details.state,
      firstName: details.firstname,
      surname: details.surname,
      answer: details.answer,
      email: details.email,
      orderDate: moment().format("Do MMM YYYY"),
      transactionProductId: items[0].id,
      quantity: items[0].quantity,
      userId: email,
      isAnswerCorrect: correctAnswer === details.answer,
      orderRef: orderId,
    };

    // Update Transactions table
    const transactionId = await updateTransactionTable(transaction);

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
        sitereference: process.env.PAYMENTS_SITE,
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
        customfield1: details.answer,
        customfield2: transactionId,
        customermiddlename: transactionId,
      },
      iat: utcSecondsSinceEpoch,
      iss: process.env.PAYMENTS_USER,
    };
    const secret = process.env.PAYMENTS_SECRET;

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

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
