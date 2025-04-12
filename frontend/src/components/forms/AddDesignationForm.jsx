import React, { useEffect, useState } from "react";
import { useApiMutation } from "../../api/apiService";
import { ADD_NEW_DESIGNATION } from "../../api/endpoints";
import InputField from "../inputField";
import FormDialog from "../FormDialog";
import { Option } from "@material-tailwind/react";

const AddDesignationForm = ({ open, editData, onClose }) => {
  const [designationName, setDesignationName] = useState("");
  const [status, setStatus] = useState("active");
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editData) {
      setEditMode(true);
      setDesignationName(editData.designation);
      setStatus(editData.status);
    } else {
      setEditMode(false);
      setDesignationName("");
      setStatus("active");
      setError("");
    }
  }, [editData]);

  const addDesignationMutation = useApiMutation(
    ADD_NEW_DESIGNATION,
    "POST",
    {
      onSuccess: () => handleClose(),
      onError: () => console.error("Error adding designation"),
    }
  );

  const updateDesignationMutation = useApiMutation(
    `${ADD_NEW_DESIGNATION}/${editData?._id}`,
    "PUT",
    {
      onSuccess: () => handleClose(),
      onError: () => console.error("Error updating designation"),
    }
  );

  const handleClose = () => {
    setDesignationName("");
    setStatus("active");
    setError("");
    setEditMode(false);
    onClose();
  };

  const handleSubmit = () => {
    if (!designationName.trim()) {
      setError("Designation Name Required!");
      return;
    }

    const payload = { designation: designationName, status };

    if (editMode && editData?._id) {
      updateDesignationMutation.mutate(payload);
    } else {
      addDesignationMutation.mutate(payload);
    }
  };

  return (
    <FormDialog
      isOpen={open}
      title={editMode ? "Edit Designation" : "Add Designation"}
      subtitle={editMode ? "Update designation details" : "Add designation form subtitle here"}
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <InputField
        label="Designation Name"
        value={designationName}
        onChange={(val) => {
          setDesignationName(val);
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

export default AddDesignationForm;
