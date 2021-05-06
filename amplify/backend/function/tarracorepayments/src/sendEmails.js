const AWS = require("aws-sdk");
const SES = new AWS.SES();
const fs = require("fs");

AWS.config.update({ region: process.env.REGION });

const emailReceipt = async (to) => {
  const body = fs.readFileSync("./receipt.html").toString();

  const params = {
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Html: { Data: body },
      },
      Subject: {
        Data: "Tarracore.ie Payment Receipt",
      },
    },
    Source: "no-reply@tarracore.ie",
  };

  try {
    await SES.sendEmail(params).promise();
    console.log("*** Email: Receipt SUCCESS ***");
    return {
      statusCode: 200,
      body: "Email sent!",
    };
  } catch (e) {
    console.log("*** Email: Receipt FAILED ***");
    console.error(JSON.stringify(e));
    return {
      statusCode: 400,
      body: "Sending failed",
    };
  }
};

module.exports = {
  emailReceipt: emailReceipt,
  emailTickets: function() {},
};
