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
    }
  }
`;