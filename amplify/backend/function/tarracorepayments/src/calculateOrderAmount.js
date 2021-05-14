const getProductInfo = require("./getProducts");

const calculateOrderAmount = async (items) => {
  let amount = 0;
  let productInfo;

  if (!items || !items.length) {
    throw "No items! " + JSON.stringify(items);
  } else if (items && items.length > 1) throw "Too many items in cart";

  try {
    productInfo = await getProductInfo(items[0].id);

    amount = productInfo.price * items[0].quantity;
  } catch (ex) {
    console.log("*** EXCEPTION [Getting Product Info] ***");
    console.log(JSON.stringify(ex));
    throw "Error calculating price. Please try again.";
  }

  if (productInfo && productInfo.currentInventory < items[0].quantity) {
    console.log("*** EXCEPTION [Stock too low] ***");
    console.log(`Current stock: ${productInfo.currentInventory}`);
    console.log(`Requested stock: ${items[0].quantity}`);
    throw `Stock levels too low. Only ${productInfo.currentInventory} available.`;
  }

  console.log("*** Amount Response ***");
  console.log("amount", amount);

  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return { amount, answer: productInfo.answer };
};

module.exports = calculateOrderAmount;
