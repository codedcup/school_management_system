import React, { useEffect, useState } from "react";
import { useApiMutation } from "../../api/apiService";
import { ADD_NEW_SECTION } from "../../api/endpoints";
import InputField from "../inputField";
import FormDialog from "../FormDialog";
import { Option } from "@material-tailwind/react";

const AddSectionForm = ({ open, editData, onClose }) => {
  const [sectionName, setSectionName] = useState("");
  const [status, setStatus] = useState("active");
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editData) {
      setEditMode(true);
      setSectionName(editData.section);
      setStatus(editData.status);
    }
  }, [editData]);

  const addSectionMutation = useApiMutation(
    ADD_NEW_SECTION,
    "POST",
    {
      onSuccess: () => handleClose(),
      onError: () => console.error("Error adding section"),
    }
  );

  const handleClose = () => {
    setSectionName("");
    setStatus("active");
    setError("");
    setEditMode(false);
    onClose();
  };

  const handleSubmit = () => {
    if (!sectionName.trim()) {
      setError("Section Name Required!");
      return;
    }

    addSectionMutation.mutate({ section: sectionName, status });
  };

  return (
    <FormDialog
      isOpen={open}
      title="Add Section"
      subtitle="Add section form subtitle here"
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <InputField
        label="Section Name"
        value={sectionName}
        onChange={(val) => {
          setSectionName(val);
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

export default AddSectionForm;
