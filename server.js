const express = require("express");
const bodyParser = require("body-parser");
const groups = require("./kafka/list-consumer-groups.app");
const topic = require("./kafka/createTopic")
const topics = require("./kafka/list-topics")


const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/api/consumergroups", groups.listGroups);
app.get("/api/topics", topics.listTopic);
app.post('/api/topics', function(req, res) {
  const newTopic = {
    topic: req.body.topic,
    partition: req.body.partition,
    repicationFactor: req.body.replicationFactor,
  };

  topic.createTopic(newTopic)
});


app.listen(port, () => console.log(`Listening on port ${port}`));
