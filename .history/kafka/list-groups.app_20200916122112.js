const kafka = require("kafka-node");
// const bp = require('body-parser');
const config = require("./config");

exports.listGroups = async function () {
  try {
    let jsonGroups = {};
    const client = new kafka.KafkaClient();
    const admin = new kafka.Admin(client);
    admin.listGroups((err, res) => {
      const consumerGroups = Object.keys(res);
      console.log("consumerGroups", consumerGroups);
      return admin.describeGroups(consumerGroups, (err, res) => {
        return JSON.stringify(res, null, 1);
      });
    });
    console.log("jsonGroups", jsonGroups);
    return { a: "y" };
  } catch (e) {
    console.log("Error in list-groups: ", e);
  }
};

exports.area = function (width) {
  return width * width;
};
