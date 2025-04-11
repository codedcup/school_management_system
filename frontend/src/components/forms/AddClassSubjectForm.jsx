import React, { useEffect, useState } from "react";
import { useApiMutation, useApiQuery } from "../../api/apiService";
import {
  ADD_NEW_CLASS_SUBJECT_ASSIGNMENT,
  GET_ALL_CLASSES,
  GET_ALL_SECTIONS,
  GET_ALL_STREAMS,
  GET_ALL_SUBJECTS
} from "../../api/endpoints";
import InputField from "../inputField";
import FormDialog from "../FormDialog";
import { Option } from "@material-tailwind/react";

const AddClassSubjectForm = ({ open, editData, onClose }) => {
  const [formData, setFormData] = useState({
    classId: "",
    sectionId: "",
    streamId: "",
    subjectId: "",
    subjectCode: "",
    status: "active",
  });

  const { data: classes } = useApiQuery(['classes'], GET_ALL_CLASSES);
  const { data: sections } = useApiQuery(['sections'], GET_ALL_SECTIONS);
  const { data: streams } = useApiQuery(['streams'], GET_ALL_STREAMS);
  const { data: subjects } = useApiQuery(['subjects'], GET_ALL_SUBJECTS);

  useEffect(() => {
    if (editData) {
      setFormData({
        classId: editData.classId?._id,
        sectionId: editData.sectionId?._id,
        streamId: editData.streamId?._id,
        subjectId: editData.subjectId?._id,
        subjectCode: editData.subjectCode || "",
        status: editData.status || "active"
      });
    }
  }, [editData]);

  const addMutation = useApiMutation(
    ADD_NEW_CLASS_SUBJECT_ASSIGNMENT,
    "POST",
    {
      onSuccess: () => handleClose(),
      onError: () => console.error("Assignment failed"),
    }
  );

  const handleClose = () => {
    setFormData({
      classId: "",
      sectionId: "",
      streamId: "",
      subjectId: "",
      subjectCode: "",
      status: "active",
    });
    onClose();
  };

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    addMutation.mutate(formData);
  };

  return (
    <FormDialog
      isOpen={open}
      title="Assign Subject to Class"
      subtitle="Select Class, Section, Stream, and Subject"
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <InputField
        label="Class"
        type="Select"
        value={formData.classId}
        onChange={(val) => handleChange("classId", val)}
      >
        {classes?.map((item) => (
          <Option key={item._id} value={item._id}>{item.class}</Option>
        ))}
      </InputField>

      <InputField
        label="Section"
        type="Select"
        value={formData.sectionId}
        onChange={(val) => handleChange("sectionId", val)}
      >
        {sections?.map((item) => (
          <Option key={item._id} value={item._id}>{item.section}</Option>
        ))}
      </InputField>

      <InputField
        label="Stream"
        type="Select"
        value={formData.streamId}
        onChange={(val) => handleChange("streamId", val)}
      >
        {streams?.map((item) => (
          <Option key={item._id} value={item._id}>{item.stream}</Option>
        ))}
      </InputField>

      <InputField
        label="Subject"
        type="Select"
        value={formData.subjectId}
        onChange={(val) => handleChange("subjectId", val)}
      >
        {subjects?.map((item) => (
          <Option key={item._id} value={item._id}>{item.subject}</Option>
        ))}
      </InputField>

      <InputField
        label="Subject Code"
        value={formData.subjectCode}
        onChange={(val) => handleChange("subjectCode", val)}
      />

      <InputField
        label="Status"
        type="Select"
        value={formData.status}
        onChange={(val) => handleChange("status", val)}
      >
        <Option value="active">Active</Option>
        <Option value="inactive">Inactive</Option>
      </InputField>
    </FormDialog>
  );
};

export default AddClassSubjectForm;
