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
const AWS = require("aws-sdk");
const app = express();
const axios = require("axios");
const gql = require("graphql-tag");
const graphql = require("graphql");
const { print } = graphql;

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

const getProductQuery = gql`
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      price
    }
  }
`;

AWS.config.update({ region: process.env.REGION });

const getProductInfo = async (id) => {
  const graphqlData = await axios({
    url: process.env.API_TARRACOREAPI_GRAPHQLAPIENDPOINTOUTPUT,
    method: "post",
    headers: {
      "x-api-key": process.env.API_KEY,
    },
    data: {
      query: print(getProductQuery),
      variables: { id },
    },
  });
  console.log("*** GraphQL Response ***");
  console.log("graphqlData", graphqlData.data.data.getProduct);

  return graphqlData.data.data.getProduct;
};

const calculateOrderAmount = async (items) => {
  let amount = 0;

  if (!items || !items.length) {
    throw "No items! " + JSON.stringify(items);
  } else if (items && items.length > 1) throw "Too many items in cart";

  try {
    const productInfo = await getProductInfo(items[0].id);

    amount = productInfo.price * items[0].quantity;
  } catch (ex) {
    console.log("*** EXCEPTION ***");
    console.log(JSON.stringify(ex));
    throw "Error calculating price. Please try again.";
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

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
