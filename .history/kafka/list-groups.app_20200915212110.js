const kafka = require("kafka-node");
// const bp = require('body-parser');
const config = require("./config");
exports.groups = function () {
  try {
    const jsonGroups = {};
    const client = new kafka.KafkaClient();
    const admin = new kafka.Admin(client);
    admin.listGroups((err, res) => {
      const consumerGroups = Object.keys(res);
      console.log(consumerGroups);
      admin.describeGroups(consumerGroups, (err, res) => {
        jsonGroups = JSON.stringify(res, null, 1);
      });
    });
    return jsonGroups;
  } catch (e) {
    console.log("Error: ", e);
  }
};
