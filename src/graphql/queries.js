/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      categories
      price
      name
      image
      description
      currentInventory
      maxInventory
      brand
      intro
      sold
      endDate
      question
      options
      answer
      gallery
      tickets
      createdAt
      updatedAt
    }
  }
`;
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        categories
        price
        name
        image
        description
        currentInventory
        maxInventory
        brand
        intro
        sold
        endDate
        question
        options
        answer
        gallery
        tickets
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      id
      product {
        id
        categories
        price
        name
        image
        description
        currentInventory
        maxInventory
        brand
        intro
        sold
        endDate
        question
        options
        answer
        gallery
        tickets
        createdAt
        updatedAt
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
      isAnswerCorrect
      county
      createdAt
      updatedAt
    }
  }
`;
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        product {
          id
          categories
          price
          name
          image
          description
          currentInventory
          maxInventory
          brand
          intro
          sold
          endDate
          question
          options
          answer
          gallery
          tickets
          createdAt
          updatedAt
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
        isAnswerCorrect
        county
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTransaction = /* GraphQL */ `
  query GetTransaction($id: ID!) {
    getTransaction(id: $id) {
      id
      product {
        id
        categories
        price
        name
        image
        description
        currentInventory
        maxInventory
        brand
        intro
        sold
        endDate
        question
        options
        answer
        gallery
        tickets
        createdAt
        updatedAt
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
      createdAt
      updatedAt
    }
  }
`;
export const listTransactions = /* GraphQL */ `
  query ListTransactions(
    $filter: ModelTransactionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTransactions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        product {
          id
          categories
          price
          name
          image
          description
          currentInventory
          maxInventory
          brand
          intro
          sold
          endDate
          question
          options
          answer
          gallery
          tickets
          createdAt
          updatedAt
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getProfile = /* GraphQL */ `
  query GetProfile($id: ID!) {
    getProfile(id: $id) {
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
`;
export const listProfiles = /* GraphQL */ `
  query ListProfiles(
    $filter: ModelProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
      nextToken
    }
  }
`;
