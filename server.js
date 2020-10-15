const express = require("express");
const bodyParser = require("body-parser");
const groups = require("./kafka/list-consumer-groups.app");
const topic = require("./kafka/createTopic")
const topics = require("./kafka/list-topics")
const cors = require('cors');
const { response } = require("express");
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
//app.get("/api/consumergroups", groups.listGroups);
app.get("/api/topics", topics.listTopic);
async function createTopic(){
app.post('/api/topics',async function(req, res) {
  const newTopic = {
    topic: req.body.topic,
    partition: req.body.partition,
    replicationFactor: req.body.replicationFactor,
  };
   await topic.createTopic(newTopic).then(bar => {
      res.send(bar)
      //bar should contain data result from createTopic, acknowlidging success or failure of creation
   })
  })
}
createTopic()

app.listen(port, () => console.log(`Listening on port ${port}`));
