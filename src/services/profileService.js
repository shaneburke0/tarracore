import config from "../aws-exports";
import axios from "axios";
import tag from "graphql-tag";
const graphql = require("graphql");
const { print } = graphql;

export const fetchProfileDetails = async (userId) => {
  let profile = null;
  const getAccountQuery = tag(`
        query ListProfiles(
            $userId: String!
            $limit: Int = 1
        ) {
          listProfiles(filter: { userId: { ge: $userId } }, limit: $limit) {
                items {
                  id
                  firstName
                  surname
                  userId
                  county
                  country
                  street
                  city
                  state
                  postcode
                  phone
                  createdAt
                  updatedAt
                }
            }
        }
    `);
  const gqlData = await axios({
    url: config.aws_appsync_graphqlEndpoint,
    method: "post",
    headers: {
      "x-api-key": "da2-mgfdzk6odvdb7hm5laltb7ai6q", // config.aws_appsync_apiKey,
    },
    data: {
      query: print(getAccountQuery),
      variables: { userId },
    },
  });

  if (gqlData && gqlData.status === 200) {
    try {
      if (
        gqlData.data.data.listProfiles.items &&
        gqlData.data.data.listProfiles.items.length > 0
      ) {
        profile = gqlData.data.data.listProfiles.items[0];
      }
    } catch (ex) {}
  }

  return profile;
};

export const createProfileDetails = async (details) => {
  const createProfile = tag(`
    mutation CreateProfile(
        $firstName: String!
        $surname: String!
        $userId: String!
        $county: String
        $country: String
        $street: String
        $city: String
        $postcode: String
        $phone: String
    ) {
        createProfile(
        input: {
            firstName: $firstName
            surname: $surname
            userId: $userId
            county: $county
            country: $country
            street: $street
            city: $city
            postcode: $postcode
            phone: $phone
        }
      ) {
        id
      }
    }
  `);

  const graphqlData = await axios({
    url: config.aws_appsync_graphqlEndpoint,
    method: "post",
    headers: {
      "x-api-key": "da2-mgfdzk6odvdb7hm5laltb7ai6q", // config.aws_appsync_apiKey,
    },
    data: {
      query: print(createProfile),
      variables: { ...details },
    },
  });

  if (graphqlData && graphqlData.data && graphqlData.data.error) {
    return false;
  }

  return true;
};

export const updateProfileDetails = async (details) => {
  const updateProfile = tag(`
      mutation UpdateProfile(
          $id: ID!
          $firstName: String!
          $surname: String!
          $userId: String!
          $county: String
          $country: String
          $street: String
          $city: String
          $postcode: String
          $phone: String
      ) {
          updateProfile(
          input: {
              id: $id
              firstName: $firstName
              surname: $surname
              userId: $userId
              county: $county
              country: $country
              street: $street
              city: $city
              postcode: $postcode
              phone: $phone
          }
        ) {
          id
        }
      }
    `);

  const graphqlData = await axios({
    url: config.aws_appsync_graphqlEndpoint,
    method: "post",
    headers: {
      "x-api-key": "da2-mgfdzk6odvdb7hm5laltb7ai6q", // config.aws_appsync_apiKey,
    },
    data: {
      query: print(updateProfile),
      variables: { ...details },
    },
  });

  if (graphqlData && graphqlData.data && graphqlData.data.error) {
    return false;
  }

  return true;
};
