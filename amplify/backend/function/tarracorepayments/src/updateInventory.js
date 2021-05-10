const getProductInfo = require("./getProducts");
const updateProductInfo = require("./updateProducts");

const updateInventory = async (order) => {
  let productInfo;
  let newCurrentInventory;
  let customerTickets = [];
  let isAnswerCorrect = false;

  if (!order) {
    throw "No Order! " + JSON.stringify(order);
  }

  try {
    productInfo = await getProductInfo(order.orderProductId);
    newCurrentInventory = productInfo.currentInventory - order.quantity;
    isAnswerCorrect = productInfo.answer === order.answer;

    if (isAnswerCorrect) {
      customerTickets = productInfo.tickets.splice(0, order.quantity);
    }

    console.log("*** Cusomer Order Question ***");
    console.log("Is answer correct: " + isAnswerCorrect);
    console.log(
      "Expected: " + productInfo.answer + " | received: " + order.answer
    );
  } catch (ex) {
    console.log("*** EXCEPTION [Getting Product Info] ***");
    console.log(JSON.stringify(ex));
    throw "Error updating order info.";
  }

  try {
    await updateProductInfo(
      order.orderProductId,
      newCurrentInventory,
      productInfo.tickets
    );
  } catch (ex) {
    console.log("*** EXCEPTION [Updating Product Inventory] ***");
    console.log(JSON.stringify(ex));
    throw "Error updating order info.";
  }

  return { isAnswerCorrect: isAnswerCorrect, tickets: customerTickets };
};

module.exports = updateInventory;
