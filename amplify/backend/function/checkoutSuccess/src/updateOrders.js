const AWS = require("aws-sdk");
const axios = require("axios");
const gql = require("graphql-tag");
const graphql = require("graphql");
const { print } = graphql;

const updateOrder = gql`
  mutation CreateOrder(
    $address: String!
    $email: String!
    $answer: String!
    $isAnswerCorrect: Boolean
    $orderDate: String!
    $orderProductId: ID!
    $paymentRef: String
    $orderRef: String
    $quantity: Int!
    $tickets: [Int]
    $userId: String!
    $county: String
  ) {
    createOrder(
      input: {
        address: $address
        answer: $answer
        email: $email
        isAnswerCorrect: $isAnswerCorrect
        orderDate: $orderDate
        orderProductId: $orderProductId
        orderRef: $orderRef
        paymentRef: $paymentRef
        quantity: $quantity
        userId: $userId
        county: $county
        tickets: $tickets
      }
    ) {
      id
    }
  }
`;

AWS.config.update({ region: process.env.REGION });

const updateOrdersTable = async (order) => {
  const graphqlData = await axios({
    url: process.env.API_TARRACOREAPI_GRAPHQLAPIENDPOINTOUTPUT,
    method: "post",
    headers: {
      "x-api-key": process.env.API_KEY,
    },
    data: {
      query: print(updateOrder),
      variables: order,
    },
  });
  console.log("*** GraphQL Create Order Response ***");
  console.log("graphqlData", JSON.stringify(graphqlData.data));

  return graphqlData.data.data.createOrder.id;
};

module.exports = updateOrdersTable;
