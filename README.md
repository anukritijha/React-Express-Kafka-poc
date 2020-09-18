## Kafka Administration UI
A dedicated administration UI to monitor and manage common Kafka administrative tasks.

![Adminitrative UI Screenshot](/public/React-Kafka-poc-with-broker.png?raw=true "Kafka Dashboard")

### Features
- Javascript based UI, using the React framework.
- UI implemented using patternfly framework
- Hosted via Express server and backend based on Node.js
- Uses [Kafka-node](https://github.com/SOHU-Co/kafka-node) as the Kafka Client

### How it works
- Producers produces or writes data to Kafka brokers or Kafka topics.
- Consumers, on the other hand, read data or — as the name implies — consume data from Kafka topics or Kafka brokers.
- Kafka client allows you to read, write and process streams of events in parallel.
- Nodejs serves as a backend and reads/writes/updates using Kafka Client. This layer has all the business logic.
- The backend is hosted by Express Server and exposes a REST endpoint (a Graphql endpoint in future).
- The UI reads/writes using this endpoint.

### Prerequisites

- The latest versions of Node.js and npm installed on your machine
- The latest Java version (JVM) installed on your machine
- Kafka installed on your local machine.

### Installation Steps
- Download the Kafka binaries from [here](https://www.apache.org/dyn/closer.cgi?path=/kafka/2.3.0/kafka_2.12-2.3.0.tgz) and extract the archive.<br/>
- Install Kafka as described [here](https://kafka.apache.org/quickstart)
- Start Zookeeper and Broker.
- Create Topics, Producers, Consumers and Consumer Groups.
- Run `yarn install` and `yarn start`.
