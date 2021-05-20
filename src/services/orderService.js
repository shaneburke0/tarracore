import config from "../aws-exports";
import axios from "axios";
import tag from "graphql-tag";
const graphql = require("graphql");
const { print } = graphql;

export const fetchOrderDetails = async (userId) => {
  const getOrderQuery = tag(`
        query ListOrders(
            $userId: String!
            $limit: Int = 50
        ) {
            listOrders(filter: { userId: { ge: $userId } }, limit: $limit) {
                items {
                    id
                    product {
                        price
                        name
                        image
                    }
                    userId
                    quantity
                    orderRef
                    paymentRef
                    tickets
                    answer
                    email
                    address
                    orderDate
                }
            }
        }
    `);
  const gqlData = await axios({
    url: config.aws_appsync_graphqlEndpoint,
    method: "post",
    headers: {
      "x-api-key": process.env.AWS_API_KEY,
    },
    data: {
      query: print(getOrderQuery),
      variables: { userId },
    },
  });

  if (gqlData && gqlData.status === 200) {
    return gqlData.data.data.listOrders.items;
  }

  return [];
};
