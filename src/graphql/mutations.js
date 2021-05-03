/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProduct = /* GraphQL */ `
  mutation CreateProduct(
    $input: CreateProductInput!
    $condition: ModelProductConditionInput
  ) {
    createProduct(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
    }
  }
`;
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
    }
  }
`;
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
    }
  }
`;
export const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
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
        createdAt
        updatedAt
      }
      userId
      quantity
      paymentRef
      tickets
      answer
      email
      address
      orderDate
      isAnswerCorrect
      createdAt
      updatedAt
    }
  }
`;
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
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
        createdAt
        updatedAt
      }
      userId
      quantity
      paymentRef
      tickets
      answer
      email
      address
      orderDate
      isAnswerCorrect
      createdAt
      updatedAt
    }
  }
`;
export const deleteOrder = /* GraphQL */ `
  mutation DeleteOrder(
    $input: DeleteOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    deleteOrder(input: $input, condition: $condition) {
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
        createdAt
        updatedAt
      }
      userId
      quantity
      paymentRef
      tickets
      answer
      email
      address
      orderDate
      isAnswerCorrect
      createdAt
      updatedAt
    }
  }
`;
