const AWS = require("aws-sdk");
const axios = require("axios");
const gql = require("graphql-tag");
const graphql = require("graphql");
const { print } = graphql;

const updateProduct = gql`
  mutation UpdateProduct($id: ID!, $currentInventory: Int!, $tickets: [Int]!) {
    updateProduct(
      input: { id: $id, currentInventory: $currentInventory, tickets: $tickets }
    ) {
      id
      currentInventory
      tickets
    }
  }
`;

AWS.config.update({ region: process.env.REGION });

const updateProductInfo = async (id, currentInventory, tickets) => {
  const graphqlData = await axios({
    url: process.env.API_TARRACOREAPI_GRAPHQLAPIENDPOINTOUTPUT,
    method: "post",
    headers: {
      "x-api-key": process.env.API_KEY,
    },
    data: {
      query: print(updateProduct),
      variables: { id, currentInventory, tickets },
    },
  });
  console.log("*** GraphQL Update Response ***");
  console.log("graphqlData", JSON.stringify(graphqlData.data));

  if (graphqlData && graphqlData.data && graphqlData.data.error) {
    console.log("Error updating Product Info");
    throw "Error updating Product table.";
  }

  return;
};

module.exports = updateProductInfo;
