const kafka = require("kafka-node");

var listGroups = (request, response) => {
  const client = new kafka.KafkaClient();
  const admin = new kafka.Admin(client);

  let jsonGroups = {};

  admin.listGroups((err, resGroups) => {
    const consumerGroups = Object.keys(resGroups);

    admin.describeGroups(consumerGroups, (err, resGroupMetadata) => {
      jsonGroups = JSON.stringify(resGroupMetadata, null, 1);
      response.json(jsonGroups);
    });

    if (err) {
      jsonGroups = { error: e };
    }
  });
};

module.exports = {
  listGroups,
};
