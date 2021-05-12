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

  let qs, jwt, errorcode;
  try {
    qs = queryString.parse(event.body);
    console.log("REQUEST PARAMS", qs);
    errorcode = qs.errorcode;

    console.log("BODY JWT", qs.jwt);
    jwt = jwt_decode(qs.jwt);

    console.log("JWT PARAMS", JSON.stringify(jwt));

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

  return callback(null, redirectResponse);
};
