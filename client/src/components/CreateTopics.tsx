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

export interface ICreateTopicsProps {
  error: any;
  setError: (value: any) => any;
}
export const CreateTopics: React.FunctionComponent<ICreateTopicsProps> = ({
  error,
  setError
}) => {
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
    setConfirmView(!confirmView);
  };

  const onConfirmDialog = () => {
    axios
      .post("http://localhost:5000/api/topics", topicInfo)
      .then(errorData => {
        errorData.data.length
          ? setError("Error " + errorData.data[0].error)
          : setError(" Success! Topic " + topic + " created");
      })

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
          title={error}
          actionClose={<Button onClick={onConfirm}>Confirm</Button>}
        ></Alert>
      )}
    </>
  );
};
export default CreateTopics;
