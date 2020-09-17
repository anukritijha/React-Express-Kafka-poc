## Kafka Administration UI
A dedicated administration UI to monitor and manage common Kafka administrative tasks.

### Features
- Javascript based UI, usind the React framework.
- UI implemented using patternfly framework
- Hosted via Express server and backend based on Node.js
- Uses [Kafka-node](https://github.com/SOHU-Co/kafka-node) as the Kafka Client

### How it works

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
