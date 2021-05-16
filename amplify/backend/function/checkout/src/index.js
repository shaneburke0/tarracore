const queryString = require("query-string");
const jwt_decode = require("jwt-decode");
const getTransactionDetails = require("./getTransaction");
const updateInventory = require("./updateInventory");
const updateOrdersTable = require("./updateOrders");
const { emailReceipt, emailTickets } = require("./sendEmails");

/* Amplify Params - DO NOT EDIT
	API_TARRACOREAPI_GRAPHQLAPIENDPOINTOUTPUT
	API_TARRACOREAPI_GRAPHQLAPIIDOUTPUT
	ENV
	FUNCTION_TARRACOREPAYMENTS_NAME
	REGION
Amplify Params - DO NOT EDIT */

exports.handler = async (event, context, callback) => {
  console.log("EVENT BODY", event.body);

  let qs, jwt, errorcode, errormessage, details;
  try {
    qs = queryString.parse(event.body);
    console.log("REQUEST PARAMS", qs);
    errorcode = qs.errorcode;
    errormessage = qs.errormessage;

    console.log("BODY JWT", qs.jwt);
    jwt = jwt_decode(qs.jwt);
    details = jwt_decode(jwt.payload.jwt);

    console.log("JWT PARAMS", JSON.stringify(jwt));
    console.log("JWT PAYLOAD", JSON.stringify(details));

    // "errorcode":"0",
    // "errormessage":"Payment has been successfully processed",
  } catch (ex) {
    console.log("*** EXCEPTION ***");
    console.log("message", JSON.stringify(ex));
  }

  const redirectResponse = {
    statusCode: 302,
    headers: {
      Location: `${process.env.CHECKOUT_REDIRECT}?code=${errorcode}`,
    },
  };

  if (errorcode !== "0") {
    return callback(null, redirectResponse);
  }

  try {
    // Get transaction by id e.g. details.payload.customermiddlename
    const transactionDetails = await getTransactionDetails(
      details.payload.customermiddlename
    );
    // ------
    // Update Inventory
    const updateReponse = await updateInventory(transactionDetails);
    console.log("updateInventory", JSON.stringify(updateReponse));
    // ------
    // Update Orders table
    transactionDetails.tickets = [...updateReponse.tickets];
    transactionDetails.orderProductId = transactionDetails.product.id;
    transactionDetails.product.tickets = transactionDetails.tickets.join(", ");
    transactionDetails.paymentRef = jwt.payload.requestreference;
    const orderid = await updateOrdersTable(transactionDetails);
    // --------
    // Send Payment Receipt
    transactionDetails.orderid = orderid;
    transactionDetails.total = details.payload.mainamount;
    await emailReceipt(transactionDetails.email, transactionDetails);
    // --------
    // Send ticket Receipt
    if (transactionDetails.isAnswerCorrect) {
      await emailTickets(transactionDetails.email, transactionDetails);
    }
  } catch (ex) {
    console.log("*** EXCEPTION ***");
    console.log("message", JSON.stringify(ex));
  }

  return callback(null, redirectResponse);
};
