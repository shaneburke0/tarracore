const getTransactionDetails = require("./getTransaction");
const updateInventory = require("./updateInventory");
const updateOrdersTable = require("./updateOrders");
const { emailReceipt, emailTickets, emailSupport } = require("./sendEmails");

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
    let orderid = null;
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
      orderid = await updateOrdersTable(transactionDetails);
      // --------
      // Send Payment Receipt
      transactionDetails.orderid = messageAttributes.OrderRef.stringValue;
      transactionDetails.total = messageAttributes.Amount.stringValue;
      await emailReceipt(transactionDetails.email, transactionDetails);
      // --------
      // Send ticket Receipt
      if (transactionDetails.isAnswerCorrect) {
        await emailTickets(transactionDetails.email, transactionDetails);
      }
    } catch (ex) {
      console.log("*** EXCEPTION ***");
      const error = JSON.stringify(ex);
      console.log("message", error);
      const details = JSON.stringify(messageAttributes);
      console.log("Attributes", details);

      await emailSupport("hello@tarracore.ie", {
        orderRef: messageAttributes.OrderRef.stringValue,
        orderId: orderid,
        error: error,
        details: details,
      });
    }
  }

  return `Successfully processed ${event.Records.length} messages`;
};
