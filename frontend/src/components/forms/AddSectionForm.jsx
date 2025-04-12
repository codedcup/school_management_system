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
    } else {
      setEditMode(false);
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

  const updateSectionMutation = useApiMutation(
    `${ADD_NEW_SECTION}/${editData?._id}`,
    "PUT",
    {
      onSuccess: () => handleClose(),
      onError: () => console.error("Error updating section"),
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

    const payload = { section: sectionName, status };

    if (editMode && editData?._id) {
      updateSectionMutation.mutate(payload);
    } else {
      addSectionMutation.mutate(payload);
    }
  };

  return (
    <FormDialog
      isOpen={open}
      title={editMode ? "Edit Section" : "Add Section"}
      subtitle={editMode ? "Update section details" : "Add section form subtitle here"}
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
