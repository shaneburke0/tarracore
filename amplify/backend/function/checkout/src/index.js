const queryString = require("query-string");

/* Amplify Params - DO NOT EDIT
	API_TARRACOREAPI_GRAPHQLAPIENDPOINTOUTPUT
	API_TARRACOREAPI_GRAPHQLAPIIDOUTPUT
	ENV
	FUNCTION_TARRACOREPAYMENTS_NAME
	REGION
Amplify Params - DO NOT EDIT */

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[0]));
  } catch (e) {
    return null;
  }
};

exports.handler = async (event, context, callback) => {
  console.log("EVENT BODY", event.body);

  let qs, jwt, errorcode;
  try {
    qs = queryString.parse(event.body);
    console.log("REQUEST PARAMS", qs);
    errorcode = qs.errorcode;

    console.log("BODY JWT", qs.jwt);

    console.log("JWT PARAMS", parseJwt(qs.jwt));

    // "errorcode":"0",
    // "errormessage":"Payment has been successfully processed",
  } catch (ex) {
    console.log("*** EXCEPTION ***");
    console.log("message", JSON.stringify(ex));
  }

  // TODO implement
  //   const response = {
  //     statusCode: 200,
  //     //  Uncomment below to enable CORS requests
  //     headers: {
  //       "Access-Control-Allow-Origin": "*",
  //       "Access-Control-Allow-Headers": "*",
  //     },
  //     body: JSON.stringify(event),
  //   };
  //   callback(null, response);

  const redirectResponse = {
    statusCode: 301,
    headers: {
      Location: `${process.env.CHECKOUT_REDIRECT}?code=${errorcode}`,
    },
  };

  return callback(null, redirectResponse);
};
