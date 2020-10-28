const kafka = require("kafka-node");

var listGroups = (request, response) => {
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

var getGroupMetadata = (resGroupMetadata) => {
  let groupKeys = Object.keys(resGroupMetadata);
  let responseGroupData = groupKeys.map((key) => {
    if (resGroupMetadata.hasOwnProperty(key)) {
      var val = resGroupMetadata[key];
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

var getGroupMetadata2 = (resGroupMetadata) => {
  let groupKeys = Object.keys(resGroupMetadata);
  let responseGroupData = groupKeys.map((key) => {
    if (resGroupMetadata.hasOwnProperty(key)) {
      var val = resGroupMetadata[key];
      return {
        groupId: val.groupId,
        brokerId: val.brokerId,
        topic: val.members[0].memberMetadata.subscription[0],
      };
    }
  });
  const finalResponse = {
    results: responseGroupData,
    count: responseGroupData.length,
  };
  return finalResponse;
};

module.exports = {
  listGroups,
  getGroupMetadata2
};
