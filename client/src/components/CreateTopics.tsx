import React, { useState } from "react";
//import kafka from "/home/suyash/Kafka/React-Express-Kafka-poc/node_modules/kafka-node/types/index"
import { KafkaClient as Client } from "kafka-node";
import {
  Modal,
  Button,
  Form,
  FormGroup,
  TextInput,
  TextArea
} from "@patternfly/react-core";
import createTopic from "./createTopic";
export const CreateTopics = () => {
  const [topic, setTopic] = useState("");
  const [partition, setPartition] = useState("");
  const [replicationFactor, setReplicationFactor] = useState("");

  const sendTopic = (topic: any, partition: any, replicationFactor: any) => {
    //var client = new kafka.KafkaClient();
    const kafkaHost = "localhost:9092";
    const client = new Client({ kafkaHost });
    var topicsToCreate = [
      {
        topic: topic,
        partitions: partition,
        replicationFactor: replicationFactor
      }
    ];
    client.createTopics(topicsToCreate, (error, result) => {
      console.log(error);
    });
  };
  const [modalView, setModalView] = useState(false);
  /*const [formData, setFormData] = useState({
    name: "",
    partition: "",
    replicationFactor:""
  });*/
  const handleModalToggle = () => {
    setModalView(!modalView);
  };
  /*const onChangeInput = (value: string, evt: any) => {
    const elementName = evt?.target?.name;
    const newFormData = { ...formData };
    (newFormData as any)[elementName] = value;
    setFormData(newFormData);
  };*/
  const onConfirmDialog = () => {
    //sendTopic(topic,partition,replicationFactor)
    setModalView(false);
    sendTopic(topic, partition, replicationFactor);
  };
  if (modalView) {
    console.log(topic);
  }
  return (
    <>
      <Button variant="primary" onClick={handleModalToggle}>
        Create Topic
      </Button>
      <Modal
        width={"50%"}
        title="Create New Topic"
        isOpen={modalView}
        onClose={handleModalToggle}
        actions={[
          <Button key="confirm" variant="primary" onClick={onConfirmDialog}>
            Confirm
          </Button>,
          <Button key="cancel" variant="link" onClick={handleModalToggle}>
            Cancel
          </Button>
        ]}
      >
        <Form>
          <FormGroup
            fieldId="topic-name-create"
            label="Enter topic name"
            isRequired
          >
            <TextInput
              id="topic-name-create"
              name="topic"
              value={topic}
              onChange={(value: any): void => setTopic(value)}
            />
          </FormGroup>
          <FormGroup
            fieldId="partitions-create"
            label="No. of partitions"
            isRequired
          >
            <TextInput
              id="partitions-create"
              name="partitions"
              onChange={(value: any): void => setPartition(value)}
              value={partition}
            />
          </FormGroup>
          <FormGroup
            fieldId="replication-factor-create"
            label="Replication Factor"
            isRequired
          >
            <TextInput
              id="replication-factor-create"
              name="replicationFactor"
              onChange={(value: any): void => setReplicationFactor(value)}
              value={replicationFactor}
            />
          </FormGroup>
        </Form>
      </Modal>
    </>
  );
};
export default CreateTopics;
