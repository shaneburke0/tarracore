import React from "react"
import { Storage, API, graphqlOperation } from "aws-amplify"
import { createProduct } from "../../graphql/mutations"
import uuid from "uuid/v4"

const initialState = {
  name: "",
  brand: "",
  price: "",
  categories: [],
  image: "",
  description: "",
  currentInventory: "",
  maxInventory: "",
  intro: "",
  sold: false,
}

class AddInventory extends React.Component {
  state = initialState
  clearForm = () => {
    this.setState(() => initialState)
  }
  onImageChange = async e => {
    const file = e.target.files[0]
    const fileName = uuid() + file.name
    // save the image in S3 when it's uploaded
    await Storage.put(fileName, file)
    this.setState({ image: fileName })
  }
  addItem = async () => {
    const {
      name,
      brand,
      price,
      categories,
      image,
      description,
      currentInventory,
      maxInventory,
      intro,
      sold,
    } = this.state
    if (
      !name ||
      !brand ||
      !price ||
      !categories.length ||
      !description ||
      !currentInventory ||
      !image ||
      !maxInventory ||
      !intro ||
      !sold
    )
      return

    // create the item in the database
    const item = {
      ...this.state,
      categories: categories.replace(/\s/g, "").split(","),
    }
    await API.graphql(graphqlOperation(createProduct, { input: item }))
    this.clearForm()
  }
  render() {
    const {
      name,
      brand,
      price,
      categories,
      intro,
      description,
      currentInventory,
      sold,
      maxInventory,
    } = this.state
    return (
      <div>
        <h3>Add Item</h3>
        <div className="flex flex-1 justify-center">
          <div className="w-full max-w-144">
            <form className="bg-white shadow-xs rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Item name
                </label>
                <input
                  onChange={this.onChange}
                  value={name}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Item name"
                  name="name"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="price"
                >
                  Item price
                </label>
                <input
                  onChange={this.onChange}
                  value={price}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="price"
                  type="text"
                  placeholder="Item price"
                  name="price"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="description"
                >
                  Item Description
                </label>
                <input
                  onChange={this.onChange}
                  value={description}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="description"
                  placeholder="Item Description"
                  name="description"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="item image"
                >
                  Item image
                </label>
                <input type="file" onChange={e => this.onImageChange(e)} />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="currentInventory"
                >
                  In stock
                </label>
                <input
                  onChange={this.onChange}
                  value={currentInventory}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="currentInventory"
                  placeholder="Items in stock"
                  name="currentInventory"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="maxInventory"
                >
                  Max Inventory
                </label>
                <input
                  onChange={this.onChange}
                  value={maxInventory}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="maxInventory"
                  placeholder="Items max inventory"
                  name="maxInventory"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="categories"
                >
                  Item categories
                </label>
                <input
                  onChange={this.onChange}
                  value={categories}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="categories"
                  placeholder="Comma separated list of item categories"
                  name="categories"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="brand"
                >
                  Item brand
                </label>
                <input
                  onChange={this.onChange}
                  value={brand}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="brand"
                  placeholder="Item brand"
                  name="brand"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="intro"
                >
                  Item intro
                </label>
                <input
                  onChange={this.onChange}
                  value={intro}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="intro"
                  placeholder="Item intro"
                  name="intro"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="sold"
                >
                  Item sold
                </label>
                <input
                  onChange={this.onChange}
                  value={sold}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="sold"
                  placeholder="Item sold"
                  name="sold"
                />
              </div>
              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={this.addItem}
                  className="bg-secondary hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Add Item
                </button>
                <a
                  onClick={this.clearForm}
                  className="inline-block align-baseline font-bold text-sm"
                  href="#/"
                >
                  Clear Form
                </a>
              </div>
            </form>
            <p className="text-center text-gray-500 text-xs">
              &copy;2020 JAMstack ECommerce. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default AddInventory
