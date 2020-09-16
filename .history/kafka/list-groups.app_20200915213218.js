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
      console.log('consumerGroups',consumerGroups);
      admin.describeGroups(consumerGroups, (err, res) => {
        jsonGroups = JSON.stringify(res, null, 1);
        console.log("jsonGroups", jsonGroups);
        return jsonGroups;
      });
    });
    console.log("jsonGroups", jsonGroups);
    // return jsonGroups;
  } catch (e) {
    console.log("Error: ", e);
  }
};
