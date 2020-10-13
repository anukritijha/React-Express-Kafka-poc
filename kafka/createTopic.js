var kafka = require('kafka-node');
 function createTopic(topic,partitions,replicationFactor)  {
var client = new kafka.KafkaClient();
 
var topicsToCreate = [{
  topic: topic,
  partitions: partitions,
  replicationFactor: replicationFactor
}]
client.createTopics(topicsToCreate, (error, result) => {
    console.log(result)
  });
}
module.exports = {createTopic,}
 
