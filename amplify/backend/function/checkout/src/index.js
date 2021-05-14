const queryString = require("query-string");
const jwt_decode = require("jwt-decode");

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
    console.log("JWT PAYLOAD", JSON.stringify(payload));

    // "errorcode":"0",
    // "errormessage":"Payment has been successfully processed",
  } catch (ex) {
    console.log("*** EXCEPTION ***");
    console.log("message", JSON.stringify(ex));
  }

  if (errorcode !== "0") {
    const redirectResponse = {
      statusCode: 302,
      headers: {
        Location: `${process.env.CHECKOUT_REDIRECT}?code=${errorcode}`,
      },
    };

    return callback(null, redirectResponse);
  }

  try {
    // Update Inventory
    // const updateReponse = await updateInventory(order);
    // ------
    // Get transaction by id e.g. details.payload.customermiddlename
    // const transactionDetails = getTransactionDetails(details.payload.customermiddlename)
    // ------
    // order.tickets = [...updateReponse.tickets];
    // order.cart.items[0].tickets = order.tickets.join(", ");
    // Update Orders table
    // await updateOrdersTable(order);
    // --------
    // Send Payment Receipt
    // await emailReceipt(order.email, order.cart);
    // --------
    // Send ticket Receipt
    // if (transactionDetails.isAnswerCorrect) {
    //   await emailTickets(transactionDetails.email, order.cart);
    // }
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

  return callback(null, redirectResponse);
};
