const kafka = require("kafka-node");

const listGroups = (request, response) => {
  const client = new kafka.KafkaClient();
  const admin = new kafka.Admin(client);

  let groupMetadata = {};

  admin.listGroups((err, resGroups) => {
    const consumerGroups = Object.keys(resGroups);

    admin.describeGroups(consumerGroups, (err, resGroupMetadata) => {
      groupMetadata = getGroupMetadata(resGroupMetadata);
      response.json(groupMetadata);
    });

    if (err) {
      groupMetadata = { error: e };
    }
  });
};

const getGroupMetadata = (resGroupMetadata) => {
  let groupKeys = Object.keys(resGroupMetadata);
  let responseGroupData = groupKeys.map((key) => {
    if (resGroupMetadata.hasOwnProperty(key)) {
      var val = resGroupMetadata[key];
      console.log("val", val);
      return {
        groupId: val.groupId,
        brokerId: val.brokerId,
        topic: val.members[0].memberMetadata.subscription[0],
        partition: val.members[0].memberAssignment.partitions,
      };
    }
  });

  const finalResponse = {
    results: responseGroupData,
    count: responseGroupData.count,
  };
  return finalResponse;
};

module.exports = {
  listGroups,
};
