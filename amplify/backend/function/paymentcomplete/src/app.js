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
      currentInventory
    }
  }
`;

const updateProduct = gql`
  mutation UpdateProduct($id: ID!, $currentInventory: Int!) {
    updateProduct(id: $id, currentInventory: $currentInventory) {
      id
      currentInventory
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

const updateProductInfo = async (id, currentInventory) => {
  const graphqlData = await axios({
    url: process.env.API_TARRACOREAPI_GRAPHQLAPIENDPOINTOUTPUT,
    method: "post",
    headers: {
      "x-api-key": process.env.API_KEY,
    },
    data: {
      query: print(updateProduct),
      variables: { id, currentInventory },
    },
  });
  console.log("*** GraphQL Update Response ***");
  console.log("graphqlData", graphqlData);

  return;
};

const updateInventory = async (items) => {
  let productInfo;
  let newCurrentInventory;

  if (!items || !items.length) {
    throw "No items! " + JSON.stringify(items);
  } else if (items && items.length > 1) throw "Too many items.";

  try {
    productInfo = await getProductInfo(items[0].id);
    newCurrentInventory = productInfo.currentInventory - items[0].quantity;
  } catch (ex) {
    console.log("*** EXCEPTION [Getting Product Info] ***");
    console.log(JSON.stringify(ex));
    throw "Error updating order info.";
  }

  try {
    await updateProductInfo(items[0].id, newCurrentInventory);
  } catch (ex) {
    console.log("*** EXCEPTION [Updating Product Inventory] ***");
    console.log(JSON.stringify(ex));
    throw "Error updating order info.";
  }

  return true;
};

// const updateOrderTable = async (items, paymentRef) => {
//   let productInfo;
//   let newCurrentInventory;

//   if (!items || !items.length) {
//     throw "No items! " + JSON.stringify(items);
//   } else if (items && items.length > 1) throw "Too many items.";

//   try {
//     productInfo = await getProductInfo(items[0].id);
//     newCurrentInventory = productInfo.currentInventory - items[0].quantity;
//   } catch (ex) {
//     console.log("*** EXCEPTION [Getting Product Info] ***");
//     console.log(JSON.stringify(ex));
//     throw "Error updating order info.";
//   }

//   try {
//     await updateProductInfo(items[0].id, newCurrentInventory);
//   } catch (ex) {
//     console.log("*** EXCEPTION [Updating Product Inventory] ***");
//     console.log(JSON.stringify(ex));
//     throw "Error updating order info.";
//   }

//   return true;
// };

app.post("/paymentcomplete", async (req, res) => {
  console.log("req.body", req.body);
  const { items, paymentRef } = req.body;

  try {
    // Update Current Inventory
    await updateInventory(items);
  } catch (error) {
    res.send({
      error,
    });
  }

  try {
    // Update Orders table

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
