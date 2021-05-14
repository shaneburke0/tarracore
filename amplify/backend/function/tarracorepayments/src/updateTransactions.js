const AWS = require("aws-sdk");
const axios = require("axios");
const gql = require("graphql-tag");
const graphql = require("graphql");
const { print } = graphql;

const updateTransaction = gql`
  mutation CreateTransaction(
    $address: String!
    $email: String!
    $answer: String!
    $orderDate: String!
    $transactionProductId: ID!
    $orderRef: String
    $quantity: Int!
    $userId: String!
    $firstName: String!
    $surname: String!
    $isAnswerCorrect: Boolean
    $county: String
  ) {
    createTransaction(
      input: {
        address: $address
        email: $email
        answer: $answer
        orderDate: $orderDate
        transactionProductId: $transactionProductId
        orderRef: $orderRef
        quantity: $quantity
        userId: $userId
        firstName: $firstName
        surname: $surname
        isAnswerCorrect: $isAnswerCorrect
        county: $county
      }
    ) {
      id
    }
  }
`;

AWS.config.update({ region: process.env.REGION });

const updateTransactionTable = async (transaction) => {
  console.log("*** GraphQL Creating Transaction ***");
  console.log(JSON.stringify(transaction));

  const graphqlData = await axios({
    url: process.env.API_TARRACOREAPI_GRAPHQLAPIENDPOINTOUTPUT,
    method: "post",
    headers: {
      "x-api-key": process.env.API_KEY,
    },
    data: {
      query: print(updateTransaction),
      variables: transaction,
    },
  });
  console.log("*** GraphQL Create Transaction Response ***");
  console.log("graphqlData", JSON.stringify(graphqlData.data));

  try {
    console.log("Transaction Id", graphqlData.data.data.createTransaction.id);
    return graphqlData.data.data.createTransaction.id;
  } catch (ex) {
    console.log("*** GraphQL Create Transaction Exception ***");
    console.log("EXCEPTION", JSON.stringify(ex));
  }
};

module.exports = updateTransactionTable;
