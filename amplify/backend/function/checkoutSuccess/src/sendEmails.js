const AWS = require("aws-sdk");
const SES = new AWS.SES();
const fs = require("fs");
const Handlebars = require("handlebars");

AWS.config.update({ region: process.env.REGION });

const emailReceipt = async (to, data) => {
  const body = fs.readFileSync("./receipt.html").toString();
  const template = Handlebars.compile(body);
  const compiled = template(data);

  const params = {
    Destination: {
      ToAddresses: [to],
      BccAddresses: [process.env.TRUST_PILOT_EMAIL],
    },
    Message: {
      Body: {
        Html: { Data: compiled },
      },
      Subject: {
        Data: "Tarracore Payment Receipt",
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

const emailTickets = async (to, data) => {
  const body = fs.readFileSync("./tickets.html").toString();
  const template = Handlebars.compile(body);
  const compiled = template(data);

  const params = {
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Html: { Data: compiled },
      },
      Subject: {
        Data: "Tarracore Order Details",
      },
    },
    Source: "no-reply@tarracore.ie",
  };

  try {
    await SES.sendEmail(params).promise();
    console.log("*** Email: Order SUCCESS ***");
    return {
      statusCode: 200,
      body: "Email sent!",
    };
  } catch (e) {
    console.log("*** Email: Order FAILED ***");
    console.error(JSON.stringify(e));
    return {
      statusCode: 400,
      body: "Sending failed",
    };
  }
};

const emailSupport = async (to, data) => {
  const body = fs.readFileSync("./support.html").toString();
  const template = Handlebars.compile(body);
  const compiled = template(data);

  const params = {
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Html: { Data: compiled },
      },
      Subject: {
        Data: `Order Error - ${data.orderRef}`,
      },
    },
    Source: "no-reply@tarracore.ie",
  };

  try {
    await SES.sendEmail(params).promise();
    console.log("*** Email: Support Error SUCCESS ***");
    return {
      statusCode: 200,
      body: "Email sent!",
    };
  } catch (e) {
    console.log("*** Email: Support Errir FAILED ***");
    console.error(JSON.stringify(e));
    return {
      statusCode: 400,
      body: "Sending failed",
    };
  }
};

module.exports = {
  emailReceipt: emailReceipt,
  emailTickets: emailTickets,
  emailSupport: emailSupport,
};
