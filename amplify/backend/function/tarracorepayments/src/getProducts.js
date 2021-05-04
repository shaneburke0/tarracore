const AWS = require("aws-sdk");
const axios = require("axios");
const gql = require("graphql-tag");
const graphql = require("graphql");
const { print } = graphql;

const getProductQuery = gql`
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      price
      currentInventory
      answer
      tickets
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

module.exports = getProductInfo;
