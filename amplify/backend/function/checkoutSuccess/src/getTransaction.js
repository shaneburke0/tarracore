const AWS = require("aws-sdk");
const axios = require("axios");
const gql = require("graphql-tag");
const graphql = require("graphql");
const { print } = graphql;

const getTransactionQuery = gql`
  query GetTransaction($id: ID!) {
    getTransaction(id: $id) {
      id
      product {
        id
        price
        name
        currentInventory
        answer
        tickets
      }
      firstName
      surname
      userId
      quantity
      orderRef
      answer
      email
      address
      orderDate
      isAnswerCorrect
      county
    }
  }
`;

AWS.config.update({ region: process.env.REGION });

const getTransactionInfo = async (id) => {
  const graphqlData = await axios({
    url: process.env.API_TARRACOREAPI_GRAPHQLAPIENDPOINTOUTPUT,
    method: "post",
    headers: {
      "x-api-key": process.env.API_KEY,
    },
    data: {
      query: print(getTransactionQuery),
      variables: { id },
    },
  });
  console.log("*** GraphQL GetTransaction Response ***");
  console.log("graphqlData", JSON.stringify(graphqlData.data));

  return graphqlData.data.data.getTransaction;
};

module.exports = getTransactionInfo;
