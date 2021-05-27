const getTransactionDetails = require("./getTransaction");
const updateInventory = require("./updateInventory");
const updateOrdersTable = require("./updateOrders");
const { emailReceipt, emailTickets } = require("./sendEmails");

/* Amplify Params - DO NOT EDIT
	API_TARRACOREAPI_GRAPHQLAPIENDPOINTOUTPUT
	API_TARRACOREAPI_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

exports.handler = async (event) => {
  console.log("*** Checkout Success ***");
  console.log("EVENT", JSON.stringify(event));

  for (const { messageId, body, messageAttributes } of event.Records) {
    try {
      console.log("SQS Msssage Id: ", messageId);
      console.log(body);

      // Get transaction by id e.g. details.payload.customermiddlename
      const transactionDetails = await getTransactionDetails(
        messageAttributes.TransactionId.stringValue
      );
      // ------
      // Update Inventory
      const updateReponse = await updateInventory(transactionDetails);
      console.log("updateInventory", JSON.stringify(updateReponse));
      // ------
      // Update Orders table
      transactionDetails.tickets = [...updateReponse.tickets];
      transactionDetails.orderProductId = transactionDetails.product.id;
      transactionDetails.product.tickets = transactionDetails.tickets.join(
        ", "
      );
      transactionDetails.paymentRef =
        messageAttributes.RequestReference.stringValue;
      const orderid = await updateOrdersTable(transactionDetails);
      // --------
      // Send Payment Receipt
      transactionDetails.orderid = orderid;
      transactionDetails.total = messageAttributes.Amount.stringValue;
      await emailReceipt(transactionDetails.email, transactionDetails);
      // --------
      // Send ticket Receipt
      if (transactionDetails.isAnswerCorrect) {
        await emailTickets(transactionDetails.email, transactionDetails);
      }
    } catch (ex) {
      console.log("*** EXCEPTION ***");
      console.log("message", JSON.stringify(ex));
      console.log("Attributes", JSON.stringify(messageAttributes));
    }
  }

  return `Successfully processed ${event.Records.length} messages`;
};
