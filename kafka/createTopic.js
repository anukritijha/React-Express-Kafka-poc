var kafka = require("kafka-node");
async function createTopic(request, response) {
  var client = new kafka.KafkaClient();
  var topicsToCreate = [
    {
      topic: request.topic,
      partitions: request.partition,
      replicationFactor: request.replicationFactor,
    },
  ];
  await client.createTopics(topicsToCreate, async (error, result) => {
    if (result.length > 0) {
      console.log(result);
      response = result
      return false
      //response.json(result) gives response as undefined
      return response
    } else return true;
  });
}
module.exports = { createTopic };
