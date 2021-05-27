const updateProductInfo = require("./updateProducts");

const updateInventory = async (order) => {
  let productInfo;
  let newCurrentInventory;
  let customerTickets = [];

  if (!order) {
    throw "No Order! " + JSON.stringify(order);
  }

  try {
    productInfo = order.product;
    newCurrentInventory = productInfo.currentInventory - order.quantity;

    if (order.isAnswerCorrect) {
      customerTickets = productInfo.tickets.splice(0, order.quantity);
    }

    console.log("*** Cusomer Order Question ***");
    console.log("Is answer correct: " + order.isAnswerCorrect);
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
      productInfo.id,
      newCurrentInventory,
      productInfo.tickets
    );
  } catch (ex) {
    console.log("*** EXCEPTION [Updating Product Inventory] ***");
    console.log(JSON.stringify(ex));
    throw "Error updating order info.";
  }

  return { isAnswerCorrect: order.isAnswerCorrect, tickets: customerTickets };
};

module.exports = updateInventory;
