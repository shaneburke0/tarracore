// import getInventory from "./providers/inventoryProvider.js"
import { slugify } from "./utils/helpers"
import config from "./src/aws-exports"
import axios from "axios"
import tag from "graphql-tag"
import fs from "fs"
import downloadImage from "./utils/downloadImage"
import Amplify, { Storage } from "aws-amplify"
Amplify.configure(config)

const graphql = require("graphql")
const { print } = graphql

const ItemView = require.resolve("./src/templates/ItemView")
const CategoryView = require.resolve("./src/templates/CategoryView")
const FaqPage = require.resolve("./src/pages/faq")
const TermsPage = require.resolve("./src/pages/termsConditions")
const PrivacyPage = require.resolve("./src/pages/privacyPolicy")
const TermsOfUsePage = require.resolve("./src/pages/termsOfUse")
const ContactPage = require.resolve("./src/pages/contact")

async function fetchInventory() {
  /* new */
  const listProductsQuery = tag(`
    query listProducts {
      listProducts(limit: 500) {
        items {
          id
          categories
          price
          name
          image
          description
          currentInventory
          brand
          maxInventory
          intro
          sold
          endDate
          question
          options
          gallery
        }
      }
    }
  `)
  const gqlData = await axios({
    url: config.aws_appsync_graphqlEndpoint,
    method: "post",
    headers: {
      "x-api-key": config.aws_appsync_apiKey,
    },
    data: {
      query: print(listProductsQuery),
    },
  })

  console.log("GET PRODUCTS", gqlData.data.data.listProducts)

  let inventory = gqlData.data.data.listProducts.items

  if (!fs.existsSync(`${__dirname}/public/downloads`)) {
    fs.mkdirSync(`${__dirname}/public/downloads`)
  }

  const getImage = async img => {
    try {
      const relativeUrl = `../downloads/${img}`
      if (!fs.existsSync(`${__dirname}/public/downloads/${img}`)) {
        const image = await Storage.get(img)
        await downloadImage(image)
      }
      return relativeUrl
    } catch (err) {
      console.log("error downloading image: ", img, err)
      return null
    }
  }

  await Promise.all(
    inventory.map(async (item, index) => {
      inventory[index].image = await getImage(item.image)

      Array.isArray(item.gallery) &&
        item.gallery.map(async (galleryItem, galleryIndex) => {
          inventory[index].gallery[galleryIndex] = await getImage(galleryItem)
        })
    })
  )
  return inventory
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const inventory = await fetchInventory() // getInventory()

  createPage({
    path: "all",
    component: CategoryView,
    context: {
      content: inventory,
      title: "all",
      type: "categoryPage",
      seo: {
        title: "All",
      },
    },
  })

  const inventoryByCategory = inventory.reduce((acc, next) => {
    const categories = next.categories
    categories.forEach(c => {
      if (acc[c]) {
        acc[c].items.push(next)
      } else {
        acc[c] = {}
        acc[c].items = []
        acc[c].items.push(next)
      }
    })
    return acc
  }, {})

  const categories = Object.keys(inventoryByCategory)

  categories.map(async (category, index) => {
    const previous =
      index === categories.length - 1 ? null : categories[index + 1].node
    const next = index === 0 ? null : categories[index - 1]
    createPage({
      path: slugify(category),
      component: CategoryView,
      context: {
        content: inventoryByCategory[category],
        title: category,
        type: "categoryPage",
        seo: {
          title: category || "",
        },
        previous,
        next,
      },
    })
  })

  inventory.map(async (item, index) => {
    const previous =
      index === inventory.length - 1 ? null : inventory[index + 1].node
    const next = index === 0 ? null : inventory[index - 1]
    createPage({
      path: slugify(item.name),
      component: ItemView,
      context: {
        content: item,
        title: item.name,
        type: "itemPage",
        previous,
        next,
        seo: {
          title: item.name,
        },
      },
    })
  })

  // Create Static pages
  createPage({
    path: slugify("FAQ's"),
    component: FaqPage,
    context: {
      content: "",
      title: "FAQ",
      type: "staticPage",
    },
  })

  createPage({
    path: slugify("Privacy Policy"),
    component: PrivacyPage,
    context: {
      content: "",
      title: "Privacy Policy",
      type: "staticPage",
    },
  })

  createPage({
    path: slugify("Terms & Conditions"),
    component: TermsPage,
    context: {
      content: "",
      title: "Terms & Conditions",
      type: "staticPage",
    },
  })

  createPage({
    path: slugify("Terms Of Use"),
    component: TermsOfUsePage,
    context: {
      content: "",
      title: "Terms Of Use",
      type: "staticPage",
    },
  })

  createPage({
    path: slugify("Contact Us"),
    component: ContactPage,
    context: {
      content: "",
      title: "Contact",
      type: "staticPage",
    },
  })
}

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions
  const inventory = await fetchInventory() //getInventory() //

  /* create nav info for categories */

  const categoryNames = inventory.reduce((acc, next) => {
    next.categories.forEach(c => {
      if (!acc.includes(c)) acc.push(c)
    })
    return acc
  }, [])

  const navData = {
    key: "nav-info",
    data: categoryNames,
  }

  const navNodeContent = JSON.stringify(navData)
  const navNodeMeta = {
    id: createNodeId(`my-data-${navData.key}`),
    parent: null,
    children: [],
    internal: {
      type: `NavInfo`,
      mediaType: `json`,
      content: navNodeContent,
      contentDigest: createContentDigest(navData),
    },
  }

  const navNode = Object.assign({}, navData, navNodeMeta)
  createNode(navNode)

  /* create category info for home page */
  const inventoryByCategory = inventory.reduce((acc, next) => {
    const categories = next.categories

    categories.forEach(c => {
      const index = acc.findIndex(item => item.name === c)
      if (index !== -1) {
        const item = acc[index]
        item.itemCount = item.itemCount + 1
        acc[index] = item
      } else {
        const item = {
          name: c,
          image: next.image,
          itemCount: 1,
        }
        acc.push(item)
      }
    })
    return acc
  }, [])

  const catData = {
    key: "category-info",
    data: inventoryByCategory,
  }

  const catNodeContent = JSON.stringify(catData)
  const catNodeMeta = {
    id: createNodeId(`my-data-${catData.key}`),
    parent: null,
    children: [],
    internal: {
      type: `CategoryInfo`,
      mediaType: `json`,
      content: catNodeContent,
      contentDigest: createContentDigest(catData),
    },
  }

  const catNode = Object.assign({}, catData, catNodeMeta)
  createNode(catNode)

  /* all inventory */
  const inventoryData = {
    key: "all-inventory",
    data: inventory,
  }

  const inventoryNodeContent = JSON.stringify(inventoryData)
  const inventoryNodeMeta = {
    id: createNodeId(`my-data-${inventoryData.key}`),
    parent: null,
    children: [],
    internal: {
      type: `InventoryInfo`,
      mediaType: `json`,
      content: inventoryNodeContent,
      contentDigest: createContentDigest(inventoryData),
    },
  }

  const inventoryNode = Object.assign({}, inventoryData, inventoryNodeMeta)
  createNode(inventoryNode)
}
