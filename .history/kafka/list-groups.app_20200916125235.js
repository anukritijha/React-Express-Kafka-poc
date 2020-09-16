const kafka = require("kafka-node");
// const bp = require('body-parser');
const config = require("./config");

exports.listGroups = async function () {
  try {
    let jsonGroups = {};
    const client = new kafka.KafkaClient();
    const admin = new kafka.Admin(client);
    await admin.listGroups((err, res) => {
      const consumerGroups = Object.keys(res);
      console.log("consumerGroups", consumerGroups);
      admin.describeGroups(consumerGroups, (err, res) => {
        jsonGroups = JSON.stringify(res, null, 1);
        console.log("jsonGroups", jsonGroups);
      });
      if (err) {
        console.log("Error", err);
        jsonGroups = { error: e };
      }
      return jsonGroups;
    });
    console.log("I came here");
    
  } catch (e) {
    console.log("Error in list-groups: ", e);
    return { error: e };
  }
};

// exports.area = function (width) {
//   return width * width;
// };
