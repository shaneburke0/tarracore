var AWS = require("aws-sdk");
const queryString = require("query-string");
const jwt_decode = require("jwt-decode");

/* Amplify Params - DO NOT EDIT
	API_TARRACOREAPI_GRAPHQLAPIENDPOINTOUTPUT
	API_TARRACOREAPI_GRAPHQLAPIIDOUTPUT
	ENV
	FUNCTION_TARRACOREPAYMENTS_NAME
	REGION
Amplify Params - DO NOT EDIT */

// Set the region
AWS.config.update({ region: process.env.REGION });

// Create an SQS service object
var sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

exports.handler = async (event, context, callback) => {
  console.log("EVENT BODY", event.body);

  let qs, jwt, errorcode, errormessage, details, orderreference;
  try {
    qs = queryString.parse(event.body);
    console.log("REQUEST PARAMS", qs);
    errorcode = qs.errorcode;
    errormessage = qs.errormessage;
    orderreference = qs.orderreference;

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
      Location: `${process.env.CHECKOUT_REDIRECT}?code=${errorcode}&ref=${orderreference}`,
    },
  };

  if (errorcode !== "0") {
    return callback(null, redirectResponse);
  }

  var params = {
    MessageAttributes: {
      TransactionId: {
        DataType: "String",
        StringValue: details.payload.customermiddlename,
      },
      OrderRef: {
        DataType: "String",
        StringValue: orderreference,
      },
      RequestReference: {
        DataType: "String",
        StringValue: jwt.payload.requestreference,
      },
      Amount: {
        DataType: "String",
        StringValue: details.payload.mainamount.toString(),
      },
    },
    MessageBody: `Checkout success message for order ref: ${orderreference} & transactionId: ${details.payload.customermiddlename}`,
    MessageDeduplicationId: orderreference, // Required for FIFO queues
    MessageGroupId: "Checkout", // Required for FIFO queues
    QueueUrl: process.env.SQS_QUEUE_URL,
  };

  sqs.sendMessage(params, function(err, data) {
    if (err) {
      console.log("*** Error Sending SQS ***", JSON.stringify(err));
    } else {
      console.log("SQS Sent", data.MessageId);
    }
  });

  return callback(null, redirectResponse);
};
