import React, { useEffect, useState } from "react";
import FormDialog from "../FormDialog";
import InputField from "../inputField";
import { Option } from "@material-tailwind/react";
import { useApiMutation, useApiQuery } from "../../api/apiService";
import {
  GET_ALL_CLASSES,
  GET_ALL_SECTIONS,
  GET_ALL_TEACHERS,
  ADD_NEW_CLASS_TEACHER_ASSIGNMENT,
} from "../../api/endpoints";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  open: boolean;
  editData: any;
  onClose: () => void;
};

const initialFormData = {
  classId: "",
  sectionId: "",
  teacherId: "",
  status: "active",
};

const AddClassTeacherForm = ({ open, editData, onClose }: Props) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState(initialFormData);
  const isEdit = Boolean(editData);

  const { data: classes } = useApiQuery(["classes"], GET_ALL_CLASSES);
  const { data: sections } = useApiQuery(["sections"], GET_ALL_SECTIONS);
  const { data: teachers } = useApiQuery(["teachers"], GET_ALL_TEACHERS);

  const addMutation = useApiMutation(
    ADD_NEW_CLASS_TEACHER_ASSIGNMENT,
    "POST",
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["classTeacher"] });
        handleClose();
      },
    }
  );

  const updateMutation = useApiMutation(
    `${ADD_NEW_CLASS_TEACHER_ASSIGNMENT}/${editData?._id}`,
    "PUT",
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["classTeacher"] });
        handleClose();
      },
    }
  );

  useEffect(() => {
    if (editData) {
      setFormData({
        classId: editData.classId?._id || "",
        sectionId: editData.sectionId?._id || "",
        teacherId: editData.teacherId?._id || "",
        status: editData.status || "active",
      });
    } else {
      setFormData(initialFormData);
    }
  }, [editData]);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleClose = () => {
    setFormData(initialFormData);
    onClose();
  };

  const handleSubmit = () => {
    if (isEdit) {
      updateMutation.mutate(formData);
    } else {
      addMutation.mutate(formData);
    }
  };

  return (
    <FormDialog
      isOpen={open}
      title={isEdit ? "Edit Class Teacher Assignment" : "Assign Class Teacher"}
      subtitle="Select class, section and teacher"
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <InputField label="Class" type="Select" value={formData.classId} onChange={(val) => handleChange("classId", val)}>
        {classes?.map((item) => (
          <Option key={item._id} value={item._id}>{item.class}</Option>
        ))}
      </InputField>

      <InputField label="Section" type="Select" value={formData.sectionId} onChange={(val) => handleChange("sectionId", val)}>
        {sections?.map((item) => (
          <Option key={item._id} value={item._id}>{item.section}</Option>
        ))}
      </InputField>

      <InputField label="Teacher" type="Select" value={formData.teacherId} onChange={(val) => handleChange("teacherId", val)}>
        {teachers?.map((item) => (
          <Option key={item._id} value={item._id}>{item.name}</Option>
        ))}
      </InputField>

      <InputField label="Status" type="Select" value={formData.status} onChange={(val) => handleChange("status", val)}>
        <Option value="active">Active</Option>
        <Option value="inactive">Inactive</Option>
      </InputField>
    </FormDialog>
  );
};

export default AddClassTeacherForm;
