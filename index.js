const { ApolloServer, gql } = require("apollo-server");
const groups = require("./kafka/list-consumer-groups.app");

const typeDefs = gql`
  type metadata {
    groupId: String
    brokerId: String
    topic: String
  }

  type results {
    results: metadata
    count: Int
  }

  type Query {
    results: [results]
  }
`;
const data = groups.listGroups;
const resolvers = {
  Query: {
    results: () => [data],
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`  Server ready at ${url}`);
});
