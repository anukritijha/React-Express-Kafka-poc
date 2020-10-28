const { gql } = require("apollo-server");

const typeDefs = gql`
  type metadata {
    groupId: String
    brokerId: String
    topic: String
  }
  type TopicResponse{
    topic: [String],
    partitions: [Int]
  }
  type ConsumerGroupResponse{
    results: [metadata]
    count: Int
  }
  type Query {
    hello: String,
    topics: TopicResponse,
    consumergroups: ConsumerGroupResponse
  }
`;

module.exports = typeDefs;