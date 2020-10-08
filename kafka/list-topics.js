const kafka = require("kafka-node");
var listTopic = (request, response) => {
const client = new kafka.KafkaClient();
const admin = new kafka.Admin(client);
var partitions = []
admin.listTopics((err, res) => { 
  var topicsList = Object.keys(res[1].metadata)
  topicsList.forEach((topic) => {
    var partitionLength =  Object.keys(res[1].metadata[topic])
    partitions.push(partitionLength.length)
   })
   const finalResponse = {
    topic: topicsList,
    partitions:partitions,
  }
  response.json(finalResponse)
  return finalResponse
 })
}
module.exports = {
    listTopic,
}; 
