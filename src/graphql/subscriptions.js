/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct {
    onCreateProduct {
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
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct {
    onUpdateProduct {
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
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct {
    onDeleteProduct {
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
export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder {
    onCreateOrder {
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
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder {
    onUpdateOrder {
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
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder {
    onDeleteOrder {
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
