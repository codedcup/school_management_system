import React, { useEffect, useState } from "react";
import { useApiMutation } from "../../api/apiService";
import { ADD_NEW_CLASS } from "../../api/endpoints";
import InputGroup from "../InputGroup";
import FormDialog from "../FormDialog";
import InputField from "../inputField";
import { Option } from "@material-tailwind/react";

type Props = {
  open: boolean,
  editData?: { _id: string, class: string, status: statusOptions },
  onClose: () => void
}

type statusOptions = "active" | "inactive";

export default function AddClassForm({ open, editData, onClose }: Props) {
  const [className, setClassName] = useState<string>('');
  const [status, setStatus] = useState<statusOptions>('active');
  const [editMode, setEditMode] = useState<boolean>(false);
  const [classError, setClassError] = useState<string>("");

  useEffect(() => {
    if (editData) {
      setEditMode(true);
      setClassName(editData.class);
      setStatus(editData.status);
    }
  }, [editData]);

  const addClassMutation = useApiMutation<any, { class: string, status: statusOptions }>(
    ADD_NEW_CLASS,
    'POST',
    {
      onSuccess: (data) => {
        console.log(data);
        handleClose();
      },
      onError: () => {
        
      },
    }
  );

  const updateClassMutation = useApiMutation<any, { _id: string, class: string, status: statusOptions }>(
    ADD_NEW_CLASS + "/" + editData?._id,
    'PUT',
    {
      onSuccess: (data) => {
        console.log(data);
        handleClose();
      },
      onError: () => {
        
      },
    }
  );

  const handleClose = () => {
    setClassName("");
    setClassError("");
    setStatus("active");
    setEditMode(false);
    onClose();
  }

  const handleSubmit = () => {
    if (validate()) {
      if(editMode && editData)
        updateClassMutation.mutate({_id: editData._id, class: className, status: status});
      else
        addClassMutation.mutate({class: className, status: status});
    }
  }

  const validate = () => {
    if (!className.trim()) {
      setClassError("Class Name Required!");
      return false;
    }

    return true;
  }

  const handleClassChange = (val: string) => {
    setClassError("");
    setClassName(val);
  }

  const handleStatusChange = (val: statusOptions) => {
    setStatus(val);
  }

  return (
    <>
      <FormDialog
        isOpen={open}
        isEditMode={editMode}
        title="Add Class"
        subtitle="Add class form subtitle here"
        onClose={handleClose}
        onSubmit={handleSubmit}>

        <InputField
          label="Class Name"
          error={classError}
          value={className}
          onChange={handleClassChange} />

        <InputField
          label="Status"
          type="Select"
          value={status}
          onChange={handleStatusChange} >

          <Option value="active">Active</Option>
          <Option value="inactive">Inactive</Option>

        </InputField>

      </FormDialog>
    </>
  );
}