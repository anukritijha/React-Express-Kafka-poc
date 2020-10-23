var kafka = require("kafka-node");

topic = (request, response) => {
  var client = new kafka.KafkaClient();
  var topicsToCreate = [
    {
      topic: request.body.topic,
      partitions: request.body.partition,
      replicationFactor: request.body.replicationFactor,
    },
  ];

  client.createTopics(topicsToCreate, (error, result) => {
    response.json(result);
  });
};

module.exports = { topic };