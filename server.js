const express = require("express");
const bodyParser = require("body-parser");
const groups = require("./kafka/list-consumer-groups.app");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/api/consumergroups", groups.listGroups);

app.listen(port, () => console.log(`Listening on port ${port}`));

/*const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const groups = require("./kafka/list-consumer-groups.app");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql')
const app = express()

const ResultsType = new GraphQLObjectType({
  name: 'Result',
  description: 'This represents a Result of kafka consumergroups ',
  fields: () => ({
    groupId: { type: GraphQLNonNull(GraphQLString) },
    brokerId: { type: GraphQLNonNull(GraphQLString) },
    topic: { type: GraphQLNonNull(GraphQLString) },
    partition: { type: GraphQLNonNull(GraphQLString) },
  })
})

const ConsumerGroupType = new GraphQLObjectType({
  name: 'ConsumerGroup',
  description: 'This represents Consumer group data',
  fields: () => ({
    results: {type: new GraphQLList(ResultsType)},
    count: {type: GraphQLNonNull(GraphQLInt)},
   
   
  })
})


const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    
    ConsumerGroup: {
      type: new GraphQLList(ConsumerGroupType),
      description: 'List Consumer Groups Data',
      resolve: () => groups.listGroups
    },
  })
   
const schema = new GraphQLSchema({
  query: RootQueryType,
})

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}))
app.listen(5000, () => console.log('Server Running'))
*/
