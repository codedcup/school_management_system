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
    } else {
      setEditMode(false);
      setSubjectName("");
      setStatus("active");
      setError("");
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

  const updateSubjectMutation = useApiMutation(
    `${ADD_NEW_SUBJECT}/${editData?._id}`,
    "PUT",
    {
      onSuccess: () => handleClose(),
      onError: () => console.error("Error updating subject"),
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

    const payload = { subject: subjectName, status };

    if (editMode && editData?._id) {
      updateSubjectMutation.mutate(payload);
    } else {
      addSubjectMutation.mutate(payload);
    }
  };

  return (
    <FormDialog
      isOpen={open}
      title={editMode ? "Edit Subject" : "Add Subject"}
      subtitle={editMode ? "Update subject details" : "Add subject form subtitle here"}
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
