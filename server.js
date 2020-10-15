const express = require("express");
const bodyParser = require("body-parser");
const groups = require("./kafka/list-consumer-groups.app");
const create = require("./kafka/createTopic");
const topics = require("./kafka/list-topics");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/consumergroups", groups.listGroups);
app.get("/api/topics", topics.listTopic);
app.post("/api/topics", create.topic);

app.listen(port, () => console.log(`Listening on port ${port}`));

const { ApolloServer } = require('apollo-server');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
 
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
