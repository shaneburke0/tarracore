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
      tickets
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
      tickets
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
      tickets
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
export const createTransaction = /* GraphQL */ `
  mutation CreateTransaction(
    $input: CreateTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    createTransaction(input: $input, condition: $condition) {
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
export const updateTransaction = /* GraphQL */ `
  mutation UpdateTransaction(
    $input: UpdateTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    updateTransaction(input: $input, condition: $condition) {
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
export const deleteTransaction = /* GraphQL */ `
  mutation DeleteTransaction(
    $input: DeleteTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    deleteTransaction(input: $input, condition: $condition) {
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
export const createProfile = /* GraphQL */ `
  mutation CreateProfile(
    $input: CreateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    createProfile(input: $input, condition: $condition) {
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
export const updateProfile = /* GraphQL */ `
  mutation UpdateProfile(
    $input: UpdateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    updateProfile(input: $input, condition: $condition) {
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
export const deleteProfile = /* GraphQL */ `
  mutation DeleteProfile(
    $input: DeleteProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    deleteProfile(input: $input, condition: $condition) {
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
