exports.handler = async (event, context, callback) => {
  var errMsg; // eslint-disable-line
  const token = process.env.PAYMENTS_WEBHOOK_SECRET;
  const headers = event.headers;

  if (typeof token !== "string") {
    errMsg = "Must provide a 'PAYMENTS_WEBHOOK_SECRET' env variable";
    return callback(null, {
      statusCode: 401,
      headers: { "Content-Type": "text/plain" },
      body: errMsg,
    });
  }

  /* eslint-disable */
  console.log("----------------------------------");
  console.log(`Trust-Payments-Event: "${JSON.stringify(event)}"`);

  console.log("----------------------------------");

  console.log("Payload", event.body);
  console.log("----------------------------------");
  console.log("Headers", headers);
  /* eslint-enable */

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      input: event,
    }),
  };

  return callback(null, response);
};
