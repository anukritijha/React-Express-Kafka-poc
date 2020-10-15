import React, { useState } from "react";
import axios from "axios";
import {
  Modal,
  Button,
  Form,
  Alert,
  FormGroup,
  TextInput
} from "@patternfly/react-core";
export const CreateTopics = () => {
  const [topic, setTopic] = useState("");
  const [partition, setPartition] = useState("");
  const [replicationFactor, setReplicationFactor] = useState("");
  var topicInfo = {
    topic,
    partition,
    replicationFactor
  };
  const [confirmView, setConfirmView] = useState(false);
  const [modalView, setModalView] = useState(false);
  const handleModalToggle = () => {
    setModalView(!modalView);
  };
  const onConfirm = () => {
    window.location.reload(true);
  };
  const onConfirmDialog = () => {
    axios
      .post("http://localhost:5000/api/topics", topicInfo)
      .then(bar => console.log(bar.data))
      //require bar.data to contain null if no error and cause of error if error is present
      .catch(err => {
        console.error(err);
      });
    setModalView(!modalView);
    setConfirmView(true);
  };

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
            type="number"
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
            type="number"
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
      {confirmView && (
        <Alert
          title={"Topic " + topic + " has been created successfully"}
          actionClose={<Button onClick={onConfirm}>Confirm</Button>}
        ></Alert>
      )}
    </>
  );
};
export default CreateTopics;
