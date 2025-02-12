/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct {
    onCreateProduct {
      id
      categories
      price
      oldPrice
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
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct {
    onUpdateProduct {
      id
      categories
      price
      oldPrice
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
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct {
    onDeleteProduct {
      id
      categories
      price
      oldPrice
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
export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder {
    onCreateOrder {
      id
      product {
        id
        categories
        price
        oldPrice
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
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder {
    onUpdateOrder {
      id
      product {
        id
        categories
        price
        oldPrice
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
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder {
    onDeleteOrder {
      id
      product {
        id
        categories
        price
        oldPrice
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
export const onCreateTransaction = /* GraphQL */ `
  subscription OnCreateTransaction {
    onCreateTransaction {
      id
      product {
        id
        categories
        price
        oldPrice
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
export const onUpdateTransaction = /* GraphQL */ `
  subscription OnUpdateTransaction {
    onUpdateTransaction {
      id
      product {
        id
        categories
        price
        oldPrice
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
export const onDeleteTransaction = /* GraphQL */ `
  subscription OnDeleteTransaction {
    onDeleteTransaction {
      id
      product {
        id
        categories
        price
        oldPrice
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
export const onCreateProfile = /* GraphQL */ `
  subscription OnCreateProfile {
    onCreateProfile {
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
export const onUpdateProfile = /* GraphQL */ `
  subscription OnUpdateProfile {
    onUpdateProfile {
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
export const onDeleteProfile = /* GraphQL */ `
  subscription OnDeleteProfile {
    onDeleteProfile {
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
