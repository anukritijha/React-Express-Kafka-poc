const groups = require("./kafka/list-consumer-groups.app");
const kafka = require("kafka-node");
const client = new kafka.KafkaClient();
const admin = new kafka.Admin(client);

const resolvers = {
  Query: {
    hello: () => 'world',
    consumergroups: async() => {
      
      const ans = await new Promise((resolve, reject) => {
        admin.listGroups((err, resGroups) => {
          let groupMetadata = {};
          const consumerGroups = Object.keys(resGroups);
      
          admin.describeGroups(consumerGroups, (err, resGroupMetadata) => {
            groupMetadata = groups.getGroupMetadata2(resGroupMetadata);
            resolve(groupMetadata);
          });
      
          if (err) {
            groupMetadata = { error: e };
          }
        });
      });

      return ans;
      
    },
    topics: async() => {

      const ans = await new Promise((resolve, reject) => {
        admin.listTopics((err, res) => {
          var partitions = [];
          var finalResponse = {};
          var topicsList = Object.keys(res[1].metadata)
          topicsList.forEach((topic) => {
            var partitionLength =  Object.keys(res[1].metadata[topic])
            partitions.push(partitionLength.length)
           })
          finalResponse = {
            topic: topicsList,
            partitions: partitions,
          }
         console.log("inside response", finalResponse);
         resolve(finalResponse);
         });
      });

      return ans;
    }
  },
};

module.exports = resolvers;