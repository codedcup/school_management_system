import React, { useEffect, useState } from "react";
import { useApiMutation } from "../../api/apiService";
import { ADD_NEW_STREAM } from "../../api/endpoints";
import InputField from "../inputField";
import FormDialog from "../FormDialog";
import { Option } from "@material-tailwind/react";

const AddStreamForm = ({ open, editData, onClose }) => {
  const [streamName, setStreamName] = useState("");
  const [status, setStatus] = useState("active");
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editData) {
      setEditMode(true);
      setStreamName(editData.stream);
      setStatus(editData.status);
    }
  }, [editData]);

  const addStreamMutation = useApiMutation(
    ADD_NEW_STREAM,
    "POST",
    {
      onSuccess: () => handleClose(),
      onError: () => console.error("Error adding stream"),
    }
  );

  const handleClose = () => {
    setStreamName("");
    setStatus("active");
    setError("");
    setEditMode(false);
    onClose();
  };

  const handleSubmit = () => {
    if (!streamName.trim()) {
      setError("Stream Name Required!");
      return;
    }

    addStreamMutation.mutate({ stream: streamName, status });
  };

  return (
    <FormDialog
      isOpen={open}
      title="Add Stream"
      subtitle="Add stream form subtitle here"
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <InputField
        label="Stream Name"
        value={streamName}
        onChange={(val) => {
          setStreamName(val);
          setError("");
        }}
        error={error}
      />

      <InputField
        label="Status"
        type="Select"
        value={status}
        onChange={setStatus}
      >
        <Option value="active">Active</Option>
        <Option value="inactive">Inactive</Option>
      </InputField>
    </FormDialog>
  );
};

export default AddStreamForm;
