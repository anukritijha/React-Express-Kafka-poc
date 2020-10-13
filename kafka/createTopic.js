var kafka = require('kafka-node');
 function createTopic({topicInfo}) {
var client = new kafka.KafkaClient();
console.log(topicInfo)
 
var topicsToCreate = [{
  topic: topicInfo.topic,
  partitions: topicInfo.partition,
  replicationFactor: topicInfo.replicationFactor
}]
client.createTopics(topicsToCreate, (error, result) => {
    console.log(result)
  });
}
module.exports = {createTopic}
 
