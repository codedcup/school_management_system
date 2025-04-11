import React, { useEffect, useState } from "react";
import { useApiMutation } from "../../api/apiService";
import { ADD_NEW_SUBJECT } from "../../api/endpoints";
import InputField from "../inputField";
import FormDialog from "../FormDialog";
import { Option } from "@material-tailwind/react";

const AddSubjectForm = ({ open, editData, onClose }) => {
  const [subjectName, setSubjectName] = useState("");
  const [status, setStatus] = useState("active");
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editData) {
      setEditMode(true);
      setSubjectName(editData.subject);
      setStatus(editData.status);
    }
  }, [editData]);

  const addSubjectMutation = useApiMutation(
    ADD_NEW_SUBJECT,
    "POST",
    {
      onSuccess: () => handleClose(),
      onError: () => console.error("Error adding subject"),
    }
  );

  const handleClose = () => {
    setSubjectName("");
    setStatus("active");
    setError("");
    setEditMode(false);
    onClose();
  };

  const handleSubmit = () => {
    if (!subjectName.trim()) {
      setError("Subject Name Required!");
      return;
    }

    addSubjectMutation.mutate({ subject: subjectName, status });
  };

  return (
    <FormDialog
      isOpen={open}
      title="Add Subject"
      subtitle="Add subject form subtitle here"
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <InputField
        label="Subject Name"
        value={subjectName}
        onChange={(val) => {
          setSubjectName(val);
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

export default AddSubjectForm;
